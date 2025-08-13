import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Menu, User, Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  currentUser?: {
    name: string;
    role: 'admin' | 'instructor' | 'learner';
  };
}

export const Header = ({ currentUser }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">LearnHub</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6 ml-8">
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Courses
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Dashboard
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Analytics
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Community
            </a>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              className="w-64"
            />
          </div>

          {currentUser ? (
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-foreground">{currentUser.name}</p>
                  <Badge variant="secondary" className="text-xs">
                    {currentUser.role}
                  </Badge>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
              <Button variant="default" size="sm">
                Get Started
              </Button>
            </div>
          )}

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};