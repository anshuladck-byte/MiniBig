
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowRight } from 'lucide-react';
import api from '../lib/api';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [usn, setUsn] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const successMessage = location.state?.message;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/login', {
        usn: usn.trim().toUpperCase(),
        password,
      });

      localStorage.setItem(
        'campus_token',
        response.data.access_token
      );

      localStorage.setItem(
        'campus_student',
        JSON.stringify(response.data.student)
      );

      navigate('/', { replace: true });

    } catch (err: any) {
      setError(
        err.response?.data?.detail || 'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-[#D8D3C4] bg-white text-black outline-none focus:border-[#80875B] transition';

  return (
    <div className="min-h-screen bg-[#FFFDF2] flex items-center justify-center p-5">

      <div className="w-full max-w-md">

        <div className="text-center mb-8">

          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#80875B] text-white mb-4">
            <GraduationCap size={30} />
          </div>

          <h1 className="text-3xl font-extrabold text-black">
            Welcome Back
          </h1>

          <p className="text-[#777568] mt-2">
            Login to your Campus account
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-[#E8E3D5] rounded-3xl p-7 sm:p-9 shadow-sm"
        >

          <h2 className="text-xl font-bold text-black mb-6">
            Student Login
          </h2>

          {successMessage && (
            <div className="mb-5 p-3 rounded-xl bg-[#EDF0E3] text-[#59633B] text-sm">
              {successMessage}
            </div>
          )}

          <div className="mb-5">

            <label className="block text-sm font-semibold mb-2">
              University Seat Number (USN)
            </label>

            <input
              required
              type="text"
              value={usn}
              onChange={(e) => setUsn(e.target.value)}
              placeholder="Enter your USN"
              className={inputClass}
            />

          </div>

          <div className="mb-5">

            <label className="block text-sm font-semibold mb-2">
              Password
            </label>

            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={inputClass}
            />

          </div>

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-black text-white font-bold flex items-center justify-center gap-2 hover:bg-[#80875B] transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
            {!loading && <ArrowRight size={18} />}
          </button>

          <p className="text-center text-sm text-[#777568] mt-6">
            New to Campus?{' '}
            <Link
              to="/register"
              className="font-bold text-[#737C4C] hover:underline"
            >
              Create an account
            </Link>
          </p>

        </form>

        <p className="text-center text-xs text-[#999384] mt-6">
          Campus · Your college, connected.
        </p>

      </div>

    </div>
  );
};
