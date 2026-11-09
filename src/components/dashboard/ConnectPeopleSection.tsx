import React, { useState } from 'react';
import { SAMPLE_STUDENTS } from '../../data/sampleData';
import { StudentProfile } from '../../types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { ArrowUpRight, UserPlus, Sparkles } from 'lucide-react';
import { StudentDetailModal } from '../students/StudentDetailModal';
import { useNavigate } from 'react-router-dom';

export const ConnectPeopleSection: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);
  const navigate = useNavigate();

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#101311] tracking-tight">
              People you might want to connect with
            </h2>
            <Badge variant="sage" size="sm">
              Peer Discovery
            </Badge>
          </div>
          <p className="text-xs text-[#172B3A]/70 mt-0.5">
            Discover engineering peers, UI/UX collaborators, and project teammates
          </p>
        </div>

        <button
          onClick={() => navigate('/students')}
          className="text-xs font-semibold text-[#347653] hover:text-[#2B6244] flex items-center gap-1 hover:underline"
        >
          Browse all peers
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid of Student Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SAMPLE_STUDENTS.slice(0, 3).map((student) => (
          <div
            key={student.id}
            onClick={() => setSelectedStudent(student)}
            className="group bg-white rounded-xl border border-[#EDE4D4] p-4 sm:p-5 shadow-subtle hover:shadow-card hover:border-[#347653]/40 transition-all duration-200 flex flex-col justify-between cursor-pointer"
          >
            <div>
              {/* Top row: Avatar + Name + Dept */}
              <div className="flex items-start gap-3.5">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#EDE4D4] group-hover:ring-[#347653] transition-all shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="text-sm font-bold text-[#101311] group-hover:text-[#347653] transition-colors truncate">
                      {student.name}
                    </h3>
                    <span className="text-[10px] font-semibold text-[#347653] bg-[#EAF3ED] px-1.5 py-0.5 rounded shrink-0">
                      {student.semester}
                    </span>
                  </div>
                  <p className="text-xs text-[#172B3A]/70 truncate mt-0.5">
                    {student.department}
                  </p>
                  <p className="text-xs text-[#101311]/80 line-clamp-1 mt-1 font-medium">
                    {student.headline}
                  </p>
                </div>
              </div>

              {/* Skills tags */}
              <div className="mt-3.5 pt-3 border-t border-[#EDE4D4]/60">
                <p className="text-[10px] uppercase font-bold tracking-wider text-[#172B3A]/60 mb-1.5">
                  Top Skills
                </p>
                <div className="flex flex-wrap gap-1">
                  {student.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="mist" size="sm">
                      {skill}
                    </Badge>
                  ))}
                  {student.skills.length > 3 && (
                    <span className="text-[10px] font-semibold text-[#172B3A]/50 self-center">
                      +{student.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Looking for snippet */}
              {student.lookingFor && (
                <div className="mt-3 p-2 bg-[#FAF8F2] rounded-lg border border-[#EDE4D4]/60 text-[11px] text-[#524430] flex items-start gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#347653] shrink-0 mt-0.5" />
                  <p className="line-clamp-2 leading-relaxed">{student.lookingFor}</p>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="mt-4 pt-3 border-t border-[#EDE4D4]/60 flex items-center justify-between gap-2">
              <span className="text-[11px] text-[#172B3A]/60 font-medium">
                {student.projects.length} showcase project{student.projects.length !== 1 ? 's' : ''}
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
                Connect
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Student Details & Collab Modal */}
      <StudentDetailModal
        student={selectedStudent}
        isOpen={Boolean(selectedStudent)}
        onClose={() => setSelectedStudent(null)}
      />
    </section>
  );
};
