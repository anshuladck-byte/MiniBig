
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { ArrowRight, GraduationCap } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: '',
    usn: '',
    email: '',
    phone: '',
    branch: '',
    semester: '',
    section: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (form.password.length < 8) {
      setError('Password must contain at least 8 characters.');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...studentData } = form;

      await api.post('/register', {
        ...studentData,
        usn: studentData.usn.trim().toUpperCase(),
        email: studentData.email.trim().toLowerCase(),
        semester: Number(studentData.semester),
      });

      navigate('/login', {
        state: { message: 'Registration successful. Please log in.' },
      });

    } catch (err: any) {
      setError(
        err.response?.data?.detail || 'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-[#D8D3C4] bg-white text-black outline-none focus:border-[#80875B] transition';

  return (
    <div className="min-h-screen bg-[#FFFDF2] flex items-center justify-center p-5">

      <div className="w-full max-w-2xl">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#80875B] text-white mb-4">
            <GraduationCap size={30} />
          </div>

          <h1 className="text-3xl font-extrabold text-black">
            Join Campus
          </h1>

          <p className="text-[#777568] mt-2">
            Create your student account
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-[#E8E3D5] rounded-3xl p-6 sm:p-9 shadow-sm"
        >

          <h2 className="text-xl font-bold text-black mb-6">
            Student Registration
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold mb-2">
                Full Name
              </label>
              <input
                required
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                University Seat Number (USN)
              </label>
              <input
                required
                name="usn"
                value={form.usn}
                onChange={handleChange}
                placeholder="Enter your USN"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                College Email
              </label>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Phone Number
              </label>
              <input
                required
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="10-digit phone number"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Branch
              </label>
              <select
                required
                name="branch"
                value={form.branch}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select branch</option>
                <option value="ISE">Information Science (ISE)</option>
                <option value="CSE">Computer Science (CSE)</option>
                <option value="ECE">Electronics (ECE)</option>
                <option value="EEE">Electrical (EEE)</option>
                <option value="ME">Mechanical (ME)</option>
                <option value="CIVIL">Civil</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Semester
              </label>
              <select
                required
                name="semester"
                value={form.semester}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select semester</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <option key={s} value={s}>
                    Semester {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Section
              </label>
              <input
                required
                name="section"
                value={form.section}
                onChange={handleChange}
                placeholder="e.g. A"
                className={inputClass}
              />
            </div>

            <div className="sm:col-span-2 border-t border-[#E8E3D5] pt-5 mt-2">
              <h3 className="font-bold text-black mb-4">
                Create Your Password
              </h3>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Password
              </label>
              <input
                required
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Minimum 8 characters"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Confirm Password
              </label>
              <input
                required
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                className={inputClass}
              />
            </div>

          </div>

          {error && (
            <div className="mt-5 p-3 rounded-xl bg-red-50 text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-7 py-4 rounded-xl bg-black text-white font-bold flex items-center justify-center gap-2 hover:bg-[#80875B] transition disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
            {!loading && <ArrowRight size={18} />}
          </button>

          <p className="text-center text-sm text-[#777568] mt-6">
            Already registered?{' '}
            <Link
              to="/login"
              className="font-bold text-[#737C4C] hover:underline"
            >
              Login here
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
