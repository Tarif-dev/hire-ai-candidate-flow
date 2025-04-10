
import { JobDescription } from "../types";

export function parseJobDescription(text: string): Partial<JobDescription> {
  // In a real application, this would use an LLM to parse the job description
  // Here we'll just do some basic parsing
  
  // Extract a potential title from the first line
  const lines = text.split('\n');
  let title = lines[0].trim();
  if (title.length > 50) {
    // If first line is too long, it's probably not a title
    title = "New Job Position";
  }
  
  // Try to extract skills using common keywords
  const skillKeywords = [
    "skills required", "requirements", "qualifications", 
    "proficient in", "experience with", "expertise in"
  ];
  
  const skillsSection = findSection(text.toLowerCase(), skillKeywords);
  const skills = extractBulletPoints(skillsSection);
  
  // Try to extract experience
  let experience = "Not specified";
  const expMatch = text.match(/(\d+\+?\s*years?)/i);
  if (expMatch) {
    experience = expMatch[0];
  }
  
  return {
    title,
    description: text,
    skills: skills.length > 0 ? skills : [],
    experience,
    location: "Remote",
    postedDate: new Date().toISOString().split('T')[0]
  };
}

function findSection(text: string, keywords: string[]): string {
  for (const keyword of keywords) {
    const index = text.indexOf(keyword);
    if (index !== -1) {
      // Extract text from the keyword to the next section (or end)
      const startIndex = index + keyword.length;
      const nextSectionIndex = findNextSectionIndex(text, startIndex);
      return text.substring(startIndex, nextSectionIndex !== -1 ? nextSectionIndex : undefined);
    }
  }
  return "";
}

function findNextSectionIndex(text: string, startIndex: number): number {
  const sectionKeywords = [
    "responsibilities", "about us", "benefits", "about the company", 
    "what we offer", "who you are", "your role"
  ];
  
  let earliestIndex = -1;
  for (const keyword of sectionKeywords) {
    const index = text.indexOf(keyword, startIndex);
    if (index !== -1 && (earliestIndex === -1 || index < earliestIndex)) {
      earliestIndex = index;
    }
  }
  
  return earliestIndex;
}

function extractBulletPoints(text: string): string[] {
  if (!text) return [];
  
  const lines = text.split('\n');
  return lines
    .filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'))
    .map(line => line.trim().replace(/^[-•]\s*/, ''))
    .filter(line => line.length > 0);
}

export function generateJobSummary(jobDescription: string): string {
  // In a real app, this would use an LLM to generate a summary
  if (jobDescription.length <= 150) return jobDescription;
  return jobDescription.substring(0, 147) + "...";
}

export function scoreJobMatch(job: JobDescription, candidateSkills: string[]): number {
  // Simple matching algorithm based on skills
  if (!job.skills.length) return 0;
  
  const matchedSkills = job.skills.filter(skill => 
    candidateSkills.some(candidateSkill => 
      candidateSkill.toLowerCase().includes(skill.toLowerCase()) || 
      skill.toLowerCase().includes(candidateSkill.toLowerCase())
    )
  );
  
  return matchedSkills.length / job.skills.length;
}
