import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "./store/user";
import { useEffect } from "react";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";

const App = () => {
  const { user, fetchUser } = useUser();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" replace /> : <Signup />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
