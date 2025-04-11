
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppContext } from "@/context/AppContext";
import { parseJobDescription, generateJobSummary } from "@/utils/jobUtils";
import { JobDescription } from "@/types";
import { BriefcaseIcon, FileTextIcon, LoaderIcon, UploadIcon } from "lucide-react";

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
    <Card hoverEffect className="w-full overflow-hidden">
      <CardHeader className="space-y-1 pb-2">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
          <BriefcaseIcon className="h-5 w-5 text-primary" />
        </div>
        <CardTitle className="text-xl">Upload Job Description</CardTitle>
        <CardDescription>
          Enter the job description text or upload a file
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium">Job Title</Label>
          <Input
            id="title"
            placeholder="e.g. Senior Frontend Developer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-input/80 focus-visible:ring-primary/30"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm font-medium">Location</Label>
          <Input
            id="location"
            placeholder="e.g. Remote, San Francisco, CA"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border-input/80 focus-visible:ring-primary/30"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="jobDescription" className="text-sm font-medium">Job Description</Label>
          <Textarea
            id="jobDescription"
            placeholder="Paste the complete job description here..."
            className="min-h-[200px] resize-none border-input/80 focus-visible:ring-primary/30"
            value={jobText}
            onChange={(e) => setJobText(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between p-4 rounded-lg bg-muted/50 border border-border/70">
          <div className="flex items-center">
            <FileTextIcon className="h-5 w-5 text-muted-foreground mr-2" />
            <span className="text-sm text-muted-foreground">
              Or upload a file:
            </span>
          </div>
          <label className="flex-shrink-0">
            <span className="sr-only">Choose file</span>
            <Input
              type="file"
              className="hidden"
              accept=".txt,.pdf,.docx"
            />
            <Button type="button" variant="outline" size="sm" className="gap-1">
              <UploadIcon className="h-4 w-4" />
              <span>Browse Files</span>
            </Button>
          </label>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/10 px-6 py-4">
        <Button 
          className="w-full gap-2" 
          onClick={handleSubmit}
          disabled={isSubmitting || !jobText.trim()}
        >
          {isSubmitting ? (
            <>
              <LoaderIcon className="h-4 w-4 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <BriefcaseIcon className="h-4 w-4" />
              <span>Analyze Job Description</span>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
