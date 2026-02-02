import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todos from "./pages/Todos";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/todos"
        element={
          <PrivateRoute>
            <Todos />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Login />} /> {/* fallback */}
    </Routes>
  );
}

export default App;
