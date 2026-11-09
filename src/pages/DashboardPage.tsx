import React from 'react';
import { WelcomeBanner } from '../components/dashboard/WelcomeBanner';
import { QuickActionsGrid } from '../components/dashboard/QuickActionsGrid';
import { CampusEventsSection } from '../components/dashboard/CampusEventsSection';
import { AnnouncementsSection } from '../components/dashboard/AnnouncementsSection';
import { ConnectPeopleSection } from '../components/dashboard/ConnectPeopleSection';
import { UpcomingDeadlinesSection } from '../components/dashboard/UpcomingDeadlinesSection';
import { Button } from '../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { Car, Briefcase, ShieldCheck, ArrowRight } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Welcome Section */}
      <WelcomeBanner />

      {/* 2. Quick Actions */}
      <QuickActionsGrid />

      {/* 3. Happening on Campus Events */}
      <CampusEventsSection />

      {/* 4. Two-Column Layout for Feed/Notices and Sidebar Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          <AnnouncementsSection />
          <ConnectPeopleSection />
        </div>

        {/* Right Column (Span 1) */}
        <div className="space-y-6">
          {/* Upcoming Deadlines */}
          <UpcomingDeadlinesSection />

          {/* Peer Services Spotlight Card */}
          <div className="bg-white rounded-xl border border-[#EDE4D4] p-5 shadow-subtle space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FAF8F2] border border-[#EDE4D4] flex items-center justify-center text-[#347653]">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#101311]">Student Services</h4>
                <p className="text-[11px] text-[#172B3A]/60">Peer tutoring & creative skills</p>
              </div>
            </div>
            <p className="text-xs text-[#172B3A]/80 leading-relaxed">
              Need tutoring in DSA, a UX review on your hackathon prototype, or presentation polish? Peer offerings start from ₹350/hr.
            </p>
            <div className="pt-2 border-t border-[#EDE4D4]/60 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#347653] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Academic Integrity First
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/services')}
                iconRight={<ArrowRight className="w-3 h-3" />}
              >
                Browse
              </Button>
            </div>
          </div>

          {/* Campus Carpool Spotlight Card */}
          <div className="bg-gradient-to-br from-[#172B3A] to-[#12222E] text-white rounded-xl p-5 shadow-subtle space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#DDE9D9]">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Daily Carpool</h4>
                  <p className="text-[11px] text-[#E2E9E8]/70">Safe student commutes</p>
                </div>
              </div>
              <span className="text-[10px] uppercase font-bold bg-[#347653] text-white px-2 py-0.5 rounded-full">
                Eco
              </span>
            </div>
            <p className="text-xs text-[#E2E9E8]/85 leading-relaxed">
              Share fuel costs and skip crowded peak transit. Connect with fellow students commuting along your metro route.
            </p>
            <div className="pt-2 border-t border-[#213D52] flex items-center justify-between">
              <span className="text-xs text-[#DDE9D9] font-medium">3 active routes today</span>
              <Button
                variant="subtle"
                size="sm"
                onClick={() => navigate('/rides')}
                className="bg-white/10 hover:bg-white/20 text-white border-transparent"
              >
                View Rides
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
