import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { CampusRide } from '../../types';
import { Button } from '../common/Button';
import { ShieldCheck, MapPin, Clock, CheckCircle2, Send, Car } from 'lucide-react';

interface RideRequestModalProps {
  ride: CampusRide | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmRequest: (rideId: string) => void;
}

export const RideRequestModal: React.FC<RideRequestModalProps> = ({
  ride,
  isOpen,
  onClose,
  onConfirmRequest,
}) => {
  const [requested, setRequested] = useState(false);
  const [pickupNote, setPickupNote] = useState('');
  const [seatsNeeded, setSeatsNeeded] = useState(1);

  if (!ride) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRequested(true);
    onConfirmRequest(ride.id);
  };

  const handleReset = () => {
    setRequested(false);
    setPickupNote('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title="Request Campus Carpool Seat"
      subtitle={`Ride with ${ride.driver.name} • ${ride.vehicleType}`}
      maxWidth="md"
    >
      <div className="space-y-4 text-xs text-[#101311]">
        {/* Route Card */}
        <div className="p-3.5 bg-[#FAF8F2] rounded-xl border border-[#EDE4D4] space-y-2.5">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#347653] shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold text-[#101311] block">Pickup Zone</span>
              <span className="text-[#172B3A]/70">{ride.originArea}</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#172B3A] shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold text-[#101311] block">Destination Zone</span>
              <span className="text-[#172B3A]/70">{ride.destinationArea}</span>
            </div>
          </div>
          <div className="pt-2 border-t border-[#EDE4D4]/70 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 font-semibold text-[#101311]">
              <Clock className="w-3.5 h-3.5 text-[#347653]" />
              {ride.departureTime} • {ride.departureDate}
            </span>
            <span className="font-bold text-[#347653]">{ride.costSharingEstimate}</span>
          </div>
        </div>

        {/* Safety & Privacy Notice */}
        <div className="p-3 bg-[#E2E9E8]/60 rounded-xl border border-[#C6D8D7] flex items-start gap-2 text-[#28444A]">
          <ShieldCheck className="w-4 h-4 text-[#28444A] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-bold">Privacy & Student Safety</p>
            <p className="leading-relaxed">
              All rides use designated public campus landmark zones. No live device GPS tracking is shared. Always verify college ID on meetup.
            </p>
          </div>
        </div>

        {requested ? (
          <div className="p-5 text-center space-y-3 bg-[#FAF8F2] rounded-xl border border-[#EDE4D4]">
            <div className="w-10 h-10 rounded-full bg-[#EAF3ED] text-[#347653] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#101311]">Request Sent to Driver</h4>
              <p className="text-xs text-[#172B3A]/70 mt-1 max-w-xs mx-auto">
                {ride.driver.name} has been notified. You can coordinate final gate pickup via campus notifications.
              </p>
            </div>
            <Button variant="primary" size="sm" onClick={handleReset}>
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold mb-1">Seats Needed</label>
                <select
                  value={seatsNeeded}
                  onChange={(e) => setSeatsNeeded(Number(e.target.value))}
                  className="w-full p-2.5 rounded-lg border border-[#EDE4D4] bg-[#FAF8F2] focus:bg-white focus:outline-none focus:border-[#347653]"
                >
                  {Array.from({ length: ride.seatsAvailable }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} seat{n > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-bold mb-1">Vehicle</label>
                <div className="p-2.5 rounded-lg border border-[#EDE4D4] bg-[#FAF8F2] text-[#172B3A]/75 flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5" />
                  <span className="truncate">{ride.vehicleType}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1">Pickup Landmark / Notes</label>
              <input
                type="text"
                placeholder="e.g., Near Metro Exit Gate 2 or Bus Shelter"
                value={pickupNote}
                onChange={(e) => setPickupNote(e.target.value)}
                required
                className="w-full p-2.5 rounded-lg border border-[#EDE4D4] bg-[#FAF8F2] focus:bg-white focus:outline-none focus:border-[#347653]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#EDE4D4]">
              <Button variant="ghost" size="sm" type="button" onClick={handleReset}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                type="submit"
                icon={<Send className="w-3.5 h-3.5" />}
              >
                Request Seat
              </Button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};
