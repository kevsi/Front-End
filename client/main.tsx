import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NewOrder from "./pages/NewOrder";
import Orders from "./pages/Orders";
import ManagerDashboard from "./pages/ManagerDashboard";
import ManagerOrders from "./pages/ManagerOrders";
import ManagerArticles from "./pages/ManagerArticles";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-order" element={<NewOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          <Route path="/manager-orders" element={<ManagerOrders />} />
          <Route path="/manager-articles" element={<ManagerArticles />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
