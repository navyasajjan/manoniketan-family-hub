import { useState } from "react";
import { Calendar as CalendarIcon, Video, MapPin, Clock, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";

interface Therapist {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  experience: string;
  availableSlots: string[];
  modes: ("in-person" | "online")[];
  image: string;
}

const AppointmentBooking = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedMode, setSelectedMode] = useState<"in-person" | "online">("online");

  const therapists: Therapist[] = [
    {
      id: "1",
      name: "Dr. Priya Sharma",
      specialization: "Speech Therapy",
      rating: 4.8,
      experience: "12 years",
      availableSlots: ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"],
      modes: ["in-person", "online"],
      image: "/placeholder.svg",
    },
    {
      id: "2",
      name: "Dr. Rajesh Kumar",
      specialization: "Occupational Therapy",
      rating: 4.9,
      experience: "15 years",
      availableSlots: ["10:00 AM", "01:00 PM", "03:00 PM"],
      modes: ["in-person", "online"],
      image: "/placeholder.svg",
    },
    {
      id: "3",
      name: "Dr. Anita Desai",
      specialization: "Behavioral Therapy",
      rating: 4.7,
      experience: "10 years",
      availableSlots: ["09:30 AM", "12:00 PM", "03:30 PM"],
      modes: ["online"],
      image: "/placeholder.svg",
    },
  ];

  return (
    <div className="min-h-screen pt-20 md:pt-24 px-4 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Book Appointment 📅
          </h1>
          <p className="text-muted-foreground">Schedule sessions with our experienced therapists</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="font-display">Select Appointment Mode</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedMode} onValueChange={(v) => setSelectedMode(v as any)}>
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="online" className="gap-2">
                      <Video className="h-4 w-4" />
                      Online
                    </TabsTrigger>
                    <TabsTrigger value="in-person" className="gap-2">
                      <MapPin className="h-4 w-4" />
                      In-Person
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h2 className="text-xl font-display font-semibold">Available Therapists</h2>
              {therapists
                .filter((t) => t.modes.includes(selectedMode))
                .map((therapist) => (
                  <Card key={therapist.id} className="shadow-soft hover-lift">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16 border-2 border-primary">
                          <AvatarImage src={therapist.image} />
                          <AvatarFallback className="bg-primary-light text-primary text-lg font-bold">
                            {therapist.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <CardTitle className="font-display">{therapist.name}</CardTitle>
                              <CardDescription className="text-base mt-1">
                                {therapist.specialization}
                              </CardDescription>
                            </div>
                            <div className="flex items-center gap-1 bg-secondary-light px-2 py-1 rounded">
                              <Star className="h-4 w-4 text-secondary-foreground fill-current" />
                              <span className="font-semibold text-secondary-foreground">{therapist.rating}</span>
                            </div>
                          </div>
                          <div className="flex gap-2 mb-4">
                            <Badge variant="outline">{therapist.experience} experience</Badge>
                            {therapist.modes.map((mode) => (
                              <Badge key={mode} className="bg-accent-light text-accent">
                                {mode === "online" ? <Video className="h-3 w-3 mr-1" /> : <MapPin className="h-3 w-3 mr-1" />}
                                {mode}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-3">
                        <p className="text-sm font-medium text-muted-foreground mb-2">
                          Available Slots Today:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {therapist.availableSlots.map((slot) => (
                            <Button
                              key={slot}
                              variant="outline"
                              size="sm"
                              className="hover:bg-primary hover:text-primary-foreground"
                            >
                              <Clock className="h-3 w-3 mr-1" />
                              {slot}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <Button className="w-full">Book Appointment</Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="font-display">Select Date</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border pointer-events-auto"
                />
              </CardContent>
            </Card>

            <Card className="shadow-soft bg-primary-light border-primary">
              <CardHeader>
                <CardTitle className="text-primary font-display">Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-card rounded-lg">
                  <p className="font-semibold">Dr. Priya Sharma</p>
                  <p className="text-sm text-muted-foreground">Tomorrow, 10:00 AM</p>
                  <Badge className="mt-2 bg-accent text-accent-foreground">
                    <Video className="h-3 w-3 mr-1" />
                    Online
                  </Badge>
                </div>
                <div className="p-3 bg-card rounded-lg">
                  <p className="font-semibold">Dr. Rajesh Kumar</p>
                  <p className="text-sm text-muted-foreground">Dec 28, 2:00 PM</p>
                  <Badge className="mt-2 bg-muted text-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    In-Person
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
