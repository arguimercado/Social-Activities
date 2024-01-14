import { IAttendee } from "./Attendee";

export interface IActivity {
  id: string;
  title: string;
  date: Date | null;
  description: string;
  category: string;
  city: string;
  venue: string;
  hostUsername?: string;
  isCancelled: boolean;
  isGoing: boolean;
  host?: IAttendee;
  attendees: IAttendee[];
}

