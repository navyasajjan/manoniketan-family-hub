import { useState } from "react";
import { Wand2, Clock, Target, Users, Sparkles, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

interface Activity {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  ageRange: string;
  materials: string[];
  steps: string[];
}

const ActivityGenerator = () => {
  const [generating, setGenerating] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      title: "Rainbow Sensory Bottles",
      description: "Create colorful sensory bottles to help with visual tracking and calming",
      duration: "15-20 min",
      difficulty: "easy",
      category: "Sensory Development",
      ageRange: "12-24 months",
      materials: ["Clear plastic bottles", "Water", "Food coloring", "Glitter", "Small toys"],
      steps: [
        "Fill bottle 3/4 with water",
        "Add 2-3 drops of food coloring",
        "Add glitter and small waterproof toys",
        "Seal tightly and shake together",
        "Let child observe the swirling colors",
      ],
    },
    {
      id: "2",
      title: "Balance Beam Walking",
      description: "Practice balance and coordination with a simple walking exercise",
      duration: "10-15 min",
      difficulty: "medium",
      category: "Motor Skills",
      ageRange: "18-36 months",
      materials: ["Masking tape or rope", "Soft surface or mat"],
      steps: [
        "Create a straight line on the floor with tape",
        "Hold child's hand for support",
        "Walk along the line heel-to-toe",
        "Practice turning around at the end",
        "Gradually reduce hand support as confidence grows",
      ],
    },
    {
      id: "3",
      title: "Emotion Matching Game",
      description: "Help develop emotional recognition through interactive play",
      duration: "10 min",
      difficulty: "easy",
      category: "Social-Emotional",
      ageRange: "24-36 months",
      materials: ["Emotion flashcards", "Mirror", "Picture books"],
      steps: [
        "Show emotion card (happy, sad, surprised)",
        "Make the expression yourself",
        "Have child mirror the expression",
        "Name the emotion together",
        "Find the emotion in picture books",
      ],
    },
  ]);

  const handleGenerate = () => {
    setGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const newActivity: Activity = {
        id: Date.now().toString(),
        title: "Musical Shape Sorting",
        description: "Combine music and cognitive skills by sorting shapes to different rhythms",
        duration: "15 min",
        difficulty: "medium",
        category: "Cognitive Development",
        ageRange: "18-30 months",
        materials: ["Shape sorter toy", "Musical instruments or app", "Colorful shapes"],
        steps: [
          "Play a slow rhythm for large shapes",
          "Switch to fast rhythm for small shapes",
          "Name each shape as child places it",
          "Celebrate successful sorting with music",
          "Let child choose their favorite shape to repeat",
        ],
      };
      
      setActivities([newActivity, ...activities]);
      setGenerating(false);
      
      toast({
        title: "New Activity Generated!",
        description: "A personalized activity has been created based on your child's progress.",
      });
    }, 2000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-primary/10 text-primary";
      case "medium":
        return "bg-accent/10 text-accent";
      case "hard":
        return "bg-secondary/10 text-secondary";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-display font-bold gradient-text mb-2">Activity Generator</h1>
        <p className="text-muted-foreground">
          AI-powered personalized activities based on your child's development stage
        </p>
      </div>

      {/* Generator Card */}
      <Card className="gradient-soft border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-display flex items-center gap-2">
                <Wand2 className="h-6 w-6 text-primary" />
                Generate New Activity
              </CardTitle>
              <CardDescription className="mt-2">
                Our AI analyzes your child's current milestones and progress to suggest the perfect activities
              </CardDescription>
            </div>
            <Button
              onClick={handleGenerate}
              disabled={generating}
              className="gap-2"
              size="lg"
            >
              {generating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate
                </>
              )}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Activities List */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Activities</TabsTrigger>
          <TabsTrigger value="motor">Motor Skills</TabsTrigger>
          <TabsTrigger value="cognitive">Cognitive</TabsTrigger>
          <TabsTrigger value="social">Social-Emotional</TabsTrigger>
          <TabsTrigger value="sensory">Sensory</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid gap-6">
            {activities.map((activity) => (
              <Card key={activity.id} className="hover-lift">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="font-display">{activity.title}</CardTitle>
                        <Badge variant="outline" className="gap-1 bg-background/50">
                          <Sparkles className="h-3 w-3" />
                          AI
                        </Badge>
                      </div>
                      <CardDescription>{activity.description}</CardDescription>
                    </div>
                    <Badge className={getDifficultyColor(activity.difficulty)}>
                      {activity.difficulty}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="outline" className="gap-1">
                      <Clock className="h-3 w-3" />
                      {activity.duration}
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <Target className="h-3 w-3" />
                      {activity.category}
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <Users className="h-3 w-3" />
                      {activity.ageRange}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Materials Needed
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activity.materials.map((material, index) => (
                        <Badge key={index} variant="secondary">
                          {material}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Step-by-Step Instructions
                    </h4>
                    <ol className="space-y-2">
                      {activity.steps.map((step, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-sm font-medium shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-sm text-muted-foreground pt-0.5">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="default" className="gap-2">
                      Start Activity
                    </Button>
                    <Button variant="outline" className="gap-2">
                      Save for Later
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="motor">
          <p className="text-center text-muted-foreground py-8">
            Filter activities by category to see motor skills activities
          </p>
        </TabsContent>

        <TabsContent value="cognitive">
          <p className="text-center text-muted-foreground py-8">
            Filter activities by category to see cognitive development activities
          </p>
        </TabsContent>

        <TabsContent value="social">
          <p className="text-center text-muted-foreground py-8">
            Filter activities by category to see social-emotional activities
          </p>
        </TabsContent>

        <TabsContent value="sensory">
          <p className="text-center text-muted-foreground py-8">
            Filter activities by category to see sensory development activities
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ActivityGenerator;
