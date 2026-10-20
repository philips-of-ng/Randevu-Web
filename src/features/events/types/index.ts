export type EventStatus = 'LIVE' | 'SOLD OUT' | 'UPCOMING';

export interface PartyEvent {
  id: string;
  title: string;
  image: string;
  date: string;         // e.g. "Sat, December 25"
  isoDate: string;      // e.g. "2026-12-25" for filtering
  location: string;     // e.g. "Atlanta, Georgia"
  status: EventStatus;
}
