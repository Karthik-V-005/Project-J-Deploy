import { useState, useEffect } from 'react';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { Gem, ShieldCheck, Sun, Moon } from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`${isDarkMode ? 'bg-black border-b border-amber-500/20' : 'bg-white border-b border-gray-200'} shadow-md`}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-3 rounded-lg shadow-lg">
                <Gem className="w-8 h-8 text-black" />
              </div>
              <div>
                <h1 className={`${isDarkMode ? 'text-amber-500' : 'text-gray-900'}`}>PROJECT J</h1>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Admin Control Panel</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Admin Badge */}
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                isDarkMode 
                  ? 'bg-amber-500/10 border-amber-500/20' 
                  : 'bg-amber-100 border-amber-300'
              }`}>
                <ShieldCheck className={`w-5 h-5 ${isDarkMode ? 'text-amber-500' : 'text-amber-700'}`} />
                <span className={isDarkMode ? 'text-amber-500' : 'text-amber-900'}>Admin Panel</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {isLoggedIn ? (
          <AdminDashboard onLogout={handleLogout} isDarkMode={isDarkMode} />
        ) : (
          <div className="container mx-auto px-4 py-8">
            <AdminLogin onLogin={handleLogin} isDarkMode={isDarkMode} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`${isDarkMode ? 'bg-black border-t border-amber-500/20' : 'bg-white border-t border-gray-200'} mt-16`}>
        <div className="container mx-auto px-4 py-6">
          <div className={`text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <p>© 2024 PROJECT J Admin Panel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
