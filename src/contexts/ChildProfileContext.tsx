import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface ChildProfile {
  id: string;
  name: string;
  age: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  photo?: string;
  specialNeeds?: string;
  learningGoals?: string;
  medicalNotes?: string;
  assignedCaregiver?: string;
  createdAt: string;
}

interface ChildProfileContextType {
  children: ChildProfile[];
  selectedChild: ChildProfile | null;
  setSelectedChild: (child: ChildProfile) => void;
  addChild: (child: Omit<ChildProfile, "id" | "createdAt">) => void;
  updateChild: (id: string, updates: Partial<ChildProfile>) => void;
  deleteChild: (id: string) => void;
}

const ChildProfileContext = createContext<ChildProfileContextType | undefined>(undefined);

export const useChildProfile = () => {
  const context = useContext(ChildProfileContext);
  if (!context) {
    throw new Error("useChildProfile must be used within ChildProfileProvider");
  }
  return context;
};

export const ChildProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profiles, setProfiles] = useState<ChildProfile[]>(() => {
    const saved = localStorage.getItem("childProfiles");
    return saved ? JSON.parse(saved) : [
      {
        id: "1",
        name: "Aarav Kumar",
        age: "3 years 5 months",
        dateOfBirth: "2021-06-15",
        gender: "male" as const,
        specialNeeds: "Speech delay, requires regular therapy sessions",
        learningGoals: "Improve verbal communication and social interaction",
        assignedCaregiver: "Dr. Sharma",
        createdAt: new Date().toISOString(),
      },
    ];
  });

  const [selectedChild, setSelectedChild] = useState<ChildProfile | null>(() => {
    const saved = localStorage.getItem("selectedChildId");
    if (saved && profiles.length > 0) {
      return profiles.find(p => p.id === saved) || profiles[0];
    }
    return profiles[0] || null;
  });

  useEffect(() => {
    localStorage.setItem("childProfiles", JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    if (selectedChild) {
      localStorage.setItem("selectedChildId", selectedChild.id);
    }
  }, [selectedChild]);

  const addChild = (childData: Omit<ChildProfile, "id" | "createdAt">) => {
    const newChild: ChildProfile = {
      ...childData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setProfiles([...profiles, newChild]);
    setSelectedChild(newChild);
  };

  const updateChild = (id: string, updates: Partial<ChildProfile>) => {
    setProfiles(profiles.map(child => 
      child.id === id ? { ...child, ...updates } : child
    ));
    if (selectedChild?.id === id) {
      setSelectedChild({ ...selectedChild, ...updates });
    }
  };

  const deleteChild = (id: string) => {
    const newProfiles = profiles.filter(child => child.id !== id);
    setProfiles(newProfiles);
    if (selectedChild?.id === id) {
      setSelectedChild(newProfiles[0] || null);
    }
  };

  return (
    <ChildProfileContext.Provider
      value={{
        children: profiles,
        selectedChild,
        setSelectedChild,
        addChild,
        updateChild,
        deleteChild,
      }}
    >
      {children}
    </ChildProfileContext.Provider>
  );
};
