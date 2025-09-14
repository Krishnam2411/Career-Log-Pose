"use client";

import Header from "../components/Header";
import withAuth from "../components/withAuth";
import { useAuth } from "@/context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Header />
      <div className="container mx-auto px-6 py-8">
        <p className="text-gray-300">
          Welcome to your career journey dashboard!
        </p>
        {user && (
          <div className="mb-6 p-4 text-white">
            <div className="flex items-center gap-4">
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt="User avatar"
                  className="w-12 h-12 rounded-full border-2 border-yellow-400"
                />
              )}
              <div>
                <div className="font-bold">{user.displayName}</div>
                <div className="text-sm text-gray-300">{user.email}</div>
              </div>
            </div>
          </div>
        )}
        {/* Dashboard content will be implemented later */}
      </div>
    </div>
  );
}

export default withAuth(Dashboard);
