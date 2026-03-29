import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { VoiceAssistant } from "@/components/VoiceAssistant";
import { ArcadeMode } from "@/components/ArcadeMode";
import { ArcadeProvider } from "@/hooks/useArcadeMode";
import { QuantumProvider } from "@/hooks/useQuantumTransition";
import { QuantumTransition } from "@/components/QuantumTransition";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <QuantumProvider>
      <ArcadeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <VoiceAssistant />
          <QuantumTransition />
          <ArcadeMode />
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </ArcadeProvider>
    </QuantumProvider>
  </QueryClientProvider>
);

export default App;

