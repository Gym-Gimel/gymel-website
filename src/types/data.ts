export type CourseStatus = "open" | "waitlist" | "closed";

export type Course = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  ageRange: string;
  days: string[];
  startTime: string;
  endTime: string;
  location: string;
  monitors: string[];
  price: string;
  status: CourseStatus;
  image?: string;
  registrationUrl?: string;
  restartDate?: string;
  note?: string;
};

export type CourseGroup = {
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  ageRange: string;
  days: string[];
  status: CourseStatus;
  image?: string;
  registrationUrl?: string;
  sessions: Course[];
};

export type CompetitionStatus =
  | "draft"
  | "upcoming"
  | "registration-open"
  | "registration-closed"
  | "finished"
  | "cancelled";

export type Competition = {
  id: string;
  slug: string;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  category: string;
  group: string;
  status: CompetitionStatus;
  description: string;
  registrationUrl?: string;
  programUrl?: string;
  resultsUrl?: string;
  featured: boolean;
};

export type VolleyballStatus = "scheduled" | "postponed" | "cancelled" | "finished";

export type VolleyballMatch = {
  id: string;
  season: string;
  date: string;
  time: string;
  competition: string;
  homeTeam: string;
  awayTeam: string;
  location: string;
  homeScore?: number;
  awayScore?: number;
  status: VolleyballStatus;
  externalUrl?: string;
  league: "volley-men" | "volley-women";
};

export type CalendarItem =
  | {
    id: string;
    type: "competition";
    slug: string;
    title: string;
    date: string;
    endDate?: string;
    location: string;
    category: string;
    status: CompetitionStatus;
    description: string;
    href: string;
    featured: boolean;
    registrationUrl?: string;
    programUrl?: string;
    resultsUrl?: string;
  }
  | {
    id: string;
    type: "event";
    slug: string;
    title: string;
    date: string;
    endDate?: string;
    location: string;
    category: string;
    status: CompetitionStatus;
    description: string;
    href: string;
    featured: boolean;
    registrationUrl?: string;
    programUrl?: string;
    resultsUrl?: string;
  }
  | {
    id: string;
    type: "volley-men" | "volley-women";
    title: string;
    date: string;
    time: string;
    location: string;
    category: string;
    status: VolleyballStatus;
    href?: string;
    score?: string;
  };

export type CsvValidationError = {
  file: string;
  line: number;
  column?: string;
  value?: unknown;
  expected: string;
  message: string;
};
