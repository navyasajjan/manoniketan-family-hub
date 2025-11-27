import { useState } from "react";
import { Plus, TrendingUp, Smile, Frown, Meh, Utensils, Moon, Baby, Sparkles } from "lucide-react";
import AIInsightCard from "@/components/AIInsightCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

interface JournalEntry {
  id: string;
  date: string;
  mood: "happy" | "neutral" | "sad";
  sleep: number;
  meals: number;
  activities: string[];
  notes: string;
}

const DailyJournal = () => {
  const [isNewEntryOpen, setIsNewEntryOpen] = useState(false);
  const [entryDate, setEntryDate] = useState(new Date().toISOString().split('T')[0]);
  const [entryMood, setEntryMood] = useState<"happy" | "neutral" | "sad">("happy");
  const [entrySleep, setEntrySleep] = useState([8]);
  const [entryMeals, setEntryMeals] = useState(3);
  const [entryActivities, setEntryActivities] = useState("");
  const [entryNotes, setEntryNotes] = useState("");

  const [entries] = useState<JournalEntry[]>([
    {
      id: "1",
      date: "Today",
      mood: "happy",
      sleep: 8,
      meals: 3,
      activities: ["Therapy Session", "Outdoor Play", "Reading"],
      notes: "Great progress with speech exercises today!",
    },
    {
      id: "2",
      date: "Yesterday",
      mood: "neutral",
      sleep: 7,
      meals: 2,
      activities: ["Sensory Play", "Art Activity"],
      notes: "A bit tired but still engaged in activities.",
    },
    {
      id: "3",
      date: "2 days ago",
      mood: "happy",
      sleep: 9,
      meals: 3,
      activities: ["Therapy Session", "Music Time", "Park Visit"],
      notes: "Excellent day! Very responsive and happy.",
    },
  ]);

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case "happy":
        return <Smile className="h-6 w-6 text-primary" />;
      case "sad":
        return <Frown className="h-6 w-6 text-destructive" />;
      default:
        return <Meh className="h-6 w-6 text-secondary-foreground" />;
    }
  };

  const getMoodBadge = (mood: string) => {
    switch (mood) {
      case "happy":
        return <Badge className="bg-primary text-primary-foreground">Happy</Badge>;
      case "sad":
        return <Badge variant="destructive">Needs Support</Badge>;
      default:
        return <Badge className="bg-secondary text-secondary-foreground">Neutral</Badge>;
    }
  };

  const handleCreateEntry = () => {
    // Handle entry creation logic here
    const activities = entryActivities.split(',').map(a => a.trim()).filter(Boolean);
    console.log({
      date: entryDate,
      mood: entryMood,
      sleep: entrySleep[0],
      meals: entryMeals,
      activities,
      notes: entryNotes
    });
    setIsNewEntryOpen(false);
    setEntryDate(new Date().toISOString().split('T')[0]);
    setEntryMood("happy");
    setEntrySleep([8]);
    setEntryMeals(3);
    setEntryActivities("");
    setEntryNotes("");
  };

  return (
    <div className="min-h-screen pt-20 md:pt-24 px-4 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 animate-fade-in flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              Daily Journal 📝
            </h1>
            <p className="text-muted-foreground">Track daily patterns and behaviors</p>
          </div>
          <Dialog open={isNewEntryOpen} onOpenChange={setIsNewEntryOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
              <DialogHeader>
                <DialogTitle className="font-display">New Daily Entry</DialogTitle>
                <DialogDescription>
                  Track your child's daily activities, mood, and progress
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4 overflow-y-auto flex-1">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={entryDate}
                    onChange={(e) => setEntryDate(e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Mood</Label>
                  <RadioGroup value={entryMood} onValueChange={(value) => setEntryMood(value as "happy" | "neutral" | "sad")}>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="happy" id="happy" />
                        <Label htmlFor="happy" className="flex items-center gap-2 cursor-pointer">
                          <Smile className="h-5 w-5 text-primary" />
                          Happy
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="neutral" id="neutral" />
                        <Label htmlFor="neutral" className="flex items-center gap-2 cursor-pointer">
                          <Meh className="h-5 w-5 text-secondary-foreground" />
                          Neutral
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sad" id="sad" />
                        <Label htmlFor="sad" className="flex items-center gap-2 cursor-pointer">
                          <Frown className="h-5 w-5 text-destructive" />
                          Sad
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sleep" className="flex items-center gap-2">
                      <Moon className="h-4 w-4 text-accent" />
                      Sleep Hours
                    </Label>
                    <span className="text-2xl font-bold text-accent">{entrySleep[0]}h</span>
                  </div>
                  <Slider
                    id="sleep"
                    min={0}
                    max={12}
                    step={0.5}
                    value={entrySleep}
                    onValueChange={setEntrySleep}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meals" className="flex items-center gap-2">
                    <Utensils className="h-4 w-4 text-primary" />
                    Number of Meals
                  </Label>
                  <Input
                    id="meals"
                    type="number"
                    min="0"
                    max="10"
                    value={entryMeals}
                    onChange={(e) => setEntryMeals(Number(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activities" className="flex items-center gap-2">
                    <Baby className="h-4 w-4 text-secondary-foreground" />
                    Activities
                  </Label>
                  <Input
                    id="activities"
                    placeholder="Therapy Session, Outdoor Play, Reading (comma-separated)"
                    value={entryActivities}
                    onChange={(e) => setEntryActivities(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Separate activities with commas</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="How was the day? Any observations or special moments..."
                    className="min-h-[100px]"
                    value={entryNotes}
                    onChange={(e) => setEntryNotes(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 border-t pt-4 mt-4 bg-background">
                <Button variant="outline" onClick={() => setIsNewEntryOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateEntry}>
                  Save Entry
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="entries" className="space-y-6">
          <TabsList className="grid grid-cols-2 max-w-md">
            <TabsTrigger value="entries">Journal Entries</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="entries" className="space-y-4 animate-fade-in">
            <AIInsightCard
              title="Pattern Detected"
              type="trend"
              insight="Your child's sleep patterns have improved by 35% this month. Evening sensory activities seem to correlate with better sleep quality. Continue the 7 PM routine!"
              action={{
                label: "View Trends",
                onClick: () => {},
              }}
            />
            {entries.map((entry) => (
              <Card key={entry.id} className="shadow-soft hover-lift">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="font-display">{entry.date}</CardTitle>
                      <CardDescription className="mt-1">Daily Summary</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {getMoodIcon(entry.mood)}
                      {getMoodBadge(entry.mood)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-accent-light p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Moon className="h-4 w-4 text-accent" />
                        <span className="text-sm font-medium text-accent">Sleep</span>
                      </div>
                      <p className="text-2xl font-bold text-accent">{entry.sleep}h</p>
                    </div>
                    <div className="bg-primary-light p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Utensils className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-primary">Meals</span>
                      </div>
                      <p className="text-2xl font-bold text-primary">{entry.meals}</p>
                    </div>
                    <div className="bg-secondary-light p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Baby className="h-4 w-4 text-secondary-foreground" />
                        <span className="text-sm font-medium text-secondary-foreground">Activities</span>
                      </div>
                      <p className="text-2xl font-bold text-secondary-foreground">{entry.activities.length}</p>
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Smile className="h-4 w-4 text-foreground" />
                        <span className="text-sm font-medium text-foreground">Mood</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground capitalize">{entry.mood}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Activities:</p>
                    <div className="flex flex-wrap gap-2">
                      {entry.activities.map((activity) => (
                        <Badge key={activity} variant="outline">
                          {activity}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {entry.notes && (
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm font-medium text-muted-foreground mb-1">Notes:</p>
                      <p className="text-foreground">{entry.notes}</p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="insights" className="space-y-6 animate-fade-in">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Weekly Patterns
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Sleep Pattern</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Average Sleep</span>
                      <span className="font-bold text-primary">8.2 hours</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-[82%] bg-primary rounded-full"></div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      📈 Sleep duration has improved by 15% this week
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Mood Trend</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-primary-light p-3 rounded-lg text-center">
                      <Smile className="h-6 w-6 text-primary mx-auto mb-1" />
                      <p className="text-2xl font-bold text-primary">5</p>
                      <p className="text-xs text-muted-foreground">Happy days</p>
                    </div>
                    <div className="bg-secondary-light p-3 rounded-lg text-center">
                      <Meh className="h-6 w-6 text-secondary-foreground mx-auto mb-1" />
                      <p className="text-2xl font-bold text-secondary-foreground">2</p>
                      <p className="text-xs text-muted-foreground">Neutral days</p>
                    </div>
                    <div className="bg-muted p-3 rounded-lg text-center">
                      <Frown className="h-6 w-6 text-foreground mx-auto mb-1" />
                      <p className="text-2xl font-bold text-foreground">0</p>
                      <p className="text-xs text-muted-foreground">Difficult days</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Activity Insights</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-accent-light rounded-lg">
                      <span className="text-sm">Most engaging activity</span>
                      <Badge className="bg-accent text-accent-foreground">Therapy Session</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-primary-light rounded-lg">
                      <span className="text-sm">Best time for activities</span>
                      <Badge className="bg-primary text-primary-foreground">Morning</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft bg-secondary-light border-secondary">
              <CardHeader>
                <CardTitle className="text-secondary-foreground font-display">
                  💡 Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-card-foreground">
                  <li>• Current sleep pattern is excellent - maintain bedtime routine</li>
                  <li>• Consider adding more sensory activities in the afternoon</li>
                  <li>• Positive mood trend suggests current strategies are working well</li>
                  <li>• Schedule therapy sessions in the morning for best engagement</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DailyJournal;
