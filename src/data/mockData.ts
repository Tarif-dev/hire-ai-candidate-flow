
import { JobDescription, Candidate, Match, Interview } from "../types";

// Mock job descriptions
export const mockJobs: JobDescription[] = [
  {
    id: "job-1",
    title: "Senior Frontend Developer",
    description: `We are looking for a Senior Frontend Developer with expertise in React and TypeScript. The ideal candidate should have 5+ years of experience in frontend development and be proficient in modern JavaScript frameworks.

Requirements:
- 5+ years of experience in frontend development
- Strong proficiency in React, TypeScript, and Redux
- Experience with responsive design and CSS frameworks like Tailwind
- Understanding of RESTful APIs and GraphQL
- Knowledge of testing frameworks like Jest and React Testing Library
- Experience with CI/CD pipelines
- Strong problem-solving skills and attention to detail

Responsibilities:
- Develop and maintain frontend applications using React and TypeScript
- Collaborate with backend developers to integrate frontend with APIs
- Optimize applications for maximum speed and scalability
- Implement responsive design and ensure cross-browser compatibility
- Write clean, efficient, and maintainable code
- Participate in code reviews and mentor junior developers`,
    summary: "Senior Frontend Developer role requiring 5+ years of experience with React, TypeScript, and modern frontend technologies.",
    skills: ["React", "TypeScript", "Redux", "Tailwind CSS", "REST API", "GraphQL", "Jest", "React Testing Library"],
    experience: "5+ years",
    location: "San Francisco, CA (Remote)",
    postedDate: "2023-04-01",
    metadata: {
      salaryRange: "$120,000 - $150,000",
      employmentType: "Full-time",
      department: "Engineering"
    }
  },
  {
    id: "job-2",
    title: "Data Scientist",
    description: `We are seeking a Data Scientist to join our growing team. The ideal candidate will have experience in machine learning, data analysis, and statistical modeling.

Requirements:
- Master's or PhD in Computer Science, Statistics, or related field
- 3+ years of experience in data science or machine learning
- Proficiency in Python and data science libraries (NumPy, Pandas, Scikit-learn)
- Experience with deep learning frameworks (TensorFlow, PyTorch)
- Strong understanding of statistical analysis and machine learning algorithms
- Excellent communication skills to present findings to non-technical stakeholders

Responsibilities:
- Develop and implement machine learning models to solve business problems
- Process, clean, and verify the integrity of data used for analysis
- Create data visualizations to communicate findings
- Collaborate with engineering teams to deploy models into production
- Stay up-to-date with the latest advancements in data science and machine learning`,
    summary: "Data Scientist position requiring 3+ years of experience in machine learning and statistical analysis.",
    skills: ["Python", "Machine Learning", "NumPy", "Pandas", "Scikit-learn", "TensorFlow", "PyTorch", "Statistics"],
    experience: "3+ years",
    location: "New York, NY (Hybrid)",
    postedDate: "2023-03-15",
    metadata: {
      salaryRange: "$130,000 - $160,000",
      employmentType: "Full-time",
      department: "Data Science"
    }
  }
];

