import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpenCheck, PlusCircle, Users, Car, Calendar } from 'lucide-react';
import { cn } from '../../lib/utils';

export const QuickActionsGrid: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Find a tutor',
      subtitle: 'DSA, Math, Systems',
      icon: BookOpenCheck,
      colorVariant: 'sage',
      onClick: () => navigate('/services?category=Tutoring'),
    },
    {
      title: 'Offer a service',
      subtitle: 'Design, code, editing',
      icon: PlusCircle,
      colorVariant: 'forest',
      onClick: () => navigate('/services?action=new'),
    },
    {
      title: 'Find teammates',
      subtitle: 'Hackathons & projects',
      icon: Users,
      colorVariant: 'mist',
      onClick: () => navigate('/students'),
    },
    {
      title: 'Explore rides',
      subtitle: 'Campus commute pool',
      icon: Car,
      colorVariant: 'sand',
      onClick: () => navigate('/rides'),
    },
    {
      title: 'Discover events',
      subtitle: 'Workshops & meetups',
      icon: Calendar,
      colorVariant: 'navy',
      onClick: () => navigate('/feed'),
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {actions.map((act) => {
        const Icon = act.icon;
        const isForest = act.colorVariant === 'forest';
        const isNavy = act.colorVariant === 'navy';

        return (
          <button
            key={act.title}
            onClick={act.onClick}
            className={cn(
              'flex flex-col items-start p-3.5 sm:p-4 rounded-xl border text-left transition-all duration-200 group relative',
              isForest
                ? 'bg-[#347653] text-white border-[#2B6244] shadow-xs hover:bg-[#2B6244] hover:shadow-card'
                : isNavy
                ? 'bg-[#172B3A] text-white border-[#213D52] shadow-xs hover:bg-[#12222E] hover:shadow-card'
                : act.colorVariant === 'sage'
                ? 'bg-white hover:bg-[#FAF8F2] border-[#EDE4D4] text-[#101311] shadow-subtle hover:border-[#347653]/40'
                : act.colorVariant === 'mist'
                ? 'bg-white hover:bg-[#FAF8F2] border-[#EDE4D4] text-[#101311] shadow-subtle hover:border-[#347653]/40'
                : 'bg-white hover:bg-[#FAF8F2] border-[#EDE4D4] text-[#101311] shadow-subtle hover:border-[#347653]/40'
            )}
          >
            <div
              className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center mb-2.5 transition-transform group-hover:scale-105',
                isForest
                  ? 'bg-white/20 text-white'
                  : isNavy
                  ? 'bg-white/15 text-white'
                  : act.colorVariant === 'sage'
                  ? 'bg-[#DDE9D9] text-[#2C4F3B]'
                  : act.colorVariant === 'mist'
                  ? 'bg-[#E2E9E8] text-[#28444A]'
                  : 'bg-[#EDE4D4] text-[#524430]'
              )}
            >
              <Icon className="w-4 h-4" />
            </div>
            <span
              className={cn(
                'text-xs sm:text-sm font-bold tracking-tight block leading-snug',
                isForest || isNavy ? 'text-white' : 'text-[#101311]'
              )}
            >
              {act.title}
            </span>
            <span
              className={cn(
                'text-[11px] block mt-0.5 line-clamp-1',
                isForest ? 'text-[#DDE9D9]' : isNavy ? 'text-[#E2E9E8]/70' : 'text-[#172B3A]/60'
              )}
            >
              {act.subtitle}
            </span>
          </button>
        );
      })}
    </div>
  );
};
