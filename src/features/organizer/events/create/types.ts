export type EventTab = "details" | "appearance" | "tickets" | "admin";

export type EventCategory =
  | "Nightlife"
  | "Carnival"
  | "Party"
  | "Conference"
  | "Wellness"
  | "Travel & outdoor"
  | "Festival"
  | "Other";

export interface CollaboratorItem {
  id: string;
  username: string;
  role: "CO_HOST" | "SCANNER" | "PROMOTER_PARTNER";
  splitPercentage?: string;
}

export interface CreateEventFormData {
  // Tab 1: Event Details
  title: string;
  description: string;
  eventType: EventCategory | "";
  streetAddress: string;
  city: string;
  stateCountry: string;
  isVirtual: boolean;
  scheduleType: "one-time" | "recurring";
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;

  // Tab 2: Appearance
  flyerUrl: string | null;

  // Tab 3: Ticket Info
  ticketType: "single" | "multiple";
  ticketTitle: string;
  ticketQuantity: string;
  orderLimit: string;
  benefits: string[];
  ticketPrice: string;

  // Tab 4: Team & Admin
  collaborators?: CollaboratorItem[];
  isPrivate?: boolean;
  requireApproval?: boolean;
}