import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { taskService } from '../api/tasks';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { logger } from '../utils/logger';

const Dashboard = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [search, statusFilter]);

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    logger.info('Fetching tasks', { search, statusFilter });
    
    try {
      const response = await taskService.getTasks(token, search, statusFilter);
      setTasks(response.tasks);
      logger.info('Tasks fetched successfully', { count: response.tasks.length });
    } catch (err) {
      const errorMessage = err.message || 'Failed to fetch tasks';
      setError(errorMessage);
      logger.error('Failed to fetch tasks', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    setLoading(true);
    setError('');
    logger.info('Creating task', { title: taskData.title });
    
    try {
      await taskService.createTask(token, taskData);
      setShowForm(false);
      logger.info('Task created successfully', { title: taskData.title });
      fetchTasks();
    } catch (err) {
      const errorMessage = err.message || 'Failed to create task';
      setError(errorMessage);
      logger.error('Failed to create task', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (taskData) => {
    setLoading(true);
    setError('');
    logger.info('Updating task', { id: editingTask._id, title: taskData.title });
    
    try {
      await taskService.updateTask(token, editingTask._id, taskData);
      setEditingTask(null);
      setShowForm(false);
      logger.info('Task updated successfully', { id: editingTask._id });
      fetchTasks();
    } catch (err) {
      const errorMessage = err.message || 'Failed to update task';
      setError(errorMessage);
      logger.error('Failed to update task', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    setLoading(true);
    setError('');
    logger.info('Deleting task', { id: taskId });
    
    try {
      await taskService.deleteTask(token, taskId);
      logger.info('Task deleted successfully', { id: taskId });
      fetchTasks();
    } catch (err) {
      const errorMessage = err.message || 'Failed to delete task';
      setError(errorMessage);
      logger.error('Failed to delete task', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditTask = (task) => {
    logger.info('Editing task', { id: task._id, title: task.title });
    setEditingTask(task);
    setShowForm(true);
  };

  const handleLogout = () => {
    logger.info('User logging out', { user: user?.email });
    logout();
    navigate('/login');
  };

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <span className="navbar-brand">Primetrade Task Manager</span>
          <div className="navbar-nav ms-auto">
            <span className="navbar-text me-3">Welcome, {user?.name}</span>
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container py-4">
        {error && (
          <div className="alert alert-danger alert-dismissible" role="alert">
            {error}
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setError('')}
              aria-label="Close"
            ></button>
          </div>
        )}

        {/* Task Management Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h2 className="card-title mb-1">My Tasks</h2>
                    <p className="text-muted mb-0">Manage your daily tasks efficiently</p>
                  </div>
                  <button
                    className={`btn ${showForm ? 'btn-outline-secondary' : 'btn-primary'}`}
                    onClick={() => {
                      setEditingTask(null);
                      setShowForm(!showForm);
                    }}
                  >
                    {showForm ? 'Cancel' : 'Add Task'}
                  </button>
                </div>

                {/* Search and Filter */}
                <div className="row mb-4">
                  <div className="col-md-6 mb-2">
                    <div className="input-group">
                      <span className="input-group-text">
                        🔍
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search tasks by title or description..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      {search && (
                        <button 
                          className="btn btn-outline-secondary" 
                          type="button"
                          onClick={() => setSearch('')}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 mb-2">
                    <div className="input-group">
                      <span className="input-group-text">
                        📊
                      </span>
                      <select
                        className="form-select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option value="">All Tasks</option>
                        <option value="pending">⏳ Pending</option>
                        <option value="completed">✅ Completed</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Results Summary */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <small className="text-muted">
                    {loading ? 'Loading...' : `Showing ${tasks.length} task${tasks.length !== 1 ? 's' : ''}`}
                    {search && ` matching "${search}"`}
                    {statusFilter && ` with status "${statusFilter}"`}
                  </small>
                  {(search || statusFilter) && (
                    <button 
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => {
                        setSearch('');
                        setStatusFilter('');
                      }}
                    >
                      Clear Filters
                    </button>
                  )}
                </div>

                {/* Task Form */}
                {showForm && (
                  <div className="border rounded p-4 bg-light">
                    <h5 className="mb-3">
                      {editingTask ? 'Edit Task' : 'Create New Task'}
                    </h5>
                    <TaskForm
                      onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                      initialData={editingTask}
                      loading={loading}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Task List */}
        <TaskList
          tasks={tasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Dashboard;
