import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import MilestoneTracker from "./pages/MilestoneTracker";
import AppointmentBooking from "./pages/AppointmentBooking";
import TrainingLibrary from "./pages/TrainingLibrary";
import CommunityForum from "./pages/CommunityForum";
import DailyJournal from "./pages/DailyJournal";
import ScreeningTools from "./pages/ScreeningTools";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="milestones" element={<MilestoneTracker />} />
            <Route path="screening" element={<ScreeningTools />} />
            <Route path="appointments" element={<AppointmentBooking />} />
            <Route path="training" element={<TrainingLibrary />} />
            <Route path="community" element={<CommunityForum />} />
            <Route path="journal" element={<DailyJournal />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
