
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppContext } from "@/context/AppContext";
import { parseJobDescription, generateJobSummary } from "@/utils/jobUtils";
import { JobDescription } from "@/types";
import { 
  BriefcaseIcon, 
  FileTextIcon, 
  LoaderIcon, 
  UploadIcon, 
  BuildingIcon, 
  MapPinIcon,
  CheckCircle2Icon,
  ClipboardIcon
} from "lucide-react";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function JobUpload() {
  const { addJob, setCurrentJob } = useAppContext();
  const [jobText, setJobText] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [jobId, setJobId] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!jobText.trim()) return;
    
    setIsSubmitting(true);
    setSuccessMessage("");
    
    try {
      // Parse the job description
      const parsedJob = parseJobDescription(jobText);
      
      // Create a new job with parsed data and user input
      const newJobId = `job-${Date.now()}`;
      const newJob: JobDescription = {
        id: newJobId,
        title: title || parsedJob.title || "New Job",
        description: jobText,
        summary: generateJobSummary(jobText),
        skills: parsedJob.skills || [],
        experience: parsedJob.experience || "Not specified",
        location: location || parsedJob.location || "Remote",
        postedDate: new Date().toISOString().split('T')[0],
        metadata: {}
      };
      
      // Add the job to the context
      addJob(newJob);
      
      // Set as current job
      setCurrentJob(newJob);
      
      // Show success message
      setSuccessMessage(`Job "${newJob.title}" successfully processed!`);
      setJobId(newJobId);
      
      // Reset form after delay
      setTimeout(() => {
        setJobText("");
        setTitle("");
        setLocation("");
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error processing job description:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const pasteExampleJob = () => {
    const exampleJob = `Senior Frontend Developer

Company: TechVision Solutions
Location: Remote (US)

Job Description:
We are looking for a Senior Frontend Developer to join our growing team. The ideal candidate will have strong experience with React, TypeScript, and modern frontend architectures.

Requirements:
- 5+ years of experience in frontend development
- Proficiency in React, TypeScript, and state management libraries
- Experience with responsive design and CSS frameworks
- Knowledge of testing frameworks like Jest and React Testing Library
- Strong understanding of web performance optimization
- Excellent problem-solving and communication skills

Responsibilities:
- Develop and maintain responsive web applications
- Collaborate with designers and backend developers
- Write clean, maintainable, and efficient code
- Participate in code reviews and mentor junior developers
- Stay up-to-date with emerging trends and technologies

Benefits:
- Competitive salary and benefits package
- Remote-first work environment
- Professional development opportunities
- Flexible working hours`;

    setJobText(exampleJob);
    setTitle("Senior Frontend Developer");
    setLocation("Remote (US)");
  };

  return (
    <Card gradient={false} hoverEffect className="w-full overflow-hidden bg-white/80 backdrop-blur-sm border border-border/50 shadow-soft-md hover:shadow-soft-xl transition-all">
      <CardHeader className="space-y-2 pb-3 border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/80 to-primary/60 flex items-center justify-center shadow-md">
              <BriefcaseIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">Job Description</CardTitle>
              <CardDescription>
                Enter details or upload a job posting
              </CardDescription>
            </div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={pasteExampleJob}
                  className="gap-1.5 text-xs"
                >
                  <ClipboardIcon className="h-3.5 w-3.5" />
                  <span>Use Example</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Use a sample job description</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="space-y-5 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium flex items-center">
              <BuildingIcon className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
              Job Title
            </Label>
            <Input
              id="title"
              placeholder="e.g. Senior Frontend Developer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-input/80 focus-visible:ring-primary/30 transition-shadow"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium flex items-center">
              <MapPinIcon className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
              Location
            </Label>
            <Input
              id="location"
              placeholder="e.g. Remote, San Francisco, CA"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border-input/80 focus-visible:ring-primary/30 transition-shadow"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="jobDescription" className="text-sm font-medium flex items-center">
            <FileTextIcon className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
            Job Description
          </Label>
          <Textarea
            id="jobDescription"
            placeholder="Paste the complete job description here including requirements, responsibilities, and qualifications..."
            className="min-h-[280px] resize-none border-input/80 focus-visible:ring-primary/30 transition-shadow text-sm"
            value={jobText}
            onChange={(e) => setJobText(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between p-4 rounded-xl bg-muted/40 border border-border/50">
          <div className="flex items-center">
            <UploadIcon className="h-5 w-5 text-muted-foreground mr-2" />
            <span className="text-sm text-muted-foreground">
              Or upload a document:
            </span>
          </div>
          <label className="flex-shrink-0">
            <span className="sr-only">Choose file</span>
            <Input
              type="file"
              className="hidden"
              accept=".txt,.pdf,.docx"
            />
            <Button type="button" variant="outline" size="sm" className="gap-1.5 shadow-sm">
              <FileTextIcon className="h-4 w-4" />
              <span>Browse Files</span>
            </Button>
          </label>
        </div>
        
        {successMessage && (
          <div className="bg-success/10 border border-success/20 text-success rounded-lg p-4 flex items-center">
            <CheckCircle2Icon className="h-5 w-5 mr-2 flex-shrink-0" />
            <div className="flex-1">{successMessage}</div>
            {jobId && (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Badge variant="outline" className="ml-2 bg-success/5 cursor-help">Job ID: {jobId.substring(0, 8)}...</Badge>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Job Details</h4>
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ID:</span>
                        <span className="font-mono">{jobId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Title:</span>
                        <span>{title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span>{location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span>{new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t bg-muted/5 px-6 py-5 flex flex-col sm:flex-row gap-3 items-center">
        <Button 
          className="w-full sm:w-auto flex-1 gap-2 bg-gradient-to-br from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-soft-md" 
          onClick={handleSubmit}
          disabled={isSubmitting || !jobText.trim()}
          size="lg"
        >
          {isSubmitting ? (
            <>
              <LoaderIcon className="h-5 w-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <BriefcaseIcon className="h-5 w-5" />
              <span>Analyze Job Description</span>
            </>
          )}
        </Button>
        
        <Button 
          type="button" 
          variant="outline" 
          size="lg"
          className="w-full sm:w-auto"
          onClick={() => {
            setJobText("");
            setTitle("");
            setLocation("");
          }}
          disabled={isSubmitting || (!jobText && !title && !location)}
        >
          Reset Form
        </Button>
      </CardFooter>
    </Card>
  );
}
