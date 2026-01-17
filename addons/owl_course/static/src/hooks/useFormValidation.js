import { useState, validate } from '@odoo/owl';

export function useFormValidation(initialValues = {}) {
  const state = useState({
    values: { ...initialValues },
    validationRules: {},
    errors: {},
    touched: {},
    isSubmitted: false,
  });

  const setValidationRules = (validationRules = {}) => {
    state.validationRules = validationRules;
  };

  const validateField = (fieldName, value) => {
    const rules = state.validationRules[fieldName];
    if (!rules || !Array.isArray(rules)) return null;

    for (const rule of rules) {
      const error = rule(value);
      if (error) return error;
    }
    return null;
  };

  const validateAll = () => {
    const errors = {};
    for (const fieldName in state.validationRules) {
      const error = validateField(fieldName, state.values[fieldName]);
      if (error) {
        errors[fieldName] = error;
      }
    }
    state.errors = errors;
    return Object.keys(errors).length === 0;
  };

  const updateFieldError = (fieldName, value) => {
    const error = validateField(fieldName, value);
    if (error) {
      state.errors[fieldName] = error;
    } else {
      delete state.errors[fieldName];
    }
  };

  const setValue = (fieldName) => {
    state.touched[fieldName] = true;
    updateFieldError(fieldName, state.values[fieldName]);
  };

  const handleSubmit = async (onSubmit) => {
    Object.keys(state.validationRules).forEach((fieldName) => {
      state.touched[fieldName] = true;
    });

    if (!validateAll()) {
      return { succes: false, errors: state.errors };
    }

    if (state.isSubmitted) {
      return { success: false, errors: 'Form is already submitted' };
    }
    state.isSubmitted = true;
    try {
      const result = await onSubmit(state.values);
      return { success: true, data: result };
    } catch (error) {
      if (error.fieldErrors) {
        state.errors = { ...state.errors, ...error.fieldErrors };
      }
      return {
        success: false,
        errors: error.message || error,
        fieldErrors: error.fieldErrors || {},
      };
    } finally {
      state.isSubmitted = false;
    }
  };

  const reset = () => {
    Object.keys(state.values).forEach((key) => {
      delete state.values[key];
    });
    Object.assign(state.values, initialValues);
    state.errors = {};
    state.touched = {};
    state.isSubmitted = false;
  };

  const hasErrors = (fieldName) => {
    return !!state.errors[fieldName] && state.touched[fieldName];
  };

  const getError = (fieldName) => {
    return state.touched[fieldName] ? state.errors[fieldName] : null;
  };

  return {
    // state
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isSubmitted: state.isSubmitted,
    // methods
    setValidationRules,
    setValue,
    validateAll,
    handleSubmit,
    reset,
    hasErrors,
    getError,
    // Properties
    get isValid() {
      return Object.keys(state.errors).length === 0;
    },
  };
}
