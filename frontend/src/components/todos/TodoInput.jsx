import React from 'react';
import { Plus } from 'lucide-react';

const TodoInput = ({ newTodoTitle, setNewTodoTitle, createTodo }) => {
    return (
        <form onSubmit={createTodo} className="relative group mb-10">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-gray-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
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
                    className="absolute right-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:hover:bg-emerald-500 text-white font-medium rounded-xl shadow-lg transition-all flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    <span className="hidden sm:inline">Add</span>
                </button>
            </div>
        </form>
    );
};

export default TodoInput;
