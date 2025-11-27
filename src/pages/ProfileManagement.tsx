import { useState } from "react";
import { Pencil, Trash2, Plus, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

interface Child {
  id: string;
  name: string;
  age: string;
  dateOfBirth?: string;
  notes?: string;
  avatar?: string;
}

const ProfileManagement = () => {
  const { toast } = useToast();
  const [children, setChildren] = useState<Child[]>([
    {
      id: "1",
      name: "Aarav Kumar",
      age: "3 years 5 months",
      dateOfBirth: "2021-06-15",
      notes: "Showing great progress in speech therapy",
    },
  ]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    dateOfBirth: "",
    notes: "",
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleAddChild = () => {
    if (!formData.name.trim() || !formData.age.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in required fields",
        variant: "destructive",
      });
      return;
    }

    const newChild: Child = {
      id: Date.now().toString(),
      ...formData,
    };

    setChildren([...children, newChild]);
    setIsAddDialogOpen(false);
    setFormData({ name: "", age: "", dateOfBirth: "", notes: "" });

    toast({
      title: "Profile Created",
      description: `${formData.name}'s profile has been added successfully`,
    });
  };

  const handleEditChild = () => {
    if (!formData.name.trim() || !formData.age.trim() || !selectedChild) {
      toast({
        title: "Missing Information",
        description: "Please fill in required fields",
        variant: "destructive",
      });
      return;
    }

    setChildren(
      children.map((child) =>
        child.id === selectedChild.id ? { ...child, ...formData } : child
      )
    );
    setIsEditDialogOpen(false);
    setSelectedChild(null);
    setFormData({ name: "", age: "", dateOfBirth: "", notes: "" });

    toast({
      title: "Profile Updated",
      description: "Changes have been saved successfully",
    });
  };

  const handleDeleteChild = () => {
    if (!selectedChild) return;

    setChildren(children.filter((child) => child.id !== selectedChild.id));
    setIsDeleteDialogOpen(false);
    setSelectedChild(null);

    toast({
      title: "Profile Deleted",
      description: "The profile has been removed",
    });
  };

  const openEditDialog = (child: Child) => {
    setSelectedChild(child);
    setFormData({
      name: child.name,
      age: child.age,
      dateOfBirth: child.dateOfBirth || "",
      notes: child.notes || "",
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (child: Child) => {
    setSelectedChild(child);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="min-h-screen pt-20 md:pt-24 px-4 pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground mb-2">
                Profile Management
              </h1>
              <p className="text-muted-foreground">
                Manage your children's profiles and information
              </p>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Child
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          {children.map((child) => (
            <Card key={child.id} className="shadow-soft hover-lift">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-primary">
                      <AvatarImage src={child.avatar} />
                      <AvatarFallback className="bg-primary-light text-primary text-xl font-bold">
                        {getInitials(child.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl font-display">
                        {child.name}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {child.age}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openEditDialog(child)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openDeleteDialog(child)}
                      disabled={children.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {(child.dateOfBirth || child.notes) && (
                <CardContent className="space-y-2">
                  {child.dateOfBirth && (
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">
                        Date of Birth:{" "}
                      </span>
                      <span className="text-sm">{child.dateOfBirth}</span>
                    </div>
                  )}
                  {child.notes && (
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">
                        Notes:{" "}
                      </span>
                      <span className="text-sm">{child.notes}</span>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Add/Edit Dialog */}
        <Dialog
          open={isAddDialogOpen || isEditDialogOpen}
          onOpenChange={(open) => {
            setIsAddDialogOpen(open && isAddDialogOpen);
            setIsEditDialogOpen(open && isEditDialogOpen);
            if (!open) {
              setFormData({ name: "", age: "", dateOfBirth: "", notes: "" });
              setSelectedChild(null);
            }
          }}
        >
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {isAddDialogOpen ? "Add Child Profile" : "Edit Profile"}
              </DialogTitle>
              <DialogDescription>
                {isAddDialogOpen
                  ? "Create a new profile to track your child's development journey."
                  : "Update your child's profile information."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Child's Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="age">
                  Age <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="age"
                  placeholder="e.g., 2 years 6 months"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    setFormData({ ...formData, dateOfBirth: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional information..."
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddDialogOpen(false);
                  setIsEditDialogOpen(false);
                  setFormData({ name: "", age: "", dateOfBirth: "", notes: "" });
                  setSelectedChild(null);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={isAddDialogOpen ? handleAddChild : handleEditChild}
              >
                {isAddDialogOpen ? "Create Profile" : "Save Changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Profile?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete {selectedChild?.name}'s profile? This
                action cannot be undone and will remove all associated data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setSelectedChild(null)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteChild}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ProfileManagement;
