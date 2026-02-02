// src/services/authService.js
const API_URL = " https://note-app-qb8n.onrender.com/api/auth";// ✅ matches Postman

export const login = async (formData) => {
  console.log("Login API hit:", formData); // debug
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData), // ✅ must match Postman
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log("Login error from backend:", errorData);
    throw errorData;
  }

  const data = await response.json();
  console.log("Login response data:", data); // debug
  localStorage.setItem("user", JSON.stringify(data));
  return data;
};


export const register = async (formData) => {
  console.log("Register API hit:", formData);
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log("Register error from backend:", errorData);
    throw errorData;
  }

  const data = await response.json();
  console.log("Register response data:", data);
  localStorage.setItem("user", JSON.stringify(data));
  return data;
};
