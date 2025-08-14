import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WhoAreYou from "./pages/WhoAreYou";
import WhatDoYouStudy from "./pages/WhatDoYouStudy";
import Trajectory from "./pages/Trajectory";
import DropCV from "./pages/DropCV";
import AnythingElse from "./pages/AnythingElse";
import CreateAccount from "./pages/CreateAccount";
import Dashboard from "./pages/Dashboard";
import SavedOpportunities from "./pages/SavedOpportunities";
import SavedResources from "./pages/SavedResources";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<WhoAreYou />} />
        <Route path="/who-are-you" element={<WhoAreYou />} />
          <Route path="/what-do-you-study" element={<WhatDoYouStudy />} />
          <Route path="/trajectory" element={<Trajectory />} />
          <Route path="/drop-cv" element={<DropCV />} />
          <Route path="/anything-else" element={<AnythingElse />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/saved-opportunities" element={<SavedOpportunities />} />
        <Route path="/saved-resources" element={<SavedResources />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
