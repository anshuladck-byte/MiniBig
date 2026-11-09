import React, { useState, useEffect } from 'react';
import { Search, X, Calendar, User, Briefcase, FileText, ArrowRight } from 'lucide-react';
import { SAMPLE_EVENTS, SAMPLE_STUDENTS, SAMPLE_SERVICES, SAMPLE_ANNOUNCEMENTS } from '../../data/sampleData';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../common/Badge';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEvent?: (eventId: string) => void;
  onSelectStudent?: (studentId: string) => void;
  onSelectService?: (serviceId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectEvent,
  onSelectStudent,
  onSelectService,
}) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle or open handled by parent
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedEvents = q
    ? SAMPLE_EVENTS.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.tags.some((t) => t.toLowerCase().includes(q)) ||
          e.organizer.toLowerCase().includes(q)
      )
    : SAMPLE_EVENTS.slice(0, 2);

  const matchedStudents = q
    ? SAMPLE_STUDENTS.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.skills.some((sk) => sk.toLowerCase().includes(q)) ||
          s.department.toLowerCase().includes(q)
      )
    : SAMPLE_STUDENTS.slice(0, 2);

  const matchedServices = q
    ? SAMPLE_SERVICES.filter(
        (srv) =>
          srv.title.toLowerCase().includes(q) ||
          srv.category.toLowerCase().includes(q) ||
          srv.tags.some((t) => t.toLowerCase().includes(q))
      )
    : SAMPLE_SERVICES.slice(0, 2);

  const matchedAnnouncements = q
    ? SAMPLE_ANNOUNCEMENTS.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      )
    : [];

  const totalResults =
    matchedEvents.length +
    matchedStudents.length +
    matchedServices.length +
    matchedAnnouncements.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#101311]/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-[#EDE4D4] shadow-dropdown overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#EDE4D4] bg-[#FAF8F2]">
          <Search className="w-5 h-5 text-[#347653] shrink-0" />
          <input
            type="text"
            placeholder="Type to search events, skills, teammates, services..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm sm:text-base text-[#101311] placeholder:text-[#101311]/45 outline-none font-medium"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded text-[#172B3A]/50 hover:text-[#101311]"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="text-[11px] font-mono text-[#172B3A]/50 px-2 py-0.5 bg-[#EDE4D4]/70 rounded border border-[#EDE4D4]">
              ESC
            </kbd>
          )}
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5">
          {totalResults === 0 && (
            <div className="py-8 text-center text-[#172B3A]/60">
              <p className="text-sm font-semibold">No results found for "{query}"</p>
              <p className="text-xs mt-1">
                Try searching for "React", "Workshop", "Tutoring", "Figma", or "Scholarship"
              </p>
            </div>
          )}

          {/* Events Section */}
          {matchedEvents.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#172B3A]/70 mb-2 px-1">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#347653]" /> Campus Events
                </span>
                <span className="text-[11px] font-normal lowercase">
                  {matchedEvents.length} found
                </span>
              </div>
              <div className="space-y-1.5">
                {matchedEvents.map((evt) => (
                  <div
                    key={evt.id}
                    onClick={() => {
                      onClose();
                      if (onSelectEvent) onSelectEvent(evt.id);
                      else navigate('/feed');
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF8F2] border border-transparent hover:border-[#EDE4D4] cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#EAF3ED] flex items-center justify-center text-[#347653] shrink-0 font-bold text-xs">
                        {evt.category[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#101311] group-hover:text-[#347653] transition-colors">
                          {evt.title}
                        </p>
                        <p className="text-xs text-[#172B3A]/60 mt-0.5">
                          {evt.date} • {evt.venue}
                        </p>
                      </div>
                    </div>
                    <Badge variant="mist" size="sm">
                      {evt.category}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Students / Peer Talent */}
          {matchedStudents.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#172B3A]/70 mb-2 px-1">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#347653]" /> Students & Teammates
                </span>
                <span className="text-[11px] font-normal lowercase">
                  {matchedStudents.length} found
                </span>
              </div>
              <div className="space-y-1.5">
                {matchedStudents.map((std) => (
                  <div
                    key={std.id}
                    onClick={() => {
                      onClose();
                      if (onSelectStudent) onSelectStudent(std.id);
                      else navigate('/students');
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF8F2] border border-transparent hover:border-[#EDE4D4] cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={std.avatar}
                        alt={std.name}
                        className="w-8 h-8 rounded-full object-cover shrink-0 border border-[#EDE4D4]"
                      />
                      <div>
                        <p className="text-sm font-semibold text-[#101311] group-hover:text-[#347653] transition-colors">
                          {std.name}
                        </p>
                        <p className="text-xs text-[#172B3A]/60 mt-0.5">
                          {std.department} • {std.skills.slice(0, 3).join(', ')}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#172B3A]/40 group-hover:text-[#347653] group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Services Section */}
          {matchedServices.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#172B3A]/70 mb-2 px-1">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#347653]" /> Peer Services
                </span>
                <span className="text-[11px] font-normal lowercase">
                  {matchedServices.length} found
                </span>
              </div>
              <div className="space-y-1.5">
                {matchedServices.map((srv) => (
                  <div
                    key={srv.id}
                    onClick={() => {
                      onClose();
                      if (onSelectService) onSelectService(srv.id);
                      else navigate('/services');
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF8F2] border border-transparent hover:border-[#EDE4D4] cursor-pointer transition-all group"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#101311] group-hover:text-[#347653] transition-colors">
                        {srv.title}
                      </p>
                      <p className="text-xs text-[#172B3A]/60 mt-0.5">
                        by {srv.provider.name} • {srv.priceDisplay} ({srv.priceModel})
                      </p>
                    </div>
                    <Badge variant="sand" size="sm">
                      {srv.category}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Announcements */}
          {matchedAnnouncements.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#172B3A]/70 mb-2 px-1">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#347653]" /> Campus Notices
                </span>
              </div>
              <div className="space-y-1.5">
                {matchedAnnouncements.map((ann) => (
                  <div
                    key={ann.id}
                    onClick={() => {
                      onClose();
                      navigate('/feed');
                    }}
                    className="p-2.5 rounded-xl hover:bg-[#FAF8F2] border border-transparent hover:border-[#EDE4D4] cursor-pointer transition-all"
                  >
                    <p className="text-sm font-semibold text-[#101311]">{ann.title}</p>
                    <p className="text-xs text-[#172B3A]/60 mt-0.5 line-clamp-1">{ann.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts note */}
        <div className="px-4 py-2.5 bg-[#FAF8F2] border-t border-[#EDE4D4] flex items-center justify-between text-[11px] text-[#172B3A]/60">
          <span>Search filters active sample data</span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-white border border-[#EDE4D4] rounded">↑↓</kbd> to navigate,
            <kbd className="px-1.5 py-0.5 bg-white border border-[#EDE4D4] rounded ml-1">ESC</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
};
