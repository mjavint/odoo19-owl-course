export const validators = {
  required: (value) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return 'This field is required.';
    }
    return null;
  },
  email: (value) => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      return 'Invalid email address.';
    }
    return null;
  },
  minLength: (length) => {
    return (value) => {
      if (value && value.length < length) {
        return `Minimum length is ${length} characters.`;
      }
      return null;
    };
  },
  maxLength: (length) => {
    return (value) => {
      if (value && value.length > length) {
        return `Maximum length is ${length} characters.`;
      }
      return null;
    };
  },
  pattern: (regex, message) => {
    return (value) => {
      if (value && !regex.test(value)) {
        return message || 'Invalid format.';
      }
      return null;
    };
  },
  custom: (fn, msg) => {
    return (value) => {
      if (value && !fn(value)) {
        return msg || 'Invalid value.';
      }
      return null;
    };
  },
};
