import React, { createContext, useContext, useState } from 'react';

// 创建一个 Context
const AuthContext = createContext();

// 创建一个 AuthProvider 组件，用于提供全局的登录状态
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 初始状态为未登录

  const loginAuth = () => {
    setIsLoggedIn(true);
  };

  const logoutAuth = () => {
    // 在这里执行登出逻辑
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loginAuth, logoutAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
