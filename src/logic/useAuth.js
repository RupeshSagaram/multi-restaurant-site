import { useState } from "react";

// Dummy authentication for demonstration
export const useAuth = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const login = () => {
    // Accept any credentials for demo
    setAuthenticated(true);
  };

  const logout = () => setAuthenticated(false);

  return { isAuthenticated, login, logout };
};