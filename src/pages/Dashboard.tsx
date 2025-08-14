import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Trophy, Users, TrendingUp, Play, Award } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  duration_hours: number;
  price: number;
  image_url?: string;
}

interface Enrollment {
  id: string;
  progress_percentage: number;
  enrolled_at: string;
  completed_at?: string;
  courses: Course;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          *,
          courses (*)
        `)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching enrollments:', error);
      } else {
        setEnrollments(data || []);
      }
      setLoading(false);
    };

    fetchEnrollments();
  }, [user]);

  const completedCourses = enrollments.filter(e => e.completed_at);
  const inProgressCourses = enrollments.filter(e => !e.completed_at && e.progress_percentage > 0);
  const totalHours = enrollments.reduce((sum, e) => sum + (e.courses?.duration_hours || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-64"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Learning Dashboard</h1>
            <p className="text-muted-foreground mt-2">Welcome back! Continue your learning journey.</p>
          </div>
          <Button className="bg-hero-gradient hover:opacity-90">
            <BookOpen className="mr-2 h-4 w-4" />
            Browse Courses
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{enrollments.length}</div>
              <p className="text-xs text-muted-foreground">Active learning paths</p>
            </CardContent>
          </Card>

          <Card className="border-success/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Trophy className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedCourses.length}</div>
              <p className="text-xs text-muted-foreground">Courses finished</p>
            </CardContent>
          </Card>

          <Card className="border-warning/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalHours}</div>
              <p className="text-xs text-muted-foreground">Total hours enrolled</p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressCourses.length}</div>
              <p className="text-xs text-muted-foreground">Currently learning</p>
            </CardContent>
          </Card>
        </div>

        {/* Course Progress */}
        {enrollments.length > 0 ? (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Your Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrollments.map((enrollment) => (
                  <Card key={enrollment.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="aspect-video bg-gradient-to-r from-primary/10 to-secondary/10 rounded-t-lg flex items-center justify-center">
                      <div className="text-center">
                        <BookOpen className="h-12 w-12 text-primary mx-auto mb-2" />
                        <Badge variant="secondary">{enrollment.courses?.category}</Badge>
                      </div>
                    </div>
                    
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg line-clamp-2">
                            {enrollment.courses?.title}
                          </CardTitle>
                          <CardDescription className="mt-2 line-clamp-2">
                            {enrollment.courses?.description}
                          </CardDescription>
                        </div>
                        <Badge variant={enrollment.courses?.level === 'beginner' ? 'secondary' : 
                               enrollment.courses?.level === 'intermediate' ? 'outline' : 'destructive'}>
                          {enrollment.courses?.level}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{enrollment.progress_percentage}%</span>
                        </div>
                        <Progress value={enrollment.progress_percentage} className="h-2" />
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{enrollment.courses?.duration_hours}h</span>
                        </div>
                        {enrollment.completed_at && (
                          <div className="flex items-center gap-2 text-success">
                            <Award className="h-4 w-4" />
                            <span>Completed</span>
                          </div>
                        )}
                      </div>
                      
                      <Button className="w-full" size="sm">
                        <Play className="mr-2 h-4 w-4" />
                        {enrollment.progress_percentage === 0 ? 'Start Learning' : 'Continue'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardHeader>
              <div className="mx-auto bg-muted rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle>No Courses Yet</CardTitle>
              <CardDescription>
                Start your learning journey by enrolling in your first course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="bg-hero-gradient hover:opacity-90">
                <BookOpen className="mr-2 h-4 w-4" />
                Browse Available Courses
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;