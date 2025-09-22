import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth
import { AuthProvider } from "./components/auth/AuthProvider";
import { useAuth } from "./hooks/useAuth";

// Pages
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { EventsList } from "./pages/EventsList";
import { NewEvent } from "./pages/NewEvent";
import { EditEvent } from "./pages/EditEvent";
import { Settings } from "./pages/Settings";
import LandingPage from "./pages/LandingPage";
import { AdminLayout } from "./components/layout/AdminLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      <Route path="/dashboard" element={<AdminLayout isAuthenticated={isAuthenticated} />}>
        <Route index element={<Dashboard />} />
        <Route path="events" element={<EventsList />} />
        <Route path="events/new" element={<NewEvent />} />
        <Route path="events/:id/edit" element={<EditEvent />} />
        <Route path="landing" element={<LandingPage />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
