
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppContext } from "@/context/AppContext";
import { parseResume } from "@/utils/candidateUtils";
import { Candidate } from "@/types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export function ResumeUpload() {
  const { addCandidates, createMatches, currentJob } = useAppContext();
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Convert FileList to array and append to existing files
      const newFiles = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
      setUploadError("");
    }
  };

  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setUploadError("Please select at least one resume to upload");
      return;
    }

    if (!currentJob) {
      setUploadError("Please upload a job description first");
      return;
    }

    setIsUploading(true);
    setUploadError("");

    try {
      // In a real app, this would call an API to process the files
      // For this demo, we'll simulate file reading and parsing

      // Simulate reading files and parsing resumes
      const newCandidates: Candidate[] = files.map((file, index) => {
        // In a real app, we would read the file content
        // Here we'll create mock data based on the filename
        const mockResumeText = `${file.name.split('.')[0]}
email@example.com
123-456-7890

Skills:
- JavaScript
- React
- TypeScript
- ${currentJob.skills[index % currentJob.skills.length]}
- HTML
- CSS

Experience:
Frontend Developer at TechCorp (2020-2023)
Web Developer at DigitalSolutions (2018-2020)

Education:
University of Technology - Bachelor of Computer Science (2014-2018)`;

        const parsedResume = parseResume(mockResumeText);
        
        return {
          id: `candidate-${Date.now()}-${index}`,
          name: parsedResume.name || file.name.split('.')[0],
          email: parsedResume.email || "candidate@example.com",
          phone: parsedResume.phone,
          resumeUrl: URL.createObjectURL(file),
          skills: parsedResume.skills || ["JavaScript", "React", "HTML", "CSS"],
          experience: parsedResume.experience || ["Frontend Developer (2020-2023)"],
          education: parsedResume.education || [{
            institution: "University",
            degree: "Bachelor's Degree",
            fieldOfStudy: "Computer Science",
            startDate: "2014",
            endDate: "2018"
          }],
          parsedContent: mockResumeText
        };
      });

      // Add candidates to context
      addCandidates(newCandidates);

      // Create matches
      if (currentJob) {
        createMatches(currentJob.id, newCandidates.map(c => c.id));
      }

      // Clear form
      setFiles([]);
    } catch (error) {
      console.error("Error processing resumes:", error);
      setUploadError("An error occurred while processing the resumes");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Resumes</CardTitle>
        <CardDescription>
          Upload candidate resumes for matching with the job description
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="resumeUpload">Select Resume Files</Label>
          <Input
            id="resumeUpload"
            type="file"
            multiple
            accept=".pdf,.docx,.txt"
            onChange={handleFileChange}
          />
          <p className="text-sm text-muted-foreground">
            Supported formats: PDF, DOCX, TXT
          </p>
        </div>
        
        {files.length > 0 && (
          <div className="space-y-2">
            <Label>Selected Files</Label>
            <div className="border rounded-md p-3 space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between">
                  <Badge variant="outline" className="flex items-center space-x-2">
                    <span>{file.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ({(file.size / 1024).toFixed(0)} KB)
                    </span>
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {uploadError && (
          <Alert variant="destructive">
            <AlertDescription>{uploadError}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleUpload}
          disabled={isUploading || files.length === 0 || !currentJob}
        >
          {isUploading ? "Processing..." : `Analyze ${files.length} Resumes`}
        </Button>
      </CardFooter>
    </Card>
  );
}
