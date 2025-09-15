"use client";

import { useState } from "react";

interface CareerMatch {
  id: string;
  title: string;
  date: string;
  preview: string;
}

// Placeholder for career matches - replace with real data via props or state
const careerMatches: CareerMatch[] = [];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onSelectMatch: (matchId: string) => void;
  onNewSession: () => void;
}

export default function Sidebar({
  isOpen,
  onToggle,
  onSelectMatch,
  onNewSession,
}: SidebarProps) {
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);

  const handleSelectMatch = (matchId: string) => {
    setSelectedMatch(matchId);
    onSelectMatch(matchId);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed left-0 right-0 top-16 bottom-0 bg-black bg-opacity-50 z-40"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-64px)] w-80 bg-slate-800 border-r border-slate-700 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-slate-700">
            {/* New Session Button */}
            <button
              onClick={onNewSession}
              className="w-full mt-3 px-3 py-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New Session
            </button>
          </div>

          {/* Discovered Careers Title */}
          <div className="flex items-center gap-2 px-4 pt-4 pb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-300"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="5" r="3"></circle>
              <line x1="12" y1="22" x2="12" y2="8"></line>
              <path d="M5 12H2a10 10 0 0 0 20 0h-3"></path>
            </svg>
            <span className="text-white font-semibold text-base">
              Discovered Careers
            </span>
          </div>
          {/* Career Matches List */}
          <div className="flex-1 overflow-y-auto p-2">
            {careerMatches.length === 0 ? (
              <div className="text-center text-gray-400 mt-8">
                <p className="text-sm">No career matches yet</p>
                <p className="text-xs mt-1">Start a new session to begin</p>
              </div>
            ) : (
              <div className="space-y-2">
                {careerMatches.map((match) => (
                  <button
                    key={match.id}
                    onClick={() => handleSelectMatch(match.id)}
                    className={`
                      w-full text-left p-3 rounded-lg transition-colors
                      ${
                        selectedMatch === match.id
                          ? "bg-slate-700 border border-slate-600"
                          : "hover:bg-slate-700/50"
                      }
                    `}
                  >
                    <div className="text-white font-medium text-sm truncate">
                      {match.title}
                    </div>
                    <div className="text-gray-400 text-xs mt-1">
                      {match.date}
                    </div>
                    <div className="text-gray-300 text-xs mt-1 truncate">
                      {match.preview}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-700">
            <div className="text-xs text-gray-400 text-center">
              {careerMatches.length} career{" "}
              {careerMatches.length === 1 ? "match" : "matches"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
