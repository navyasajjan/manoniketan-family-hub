import { useState } from "react";
import { Check, Circle, Flag } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type MilestoneStatus = "achieved" | "pending" | "concern";

interface Milestone {
  id: string;
  title: string;
  description: string;
  status: MilestoneStatus;
  ageRange: string;
}

const MilestoneTracker = () => {
  const [milestones] = useState<Record<string, Milestone[]>>({
    "0-6": [
      { id: "1", title: "Smiles at people", description: "Responds to social interaction", status: "achieved", ageRange: "0-6 months" },
      { id: "2", title: "Holds head steady", description: "Can support own head", status: "achieved", ageRange: "0-6 months" },
      { id: "3", title: "Brings hands to mouth", description: "Self-soothing behavior", status: "achieved", ageRange: "0-6 months" },
      { id: "4", title: "Responds to sounds", description: "Turns toward voices", status: "pending", ageRange: "0-6 months" },
    ],
    "6-12": [
      { id: "5", title: "Sits without support", description: "Can sit independently", status: "achieved", ageRange: "6-12 months" },
      { id: "6", title: "Babbles with expression", description: "Makes varied sounds", status: "achieved", ageRange: "6-12 months" },
      { id: "7", title: "Responds to own name", description: "Looks when called", status: "pending", ageRange: "6-12 months" },
      { id: "8", title: "Shows stranger anxiety", description: "Recognizes familiar faces", status: "concern", ageRange: "6-12 months" },
    ],
    "12-24": [
      { id: "9", title: "Walks independently", description: "Takes steps without support", status: "achieved", ageRange: "12-24 months" },
      { id: "10", title: "Says 2-3 words", description: "Uses simple words", status: "pending", ageRange: "12-24 months" },
      { id: "11", title: "Points to objects", description: "Shows interest in things", status: "achieved", ageRange: "12-24 months" },
      { id: "12", title: "Imitates behaviors", description: "Copies actions", status: "pending", ageRange: "12-24 months" },
    ],
    "24-36": [
      { id: "13", title: "Speaks in sentences", description: "Uses 2-3 word phrases", status: "pending", ageRange: "24-36 months" },
      { id: "14", title: "Runs easily", description: "Good motor coordination", status: "achieved", ageRange: "24-36 months" },
      { id: "15", title: "Plays simple pretend", description: "Engages in imaginative play", status: "pending", ageRange: "24-36 months" },
      { id: "16", title: "Follows instructions", description: "Understands simple directions", status: "concern", ageRange: "24-36 months" },
    ],
  });

  const getStatusIcon = (status: MilestoneStatus) => {
    switch (status) {
      case "achieved":
        return <Check className="h-5 w-5 text-primary" />;
      case "concern":
        return <Flag className="h-5 w-5 text-destructive" />;
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: MilestoneStatus) => {
    switch (status) {
      case "achieved":
        return <Badge className="bg-primary text-primary-foreground">Achieved</Badge>;
      case "concern":
        return <Badge variant="destructive">Needs Attention</Badge>;
      default:
        return <Badge variant="outline">In Progress</Badge>;
    }
  };

  return (
    <div className="min-h-screen pt-20 md:pt-24 px-4 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Milestone Tracker 📊
          </h1>
          <p className="text-muted-foreground">Monitor your child's developmental progress across age groups</p>
        </div>

        <Tabs defaultValue="0-6" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="0-6">0-6m</TabsTrigger>
            <TabsTrigger value="6-12">6-12m</TabsTrigger>
            <TabsTrigger value="12-24">12-24m</TabsTrigger>
            <TabsTrigger value="24-36">24-36m</TabsTrigger>
          </TabsList>

          {Object.entries(milestones).map(([ageGroup, items]) => (
            <TabsContent key={ageGroup} value={ageGroup} className="space-y-4 animate-fade-in">
              <Card className="shadow-soft mb-4">
                <CardHeader>
                  <CardTitle className="font-display">Age Range: {items[0]?.ageRange}</CardTitle>
                  <CardDescription>
                    {items.filter(m => m.status === "achieved").length} of {items.length} milestones achieved
                  </CardDescription>
                </CardHeader>
              </Card>

              <div className="space-y-4">
                {items.map((milestone, index) => (
                  <Card key={milestone.id} className="shadow-soft hover-lift">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <div className={`
                            h-12 w-12 rounded-full flex items-center justify-center
                            ${milestone.status === "achieved" ? "bg-primary-light" : ""}
                            ${milestone.status === "concern" ? "bg-destructive/10" : ""}
                            ${milestone.status === "pending" ? "bg-muted" : ""}
                          `}>
                            {getStatusIcon(milestone.status)}
                          </div>
                          {index < items.length - 1 && (
                            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-border" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <CardTitle className="text-lg font-display">{milestone.title}</CardTitle>
                            {getStatusBadge(milestone.status)}
                          </div>
                          <CardDescription className="text-base">{milestone.description}</CardDescription>
                          <div className="flex gap-2 mt-4">
                            {milestone.status !== "achieved" && (
                              <Button size="sm" variant="outline">
                                <Check className="h-4 w-4 mr-1" />
                                Mark as Achieved
                              </Button>
                            )}
                            {milestone.status === "pending" && (
                              <Button size="sm" variant="outline">
                                <Flag className="h-4 w-4 mr-1" />
                                Flag Concern
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <Card className="mt-8 shadow-soft bg-accent-light border-accent">
          <CardHeader>
            <CardTitle className="font-display text-accent">💡 Tips for Parents</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-card-foreground">
              <li>• Every child develops at their own pace - these are general guidelines</li>
              <li>• Regular tracking helps identify areas that may need support</li>
              <li>• Celebrate every achievement, no matter how small</li>
              <li>• Consult with your therapist if you have concerns about any milestone</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MilestoneTracker;
