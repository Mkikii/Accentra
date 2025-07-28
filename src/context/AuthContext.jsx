import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../api";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      setProfile({ role: user.role, id: user.id });
    }
    setLoadingAuth(false);
  }, []);

  const login = async (username, password, role) => {
    try {
      const response = await axios.post(`${API_URL}/api/login`, {
        username,
        password,
        role,
      });

      if (response.status === 200 && response.data.message === "Login successful") {
        const user = response.data.user;
        setCurrentUser(user);
        setProfile({ role: user.role, id: user.id });
        localStorage.setItem("user", JSON.stringify(user));
        if (user.role === "tenant") {
          navigate("/tenant");
        } else if (user.role === "landlord") {
          navigate("/landlord");
        } else {
          navigate("/");
        }
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setProfile(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  const signup = async (email, password, initialProfileData) => {
    return false;
  };

  const authValue = {
    currentUser,
    profile,
    loadingAuth,
    login,
    logout,
    signup,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {!loadingAuth && children}
    </AuthContext.Provider>
  );
};