import Header from '../components/Header';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-8 md:px-8 md:py-12 min-h-[calc(100vh-80px)]">
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl">
            <h1 className="text-3xl font-bold text-white mb-4 text-center">Privacy Policy</h1>

            <div className="text-gray-300 space-y-4">
              <p>
                Your privacy is important to us. This policy outlines how we collect, use, and protect your information:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>We collect personal information only with your consent.</li>
                <li>Your data is used to improve our services and provide a better user experience.</li>
                <li>We do not share your information with third parties without your explicit consent.</li>
                <li>Our application uses cookies to enhance functionality and analyze usage.</li>
                <li>You have the right to access, modify, or delete your personal data at any time.</li>
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