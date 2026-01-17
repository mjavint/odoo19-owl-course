/** @odoo-module **/

import { Component, onMounted } from '@odoo/owl';
import { registry } from '@web/core/registry';
import { useService } from '@web/core/utils/hooks';
import { useFormValidation } from '@owl_course/hooks/useFormValidation';
import { validators } from '@owl_course/hooks/validators';

export class UserRegistrationForm extends Component {
  static template = 'owl_course.UserRegistrationForm';

  setup() {
    this.notification = useService('notification');
    const initialValues = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
    this.form = useFormValidation(initialValues);
    const validationRules = {
      name: [validators.required, validators.minLength(3)],
      email: [validators.required, validators.email],
      password: [validators.required, validators.minLength(6)],
      confirmPassword: [
        validators.required,
        validators.custom(
          (value) => value === this.form.values.password,
          'Passwords do not match.'
        ),
      ],
    };
    onMounted(() => {
      this.form.setValidationRules(validationRules);
    });
  }

  onBlur(field) {
    this.form.setValue(field);
  }

  async onSubmit(ev) {
    ev.preventDefault();
    try {
      const result = await this.form.handleSubmit(async (values) => {
        console.log('Form submitted with values: ', values);
        return values;
      });
      const data = JSON.stringify(result.data, null, 2);
      console.log('Formatted data: ', data);
      this.notification.add('Form submitted successfully!', { type: 'success' });
      this.form.reset();
    } catch (error) {
      this.notification.add('An error occurred during form submission.', {
        type: 'danger',
      });
    }
  }
}

registry.category('actions').add('user_registration_form', UserRegistrationForm);
