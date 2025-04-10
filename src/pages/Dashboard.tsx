
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { CandidateCard } from "@/components/CandidateCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FilterIcon, SlidersHorizontalIcon } from "lucide-react";

const Dashboard = () => {
  const { jobs, candidates, matches, currentJob, interviews, scheduleInterview, shortlistCandidate } = useAppContext();
  const [filterScore, setFilterScore] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("score");
  
  // If no current job is selected, use the first job in the list
  const selectedJob = currentJob || jobs[0];
  
  if (!selectedJob) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>No Job Selected</CardTitle>
            <CardDescription>
              Please go back to the home page and upload a job description first.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <a href="/">Go to Job Upload</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Get matches for the selected job
  const jobMatches = matches.filter(match => match.jobId === selectedJob.id);
  
  // Apply filter
  let filteredMatches = jobMatches;
  if (filterScore !== null) {
    filteredMatches = jobMatches.filter(match => {
      if (filterScore === 80) return match.score >= 0.8;
      if (filterScore === 60) return match.score >= 0.6 && match.score < 0.8;
      return match.score < 0.6;
    });
  }
  
  // Apply sorting
  filteredMatches = [...filteredMatches].sort((a, b) => {
    if (sortBy === "score") return b.score - a.score;
    if (sortBy === "name") {
      const candidateA = candidates.find(c => c.id === a.candidateId);
      const candidateB = candidates.find(c => c.id === b.candidateId);
      return (candidateA?.name || "").localeCompare(candidateB?.name || "");
    }
    return 0;
  });
  
  const handleScheduleInterview = (candidateId: string, jobId: string) => {
    // In a real app, this would open a calendar modal
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);
    
    scheduleInterview(candidateId, jobId, tomorrow.toISOString());
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{selectedJob.title}</h1>
          <p className="text-muted-foreground">
            {selectedJob.location} • Posted on {selectedJob.postedDate}
          </p>
        </div>
        
        <div className="flex items-start gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SlidersHorizontalIcon className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="score">Sort by Match Score</SelectItem>
              <SelectItem value="name">Sort by Name</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={filterScore?.toString() || ""} 
            onValueChange={(value) => setFilterScore(value ? parseInt(value, 10) : null)}
          >
            <SelectTrigger className="w-[180px]">
              <FilterIcon className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by score" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Candidates</SelectItem>
              <SelectItem value="80">High Match (80%+)</SelectItem>
              <SelectItem value="60">Medium Match (60-79%)</SelectItem>
              <SelectItem value="0">Low Match (< 60%)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Candidates ({jobMatches.length})</TabsTrigger>
          <TabsTrigger value="shortlisted">
            Shortlisted ({jobMatches.filter(m => m.shortlisted).length})
          </TabsTrigger>
          <TabsTrigger value="interviews">
            Interviews ({interviews.filter(i => i.jobId === selectedJob.id).length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {filteredMatches.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredMatches.map(match => {
                const candidate = candidates.find(c => c.id === match.candidateId);
                if (!candidate) return null;
                
                return (
                  <CandidateCard
                    key={match.id}
                    candidate={candidate}
                    match={match}
                    onScheduleInterview={() => handleScheduleInterview(candidate.id, selectedJob.id)}
                    onToggleShortlist={() => shortlistCandidate(match.id, !match.shortlisted)}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No candidates match your current filters</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="shortlisted" className="space-y-4">
          {jobMatches.filter(m => m.shortlisted).length > 0 ? (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {jobMatches
                .filter(match => match.shortlisted)
                .map(match => {
                  const candidate = candidates.find(c => c.id === match.candidateId);
                  if (!candidate) return null;
                  
                  return (
                    <CandidateCard
                      key={match.id}
                      candidate={candidate}
                      match={match}
                      onScheduleInterview={() => handleScheduleInterview(candidate.id, selectedJob.id)}
                      onToggleShortlist={() => shortlistCandidate(match.id, !match.shortlisted)}
                    />
                  );
                })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No candidates have been shortlisted yet</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="interviews" className="space-y-4">
          {interviews.filter(i => i.jobId === selectedJob.id).length > 0 ? (
            <div className="space-y-4">
              {interviews
                .filter(interview => interview.jobId === selectedJob.id)
                .map(interview => {
                  const candidate = candidates.find(c => c.id === interview.candidateId);
                  if (!candidate) return null;
                  
                  const match = matches.find(m => 
                    m.candidateId === candidate.id && m.jobId === selectedJob.id
                  );
                  if (!match) return null;
                  
                  return (
                    <Card key={interview.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="flex-1 p-6">
                          <div className="flex items-center space-x-3">
                            <div>
                              <h3 className="text-lg font-semibold">{candidate.name}</h3>
                              <p className="text-sm text-muted-foreground">{candidate.email}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border-t md:border-t-0 md:border-l p-6 bg-muted/10">
                          <h4 className="font-medium">Interview Details</h4>
                          <p className="text-sm my-1">
                            Date: {new Date(interview.datetime).toLocaleDateString()}
                          </p>
                          <p className="text-sm">
                            Time: {new Date(interview.datetime).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                          <p className="text-sm mt-1">Status: {interview.status}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No interviews have been scheduled yet</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
