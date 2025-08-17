import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import BrowseCourses from "./pages/BrowseCourses";
import MyCourses from "./pages/MyCourses";
import Assignments from "./pages/Assignments";
import Quizzes from "./pages/Quizzes";
import Discussions from "./pages/Discussions";
import Certificates from "./pages/Certificates";
import Calendar from "./pages/Calendar";
import Python from "./pages/courses/Python";
import JavaScript from "./pages/courses/JavaScript";
import Java from "./pages/courses/Java";
import Cpp from "./pages/courses/Cpp";
import ReactCourse from "./pages/courses/React";
import NodeJS from "./pages/courses/NodeJS";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/browse" 
              element={
                <ProtectedRoute>
                  <BrowseCourses />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/my-courses" 
              element={
                <ProtectedRoute>
                  <MyCourses />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/assignments" 
              element={
                <ProtectedRoute>
                  <Assignments />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/quizzes" 
              element={
                <ProtectedRoute>
                  <Quizzes />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/discussions" 
              element={
                <ProtectedRoute>
                  <Discussions />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/certificates" 
              element={
                <ProtectedRoute>
                  <Certificates />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/calendar" 
              element={
                <ProtectedRoute>
                  <Calendar />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/courses/python" 
              element={
                <ProtectedRoute>
                  <Python />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/courses/javascript" 
              element={
                <ProtectedRoute>
                  <JavaScript />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/courses/java" 
              element={
                <ProtectedRoute>
                  <Java />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/courses/cpp" 
              element={
                <ProtectedRoute>
                  <Cpp />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/courses/react" 
              element={
                <ProtectedRoute>
                  <ReactCourse />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/courses/nodejs" 
              element={
                <ProtectedRoute>
                  <NodeJS />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
