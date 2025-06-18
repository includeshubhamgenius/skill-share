import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";

export default function RedirectIfAuth({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return user ? <Navigate to="/daily" replace /> : children;
}
