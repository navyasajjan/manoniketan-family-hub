import { Sparkles, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AIInsightCardProps {
  title: string;
  insight: string;
  type?: "suggestion" | "alert" | "success" | "trend";
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const AIInsightCard = ({ title, insight, type = "suggestion", action, className }: AIInsightCardProps) => {
  const getIcon = () => {
    switch (type) {
      case "alert":
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-primary" />;
      case "trend":
        return <TrendingUp className="h-5 w-5 text-accent" />;
      default:
        return <Sparkles className="h-5 w-5 text-secondary" />;
    }
  };

  const getBgClass = () => {
    switch (type) {
      case "alert":
        return "bg-destructive/5 border-destructive/20";
      case "success":
        return "bg-primary/5 border-primary/20";
      case "trend":
        return "bg-accent/5 border-accent/20";
      default:
        return "gradient-soft border-secondary/20";
    }
  };

  return (
    <Card className={cn("shadow-soft hover-lift", getBgClass(), className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          {getIcon()}
          <CardTitle className="text-base font-display flex items-center gap-2">
            {title}
            <Badge variant="outline" className="gap-1 bg-background/50">
              <Sparkles className="h-3 w-3" />
              AI
            </Badge>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground leading-relaxed">{insight}</p>
        {action && (
          <button
            onClick={action.onClick}
            className="text-sm font-medium text-primary hover:underline"
          >
            {action.label} →
          </button>
        )}
      </CardContent>
    </Card>
  );
};

export default AIInsightCard;
