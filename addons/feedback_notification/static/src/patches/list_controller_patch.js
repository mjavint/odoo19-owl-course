/** @odoo-module **/

import { patch } from '@web/core/utils/patch';
import { ListController } from '@web/views/list/list_controller';
import { useService } from '@web/core/utils/hooks';

patch(ListController.prototype, {
  setup() {
    super.setup(...arguments);
    this.notification = useService('notification');
  },

  async openRecord(record) {
    try {
      const name = record.data.display_name || record.data.name || 'registro';

      this.notification.add(`Abriendo ${name}...`, {
        type: 'info',
        sticky: false,
      });
      return await super.openRecord(record);
    } catch (error) {
      this.notification.add('Error al abrir el registro', {
        type: 'danger',
      });
      throw error;
    }
  },

  get actionMenuItems() {
    const items = super.actionMenuItems;

    const newAction = {
      key: 'exportToConsole',
      description: 'Exportar a consola',
      callback: () => this.exportToConsole(),
    };

    const result = {
      ...items,
      action: [...(items.action || []), newAction],
    };
    return result;
  },

  exportToConsole() {
    const selectedRecords = this.model.root.selection;
    const data = selectedRecords.map((record) => record.data);

    console.table(data);

    this.notification.add(
      `${selectedRecords.length} ${selectedRecords.length === 1 ? 'registro' : 'registros'} exportados a la consola`,
      {
        type: 'success',
        sticky: true,
      }
    );
  },
});
