import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Invalid user in localStorage", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // important
    setUser(null);
  };

  if (loading) return <h3>Loading...</h3>;

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
