import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Edit2, Trash2, Plus, Calendar, Sparkles } from 'lucide-react';

const TodoList = ({
    todos,
    editingTodo,
    editTitle,
    setEditTitle,
    setEditingTodo,
    handleEditSubmit,
    toggleTodoComplete,
    startEditing,
    deleteTodo
}) => {
    return (
        <div className="space-y-4">
            <AnimatePresence mode="popLayout">
                {todos.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                        className="glass-panel rounded-3xl p-12 text-center"
                    >
                        <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-6">
                            <Sparkles className="w-10 h-10 text-emerald-400" />
                        </div>
                        <h3 className="text-2xl font-display font-medium text-slate-200 mb-2">You're all caught up!</h3>
                        <p className="text-slate-400">Time to relax and enjoy the rest of your day.</p>
                    </motion.div>
                ) : (
                    todos.map((todo) => (
                        <motion.div
                            key={todo._id} layout
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -50 }}
                            className={`group glass-panel rounded-2xl p-4 transition-all duration-300 hover:border-emerald-500/30 ${todo.completed ? 'opacity-60 grayscale-[0.5]' : ''}`}
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
                                        <Plus className="w-5 h-5 rotate-45" />
                                    </button>
                                </form>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => toggleTodoComplete(todo)}
                                        className={`flex-shrink-0 transition-all duration-300 ${todo.completed ? 'text-emerald-400' : 'text-slate-500 hover:text-emerald-400'}`}
                                    >
                                        {todo.completed ? <CheckCircle2 className="w-7 h-7" /> : <Circle className="w-7 h-7" />}
                                    </button>

                                    <div className="flex-1 min-w-0">
                                        <h3 className={`text-lg font-medium truncate transition-all duration-300 ${todo.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
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
                                            className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors"
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
    );
};

export default TodoList;
