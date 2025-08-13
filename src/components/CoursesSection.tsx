import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, Clock, Users, BookOpen, Play } from "lucide-react";

const featuredCourses = [
  {
    id: 1,
    title: "Complete React & TypeScript Masterclass",
    instructor: "Sarah Johnson",
    rating: 4.9,
    students: 12450,
    duration: "42 hours",
    level: "Intermediate",
    progress: 65,
    price: "$99",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 2,
    title: "AI & Machine Learning Fundamentals",
    instructor: "Dr. Michael Chen",
    rating: 4.8,
    students: 8950,
    duration: "38 hours",
    level: "Beginner",
    progress: 0,
    price: "$129",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 3,
    title: "Modern Web Design & UX Principles",
    instructor: "Emily Rodriguez",
    rating: 4.7,
    students: 15230,
    duration: "28 hours",
    level: "Intermediate",
    progress: 30,
    price: "$89",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 4,
    title: "Data Science with Python",
    instructor: "Alex Thompson",
    rating: 4.9,
    students: 9876,
    duration: "52 hours",
    level: "Advanced",
    progress: 0,
    price: "$149",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  }
];

export const CoursesSection = () => {
  return (
    <section className="py-24 bg-feature-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary">
            Featured Courses
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Start Your Learning Adventure
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our carefully curated selection of courses designed by industry experts
            and enhanced with AI-powered personalization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredCourses.map((course) => (
            <Card key={course.id} className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-2 bg-card-gradient border-border/50">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors">
                    <div className="absolute top-4 right-4">
                      <Badge variant={course.level === 'Beginner' ? 'secondary' : course.level === 'Intermediate' ? 'default' : 'destructive'}>
                        {course.level}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="hero" size="icon" className="rounded-full">
                        <Play className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-card-foreground group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-3">
                  by {course.instructor}
                </p>

                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
                    {course.rating}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {course.students.toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                </div>

                {course.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-success">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                )}
              </CardContent>

              <CardFooter className="p-6 pt-0 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-primary">{course.price}</span>
                </div>
                <Button variant={course.progress > 0 ? "success" : "default"} size="sm">
                  {course.progress > 0 ? "Continue" : "Enroll Now"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="premium" size="lg">
            <BookOpen className="mr-2 h-5 w-5" />
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};