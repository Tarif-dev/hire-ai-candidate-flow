
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MatchScore } from "@/components/MatchScore";
import { Candidate, Match } from "@/types";
import { CalendarIcon, DownloadIcon, StarIcon } from "lucide-react";

interface CandidateCardProps {
  candidate: Candidate;
  match: Match;
  onScheduleInterview: () => void;
  onToggleShortlist: () => void;
}

export function CandidateCard({
  candidate,
  match,
  onScheduleInterview,
  onToggleShortlist
}: CandidateCardProps) {
  // Get the initials from the candidate's name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <Card className="w-full overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-4 pb-0 flex justify-between items-start">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12 border-2 border-primary/10">
            <AvatarFallback className="bg-primary/5 text-primary">
              {getInitials(candidate.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{candidate.name}</h3>
            <p className="text-sm text-muted-foreground">{candidate.email}</p>
          </div>
        </div>
        <Button
          variant={match.shortlisted ? "outline" : "ghost"}
          size="sm"
          className={match.shortlisted ? "text-primary" : "text-muted-foreground"}
          onClick={onToggleShortlist}
        >
          <StarIcon className="h-4 w-4 mr-1" />
          {match.shortlisted ? "Shortlisted" : "Shortlist"}
        </Button>
      </CardHeader>
      
      <CardContent className="p-4">
        <MatchScore score={match.score} className="mb-4" />
        
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium mb-2">Match Details</h4>
            <div className="space-y-1">
              {match.matchDetails.map((detail, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="capitalize">{detail.category}</span>
                  <Badge variant={detail.score >= 0.8 ? "default" : "outline"}>
                    {Math.round(detail.score * 100)}%
                  </Badge>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Skills</h4>
            <div className="flex flex-wrap gap-1">
              {candidate.skills.slice(0, 5).map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {candidate.skills.length > 5 && (
                <Badge variant="outline" className="text-xs">
                  +{candidate.skills.length - 5} more
                </Badge>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-1">Experience</h4>
            <ul className="text-sm space-y-1">
              {candidate.experience.slice(0, 2).map((exp, index) => (
                <li key={index} className="text-muted-foreground truncate">
                  {exp}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <a href={candidate.resumeUrl} target="_blank" rel="noopener noreferrer">
            <DownloadIcon className="h-4 w-4 mr-1" />
            Resume
          </a>
        </Button>
        <Button size="sm" onClick={onScheduleInterview}>
          <CalendarIcon className="h-4 w-4 mr-1" />
          Schedule Interview
        </Button>
      </CardFooter>
    </Card>
  );
}
