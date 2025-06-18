import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center bg-white text-center px-4">
      <h1 className="text-4xl font-bold mb-4">SkillStream</h1>
      <p className="text-gray-600 mb-6">Learn one fun skill per day. Minimal. No scroll. Just skill.</p>
      <Link to="/login" className="bg-black text-white px-5 py-3 rounded-full hover:bg-gray-800">
        Get Started
      </Link>
    </div>
  );
}
