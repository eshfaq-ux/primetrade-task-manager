/**
 * Form Validation Utilities
 * Client-side validation functions for forms and inputs
 */

/**
 * Validate email format using regex
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email format is valid
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password meets minimum requirements
 * @param {string} password - Password to validate
 * @returns {boolean} True if password is valid (6+ characters)
 */
export const validatePassword = (password) => {
  return password && password.length >= 6;
};

/**
 * Validate required field is not empty
 * @param {string} value - Value to validate
 * @returns {boolean} True if value exists and not empty
 */
export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

/**
 * Validate task form data
 * @param {Object} formData - Task form data to validate
 * @returns {Object} Validation result with errors and isValid flag
 */
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
