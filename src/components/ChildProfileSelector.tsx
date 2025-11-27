import { useState } from "react";
import { ChevronDown, Plus, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useChildProfile } from "@/contexts/ChildProfileContext";
import ChildProfileForm from "./ChildProfileForm";

const ChildProfileSelector = () => {
  const { toast } = useToast();
  const { children, selectedChild, setSelectedChild, addChild } = useChildProfile();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddChild = (childData: any) => {
    addChild(childData);
    setIsAddDialogOpen(false);
    toast({
      title: "Profile Created",
      description: `${childData.name}'s profile has been added successfully`,
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      {selectedChild && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 min-w-[200px] justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-7 w-7 border border-border">
                  <AvatarImage src={selectedChild.photo} />
                  <AvatarFallback className="bg-primary-light text-primary text-xs">
                    {getInitials(selectedChild.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{selectedChild.name}</span>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[250px]">
            <DropdownMenuLabel>Switch Child Profile</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {children.map((child) => (
              <DropdownMenuItem
                key={child.id}
                onClick={() => setSelectedChild(child)}
                className="gap-2 cursor-pointer"
              >
                <Avatar className="h-6 w-6 border border-border">
                  <AvatarImage src={child.photo} />
                  <AvatarFallback className="bg-primary-light text-primary text-xs">
                    {getInitials(child.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{child.name}</span>
                  <span className="text-xs text-muted-foreground">{child.age}</span>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setIsAddDialogOpen(true)}
              className="gap-2 text-primary cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Add Child Profile
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="/profile-management" className="gap-2 cursor-pointer">
                <UserCircle className="h-4 w-4" />
                Manage Profiles
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Add Child Profile</DialogTitle>
            <DialogDescription>
              Create a new profile to track your child's development journey.
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto flex-1">
            <ChildProfileForm
              onSubmit={handleAddChild}
              onCancel={() => setIsAddDialogOpen(false)}
              submitLabel="Create Profile"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChildProfileSelector;
