"use client";

import { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import Sidebar from "../components/Sidebar";
import withAuth from "../components/withAuth";
import { useAuth } from "@/context/AuthContext";

function Dashboard() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'welcome' | 'session' | 'match'>('welcome');
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);

  const handleSelectMatch = (matchId: string) => {
    setSelectedMatchId(matchId);
    setCurrentView('match');
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const handleNewSession = () => {
    setCurrentView('session');
    setSelectedMatchId(null);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const handleStartNewSession = () => {
    setCurrentView('session');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-850">
      <DashboardHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar 
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          onSelectMatch={handleSelectMatch}
          onNewSession={handleNewSession}
        />

        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto">
            {currentView === 'welcome' && (
              <div className="flex items-center justify-center h-full px-6">
                <div className="text-center max-w-2xl">
                  <div className="mb-8">
                    <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-3xl font-bold text-gray-900">✦</span>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4">
                      Your Career Matches
                    </h1>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Embark on a new career exploration journey. Answer a few questions to chart your course towards your ideal career path.
                    </p>
                  </div>
                  
                  <button
                    onClick={handleStartNewSession}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Start New Session
                  </button>
                </div>
              </div>
            )}

            {currentView === 'session' && (
              <div className="p-6">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-2xl font-bold text-white mb-6">New Career Exploration Session</h2>
                  <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
                    <p className="text-gray-300 mb-4">
                      Let's start your career exploration journey! This is where the career matching session will be implemented.
                    </p>
                    <div className="text-yellow-400 text-sm">
                      🚧 Career matching interface coming soon...
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentView === 'match' && selectedMatchId && (
              <div className="p-6">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-2xl font-bold text-white mb-6">Career Match Details</h2>
                  <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
                    <p className="text-gray-300 mb-4">
                      Viewing details for career match: {selectedMatchId}
                    </p>
                    <div className="text-yellow-400 text-sm">
                      🚧 Career match details coming soon...
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Dashboard);
