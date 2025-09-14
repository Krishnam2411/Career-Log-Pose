import Header from '../components/Header';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-8 md:px-8 md:py-12 min-h-[calc(100vh-80px)]">
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl">
            <h1 className="text-3xl font-bold text-white mb-4 text-center">Terms of Service</h1>

            <div className="text-gray-300 space-y-4">
              <p>
                Welcome to our application. By accessing or using our services, you agree to be bound by the following terms and conditions:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>You must be at least 18 years old to use our services.</li>
                <li>Do not use our services for any illegal or unauthorized purposes.</li>
                <li>Respect intellectual property rights and do not infringe on copyrights or trademarks.</li>
                <li>We reserve the right to terminate your access if you violate these terms.</li>
                <li>Our services are provided "as is" without any warranties or guarantees.</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-6">
            <a 
              href="/login" 
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              ← Back to Login
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}