
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { SearchIcon } from "lucide-react";

const Candidates = () => {
  const { candidates, jobs } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSkill, setFilterSkill] = useState("");
  
  // Extract all unique skills across candidates
  const allSkills = Array.from(
    new Set(
      candidates.flatMap(candidate => candidate.skills)
    )
  ).sort();
  
  // Filter candidates based on search and skill filter
  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = searchTerm === "" || 
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSkill = filterSkill === "" || 
      candidate.skills.some(skill => skill.toLowerCase().includes(filterSkill.toLowerCase()));
    
    return matchesSearch && matchesSkill;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Candidate Database</h1>
        <p className="text-muted-foreground">
          Browse and filter all available candidates
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name or email..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filterSkill} onValueChange={setFilterSkill}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by skill" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Skills</SelectItem>
            {allSkills.map(skill => (
              <SelectItem key={skill} value={skill}>
                {skill}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Candidates ({candidates.length})</TabsTrigger>
          <TabsTrigger value="active">Active Candidates ({candidates.filter(c => c.skills.length > 0).length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {filteredCandidates.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCandidates.map(candidate => (
                <Card key={candidate.id}>
                  <CardHeader>
                    <CardTitle>{candidate.name}</CardTitle>
                    <CardDescription>{candidate.email}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {candidate.skills.map(skill => (
                            <Badge key={skill} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Experience</h4>
                        <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                          {candidate.experience.map((exp, index) => (
                            <li key={index}>{exp}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Education</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {candidate.education.map((edu, index) => (
                            <li key={index}>
                              {edu.degree} in {edu.fieldOfStudy}<br />
                              <span className="text-xs">{edu.institution}, {edu.startDate} - {edu.endDate}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No candidates match your search criteria</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setFilterSkill("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="active" className="space-y-4">
          {filteredCandidates.filter(c => c.skills.length > 0).length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCandidates
                .filter(c => c.skills.length > 0)
                .map(candidate => (
                  <Card key={candidate.id}>
                    <CardHeader>
                      <CardTitle>{candidate.name}</CardTitle>
                      <CardDescription>{candidate.email}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {candidate.skills.map(skill => (
                              <Badge key={skill} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Experience</h4>
                          <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                            {candidate.experience.map((exp, index) => (
                              <li key={index}>{exp}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No active candidates match your search criteria</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setFilterSkill("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Candidates;
