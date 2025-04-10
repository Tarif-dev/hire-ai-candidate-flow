
import Dexie from 'dexie';
import { JobDescription, Candidate, Match, Interview, MatchDetail } from '../types';
import { mockJobs, mockCandidates, mockMatches, mockInterviews } from '../data/mockData';

class SmartHireDatabase extends Dexie {
  jobs: Dexie.Table<JobDescription, string>;
  candidates: Dexie.Table<Candidate, string>;
  matches: Dexie.Table<Match, string>;
  interviews: Dexie.Table<Interview, string>;

  constructor() {
    super('SmartHireDB');
    
    this.version(1).stores({
      jobs: 'id, title, experience, location',
      candidates: 'id, name, email',
      matches: 'id, jobId, candidateId, score, shortlisted',
      interviews: 'id, candidateId, jobId, datetime, status'
    });
    
    this.jobs = this.table('jobs');
    this.candidates = this.table('candidates');
    this.matches = this.table('matches');
    this.interviews = this.table('interviews');
  }
  
  async initialize() {
    // Check if database is empty
    const jobCount = await this.jobs.count();
    
    if (jobCount === 0) {
      // Seed with mock data
      await this.transaction('rw', [this.jobs, this.candidates, this.matches, this.interviews], async () => {
        await this.jobs.bulkAdd(mockJobs);
        await this.candidates.bulkAdd(mockCandidates);
        await this.matches.bulkAdd(mockMatches);
        await this.interviews.bulkAdd(mockInterviews);
      });
    }
  }
  
  // Job operations
  async getAllJobs(): Promise<JobDescription[]> {
    return await this.jobs.toArray();
  }
  
  async getJobById(id: string): Promise<JobDescription | undefined> {
    return await this.jobs.get(id);
  }
  
  async addJob(job: JobDescription): Promise<string> {
    return await this.jobs.add(job);
  }
  
  async updateJob(job: JobDescription): Promise<number> {
    // Using put instead of update to avoid TypeScript issues with complex objects
    await this.jobs.put(job);
    return 1; // Return 1 to indicate success
  }
  
  // Candidate operations
  async getAllCandidates(): Promise<Candidate[]> {
    return await this.candidates.toArray();
  }
  
  async getCandidateById(id: string): Promise<Candidate | undefined> {
    return await this.candidates.get(id);
  }
  
  async addCandidate(candidate: Candidate): Promise<string> {
    return await this.candidates.add(candidate);
  }
  
  async addCandidates(candidates: Candidate[]): Promise<void> {
    await this.candidates.bulkAdd(candidates);
  }
  
  // Match operations
  async getAllMatches(): Promise<Match[]> {
    return await this.matches.toArray();
  }
  
  async getMatchesByJobId(jobId: string): Promise<Match[]> {
    return await this.matches.where('jobId').equals(jobId).toArray();
  }
  
  async addMatch(match: Match): Promise<string> {
    return await this.matches.add(match);
  }
  
  async updateMatchShortlist(matchId: string, shortlisted: boolean): Promise<number> {
    return await this.matches.update(matchId, { shortlisted });
  }
  
  // Interview operations
  async getAllInterviews(): Promise<Interview[]> {
    return await this.interviews.toArray();
  }
  
  async getInterviewsByCandidateId(candidateId: string): Promise<Interview[]> {
    return await this.interviews.where('candidateId').equals(candidateId).toArray();
  }
  
  async addInterview(interview: Interview): Promise<string> {
    return await this.interviews.add(interview);
  }
  
  async createMatches(jobId: string, candidateIds: string[]): Promise<Match[]> {
    const newMatches: Match[] = [];
    
    for (let i = 0; i < candidateIds.length; i++) {
      const candidateId = candidateIds[i];
      const score = Math.random() * 0.4 + 0.6; // Random score between 0.6 and 1.0
      
      const matchDetails: MatchDetail[] = [
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
      ];
      
      const match: Match = {
        id: `match-${Date.now()}-${i}`,
        jobId,
        candidateId,
        score,
        matchDetails,
        shortlisted: score > 0.8,
        notes: ""
      };
      
      newMatches.push(match);
    }
    
    await this.matches.bulkAdd(newMatches);
    return newMatches;
  }
}

export const db = new SmartHireDatabase();

// Initialize database and export a ready promise
export const dbReady = db.initialize();
