
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { JobDescription, Candidate, Match, Interview } from "../types";
import { db, dbReady } from "../services/database";

interface AppContextType {
  // Data
  jobs: JobDescription[];
  candidates: Candidate[];
  matches: Match[];
  interviews: Interview[];
  
  // Current selections
  currentJob: JobDescription | null;
  selectedCandidates: Candidate[];
  
  // State
  isLoading: boolean;
  
  // Actions
  addJob: (job: JobDescription) => Promise<void>;
  updateJob: (job: JobDescription) => Promise<void>;
  addCandidates: (candidates: Candidate[]) => Promise<void>;
  createMatches: (jobId: string, candidateIds: string[]) => Promise<void>;
  shortlistCandidate: (matchId: string, shortlisted: boolean) => Promise<void>;
  scheduleInterview: (candidateId: string, jobId: string, datetime: string) => Promise<void>;
  setCurrentJob: (job: JobDescription | null) => void;
  selectCandidate: (candidate: Candidate) => void;
  unselectCandidate: (candidateId: string) => void;
  clearSelectedCandidates: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // State
  const [jobs, setJobs] = useState<JobDescription[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [currentJob, setCurrentJob] = useState<JobDescription | null>(null);
  const [selectedCandidates, setSelectedCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load data from database on initial render
  useEffect(() => {
    const loadData = async () => {
      try {
        // Wait for database initialization
        await dbReady;
        
        // Fetch all data
        const [jobsData, candidatesData, matchesData, interviewsData] = await Promise.all([
          db.getAllJobs(),
          db.getAllCandidates(),
          db.getAllMatches(),
          db.getAllInterviews()
        ]);
        
        setJobs(jobsData);
        setCandidates(candidatesData);
        setMatches(matchesData);
        setInterviews(interviewsData);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Actions
  const addJob = async (job: JobDescription) => {
    try {
      await db.addJob(job);
      const updatedJobs = await db.getAllJobs();
      setJobs(updatedJobs);
    } catch (error) {
      console.error("Failed to add job:", error);
    }
  };

  const updateJob = async (job: JobDescription) => {
    try {
      await db.updateJob(job);
      const updatedJobs = await db.getAllJobs();
      setJobs(updatedJobs);
    } catch (error) {
      console.error("Failed to update job:", error);
    }
  };

  const addCandidates = async (newCandidates: Candidate[]) => {
    try {
      await db.addCandidates(newCandidates);
      const updatedCandidates = await db.getAllCandidates();
      setCandidates(updatedCandidates);
    } catch (error) {
      console.error("Failed to add candidates:", error);
    }
  };

  const createMatches = async (jobId: string, candidateIds: string[]) => {
    try {
      const newMatches = await db.createMatches(jobId, candidateIds);
      setMatches(prevMatches => [...prevMatches, ...newMatches]);
    } catch (error) {
      console.error("Failed to create matches:", error);
    }
  };

  const shortlistCandidate = async (matchId: string, shortlisted: boolean) => {
    try {
      await db.updateMatchShortlist(matchId, shortlisted);
      const updatedMatches = await db.getAllMatches();
      setMatches(updatedMatches);
    } catch (error) {
      console.error("Failed to update shortlist:", error);
    }
  };

  const scheduleInterview = async (candidateId: string, jobId: string, datetime: string) => {
    try {
      const newInterview: Interview = {
        id: `interview-${Date.now()}`,
        candidateId,
        jobId,
        datetime,
        status: "scheduled"
      };
      
      await db.addInterview(newInterview);
      const updatedInterviews = await db.getAllInterviews();
      setInterviews(updatedInterviews);
    } catch (error) {
      console.error("Failed to schedule interview:", error);
    }
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
        isLoading,
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
