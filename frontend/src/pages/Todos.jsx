// src/pages/Todos.jsx
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  fetchTodos,
  createTodo,
  deleteTodo as deleteTodoService,
} from "../services/todoService";

const Todos = () => {
  const { user, logout } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Load todos
  const loadTodos = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await fetchTodos(user.token);
      setTodos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch todos", error);
      setTodos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, [user]);

  // Add todo
  const handleAdd = async () => {
    if (!input.trim()) return;
    try {
      const newTodo = await createTodo(input, user.token);
      setTodos((prev) => [...prev, newTodo]);
      setInput("");
    } catch (error) {
      console.error("Failed to add todo", error);
    }
  };

  // Delete todo
  const handleDelete = async (id) => {
    try {
      await deleteTodoService(id, user.token);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 animate-fadeIn">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            📝 My Todos
          </h1>

          <button
            onClick={logout}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 active:scale-95"
          >
            Add
          </button>
        </div>

        {/* Todos List */}
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : todos.length === 0 ? (
          <p className="text-center text-gray-500">
            No todos yet 🚀
          </p>
        ) : (
          <ul className="space-y-3">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              >
                <span className="text-gray-800">{todo.title}</span>
                <button
                  onClick={() => handleDelete(todo._id)}
                  className="text-sm text-red-500 hover:text-red-700 transition"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Todos;
