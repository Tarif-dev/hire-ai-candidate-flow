
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";

interface MatchScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
  variant?: "default" | "gradient" | "pill";
}

export function MatchScore({ 
  score, 
  size = "md", 
  showLabel = true,
  className = "",
  variant = "default"
}: MatchScoreProps) {
  // Convert score from 0-1 to 0-100
  const percentage = Math.round(score * 100);
  
  // Determine color based on score
  const getColorClass = () => {
    if (percentage >= 80) {
      return "from-green-400 to-green-500 text-green-500 bg-green-500";
    } else if (percentage >= 60) {
      return "from-amber-400 to-amber-500 text-amber-500 bg-amber-500";
    } else {
      return "from-red-400 to-red-500 text-red-500 bg-red-500";
    }
  };
  
  // Determine size classes
  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3"
  };
  
  const fontSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };
  
  // Generate star rating based on score (0-5 stars)
  const starRating = Math.round(score * 5);
  
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-center justify-between">
        {showLabel && (
          <div className="flex items-center">
            <StarIcon className={cn(
              "inline-block mr-1.5",
              size === "sm" ? "h-3 w-3" : size === "md" ? "h-4 w-4" : "h-5 w-5",
              percentage >= 80 ? "text-green-500" : percentage >= 60 ? "text-amber-500" : "text-red-500"
            )} />
            <span className={cn(
              fontSizeClasses[size], 
              "font-medium text-muted-foreground"
            )}>
              Match Score
            </span>
          </div>
        )}
        
        <div className={cn(
          fontSizeClasses[size], 
          "font-semibold",
          percentage >= 80 ? "text-green-500" : percentage >= 60 ? "text-amber-500" : "text-red-500"
        )}>
          {percentage}%
        </div>
      </div>
      
      {variant === "default" && (
        <Progress 
          value={percentage} 
          className={cn(
            sizeClasses[size], 
            "w-full rounded-full overflow-hidden",
            percentage >= 80 ? "bg-green-100" : percentage >= 60 ? "bg-amber-100" : "bg-red-100"
          )}
          style={{
            background: percentage >= 80 ? "linear-gradient(90deg, #4ade80, #22c55e)" : 
                      percentage >= 60 ? "linear-gradient(90deg, #fbbf24, #f59e0b)" : 
                      "linear-gradient(90deg, #f87171, #ef4444)"
          }}
        />
      )}
      
      {variant === "gradient" && (
        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
          <div 
            className={`h-full rounded-full bg-gradient-to-r ${getColorClass()}`} 
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
      
      {variant === "pill" && (
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <div 
              key={star} 
              className={cn(
                "h-1.5 flex-1 rounded-full transition-all duration-500",
                star <= starRating ? 
                  (percentage >= 80 ? "bg-green-500" : percentage >= 60 ? "bg-amber-500" : "bg-red-500") : 
                  "bg-muted"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
