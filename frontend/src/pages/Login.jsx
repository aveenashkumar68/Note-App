import { useState, useContext } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { setUser } = useContext(AuthContext); // ✅ get setter
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(formData); // ✅ get response
      setUser(data); // ✅ set user in context
      navigate("/todos"); // ✅ redirect
    } catch (error) {
      console.log("Login error:", error); // ✅ debug
      alert(error.message || "Login failed");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Login</h2>
      <input type="email" name="email" placeholder="Email" onChange={onChange} required />
      <input type="password" name="password" placeholder="Password" onChange={onChange} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
