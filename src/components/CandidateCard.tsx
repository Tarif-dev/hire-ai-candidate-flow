
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MatchScore } from "@/components/MatchScore";
import { InterviewDialog } from "@/components/InterviewDialog";
import { Candidate, Match, JobDescription } from "@/types";
import { 
  CalendarIcon, 
  DownloadIcon, 
  StarIcon, 
  Briefcase, 
  GraduationCap, 
  Award,
  MapPinIcon 
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { cn } from "@/lib/utils";

interface CandidateCardProps {
  candidate: Candidate;
  match: Match;
  onScheduleInterview: () => void;
  onToggleShortlist: () => void;
  jobDetails?: JobDescription;
}

export function CandidateCard({
  candidate,
  match,
  onScheduleInterview,
  onToggleShortlist,
  jobDetails
}: CandidateCardProps) {
  const { jobs } = useAppContext();
  
  // Get the job details if not provided
  const job = jobDetails || jobs.find(j => j.id === match.jobId);
  
  // Get the initials from the candidate's name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  // Get badge color based on score
  const getScoreBadgeColor = (score: number) => {
    if (score >= 0.8) return "bg-success/10 text-success border-success/20";
    if (score >= 0.6) return "bg-warning/10 text-warning border-warning/20";
    return "bg-danger/10 text-danger border-danger/20";
  };
  
  return (
    <Card 
      className="w-full overflow-hidden shadow-md hover:shadow-soft-xl transition-all duration-300 group"
      hoverEffect
    >
      <CardHeader className="p-5 pb-3 space-y-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <Avatar className="h-14 w-14 rounded-xl border border-border/40 shadow-sm group-hover:shadow-md transition-shadow">
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary rounded-xl font-medium">
                {getInitials(candidate.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{candidate.name}</h3>
              <p className="text-sm text-muted-foreground flex items-center">
                {candidate.email}
              </p>
            </div>
          </div>
          <Button
            variant={match.shortlisted ? "outline" : "ghost"}
            size="sm"
            className={cn(
              "transition-all duration-300",
              match.shortlisted ? 
                "text-primary border-primary/30 shadow-sm" : 
                "text-muted-foreground group-hover:text-primary/70"
            )}
            onClick={onToggleShortlist}
          >
            <StarIcon className={cn(
              "h-4 w-4 mr-1 transition-colors", 
              match.shortlisted ? "text-primary fill-primary" : "group-hover:text-primary/70"
            )} />
            {match.shortlisted ? "Shortlisted" : "Shortlist"}
          </Button>
        </div>
        
        <div className="pt-1">
          <MatchScore score={match.score} size="md" className="mb-0" />
        </div>
      </CardHeader>
      
      <CardContent className="px-5 pb-0 space-y-5">
        <div className="border-t pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5" />
                <span>Skills</span>
              </h4>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {candidate.skills.slice(0, 5).map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="text-xs font-normal bg-muted/50"
                  >
                    {skill}
                  </Badge>
                ))}
                {candidate.skills.length > 5 && (
                  <Badge variant="outline" className="text-xs">
                    +{candidate.skills.length - 5}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="space-y-1.5">
              <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Briefcase className="h-3.5 w-3.5" />
                <span>Experience</span>
              </h4>
              <ul className="text-sm space-y-1 pt-1">
                {candidate.experience.slice(0, 2).map((exp, index) => (
                  <li key={index} className="text-muted-foreground text-xs truncate">
                    {exp}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-1.5">
              <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <GraduationCap className="h-3.5 w-3.5" />
                <span>Match Details</span>
              </h4>
              <div className="space-y-1 pt-1">
                {match.matchDetails.map((detail, index) => (
                  <div key={index} className="flex justify-between items-center text-xs">
                    <span className="capitalize text-muted-foreground">{detail.category}</span>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-xs font-normal border",
                        getScoreBadgeColor(detail.score)
                      )}
                    >
                      {Math.round(detail.score * 100)}%
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-5 py-4 mt-3 bg-muted/10 border-t flex justify-between gap-2">
        <Button variant="outline" size="sm" className="gap-1 h-9" asChild>
          <a 
            href={candidate.resumeUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground/90 hover:text-primary"
          >
            <DownloadIcon className="h-4 w-4" />
            <span>View Resume</span>
          </a>
        </Button>
        {job ? (
          <InterviewDialog 
            candidate={candidate} 
            job={job} 
            onScheduled={onScheduleInterview}
            trigger={
              <Button size="sm" variant="default" className="gap-1 h-9 shadow-sm">
                <CalendarIcon className="h-4 w-4" />
                <span>Schedule</span>
              </Button>
            }
          />
        ) : (
          <Button size="sm" className="gap-1 h-9" onClick={onScheduleInterview}>
            <CalendarIcon className="h-4 w-4" />
            <span>Schedule</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
