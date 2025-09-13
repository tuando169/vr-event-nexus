import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import VideoManagement from "./pages/VideoManagement";
import EventManagement from "./pages/EventManagement";
import EventDetails from "./pages/EventDetails";
import StreamingControl from "./pages/StreamingControl";
import Settings from "./pages/Settings";
import Navigation from "./components/Navigation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-background">
          <Navigation />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/videos" element={<VideoManagement />} />
            <Route path="/events" element={<EventManagement />} />
            <Route path="/events/:eventId" element={<EventDetails />} />
            <Route path="/streaming" element={<StreamingControl />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