// Mock candidates
export const mockCandidates: Candidate[] = [
  {
    id: "candidate-1",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "123-456-7890",
    resumeUrl: "/resumes/alex-johnson.pdf",
    skills: ["React", "TypeScript", "Redux", "Next.js", "Tailwind CSS", "Node.js", "GraphQL"],
    experience: [
      "Senior Frontend Developer at TechCorp (2019-2023)",
      "Frontend Developer at WebSolutions (2016-2019)",
      "Junior Developer at StartupXYZ (2014-2016)"
    ],
    education: [
      {
        institution: "University of California, Berkeley",
        degree: "Bachelor of Science",
        fieldOfStudy: "Computer Science",
        startDate: "2010",
        endDate: "2014"
      }
    ],
    parsedContent: "Experienced frontend developer with 9 years of experience in web development..."
  },
  {
    id: "candidate-2",
    name: "Samantha Smith",
    email: "samantha.smith@example.com",
    phone: "234-567-8901",
    resumeUrl: "/resumes/samantha-smith.pdf",
    skills: ["React", "JavaScript", "CSS", "HTML", "Sass", "Bootstrap", "Webpack"],
    experience: [
      "Frontend Developer at DigitalAgency (2018-2023)",
      "Web Designer at CreativeCo (2015-2018)"
    ],
    education: [
      {
        institution: "New York University",
        degree: "Bachelor of Arts",
        fieldOfStudy: "Interactive Media",
        startDate: "2011",
        endDate: "2015"
      }
    ],
    parsedContent: "Creative frontend developer with 8 years of experience in web design and development..."
  },
  {
    id: "candidate-3",
    name: "David Miller",
    email: "david.miller@example.com",
    phone: "345-678-9012",
    resumeUrl: "/resumes/david-miller.pdf",
    skills: ["Python", "Machine Learning", "TensorFlow", "Scikit-learn", "Pandas", "NumPy", "SQL", "Data Visualization"],
    experience: [
      "Data Scientist at AnalyticsPro (2020-2023)",
      "Data Analyst at BigDataCorp (2017-2020)",
      "Research Assistant at University Lab (2015-2017)"
    ],
    education: [
      {
        institution: "Stanford University",
        degree: "Master of Science",
        fieldOfStudy: "Computer Science (AI Specialization)",
        startDate: "2013",
        endDate: "2015"
      },
      {
        institution: "University of Washington",
        degree: "Bachelor of Science",
        fieldOfStudy: "Statistics",
        startDate: "2009",
        endDate: "2013"
      }
    ],
    parsedContent: "Experienced data scientist with strong background in machine learning and statistical analysis..."
  },
  {
    id: "candidate-4",
    name: "Emily Chen",
    email: "emily.chen@example.com",
    phone: "456-789-0123",
    resumeUrl: "/resumes/emily-chen.pdf",
    skills: ["Python", "R", "Data Analysis", "Machine Learning", "Tableau", "SQL", "Excel", "Statistics"],
    experience: [
      "Data Analyst at InsightData (2021-2023)",
      "Business Intelligence Analyst at CorpTech (2018-2021)"
    ],
    education: [
      {
        institution: "MIT",
        degree: "Master of Science",
        fieldOfStudy: "Data Science",
        startDate: "2016",
        endDate: "2018"
      },
      {
        institution: "Boston University",
        degree: "Bachelor of Science",
        fieldOfStudy: "Mathematics",
        startDate: "2012",
        endDate: "2016"
      }
    ],
    parsedContent: "Data analyst with 5 years of experience in business intelligence and data science..."
  }
];

// Mock matches
export const mockMatches: Match[] = [
  {
    id: "match-1",
    jobId: "job-1",
    candidateId: "candidate-1",
    score: 0.92,
    matchDetails: [
      { category: "skills", score: 0.95, details: "7/8 required skills matched" },
      { category: "experience", score: 0.90, details: "9 years experience vs. 5+ required" },
      { category: "education", score: 0.85, details: "Relevant degree in Computer Science" }
    ],
    shortlisted: true,
    notes: "Excellent candidate with strong React and TypeScript experience."
  },
  {
    id: "match-2",
    jobId: "job-1",
    candidateId: "candidate-2",
    score: 0.75,
    matchDetails: [
      { category: "skills", score: 0.70, details: "5/8 required skills matched" },
      { category: "experience", score: 0.80, details: "8 years experience vs. 5+ required" },
      { category: "education", score: 0.65, details: "Related degree in Interactive Media" }
    ],
    shortlisted: false,
    notes: "Good candidate but missing some key technical skills."
  },
  {
    id: "match-3",
    jobId: "job-2",
    candidateId: "candidate-3",
    score: 0.88,
    matchDetails: [
      { category: "skills", score: 0.95, details: "7/8 required skills matched" },
      { category: "experience", score: 0.85, details: "6 years experience vs. 3+ required" },
      { category: "education", score: 0.95, details: "Advanced degree in relevant field" }
    ],
    shortlisted: true,
    notes: "Strong data science background with relevant experience."
  },
  {
    id: "match-4",
    jobId: "job-2",
    candidateId: "candidate-4",
    score: 0.78,
    matchDetails: [
      { category: "skills", score: 0.80, details: "6/8 required skills matched" },
      { category: "experience", score: 0.75, details: "5 years experience vs. 3+ required" },
      { category: "education", score: 0.90, details: "Master's degree in Data Science" }
    ],
    shortlisted: true,
    notes: "Good analytical skills with relevant education."
  }
];

// Mock interviews
export const mockInterviews: Interview[] = [
  {
    id: "interview-1",
    candidateId: "candidate-1",
    jobId: "job-1",
    datetime: "2023-04-15T10:00:00Z",
    status: "scheduled",
    notes: "Technical interview with the engineering team."
  },
  {
    id: "interview-2",
    candidateId: "candidate-3",
    jobId: "job-2",
    datetime: "2023-04-16T14:00:00Z",
    status: "scheduled",
    notes: "Initial interview with the data science manager."
  },
  {
    id: "interview-3",
    candidateId: "candidate-4",
    jobId: "job-2",
    datetime: "2023-04-17T11:00:00Z",
    status: "scheduled",
    notes: "Technical assessment followed by team interview."
  }
];
