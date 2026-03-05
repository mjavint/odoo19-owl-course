/** @odoo-module **/

import { patch } from '@web/core/utils/patch';
import { FormController } from '@web/views/form/form_controller';
import { useService } from '@web/core/utils/hooks';

patch(FormController.prototype, {
  setup() {
    super.setup(...arguments);
    this.notification = useService('notification');
  },

  async saveButtonClicked(params = {}) {
    this.notification.add('Guardando el registro ...', {
      type: 'info',
      sticky: false,
    });
    try {
      const result = await super.saveButtonClicked(params);
      this.notification.add('Registro guardado correctamente', {
        type: 'success',
        sticky: true,
      });
      return result;
    } catch (error) {
      this.notification.add('Error al guardar el registro', {
        type: 'danger',
        sticky: true,
      });
    }
  },

  async deleteRecord() {
    const rootData = this.model.root.data;
    const displayName = rootData ? rootData.display_name : 'registro';

    const confirmed = confirm(
      `¿Estás seguro de que deseas eliminar el ${displayName}?`
    );
    if (!confirmed) {
      this.notification.add('Eliminación cancelada', {
        type: 'info',
        sticky: true,
      });
      return;
    }

    const result = await super.deleteRecord();

    this.notification.add(`${displayName} eliminado correctamente`, {
      type: 'success',
      sticky: true,
    });
    return result;
  },
});
