import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { StudentProfile } from '../../types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Send, Check, Sparkles, FolderGit2 } from 'lucide-react';

interface StudentDetailModalProps {
  student: StudentProfile | null;
  isOpen: boolean;
  onClose: () => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  student,
  isOpen,
  onClose,
}) => {
  const [inviteSent, setInviteSent] = useState(false);
  const [message, setMessage] = useState('');

  if (!student) return null;

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setInviteSent(true);
    setTimeout(() => {
      // Keep feedback visible
    }, 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={student.name}
      subtitle={`${student.department} • ${student.semester}`}
      maxWidth="xl"
    >
      <div className="space-y-6">
        {/* Profile Card Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 bg-[#FAF8F2] rounded-xl border border-[#EDE4D4]">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-18 h-18 sm:w-20 sm:h-20 rounded-full object-cover ring-2 ring-[#347653] shrink-0"
          />
          <div className="text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <h3 className="text-lg font-bold text-[#101311]">{student.name}</h3>
              {student.openForCollaboration && (
                <Badge variant="green" size="sm">
                  Open for Collab
                </Badge>
              )}
            </div>
            <p className="text-xs font-medium text-[#172B3A]/80">{student.headline}</p>
            <p className="text-xs text-[#172B3A]/60 mt-1">
              {student.department} • {student.semester}
            </p>
          </div>
        </div>

        {/* Bio */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#172B3A]/70 mb-1.5">
            About
          </h4>
          <p className="text-xs sm:text-sm text-[#101311]/85 leading-relaxed">
            {student.bio}
          </p>
        </div>

        {/* Skills & Interests */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#172B3A]/70 mb-2">
              Technical Skills
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {student.skills.map((skill) => (
                <Badge key={skill} variant="sage" size="sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#172B3A]/70 mb-2">
              Interests & Focus
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {student.interests.map((interest) => (
                <Badge key={interest} variant="sand" size="sm">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Projects */}
        {student.projects && student.projects.length > 0 && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#172B3A]/70 mb-2.5 flex items-center gap-1.5">
              <FolderGit2 className="w-3.5 h-3.5 text-[#347653]" />
              Featured Projects & Portfolio
            </h4>
            <div className="space-y-2.5">
              {student.projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white rounded-xl border border-[#EDE4D4] hover:border-[#347653]/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#101311]">{proj.title}</span>
                    <span className="text-[11px] font-medium text-[#347653] bg-[#EAF3ED] px-2 py-0.5 rounded">
                      {proj.role}
                    </span>
                  </div>
                  <p className="text-xs text-[#172B3A]/75 mt-1 leading-relaxed">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {proj.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] text-[#172B3A]/60 bg-[#EDE4D4]/40 px-1.5 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Looking For note */}
        {student.lookingFor && (
          <div className="p-3 bg-[#EDE4D4]/40 rounded-xl border border-[#DFCDB5] text-xs">
            <span className="font-bold text-[#524430] flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" /> What they are looking for:
            </span>
            <p className="text-[#524430]/90">{student.lookingFor}</p>
          </div>
        )}

        {/* Collaboration Invite Form */}
        <div className="pt-2 border-t border-[#EDE4D4]/60">
          <h4 className="text-xs font-bold text-[#101311] mb-2">
            Send a peer collaboration note
          </h4>
          {inviteSent ? (
            <div className="p-3 bg-[#EAF3ED] border border-[#C6E2D0] rounded-xl text-xs text-[#235037] flex items-center gap-2">
              <Check className="w-4 h-4 text-[#347653] shrink-0" />
              <span>
                Collaboration invite sent to {student.name}! They will receive this in their Campus notifications.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSendInvite} className="space-y-2.5">
              <textarea
                rows={2}
                placeholder={`Hi ${student.name.split(' ')[0]}, saw your background in ${student.skills[0]} and would love to collaborate on...`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-[#EDE4D4] bg-[#FAF8F2] focus:bg-white focus:outline-none focus:border-[#347653] transition-colors resize-none text-[#101311]"
                required
              />
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" type="button" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" icon={<Send className="w-3.5 h-3.5" />}>
                  Send Invite
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Modal>
  );
};
