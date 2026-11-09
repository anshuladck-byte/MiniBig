import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

import { CURRENT_USER } from '../data/sampleData';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import {
  User,
  GraduationCap,
  Sparkles,
  FolderGit2,
  Briefcase,
  Edit3,
  ShieldCheck,
  CheckCircle2,
  Plus,
  X,
  ExternalLink,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { student, loading } = useAuth();
  const [profile, setProfile] = React.useState<StudentProfile>(CURRENT_USER);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);

  // Edit form local state
  const [editName, setEditName] = useState(profile.name);
  const [editHeadline, setEditHeadline] = useState(profile.headline);
  const [editBio, setEditBio] = useState(profile.bio);
  const [editDepartment, setEditDepartment] = useState(profile.department);
  const [editSemester, setEditSemester] = useState(profile.semester);
  const [editSkills, setEditSkills] = useState<string[]>(profile.skills);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [editLookingFor, setEditLookingFor] = useState(profile.lookingFor || '');

  const handleOpenEdit = () => {
    setEditName(profile.name);
    setEditHeadline(profile.headline);
    setEditBio(profile.bio);
    setEditDepartment(profile.department);
    setEditSemester(profile.semester);
    setEditSkills(profile.skills);
    setEditLookingFor(profile.lookingFor || '');
    setEditModalOpen(true);
  };

  const handleAddSkill = () => {
    if (newSkillInput.trim() && !editSkills.includes(newSkillInput.trim())) {
      setEditSkills([...editSkills, newSkillInput.trim()]);
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setEditSkills(editSkills.filter((s) => s !== skillToRemove));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({
      ...profile,
      name: editName,
      headline: editHeadline,
      bio: editBio,
      department: editDepartment,
      semester: editSemester,
      skills: editSkills,
      lookingFor: editLookingFor,
    });
    setEditModalOpen(false);
    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {saveSuccessNotice && (
        <div className="p-3 bg-[#EAF3ED] border border-[#C6E2D0] rounded-xl text-xs text-[#235037] flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#347653] shrink-0" />
          <span>Profile changes updated successfully in local state!</span>
        </div>
      )}

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-2xl border border-[#EDE4D4] overflow-hidden shadow-subtle">
        {/* Deep Navy Decorative Banner */}
        <div className="h-32 bg-[#172B3A] relative">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="text-[11px] font-semibold text-[#DDE9D9] bg-[#213D52] px-2.5 py-1 rounded-full border border-[#2C4A61] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#347653]" />
              Verified College ID
            </span>
          </div>
        </div>

        {/* Profile Details Container */}
        <div className="p-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4 -mt-12 mb-4">
            <div className="flex items-end gap-4">
              <img
                src={profile.avatar}
                alt={loading ? 'Loading...' : student?.full_name || 'Student'}
                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white shadow-card bg-white"
              />
              <div className="mb-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-[#101311] tracking-tight">
                    {loading ? 'Loading...' : student?.full_name || 'Student'}
                  </h1>
                  <Badge variant="green" size="sm">
                    {student?.semester || 'Semester not available'}
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#347653]">
                  {student?.branch || ''}
                </p>
              </div>
            </div>

            <Button
              variant="secondary"
              size="sm"
              icon={<Edit3 className="w-3.5 h-3.5 text-[#347653]" />}
              onClick={handleOpenEdit}
            >
              Edit Profile
            </Button>
          </div>

          <p className="text-xs sm:text-sm font-medium text-[#101311]/90">
            {profile.headline}
          </p>

          <p className="text-xs sm:text-sm text-[#172B3A]/80 leading-relaxed mt-2.5 max-w-2xl">
            {profile.bio}
          </p>

          {/* Looking for callout */}
          {profile.lookingFor && (
            <div className="mt-4 p-3 bg-[#FAF8F2] rounded-xl border border-[#EDE4D4] text-xs text-[#524430] flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#347653] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#101311] block mb-0.5">Currently seeking:</strong>
                <span>{profile.lookingFor}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
{/* Registered College Details */}
<div className="bg-white rounded-2xl border border-[#EDE4D4] p-5 sm:p-6 shadow-subtle">
  <div className="flex items-center gap-2 mb-4">
    <GraduationCap className="w-5 h-5 text-[#347653]" />
    <h2 className="text-sm font-bold text-[#101311]">
      Registered College Details
    </h2>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {[
      { label: 'USN', value: student?.usn },
      { label: 'Email Address', value: student?.email },
      { label: 'Phone Number', value: student?.phone },
      { label: 'Branch', value: student?.branch },
      { label: 'Semester', value: student?.semester },
      { label: 'Section', value: student?.section },
    ].map((item) => (
      <div
        key={item.label}
        className="p-3 rounded-xl bg-[#FAF8F2] border border-[#EDE4D4]"
      >
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#172B3A]/55">
          {item.label}
        </p>
        <p className="text-sm font-bold text-[#101311] mt-1">
          {loading ? 'Loading...' : item.value || 'Not available'}
        </p>
      </div>
    ))}
  </div>
</div>


      {/* Two Column Grid: Skills & Projects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Skills & Interests (1/3) */}
        <div className="space-y-6 md:col-span-1">
          {/* Skills */}
          <div className="bg-white rounded-xl border border-[#EDE4D4] p-5 shadow-subtle space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#172B3A]/70">
                Skills & Tech Stack
              </h3>
              <button
                onClick={handleOpenEdit}
                className="text-[11px] text-[#347653] font-semibold hover:underline"
              >
                + Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.map((skill) => (
                <Badge key={skill} variant="sage" size="sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="bg-white rounded-xl border border-[#EDE4D4] p-5 shadow-subtle space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#172B3A]/70">
              Interests & Domains
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {profile.interests.map((interest) => (
                <Badge key={interest} variant="sand" size="sm">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          {/* Active Services Showcase */}
          <div className="bg-white rounded-xl border border-[#EDE4D4] p-5 shadow-subtle space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#172B3A]/70 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-[#347653]" />
                Offered Services
              </h3>
              <span className="text-[10px] font-bold text-[#347653] bg-[#EAF3ED] px-1.5 py-0.5 rounded">
                Active
              </span>
            </div>
            <div className="p-3 bg-[#FAF8F2] rounded-lg border border-[#EDE4D4]/80 text-xs">
              <p className="font-bold text-[#101311]">Frontend React & Tailwind Code Review</p>
              <p className="text-[#172B3A]/70 text-[11px] mt-0.5">₹400 / Per Hour • 12 sessions completed</p>
            </div>
          </div>
        </div>

        {/* Right Column: Projects & Experience (2/3) */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-[#EDE4D4] p-5 sm:p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between border-b border-[#EDE4D4]/60 pb-3">
              <h3 className="text-sm font-bold text-[#101311] flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-[#347653]" />
                <span>Featured Engineering Projects & Prototypes</span>
              </h3>
              <span className="text-xs text-[#172B3A]/60">
                {profile.projects.length} showcased
              </span>
            </div>

            <div className="space-y-4">
              {profile.projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#FAF8F2] rounded-xl border border-[#EDE4D4]/80 space-y-2 hover:border-[#347653]/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#101311]">{proj.title}</h4>
                    <span className="text-xs font-semibold text-[#347653] bg-[#EAF3ED] px-2 py-0.5 rounded">
                      {proj.role}
                    </span>
                  </div>
                  <p className="text-xs text-[#172B3A]/80 leading-relaxed">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-[#172B3A]/75 border border-[#EDE4D4]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Student Profile"
        subtitle="Manage your public information in this frontend prototype"
        maxWidth="lg"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs text-[#101311]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold mb-1">Full Name</label>
              <input
                type="text"
                required
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-[#EDE4D4] bg-[#FAF8F2] focus:bg-white focus:outline-none focus:border-[#347653]"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Semester</label>
              <input
                type="text"
                required
                value={editSemester}
                onChange={(e) => setEditSemester(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-[#EDE4D4] bg-[#FAF8F2] focus:bg-white focus:outline-none focus:border-[#347653]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1">Department</label>
            <input
              type="text"
              required
              value={editDepartment}
              onChange={(e) => setEditDepartment(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-[#EDE4D4] bg-[#FAF8F2] focus:bg-white focus:outline-none focus:border-[#347653]"
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Headline</label>
            <input
              type="text"
              required
              value={editHeadline}
              onChange={(e) => setEditHeadline(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-[#EDE4D4] bg-[#FAF8F2] focus:bg-white focus:outline-none focus:border-[#347653]"
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Bio</label>
            <textarea
              rows={3}
              required
              value={editBio}
              onChange={(e) => setEditBio(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-[#EDE4D4] bg-[#FAF8F2] focus:bg-white focus:outline-none focus:border-[#347653] resize-none"
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Looking for / Collaboration Note</label>
            <input
              type="text"
              value={editLookingFor}
              onChange={(e) => setEditLookingFor(e.target.value)}
              placeholder="e.g. Seeking UI designer for upcoming hackathons"
              className="w-full p-2.5 rounded-lg border border-[#EDE4D4] bg-[#FAF8F2] focus:bg-white focus:outline-none focus:border-[#347653]"
            />
          </div>

          {/* Skills Management */}
          <div>
            <label className="block font-bold mb-1">Skills</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {editSkills.map((sk) => (
                <span
                  key={sk}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-[#DDE9D9] text-[#2C4F3B] border border-[#C8DCC4]"
                >
                  {sk}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(sk)}
                    className="hover:text-red-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a new skill (e.g. Rust, PyTorch, Figma)..."
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                className="flex-1 p-2 rounded-lg border border-[#EDE4D4] bg-[#FAF8F2] focus:bg-white focus:outline-none focus:border-[#347653]"
              />
              <Button variant="secondary" size="sm" type="button" onClick={handleAddSkill}>
                Add
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#EDE4D4]">
            <Button variant="ghost" size="sm" type="button" onClick={() => setEditModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
