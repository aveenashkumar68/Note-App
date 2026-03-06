import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Background from '../components/layout/Background';
import Header from '../components/layout/Header';
import Toast from '../components/layout/Toast';
import AuthSection from '../components/auth/AuthSection';
import AppControls from '../components/todos/AppControls';
import TodoInput from '../components/todos/TodoInput';
import TodoList from '../components/todos/TodoList';

const API_URL = 'https://note-app-qb8n.onrender.com/api';

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(localStorage.getItem('token') || '');
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Login/Register states
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [authData, setAuthData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Todo states
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  // Check authentication on mount
  useEffect(() => {
    if (authToken) {
      setIsAuthenticated(true);
      fetchTodos();
    }
  }, []);

  // Auth handlers
  const handleAuthInputChange = (e) => {
    const { name, value } = e.target;
    setAuthData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: authData.name, email: authData.email, password: authData.password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Registration failed');

      localStorage.setItem('token', data.token);
      localStorage.setItem('userName', data.name);
      setAuthToken(data.token);
      setUserName(data.name);
      setIsAuthenticated(true);
      setSuccess('Welcome to your beautiful workspace!');
      setAuthData({ name: '', email: '', password: '' });
      fetchTodos();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authData.email, password: authData.password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');

      localStorage.setItem('token', data.token);
      localStorage.setItem('userName', data.name);
      setAuthToken(data.token);
      setUserName(data.name);
      setIsAuthenticated(true);
      setSuccess('Welcome back!');
      setAuthData({ name: '', email: '', password: '' });
      fetchTodos();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setAuthToken('');
    setUserName('');
    setIsAuthenticated(false);
    setTodos([]);
    setSuccess('See you next time!');
  };

  // Todo handlers
  const fetchTodos = async () => {
    if (!authToken) return;
    try {
      const response = await fetch(`${API_URL}/todos`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error('Failed to fetch tasks');
      setTodos(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const createTodo = async (e) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTodoTitle }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error('Failed to create task');

      setTodos((prev) => [...prev, data]);
      setNewTodoTitle('');
    } catch (err) {
      setError(err.message);
    }
  };

  const updateTodo = async (id, updates) => {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();
      if (!response.ok) throw new Error('Failed to update task');

      setTodos((prev) => prev.map((todo) => (todo._id === id ? data : todo)));
      setEditingTodo(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to delete task');

      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const startEditing = (todo) => {
    setEditingTodo(todo._id);
    setEditTitle(todo.title);
  };

  const handleEditSubmit = (e, id) => {
    e.preventDefault();
    if (editTitle.trim()) {
      updateTodo(id, { title: editTitle });
    }
  };

  const toggleTodoComplete = (todo) => {
    updateTodo(todo._id, { completed: !todo.completed });
  };

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError('');
        setSuccess('');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-emerald-500/30">
      <Background />
      <div className="max-w-3xl mx-auto relative z-10">
        <Header isAuthenticated={isAuthenticated} />
        <Toast error={error} success={success} />

        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            <AuthSection
              authMode={authMode} setAuthMode={setAuthMode}
              authData={authData} handleAuthInputChange={handleAuthInputChange}
              handleLogin={handleLogin} handleRegister={handleRegister} loading={loading}
            />
          ) : (
            <motion.div key="app" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <AppControls userName={userName} activeTasksCount={todos.length} handleLogout={handleLogout} />
              <TodoInput newTodoTitle={newTodoTitle} setNewTodoTitle={setNewTodoTitle} createTodo={createTodo} />
              <TodoList
                todos={todos} editingTodo={editingTodo}
                editTitle={editTitle} setEditTitle={setEditTitle}
                setEditingTodo={setEditingTodo} handleEditSubmit={handleEditSubmit}
                toggleTodoComplete={toggleTodoComplete} startEditing={startEditing}
                deleteTodo={deleteTodo}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Home;
