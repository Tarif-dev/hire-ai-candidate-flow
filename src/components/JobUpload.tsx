
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppContext } from "@/context/AppContext";
import { parseJobDescription, generateJobSummary } from "@/utils/jobUtils";
import { JobDescription } from "@/types";

export function JobUpload() {
  const { addJob, setCurrentJob } = useAppContext();
  const [jobText, setJobText] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!jobText.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // Parse the job description
      const parsedJob = parseJobDescription(jobText);
      
      // Create a new job with parsed data and user input
      const newJob: JobDescription = {
        id: `job-${Date.now()}`,
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
      
      // Reset form
      setJobText("");
      setTitle("");
      setLocation("");
    } catch (error) {
      console.error("Error processing job description:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Job Description</CardTitle>
        <CardDescription>
          Enter the job description text or upload a file
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Job Title</Label>
          <Input
            id="title"
            placeholder="e.g. Senior Frontend Developer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="e.g. Remote, San Francisco, CA"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="jobDescription">Job Description</Label>
          <Textarea
            id="jobDescription"
            placeholder="Paste the complete job description here..."
            className="min-h-[200px]"
            value={jobText}
            onChange={(e) => setJobText(e.target.value)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Or upload a file:
          </span>
          <Input
            type="file"
            className="w-auto"
            accept=".txt,.pdf,.docx"
            onChange={() => {
              // In a real app, this would handle file upload and processing
              // For now it's just a placeholder
            }}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleSubmit}
          disabled={isSubmitting || !jobText.trim()}
        >
          {isSubmitting ? "Processing..." : "Analyze Job Description"}
        </Button>
      </CardFooter>
    </Card>
  );
}
