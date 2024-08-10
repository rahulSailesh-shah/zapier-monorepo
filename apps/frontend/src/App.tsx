import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "./store/user";
import { useEffect } from "react";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import ZapCreate from "./screens/Zap/ZapCreate";
import { useError } from "./store/error";
import Error from "./components/Error";

const App: React.FC = () => {
  const { error } = useError();
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      {error && <Error error={error} />}
    </>
  );
};

const AppRoutes = () => {
  const { user, fetchUser } = useUser();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (user === null) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/zap/:zapId" element={<ZapCreate />} />
      <Route path="/*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
