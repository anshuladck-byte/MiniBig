# Campus — College-Exclusive Digital Ecosystem
### Phase 1: Premium Frontend UI (Engineering Mini-Project)

A startup-quality, college-exclusive web application connecting engineering students for academic collaboration, peer tutoring, multidisciplinary team formation, sustainable shared commutes, and campus resources.

---

## 🎨 Mandatory Brand Identity & Design System

The application strictly adheres to the following centralized design token system:

| Role | Color | Hex | Primary Usage |
| :--- | :--- | :--- | :--- |
| **Primary Navy** | Deep Navy | `#172B3A` | Sidebar navigation, prominent dark surfaces |
| **Signature Accent** | Forest Green | `#347653` | Primary buttons, active routes, key CTAs, highlights |
| **Typography** | Pitch Black | `#101311` | Headings, strong typography, high-contrast text |
| **Page Canvas** | Warm Cream | `#F5F0E4` | Primary background, spacious breathing room |
| **Surface** | Pure White | `#FFFFFF` | Cards, modals, dialogs, forms |
| **Pastel Accent** | Sage Pastel | `#DDE9D9` | Academic tags, workshop badges, club activity pills |
| **Pastel Accent** | Mist Pastel | `#E2E9E8` | Public notices, technical tags, verification indicators |
| **Pastel Accent** | Sand Pastel | `#EDE4D4` | Service badges, deadlines, subtle borders |

Typography is powered by **Plus Jakarta Sans** for a crisp, confident, modern tech aesthetic.

---

## 🚀 Running the Project

1. **Install dependencies** (already installed in workspace):
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview the production build**:
   ```bash
   npm run preview
   ```

---

## 📁 Project Architecture

```
MiniBig/
├── index.html                   # HTML entry point with Plus Jakarta Sans font
├── tailwind.config.js           # Centralized color tokens (campus-navy, campus-green, etc.)
├── vite.config.ts               # Vite configuration with path aliases
├── package.json                 # React, TypeScript, Tailwind, Lucide React, React Router
└── src/
    ├── types/
    │   └── index.ts             # TypeScript definitions (Events, Students, Services, Rides, Resources)
    ├── data/
    │   └── sampleData.ts        # Realistic sample campus dataset (clearly labeled demonstration data)
    ├── lib/
    │   └── utils.ts             # Tailwind class merging utility (`cn`)
    ├── components/
    │   ├── common/
    │   │   ├── Badge.tsx        # Brand pastel badge system (sage, mist, sand, navy, green)
    │   │   ├── Button.tsx       # Standardized Campus button variants (primary, secondary, subtle)
    │   │   ├── Card.tsx         # Subtle bordered cards with restrained shadow
    │   │   ├── Modal.tsx        # Accessible dialog system with backdrop and escape handling
    │   │   └── SearchModal.tsx  # Global search across events, students, services, notices
    │   ├── layout/
    │   │   ├── AppLayout.tsx    # Shell with responsive sidebar, top navigation, and drawers
    │   │   ├── Sidebar.tsx      # Collapsible Deep Navy navigation sidebar & user badge
    │   │   ├── TopNav.tsx       # Global search trigger, notification counter, profile menu
    │   │   └── NotificationDrawer.tsx # Functional notifications drawer with read/unread filters
    │   ├── dashboard/
    │   │   ├── WelcomeBanner.tsx        # "Good morning, Anshul" compact hero banner
    │   │   ├── QuickActionsGrid.tsx     # 5 fast pathways (tutor, offer, teammates, rides, events)
    │   │   ├── CampusEventsSection.tsx  # "Happening on campus" event cards
    │   │   ├── AnnouncementsSection.tsx # Notice digest with transparent attribution badges
    │   │   ├── ConnectPeopleSection.tsx # Peer discovery preview cards
    │   │   └── UpcomingDeadlinesSection.tsx # Key deadline reminders with days remaining
    │   ├── events/
    │   │   └── EventDetailModal.tsx     # Event schedule details and RSVP flow
    │   ├── students/
    │   │   └── StudentDetailModal.tsx   # Student portfolio, skills, and collaboration invite form
    │   ├── services/
    │   │   ├── ServiceBookingModal.tsx  # Service inquiry and scheduling dialog
    │   │   └── CreateServiceModal.tsx   # Modal to publish a new peer offering
    │   └── rides/
    │       ├── RideRequestModal.tsx     # Carpool seat request dialog with safety notice
    │       └── CreateRideModal.tsx      # Modal to post a new shared commute route
    ├── pages/
    │   ├── DashboardPage.tsx       # Flagship Main Dashboard screen
    │   ├── CampusFeedPage.tsx      # Searchable events, workshops, and categorized notices
    │   ├── DiscoverStudentsPage.tsx# Peer search, department filters, and team formation board
    │   ├── ServicesPage.tsx        # Student service marketplace with academic integrity policy
    │   ├── RidesPage.tsx           # Campus commute carpool board with privacy protections
    │   ├── ResourcesPage.tsx       # Scholarship guidance, digital library access & academic templates
    │   ├── ProfilePage.tsx         # Student profile with real-time local state editor
    │   └── SettingsPage.tsx        # Privacy toggles, alerts & brand token preview
    ├── App.tsx                     # React Router routes definition
    ├── main.tsx                    # React DOM entry
    └── index.css                   # Tailwind imports & CSS custom properties
```

---

## 🛡️ Academic Integrity & Source Transparency

- **Independent Platform**: Does not imply official college administration integration or institutional authorization.
- **Academic Integrity**: Student service marketplace emphasizes conceptual coaching, design review, and skill assistance. Strictly bars homework completion or assignment outsourcing.
- **Privacy First**: Shared rides match general landmarks (metro stations, bus gates) rather than revealing personal residential addresses or streaming live device GPS coordinates.
- **Local State**: All additions, RSVPs, profile edits, and bookings execute via React state in Phase 1 with zero fake auth or fake payment pretenses.
