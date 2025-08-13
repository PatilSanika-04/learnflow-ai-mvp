import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Target, 
  BarChart3, 
  MessageSquare, 
  Trophy, 
  Zap,
  Users,
  BookOpen,
  Smartphone
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Learning",
    description: "Personalized learning paths that adapt to your pace and learning style using advanced AI algorithms.",
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: Target,
    title: "Smart Recommendations",
    description: "Get course suggestions tailored to your career goals and current skill level.",
    color: "text-success",
    bgColor: "bg-success/10"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Track your progress with detailed insights and performance metrics.",
    color: "text-warning",
    bgColor: "bg-warning/10"
  },
  {
    icon: MessageSquare,
    title: "AI Learning Assistant",
    description: "24/7 AI chatbot support to answer questions and provide instant help.",
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: Trophy,
    title: "Gamified Learning",
    description: "Earn badges, certificates, and climb leaderboards to stay motivated.",
    color: "text-success",
    bgColor: "bg-success/10"
  },
  {
    icon: Zap,
    title: "Interactive Content",
    description: "Engage with quizzes, simulations, and hands-on projects.",
    color: "text-warning",
    bgColor: "bg-warning/10"
  },
  {
    icon: Users,
    title: "Community Learning",
    description: "Connect with peers, join study groups, and learn together.",
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: BookOpen,
    title: "Expert-Led Courses",
    description: "Learn from industry professionals and certified instructors.",
    color: "text-success",
    bgColor: "bg-success/10"
  },
  {
    icon: Smartphone,
    title: "Mobile Learning",
    description: "Access your courses anywhere with our responsive mobile platform.",
    color: "text-warning",
    bgColor: "bg-warning/10"
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-success/10 text-success">
            🎯 Platform Features
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Everything You Need to Excel
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive learning platform combines cutting-edge AI technology with proven educational methodologies 
            to deliver an unparalleled learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-1 bg-card border-border/50"
              >
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Feature Highlight */}
        <div className="bg-feature-gradient rounded-3xl p-8 md:p-12 border border-border/50 shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary">
                🚀 Coming Soon
              </Badge>
              <h3 className="text-3xl font-bold text-foreground mb-4">
                AI Career Path Generator
              </h3>
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                Our upcoming AI will analyze your skills, interests, and market trends to create 
                a personalized career roadmap with recommended courses, projects, and milestones.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-muted-foreground">Personalized skill gap analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-muted-foreground">Market-driven course recommendations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-muted-foreground">Real-time industry insights</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-card rounded-2xl p-6 shadow-medium">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-card-foreground">AI Analysis Complete</h4>
                    <p className="text-sm text-muted-foreground">Based on your profile</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Frontend Development</span>
                    <span className="text-success font-medium">Advanced</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Backend Development</span>
                    <span className="text-warning font-medium">Intermediate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">DevOps</span>
                    <span className="text-destructive font-medium">Beginner</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};