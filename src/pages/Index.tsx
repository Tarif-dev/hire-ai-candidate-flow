
import { JobUpload } from "@/components/JobUpload";
import { ResumeUpload } from "@/components/ResumeUpload";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRightIcon, BriefcaseIcon } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { HeroSection } from "@/components/HeroSection";
import { motion } from "framer-motion";

const Index = () => {
  const { currentJob, matches } = useAppContext();
  const hasMatches = matches.length > 0;

  return (
    <div className="space-y-8 pb-16">
      <HeroSection />

      <div className="container mx-auto px-4 mt-8">
        <motion.div 
          className="text-center space-y-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
            Get Started with <span className="bg-gradient-primary bg-clip-text text-transparent">TalentFlux</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload a job description and candidate resumes to match the best candidates
            for your open positions using our advanced AI analysis.
          </p>
        </motion.div>

        <motion.div 
          className="grid gap-8 lg:gap-12 md:grid-cols-2 max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <JobUpload />
          <ResumeUpload />
        </motion.div>

        {hasMatches && (
          <motion.div 
            className="flex justify-center mt-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button size="xl" asChild className="gap-2 shadow-soft-md px-8">
              <Link to="/dashboard" className="flex items-center">
                <BriefcaseIcon className="mr-1 h-5 w-5" />
                <span>View Matching Results</span>
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="border-t mt-20 pt-12 pb-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <BriefcaseIcon className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-display font-bold">
                  <span className="bg-gradient-primary bg-clip-text text-transparent">Talent</span>
                  <span>Flux</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Advanced AI-powered talent matching platform for recruiters and hiring managers.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/candidates" className="text-muted-foreground hover:text-primary transition-colors">
                    Candidates
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-muted-foreground">
                  support@talentflux.com
                </li>
                <li className="text-muted-foreground">
                  (555) 123-4567
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-xs text-muted-foreground">
            <p>© 2025 TalentFlux. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
