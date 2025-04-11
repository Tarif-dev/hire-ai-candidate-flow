
import { ArrowRightIcon, BriefcaseIcon, UserIcon, SparklesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden py-12 mb-20">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern bg-[length:30px_30px] opacity-[0.15] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-accent/10 to-background/0 pointer-events-none"></div>
      
      {/* Radial gradient */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: "1s" }}></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
            <SparklesIcon className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">AI-Powered Talent Matching</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
            Find Your <span className="bg-gradient-primary bg-clip-text text-transparent">Perfect</span> Candidate Match
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            Upload job descriptions and candidate resumes to instantly match the best talent with your open positions using advanced AI analysis.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gap-2 shadow-soft-md">
              <Link to="/dashboard">
                <BriefcaseIcon className="h-5 w-5" />
                <span>Match Candidates</span>
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link to="/candidates">
                <UserIcon className="h-5 w-5" />
                <span>View Talent Pool</span>
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="p-6 rounded-xl bg-card/50 border hover:shadow-soft-md transition-all">
            <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <BriefcaseIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Upload Job Description</h3>
            <p className="text-muted-foreground mb-4">Analyze job requirements and key skills needed for the position.</p>
            <Link to="/" className="text-primary inline-flex items-center hover:underline">
              <span>Get Started</span>
              <ArrowRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="p-6 rounded-xl bg-card/50 border hover:shadow-soft-md transition-all">
            <div className="h-12 w-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
              <UserIcon className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Upload Resumes</h3>
            <p className="text-muted-foreground mb-4">Batch upload candidate resumes for AI-powered parsing and analysis.</p>
            <Link to="/" className="text-primary inline-flex items-center hover:underline">
              <span>Upload Resumes</span>
              <ArrowRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="p-6 rounded-xl bg-card/50 border hover:shadow-soft-md transition-all">
            <div className="h-12 w-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
              <SparklesIcon className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI-Powered Matching</h3>
            <p className="text-muted-foreground mb-4">Get instant scoring and matches based on skills, experience, and potential.</p>
            <Link to="/dashboard" className="text-primary inline-flex items-center hover:underline">
              <span>View Matches</span>
              <ArrowRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
