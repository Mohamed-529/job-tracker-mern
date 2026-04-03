import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

// BUG FIX: token must be in state, not a plain variable.
// Plain variable reads localStorage once at module load and never updates.
// After login → navigate("/"), App re-renders but token var is still null → redirects back to /login.
// With useState, setToken() triggers a re-render so the guard sees the new token immediately.
function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={token ? <Dashboard setToken={setToken} /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
