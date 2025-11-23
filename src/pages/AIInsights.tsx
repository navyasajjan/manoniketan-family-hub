import { useState } from "react";
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Calendar, Activity, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import AIInsightCard from "@/components/AIInsightCard";

const AIInsights = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-display font-bold gradient-text mb-2">AI Insights</h1>
        <p className="text-muted-foreground">
          AI-powered analysis of your child's development patterns and progress
        </p>
      </div>

      {/* Period Selector */}
      <div className="flex gap-2">
        {["week", "month", "quarter"].map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedPeriod === period
                ? "bg-primary text-primary-foreground shadow-soft"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            Past {period.charAt(0).toUpperCase() + period.slice(1)}
          </button>
        ))}
      </div>

      {/* Overall Progress Summary */}
      <Card className="gradient-soft border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <CardTitle className="font-display">Overall Development Score</CardTitle>
          </div>
          <CardDescription>AI-calculated progress across all milestones</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-4xl font-display font-bold gradient-text">87%</span>
              <Badge variant="outline" className="gap-1 bg-primary/10 text-primary">
                <TrendingUp className="h-3 w-3" />
                +12% this month
              </Badge>
            </div>
            <Progress value={87} className="h-3" />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your child is showing excellent progress! They're ahead of schedule in motor skills and on track with social development. Consider focusing on communication exercises for the next few weeks.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="patterns" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="patterns" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-accent" />
                  Activity Patterns
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Morning Activities</span>
                    <span className="font-medium">78% success rate</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Afternoon Activities</span>
                    <span className="font-medium">92% success rate</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Evening Activities</span>
                    <span className="font-medium">65% success rate</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <p className="text-sm text-muted-foreground pt-2">
                  Peak performance detected during afternoon sessions. Consider scheduling important activities between 2-4 PM.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-secondary" />
                  Weekly Trends
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Motor Skills</span>
                    <Badge variant="outline" className="text-primary">+15%</Badge>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Communication</span>
                    <Badge variant="outline" className="text-accent">+8%</Badge>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Social Skills</span>
                    <Badge variant="outline" className="text-secondary">+5%</Badge>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <p className="text-sm text-muted-foreground pt-2">
                  Consistent improvement across all areas. Motor skills showing exceptional growth this week.
                </p>
              </CardContent>
            </Card>
          </div>

          <AIInsightCard
            title="Detected Pattern"
            type="trend"
            insight="Your child shows increased engagement with physical activities on Tuesdays and Thursdays. This pattern has been consistent for the past 3 weeks. Consider scheduling physical therapy sessions on these days for optimal results."
          />
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Upcoming Milestone Predictions
              </CardTitle>
              <CardDescription>AI-estimated achievement dates based on current progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  milestone: "Independent Walking",
                  current: 85,
                  predicted: "2-3 weeks",
                  confidence: "High",
                },
                {
                  milestone: "Two-word Phrases",
                  current: 60,
                  predicted: "4-6 weeks",
                  confidence: "Medium",
                },
                {
                  milestone: "Self-feeding with Spoon",
                  current: 70,
                  predicted: "3-4 weeks",
                  confidence: "High",
                },
              ].map((item) => (
                <div key={item.milestone} className="space-y-2 p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{item.milestone}</h4>
                    <Badge variant="outline" className="gap-1">
                      {item.confidence} confidence
                    </Badge>
                  </div>
                  <Progress value={item.current} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{item.current}% complete</span>
                    <span>Expected: {item.predicted}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <AIInsightCard
            title="Milestone Prediction"
            type="success"
            insight="Based on the current progress rate, your child is likely to achieve independent walking within 2-3 weeks. Continue with daily balance exercises and supported walking practice for best results."
          />
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <AIInsightCard
            title="Focus Area: Communication"
            type="alert"
            insight="Communication skills are progressing slightly slower than other areas. Increase verbal interaction during daily activities, read more picture books together, and practice naming objects during play time."
          />

          <AIInsightCard
            title="Optimal Activity Schedule"
            type="suggestion"
            insight="Schedule physical activities between 2-4 PM when your child shows peak energy and engagement. Reserve morning time for quieter, focus-based activities like reading or puzzles."
          />

          <AIInsightCard
            title="Therapy Session Optimization"
            type="success"
            insight="Your child responds best to 20-minute therapy sessions with 10-minute breaks. Current schedule aligns well with this pattern. Continue with the existing routine."
          />

          <Card>
            <CardHeader>
              <CardTitle className="font-display">Suggested Activities This Week</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                "Interactive story time with emotion cards (15 min daily)",
                "Outdoor playground time focusing on climbing (20 min, 3x/week)",
                "Music and movement sessions (10 min daily)",
                "Sorting and matching games for cognitive development (15 min, 2x/week)",
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{activity}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIInsights;
