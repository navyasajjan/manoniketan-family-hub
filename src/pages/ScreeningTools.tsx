import { useState } from "react";
import { ClipboardCheck, Brain, MessageSquare, Activity, AlertCircle, Sparkles } from "lucide-react";
import AIInsightCard from "@/components/AIInsightCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ScreeningTool {
  id: string;
  name: string;
  description: string;
  icon: any;
  duration: string;
  ageRange: string;
  status: "completed" | "in-progress" | "not-started";
  score?: number;
}

const ScreeningTools = () => {
  const [tools] = useState<ScreeningTool[]>([
    {
      id: "asq3",
      name: "ASQ-3",
      description: "Ages & Stages Questionnaire - Comprehensive developmental screening",
      icon: ClipboardCheck,
      duration: "10-15 min",
      ageRange: "1 month - 5½ years",
      status: "completed",
      score: 85,
    },
    {
      id: "mchat",
      name: "M-CHAT-R",
      description: "Modified Checklist for Autism in Toddlers - Early autism detection",
      icon: Brain,
      duration: "5-10 min",
      ageRange: "16-30 months",
      status: "in-progress",
      score: 60,
    },
    {
      id: "speech",
      name: "Speech Delay Screening",
      description: "Evaluate language and communication development",
      icon: MessageSquare,
      duration: "8-12 min",
      ageRange: "18 months - 5 years",
      status: "not-started",
    },
    {
      id: "motor",
      name: "Motor Skills Assessment",
      description: "Check fine and gross motor development milestones",
      icon: Activity,
      duration: "10-15 min",
      ageRange: "6 months - 6 years",
      status: "completed",
      score: 92,
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-primary text-primary-foreground">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-secondary text-secondary-foreground">In Progress</Badge>;
      default:
        return <Badge variant="outline">Not Started</Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-primary";
    if (score >= 60) return "text-secondary-foreground";
    return "text-destructive";
  };

  return (
    <div className="min-h-screen pt-20 md:pt-24 px-4 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Screening Tools 🩺
          </h1>
          <p className="text-muted-foreground">
            Early detection assessments to monitor your child's development
          </p>
        </div>

        <Card className="mb-8 shadow-soft bg-accent-light border-accent">
          <CardHeader>
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <CardTitle className="text-accent font-display">Important Note</CardTitle>
                <CardDescription className="text-card-foreground mt-2">
                  These screening tools are for early detection and monitoring purposes only. They do not provide a
                  diagnosis. Always consult with your healthcare provider or therapist to discuss results and next
                  steps.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <AIInsightCard
          title="Screening Recommendation"
          type="suggestion"
          insight="Based on your child's age (18 months) and recent milestone data, we recommend completing the M-CHAT-R screening. Early detection can help guide the best support plan."
          action={{
            label: "Start Screening",
            onClick: () => {},
          }}
          className="mb-6"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card key={tool.id} className="shadow-soft hover-lift">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-primary-light rounded-xl">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="font-display">{tool.name}</CardTitle>
                        <CardDescription className="text-sm mt-1">{tool.ageRange}</CardDescription>
                      </div>
                    </div>
                    {getStatusBadge(tool.status)}
                  </div>
                  <CardDescription className="text-base">{tool.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{tool.duration}</span>
                  </div>

                  {tool.status === "completed" && tool.score && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Latest Score:</span>
                        <span className={`text-2xl font-bold ${getScoreColor(tool.score)}`}>
                          {tool.score}%
                        </span>
                      </div>
                      <Progress value={tool.score} className="h-2" />
                    </div>
                  )}

                  {tool.status === "in-progress" && tool.score && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Progress:</span>
                        <span className="font-medium">{tool.score}%</span>
                      </div>
                      <Progress value={tool.score} className="h-2" />
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    {tool.status === "not-started" && (
                      <Button className="w-full">Start Screening</Button>
                    )}
                    {tool.status === "in-progress" && (
                      <Button className="w-full" variant="secondary">
                        Continue
                      </Button>
                    )}
                    {tool.status === "completed" && (
                      <>
                        <Button variant="outline" className="flex-1">
                          View Results
                        </Button>
                        <Button className="flex-1">Retake</Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mt-8 shadow-soft">
          <CardHeader>
            <CardTitle className="font-display">Understanding Screening Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary"></div>
                  <span className="font-semibold text-primary">80-100%</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  On track - Continue monitoring and encouraging development
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-secondary"></div>
                  <span className="font-semibold text-secondary-foreground">60-79%</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Monitor closely - Consider discussing with therapist
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-destructive"></div>
                  <span className="font-semibold text-destructive">Below 60%</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Needs attention - Schedule consultation with specialist
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScreeningTools;
