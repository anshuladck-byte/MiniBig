import React, { useState } from 'react';
import { SAMPLE_SERVICES } from '../data/sampleData';
import { CampusService, ServiceCategory } from '../types';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { ServiceBookingModal } from '../components/services/ServiceBookingModal';
import { CreateServiceModal } from '../components/services/CreateServiceModal';
import {
  Search,
  PlusCircle,
  Star,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Briefcase,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '../lib/utils';

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<CampusService[]>(SAMPLE_SERVICES);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingService, setBookingService] = useState<CampusService | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const categories = [
    'All',
    'Tutoring',
    'Design',
    'Development',
    'Photography',
    'Video Editing',
    'Technical Assistance',
  ];

  const filteredServices = services.filter((srv) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      srv.title.toLowerCase().includes(q) ||
      srv.description.toLowerCase().includes(q) ||
      srv.tags.some((t) => t.toLowerCase().includes(q)) ||
      srv.provider.name.toLowerCase().includes(q);

    const matchesCategory =
      selectedCategory === 'All' || srv.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleAddService = (newService: CampusService) => {
    setServices([newService, ...services]);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-[#EDE4D4] p-5 sm:p-6 shadow-subtle">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#101311] tracking-tight">
                Peer Student Services Marketplace
              </h1>
              <Badge variant="green" size="sm">
                Student Economy
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-[#172B3A]/75 max-w-xl leading-relaxed">
              Book peer tutoring in tough engineering subjects, Figma UI/UX reviews, code diagnostics, or demo video editing. Transparent student-to-student pricing.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            icon={<PlusCircle className="w-4 h-4" />}
            onClick={() => setCreateModalOpen(true)}
          >
            Offer a Service
          </Button>
        </div>

        {/* Academic Integrity Pledge Box */}
        <div className="mt-5 p-3.5 bg-[#FAF8F2] rounded-xl border border-[#EDE4D4] flex items-start gap-2.5 text-xs text-[#172B3A]/85">
          <ShieldCheck className="w-4 h-4 text-[#347653] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-[#101311]">Academic Integrity Notice:</strong> Campus strictly encourages conceptual tutoring, code review, design polish, and skill mentorship. Paying peers to do homework or graded coursework is strictly prohibited.
          </p>
        </div>

        {/* Search & Categories */}
        <div className="mt-5 pt-4 border-t border-[#EDE4D4]/70 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#347653] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services (e.g. DSA tutoring, Figma review, React debug)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2.5 bg-white rounded-xl border border-[#EDE4D4] text-[#101311] placeholder:text-[#101311]/40 focus:outline-none focus:border-[#347653]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition-colors',
                  selectedCategory === cat
                    ? 'bg-[#172B3A] text-white shadow-xs'
                    : 'bg-[#FAF8F2] hover:bg-[#EDE4D4] text-[#172B3A]/75 border border-[#EDE4D4]'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-base font-bold text-[#101311] flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#347653]" />
            <span>Available Peer Offerings ({filteredServices.length})</span>
          </h3>
          <span className="text-xs text-[#172B3A]/60">Transparent pricing • Prototype Phase</span>
        </div>

        {filteredServices.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-xl border border-[#EDE4D4] text-xs text-[#172B3A]/60">
            No services found matching your criteria. Try another keyword or offer this service yourself!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map((srv) => (
              <div
                key={srv.id}
                onClick={() => setBookingService(srv)}
                className="group bg-white rounded-xl border border-[#EDE4D4] p-5 shadow-subtle hover:shadow-card hover:border-[#347653]/40 transition-all duration-200 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Top Bar: Category badge & Price */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <Badge variant="sand" size="sm">
                      {srv.category}
                    </Badge>
                    <div className="text-right">
                      <span className="text-base font-extrabold text-[#347653]">
                        {srv.priceDisplay}
                      </span>
                      <span className="text-[10px] text-[#172B3A]/60 block leading-none">
                        {srv.priceModel}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-[#101311] group-hover:text-[#347653] transition-colors leading-snug">
                    {srv.title}
                  </h4>
                  <p className="text-xs text-[#172B3A]/75 line-clamp-2 mt-1.5 leading-relaxed">
                    {srv.description}
                  </p>

                  {/* Provider Info */}
                  <div className="mt-4 pt-3 border-t border-[#EDE4D4]/60 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={srv.provider.avatar}
                        alt={srv.provider.name}
                        className="w-8 h-8 rounded-full object-cover border border-[#EDE4D4]"
                      />
                      <div>
                        <p className="text-xs font-bold text-[#101311] leading-none">
                          {srv.provider.name}
                        </p>
                        <p className="text-[10px] text-[#172B3A]/60 mt-0.5">
                          {srv.provider.department} • {srv.provider.semester}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-amber-600 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{srv.provider.rating}</span>
                      <span className="text-[#172B3A]/40 text-[10px]">
                        ({srv.provider.completedCount})
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {srv.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#FAF8F2] text-[#172B3A]/70 border border-[#EDE4D4]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Action */}
                <div className="mt-4 pt-3 border-t border-[#EDE4D4]/60 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-[#172B3A]/60 flex items-center gap-1 truncate">
                    <Clock className="w-3.5 h-3.5 text-[#347653] shrink-0" />
                    <span className="truncate">{srv.turnaroundTime}</span>
                  </span>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setBookingService(srv);
                    }}
                  >
                    Request
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Dialog Modal */}
      <ServiceBookingModal
        service={bookingService}
        isOpen={Boolean(bookingService)}
        onClose={() => setBookingService(null)}
      />

      {/* Create Offering Modal */}
      <CreateServiceModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onAddService={handleAddService}
      />
    </div>
  );
};
