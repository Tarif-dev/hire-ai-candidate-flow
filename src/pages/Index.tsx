
import { JobUpload } from "@/components/JobUpload";
import { ResumeUpload } from "@/components/ResumeUpload";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { HeroSection } from "@/components/HeroSection";

const Index = () => {
  const { currentJob, matches } = useAppContext();
  const hasMatches = matches.length > 0;

  return (
    <div className="space-y-8 animate-fade-in">
      <HeroSection />

      <div className="container mx-auto px-4">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-3xl font-display font-bold tracking-tight">
            Get Started with <span className="text-primary">SmartHire AI</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload a job description and candidate resumes to match the best candidates
            for your open positions.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          <JobUpload />
          <ResumeUpload />
        </div>

        {hasMatches && (
          <div className="flex justify-center mt-12">
            <Button size="lg" asChild className="gap-2 shadow-soft-md">
              <Link to="/dashboard" className="flex items-center">
                View Matching Results
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
