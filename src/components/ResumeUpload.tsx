
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
import { 
  FileIcon, 
  FileTextIcon, 
  LoaderIcon, 
  UploadCloudIcon, 
  UserIcon, 
  X, 
  CheckCircle2Icon 
} from "lucide-react";

export function ResumeUpload() {
  const { addCandidates, createMatches, currentJob } = useAppContext();
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Convert FileList to array and append to existing files
      const newFiles = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
      setUploadError("");
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
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

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    return extension === 'pdf' ? 
      <FileIcon className="h-4 w-4 text-red-500" /> : 
      extension === 'docx' ? 
        <FileTextIcon className="h-4 w-4 text-blue-500" /> : 
        <FileTextIcon className="h-4 w-4 text-gray-500" />;
  };

  return (
    <Card hoverEffect className="w-full overflow-hidden">
      <CardHeader className="space-y-1 pb-2">
        <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center mb-2">
          <UserIcon className="h-5 w-5 text-secondary" />
        </div>
        <CardTitle className="text-xl">Upload Resumes</CardTitle>
        <CardDescription>
          Upload candidate resumes for matching with the job description
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 pt-4">
        <div 
          className={`border-2 border-dashed rounded-lg ${dragActive ? 'border-primary bg-primary/5' : 'border-border/70'} 
            transition-colors duration-200 p-8 text-center cursor-pointer relative`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            id="resumeUpload"
            type="file"
            multiple
            accept=".pdf,.docx,.txt"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="h-12 w-12 rounded-full bg-muted/80 flex items-center justify-center">
              <UploadCloudIcon className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="font-medium">
                Drop your resume files here or click to browse
              </p>
              <p className="text-sm text-muted-foreground">
                Supported formats: PDF, DOCX, TXT
              </p>
            </div>
          </div>
        </div>
        
        {files.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Selected Files ({files.length})</Label>
              {files.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFiles([])}
                  className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </Button>
              )}
            </div>
            <div className="border rounded-lg overflow-hidden">
              <div className="divide-y max-h-[200px] overflow-y-auto">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-muted/30">
                    <div className="flex items-center space-x-3 truncate">
                      {getFileIcon(file.name)}
                      <div className="truncate">
                        <p className="font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024).toFixed(0)} KB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="h-8 w-8 p-0 rounded-full hover:bg-muted"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {uploadError && (
          <Alert variant="destructive" className="border-red-200 text-red-700 bg-red-50">
            <AlertDescription className="flex items-center gap-2">
              {uploadError}
            </AlertDescription>
          </Alert>
        )}
        
        {!currentJob && files.length > 0 && (
          <Alert className="border-amber-200 text-amber-700 bg-amber-50">
            <AlertDescription className="flex items-center gap-2">
              Please upload a job description first
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="border-t bg-muted/10 px-6 py-4">
        <Button 
          className="w-full gap-2" 
          onClick={handleUpload}
          disabled={isUploading || files.length === 0 || !currentJob}
        >
          {isUploading ? (
            <>
              <LoaderIcon className="h-4 w-4 animate-spin" />
              <span>Processing resumes...</span>
            </>
          ) : files.length > 0 ? (
            <>
              <CheckCircle2Icon className="h-4 w-4" />
              <span>Analyze {files.length} {files.length === 1 ? 'Resume' : 'Resumes'}</span>
            </>
          ) : (
            <>
              <UploadCloudIcon className="h-4 w-4" />
              <span>Select Resumes to Upload</span>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
