import { Link } from "react-router-dom";
import { ArrowLeft, Edit, Calendar, User, Heart, Target, FileText, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useChildProfile } from "@/contexts/ChildProfileContext";

const ChildProfileDetail = () => {
  const { selectedChild } = useChildProfile();

  if (!selectedChild) {
    return (
      <div className="min-h-screen pt-20 md:pt-24 px-4 pb-8">
        <div className="max-w-4xl mx-auto text-center py-20">
          <h1 className="text-2xl font-display font-bold mb-4">No Profile Selected</h1>
          <Button asChild>
            <Link to="/profile-management">Go to Profile Management</Link>
          </Button>
        </div>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getGenderBadge = (gender: string) => {
    const colors = {
      male: "bg-primary text-primary-foreground",
      female: "bg-accent text-accent-foreground",
      other: "bg-secondary text-secondary-foreground",
    };
    return colors[gender as keyof typeof colors] || colors.other;
  };

  return (
    <div className="min-h-screen pt-20 md:pt-24 px-4 pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 animate-fade-in">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        {/* Profile Header Card */}
        <Card className="mb-6 shadow-soft animate-fade-in">
          <CardHeader>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-primary">
                <AvatarImage src={selectedChild.photo} />
                <AvatarFallback className="bg-primary-light text-primary text-3xl font-bold">
                  {getInitials(selectedChild.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <CardTitle className="text-3xl font-display mb-2">
                      {selectedChild.name}
                    </CardTitle>
                    <CardDescription className="text-lg">
                      {selectedChild.age}
                    </CardDescription>
                  </div>
                  <Button asChild>
                    <Link to="/profile-management" className="gap-2">
                      <Edit className="h-4 w-4" />
                      Edit Profile
                    </Link>
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge className={getGenderBadge(selectedChild.gender)}>
                    {selectedChild.gender}
                  </Badge>
                  {selectedChild.assignedCaregiver && (
                    <Badge variant="outline">
                      {selectedChild.assignedCaregiver}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Development Overview */}
        <Card className="mb-6 shadow-soft animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display">
              <Target className="h-5 w-5 text-primary" />
              Development Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-accent-light p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-accent mb-1">85%</div>
                <div className="text-sm text-muted-foreground">Motor Skills</div>
                <Progress value={85} className="mt-2 h-1" />
              </div>
              <div className="bg-primary-light p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-primary mb-1">72%</div>
                <div className="text-sm text-muted-foreground">Speech</div>
                <Progress value={72} className="mt-2 h-1" />
              </div>
              <div className="bg-secondary-light p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-secondary-foreground mb-1">80%</div>
                <div className="text-sm text-muted-foreground">Social</div>
                <Progress value={80} className="mt-2 h-1" />
              </div>
              <div className="bg-muted p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-foreground mb-1">75%</div>
                <div className="text-sm text-muted-foreground">Cognitive</div>
                <Progress value={75} className="mt-2 h-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Information */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Basic Information */}
          <Card className="shadow-soft animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display text-lg">
                <User className="h-5 w-5 text-primary" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Date of Birth</p>
                <p className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {selectedChild.dateOfBirth}
                </p>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Gender</p>
                <p className="capitalize">{selectedChild.gender}</p>
              </div>
              {selectedChild.assignedCaregiver && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Assigned Caregiver
                    </p>
                    <p className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-muted-foreground" />
                      {selectedChild.assignedCaregiver}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Learning Goals */}
          {selectedChild.learningGoals && (
            <Card className="shadow-soft animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display text-lg">
                  <Target className="h-5 w-5 text-primary" />
                  Learning Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{selectedChild.learningGoals}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Special Needs & Medical Notes */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {selectedChild.specialNeeds && (
            <Card className="shadow-soft animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display text-lg">
                  <Heart className="h-5 w-5 text-accent" />
                  Special Needs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{selectedChild.specialNeeds}</p>
              </CardContent>
            </Card>
          )}

          {selectedChild.medicalNotes && (
            <Card className="shadow-soft animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display text-lg">
                  <FileText className="h-5 w-5 text-secondary-foreground" />
                  Medical Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{selectedChild.medicalNotes}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Actions */}
        <Card className="shadow-soft animate-fade-in">
          <CardHeader>
            <CardTitle className="font-display">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
              <Button variant="outline" asChild className="h-auto py-4">
                <Link to="/milestones" className="flex flex-col gap-2">
                  <Target className="h-5 w-5" />
                  <span>Milestones</span>
                </Link>
              </Button>
              <Button variant="outline" asChild className="h-auto py-4">
                <Link to="/journal" className="flex flex-col gap-2">
                  <FileText className="h-5 w-5" />
                  <span>Journal</span>
                </Link>
              </Button>
              <Button variant="outline" asChild className="h-auto py-4">
                <Link to="/appointments" className="flex flex-col gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>Appointments</span>
                </Link>
              </Button>
              <Button variant="outline" asChild className="h-auto py-4">
                <Link to="/training" className="flex flex-col gap-2">
                  <FileText className="h-5 w-5" />
                  <span>Training</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChildProfileDetail;
