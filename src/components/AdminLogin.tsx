import { useState } from 'react';
import { ShieldCheck, AlertCircle, Mail } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
  isDarkMode: boolean;
}

type LoginStep = 'credentials' | 'otp';

export function AdminLogin({ onLogin, isDarkMode }: AdminLoginProps) {
  const [step, setStep] = useState<LoginStep>('credentials');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Demo admin credentials
    if (username === 'admin' && password === 'admin123') {
      // Generate OTP
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(newOtp);
      console.log('Generated OTP:', newOtp); // For demo purposes
      setStep('otp');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const enteredOtp = otp.join('');
    
    if (enteredOtp === generatedOtp) {
      onLogin();
    } else {
      setError('Invalid OTP. Please try again.');
      setOtp(['', '', '', '', '', '']);
      const firstInput = document.getElementById('otp-0');
      firstInput?.focus();
    }
  };

  const handleBackToCredentials = () => {
    setStep('credentials');
    setOtp(['', '', '', '', '', '']);
    setError('');
  };

  return (
    <div className="max-w-md mx-auto">
      <div className={`${isDarkMode ? 'bg-zinc-900 border border-amber-500/20' : 'bg-white'} rounded-2xl shadow-xl p-8`}>
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-4 rounded-full">
            <ShieldCheck className="w-8 h-8 text-black" />
          </div>
        </div>
        
        <h2 className={`text-center mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Admin Login</h2>
        <p className={`text-center mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {step === 'credentials' ? 'Secure access to admin dashboard' : 'Enter the OTP sent to your device'}
        </p>

        {error && (
          <div className={`${isDarkMode ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-200'} border rounded-lg p-3 mb-4 flex items-start gap-2`}>
            <AlertCircle className={`w-5 h-5 ${isDarkMode ? 'text-red-400' : 'text-red-500'} flex-shrink-0 mt-0.5`} />
            <p className={`text-sm ${isDarkMode ? 'text-red-400' : 'text-red-700'}`}>{error}</p>
          </div>
        )}

        {step === 'credentials' ? (
          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            <div>
              <label className={`block text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                className={`w-full px-4 py-3 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-black border-amber-500/20 text-white placeholder-gray-500 focus:border-amber-500' 
                    : 'bg-white border-gray-300 focus:border-amber-500'
                } focus:ring-2 focus:ring-amber-500/20 transition-all`}
              />
            </div>

            <div>
              <label className={`block text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className={`w-full px-4 py-3 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-black border-amber-500/20 text-white placeholder-gray-500 focus:border-amber-500' 
                    : 'bg-white border-gray-300 focus:border-amber-500'
                } focus:ring-2 focus:ring-amber-500/20 transition-all`}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black py-3 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5" />
              Continue to OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div className="flex justify-center mb-4">
              <Mail className={`w-12 h-12 ${isDarkMode ? 'text-amber-500' : 'text-amber-600'}`} />
            </div>

            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className={`w-12 h-12 text-center rounded-lg border-2 ${
                    isDarkMode 
                      ? 'bg-black border-amber-500/20 text-white focus:border-amber-500' 
                      : 'bg-white border-gray-300 focus:border-amber-500'
                  } focus:ring-2 focus:ring-amber-500/20 transition-all`}
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black py-3 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5" />
              Verify & Login
            </button>

            <button
              type="button"
              onClick={handleBackToCredentials}
              className={`w-full py-3 rounded-lg ${
                isDarkMode 
                  ? 'text-gray-400 hover:text-white hover:bg-white/5' 
                  : 'text-gray-600 hover:bg-gray-100'
              } transition-all`}
            >
              Back to Login
            </button>
          </form>
        )}

        {/* Demo Credentials */}
        <div className={`mt-6 p-4 ${isDarkMode ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-blue-50'} rounded-lg`}>
          <p className={`text-xs mb-2 ${isDarkMode ? 'text-amber-500' : 'text-blue-800'}`}>Demo Credentials:</p>
          <p className={`text-xs ${isDarkMode ? 'text-amber-400' : 'text-blue-700'}`}>Username: admin</p>
          <p className={`text-xs ${isDarkMode ? 'text-amber-400' : 'text-blue-700'}`}>Password: admin123</p>
          {step === 'otp' && (
            <p className={`text-xs mt-2 ${isDarkMode ? 'text-amber-400' : 'text-blue-700'}`}>OTP: {generatedOtp} (Check console)</p>
          )}
        </div>
      </div>
    </div>
  );
}
