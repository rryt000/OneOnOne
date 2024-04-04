import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./hooks/AuthProvider";
import PrivateRoute from "./router/route";

import HomePage from "./pages/homepage/HomePage";
import LoginPage from "./pages/login/Login";
import RegisterPage from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
