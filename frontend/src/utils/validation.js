export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const validateTaskForm = (formData) => {
  const errors = {};

  if (!validateRequired(formData.title)) {
    errors.title = 'Title is required';
  }

  if (!validateRequired(formData.description)) {
    errors.description = 'Description is required';
  }

  if (!['pending', 'completed'].includes(formData.status)) {
    errors.status = 'Invalid status';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
