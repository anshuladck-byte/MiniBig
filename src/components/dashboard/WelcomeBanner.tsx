
import React from 'react';
import { Sparkles, ArrowRight, BookOpen, Compass } from 'lucide-react';
import { Button } from '../common/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const WelcomeBanner: React.FC = () => {
  const navigate = useNavigate();
  const { student, loading } = useAuth();

  return (
    <div className="bg-white rounded-2xl border border-[#EDE4D4] p-5 sm:p-6 shadow-subtle relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#EAF3ED] border border-[#C4DFC0] text-[11px] font-semibold text-[#235037]">
          <Sparkles className="w-3.5 h-3.5 text-[#347653]" />
          <span>Active Semester: 5th Sem B.Tech</span>
        </div>
        <span className="text-xs text-[#172B3A]/60 font-medium">
          Thursday, Oct 29 • Campus Digital Ecosystem
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="max-w-2xl">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#101311] tracking-tight">
            {loading ? 'Loading...' : `Good morning, ${student?.full_name?.split(' ')[0] || 'Student'}`}
          </h1>

          <p className="text-xs font-semibold text-[#172B3A]/60 mt-1">
            {student?.usn || ''}
          </p>

          <p className="text-xs sm:text-sm text-[#172B3A]/75 mt-2 leading-relaxed">
            Welcome to your peer campus hub. Connect with multidisciplinary engineering peers, discover technical workshops, or coordinate daily carpools.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Button
            variant="primary"
            size="md"
            icon={<Compass className="w-4 h-4" />}
            onClick={() => navigate('/feed')}
          >
            Explore campus
          </Button>
          <Button
            variant="secondary"
            size="md"
            icon={<BookOpen className="w-4 h-4 text-[#172B3A]" />}
            iconRight={<ArrowRight className="w-3.5 h-3.5 text-[#172B3A]/60" />}
            onClick={() => navigate('/resources')}
          >
            Browse opportunities
          </Button>
        </div>
      </div>
    </div>
  );
};
