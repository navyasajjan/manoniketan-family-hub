import { ReactNode } from "react";
import { ChildProfile } from "@/contexts/ChildProfileContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface ChildProfileCardProps {
  profile: ChildProfile;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  quickActions?: ReactNode;
}

const ChildProfileCard = ({ 
  profile, 
  onView, 
  onEdit, 
  onDelete,
  quickActions 
}: ChildProfileCardProps) => {
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
    <Card className="shadow-soft hover-lift transition-smooth overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary">
            <AvatarImage src={profile.photo} alt={profile.name} />
            <AvatarFallback className="bg-primary-light text-primary text-xl font-bold">
              {getInitials(profile.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-lg text-foreground truncate">
              {profile.name}
            </h3>
            <p className="text-sm text-muted-foreground">{profile.age}</p>
            <div className="flex gap-2 mt-2">
              <Badge className={getGenderBadge(profile.gender)}>
                {profile.gender}
              </Badge>
              {profile.assignedCaregiver && (
                <Badge variant="outline" className="text-xs">
                  {profile.assignedCaregiver}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {profile.specialNeeds && (
          <div className="bg-muted p-3 rounded-lg">
            <p className="text-xs font-medium text-muted-foreground mb-1">
              Special Needs
            </p>
            <p className="text-sm line-clamp-2">{profile.specialNeeds}</p>
          </div>
        )}
        {profile.learningGoals && (
          <div className="bg-primary-light p-3 rounded-lg">
            <p className="text-xs font-medium text-primary mb-1">
              Learning Goals
            </p>
            <p className="text-sm text-foreground line-clamp-2">{profile.learningGoals}</p>
          </div>
        )}
        {quickActions || (
          <div className="flex gap-2 pt-2">
            {onView && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onView}
                className="flex-1 gap-2"
              >
                <Eye className="h-4 w-4" />
                View
              </Button>
            )}
            {onEdit && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onEdit}
                className="gap-2"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
            )}
            {onDelete && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onDelete}
                className="gap-2 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChildProfileCard;
