import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AuthState {
  token: string;
  username: string;
  userId: string;
}

interface AuthContextProps {
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}

export const AuthContext = createContext<AuthContextProps>({
  authState: { token: "", username: "", userId: "" },
  setAuthState: () => {
    // Provide a default implementation if needed
    console.warn("setAuthState is not implemented");
  },
});

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: "",
    username: "",
    userId: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");

    if (token && username && userId) {
      setAuthState({ token, username, userId });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
