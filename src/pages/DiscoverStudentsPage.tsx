import React, { useState } from 'react';
import { SAMPLE_STUDENTS } from '../data/sampleData';
import { StudentProfile } from '../types';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { StudentDetailModal } from '../components/students/StudentDetailModal';
import {
  Search,
  Users,
  Sparkles,
  UserPlus,
  Briefcase,
  Flame,
  ArrowRight,
} from 'lucide-react';
import { cn } from '../lib/utils';

export const DiscoverStudentsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);

  const departments = [
    'All',
    'Computer Science',
    'Information Science',
    'Electronics',
    'Mechanical',
  ];

  const topSkills = [
    'All',
    'React',
    'Python',
    'UI/UX Design',
    'Machine Learning',
    'Embedded C',
    'Docker',
    'Figma',
    'Tailwind CSS',
  ];

  const filteredStudents = SAMPLE_STUDENTS.filter((s) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      s.name.toLowerCase().includes(q) ||
      s.headline.toLowerCase().includes(q) ||
      s.skills.some((sk) => sk.toLowerCase().includes(q)) ||
      s.department.toLowerCase().includes(q);

    const matchesDept =
      selectedDept === 'All' || s.department.toLowerCase().includes(selectedDept.toLowerCase());

    const matchesSkill =
      selectedSkill === 'All' || s.skills.some((sk) => sk.toLowerCase() === selectedSkill.toLowerCase());

    return matchesSearch && matchesDept && matchesSkill;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-[#EDE4D4] p-5 sm:p-6 shadow-subtle">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#101311] tracking-tight">
                Discover Students & Teammates
              </h1>
              <Badge variant="sage" size="sm">
                Collab Hub
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-[#172B3A]/75 max-w-xl leading-relaxed">
              Find co-founders, project teammates, and study peers across departments. Connect with designers, developers, and hardware specialists.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#172B3A]/60 font-semibold">
              {SAMPLE_STUDENTS.length} peer profiles available
            </span>
          </div>
        </div>

        {/* Search & Department Filters */}
        <div className="mt-5 pt-4 border-t border-[#EDE4D4]/70 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#347653] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search students by name, technology (e.g. Python, Figma), or interests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2.5 bg-white rounded-xl border border-[#EDE4D4] text-[#101311] placeholder:text-[#101311]/40 focus:outline-none focus:border-[#347653]"
              />
            </div>

            {/* Department Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition-colors',
                    selectedDept === dept
                      ? 'bg-[#172B3A] text-white shadow-xs'
                      : 'bg-[#FAF8F2] hover:bg-[#EDE4D4] text-[#172B3A]/75 border border-[#EDE4D4]'
                  )}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Skill Tags Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#172B3A]/60 mr-1 shrink-0">
              Skill Filter:
            </span>
            {topSkills.map((sk) => (
              <button
                key={sk}
                onClick={() => setSelectedSkill(sk)}
                className={cn(
                  'px-2.5 py-0.5 text-[11px] font-medium rounded-full shrink-0 transition-colors',
                  selectedSkill === sk
                    ? 'bg-[#347653] text-white'
                    : 'bg-[#EDE4D4]/50 hover:bg-[#EDE4D4] text-[#172B3A]/80 border border-[#DFCDB5]'
                )}
              >
                {sk}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Project Collaboration Board (HackSprint & Mini-Project Teams Looking for Members) */}
      <div className="bg-[#FAF8F2] rounded-xl border border-[#EDE4D4] p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-bold text-[#101311]">
              Team Formation Board: HackSprint 2026 & Mini-Projects
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-[#347653]">3 active team calls</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 bg-white rounded-lg border border-[#EDE4D4] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#101311]">Team Campus Carbon</span>
              <Badge variant="navy" size="sm">
                HackSprint Track
              </Badge>
            </div>
            <p className="text-xs text-[#172B3A]/75">
              Building an automated college cafeteria food-waste prediction model. Seeking: 1 Frontend Engineer (React/Tailwind) & 1 Data Visualization person.
            </p>
            <div className="pt-1 flex items-center justify-between text-[11px]">
              <span className="text-[#347653] font-medium">Led by Rohan Patel (CS & AI)</span>
              <button
                onClick={() => setSelectedStudent(SAMPLE_STUDENTS[1])}
                className="text-[#347653] font-semibold hover:underline flex items-center gap-1"
              >
                Apply to team <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="p-3 bg-white rounded-lg border border-[#EDE4D4] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#101311]">Team Autonomous Quad</span>
              <Badge variant="mist" size="sm">
                5th Sem Hardware
              </Badge>
            </div>
            <p className="text-xs text-[#172B3A]/75">
              LoRa telemetry and obstacle avoidance drone. Seeking: 1 Python/Web dev to stream telemetry data onto a real-time dashboard.
            </p>
            <div className="pt-1 flex items-center justify-between text-[11px]">
              <span className="text-[#347653] font-medium">Led by Sneha Nair (ECE)</span>
              <button
                onClick={() => setSelectedStudent(SAMPLE_STUDENTS[2])}
                className="text-[#347653] font-semibold hover:underline flex items-center gap-1"
              >
                Apply to team <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Student Cards Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-base font-bold text-[#101311] flex items-center gap-2">
            <Users className="w-4 h-4 text-[#347653]" />
            <span>Student Profiles ({filteredStudents.length})</span>
          </h3>
        </div>

        {filteredStudents.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-xl border border-[#EDE4D4] text-xs text-[#172B3A]/60">
            No students found matching your criteria. Try resetting the filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                className="group bg-white rounded-xl border border-[#EDE4D4] p-5 shadow-subtle hover:shadow-card hover:border-[#347653]/40 transition-all duration-200 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-start gap-3.5">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-[#EDE4D4] group-hover:ring-[#347653] transition-all shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-sm font-bold text-[#101311] group-hover:text-[#347653] transition-colors truncate">
                          {student.name}
                        </h4>
                        <span className="text-[10px] font-semibold text-[#347653] bg-[#EAF3ED] px-1.5 py-0.5 rounded shrink-0">
                          {student.semester}
                        </span>
                      </div>
                      <p className="text-xs text-[#172B3A]/70 truncate mt-0.5">
                        {student.department}
                      </p>
                      <p className="text-xs text-[#101311]/85 line-clamp-1 mt-1 font-medium">
                        {student.headline}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-[#172B3A]/80 line-clamp-2 mt-3 leading-relaxed">
                    {student.bio}
                  </p>

                  <div className="mt-3.5 pt-3 border-t border-[#EDE4D4]/60">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-[#172B3A]/60 mb-1.5">
                      Core Skills
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {student.skills.map((skill) => (
                        <Badge key={skill} variant="sage" size="sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {student.lookingFor && (
                    <div className="mt-3 p-2 bg-[#FAF8F2] rounded-lg border border-[#EDE4D4]/70 text-[11px] text-[#524430] flex items-start gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#347653] shrink-0 mt-0.5" />
                      <p className="line-clamp-2 leading-relaxed">{student.lookingFor}</p>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-[#EDE4D4]/60 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-[#172B3A]/60 font-medium flex items-center gap-1">
                    <Briefcase className="w-3 h-3 text-[#347653]" />
                    {student.projects.length} project showcase
                  </span>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={<UserPlus className="w-3.5 h-3.5 text-[#347653]" />}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedStudent(student);
                    }}
                  >
                    View & Invite
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Student Collab Modal */}
      <StudentDetailModal
        student={selectedStudent}
        isOpen={Boolean(selectedStudent)}
        onClose={() => setSelectedStudent(null)}
      />
    </div>
  );
};
