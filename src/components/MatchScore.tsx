
import { Progress } from "@/components/ui/progress";

interface MatchScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function MatchScore({ 
  score, 
  size = "md", 
  showLabel = true,
  className = ""
}: MatchScoreProps) {
  // Convert score from 0-1 to 0-100
  const percentage = Math.round(score * 100);
  
  // Determine color based on score
  let colorClass = "bg-danger";
  if (percentage >= 80) {
    colorClass = "bg-success";
  } else if (percentage >= 60) {
    colorClass = "bg-warning";
  }
  
  // Determine size classes
  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4"
  };
  
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className="flex items-center justify-between">
        {showLabel && (
          <span className={`text-${size === "sm" ? "xs" : "sm"} font-medium`}>
            Match Score
          </span>
        )}
        <span className={`text-${size === "sm" ? "xs" : "sm"} font-bold`}>
          {percentage}%
        </span>
      </div>
      <Progress 
        value={percentage} 
        className={`${sizeClasses[size]} w-full rounded-full overflow-hidden ${colorClass}`}
      />
    </div>
  );
}
