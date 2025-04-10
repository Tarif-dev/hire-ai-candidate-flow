
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { CandidateCard } from "@/components/CandidateCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, FilterIcon, SlidersHorizontalIcon } from "lucide-react";

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
              <SelectItem value="0">Low Match (&lt; 60%)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Analytics and Upcoming Interviews */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Candidates */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{candidates.length}</div>
            <p className="text-xs text-muted-foreground">
              {jobMatches.length} matched with this job
            </p>
          </CardContent>
        </Card>
        
        {/* Match Rate */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Match Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {jobMatches.length > 0 
                ? `${Math.round(jobMatches.reduce((acc, m) => acc + m.score, 0) / jobMatches.length * 100)}%` 
                : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">
              Based on {jobMatches.length} candidate matches
            </p>
          </CardContent>
        </Card>
        
        {/* Shortlisted */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Shortlisted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {jobMatches.filter(m => m.shortlisted).length}
            </div>
            <p className="text-xs text-muted-foreground">
              {jobMatches.length > 0 
                ? `${Math.round(jobMatches.filter(m => m.shortlisted).length / jobMatches.length * 100)}% of candidates` 
                : "No candidates"}
            </p>
          </CardContent>
        </Card>
        
        {/* Scheduled Interviews */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {interviews.filter(i => i.jobId === selectedJob.id).length}
            </div>
            <p className="text-xs text-muted-foreground">
              {interviews.filter(i => i.jobId === selectedJob.id && i.status === "scheduled").length} upcoming
            </p>
          </CardContent>
        </Card>
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
        
        <TabsContent value="interviews" className="space-y-6">
          {interviews.filter(i => i.jobId === selectedJob.id).length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2 space-y-4">
                <h3 className="text-lg font-semibold">Scheduled Interviews</h3>
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
                      
                      // Format date and time
                      const interviewDate = new Date(interview.datetime);
                      const formattedDate = interviewDate.toLocaleDateString(undefined, {
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric'
                      });
                      const formattedTime = interviewDate.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      });
                      
                      return (
                        <Card key={interview.id} className="overflow-hidden hover:shadow-md transition-shadow">
                          <div className="flex flex-col md:flex-row">
                            <div className="flex-1 p-6">
                              <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                                  {candidate.name.split(' ').map(part => part[0]).join('').toUpperCase().substring(0, 2)}
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold">{candidate.name}</h3>
                                  <p className="text-sm text-muted-foreground">{candidate.email}</p>
                                </div>
                              </div>
                              
                              <div className="mt-4">
                                <h4 className="text-sm font-medium mb-1">Match Score</h4>
                                <div className="flex items-center space-x-2">
                                  <div className="w-16 bg-muted rounded-full h-2">
                                    <div 
                                      className={`h-full rounded-full ${match.score >= 0.8 ? 'bg-green-500' : match.score >= 0.6 ? 'bg-amber-500' : 'bg-red-500'}`}
                                      style={{ width: `${match.score * 100}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm font-medium">{Math.round(match.score * 100)}%</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="border-t md:border-t-0 md:border-l p-6 bg-muted/10 md:min-w-[200px]">
                              <h4 className="font-medium">Interview Details</h4>
                              <div className="space-y-2 mt-2">
                                <div className="flex items-center text-sm">
                                  <span className="font-medium w-16">Date:</span>
                                  <span>{formattedDate}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <span className="font-medium w-16">Time:</span>
                                  <span>{formattedTime}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <span className="font-medium w-16">Status:</span>
                                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                                    interview.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                                    interview.status === 'completed' ? 'bg-green-100 text-green-800' :
                                    'bg-red-100 text-red-800'
                                  }`}>
                                    {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="mt-4 flex space-x-2">
                                <Button size="sm" variant="outline">
                                  Reschedule
                                </Button>
                                <Button size="sm" variant="outline" className="text-destructive">
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                </div>
              </div>
              
              <div>
                <div className="space-y-4">
                  {/* Import the UpcomingInterviews component */}
                  <div className="hidden md:block">
                    <h3 className="text-lg font-semibold mb-4">All Upcoming Interviews</h3>
                    {/* This would be replaced with our UpcomingInterviews component */}
                    <Card className="overflow-hidden bg-muted/30">
                      <CardHeader className="pb-1">
                        <CardTitle className="text-base">Upcoming Interviews</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          {interviews
                            .filter(i => i.status === 'scheduled')
                            .slice(0, 3)
                            .map(interview => {
                              const candidate = candidates.find(c => c.id === interview.candidateId);
                              if (!candidate) return null;
                              
                              return (
                                <div key={interview.id} className="flex items-center justify-between p-2 rounded bg-background">
                                  <div className="flex items-center">
                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-medium">
                                      {candidate.name.split(' ').map(part => part[0]).join('').toUpperCase().substring(0, 2)}
                                    </div>
                                    <div className="ml-2">
                                      <div className="text-sm font-medium">{candidate.name}</div>
                                      <div className="text-xs text-muted-foreground">
                                        {new Date(interview.datetime).toLocaleDateString()}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card className="overflow-hidden bg-muted/30">
                    <CardHeader className="pb-1">
                      <CardTitle className="text-base">Interview Status</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Scheduled</span>
                            <span className="font-medium">
                              {interviews.filter(i => i.status === 'scheduled').length}
                            </span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full" 
                              style={{ 
                                width: `${interviews.length ? (interviews.filter(i => i.status === 'scheduled').length / interviews.length) * 100 : 0}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Completed</span>
                            <span className="font-medium">
                              {interviews.filter(i => i.status === 'completed').length}
                            </span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500 rounded-full" 
                              style={{ 
                                width: `${interviews.length ? (interviews.filter(i => i.status === 'completed').length / interviews.length) * 100 : 0}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Cancelled</span>
                            <span className="font-medium">
                              {interviews.filter(i => i.status === 'cancelled').length}
                            </span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-red-500 rounded-full" 
                              style={{ 
                                width: `${interviews.length ? (interviews.filter(i => i.status === 'cancelled').length / interviews.length) * 100 : 0}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 bg-muted/40 flex items-center justify-center rounded-full mb-4">
                <CalendarIcon className="h-8 w-8 text-muted-foreground/60" />
              </div>
              <h3 className="text-xl font-medium mb-1">No Interviews Scheduled</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Schedule interviews with candidates from the dashboard or shortlisted candidates tab.
              </p>
              <Button>Schedule Your First Interview</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
