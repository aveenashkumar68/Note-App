import { useState, useContext } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register(formData);
      setUser(data);
      navigate("/todos");
    } catch (error) {
      console.log("Register error:", error);
      alert(error.message || "Register failed");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Register</h2>
      <input type="text" name="name" placeholder="Name" onChange={onChange} required />
      <input type="email" name="email" placeholder="Email" onChange={onChange} required />
      <input type="password" name="password" placeholder="Password" onChange={onChange} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
