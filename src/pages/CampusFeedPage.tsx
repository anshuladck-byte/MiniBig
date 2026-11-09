import React, { useState } from 'react';
import { SAMPLE_EVENTS, SAMPLE_ANNOUNCEMENTS } from '../data/sampleData';
import { CampusEvent, CampusAnnouncement } from '../types';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { EventDetailModal } from '../components/events/EventDetailModal';
import {
  Search,
  Calendar,
  MapPin,
  Users,
  ShieldCheck,
  Pin,
  Sparkles,
  ArrowUpRight,
  Filter,
} from 'lucide-react';
import { cn } from '../lib/utils';

export const CampusFeedPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'events' | 'notices'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedEvent, setSelectedEvent] = useState<CampusEvent | null>(null);

  const categories = ['All', 'Workshop', 'Hackathon', 'Clubs', 'Academic', 'Opportunities', 'Resources'];

  // Filter events
  const filteredEvents = SAMPLE_EVENTS.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      e.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' ||
      e.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  // Filter announcements
  const filteredAnnouncements = SAMPLE_ANNOUNCEMENTS.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' ||
      a.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="bg-white rounded-2xl border border-[#EDE4D4] p-5 sm:p-6 shadow-subtle">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#101311] tracking-tight">
                Campus Feed
              </h1>
              <Badge variant="green" size="sm">
                Live Pulse
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-[#172B3A]/75 max-w-xl leading-relaxed">
              Real-time directory of workshops, student club activities, hackathons, and campus notices. Searchable and categorized with transparent attribution.
            </p>
          </div>

          <div className="p-3 bg-[#FAF8F2] rounded-xl border border-[#EDE4D4] flex items-center gap-2 text-xs text-[#172B3A]/80 shrink-0">
            <ShieldCheck className="w-4 h-4 text-[#347653] shrink-0" />
            <span>Public Digest • Clearly distinguished source origins</span>
          </div>
        </div>

        {/* Search & Tabs Controls */}
        <div className="mt-6 pt-5 border-t border-[#EDE4D4]/70 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#FAF8F2] rounded-xl border border-[#EDE4D4] self-start">
            <button
              onClick={() => setActiveTab('all')}
              className={cn(
                'px-3 py-1.5 text-xs font-bold rounded-lg transition-colors',
                activeTab === 'all'
                  ? 'bg-[#172B3A] text-white shadow-xs'
                  : 'text-[#172B3A]/70 hover:text-[#101311]'
              )}
            >
              All Updates ({filteredEvents.length + filteredAnnouncements.length})
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={cn(
                'px-3 py-1.5 text-xs font-bold rounded-lg transition-colors',
                activeTab === 'events'
                  ? 'bg-[#172B3A] text-white shadow-xs'
                  : 'text-[#172B3A]/70 hover:text-[#101311]'
              )}
            >
              Events & Workshops ({filteredEvents.length})
            </button>
            <button
              onClick={() => setActiveTab('notices')}
              className={cn(
                'px-3 py-1.5 text-xs font-bold rounded-lg transition-colors',
                activeTab === 'notices'
                  ? 'bg-[#172B3A] text-white shadow-xs'
                  : 'text-[#172B3A]/70 hover:text-[#101311]'
              )}
            >
              Public Notices ({filteredAnnouncements.length})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-[#347653] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search feed by title, topic, or organizer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 bg-white rounded-xl border border-[#EDE4D4] text-[#101311] placeholder:text-[#101311]/40 focus:outline-none focus:border-[#347653]"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1">
          <Filter className="w-3.5 h-3.5 text-[#172B3A]/50 shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'px-2.5 py-1 text-xs font-semibold rounded-lg shrink-0 transition-colors',
                selectedCategory === cat
                  ? 'bg-[#347653] text-white shadow-xs'
                  : 'bg-white hover:bg-[#FAF8F2] text-[#172B3A]/70 border border-[#EDE4D4]'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Feed Area */}
      <div className="space-y-6">
        {/* Events Sub-section (if applicable) */}
        {(activeTab === 'all' || activeTab === 'events') && (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-base font-bold text-[#101311] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#347653]" />
                <span>Upcoming Events & Workshops</span>
              </h3>
              <span className="text-xs text-[#172B3A]/60">{filteredEvents.length} listed</span>
            </div>

            {filteredEvents.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-xl border border-[#EDE4D4] text-xs text-[#172B3A]/60">
                No events matching "{searchQuery}" in category "{selectedCategory}".
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredEvents.map((evt) => (
                  <div
                    key={evt.id}
                    onClick={() => setSelectedEvent(evt)}
                    className="bg-white rounded-xl border border-[#EDE4D4] p-4 shadow-subtle hover:shadow-card hover:border-[#347653]/40 transition-all cursor-pointer flex flex-col sm:flex-row gap-4"
                  >
                    <img
                      src={evt.imageUrl}
                      alt={evt.title}
                      className="w-full sm:w-36 h-32 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <Badge variant="sage" size="sm">
                            {evt.category}
                          </Badge>
                          <span className="text-[10px] text-[#347653] font-bold">
                            {evt.attendeeCount} going
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-[#101311] line-clamp-1 hover:text-[#347653] transition-colors">
                          {evt.title}
                        </h4>
                        <p className="text-xs text-[#172B3A]/70 line-clamp-2 mt-1">
                          {evt.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-[#EDE4D4]/60 flex items-center justify-between text-xs text-[#172B3A]/80">
                        <span className="truncate">{evt.date} • {evt.venue}</span>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEvent(evt);
                          }}
                          iconRight={<ArrowUpRight className="w-3 h-3" />}
                        >
                          RSVP
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Announcements Sub-section (if applicable) */}
        {(activeTab === 'all' || activeTab === 'notices') && (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-base font-bold text-[#101311] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#347653]" />
                <span>Notice Digest & Announcements</span>
              </h3>
              <span className="text-xs text-[#172B3A]/60">
                {filteredAnnouncements.length} notices
              </span>
            </div>

            {filteredAnnouncements.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-xl border border-[#EDE4D4] text-xs text-[#172B3A]/60">
                No announcements matching "{searchQuery}" in category "{selectedCategory}".
              </div>
            ) : (
              <div className="space-y-3">
                {filteredAnnouncements.map((ann) => (
                  <div
                    key={ann.id}
                    className="bg-white rounded-xl border border-[#EDE4D4] p-4 sm:p-5 shadow-subtle hover:border-[#347653]/30 transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        {ann.pinned && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#347653] bg-[#EAF3ED] px-1.5 py-0.5 rounded">
                            <Pin className="w-3 h-3 rotate-45" /> PINNED
                          </span>
                        )}
                        <Badge variant="mist" size="sm">
                          {ann.source.badgeLabel}
                        </Badge>
                        <span className="text-xs font-semibold text-[#101311]">
                          {ann.source.name}
                        </span>
                      </div>
                      <span className="text-xs text-[#172B3A]/50">{ann.date}</span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-[#101311] mb-1">
                      {ann.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#172B3A]/80 leading-relaxed">
                      {ann.summary}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Event Details Dialog Modal */}
      <EventDetailModal
        event={selectedEvent}
        isOpen={Boolean(selectedEvent)}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
};
