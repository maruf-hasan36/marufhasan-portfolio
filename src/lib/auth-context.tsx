import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((email: string, password: string) => {
    // Admin credentials
    if (email === "marufhasanbr@gmail.com" && password === "maruf123") {
      setUser({ id: "admin-1", name: "Maruf Hasan", email, isAdmin: true });
      return true;
    }
    // Regular user login — accepts any other credentials
    setUser({
      id: "user-1",
      name: email.split("@")[0],
      email,
      isAdmin: false,
    });
    return true;
  }, []);

  const register = useCallback((name: string, email: string, _password: string) => {
    setUser({ id: "user-" + Date.now(), name, email, isAdmin: false });
    return true;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
