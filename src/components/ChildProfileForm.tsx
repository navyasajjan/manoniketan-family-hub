import { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, User } from "lucide-react";
import { ChildProfile } from "@/contexts/ChildProfileContext";

interface ChildProfileFormProps {
  initialData?: Partial<ChildProfile>;
  onSubmit: (data: Omit<ChildProfile, "id" | "createdAt">) => void;
  onCancel: () => void;
  submitLabel?: string;
}

const ChildProfileForm = ({ 
  initialData, 
  onSubmit, 
  onCancel,
  submitLabel = "Create Profile" 
}: ChildProfileFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    age: initialData?.age || "",
    dateOfBirth: initialData?.dateOfBirth || "",
    gender: initialData?.gender || "male",
    photo: initialData?.photo || "",
    specialNeeds: initialData?.specialNeeds || "",
    learningGoals: initialData?.learningGoals || "",
    medicalNotes: initialData?.medicalNotes || "",
    assignedCaregiver: initialData?.assignedCaregiver || "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Omit<ChildProfile, "id" | "createdAt">);
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-center">
        <div className="relative">
          <Avatar className="h-24 w-24 border-2 border-primary cursor-pointer" 
                  onClick={() => fileInputRef.current?.click()}>
            {formData.photo ? (
              <AvatarImage src={formData.photo} />
            ) : formData.name ? (
              <AvatarFallback className="bg-primary-light text-primary text-2xl">
                {getInitials(formData.name)}
              </AvatarFallback>
            ) : (
              <AvatarFallback className="bg-muted">
                <User className="h-12 w-12 text-muted-foreground" />
              </AvatarFallback>
            )}
          </Avatar>
          <Button
            type="button"
            size="icon"
            variant="secondary"
            className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-4 w-4" />
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">
            Child's Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            placeholder="Enter full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">
            Date of Birth <span className="text-destructive">*</span>
          </Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="age">Current Age (e.g., 3 years 5 months)</Label>
        <Input
          id="age"
          placeholder="Enter age"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        />
      </div>

      <div className="space-y-3">
        <Label>
          Gender <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          value={formData.gender}
          onValueChange={(value) => setFormData({ ...formData, gender: value as "male" | "female" | "other" })}
        >
          <div className="flex gap-6">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male" className="cursor-pointer font-normal">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female" className="cursor-pointer font-normal">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other" className="cursor-pointer font-normal">Other</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialNeeds">Special Needs</Label>
        <Textarea
          id="specialNeeds"
          placeholder="Describe any special needs, therapy requirements, or support needed..."
          value={formData.specialNeeds}
          onChange={(e) => setFormData({ ...formData, specialNeeds: e.target.value })}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="learningGoals">Learning Goals</Label>
        <Textarea
          id="learningGoals"
          placeholder="What are the developmental or learning goals for this child?"
          value={formData.learningGoals}
          onChange={(e) => setFormData({ ...formData, learningGoals: e.target.value })}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="medicalNotes">Medical Notes</Label>
        <Textarea
          id="medicalNotes"
          placeholder="Important medical information, allergies, medications, etc."
          value={formData.medicalNotes}
          onChange={(e) => setFormData({ ...formData, medicalNotes: e.target.value })}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="assignedCaregiver">Assigned Caregiver/Trainer</Label>
        <Input
          id="assignedCaregiver"
          placeholder="Name of primary caregiver or therapist"
          value={formData.assignedCaregiver}
          onChange={(e) => setFormData({ ...formData, assignedCaregiver: e.target.value })}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default ChildProfileForm;
