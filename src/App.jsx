import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { AuthProvider } from "./context/Auth";
import Tasks from './pages/Tasks/Tasks';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Login" element={<Login />} />
          <Route path="Signup" element={<Signup />} />
          <Route path="Tasks" element={<Tasks />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
