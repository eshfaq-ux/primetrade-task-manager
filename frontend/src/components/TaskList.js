import React from 'react';

const TaskList = ({ tasks, onEdit, onDelete, loading = false }) => {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="mb-3">
          <i className="bi bi-inbox" style={{fontSize: '3rem', color: '#6c757d'}}></i>
          📋
        </div>
        <h5 className="text-muted">No tasks found</h5>
        <p className="text-muted">Create your first task or adjust your search filters</p>
      </div>
    );
  }

  return (
    <div className="row">
      {tasks.map((task) => (
        <div key={task._id} className="col-12 col-md-6 col-lg-4 mb-3">
          <div className={`card h-100 border-start border-4 ${
            task.status === 'completed' ? 'border-success' : 'border-warning'
          }`}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h5 className="card-title text-truncate" title={task.title}>
                  {task.title}
                </h5>
                <span className={`badge ${
                  task.status === 'completed' ? 'bg-success' : 'bg-warning text-dark'
                }`}>
                  {task.status === 'completed' ? '✅ Done' : '⏳ Pending'}
                </span>
              </div>
              <p className="card-text text-muted small" style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {task.description}
              </p>
              <small className="text-muted">
                📅 {new Date(task.createdAt).toLocaleDateString()}
              </small>
            </div>
            <div className="card-footer bg-transparent border-0">
              <div className="btn-group w-100" role="group">
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => onEdit(task)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => onDelete(task._id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
