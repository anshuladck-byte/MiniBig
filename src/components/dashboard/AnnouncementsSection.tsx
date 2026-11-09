import React, { useState } from 'react';
import { SAMPLE_ANNOUNCEMENTS } from '../../data/sampleData';
import { AnnouncementCategory, CampusAnnouncement } from '../../types';
import { Badge, BadgeVariant } from '../common/Badge';
import { ShieldCheck, Pin, ArrowRight, ExternalLink } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';

export const AnnouncementsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const navigate = useNavigate();

  const categories = ['All', 'Campus', 'Clubs', 'Opportunities', 'Academic', 'Resources'];

  const filteredAnnouncements = activeCategory === 'All'
    ? SAMPLE_ANNOUNCEMENTS
    : SAMPLE_ANNOUNCEMENTS.filter((a) => a.category === activeCategory);

  const getSourceBadgeVariant = (isOfficial: boolean, badgeLabel: string): BadgeVariant => {
    if (isOfficial) return 'mist';
    if (badgeLabel.includes('Club')) return 'sage';
    if (badgeLabel.includes('Opportunity')) return 'sand';
    return 'neutral';
  };

  return (
    <div className="bg-white rounded-xl border border-[#EDE4D4] p-5 shadow-subtle space-y-4">
      {/* Header & Source Transparency Disclaimer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EDE4D4]/60 pb-3.5">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[#101311]">
              Campus Notices & Community Announcements
            </h3>
            <span className="text-[11px] font-semibold text-[#172B3A]/60 px-2 py-0.5 rounded-full bg-[#FAF8F2] border border-[#EDE4D4]">
              Public Digest
            </span>
          </div>
          <p className="text-xs text-[#172B3A]/70 mt-0.5 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#347653]" />
            <span>Clearly attributed sources • Distinguishes public notices from student posts</span>
          </p>
        </div>

        <button
          onClick={() => navigate('/feed')}
          className="text-xs font-semibold text-[#347653] hover:text-[#2B6244] flex items-center gap-1 self-start sm:self-auto hover:underline"
        >
          View all notices
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              'px-3 py-1 text-xs font-semibold rounded-lg transition-colors',
              activeCategory === cat
                ? 'bg-[#172B3A] text-white'
                : 'bg-[#FAF8F2] text-[#172B3A]/75 hover:bg-[#EDE4D4]/60 border border-[#EDE4D4]'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Announcements List */}
      <div className="divide-y divide-[#EDE4D4]/60">
        {filteredAnnouncements.map((item: CampusAnnouncement) => (
          <div
            key={item.id}
            className="py-3.5 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-start justify-between gap-3 group"
          >
            <div className="space-y-1 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                {item.pinned && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#347653] bg-[#EAF3ED] px-1.5 py-0.5 rounded">
                    <Pin className="w-3 h-3 rotate-45" /> PINNED
                  </span>
                )}
                <Badge variant={getSourceBadgeVariant(item.source.isOfficial, item.source.badgeLabel)} size="sm">
                  {item.source.badgeLabel}
                </Badge>
                <span className="text-[11px] text-[#172B3A]/50">•</span>
                <span className="text-[11px] font-medium text-[#172B3A]/60">{item.source.name}</span>
                <span className="text-[11px] text-[#172B3A]/50">•</span>
                <span className="text-[11px] text-[#172B3A]/60">{item.date}</span>
              </div>

              <h4 className="text-sm font-bold text-[#101311] group-hover:text-[#347653] transition-colors leading-snug">
                {item.title}
              </h4>
              <p className="text-xs text-[#172B3A]/80 leading-relaxed max-w-3xl">
                {item.summary}
              </p>
            </div>

            {item.actionText && (
              <button
                onClick={() => navigate('/resources')}
                className="shrink-0 self-start text-xs font-semibold text-[#172B3A] hover:text-[#347653] bg-[#FAF8F2] hover:bg-[#EDE4D4] px-2.5 py-1.5 rounded-lg border border-[#EDE4D4] transition-colors flex items-center gap-1.5"
              >
                <span>{item.actionText}</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
