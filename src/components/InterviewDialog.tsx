
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, CalendarIcon, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAppContext } from "@/context/AppContext";
import { Candidate, JobDescription } from "@/types";
import { InterviewScheduler } from "@/components/InterviewScheduler";

interface InterviewDialogProps {
  candidate: Candidate;
  job: JobDescription;
  trigger?: React.ReactNode;
  onScheduled?: () => void;
}

export function InterviewDialog({ 
  candidate, 
  job,
  trigger,
  onScheduled
}: InterviewDialogProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "scheduling" | "scheduled">("idle");
  const { toast } = useToast();
  
  const handleInterviewScheduled = () => {
    // Mark as scheduled
    setStatus("scheduled");
    
    // Show success toast
    toast({
      title: "Interview Scheduled",
      description: `Interview with ${candidate.name} has been scheduled successfully.`,
      duration: 5000,
    });
    
    // Close the dialog after a short delay
    setTimeout(() => {
      setOpen(false);
      setStatus("idle");
      onScheduled?.();
    }, 1500);
  };
  
  const handleCancel = () => {
    setOpen(false);
    setStatus("idle");
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm">
            <CalendarIcon className="h-4 w-4 mr-1" />
            Schedule Interview
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {status === "idle" && (
          <InterviewScheduler 
            candidate={candidate} 
            job={job} 
            onScheduled={handleInterviewScheduled} 
            onCancel={handleCancel} 
          />
        )}
        
        {status === "scheduled" && (
          <div className="flex flex-col items-center justify-center p-6 space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
              <Check className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-semibold">Interview Scheduled!</h2>
            <p className="text-center text-muted-foreground">
              The interview with {candidate.name} for the {job.title} position has been scheduled successfully.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
