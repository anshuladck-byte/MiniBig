import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Compass,
  Users,
  Briefcase,
  Car,
  BookOpen,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { CURRENT_USER } from '../../data/sampleData';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggleCollapse,
  onCloseMobile,
}) => {
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Campus Feed', path: '/feed', icon: Compass, badge: 'New' },
    { name: 'Discover Students', path: '/students', icon: Users },
    { name: 'Services', path: '/services', icon: Briefcase },
    { name: 'Rides', path: '/rides', icon: Car, badge: 'Eco' },
    { name: 'Resources', path: '/resources', icon: BookOpen },
    { name: 'My Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside
      className={cn(
        'h-screen sticky top-0 flex flex-col bg-[#172B3A] text-white transition-all duration-300 z-30 select-none border-r border-[#213D52]',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-[#213D52]">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-lg bg-[#347653] flex items-center justify-center shrink-0 shadow-sm text-white">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-white leading-none">
                Campus
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-[#DDE9D9]/70 mt-0.5">
                Student Network
              </span>
            </div>
          )}
        </div>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex w-7 h-7 rounded-md items-center justify-center text-[#DDE9D9]/70 hover:text-white hover:bg-[#213D52] transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Navigation Links */}
      <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all group relative',
                  isActive
                    ? 'bg-[#347653] text-white shadow-sm'
                    : 'text-[#E2E9E8]/80 hover:bg-[#213D52]/80 hover:text-white'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={cn(
                      'w-5 h-5 shrink-0 transition-colors',
                      isActive ? 'text-white' : 'text-[#E2E9E8]/70 group-hover:text-white'
                    )}
                  />
                  {!collapsed && (
                    <span className="truncate flex-1 tracking-tight">{item.name}</span>
                  )}
                  {!collapsed && item.badge && (
                    <span
                      className={cn(
                        'text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0',
                        item.badge === 'New'
                          ? 'bg-[#DDE9D9] text-[#2C4F3B]'
                          : 'bg-[#EDE4D4] text-[#524430]'
                      )}
                    >
                      {item.badge}
                    </span>
                  )}

                  {/* Tooltip on hover when collapsed */}
                  {collapsed && (
                    <div className="fixed left-20 ml-2 px-2.5 py-1 bg-[#101311] text-white text-xs font-medium rounded shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                      {item.name}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* College Ecosystem Notice Pill (when expanded) */}
      {!collapsed && (
        <div className="mx-3 mb-3 p-3 rounded-xl bg-[#213D52]/50 border border-[#2C4A61] text-xs">
          <div className="flex items-center gap-1.5 text-[#DDE9D9] font-medium mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#347653]" />
            <span>Campus Beta</span>
          </div>
          <p className="text-[11px] text-[#E2E9E8]/70 leading-relaxed">
            Independent student platform. Open for peer collaboration.
          </p>
        </div>
      )}

      {/* User Mini Profile Section at Bottom */}
      <div className="p-3 border-t border-[#213D52] bg-[#12222E]/60">
        <NavLink
          to="/profile"
          onClick={onCloseMobile}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#213D52] transition-colors group"
        >
          <div className="relative shrink-0">
            <img
              src={CURRENT_USER.avatar}
              alt={CURRENT_USER.name}
              className="w-9 h-9 rounded-full object-cover border border-[#347653]"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#347653] border-2 border-[#172B3A] rounded-full" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden flex-1 text-left">
              <p className="text-sm font-semibold text-white truncate leading-none">
                {CURRENT_USER.name}
              </p>
              <p className="text-xs text-[#E2E9E8]/70 truncate mt-1">
                {CURRENT_USER.department.split('&')[0]} • {CURRENT_USER.semester}
              </p>
            </div>
          )}
        </NavLink>
      </div>
    </aside>
  );
};
