import { useState } from "react";
import { GraduationCap, Play, BookOpen, Sparkles, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import AIInsightCard from "@/components/AIInsightCard";

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessons: number;
  progress: number;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  recommended?: boolean;
}

const AITraining = () => {
  const [courses] = useState<Course[]>([
    {
      id: "1",
      title: "Understanding Early Motor Development",
      description: "Learn the fundamentals of motor skill development in children aged 0-3 years",
      duration: "2 hours",
      lessons: 8,
      progress: 65,
      category: "Motor Skills",
      difficulty: "Beginner",
      recommended: true,
    },
    {
      id: "2",
      title: "Communication Strategies for Non-Verbal Children",
      description: "Effective techniques to support language development and alternative communication",
      duration: "1.5 hours",
      lessons: 6,
      progress: 30,
      category: "Speech & Language",
      difficulty: "Intermediate",
      recommended: true,
    },
    {
      id: "3",
      title: "Sensory Processing Basics",
      description: "Understanding sensory needs and how to create supportive environments",
      duration: "1 hour",
      lessons: 5,
      progress: 0,
      category: "Sensory Development",
      difficulty: "Beginner",
    },
    {
      id: "4",
      title: "Managing Challenging Behaviors",
      description: "Positive behavior support strategies for parents and caregivers",
      duration: "2.5 hours",
      lessons: 10,
      progress: 0,
      category: "Behavioral Support",
      difficulty: "Advanced",
    },
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-primary/10 text-primary";
      case "Intermediate":
        return "bg-accent/10 text-accent";
      case "Advanced":
        return "bg-secondary/10 text-secondary";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-display font-bold gradient-text mb-2">AI Training Center</h1>
        <p className="text-muted-foreground">
          Personalized learning paths powered by AI based on your child's needs
        </p>
      </div>

      {/* Learning Progress Summary */}
      <Card className="gradient-soft border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-display flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-primary" />
                Your Learning Journey
              </CardTitle>
              <CardDescription className="mt-2">
                Complete courses to better support your child's development
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-3xl font-display font-bold gradient-text">45%</div>
              <p className="text-sm text-muted-foreground">Overall Progress</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={45} className="h-3" />
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="text-center">
              <div className="text-2xl font-bold">12</div>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">4</div>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">8h</div>
              <p className="text-sm text-muted-foreground">Time Invested</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <div className="space-y-4">
        <h2 className="text-2xl font-display font-bold flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          AI Recommended for You
        </h2>
        
        <AIInsightCard
          title="Learning Path Suggestion"
          type="suggestion"
          insight="Based on your child's current milestone focus, we recommend completing the 'Understanding Early Motor Development' course. This will help you better support their progress in walking and balance activities."
        />

        <AIInsightCard
          title="Quick Win Opportunity"
          type="success"
          insight="You're 65% through the Motor Development course! Complete it this week to unlock advanced techniques that align perfectly with your child's current stage."
        />
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="hover-lift">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <CardTitle className="font-display text-xl">{course.title}</CardTitle>
                    {course.recommended && (
                      <Badge variant="outline" className="gap-1 bg-primary/10 text-primary shrink-0">
                        <Sparkles className="h-3 w-3" />
                        Recommended
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="gap-1">
                      <Clock className="h-3 w-3" />
                      {course.duration}
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <BookOpen className="h-3 w-3" />
                      {course.lessons} lessons
                    </Badge>
                    <Badge className={getDifficultyColor(course.difficulty)}>
                      {course.difficulty}
                    </Badge>
                    <Badge variant="secondary">
                      {course.category}
                    </Badge>
                  </div>

                  {course.progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    {course.progress > 0 ? (
                      <Button className="flex-1 gap-2">
                        <Play className="h-4 w-4" />
                        Continue
                      </Button>
                    ) : (
                      <Button className="flex-1 gap-2">
                        <Play className="h-4 w-4" />
                        Start Course
                      </Button>
                    )}
                    <Button variant="outline" size="icon">
                      <BookOpen className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommended">
          <div className="grid md:grid-cols-2 gap-6">
            {courses.filter((c) => c.recommended).map((course) => (
              <Card key={course.id} className="hover-lift">
                <CardHeader>
                  <CardTitle className="font-display">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full gap-2">
                    <Play className="h-4 w-4" />
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="in-progress">
          <div className="grid md:grid-cols-2 gap-6">
            {courses.filter((c) => c.progress > 0 && c.progress < 100).map((course) => (
              <Card key={course.id} className="hover-lift">
                <CardHeader>
                  <CardTitle className="font-display">{course.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Progress value={course.progress} className="h-2" />
                  <Button className="w-full gap-2">
                    <Play className="h-4 w-4" />
                    Continue Learning
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <p className="text-center text-muted-foreground py-8">
            No completed courses yet. Keep learning!
          </p>
        </TabsContent>
      </Tabs>

      {/* Expert Instructors */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display">Meet Your AI-Selected Instructors</CardTitle>
          <CardDescription>
            Expert therapists and specialists chosen based on your child's development profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Dr. Sarah Johnson",
                specialty: "Pediatric Physical Therapy",
                courses: 12,
              },
              {
                name: "Michael Chen",
                specialty: "Speech-Language Pathology",
                courses: 8,
              },
              {
                name: "Emily Rodriguez",
                specialty: "Occupational Therapy",
                courses: 15,
              },
            ].map((instructor, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {instructor.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-medium">{instructor.name}</h4>
                  <p className="text-sm text-muted-foreground">{instructor.specialty}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {instructor.courses} courses
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AITraining;
