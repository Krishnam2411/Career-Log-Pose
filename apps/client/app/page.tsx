import Header from './components/Header';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Header />
      
      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 md:px-8 md:py-12 min-h-[calc(100vh-80px)]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight px-2">
            Chart Your Course to the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Future
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Our AI-powered guide helps you navigate the vast sea of career 
            choices to find the one that's perfect for you.
          </p>
          
          <Link 
            href="/dashboard"
            className="inline-block px-6 py-3 md:px-8 md:py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-base md:text-lg rounded-lg transition-colors shadow-lg hover:shadow-xl"
          >
            Start Your Quest
          </Link>
        </div>
      </main>
    </div>
  );
}
