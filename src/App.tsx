import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChildProfileProvider } from "./contexts/ChildProfileContext";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import MilestoneTracker from "./pages/MilestoneTracker";
import AppointmentBooking from "./pages/AppointmentBooking";
import TrainingLibrary from "./pages/TrainingLibrary";
import CommunityForum from "./pages/CommunityForum";
import DailyJournal from "./pages/DailyJournal";
import ScreeningTools from "./pages/ScreeningTools";
import AIInsights from "./pages/AIInsights";
import ActivityGenerator from "./pages/ActivityGenerator";
import AITraining from "./pages/AITraining";
import ProfileManagement from "./pages/ProfileManagement";
import ChildProfileDetail from "./pages/ChildProfileDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ChildProfileProvider>
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
              <Route path="ai-insights" element={<AIInsights />} />
              <Route path="activity-generator" element={<ActivityGenerator />} />
              <Route path="ai-training" element={<AITraining />} />
              <Route path="profile-management" element={<ProfileManagement />} />
              <Route path="profile-detail" element={<ChildProfileDetail />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ChildProfileProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
