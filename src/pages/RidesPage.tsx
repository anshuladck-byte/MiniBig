import React, { useState } from 'react';
import { SAMPLE_RIDES } from '../data/sampleData';
import { CampusRide } from '../types';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { RideRequestModal } from '../components/rides/RideRequestModal';
import { CreateRideModal } from '../components/rides/CreateRideModal';
import {
  Car,
  MapPin,
  Clock,
  ShieldCheck,
  PlusCircle,
  Users,
  Search,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const RidesPage: React.FC = () => {
  const [rides, setRides] = useState<CampusRide[]>(SAMPLE_RIDES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRide, setSelectedRide] = useState<CampusRide | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [confirmationNotice, setConfirmationNotice] = useState<string | null>(null);

  const filteredRides = rides.filter((ride) => {
    const q = searchQuery.toLowerCase();
    return (
      ride.originArea.toLowerCase().includes(q) ||
      ride.destinationArea.toLowerCase().includes(q) ||
      ride.driver.name.toLowerCase().includes(q) ||
      ride.vehicleType.toLowerCase().includes(q)
    );
  });

  const handleAddRide = (newRide: CampusRide) => {
    setRides([newRide, ...rides]);
    setConfirmationNotice(`Ride offered for ${newRide.originArea} successfully!`);
    setTimeout(() => setConfirmationNotice(null), 4000);
  };

  const handleConfirmRequest = (rideId: string) => {
    setRides((prev) =>
      prev.map((r) =>
        r.id === rideId && r.seatsAvailable > 0
          ? { ...r, seatsAvailable: r.seatsAvailable - 1 }
          : r
      )
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="bg-white rounded-2xl border border-[#EDE4D4] p-5 sm:p-6 shadow-subtle">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#101311] tracking-tight">
                Campus Commute & Shared Rides
              </h1>
              <Badge variant="navy" size="sm">
                Carpool
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-[#172B3A]/75 max-w-xl leading-relaxed">
              Coordinate sustainable, cost-shared daily commutes between major transit hubs, metro stations, and college gates. Verified student peers only.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            icon={<PlusCircle className="w-4 h-4" />}
            onClick={() => setCreateModalOpen(true)}
          >
            Offer a Ride
          </Button>
        </div>

        {/* Safety & Privacy Banner */}
        <div className="mt-5 p-3.5 bg-[#E2E9E8]/60 rounded-xl border border-[#C6D8D7] flex items-start gap-2.5 text-xs text-[#28444A]">
          <ShieldCheck className="w-4 h-4 text-[#28444A] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold">Privacy & Student Safety Principles</span>
            <p className="leading-relaxed">
              All routes are based on public landmarks (metro gates, bus interchanges, campus parking). Real-time GPS tracking and private residential addresses are never broadcasted.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="mt-5 pt-4 border-t border-[#EDE4D4]/70">
          <div className="relative">
            <Search className="w-4 h-4 text-[#347653] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by metro stop, landmark, driver name, or campus gate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2.5 bg-white rounded-xl border border-[#EDE4D4] text-[#101311] placeholder:text-[#101311]/40 focus:outline-none focus:border-[#347653]"
            />
          </div>
        </div>
      </div>

      {confirmationNotice && (
        <div className="p-3 bg-[#EAF3ED] border border-[#C6E2D0] rounded-xl text-xs text-[#235037] flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#347653] shrink-0" />
          <span>{confirmationNotice}</span>
        </div>
      )}

      {/* Rides Listing */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-base font-bold text-[#101311] flex items-center gap-2">
            <Car className="w-4 h-4 text-[#347653]" />
            <span>Active Commute Routes ({filteredRides.length})</span>
          </h3>
          <span className="text-xs text-[#172B3A]/60">Student fuel cost sharing</span>
        </div>

        {filteredRides.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-xl border border-[#EDE4D4] text-xs text-[#172B3A]/60">
            No active rides matching your search. Be the first to offer a ride from this area!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRides.map((ride) => (
              <div
                key={ride.id}
                onClick={() => setSelectedRide(ride)}
                className="group bg-white rounded-xl border border-[#EDE4D4] p-5 shadow-subtle hover:shadow-card hover:border-[#347653]/40 transition-all duration-200 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Driver Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={ride.driver.avatar}
                        alt={ride.driver.name}
                        className="w-9 h-9 rounded-full object-cover ring-1 ring-[#347653]/30"
                      />
                      <div>
                        <div className="flex items-center gap-1">
                          <h4 className="text-xs font-bold text-[#101311] leading-none">
                            {ride.driver.name}
                          </h4>
                          <ShieldCheck className="w-3 h-3 text-[#347653]" />
                        </div>
                        <p className="text-[10px] text-[#172B3A]/60 mt-0.5">
                          {ride.driver.department} • {ride.driver.ridesGiven} shared rides
                        </p>
                      </div>
                    </div>

                    <Badge variant="mist" size="sm">
                      {ride.vehicleType}
                    </Badge>
                  </div>

                  {/* Route Visualizer */}
                  <div className="p-3 bg-[#FAF8F2] rounded-xl border border-[#EDE4D4]/80 space-y-2 text-xs">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#347653] mt-1 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-[#172B3A]/60 uppercase font-bold block">
                          From
                        </span>
                        <p className="font-semibold text-[#101311] truncate">
                          {ride.originArea}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#172B3A] mt-1 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-[#172B3A]/60 uppercase font-bold block">
                          To
                        </span>
                        <p className="font-semibold text-[#101311] truncate">
                          {ride.destinationArea}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Timing & Available Seats */}
                  <div className="mt-3.5 flex items-center justify-between text-xs text-[#172B3A]/80">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#347653]" />
                      {ride.departureTime} ({ride.departureDate})
                    </span>
                    <span className="font-bold text-[#347653] bg-[#EAF3ED] px-2 py-0.5 rounded">
                      {ride.costSharingEstimate}
                    </span>
                  </div>

                  {ride.notes && (
                    <p className="text-[11px] text-[#172B3A]/65 mt-2 line-clamp-1 italic">
                      "{ride.notes}"
                    </p>
                  )}
                </div>

                {/* Bottom Row */}
                <div className="mt-4 pt-3 border-t border-[#EDE4D4]/60 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-xs text-[#172B3A]/70">
                    <Users className="w-3.5 h-3.5 text-[#347653]" />
                    <span>
                      <strong className="text-[#101311]">{ride.seatsAvailable}</strong> / {ride.seatsTotal} seats open
                    </span>
                  </div>

                  <Button
                    variant={ride.seatsAvailable > 0 ? 'secondary' : 'ghost'}
                    size="sm"
                    disabled={ride.seatsAvailable === 0}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRide(ride);
                    }}
                  >
                    {ride.seatsAvailable > 0 ? 'Request Seat' : 'Full'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ride Request Modal */}
      <RideRequestModal
        ride={selectedRide}
        isOpen={Boolean(selectedRide)}
        onClose={() => setSelectedRide(null)}
        onConfirmRequest={handleConfirmRequest}
      />

      {/* Create Ride Modal */}
      <CreateRideModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onAddRide={handleAddRide}
      />
    </div>
  );
};
