import { Link } from "react-router-dom";
import { Activity, Calendar, BookOpen, Users, FileText, TrendingUp, Bell, Upload, Stethoscope, Sparkles, UserPlus } from "lucide-react";
import AIInsightCard from "@/components/AIInsightCard";
import AIAssistant from "@/components/AIAssistant";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChildProfile } from "@/contexts/ChildProfileContext";

const Index = () => {
  const { selectedChild, children } = useChildProfile();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (!selectedChild) {
    return (
      <div className="min-h-screen pt-20 md:pt-24 px-4 pb-8">
        <div className="max-w-4xl mx-auto text-center py-20 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Welcome to Your Parenting Dashboard! 👋
          </h1>
          <p className="text-muted-foreground mb-8 text-lg">
            Get started by creating your first child profile to track their development journey
          </p>
          <Button asChild size="lg" className="gap-2">
            <Link to="/profile-management">
              <UserPlus className="h-5 w-5" />
              Create Child Profile
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen pt-20 md:pt-24 px-4 pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                Welcome back, Parent! 👋
              </h1>
              <p className="text-muted-foreground">Track your child's journey and access support resources</p>
            </div>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-secondary rounded-full text-xs flex items-center justify-center text-secondary-foreground">
                3
              </span>
            </Button>
          </div>
        </div>

        {/* Child Info Card */}
        <Card className="mb-8 shadow-soft hover-lift">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary">
                <AvatarImage src={selectedChild.photo} />
                <AvatarFallback className="bg-primary-light text-primary text-xl font-bold">
                  {getInitials(selectedChild.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-xl font-display">{selectedChild.name}</CardTitle>
                <CardDescription className="text-base">Age: {selectedChild.age}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/profile-detail">View Full Profile</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/profile-management">Manage</Link>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Overall Development</span>
                  <span className="font-semibold text-primary">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
                <div className="bg-accent-light p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-accent">85%</div>
                  <div className="text-xs text-muted-foreground">Motor Skills</div>
                </div>
                <div className="bg-primary-light p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">72%</div>
                  <div className="text-xs text-muted-foreground">Speech</div>
                </div>
                <div className="bg-secondary-light p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-secondary-foreground">80%</div>
                  <div className="text-xs text-muted-foreground">Social</div>
                </div>
                <div className="bg-muted p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-foreground">75%</div>
                  <div className="text-xs text-muted-foreground">Cognitive</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* All Children Profiles Section */}
        {children.length > 1 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-display font-bold flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                All Children
              </h2>
              <Button variant="outline" size="sm" asChild>
                <Link to="/profile-management">
                  Manage All
                </Link>
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
              {children.map((child) => (
                <Card
                  key={child.id}
                  className={`shadow-soft hover-lift cursor-pointer transition-smooth ${
                    child.id === selectedChild?.id ? 'border-2 border-primary' : ''
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 border border-border">
                        <AvatarImage src={child.photo} />
                        <AvatarFallback className="bg-primary-light text-primary">
                          {getInitials(child.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{child.name}</h3>
                        <p className="text-sm text-muted-foreground">{child.age}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button
                        variant={child.id === selectedChild?.id ? "default" : "outline"}
                        size="sm"
                        className="flex-1"
                        asChild
                      >
                        <Link to={`/?childId=${child.id}`}>
                          {child.id === selectedChild?.id ? "Current" : "Switch"}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Card className="shadow-soft hover-lift cursor-pointer border-2 border-dashed hover:border-primary transition-smooth">
                <Link to="/profile-management" className="block h-full">
                  <CardContent className="flex flex-col items-center justify-center h-full py-8">
                    <UserPlus className="h-12 w-12 text-muted-foreground mb-2" />
                    <p className="font-medium">Add Child Profile</p>
                  </CardContent>
                </Link>
              </Card>
            </div>
          </div>
        )}

        {/* AI Insights Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-display font-bold mb-4 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-secondary" />
            AI Insights
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <AIInsightCard
              title="Progress Alert"
              type="success"
              insight={`Great news! ${selectedChild.name} has achieved 3 new milestones this month. Communication skills are showing excellent improvement with consistent therapy sessions.`}
              action={{
                label: "View Details",
                onClick: () => {},
              }}
            />
            <AIInsightCard
              title="Therapy Recommendation"
              type="suggestion"
              insight={`Based on recent journal entries, increasing sensory play activities by 15 minutes daily could help with focus. ${selectedChild.assignedCaregiver ? `Consider scheduling a consultation with ${selectedChild.assignedCaregiver}.` : 'Consider consulting with a therapist.'}`}
              action={{
                label: "Explore Activities",
                onClick: () => {},
              }}
            />
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Link to="/screening" className="block">
            <Card className="shadow-soft hover-lift cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary-light rounded-xl">
                    <Stethoscope className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-display">Screening Tools</CardTitle>
                    <CardDescription>Early detection assessments</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/milestones" className="block">
            <Card className="shadow-soft hover-lift cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-accent-light rounded-xl">
                    <Activity className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-display">Milestone Tracker</CardTitle>
                    <CardDescription>Monitor developmental progress</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/appointments" className="block">
            <Card className="shadow-soft hover-lift cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-secondary-light rounded-xl">
                    <Calendar className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-display">Book Appointment</CardTitle>
                    <CardDescription>Schedule therapy sessions</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/training" className="block">
            <Card className="shadow-soft hover-lift cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary-light rounded-xl">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-display">Training Library</CardTitle>
                    <CardDescription>Learn therapy techniques</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/community" className="block">
            <Card className="shadow-soft hover-lift cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-accent-light rounded-xl">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-display">Community</CardTitle>
                    <CardDescription>Connect with other parents</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/journal" className="block">
            <Card className="shadow-soft hover-lift cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-secondary-light rounded-xl">
                    <FileText className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-display">Daily Journal</CardTitle>
                    <CardDescription>Log daily activities</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display">
                <TrendingUp className="h-5 w-5 text-primary" />
                Recent Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-accent-light rounded-lg">
                <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold">
                  ✓
                </div>
                <div className="flex-1">
                  <p className="font-medium">Walked 10 steps independently</p>
                  <p className="text-sm text-muted-foreground">2 days ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-primary-light rounded-lg">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  ✓
                </div>
                <div className="flex-1">
                  <p className="font-medium">Said first two-word phrase</p>
                  <p className="text-sm text-muted-foreground">5 days ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-secondary-light rounded-lg">
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold">
                  ✓
                </div>
                <div className="flex-1">
                  <p className="font-medium">Completed puzzle activity</p>
                  <p className="text-sm text-muted-foreground">1 week ago</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display">
                <Upload className="h-5 w-5 text-primary" />
                Quick Upload
              </CardTitle>
              <CardDescription>Upload prescriptions, reports, or progress videos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-smooth cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">Drag and drop files here</p>
                <Button variant="outline" size="sm">
                  Choose Files
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <AIAssistant />
    </div>
  );
};

export default Index;
