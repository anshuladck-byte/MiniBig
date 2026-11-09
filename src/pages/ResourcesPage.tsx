import React, { useState } from 'react';
import { SAMPLE_RESOURCES, SAMPLE_DEADLINES } from '../data/sampleData';
import { CampusResource, ResourceCategory } from '../types';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import {
  BookOpen,
  Search,
  ExternalLink,
  ShieldCheck,
  Calendar,
  AlertCircle,
  FileText,
  CheckCircle2,
  GraduationCap,
} from 'lucide-react';
import { cn } from '../lib/utils';

export const ResourcesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Scholarships', 'Library', 'Academic Guidance', 'Forms & Support'];

  const filteredResources = SAMPLE_RESOURCES.filter((res) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      res.title.toLowerCase().includes(q) ||
      res.summary.toLowerCase().includes(q) ||
      res.tags.some((t) => t.toLowerCase().includes(q));

    const matchesCategory =
      selectedCategory === 'All' || res.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="bg-white rounded-2xl border border-[#EDE4D4] p-5 sm:p-6 shadow-subtle">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#101311] tracking-tight">
                Student Resources & Academic Directory
              </h1>
              <Badge variant="mist" size="sm">
                Informational
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-[#172B3A]/75 max-w-xl leading-relaxed">
              Curated student guidance directory for national scholarship portals, remote digital library proxies, research formatting templates, and peer support.
            </p>
          </div>

          <div className="p-3 bg-[#FAF8F2] rounded-xl border border-[#EDE4D4] flex items-center gap-2 text-xs text-[#172B3A]/80 shrink-0">
            <ShieldCheck className="w-4 h-4 text-[#347653] shrink-0" />
            <span>Public & Peer Guidance • Independent Directory</span>
          </div>
        </div>

        {/* Clear Institutional Disclaimer */}
        <div className="mt-5 p-3.5 bg-[#FAF8F2] rounded-xl border border-[#EDE4D4] flex items-start gap-2.5 text-xs text-[#172B3A]/80">
          <AlertCircle className="w-4 h-4 text-[#524430] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Demonstration Notice:</strong> Campus acts strictly as an informational navigator and reference directory. The platform does not alter, store, or process official college registrar, financial, or academic records. Always verify deadlines on authorized university portals.
          </p>
        </div>

        {/* Search & Categories */}
        <div className="mt-5 pt-4 border-t border-[#EDE4D4]/70 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#347653] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search resources, scholarship guidelines, IEEE guides, library access..."
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

      {/* Deadlines Timeline Reminder Bar */}
      <div className="bg-[#FAF8F2] rounded-xl border border-[#EDE4D4] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Calendar className="w-4 h-4 text-[#347653]" />
          <div>
            <h4 className="text-xs font-bold text-[#101311]">Key Opportunity Deadlines</h4>
            <p className="text-[11px] text-[#172B3A]/60">Application windows closing in November 2026</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {SAMPLE_DEADLINES.slice(0, 2).map((dl) => (
            <span
              key={dl.id}
              className="text-[11px] font-semibold bg-white border border-[#EDE4D4] px-2.5 py-1 rounded-lg text-[#101311]"
            >
              {dl.title}: <strong>{dl.date}</strong> ({dl.daysRemaining}d left)
            </span>
          ))}
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.map((res: CampusResource) => (
          <div
            key={res.id}
            className="bg-white rounded-xl border border-[#EDE4D4] p-5 shadow-subtle flex flex-col justify-between space-y-4 hover:border-[#347653]/30 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <Badge
                  variant={
                    res.category === 'Scholarships'
                      ? 'sand'
                      : res.category === 'Library'
                      ? 'mist'
                      : 'sage'
                  }
                  size="sm"
                >
                  {res.category}
                </Badge>
                {res.deadline && (
                  <span className="text-[11px] font-bold text-[#347653] bg-[#EAF3ED] px-2 py-0.5 rounded">
                    Due: {res.deadline}
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-[#101311] leading-snug">
                {res.title}
              </h3>
              <p className="text-xs text-[#172B3A]/60 font-medium mt-0.5">
                Source: {res.provider}
              </p>

              <p className="text-xs text-[#172B3A]/80 mt-2.5 leading-relaxed">
                {res.summary}
              </p>

              {/* Eligibility Criteria (if present) */}
              {res.eligibilityNotes && res.eligibilityNotes.length > 0 && (
                <div className="mt-3.5 pt-3 border-t border-[#EDE4D4]/60">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#172B3A]/60 mb-1.5">
                    Eligibility Checklist
                  </p>
                  <ul className="space-y-1 text-xs text-[#172B3A]/80">
                    {res.eligibilityNotes.map((note, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#347653] shrink-0 mt-0.5" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Guidance Steps */}
              {res.guidanceSteps && res.guidanceSteps.length > 0 && (
                <div className="mt-3.5 pt-3 border-t border-[#EDE4D4]/60">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#172B3A]/60 mb-1.5">
                    Step-by-Step Action Guide
                  </p>
                  <div className="space-y-1.5 text-xs text-[#172B3A]/80">
                    {res.guidanceSteps.map((step, idx) => (
                      <p key={idx} className="p-2 bg-[#FAF8F2] rounded-lg border border-[#EDE4D4]/60">
                        {step}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-[#EDE4D4]/60 flex items-center justify-between">
              <span className="text-[10px] text-[#172B3A]/60 italic max-w-xs truncate">
                {res.sampleDisclaimer}
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  if (res.officialPortalUrl) {
                    window.open(res.officialPortalUrl, '_blank');
                  } else {
                    alert(`Official guidance packet for "${res.title}" will open via student support.`);
                  }
                }}
                iconRight={<ExternalLink className="w-3.5 h-3.5" />}
              >
                Access Portal
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
