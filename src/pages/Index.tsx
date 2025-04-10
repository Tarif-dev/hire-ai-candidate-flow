
import { JobUpload } from "@/components/JobUpload";
import { ResumeUpload } from "@/components/ResumeUpload";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const Index = () => {
  const { currentJob, matches } = useAppContext();
  const hasMatches = matches.length > 0;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">SmartHire AI Job Screening</h1>
        <p className="text-muted-foreground">
          Upload a job description and candidate resumes to match the best candidates
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <JobUpload />
        <ResumeUpload />
      </div>

      {hasMatches && (
        <div className="flex justify-center mt-8">
          <Button size="lg" asChild>
            <Link to="/dashboard" className="flex items-center">
              View Matching Results
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Index;
