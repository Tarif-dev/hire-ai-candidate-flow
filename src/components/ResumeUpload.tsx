
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppContext } from "@/context/AppContext";
import { parseResume } from "@/utils/candidateUtils";
import { Candidate } from "@/types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileIcon, 
  FileTextIcon, 
  LoaderIcon, 
  UploadCloudIcon, 
  UserIcon, 
  X, 
  CheckCircle2Icon,
  FileType2Icon,
  FileX2Icon,
  AlertCircleIcon,
  TrashIcon,
  FileDigitIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ResumeUpload() {
  const { addCandidates, createMatches, currentJob } = useAppContext();
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      // Check if all files are valid
      const validFiles = newFiles.filter(file => {
        const fileType = file.name.split('.').pop()?.toLowerCase();
        return fileType === 'pdf' || fileType === 'docx' || fileType === 'txt';
      });
      
      if (validFiles.length !== newFiles.length) {
        setUploadError("Some files were skipped. Only PDF, DOCX, and TXT files are supported.");
      }
      
      setFiles(prevFiles => [...prevFiles, ...validFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const clearFiles = () => {
    setFiles([]);
    setProcessingComplete(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const simulateUploadProgress = () => {
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
    
    return interval;
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
    setUploadProgress(0);
    setProcessingComplete(false);
    
    // Simulate upload progress
    const progressInterval = simulateUploadProgress();

    try {
      // In a real app, this would call an API to process the files
      // For this demo, we'll simulate file reading and parsing

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate reading files and parsing resumes
      const newCandidates: Candidate[] = files.map((file, index) => {
        // In a real app, we would read the file content
        // Here we'll create mock data based on the filename
        const candidateName = file.name.split('.')[0]
          .replace(/_/g, ' ')
          .replace(/-/g, ' ')
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
            
        const mockResumeText = `${candidateName}
email${index + 1}@example.com
123-456-${7890 + index}

Skills:
- JavaScript
- React
- TypeScript
- ${currentJob.skills[index % Math.max(1, currentJob.skills.length)]}
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
          name: parsedResume.name || candidateName,
          email: parsedResume.email || `${candidateName.toLowerCase().replace(/\s/g, '.')}@example.com`,
          phone: parsedResume.phone || `123-456-${7890 + index}`,
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

      clearInterval(progressInterval);
      setUploadProgress(100);
      setProcessingComplete(true);
      
      // We won't clear the files immediately to show success state
      // The user can manually clear files
    } catch (error) {
      console.error("Error processing resumes:", error);
      setUploadError("An error occurred while processing the resumes");
      clearInterval(progressInterval);
    } finally {
      setIsUploading(false);
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return <FileDigitIcon className="h-4 w-4 text-red-500" />;
      case 'docx':
        return <FileTextIcon className="h-4 w-4 text-blue-500" />;
      case 'txt':
        return <FileType2Icon className="h-4 w-4 text-gray-500" />;
      default:
        return <FileIcon className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <Card gradient={false} hoverEffect className="w-full overflow-hidden bg-white/80 backdrop-blur-sm border border-border/50 shadow-soft-md hover:shadow-soft-xl transition-all">
      <CardHeader className="space-y-2 pb-3 border-b">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-secondary/80 to-secondary/60 flex items-center justify-center shadow-md">
            <UserIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl">Resume Upload</CardTitle>
            <CardDescription>
              Upload candidate resumes for AI matching
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5 pt-6">
        <div 
          className={`border-2 border-dashed rounded-xl ${
            dragActive 
              ? 'border-primary bg-primary/5 scale-[0.99]' 
              : processingComplete 
                ? 'border-success/30 bg-success/5' 
                : 'border-border/70'} 
            transition-all duration-200 p-8 text-center cursor-pointer relative overflow-hidden`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <input
            ref={fileInputRef}
            id="resumeUpload"
            type="file"
            multiple
            accept=".pdf,.docx,.txt"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />
          
          {/* Success overlay */}
          {processingComplete && (
            <div className="absolute inset-0 bg-success/5 flex items-center justify-center z-10">
              <div className="flex flex-col items-center space-y-2">
                <div className="h-16 w-16 rounded-full bg-success/20 flex items-center justify-center">
                  <CheckCircle2Icon className="h-8 w-8 text-success" />
                </div>
                <p className="font-medium text-success text-lg">
                  {files.length} {files.length === 1 ? 'resume' : 'resumes'} processed successfully!
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearFiles();
                  }}
                  className="mt-2"
                >
                  Clear and Upload More
                </Button>
              </div>
            </div>
          )}
          
          {isUploading ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="h-12 w-12 rounded-full border-4 border-secondary/30 border-t-secondary animate-spin"></div>
              <div className="space-y-2 max-w-md">
                <p className="font-medium">
                  Processing {files.length} {files.length === 1 ? 'resume' : 'resumes'}...
                </p>
                <p className="text-sm text-muted-foreground">
                  Extracting skills, experience, and education details
                </p>
                <Progress value={uploadProgress} className="h-2 w-64 mx-auto" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3">
              <motion.div 
                className="h-16 w-16 rounded-full bg-muted/80 flex items-center justify-center"
                animate={{ 
                  y: dragActive ? -10 : 0,
                  scale: dragActive ? 1.1 : 1
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <UploadCloudIcon className="h-8 w-8 text-muted-foreground" />
              </motion.div>
              <div className="space-y-1 max-w-md">
                <p className="font-medium text-lg">
                  {dragActive 
                    ? "Drop your files here" 
                    : "Drag & drop resume files here or click to browse"
                  }
                </p>
                <p className="text-sm text-muted-foreground">
                  Upload PDF, DOCX, or TXT files containing candidate resumes
                </p>
              </div>
            </div>
          )}
        </div>
        
        <AnimatePresence>
          {files.length > 0 && !processingComplete && (
            <motion.div 
              className="space-y-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="bg-muted/30 text-sm font-medium py-1 px-3">
                  {files.length} {files.length === 1 ? 'File' : 'Files'} Selected
                </Badge>
                {files.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFiles}
                    className="h-8 px-2 text-xs text-muted-foreground hover:text-destructive"
                  >
                    <TrashIcon className="h-3.5 w-3.5 mr-1" />
                    Clear all
                  </Button>
                )}
              </div>
              <div className="border rounded-lg overflow-hidden">
                <div className="divide-y max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-track-transparent">
                  {files.map((file, index) => (
                    <motion.div
                      key={`${file.name}-${index}`}
                      className="flex items-center justify-between p-3 hover:bg-muted/30"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ delay: index * 0.05 }}
                    >
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
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(index);
                        }}
                        className="h-8 w-8 p-0 rounded-full hover:bg-muted"
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {uploadError && (
          <Alert variant="destructive" className="border-red-200 text-red-700 bg-red-50 animate-fade-in">
            <AlertCircleIcon className="h-4 w-4 mr-2" />
            <AlertDescription className="flex items-center gap-2">
              {uploadError}
            </AlertDescription>
          </Alert>
        )}
        
        {!currentJob && files.length > 0 && !processingComplete && (
          <Alert className="border-amber-200 text-amber-700 bg-amber-50 animate-fade-in">
            <AlertCircleIcon className="h-4 w-4 mr-2" />
            <AlertDescription className="flex items-center gap-2">
              Please upload a job description first to enable resume matching
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="border-t bg-muted/5 px-6 py-5">
        <div className="w-full flex flex-col sm:flex-row gap-3">
          <Button 
            className="flex-1 gap-2 bg-gradient-to-br from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary/80 shadow-soft-md"
            onClick={handleUpload}
            disabled={isUploading || files.length === 0 || !currentJob || processingComplete}
            size="lg"
          >
            {isUploading ? (
              <>
                <LoaderIcon className="h-5 w-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : processingComplete ? (
              <>
                <CheckCircle2Icon className="h-5 w-5" />
                <span>Successfully Processed</span>
              </>
            ) : files.length > 0 ? (
              <>
                <UserIcon className="h-5 w-5" />
                <span>Analyze {files.length} {files.length === 1 ? 'Resume' : 'Resumes'}</span>
              </>
            ) : (
              <>
                <UploadCloudIcon className="h-5 w-5" />
                <span>Select Resumes to Upload</span>
              </>
            )}
          </Button>
          
          {processingComplete && (
            <Button
              variant="outline"
              size="lg"
              className="flex-1 sm:flex-none gap-2"
              onClick={clearFiles}
            >
              <FileX2Icon className="h-5 w-5" />
              <span>Clear Files</span>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
