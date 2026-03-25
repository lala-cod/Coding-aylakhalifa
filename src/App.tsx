import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DotLottiePlayer } from "@dotlottie/react-player"; // Import ini
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading selama 3 detik
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {isLoading ? (
          /* TAMPILAN LOADING SCREEN */
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div style={{ width: "300px", height: "300px" }}>
              <DotLottiePlayer
                src="https://lottie.host/bc46cf26-f83b-42e5-81b5-d80137b1ed54/QwIo1OdO2t.lottie"
                autoplay
                loop
              />
            </div>
          </div>
        ) : (
          /* TAMPILAN APLIKASI UTAMA */
          <>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;