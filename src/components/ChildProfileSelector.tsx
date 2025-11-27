import { useState } from "react";
import { ChevronDown, Plus, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface Child {
  id: string;
  name: string;
  age: string;
  avatar?: string;
}

const ChildProfileSelector = () => {
  const { toast } = useToast();
  const [children, setChildren] = useState<Child[]>([
    { id: "1", name: "Aarav Kumar", age: "3 years 5 months" },
  ]);
  const [selectedChild, setSelectedChild] = useState<Child>(children[0]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newChildName, setNewChildName] = useState("");
  const [newChildAge, setNewChildAge] = useState("");

  const handleAddChild = () => {
    if (!newChildName.trim() || !newChildAge.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const newChild: Child = {
      id: Date.now().toString(),
      name: newChildName,
      age: newChildAge,
    };

    setChildren([...children, newChild]);
    setSelectedChild(newChild);
    setIsAddDialogOpen(false);
    setNewChildName("");
    setNewChildAge("");

    toast({
      title: "Profile Created",
      description: `${newChildName}'s profile has been added successfully`,
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 min-w-[200px] justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7 border border-border">
                <AvatarImage src={selectedChild.avatar} />
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
                <AvatarImage src={child.avatar} />
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

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Child Profile</DialogTitle>
            <DialogDescription>
              Create a new profile to track your child's development journey.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Child's Name</Label>
              <Input
                id="name"
                placeholder="Enter name"
                value={newChildName}
                onChange={(e) => setNewChildName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                placeholder="e.g., 2 years 6 months"
                value={newChildAge}
                onChange={(e) => setNewChildAge(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddChild}>Create Profile</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChildProfileSelector;
