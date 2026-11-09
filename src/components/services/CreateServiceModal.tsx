import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { CampusService, ServiceCategory } from '../../types';
import { Button } from '../common/Button';
import { CURRENT_USER } from '../../data/sampleData';
import { ShieldCheck, Plus } from 'lucide-react';

interface CreateServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddService: (newService: CampusService) => void;
}

export const CreateServiceModal: React.FC<CreateServiceModalProps> = ({
  isOpen,
  onClose,
  onAddService,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('Tutoring');
  const [price, setPrice] = useState('₹400');
  const [priceModel, setPriceModel] = useState<'Per Hour' | 'Per Project' | 'Per Session'>('Per Hour');
  const [description, setDescription] = useState('');
  const [turnaround, setTurnaround] = useState('Available weekday evenings');
  const [tagsInput, setTagsInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newService: CampusService = {
      id: `srv-${Date.now()}`,
      title,
      category,
      provider: {
        id: CURRENT_USER.id,
        name: CURRENT_USER.name,
        department: 'CSE',
        semester: CURRENT_USER.semester,
        avatar: CURRENT_USER.avatar,
        rating: 5.0,
        completedCount: 1,
      },
      priceDisplay: price.startsWith('₹') ? price : `₹${price}`,
      priceModel,
      description,
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
      turnaroundTime: turnaround,
      ethicsDisclaimer: 'Focused strictly on conceptual coaching and peer assistance. Does not complete graded coursework.',
    };

    onAddService(newService);
    // Reset form
    setTitle('');
    setDescription('');
    setTagsInput('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Offer a Peer Student Service"
      subtitle="Share your technical or creative skill with fellow campus students"
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs text-[#101311]">
        <div>
          <label className="block font-bold mb-1">Service Title</label>
          <input
            type="text"
            required
            placeholder="e.g., Python & Data Structures Mentoring, Figma Prototype Review"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2.5 rounded-lg border border-[#EDE4D4] bg-[#FAF8F2] focus:bg-white focus:outline-none focus:border-[#347653] transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-bold mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ServiceCategory)}
              className="w-full p-2.5 rounded-lg border border-[#EDE4D4] bg-[#FAF8F2] focus:bg-white focus:outline-none focus:border-[#347653] transition-colors"
            >
              <option value="Tutoring">Tutoring</option>
              <option value="Design">Design</option>
              <option value="Development">Development</option>
              <option value="Photography">Photography</option>
              <option value="Video Editing">Video Editing</option>
              <option value="Technical Assistance">Technical Assistance</option>
            </select>
          </div>

          <div>
            <label className="block font-bold mb-1">Pricing Model</label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                placeholder="₹350"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-1/2 p-2.5 rounded-lg border border-[#EDE4D4] bg-[#FAF8F2] focus:bg-white focus:outline-none focus:border-[#347653] transition-colors"
              />
              <select
                value={priceModel}
                onChange={(e) => setPriceModel(e.target.value as any)}
                className="w-1/2 p-2.5 rounded-lg border border-[#EDE4D4] bg-[#FAF8F2] focus:bg-white focus:outline-none focus:border-[#347653] transition-colors"
              >
                <option value="Per Hour">Per Hour</option>
                <option value="Per Project">Per Project</option>
                <option value="Per Session">Per Session</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block font-bold mb-1">Service Description</label>
          <textarea
            rows={3}
            required
            placeholder="Describe what you will teach, review, or deliver during your sessions..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2.5 rounded-lg border border-[#EDE4D4] bg-[#FAF8F2] focus:bg-white focus:outline-none focus:border-[#347653] transition-colors resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-bold mb-1">Availability / Turnaround</label>
            <input
              type="text"
              required
              placeholder="e.g., Weekday evenings, 48hr delivery"
              value={turnaround}
              onChange={(e) => setTurnaround(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-[#EDE4D4] bg-[#FAF8F2] focus:bg-white focus:outline-none focus:border-[#347653] transition-colors"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Tags (Comma-separated)</label>
            <input
              type="text"
              placeholder="e.g., React, TypeScript, Pair-Debugging"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-[#EDE4D4] bg-[#FAF8F2] focus:bg-white focus:outline-none focus:border-[#347653] transition-colors"
            />
          </div>
        </div>

        {/* Academic policy pledge */}
        <div className="p-3 bg-[#EAF3ED] rounded-xl border border-[#C6E2D0] flex items-start gap-2 text-[#235037]">
          <ShieldCheck className="w-4 h-4 text-[#347653] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            By publishing, you confirm this service provides legitimate peer tutoring or creative production assistance, adhering to campus academic honor codes.
          </p>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-[#EDE4D4]">
          <Button variant="ghost" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            type="submit"
            icon={<Plus className="w-3.5 h-3.5" />}
          >
            Publish Offering
          </Button>
        </div>
      </form>
    </Modal>
  );
};
