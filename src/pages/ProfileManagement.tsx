import { useState } from "react";
import { Plus, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { useToast } from "@/hooks/use-toast";
import { useChildProfile } from "@/contexts/ChildProfileContext";
import { ChildProfile } from "@/contexts/ChildProfileContext";
import ChildProfileCard from "@/components/ChildProfileCard";
import ChildProfileForm from "@/components/ChildProfileForm";

const ProfileManagement = () => {
  const { toast } = useToast();
  const { children, addChild, updateChild, deleteChild, setSelectedChild } = useChildProfile();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<ChildProfile | null>(null);

  const handleAddChild = (childData: Omit<ChildProfile, "id" | "createdAt">) => {
    addChild(childData);
    setIsAddDialogOpen(false);
    toast({
      title: "Profile Created",
      description: `${childData.name}'s profile has been added successfully`,
    });
  };

  const handleEditChild = (childData: Omit<ChildProfile, "id" | "createdAt">) => {
    if (!selectedProfile) return;
    updateChild(selectedProfile.id, childData);
    setIsEditDialogOpen(false);
    setSelectedProfile(null);
    toast({
      title: "Profile Updated",
      description: "Changes have been saved successfully",
    });
  };

  const handleDeleteChild = () => {
    if (!selectedProfile) return;
    deleteChild(selectedProfile.id);
    setIsDeleteDialogOpen(false);
    setSelectedProfile(null);
    toast({
      title: "Profile Deleted",
      description: "The profile has been removed",
    });
  };

  const openEditDialog = (profile: ChildProfile) => {
    setSelectedProfile(profile);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (profile: ChildProfile) => {
    setSelectedProfile(profile);
    setIsDeleteDialogOpen(true);
  };

  const handleViewProfile = (profile: ChildProfile) => {
    setSelectedChild(profile);
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen pt-20 md:pt-24 px-4 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                Profile Management
              </h1>
              <p className="text-muted-foreground">
                Manage your children's profiles and track their progress
              </p>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Child Profile
            </Button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {children.map((profile) => (
            <ChildProfileCard
              key={profile.id}
              profile={profile}
              onView={() => handleViewProfile(profile)}
              onEdit={() => openEditDialog(profile)}
              onDelete={children.length > 1 ? () => openDeleteDialog(profile) : undefined}
            />
          ))}
        </div>

        {children.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No child profiles yet</p>
            <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Your First Child Profile
            </Button>
          </div>
        )}

        {/* Add Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>Add Child Profile</DialogTitle>
              <DialogDescription>
                Create a comprehensive profile to track your child's development journey.
              </DialogDescription>
            </DialogHeader>
            <div className="overflow-y-auto flex-1 pr-2">
              <ChildProfileForm
                onSubmit={handleAddChild}
                onCancel={() => setIsAddDialogOpen(false)}
                submitLabel="Create Profile"
              />
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Update your child's profile information.
              </DialogDescription>
            </DialogHeader>
            <div className="overflow-y-auto flex-1 pr-2">
              {selectedProfile && (
                <ChildProfileForm
                  initialData={selectedProfile}
                  onSubmit={handleEditChild}
                  onCancel={() => {
                    setIsEditDialogOpen(false);
                    setSelectedProfile(null);
                  }}
                  submitLabel="Save Changes"
                />
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Profile?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete {selectedProfile?.name}'s profile? This
                action cannot be undone and will remove all associated data including:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Milestone tracking records</li>
                  <li>Daily journal entries</li>
                  <li>Appointment history</li>
                  <li>Training progress</li>
                </ul>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setSelectedProfile(null)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteChild}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete Profile
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ProfileManagement;
