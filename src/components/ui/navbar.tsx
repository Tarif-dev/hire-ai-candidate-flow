
import { Link } from "react-router-dom";
import { BriefcaseIcon, UserIcon, PieChartIcon } from "lucide-react";

export function Navbar() {
  return (
    <div className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <BriefcaseIcon className="h-6 w-6" />
            <span className="text-xl font-bold">SmartHire AI</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-1 hover:text-white transition-colors">
              <BriefcaseIcon className="h-4 w-4" />
              <span>Jobs</span>
            </Link>
            <Link to="/candidates" className="flex items-center space-x-1 hover:text-white transition-colors">
              <UserIcon className="h-4 w-4" />
              <span>Candidates</span>
            </Link>
            <Link to="/dashboard" className="flex items-center space-x-1 hover:text-white transition-colors">
              <PieChartIcon className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </nav>
          
          <div className="md:hidden">
            {/* Mobile menu button would go here in a real app */}
            <button className="p-2 rounded hover:bg-primary-foreground/10">
              <span className="sr-only">Open menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
