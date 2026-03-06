import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, Circle, Edit2, Trash2, Plus, LogOut,
  Loader2, Sparkles, Mail, Lock, User, Calendar
} from 'lucide-react';

const API_URL = 'https://note-app-qb8n.onrender.com/api';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(localStorage.getItem('token') || '');
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
    setAuthData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: authData.name,
          email: authData.email,
          password: authData.password
        })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Registration failed');

      localStorage.setItem('token', data.token);
      setAuthToken(data.token);
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: authData.email,
          password: authData.password
        })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Login failed');

      localStorage.setItem('token', data.token);
      setAuthToken(data.token);
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
    setAuthToken('');
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
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
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
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: newTodoTitle })
      });

      const data = await response.json();
      if (!response.ok) throw new Error('Failed to create task');

      setTodos(prev => [...prev, data]);
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
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      });

      const data = await response.json();
      if (!response.ok) throw new Error('Failed to update task');

      setTodos(prev => prev.map(todo => todo._id === id ? data : todo));
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
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to delete task');

      setTodos(prev => prev.filter(todo => todo._id !== id));
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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-indigo-500/30">

      {/* Background Ornaments */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">

        {/* Header Section */}
        <header className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center p-3 mb-4 rounded-2xl glass-panel text-indigo-400"
          >
            <Sparkles className="w-8 h-8" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"
          >
            TaskFlow
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="mt-3 text-slate-400 max-w-xl mx-auto text-lg"
          >
            {isAuthenticated ? 'Organize your day with elegance and speed.' : 'Sign in to access your beautiful workspace.'}
          </motion.p>
        </header>

        {/* Toasts */}
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9, x: 20 }}
                className="bg-red-500/10 border border-red-500/20 backdrop-blur-md text-red-400 px-6 py-4 rounded-xl shadow-lg flex items-center gap-3"
              >
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9, x: 20 }}
                className="bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md text-emerald-400 px-6 py-4 rounded-xl shadow-lg flex items-center gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                {success}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            <motion.div
              key="auth"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="max-w-md mx-auto relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="glass-panel rounded-2xl p-8 relative">

                {/* Auth Tabs */}
                <div className="flex p-1 mb-8 bg-white/5 rounded-xl">
                  <button
                    onClick={() => setAuthMode('login')}
                    className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${authMode === 'login' ? 'bg-indigo-500 shadow-lg text-white' : 'text-slate-400 hover:text-white'
                      }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setAuthMode('register')}
                    className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${authMode === 'register' ? 'bg-indigo-500 shadow-lg text-white' : 'text-slate-400 hover:text-white'
                      }`}
                  >
                    Register
                  </button>
                </div>

                <form onSubmit={authMode === 'login' ? handleLogin : handleRegister} className="space-y-5">
                  <AnimatePresence>
                    {authMode === 'register' && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text" name="name" value={authData.name} onChange={handleAuthInputChange}
                          className="glass-input w-full pl-12 pr-4 py-3 rounded-xl"
                          placeholder="Full Name" required={authMode === 'register'}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email" name="email" value={authData.email} onChange={handleAuthInputChange}
                      className="glass-input w-full pl-12 pr-4 py-3 rounded-xl"
                      placeholder="Email Address" required
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="password" name="password" value={authData.password} onChange={handleAuthInputChange}
                      className="glass-input w-full pl-12 pr-4 py-3 rounded-xl"
                      placeholder="Password" required
                    />
                  </div>

                  <button
                    type="submit" disabled={loading}
                    className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium rounded-xl shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 group mt-2"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                      <>
                        {authMode === 'login' ? 'Sign In' : 'Create Account'}
                        <Sparkles className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="app"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            >
              {/* App Controls */}
              <div className="flex justify-between items-center mb-8 glass-panel py-3 px-5 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-display font-medium">
                    {todos.length}
                  </div>
                  <span className="text-slate-300 font-medium">Active Tasks</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-white bg-white/5 hover:bg-red-500/20 hover:border-red-500/30 border border-transparent rounded-xl transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>

              {/* Add Todo */}
              <form onSubmit={createTodo} className="relative group mb-10">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={newTodoTitle}
                    onChange={(e) => setNewTodoTitle(e.target.value)}
                    className="glass-input w-full pl-6 pr-32 py-4 rounded-2xl text-lg shadow-xl"
                    placeholder="What needs to be done today?"
                  />
                  <button
                    type="submit"
                    disabled={!newTodoTitle.trim()}
                    className="absolute right-2 px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:hover:bg-indigo-500 text-white font-medium rounded-xl shadow-lg transition-all flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                </div>
              </form>

              {/* Todos List */}
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {todos.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                      className="glass-panel rounded-3xl p-12 text-center"
                    >
                      <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-6">
                        <Sparkles className="w-10 h-10 text-indigo-400" />
                      </div>
                      <h3 className="text-2xl font-display font-medium text-slate-200 mb-2">You're all caught up!</h3>
                      <p className="text-slate-400">Time to relax and enjoy the rest of your day.</p>
                    </motion.div>
                  ) : (
                    todos.map((todo) => (
                      <motion.div
                        key={todo._id} layout
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -50 }}
                        className={`group glass-panel rounded-2xl p-4 transition-all duration-300 hover:border-indigo-500/30 ${todo.completed ? 'opacity-60 grayscale-[0.5]' : ''
                          }`}
                      >
                        {editingTodo === todo._id ? (
                          <form onSubmit={(e) => handleEditSubmit(e, todo._id)} className="flex items-center gap-3">
                            <input
                              type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)}
                              className="glass-input flex-1 py-2 px-4 rounded-xl" autoFocus
                            />
                            <button type="submit" className="p-2 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 rounded-xl transition-colors">
                              <CheckCircle2 className="w-5 h-5" />
                            </button>
                            <button type="button" onClick={() => setEditingTodo(null)} className="p-2 bg-slate-500/20 text-slate-400 hover:bg-slate-500/30 hover:text-white rounded-xl transition-colors">
                              <Plus className="w-5 h-5 rotate-45" /> {/* Close icon lookalike */}
                            </button>
                          </form>
                        ) : (
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => toggleTodoComplete(todo)}
                              className={`flex-shrink-0 transition-all duration-300 ${todo.completed ? 'text-emerald-400' : 'text-slate-500 hover:text-indigo-400'}`}
                            >
                              {todo.completed ? <CheckCircle2 className="w-7 h-7" /> : <Circle className="w-7 h-7" />}
                            </button>

                            <div className="flex-1 min-w-0">
                              <h3 className={`text-lg font-medium truncate transition-all duration-300 ${todo.completed ? 'line-through text-slate-500' : 'text-slate-200'
                                }`}>
                                {todo.title}
                              </h3>
                              <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
                                <Calendar className="w-3.5 h-3.5" />
                                {new Date(todo.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <button
                                onClick={() => startEditing(todo)}
                                className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteTodo(todo._id)}
                                className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;