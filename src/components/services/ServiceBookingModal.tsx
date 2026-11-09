import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { CampusService } from '../../types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { ShieldCheck, Star, Clock, CheckCircle2, Send } from 'lucide-react';

interface ServiceBookingModalProps {
  service: CampusService | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ServiceBookingModal: React.FC<ServiceBookingModalProps> = ({
  service,
  isOpen,
  onClose,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [datePreference, setDatePreference] = useState('');
  const [projectBrief, setProjectBrief] = useState('');

  if (!service) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setDatePreference('');
    setProjectBrief('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title={service.title}
      subtitle={`Offered by ${service.provider.name} (${service.provider.department})`}
      maxWidth="lg"
    >
      <div className="space-y-5">
        {/* Provider Brief */}
        <div className="flex items-center justify-between p-3.5 bg-[#FAF8F2] rounded-xl border border-[#EDE4D4]">
          <div className="flex items-center gap-3">
            <img
              src={service.provider.avatar}
              alt={service.provider.name}
              className="w-11 h-11 rounded-full object-cover ring-1 ring-[#347653]/40"
            />
            <div>
              <p className="text-sm font-bold text-[#101311]">{service.provider.name}</p>
              <div className="flex items-center gap-1.5 text-xs text-[#172B3A]/70">
                <span className="flex items-center gap-0.5 text-amber-600 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  {service.provider.rating}
                </span>
                <span>•</span>
                <span>{service.provider.completedCount} peer sessions</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-base font-extrabold text-[#347653] block">
              {service.priceDisplay}
            </span>
            <span className="text-[11px] text-[#172B3A]/60 font-medium">
              {service.priceModel}
            </span>
          </div>
        </div>

        {/* Turnaround & Category */}
        <div className="flex items-center justify-between text-xs text-[#172B3A]/75 px-1">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#347653]" />
            {service.turnaroundTime}
          </span>
          <Badge variant="sand" size="sm">
            {service.category}
          </Badge>
        </div>

        {/* Academic Integrity Notice */}
        <div className="p-3 bg-[#EAF3ED] rounded-xl border border-[#C6E2D0] flex items-start gap-2.5 text-xs text-[#235037]">
          <ShieldCheck className="w-4 h-4 text-[#347653] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-bold">Academic Integrity Policy</p>
            <p className="text-[#235037]/90 leading-relaxed">
              {service.ethicsDisclaimer}
            </p>
          </div>
        </div>

        {/* Booking Form or Success State */}
        {submitted ? (
          <div className="p-5 text-center space-y-3 bg-[#FAF8F2] rounded-xl border border-[#EDE4D4]">
            <div className="w-10 h-10 rounded-full bg-[#EAF3ED] text-[#347653] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#101311]">Request Sent to {service.provider.name}</h4>
              <p className="text-xs text-[#172B3A]/75 mt-1 max-w-sm mx-auto leading-relaxed">
                Your service inquiry has been logged in demo state. Once accepted by the peer provider, you will receive a chat notification.
              </p>
            </div>
            <Button variant="primary" size="sm" onClick={handleReset}>
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-[#101311] mb-1">
                Preferred Date & Time Window
              </label>
              <input
                type="text"
                placeholder="e.g., Saturday afternoon (3 PM to 5 PM)"
                value={datePreference}
                onChange={(e) => setDatePreference(e.target.value)}
                required
                className="w-full text-xs p-2.5 rounded-lg border border-[#EDE4D4] bg-[#FAF8F2] focus:bg-white focus:outline-none focus:border-[#347653] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#101311] mb-1">
                What would you like assistance with?
              </label>
              <textarea
                rows={3}
                placeholder="Briefly describe your goals, specific syllabus concepts or design files..."
                value={projectBrief}
                onChange={(e) => setProjectBrief(e.target.value)}
                required
                className="w-full text-xs p-2.5 rounded-lg border border-[#EDE4D4] bg-[#FAF8F2] focus:bg-white focus:outline-none focus:border-[#347653] transition-colors resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-[#172B3A]/60">
                Payment settlement is handled post-session in Phase 2
              </span>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" type="button" onClick={handleReset}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  type="submit"
                  icon={<Send className="w-3.5 h-3.5" />}
                >
                  Send Request
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};
