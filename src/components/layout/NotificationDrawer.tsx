import React, { useState } from 'react';
import { X, CheckCheck, BellRing, Calendar, Car, Briefcase, Info } from 'lucide-react';
import { NotificationItem } from '../../types';
import { cn } from '../../lib/utils';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onToggleRead: (id: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onToggleRead,
}) => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  if (!isOpen) return null;

  const filtered = notifications.filter((n) => {
    if (filter === 'unread') return !n.isRead;
    return true;
  });

  const getCategoryIcon = (category: NotificationItem['category']) => {
    switch (category) {
      case 'events':
        return <Calendar className="w-4 h-4 text-[#347653]" />;
      case 'rides':
        return <Car className="w-4 h-4 text-[#172B3A]" />;
      case 'services':
        return <Briefcase className="w-4 h-4 text-[#2C4F3B]" />;
      default:
        return <Info className="w-4 h-4 text-[#524430]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-[#101311]/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#EDE4D4] shadow-dropdown flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#EDE4D4] bg-[#FAF8F2] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#EAF3ED] flex items-center justify-center text-[#347653]">
                <BellRing className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#101311]">Notifications</h3>
                <p className="text-xs text-[#172B3A]/70">Campus peer updates & reminders</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#172B3A]/60 hover:text-[#101311] hover:bg-[#EDE4D4] transition-colors"
              aria-label="Close panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Bar & Quick Actions */}
          <div className="px-5 py-3 border-b border-[#EDE4D4]/60 bg-white flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setFilter('all')}
                className={cn(
                  'px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors',
                  filter === 'all'
                    ? 'bg-[#172B3A] text-white'
                    : 'text-[#172B3A]/70 hover:bg-[#FAF8F2]'
                )}
              >
                All ({notifications.length})
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={cn(
                  'px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors',
                  filter === 'unread'
                    ? 'bg-[#172B3A] text-white'
                    : 'text-[#172B3A]/70 hover:bg-[#FAF8F2]'
                )}
              >
                Unread ({notifications.filter((n) => !n.isRead).length})
              </button>
            </div>

            <button
              onClick={onMarkAllAsRead}
              className="flex items-center gap-1 text-xs text-[#347653] font-medium hover:underline"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
          </div>

          {/* Notification List */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#EDE4D4]/50">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-[#172B3A]/60">
                <p className="text-sm font-medium">No notifications in this view.</p>
                <p className="text-xs mt-1 text-[#172B3A]/40">You're caught up with campus activity!</p>
              </div>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onToggleRead(item.id)}
                  className={cn(
                    'p-4 transition-colors cursor-pointer hover:bg-[#FAF8F2] flex items-start gap-3 relative',
                    !item.isRead ? 'bg-[#FAF8F2]/60' : 'bg-white'
                  )}
                >
                  <div className="w-8 h-8 rounded-full bg-[#E2E9E8] flex items-center justify-center shrink-0 mt-0.5">
                    {getCategoryIcon(item.category)}
                  </div>
                  <div className="flex-1 pr-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-bold text-[#101311]">{item.title}</p>
                      <span className="text-[10px] text-[#172B3A]/50 shrink-0">
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-[#172B3A]/80 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  {!item.isRead && (
                    <span className="w-2 h-2 rounded-full bg-[#347653] shrink-0 mt-2" />
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer note */}
          <div className="p-3 bg-[#FAF8F2] border-t border-[#EDE4D4] text-center text-[11px] text-[#172B3A]/60">
            Campus notification prototype • Sample activity stream
          </div>
        </div>
      </div>
    </div>
  );
};
