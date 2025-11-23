import { Link } from "react-router-dom";
import { Activity, Calendar, BookOpen, Users, FileText, TrendingUp, Bell, Upload, Stethoscope } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Index = () => {
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
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-primary-light text-primary text-xl font-bold">A</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-xl font-display">Aarav Kumar</CardTitle>
                <CardDescription className="text-base">Age: 3 years 5 months</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/milestones">View Profile</Link>
              </Button>
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
    </div>
  );
};

export default Index;
