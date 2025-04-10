
import { Candidate, Education } from "../types";

export function parseResume(text: string): Partial<Candidate> {
  // In a real application, this would use an LLM or specialized parser
  // Here we'll simulate parsing with simple regex and string operations
  
  // Try to extract name (assume it's at the beginning)
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  const name = lines[0];
  
  // Try to extract email
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const emailMatch = text.match(emailRegex);
  const email = emailMatch ? emailMatch[0] : "";
  
  // Try to extract phone
  const phoneRegex = /\b(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b/;
  const phoneMatch = text.match(phoneRegex);
  const phone = phoneMatch ? phoneMatch[0] : "";
  
  // Extract skills section
  const skillsSection = extractSection(text, ["skills", "technical skills", "technologies"]);
  const skills = extractSkillsList(skillsSection);
  
  // Extract experience section
  const experienceSection = extractSection(text, ["experience", "work experience", "professional experience"]);
  const experience = extractExperienceList(experienceSection);
  
  // Extract education section
  const educationSection = extractSection(text, ["education", "academic background"]);
  const education = extractEducation(educationSection);
  
  return {
    name,
    email,
    phone,
    skills,
    experience,
    education,
    parsedContent: text
  };
}

function extractSection(text: string, sectionNames: string[]): string {
  const lowerText = text.toLowerCase();
  
  for (const sectionName of sectionNames) {
    // Find the section start
    const sectionStart = lowerText.indexOf(sectionName);
    if (sectionStart === -1) continue;
    
    // Find the next section start (if any)
    const possibleNextSections = [
      "experience", "education", "skills", "projects", 
      "certifications", "languages", "interests", "references"
    ].filter(s => !sectionNames.includes(s));
    
    let sectionEnd = text.length;
    for (const nextSection of possibleNextSections) {
      const nextSectionStart = lowerText.indexOf(nextSection, sectionStart + sectionName.length);
      if (nextSectionStart !== -1 && nextSectionStart < sectionEnd) {
        sectionEnd = nextSectionStart;
      }
    }
    
    return text.substring(sectionStart, sectionEnd).trim();
  }
  
  return "";
}

function extractSkillsList(skillsSection: string): string[] {
  if (!skillsSection) return [];
  
  // Check for comma-separated or bullet point lists
  if (skillsSection.includes(',')) {
    return skillsSection
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0 && !["skills", "skill"].includes(skill.toLowerCase()));
  }
  
  // Look for bullet points
  const lines = skillsSection.split('\n');
  return lines
    .filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'))
    .map(line => line.trim().replace(/^[-•]\s*/, ''))
    .filter(line => line.length > 0);
}

function extractExperienceList(experienceSection: string): string[] {
  if (!experienceSection) return [];
  
  // Split by possible date patterns
  const lines = experienceSection.split('\n');
  const experiences: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.length === 0) continue;
    
    // Check if the line contains a company name and date pattern
    const datePattern = /\b(20\d{2}|19\d{2})[-–—](?:present|current|(20\d{2}|19\d{2}))\b/i;
    if (datePattern.test(line)) {
      experiences.push(line);
    }
  }
  
  return experiences;
}

function extractEducation(educationSection: string): Education[] {
  if (!educationSection) return [];
  
  const education: Education[] = [];
  const lines = educationSection.split('\n').filter(line => line.trim().length > 0);
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check for university/college name
    const potentialInstitution = line;
    
    // Look for degree on this line or next
    const degreeLine = line + (i + 1 < lines.length ? ' ' + lines[i + 1] : '');
    const degreeTypes = ['Bachelor', 'Master', 'PhD', 'Doctorate', 'B.S.', 'M.S.', 'B.A.', 'M.A.'];
    
    let degree = 'Degree';
    for (const degreeType of degreeTypes) {
      if (degreeLine.includes(degreeType)) {
        degree = degreeLine.substring(degreeLine.indexOf(degreeType));
        break;
      }
    }
    
    // Extract dates
    const datePattern = /\b(20\d{2}|19\d{2})[-–—](?:present|current|(20\d{2}|19\d{2}))\b/i;
    const dateMatch = educationSection.match(datePattern);
    let startDate = '';
    let endDate = '';
    
    if (dateMatch) {
      const dates = dateMatch[0].split(/[-–—]/);
      startDate = dates[0].trim();
      endDate = dates[1].trim();
    }
    
    // If we found something that looks like education, add it
    if (potentialInstitution && potentialInstitution !== 'Education') {
      education.push({
        institution: potentialInstitution,
        degree,
        fieldOfStudy: 'Not specified',
        startDate,
        endDate
      });
      
      // Skip the next line if we used it for degree
      if (degree !== 'Degree' && !line.includes(degree)) {
        i++;
      }
    }
  }
  
  return education;
}

export function calculateMatchScore(
  candidateSkills: string[], 
  jobSkills: string[],
  candidateExperience: string[],
  requiredExperience: string
): number {
  // Calculate skill match percentage
  const skillMatchScore = calculateSkillMatchScore(candidateSkills, jobSkills);
  
  // Calculate experience match score
  const experienceMatchScore = calculateExperienceMatchScore(
    candidateExperience, 
    requiredExperience
  );
  
  // Weighted average (skills are more important)
  return skillMatchScore * 0.7 + experienceMatchScore * 0.3;
}

function calculateSkillMatchScore(candidateSkills: string[], jobSkills: string[]): number {
  if (!jobSkills.length) return 0;
  
  const normalizedCandidateSkills = candidateSkills.map(s => s.toLowerCase());
  
  const matchedSkills = jobSkills.filter(skill => 
    normalizedCandidateSkills.some(candidateSkill => 
      candidateSkill.includes(skill.toLowerCase()) || 
      skill.toLowerCase().includes(candidateSkill)
    )
  );
  
  return matchedSkills.length / jobSkills.length;
}

function calculateExperienceMatchScore(
  candidateExperience: string[], 
  requiredExperience: string
): number {
  // Parse required years from job description
  const requiredYearsMatch = requiredExperience.match(/(\d+)\+?\s*years?/i);
  if (!requiredYearsMatch) return 0.5; // Default score if we can't parse
  
  const requiredYears = parseInt(requiredYearsMatch[1], 10);
  
  // Estimate candidate years from experience entries
  let estimatedYears = 0;
  
  for (const exp of candidateExperience) {
    const yearsMatch = exp.match(/\b(20\d{2}|19\d{2})[-–—](?:present|current|(20\d{2}|19\d{2}))\b/i);
    if (yearsMatch) {
      const startYear = parseInt(yearsMatch[1], 10);
      const endYearStr = yearsMatch[2] || new Date().getFullYear().toString();
      const endYear = endYearStr.toLowerCase() === 'present' ? 
        new Date().getFullYear() : 
        parseInt(endYearStr, 10);
      
      estimatedYears += endYear - startYear;
    }
  }
  
  // If we couldn't parse any years, give a middle score
  if (estimatedYears === 0) return 0.5;
  
  // Score based on whether candidate meets the required years
  if (estimatedYears >= requiredYears) {
    // Exceeds by a lot? Perfect score
    if (estimatedYears >= requiredYears * 1.5) return 1.0;
    // Exceeds by some? High score
    return 0.8 + (estimatedYears - requiredYears) * 0.04;
  } else {
    // Close to required? Partial score
    return Math.max(0.4, estimatedYears / requiredYears * 0.8);
  }
}
