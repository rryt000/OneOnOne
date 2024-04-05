import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Initialize user from localStorage to persist login state across refreshes
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();

  useEffect(() => {
    // Persist user and token changes to localStorage
    if (token) {
      localStorage.setItem("site", token);
    } else {
      localStorage.removeItem("site");
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user, token]);

  const loginAction = async (data) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/account/login/", data, {
        headers: { "Content-Type": "application/json" },
      });
      const res = response.data;

      if (res.user && res.access) {
        setUser(res.user); // No need to stringify here, we'll stringify for localStorage
        setToken(res.access);
        // Navigate happens in useEffect to ensure localStorage has been updated
      } else {
        throw new Error(res.message || "Login failed");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    // localStorage removal handled by useEffect
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
