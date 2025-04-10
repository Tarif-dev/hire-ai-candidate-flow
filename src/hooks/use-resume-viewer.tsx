
import { useState } from 'react';

interface UseResumeViewerProps {
  resumeUrl: string;
}

export function useResumeViewer({ resumeUrl }: UseResumeViewerProps) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  
  // Open the viewer
  const openViewer = () => {
    setIsViewerOpen(true);
  };
  
  // Close the viewer
  const closeViewer = () => {
    setIsViewerOpen(false);
  };
  
  // In a full implementation, this would handle actual PDF rendering
  // using a PDF library like PDF.js or react-pdf
  const ResumeViewerComponent = () => {
    if (!isViewerOpen) return null;
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-background rounded-lg w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-medium">Resume Viewer</h3>
            <button 
              className="p-1 rounded-full hover:bg-muted"
              onClick={closeViewer}
            >
              <span className="sr-only">Close</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-auto">
            <iframe 
              src={resumeUrl} 
              className="w-full h-full border rounded"
              title="Resume Viewer"
            />
          </div>
        </div>
      </div>
    );
  };
  
  return {
    isViewerOpen,
    openViewer,
    closeViewer,
    ResumeViewerComponent
  };
}
