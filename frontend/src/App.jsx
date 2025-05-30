// frontend/src/App.jsx

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";
import PlayerArea from "./components/PlayerArea";
import PlayTrivia from "./components/player/PlayTrivia";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <Routes>
        {/* Login route */}
        <Route path="/login" element={<Login />} />

        {/* Admin panel, protected */}
        <Route
          path="/admin"
          element={
            token && role === "admin" ? (
              <AdminPanel />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Player dashboard, protected */}
        <Route
          path="/player"
          element={
            token && role === "player" ? (
              <PlayerArea />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Play a specific trivia, protected and role-based */}
        <Route
          path="/player/play/:triviaId"
          element={
            token && role === "player" ? (
              <PlayTrivia />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Fallback: redirect everything else to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
