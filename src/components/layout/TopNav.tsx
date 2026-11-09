
import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  Menu,
  ChevronDown,
  User,
  Sliders,
  LogOut,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

interface TopNavProps {
  onOpenMobileMenu: () => void;
  onOpenSearch: () => void;
  onToggleNotifications: () => void;
  unreadCount: number;
}

export const TopNav: React.FC<TopNavProps> = ({
  onOpenMobileMenu,
  onOpenSearch,
  onToggleNotifications,
  unreadCount,
}) => {
  const { student } = useAuth();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-20 h-16 bg-[#F5F0E4]/95 backdrop-blur-md border-b border-[#EDE4D4] px-4 sm:px-8 flex items-center justify-between gap-4 transition-colors">

      {/* Left: Mobile hamburger + Global Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-lg text-[#172B3A] hover:bg-[#EDE4D4] transition-colors"
          aria-label="Open mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3.5 py-2 text-sm bg-white hover:bg-[#FAF8F2] border border-[#EDE4D4] rounded-xl text-[#101311]/60 shadow-xs transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#347653]"
        >
          <div className="flex items-center gap-2.5 truncate">
            <Search className="w-4 h-4 text-[#347653] group-hover:scale-105 transition-transform" />
            <span className="truncate text-xs sm:text-sm text-[#101311]/70">
              Search people, events, services...
            </span>
          </div>

          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[11px] font-mono text-[#172B3A]/60 bg-[#EDE4D4]/60 rounded border border-[#EDE4D4]">
            <span>⌘</span>K
          </kbd>
        </button>
      </div>

      {/* Right Controls: Notifications & Profile */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">

        {/* Notifications */}
        <button
          onClick={onToggleNotifications}
          className="relative p-2.5 rounded-xl bg-white hover:bg-[#FAF8F2] border border-[#EDE4D4] text-[#172B3A] transition-colors shadow-xs"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4 text-[#172B3A]" />

          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#347653] px-1 text-[10px] font-bold text-white shadow-xs">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-white hover:bg-[#FAF8F2] border border-[#EDE4D4] transition-colors shadow-xs"
          >
            <div className="w-7 h-7 rounded-full bg-[#EAF3ED] text-[#235037] flex items-center justify-center text-xs font-bold">
              {student?.full_name?.charAt(0) || 'S'}
            </div>

            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-[#101311] leading-none">
                {student?.full_name || 'Student'}
              </span>

              <span className="text-[10px] text-[#172B3A]/70 mt-0.5">
                {student?.usn || ''}
              </span>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-[#172B3A]/60 hidden sm:block" />
          </button>

          {/* Dropdown Content */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl border border-[#EDE4D4] shadow-dropdown py-2 z-50 animate-in fade-in zoom-in-95">

              <div className="px-4 py-2.5 border-b border-[#EDE4D4]/60">
                <p className="text-xs text-[#172B3A]/60 font-medium">
                  Signed in as
                </p>

                <p className="text-sm font-bold text-[#101311] truncate">
                  {student?.full_name || 'Student'}
                </p>

                <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#347653] font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Student ID</span>
                </div>
              </div>

              <div className="py-1">
                <Link
                  to="/profile"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#101311] hover:bg-[#FAF8F2] transition-colors"
                >
                  <User className="w-4 h-4 text-[#347653]" />
                  <span>My Student Profile</span>
                </Link>

                <Link
                  to="/services"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#101311] hover:bg-[#FAF8F2] transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-[#172B3A]/60" />
                  <span>My Active Offerings</span>
                </Link>

                <Link
                  to="/settings"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#101311] hover:bg-[#FAF8F2] transition-colors"
                >
                  <Sliders className="w-4 h-4 text-[#172B3A]/60" />
                  <span>Preferences & Privacy</span>
                </Link>
              </div>

              <div className="border-t border-[#EDE4D4]/60 pt-1 mt-1">
                <button
                  onClick={() => {
                    alert(
                      'This is a prototype preview. Auth and sessions will connect to FastAPI backend in Phase 2.'
                    );
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-700 hover:bg-rose-50 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Reset Demo Session</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
