
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppContext } from "@/context/AppContext";
import { CalendarIcon, CheckCircleIcon, XCircleIcon } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Badge } from "./ui/badge";

export function UpcomingInterviews() {
  const { interviews, candidates, jobs } = useAppContext();
  
  // Sort interviews by date (nearest first)
  const sortedInterviews = [...interviews]
    .sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
    .slice(0, 5); // Limit to 5 interviews
  
  // Function to format the date and time
  const formatDateTime = (datetimeStr: string) => {
    try {
      const date = parseISO(datetimeStr);
      return format(date, "MMM d, yyyy 'at' h:mm a");
    } catch (e) {
      return datetimeStr;
    }
  };
  
  // Generate status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700">Scheduled</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-50 text-green-700">Completed</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-red-50 text-red-700">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <CalendarIcon className="mr-2 h-5 w-5" />
          Upcoming Interviews
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sortedInterviews.length > 0 ? (
          <div className="space-y-4">
            {sortedInterviews.map(interview => {
              const candidate = candidates.find(c => c.id === interview.candidateId);
              const job = jobs.find(j => j.id === interview.jobId);
              
              if (!candidate || !job) return null;
              
              return (
                <div key={interview.id} className="flex items-center space-x-4 p-3 rounded-md bg-muted/40">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {candidate.name.split(' ').map(part => part[0]).join('').toUpperCase().substring(0, 2)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{candidate.name}</h4>
                    <p className="text-sm text-muted-foreground truncate">{job.title}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium">{formatDateTime(interview.datetime)}</div>
                    <div className="mt-1">{getStatusBadge(interview.status)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CalendarIcon className="h-12 w-12 text-muted-foreground/50 mb-3" />
            <h3 className="text-lg font-medium mb-1">No Upcoming Interviews</h3>
            <p className="text-sm text-muted-foreground">
              Schedule interviews with candidates to see them here.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
