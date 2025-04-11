
import { Link, useLocation } from "react-router-dom";
import { 
  BriefcaseIcon, 
  UserIcon, 
  LayoutDashboardIcon,
  MenuIcon,
  XIcon,
  BellIcon,
  SearchIcon,
  Settings2Icon,
  LogOutIcon
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className={cn(
      "sticky top-0 z-50 transition-all duration-200 w-full",
      scrolled 
        ? "bg-background/90 border-b border-border shadow-sm backdrop-blur-lg" 
        : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                <BriefcaseIcon className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold transition-all">
                <span className="bg-gradient-primary bg-clip-text text-transparent">Talent</span>
                <span>Flux</span>
              </span>
            </Link>
            
            <div className="hidden md:block ml-12">
              <div className="flex space-x-1">
                <Link 
                  to="/" 
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors relative group",
                    isActive("/") 
                      ? "text-primary bg-primary/5" 
                      : "hover:bg-muted/70"
                  )}
                >
                  <BriefcaseIcon className="inline-block h-4 w-4 mr-1.5 align-text-bottom" />
                  <span>Jobs</span>
                  {isActive("/") && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary mx-4 rounded-full"></span>
                  )}
                </Link>
                <Link 
                  to="/candidates" 
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors relative group",
                    isActive("/candidates") 
                      ? "text-primary bg-primary/5" 
                      : "hover:bg-muted/70"
                  )}
                >
                  <UserIcon className="inline-block h-4 w-4 mr-1.5 align-text-bottom" />
                  <span>Candidates</span>
                  {isActive("/candidates") && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary mx-4 rounded-full"></span>
                  )}
                </Link>
                <Link 
                  to="/dashboard" 
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors relative group",
                    isActive("/dashboard") 
                      ? "text-primary bg-primary/5" 
                      : "hover:bg-muted/70"
                  )}
                >
                  <LayoutDashboardIcon className="inline-block h-4 w-4 mr-1.5 align-text-bottom" />
                  <span>Dashboard</span>
                  {isActive("/dashboard") && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary mx-4 rounded-full"></span>
                  )}
                </Link>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative group">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-52 pl-9 py-2 h-9 bg-muted/50 border-muted focus-visible:ring-primary/20 focus-visible:w-64 transition-all"
              />
            </div>
            
            <Button variant="ghost" size="icon" className="relative hover:bg-muted/70">
              <BellIcon className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 h-3 w-3 bg-accent rounded-full border-2 border-background animate-pulse"></span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="h-9 w-9 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-medium text-sm cursor-pointer hover:shadow-md transition-shadow">
                  TF
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Settings2Icon className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="sm" onClick={toggleMenu} className="hover:bg-muted/70">
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
        "fixed inset-0 bg-background/98 backdrop-blur-md z-40 md:hidden transition-all duration-300 ease-in-out",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="pt-20 pb-6 px-4 h-full flex flex-col">
          <nav className="flex flex-col space-y-1">
            <Link 
              to="/" 
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                isActive("/") 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "hover:bg-muted"
              )}
              onClick={toggleMenu}
            >
              <BriefcaseIcon className="h-5 w-5" />
              <span>Jobs</span>
            </Link>
            <Link 
              to="/candidates" 
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                isActive("/candidates") 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "hover:bg-muted"
              )}
              onClick={toggleMenu}
            >
              <UserIcon className="h-5 w-5" />
              <span>Candidates</span>
            </Link>
            <Link 
              to="/dashboard" 
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                isActive("/dashboard") 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "hover:bg-muted"
              )}
              onClick={toggleMenu}
            >
              <LayoutDashboardIcon className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
          </nav>
          
          <div className="mt-8 px-4">
            <div className="relative mb-6">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-9 py-2 bg-muted/50 border-muted"
              />
            </div>
            
            <Button size="lg" className="w-full mb-4">
              <BriefcaseIcon className="mr-2 h-4 w-4" />
              <span>New Job</span>
            </Button>
            
            <Button variant="outline" size="lg" className="w-full">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Upload Resumes</span>
            </Button>
          </div>
          
          <div className="mt-auto border-t pt-6 px-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-medium text-lg">
                TF
              </div>
              <div>
                <div className="font-medium">TalentFlux User</div>
                <div className="text-sm text-muted-foreground">user@example.com</div>
              </div>
            </div>
            
            <Button variant="ghost" size="sm" className="w-full justify-start text-destructive mb-2">
              <LogOutIcon className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </Button>
            
            <div className="text-xs text-muted-foreground text-center mt-6">
              © 2025 TalentFlux. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
