import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Project from "./pages/Project";
import Task from "./pages/Task";
import User from "./pages/User";
import NotFound from "./pages/NotFound";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <Header />
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicRoute />}>
              <Route index element={<Login />} />
              <Route path="/login" element={<Login />} />
            </Route>

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/projects" element={<Project />} />
              <Route path="/tasks" element={<Task />} />
              <Route path="/users" element={<User />} />
            </Route>

            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
