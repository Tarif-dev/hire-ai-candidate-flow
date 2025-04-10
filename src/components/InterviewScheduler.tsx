
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppContext } from "@/context/AppContext";
import { CalendarIcon, CheckIcon } from "lucide-react";
import { Candidate, JobDescription } from "@/types";
import { format, addDays } from "date-fns";

interface InterviewSchedulerProps {
  candidate: Candidate;
  job: JobDescription;
  onScheduled: () => void;
  onCancel: () => void;
}

export function InterviewScheduler({ 
  candidate, 
  job, 
  onScheduled, 
  onCancel 
}: InterviewSchedulerProps) {
  const { scheduleInterview } = useAppContext();
  const [selectedDate, setSelectedDate] = useState<string>(
    format(addDays(new Date(), 3), "yyyy-MM-dd")
  );
  const [selectedTime, setSelectedTime] = useState<string>("10:00");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Format the datetime for the API
    const datetime = `${selectedDate}T${selectedTime}:00Z`;
    
    // Schedule the interview
    scheduleInterview(candidate.id, job.id, datetime);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onScheduled();
    }, 800);
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Schedule Interview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <div className="font-medium">Candidate</div>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-medium">
              {candidate.name.split(' ').map(part => part[0]).join('').toUpperCase().substring(0, 2)}
            </div>
            <div>
              <div className="font-medium">{candidate.name}</div>
              <div className="text-sm text-muted-foreground">{candidate.email}</div>
            </div>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="font-medium">Position</div>
          <div className="text-sm">{job.title}</div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                className="pl-10"
                min={format(new Date(), "yyyy-MM-dd")}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              type="time"
              value={selectedTime}
              onChange={e => setSelectedTime(e.target.value)}
              step="1800" // 30 minute intervals
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting || !selectedDate || !selectedTime}
        >
          {isSubmitting ? 
            "Scheduling..." : 
            <>
              <CheckIcon className="mr-2 h-4 w-4" />
              Schedule Interview
            </>
          }
        </Button>
      </CardFooter>
    </Card>
  );
}
