
import { createContext, useContext, useState, ReactNode } from "react";
import { JobDescription, Candidate, Match, Interview } from "../types";
import { mockJobs, mockCandidates, mockMatches, mockInterviews } from "../data/mockData";

interface AppContextType {
  // Data
  jobs: JobDescription[];
  candidates: Candidate[];
  matches: Match[];
  interviews: Interview[];
  
  // Current selections
  currentJob: JobDescription | null;
  selectedCandidates: Candidate[];
  
  // Actions
  addJob: (job: JobDescription) => void;
  updateJob: (job: JobDescription) => void;
  addCandidates: (candidates: Candidate[]) => void;
  createMatches: (jobId: string, candidateIds: string[]) => void;
  shortlistCandidate: (matchId: string, shortlisted: boolean) => void;
  scheduleInterview: (candidateId: string, jobId: string, datetime: string) => void;
  setCurrentJob: (job: JobDescription | null) => void;
  selectCandidate: (candidate: Candidate) => void;
  unselectCandidate: (candidateId: string) => void;
  clearSelectedCandidates: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // State
  const [jobs, setJobs] = useState<JobDescription[]>(mockJobs);
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [matches, setMatches] = useState<Match[]>(mockMatches);
  const [interviews, setInterviews] = useState<Interview[]>(mockInterviews);
  const [currentJob, setCurrentJob] = useState<JobDescription | null>(null);
  const [selectedCandidates, setSelectedCandidates] = useState<Candidate[]>([]);

  // Actions
  const addJob = (job: JobDescription) => {
    setJobs(prevJobs => [...prevJobs, job]);
  };

  const updateJob = (job: JobDescription) => {
    setJobs(prevJobs => prevJobs.map(j => j.id === job.id ? job : j));
  };

  const addCandidates = (newCandidates: Candidate[]) => {
    setCandidates(prevCandidates => [...prevCandidates, ...newCandidates]);
  };

  const createMatches = (jobId: string, candidateIds: string[]) => {
    // In a real app, this would call an API to analyze and match candidates
    // Here we'll create mock matches with random scores
    const newMatches = candidateIds.map((candidateId, index) => {
      const score = Math.random() * 0.4 + 0.6; // Random score between 0.6 and 1.0
      return {
        id: `match-${Date.now()}-${index}`,
        jobId,
        candidateId,
        score,
        matchDetails: [
          { 
            category: "skills", 
            score: Math.random() * 0.3 + 0.7,
            details: "Skill match analysis" 
          },
          { 
            category: "experience", 
            score: Math.random() * 0.3 + 0.7,
            details: "Experience match analysis" 
          },
          { 
            category: "education", 
            score: Math.random() * 0.3 + 0.7,
            details: "Education match analysis" 
          }
        ],
        shortlisted: score > 0.8,
        notes: ""
      };
    });

    setMatches(prevMatches => [...prevMatches, ...newMatches]);
  };

  const shortlistCandidate = (matchId: string, shortlisted: boolean) => {
    setMatches(prevMatches => 
      prevMatches.map(match => 
        match.id === matchId ? { ...match, shortlisted } : match
      )
    );
  };

  const scheduleInterview = (candidateId: string, jobId: string, datetime: string) => {
    const newInterview: Interview = {
      id: `interview-${Date.now()}`,
      candidateId,
      jobId,
      datetime,
      status: "scheduled"
    };
    setInterviews(prevInterviews => [...prevInterviews, newInterview]);
  };

  const selectCandidate = (candidate: Candidate) => {
    setSelectedCandidates(prev => {
      if (prev.find(c => c.id === candidate.id)) {
        return prev;
      }
      return [...prev, candidate];
    });
  };

  const unselectCandidate = (candidateId: string) => {
    setSelectedCandidates(prev => prev.filter(c => c.id !== candidateId));
  };

  const clearSelectedCandidates = () => {
    setSelectedCandidates([]);
  };

  return (
    <AppContext.Provider
      value={{
        jobs,
        candidates,
        matches,
        interviews,
        currentJob,
        selectedCandidates,
        addJob,
        updateJob,
        addCandidates,
        createMatches,
        shortlistCandidate,
        scheduleInterview,
        setCurrentJob,
        selectCandidate,
        unselectCandidate,
        clearSelectedCandidates
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
