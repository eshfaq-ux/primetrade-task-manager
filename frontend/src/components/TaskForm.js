import React, { useState } from 'react';
import { validateTaskForm } from '../utils/validation';
import { logger } from '../utils/logger';

const TaskForm = ({ onSubmit, initialData = null, loading = false }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    status: initialData?.status || 'pending'
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Client-side validation
    const validation = validateTaskForm(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      logger.warn('Task form validation failed', validation.errors);
      return;
    }

    logger.info('Task form submitted', { title: formData.title, status: formData.status });
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input
          type="text"
          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        {errors.title && (
          <div className="invalid-feedback">
            {errors.title}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          className={`form-control ${errors.description ? 'is-invalid' : ''}`}
          id="description"
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          required
        />
        {errors.description && (
          <div className="invalid-feedback">
            {errors.description}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="status" className="form-label">Status</label>
        <select
          className={`form-select ${errors.status ? 'is-invalid' : ''}`}
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        {errors.status && (
          <div className="invalid-feedback">
            {errors.status}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={loading}
      >
        {loading ? 'Saving...' : (initialData ? 'Update Task' : 'Create Task')}
      </button>
    </form>
  );
};

export default TaskForm;
