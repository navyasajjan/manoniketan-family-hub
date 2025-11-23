import { useState } from "react";
import { Play, FileText, Download, Clock, BookOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Resource {
  id: string;
  title: string;
  type: "video" | "pdf";
  category: string;
  duration?: string;
  pages?: number;
  thumbnail: string;
  description: string;
}

const TrainingLibrary = () => {
  const categories = [
    "Home Therapy",
    "Feeding Skills",
    "Sensory Play",
    "Communication",
    "Behavior Management",
  ];

  const [resources] = useState<Resource[]>([
    {
      id: "1",
      title: "Basic Home Therapy Techniques",
      type: "video",
      category: "Home Therapy",
      duration: "15 min",
      thumbnail: "/placeholder.svg",
      description: "Learn foundational therapy exercises you can do at home with your child",
    },
    {
      id: "2",
      title: "Feeding Skills Development Guide",
      type: "pdf",
      category: "Feeding Skills",
      pages: 12,
      thumbnail: "/placeholder.svg",
      description: "Comprehensive guide to improving your child's eating and feeding abilities",
    },
    {
      id: "3",
      title: "Sensory Play Activities",
      type: "video",
      category: "Sensory Play",
      duration: "20 min",
      thumbnail: "/placeholder.svg",
      description: "Fun and engaging sensory activities to support development",
    },
    {
      id: "4",
      title: "Building Communication Skills",
      type: "video",
      category: "Communication",
      duration: "18 min",
      thumbnail: "/placeholder.svg",
      description: "Strategies to enhance your child's language and communication",
    },
    {
      id: "5",
      title: "Positive Behavior Strategies",
      type: "pdf",
      category: "Behavior Management",
      pages: 15,
      thumbnail: "/placeholder.svg",
      description: "Evidence-based approaches to managing challenging behaviors",
    },
    {
      id: "6",
      title: "Daily Routine Structures",
      type: "video",
      category: "Home Therapy",
      duration: "12 min",
      thumbnail: "/placeholder.svg",
      description: "Creating predictable and supportive daily routines",
    },
  ]);

  return (
    <div className="min-h-screen pt-20 md:pt-24 px-4 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Training Library 📚
          </h1>
          <p className="text-muted-foreground">
            Learn evidence-based techniques to support your child's development
          </p>
        </div>

        <Tabs defaultValue="Home Therapy" className="space-y-6">
          <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto gap-2">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="whitespace-nowrap">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="space-y-4 animate-fade-in">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources
                  .filter((r) => r.category === category)
                  .map((resource) => (
                    <Card key={resource.id} className="shadow-soft hover-lift overflow-hidden">
                      <div className="relative aspect-video bg-muted">
                        <div className="absolute inset-0 flex items-center justify-center">
                          {resource.type === "video" ? (
                            <div className="p-4 bg-primary rounded-full">
                              <Play className="h-8 w-8 text-primary-foreground" />
                            </div>
                          ) : (
                            <div className="p-4 bg-accent rounded-full">
                              <FileText className="h-8 w-8 text-accent-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="absolute top-3 right-3">
                          <Badge
                            className={
                              resource.type === "video"
                                ? "bg-primary text-primary-foreground"
                                : "bg-accent text-accent-foreground"
                            }
                          >
                            {resource.type === "video" ? (
                              <>
                                <Clock className="h-3 w-3 mr-1" />
                                {resource.duration}
                              </>
                            ) : (
                              <>
                                <BookOpen className="h-3 w-3 mr-1" />
                                {resource.pages} pages
                              </>
                            )}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="font-display line-clamp-2">{resource.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2">
                          {resource.type === "video" ? (
                            <Button className="flex-1">
                              <Play className="h-4 w-4 mr-1" />
                              Watch
                            </Button>
                          ) : (
                            <>
                              <Button className="flex-1">
                                <FileText className="h-4 w-4 mr-1" />
                                Read
                              </Button>
                              <Button variant="outline" size="icon">
                                <Download className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <Card className="mt-8 shadow-soft gradient-warm">
          <CardHeader>
            <CardTitle className="font-display text-secondary-foreground">
              💡 Using the Training Library
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-card-foreground">
              <li>• All resources are reviewed and approved by certified therapists</li>
              <li>• Practice techniques regularly for best results</li>
              <li>• Feel free to discuss any questions with your therapist</li>
              <li>• New resources are added monthly based on parent feedback</li>
              <li>• You can download PDFs for offline access</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrainingLibrary;
