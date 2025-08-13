import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Users, BookOpen, Trophy, Star, TrendingUp } from "lucide-react";
import heroImage from "@/assets/lms-hero.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Modern learning environment with diverse students" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8 animate-fade-in">
            <div className="space-y-4">
              <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                🚀 AI-Powered Learning Platform
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Transform Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                  Learning Journey
                </span>
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Experience personalized education with AI-driven course recommendations, 
                interactive content, and real-time progress tracking. Join thousands of learners 
                achieving their goals.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                <PlayCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Start Learning Now
              </Button>
              <Button variant="premium" size="lg" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 mr-2" />
                  <span className="text-2xl font-bold">50K+</span>
                </div>
                <p className="text-white/80 text-sm">Active Learners</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <BookOpen className="h-5 w-5 mr-2" />
                  <span className="text-2xl font-bold">1,200+</span>
                </div>
                <p className="text-white/80 text-sm">Expert Courses</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Trophy className="h-5 w-5 mr-2" />
                  <span className="text-2xl font-bold">98%</span>
                </div>
                <p className="text-white/80 text-sm">Success Rate</p>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="hidden lg:block space-y-6 animate-float">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-strong">
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-12 w-12 bg-success rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">AI-Powered Progress</h3>
                  <p className="text-white/80 text-sm">Personalized learning paths</p>
                </div>
              </div>
              <div className="bg-white/20 rounded-lg h-2 overflow-hidden">
                <div className="bg-progress-gradient h-full w-3/4 animate-pulse"></div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-strong">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Recent Achievement</h3>
                <Star className="h-5 w-5 text-yellow-400" />
              </div>
              <p className="text-white/90 mb-2">"Completed Advanced React Course"</p>
              <p className="text-white/70 text-sm">Certificate earned • 2 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};