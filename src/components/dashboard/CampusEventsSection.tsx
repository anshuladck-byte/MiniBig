import React, { useState } from 'react';
import { Calendar, MapPin, Users, ArrowUpRight } from 'lucide-react';
import { CampusEvent } from '../../types';
import { SAMPLE_EVENTS } from '../../data/sampleData';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { EventDetailModal } from '../events/EventDetailModal';
import { useNavigate } from 'react-router-dom';

export const CampusEventsSection: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<CampusEvent | null>(null);
  const navigate = useNavigate();

  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case 'Workshop':
        return 'sage';
      case 'Hackathon':
        return 'navy';
      case 'Technical Talk':
        return 'mist';
      default:
        return 'sand';
    }
  };

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#101311] tracking-tight">
              Happening on campus
            </h2>
            <Badge variant="green-subtle" size="sm">
              Live Schedule
            </Badge>
          </div>
          <p className="text-xs text-[#172B3A]/70 mt-0.5">
            Student-curated workshops, hackathons, and technical meetups
          </p>
        </div>

        <button
          onClick={() => navigate('/feed')}
          className="text-xs font-semibold text-[#347653] hover:text-[#2B6244] flex items-center gap-1 hover:underline"
        >
          View all events
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {SAMPLE_EVENTS.slice(0, 4).map((event) => (
          <div
            key={event.id}
            onClick={() => setSelectedEvent(event)}
            className="group bg-white rounded-xl border border-[#EDE4D4] overflow-hidden shadow-subtle hover:shadow-card hover:border-[#347653]/40 transition-all duration-200 flex flex-col cursor-pointer"
          >
            {/* Event Image Banner */}
            <div className="relative h-36 w-full overflow-hidden bg-[#FAF8F2]">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                <Badge variant={getCategoryBadgeVariant(event.category)} size="sm">
                  {event.category}
                </Badge>
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-[#101311]/80 backdrop-blur-xs text-white rounded text-[10px] font-semibold flex items-center gap-1">
                <Users className="w-3 h-3 text-[#DDE9D9]" />
                <span>{event.attendeeCount} going</span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-[11px] font-semibold text-[#347653] uppercase tracking-wider">
                  {event.organizer}
                </p>
                <h3 className="text-sm font-bold text-[#101311] group-hover:text-[#347653] transition-colors mt-1 line-clamp-2 leading-snug">
                  {event.title}
                </h3>
              </div>

              <div className="mt-3 pt-3 border-t border-[#EDE4D4]/60 space-y-1.5 text-xs text-[#172B3A]/75">
                <div className="flex items-center gap-2 truncate">
                  <Calendar className="w-3.5 h-3.5 text-[#347653] shrink-0" />
                  <span className="truncate">{event.date}</span>
                </div>
                <div className="flex items-center gap-2 truncate">
                  <MapPin className="w-3.5 h-3.5 text-[#172B3A]/60 shrink-0" />
                  <span className="truncate">{event.venue}</span>
                </div>
              </div>

              {/* Working View event button */}
              <div className="mt-4 pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full justify-between group-hover:bg-[#EAF3ED] group-hover:text-[#235037] group-hover:border-[#C4DFC0]"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEvent(event);
                  }}
                  iconRight={<ArrowUpRight className="w-3.5 h-3.5" />}
                >
                  View details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Dialog */}
      <EventDetailModal
        event={selectedEvent}
        isOpen={Boolean(selectedEvent)}
        onClose={() => setSelectedEvent(null)}
      />
    </section>
  );
};
