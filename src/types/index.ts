export type EventCategory = 
  | 'Workshop'
  | 'Hackathon'
  | 'Club Activity'
  | 'Technical Talk'
  | 'Career & Internship'
  | 'Campus Life';

export interface CampusEvent {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  time: string;
  venue: string;
  organizer: string;
  organizerType: 'official' | 'student-club' | 'faculty' | 'peer';
  attendeeCount: number;
  capacity?: number;
  imageUrl: string;
  description: string;
  tags: string[];
  isFeatured?: boolean;
  registrationOpen: boolean;
  registrationDeadline?: string;
  disclaimer?: string;
}

export type AnnouncementCategory = 
  | 'Campus'
  | 'Clubs'
  | 'Opportunities'
  | 'Academic'
  | 'Resources';

export interface CampusAnnouncement {
  id: string;
  title: string;
  summary: string;
  category: AnnouncementCategory;
  date: string;
  source: {
    name: string;
    isOfficial: boolean;
    badgeLabel: string; // e.g. "Campus Notice", "Student Club", "Career Cell"
  };
  pinned?: boolean;
  actionUrl?: string;
  actionText?: string;
}

export interface StudentProject {
  title: string;
  role: string;
  description: string;
  tags: string[];
}

export interface StudentProfile {
  id: string;
  name: string;
  department: string;
  semester: string;
  avatar: string;
  headline: string;
  bio: string;
  skills: string[];
  interests: string[];
  projects: StudentProject[];
  servicesCount?: number;
  lookingFor?: string;
  openForCollaboration: boolean;
  githubUrl?: string;
  portfolioUrl?: string;
  isCurrentUser?: boolean;
}

export type ServiceCategory = 
  | 'Tutoring'
  | 'Design'
  | 'Development'
  | 'Photography'
  | 'Video Editing'
  | 'Technical Assistance';

export interface CampusService {
  id: string;
  title: string;
  category: ServiceCategory;
  provider: {
    id: string;
    name: string;
    department: string;
    semester: string;
    avatar: string;
    rating: number;
    completedCount: number;
  };
  priceDisplay: string;
  priceModel: 'Per Hour' | 'Per Project' | 'Per Session';
  description: string;
  tags: string[];
  turnaroundTime: string;
  ethicsDisclaimer: string;
}

export interface CampusRide {
  id: string;
  driver: {
    id: string;
    name: string;
    department: string;
    semester: string;
    avatar: string;
    rating: number;
    ridesGiven: number;
  };
  originArea: string; // General area, never precise live coordinates
  destinationArea: string;
  departureTime: string;
  departureDate: string;
  seatsTotal: number;
  seatsAvailable: number;
  costSharingEstimate: string;
  vehicleType: string; // e.g. 'Car (Sedan)', 'EV Scooter Carpool'
  notes?: string;
}

export type ResourceCategory = 
  | 'Scholarships'
  | 'Library'
  | 'Academic Guidance'
  | 'Forms & Support';

export interface CampusResource {
  id: string;
  title: string;
  category: ResourceCategory;
  summary: string;
  provider: string;
  deadline?: string;
  eligibilityNotes?: string[];
  guidanceSteps?: string[];
  officialPortalUrl?: string;
  sampleDisclaimer: string;
  tags: string[];
}

export interface UpcomingDeadline {
  id: string;
  title: string;
  category: string;
  date: string;
  daysRemaining: number;
  sourceNote: string;
  type: 'scholarship' | 'hackathon' | 'workshop' | 'academic';
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  category: 'events' | 'services' | 'rides' | 'announcements' | 'system';
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}
