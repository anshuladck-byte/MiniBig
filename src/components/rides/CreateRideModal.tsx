import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { CampusRide } from '../../types';
import { Button } from '../common/Button';
import { CURRENT_USER } from '../../data/sampleData';
import { Plus, ShieldAlert } from 'lucide-react';

interface CreateRideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRide: (newRide: CampusRide) => void;
}

export const CreateRideModal: React.FC<CreateRideModalProps> = ({
  isOpen,
  onClose,
  onAddRide,
}) => {
  const [originArea, setOriginArea] = useState('');
  const [destinationArea, setDestinationArea] = useState('Campus Main Gate / Engineering Quad');
  const [departureTime, setDepartureTime] = useState('8:30 AM');
  const [departureDate, setDepartureDate] = useState('Tomorrow');
  const [seatsTotal, setSeatsTotal] = useState(3);
  const [costSharingEstimate, setCostSharingEstimate] = useState('₹45 / person');
  const [vehicleType, setVehicleType] = useState('Car (Sedan)');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRide: CampusRide = {
      id: `ride-${Date.now()}`,
      driver: {
        id: CURRENT_USER.id,
        name: CURRENT_USER.name,
        department: 'CSE',
        semester: CURRENT_USER.semester,
        avatar: CURRENT_USER.avatar,
        rating: 5.0,
        ridesGiven: 1,
      },
      originArea,
      destinationArea,
      departureTime,
      departureDate,
      seatsTotal,
      seatsAvailable: seatsTotal,
      costSharingEstimate: costSharingEstimate.startsWith('₹') ? costSharingEstimate : `₹${costSharingEstimate}`,
      vehicleType,
      notes,
    };

    onAddRide(newRide);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Offer a Shared Campus Commute"
      subtitle="Help peers commute sustainably while splitting fuel costs"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-3.5 text-xs text-[#101311]">
        <div>
          <label className="block font-bold mb-1">Pickup Area / Landmark (Public)</label>
          <input
            type="text"
            required
            placeholder="e.g., Metro Green Line Station, Indiranagar BDA Complex"
            value={originArea}
            onChange={(e) => setOriginArea(e.target.value)}
            className="w-full p-2.5 rounded-lg border border-[#EDE4D4] bg-[#FAF8F2] focus:bg-white focus:outline-none focus:border-[#347653]"
          />
        </div>

        <div>
          <label className="block font-bold mb-1">Destination Area</label>
          <input
            type="text"
            required
            value={destinationArea}
            onChange={(e) => setDestinationArea(e.target.value)}
            className="w-full p-2.5 rounded-lg border border-[#EDE4D4] bg-[#FAF8F2] focus:bg-white focus:outline-none focus:border-[#347653]"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-bold mb-1">Departure Time</label>
            <input
              type="text"
              required
              placeholder="e.g., 8:30 AM"
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-[#EDE4D4] bg-[#FAF8F2] focus:bg-white focus:outline-none focus:border-[#347653]"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Date / Frequency</label>
            <input
              type="text"
              required
              placeholder="e.g., Weekdays recurring"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-[#EDE4D4] bg-[#FAF8F2] focus:bg-white focus:outline-none focus:border-[#347653]"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block font-bold mb-1">Available Seats</label>
            <select
              value={seatsTotal}
              onChange={(e) => setSeatsTotal(Number(e.target.value))}
              className="w-full p-2.5 rounded-lg border border-[#EDE4D4] bg-[#FAF8F2] focus:bg-white focus:outline-none focus:border-[#347653]"
            >
              <option value={1}>1 seat</option>
              <option value={2}>2 seats</option>
              <option value={3}>3 seats</option>
              <option value={4}>4 seats</option>
            </select>
          </div>
          <div>
            <label className="block font-bold mb-1">Fuel Share Est.</label>
            <input
              type="text"
              placeholder="₹40 / person"
              value={costSharingEstimate}
              onChange={(e) => setCostSharingEstimate(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-[#EDE4D4] bg-[#FAF8F2] focus:bg-white focus:outline-none focus:border-[#347653]"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Vehicle</label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-[#EDE4D4] bg-[#FAF8F2] focus:bg-white focus:outline-none focus:border-[#347653]"
            >
              <option value="Car (Sedan)">Car (Sedan)</option>
              <option value="Car (Hatchback)">Car (Hatchback)</option>
              <option value="Compact SUV">Compact SUV</option>
              <option value="EV Scooter Pool">EV Scooter Pool</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-bold mb-1">Pickup Instructions</label>
          <input
            type="text"
            placeholder="e.g., Leaving sharp at 8:30 AM from Exit Gate 2"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2.5 rounded-lg border border-[#EDE4D4] bg-[#FAF8F2] focus:bg-white focus:outline-none focus:border-[#347653]"
          />
        </div>

        <div className="p-3 bg-[#FAF8F2] rounded-xl border border-[#EDE4D4] flex items-start gap-2 text-[#524430]">
          <ShieldAlert className="w-4 h-4 text-[#524430] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Privacy policy reminder: Never specify personal residential addresses. Use public transport hubs and campus gates.
          </p>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-[#EDE4D4]">
          <Button variant="ghost" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            type="submit"
            icon={<Plus className="w-3.5 h-3.5" />}
          >
            Post Ride Offer
          </Button>
        </div>
      </form>
    </Modal>
  );
};
