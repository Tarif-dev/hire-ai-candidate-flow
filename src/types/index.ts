
export interface JobDescription {
  id: string;
  title: string;
  description: string;
  summary?: string;
  skills: string[];
  experience: string;
  location: string;
  postedDate: string;
  metadata: Record<string, any>;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  resumeUrl: string;
  skills: string[];
  experience: string[];
  education: Education[];
  parsedContent?: string;
}

export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
}

export interface Match {
  id: string;
  jobId: string;
  candidateId: string;
  score: number;
  matchDetails: MatchDetail[];
  shortlisted: boolean;
  notes?: string;
}

export interface MatchDetail {
  category: string; // "skills", "experience", "education", etc.
  score: number;
  details: string;
}

export interface Interview {
  id: string;
  candidateId: string;
  jobId: string;
  datetime: string;
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
}
