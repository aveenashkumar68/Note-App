const API_URL = "http://localhost:4000/api/todos"; // no /auth here



export const fetchTodos = async (token) => {
  const res = await fetch("http://localhost:4000/api/todos", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
};

export const createTodo = async (title, token) => {
  const res = await fetch("http://localhost:4000/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error("Failed to create todo");
  return res.json();
};


export const updateTodo = async (id, updates, token) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });
  return res.json();
};

export const deleteTodo = async (id, token) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};
