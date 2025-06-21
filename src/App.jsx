import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Signup from "./pages/Signup";
import Login from './pages/Login';
import DailySkill from './pages/DailySkill';
import Profile from './pages/Profile';
import ProfileSetup from './pages/ProfileSetup';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';
import RedirectIfAuth from './components/RedirectIfAuth'; // ✅ import

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* ✅ Redirect logged-in users away from login/signup */}
        <Route
          path="/signup"
          element={
            <RedirectIfAuth>
              <Signup />
            </RedirectIfAuth>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectIfAuth>
              <Login />
            </RedirectIfAuth>
          }
        />

        {/* ✅ Protect daily page */}
        <Route
          path="/daily"
          element={
            <ProtectedRoute>
              <DailySkill />
            </ProtectedRoute>
          }
        />
        <Route path="/profile" element={<Profile />} />
         <Route path="/ProfileSetup" element={<ProfileSetup />} />
      </Routes>
    </BrowserRouter>
  );
}
