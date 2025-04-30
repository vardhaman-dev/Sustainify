
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import all pages
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import SellPage from "./pages/SellPage";
import RentPage from "./pages/RentPage";
import RecyclePage from "./pages/RecyclePage";
import NGOPage from "./pages/NGOPage";
import ListingDetailPage from "./pages/ListingDetailPage";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./pages/NotFound";
import ProfileInfo from "./components/dashboard/ProfileInfo";
import WalletPage from "./pages/WalletPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/sell" element={<SellPage />} />
          <Route path="/rent" element={<RentPage />} />
          <Route path="/recycle" element={<RecyclePage />} />
          <Route path="/ngo" element={<NGOPage />} />
          <Route path="/listing/:id" element={<ListingDetailPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfileInfo />} />
          <Route path="/wallet" element={<WalletPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
