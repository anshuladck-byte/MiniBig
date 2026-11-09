import React, { useState } from 'react';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import {
  Sliders,
  Bell,
  Eye,
  ShieldCheck,
  Palette,
  Check,
  Smartphone,
  Lock,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [notifyCollab, setNotifyCollab] = useState(true);
  const [notifyRides, setNotifyRides] = useState(true);
  const [notifyDeadlines, setNotifyDeadlines] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);
  const [showRides, setShowRides] = useState(true);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const brandColors = [
    { name: 'Deep Navy', hex: '#172B3A', usage: 'Sidebar, prominent surfaces, dark accents' },
    { name: 'Forest Green', hex: '#347653', usage: 'Primary buttons, active states, key CTAs' },
    { name: 'Black', hex: '#101311', usage: 'Typography, high contrast headings' },
    { name: 'Warm Cream', hex: '#F5F0E4', usage: 'Page background & spacious breathing room' },
    { name: 'Pure White', hex: '#FFFFFF', usage: 'Cards, elevated panels, forms' },
    { name: 'Sage Pastel', hex: '#DDE9D9', usage: 'Academic tags, club activity accents' },
    { name: 'Mist Pastel', hex: '#E2E9E8', usage: 'Verified notices, technical tags' },
    { name: 'Sand Pastel', hex: '#EDE4D4', usage: 'Resource deadlines, border accents' },
  ];

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-[#EDE4D4] p-5 sm:p-6 shadow-subtle">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#101311] tracking-tight">
            Settings & Preferences
          </h1>
          <Badge variant="mist" size="sm">
            Prototype Config
          </Badge>
        </div>
        <p className="text-xs sm:text-sm text-[#172B3A]/75 max-w-xl leading-relaxed">
          Manage your notification feeds, privacy controls, and preview the centralized Campus design system tokens.
        </p>
      </div>

      {savedNotice && (
        <div className="p-3 bg-[#EAF3ED] border border-[#C6E2D0] rounded-xl text-xs text-[#235037] flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-[#347653] shrink-0" />
          <span>Preferences updated successfully!</span>
        </div>
      )}

      {/* Notifications Section */}
      <div className="bg-white rounded-xl border border-[#EDE4D4] p-5 sm:p-6 shadow-subtle space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[#EDE4D4]/60 pb-3">
          <Bell className="w-4 h-4 text-[#347653]" />
          <div>
            <h3 className="text-sm font-bold text-[#101311]">Notification Preferences</h3>
            <p className="text-[11px] text-[#172B3A]/60">Customize when and how you receive alerts</p>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <label className="flex items-center justify-between p-3 rounded-lg bg-[#FAF8F2] border border-[#EDE4D4]/80 cursor-pointer">
            <div>
              <span className="font-bold text-[#101311] block">Peer Collaboration Inquiries</span>
              <span className="text-[#172B3A]/70 text-[11px]">Notify me when a student invites me to join a hackathon or project</span>
            </div>
            <input
              type="checkbox"
              checked={notifyCollab}
              onChange={(e) => setNotifyCollab(e.target.checked)}
              className="w-4 h-4 accent-[#347653]"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg bg-[#FAF8F2] border border-[#EDE4D4]/80 cursor-pointer">
            <div>
              <span className="font-bold text-[#101311] block">Carpool Seat Requests & Match Alerts</span>
              <span className="text-[#172B3A]/70 text-[11px]">Receive updates when someone requests a seat on your commute route</span>
            </div>
            <input
              type="checkbox"
              checked={notifyRides}
              onChange={(e) => setNotifyRides(e.target.checked)}
              className="w-4 h-4 accent-[#347653]"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg bg-[#FAF8F2] border border-[#EDE4D4]/80 cursor-pointer">
            <div>
              <span className="font-bold text-[#101311] block">Opportunity & Scholarship Deadlines</span>
              <span className="text-[#172B3A]/70 text-[11px]">Send reminder notifications 48 hours prior to important deadlines</span>
            </div>
            <input
              type="checkbox"
              checked={notifyDeadlines}
              onChange={(e) => setNotifyDeadlines(e.target.checked)}
              className="w-4 h-4 accent-[#347653]"
            />
          </label>
        </div>
      </div>

      {/* Privacy & Visibility Section */}
      <div className="bg-white rounded-xl border border-[#EDE4D4] p-5 sm:p-6 shadow-subtle space-y-4">
        <div className="flex items-center gap-2.5 border-b border-[#EDE4D4]/60 pb-3">
          <Lock className="w-4 h-4 text-[#347653]" />
          <div>
            <h3 className="text-sm font-bold text-[#101311]">Privacy & Campus Directory Visibility</h3>
            <p className="text-[11px] text-[#172B3A]/60">Manage who can discover your student profile</p>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <label className="flex items-center justify-between p-3 rounded-lg bg-[#FAF8F2] border border-[#EDE4D4]/80 cursor-pointer">
            <div>
              <span className="font-bold text-[#101311] block">Show Profile in Student Discovery</span>
              <span className="text-[#172B3A]/70 text-[11px]">Allow students from all departments to find your skills and projects</span>
            </div>
            <input
              type="checkbox"
              checked={publicProfile}
              onChange={(e) => setPublicProfile(e.target.checked)}
              className="w-4 h-4 accent-[#347653]"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg bg-[#FAF8F2] border border-[#EDE4D4]/80 cursor-pointer">
            <div>
              <span className="font-bold text-[#101311] block">Publish Carpool Route Publicly</span>
              <span className="text-[#172B3A]/70 text-[11px]">Show active shared rides on the campus ride-board</span>
            </div>
            <input
              type="checkbox"
              checked={showRides}
              onChange={(e) => setShowRides(e.target.checked)}
              className="w-4 h-4 accent-[#347653]"
            />
          </label>
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="primary" size="sm" onClick={handleSave}>
            Save Preferences
          </Button>
        </div>
      </div>

      {/* Brand & Centralized Color System Showcase */}
      <div className="bg-white rounded-xl border border-[#EDE4D4] p-5 sm:p-6 shadow-subtle space-y-4">
        <div className="flex items-center justify-between border-b border-[#EDE4D4]/60 pb-3">
          <div className="flex items-center gap-2.5">
            <Palette className="w-4 h-4 text-[#347653]" />
            <div>
              <h3 className="text-sm font-bold text-[#101311]">Mandatory Brand Token Architecture</h3>
              <p className="text-[11px] text-[#172B3A]/60">Standardized across all screens, buttons, and badges</p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-[#347653] font-bold">Tailwind + CSS Tokens</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {brandColors.map((color) => (
            <div
              key={color.name}
              className="p-3 rounded-xl border border-[#EDE4D4] bg-[#FAF8F2] space-y-2"
            >
              <div
                className="w-full h-10 rounded-lg border border-[#EDE4D4]/80 shadow-xs flex items-center justify-end p-1.5"
                style={{ backgroundColor: color.hex }}
              >
                <span
                  className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: color.hex === '#FFFFFF' || color.hex === '#F5F0E4' ? '#172B3A' : '#FFFFFF',
                    color: color.hex === '#FFFFFF' || color.hex === '#F5F0E4' ? '#FFFFFF' : '#172B3A',
                  }}
                >
                  {color.hex}
                </span>
              </div>
              <div>
                <p className="text-xs font-bold text-[#101311]">{color.name}</p>
                <p className="text-[11px] text-[#172B3A]/70 leading-snug mt-0.5">{color.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
