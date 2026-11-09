import React from 'react';
import { SAMPLE_DEADLINES } from '../../data/sampleData';
import { CalendarClock, AlertCircle, ArrowRight } from 'lucide-react';
import { Badge } from '../common/Badge';
import { useNavigate } from 'react-router-dom';

export const UpcomingDeadlinesSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-[#EDE4D4] p-5 shadow-subtle space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#EDE4D4]/60 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#FAF8F2] border border-[#EDE4D4] flex items-center justify-center text-[#172B3A]">
            <CalendarClock className="w-4 h-4 text-[#347653]" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#101311]">
              Upcoming Deadlines & Milestones
            </h3>
            <p className="text-[11px] text-[#172B3A]/60">Academic & opportunity timeline</p>
          </div>
        </div>

        <button
          onClick={() => navigate('/resources')}
          className="text-xs font-semibold text-[#347653] hover:underline flex items-center gap-1"
        >
          View calendar
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Deadlines List */}
      <div className="space-y-2.5">
        {SAMPLE_DEADLINES.map((item) => (
          <div
            key={item.id}
            className="p-3 rounded-xl bg-[#FAF8F2] border border-[#EDE4D4]/80 flex items-center justify-between gap-3 hover:border-[#347653]/30 transition-colors"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge
                  variant={
                    item.type === 'scholarship'
                      ? 'sand'
                      : item.type === 'hackathon'
                      ? 'navy'
                      : item.type === 'workshop'
                      ? 'sage'
                      : 'mist'
                  }
                  size="sm"
                >
                  {item.category}
                </Badge>
                <span className="text-[11px] text-[#172B3A]/50 font-medium">
                  {item.sourceNote}
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-[#101311] truncate">
                {item.title}
              </h4>
              <p className="text-[11px] text-[#172B3A]/70 mt-0.5">Due: {item.date}</p>
            </div>

            <div className="text-right shrink-0">
              <span className="inline-block px-2.5 py-1 rounded-lg bg-[#EAF3ED] text-[#235037] text-xs font-bold border border-[#C6E2D0]">
                {item.daysRemaining}d left
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Sample demonstration disclaimer */}
      <div className="pt-2 border-t border-[#EDE4D4]/60 flex items-center gap-1.5 text-[11px] text-[#172B3A]/60">
        <AlertCircle className="w-3.5 h-3.5 text-[#524430] shrink-0" />
        <span>Demonstration sample data • Independent student tracker</span>
      </div>
    </div>
  );
};
