import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { CampusEvent } from '../../types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Calendar, Clock, MapPin, Users, CheckCircle2, ShieldAlert } from 'lucide-react';

interface EventDetailModalProps {
  event: CampusEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  isOpen,
  onClose,
}) => {
  const [isRegistered, setIsRegistered] = useState(false);

  if (!event) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={event.title}
      subtitle={`${event.category} • Organized by ${event.organizer}`}
      maxWidth="xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <div className="text-xs text-[#172B3A]/60 font-medium">
            {event.capacity ? `${event.attendeeCount + (isRegistered ? 1 : 0)} / ${event.capacity} seats filled` : 'Open access'}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button
              variant={isRegistered ? 'subtle' : 'primary'}
              size="sm"
              icon={isRegistered ? <CheckCircle2 className="w-4 h-4 text-[#347653]" /> : undefined}
              onClick={() => setIsRegistered(!isRegistered)}
            >
              {isRegistered ? 'Registered (Click to cancel)' : 'RSVP for Event'}
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-5">
        {/* Event Banner Image */}
        <div className="relative h-48 sm:h-56 rounded-xl overflow-hidden border border-[#EDE4D4]">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge variant="navy">{event.category}</Badge>
            {event.isFeatured && <Badge variant="green">Featured</Badge>}
          </div>
        </div>

        {/* Quick Meta Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-[#FAF8F2] rounded-xl border border-[#EDE4D4]/70 text-xs">
          <div className="flex items-center gap-2.5 text-[#101311]">
            <Calendar className="w-4 h-4 text-[#347653] shrink-0" />
            <div>
              <span className="font-semibold block">{event.date}</span>
              <span className="text-[#172B3A]/70">{event.time}</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-[#101311]">
            <MapPin className="w-4 h-4 text-[#347653] shrink-0" />
            <div>
              <span className="font-semibold block">{event.venue}</span>
              <span className="text-[#172B3A]/70">Campus physical venue</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-[#101311]">
            <Users className="w-4 h-4 text-[#347653] shrink-0" />
            <div>
              <span className="font-semibold block">{event.attendeeCount} students attending</span>
              <span className="text-[#172B3A]/70">Peer community event</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-[#101311]">
            <div className="w-4 h-4 rounded-full bg-[#347653] flex items-center justify-center text-white text-[10px] font-bold">
              ✓
            </div>
            <div>
              <span className="font-semibold block">Free Registration</span>
              <span className="text-[#172B3A]/70">Campus student badge entry</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-sm font-bold text-[#101311] mb-1.5">About this event</h4>
          <p className="text-xs sm:text-sm text-[#172B3A]/80 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Tags */}
        <div>
          <h4 className="text-xs font-bold text-[#172B3A]/70 uppercase tracking-wider mb-2">
            Focus topics & tags
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {event.tags.map((tag) => (
              <Badge key={tag} variant="sand" size="sm">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Educational / Independent Notice */}
        <div className="p-3 bg-[#E2E9E8]/50 rounded-lg border border-[#C6D8D7] flex items-start gap-2.5 text-xs text-[#28444A]">
          <ShieldAlert className="w-4 h-4 text-[#28444A] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {event.disclaimer || 'Independent campus community activity. Student-organized peer workshop with zero commercial obligations.'}
          </p>
        </div>
      </div>
    </Modal>
  );
};
