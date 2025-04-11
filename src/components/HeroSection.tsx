
import { ArrowRightIcon, BriefcaseIcon, UserIcon, SparklesIcon, ZapIcon, CheckCircle2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden py-16 mb-24">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern bg-[length:30px_30px] opacity-[0.15] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-accent/10 to-background/0 pointer-events-none"></div>
      
      {/* Abstract blobs */}
      <div className="absolute -top-24 -left-24 w-[40rem] h-[40rem] bg-primary/10 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-24 -right-24 w-[40rem] h-[40rem] bg-accent/10 rounded-full filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: "1s" }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-secondary/5 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1.5s" }}></div>
      
      <div className="container mx-auto px-4 py-10 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-8 border border-primary/20 shadow-sm animate-fade-in">
            <SparklesIcon className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">AI-Powered Talent Matching</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-8 leading-tight">
            Find Your <span className="bg-gradient-primary bg-clip-text text-transparent relative">Perfect 
              <svg className="absolute bottom-1 left-0 w-full h-2 text-primary/20" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path fill="currentColor" d="M0,15 Q50,5 100,15 V20 H0 Z" />
              </svg>
            </span> Candidate Match
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Upload job descriptions and resumes to instantly match the best talent 
            with your open positions using our advanced AI analysis.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Button asChild size="xl" className="gap-2 shadow-soft-md animate-fade-in">
              <Link to="/dashboard">
                <BriefcaseIcon className="h-5 w-5" />
                <span>Match Candidates</span>
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline" className="gap-2 border-2 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <Link to="/candidates">
                <UserIcon className="h-5 w-5" />
                <span>View Talent Pool</span>
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="bg-white/50 backdrop-blur-sm border border-border/40 rounded-2xl p-6 shadow-soft-md hover:shadow-soft-xl transition-shadow duration-300">
            <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
              <ZapIcon className="h-7 w-7 text-primary" />
            </div>
            <div className="text-3xl font-bold mb-1">95%</div>
            <h3 className="text-xl font-semibold mb-2">Matching Accuracy</h3>
            <p className="text-muted-foreground">Our AI algorithms provide precision talent matching for your roles.</p>
          </div>
          
          <div className="bg-white/50 backdrop-blur-sm border border-border/40 rounded-2xl p-6 shadow-soft-md hover:shadow-soft-xl transition-shadow duration-300">
            <div className="h-14 w-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-4">
              <CheckCircle2Icon className="h-7 w-7 text-secondary" />
            </div>
            <div className="text-3xl font-bold mb-1">85%</div>
            <h3 className="text-xl font-semibold mb-2">Time Saved</h3>
            <p className="text-muted-foreground">Reduce your hiring timeline with automated candidate processing.</p>
          </div>
          
          <div className="bg-white/50 backdrop-blur-sm border border-border/40 rounded-2xl p-6 shadow-soft-md hover:shadow-soft-xl transition-shadow duration-300">
            <div className="h-14 w-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-4">
              <BriefcaseIcon className="h-7 w-7 text-accent" />
            </div>
            <div className="text-3xl font-bold mb-1">10k+</div>
            <h3 className="text-xl font-semibold mb-2">Positions Filled</h3>
            <p className="text-muted-foreground">Trusted by companies to find their perfect candidates.</p>
          </div>
        </div>
        
        {/* Feature highlights */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-24 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="p-8 rounded-2xl bg-card/80 border border-border/50 hover:shadow-soft-md transition-all hover:-translate-y-1">
            <div className="h-14 w-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-6">
              <BriefcaseIcon className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Job Description Analysis</h3>
            <p className="text-muted-foreground mb-5">Our AI analyzes job requirements and extracts key skills and qualifications needed.</p>
            <Link to="/" className="text-primary inline-flex items-center font-medium hover:underline">
              <span>Upload Job Description</span>
              <ArrowRightIcon className="h-4 w-4 ml-1.5" />
            </Link>
          </div>
          
          <div className="p-8 rounded-2xl bg-card/80 border border-border/50 hover:shadow-soft-md transition-all hover:-translate-y-1">
            <div className="h-14 w-14 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center mb-6">
              <UserIcon className="h-7 w-7 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-3">Resume Parsing</h3>
            <p className="text-muted-foreground mb-5">Batch upload candidate resumes for automatic parsing and comprehensive analysis.</p>
            <Link to="/" className="text-primary inline-flex items-center font-medium hover:underline">
              <span>Upload Resumes</span>
              <ArrowRightIcon className="h-4 w-4 ml-1.5" />
            </Link>
          </div>
          
          <div className="p-8 rounded-2xl bg-card/80 border border-border/50 hover:shadow-soft-md transition-all hover:-translate-y-1">
            <div className="h-14 w-14 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl flex items-center justify-center mb-6">
              <SparklesIcon className="h-7 w-7 text-secondary" />
            </div>
            <h3 className="text-xl font-bold mb-3">AI-Powered Matching</h3>
            <p className="text-muted-foreground mb-5">Get instant scoring and matches based on skills, experience, and candidate potential.</p>
            <Link to="/dashboard" className="text-primary inline-flex items-center font-medium hover:underline">
              <span>View Matches</span>
              <ArrowRightIcon className="h-4 w-4 ml-1.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
