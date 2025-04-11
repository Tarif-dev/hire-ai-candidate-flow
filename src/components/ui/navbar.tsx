
import { Link } from "react-router-dom";
import { 
  BriefcaseIcon, 
  UserIcon, 
  LayoutDashboardIcon,
  MenuIcon,
  XIcon,
  BellIcon,
  SearchIcon
} from "lucide-react";
import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-md bg-background/80">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md">
                <BriefcaseIcon className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold">
                <span className="bg-gradient-primary bg-clip-text text-transparent">Smart</span>
                <span>Hire AI</span>
              </span>
            </Link>
            
            <div className="hidden md:block ml-10">
              <div className="flex space-x-1">
                <Link 
                  to="/" 
                  className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/10 transition-colors"
                >
                  <BriefcaseIcon className="inline-block h-4 w-4 mr-1.5 align-text-bottom" />
                  Jobs
                </Link>
                <Link 
                  to="/candidates" 
                  className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/10 transition-colors"
                >
                  <UserIcon className="inline-block h-4 w-4 mr-1.5 align-text-bottom" />
                  Candidates
                </Link>
                <Link 
                  to="/dashboard" 
                  className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/10 transition-colors"
                >
                  <LayoutDashboardIcon className="inline-block h-4 w-4 mr-1.5 align-text-bottom" />
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-52 pl-9 py-2 h-9 bg-muted/50 border-muted focus-visible:ring-primary/20"
              />
            </div>
            
            <Button variant="ghost" size="icon" className="relative">
              <BellIcon className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 h-3 w-3 bg-accent rounded-full border-2 border-background"></span>
            </Button>
            
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium text-sm cursor-pointer">
              SH
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="sm" onClick={toggleMenu}>
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {isMenuOpen ? (
                <XIcon className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 bg-background/95 backdrop-blur-sm z-40 md:hidden transition-all duration-300 ease-in-out",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="pt-20 pb-6 px-4">
          <nav className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
              onClick={toggleMenu}
            >
              <BriefcaseIcon className="h-5 w-5 text-primary" />
              <span className="font-medium">Jobs</span>
            </Link>
            <Link 
              to="/candidates" 
              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
              onClick={toggleMenu}
            >
              <UserIcon className="h-5 w-5 text-primary" />
              <span className="font-medium">Candidates</span>
            </Link>
            <Link 
              to="/dashboard" 
              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
              onClick={toggleMenu}
            >
              <LayoutDashboardIcon className="h-5 w-5 text-primary" />
              <span className="font-medium">Dashboard</span>
            </Link>
          </nav>
          
          <div className="mt-6 px-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-9 py-2 bg-muted/50 border-muted"
              />
            </div>
          </div>
          
          <div className="mt-auto pt-6">
            <div className="px-4 flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                SH
              </div>
              <div>
                <div className="font-medium">SmartHire User</div>
                <div className="text-sm text-muted-foreground">user@example.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
