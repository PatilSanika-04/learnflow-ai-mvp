import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Clock, Trophy, Play, Award, Target } from 'lucide-react';
import LMSLayout from '@/components/LMSLayout';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

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

const MyCourses = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
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
        .eq('user_id', user.id)
        .order('enrolled_at', { ascending: false });

      if (error) {
        console.error('Error fetching enrollments:', error);
      } else {
        setEnrollments(data || []);
      }
      setLoading(false);
    };

    fetchEnrollments();
  }, [user]);

  const inProgressCourses = enrollments.filter(e => !e.completed_at && e.progress_percentage > 0);
  const notStartedCourses = enrollments.filter(e => e.progress_percentage === 0);
  const completedCourses = enrollments.filter(e => e.completed_at);

  const CourseCard = ({ enrollment }: { enrollment: Enrollment }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
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
          <div className="text-xs">
            Enrolled: {new Date(enrollment.enrolled_at).toLocaleDateString()}
          </div>
        </div>

        {enrollment.completed_at && (
          <div className="flex items-center gap-2 text-success text-sm">
            <Award className="h-4 w-4" />
            <span>Completed on {new Date(enrollment.completed_at).toLocaleDateString()}</span>
          </div>
        )}
        
        <div className="flex gap-2">
          <Button 
            className="flex-1" 
            size="sm" 
            onClick={() => navigate(`/course/${enrollment.courses?.id}`)}
          >
            <Play className="mr-2 h-4 w-4" />
            {enrollment.progress_percentage === 0 ? 'Start' : 'Continue'}
          </Button>
          {enrollment.completed_at && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate(`/certificate/${enrollment.courses?.id}`)}
            >
              <Trophy className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <LMSLayout>
        <div className="space-y-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-64"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </LMSLayout>
    );
  }

  return (
    <LMSLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Courses</h1>
            <p className="text-muted-foreground mt-2">
              Track your learning progress and continue your journey
            </p>
          </div>
          <Button onClick={() => navigate('/browse')}>
            <BookOpen className="mr-2 h-4 w-4" />
            Browse More Courses
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Enrolled</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{enrollments.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Target className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressCourses.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Trophy className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedCourses.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Not Started</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notStartedCourses.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Course Tabs */}
        {enrollments.length > 0 ? (
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Courses ({enrollments.length})</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress ({inProgressCourses.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedCourses.length})</TabsTrigger>
              <TabsTrigger value="not-started">Not Started ({notStartedCourses.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrollments.map((enrollment) => (
                  <CourseCard key={enrollment.id} enrollment={enrollment} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="in-progress" className="space-y-6">
              {inProgressCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {inProgressCourses.map((enrollment) => (
                    <CourseCard key={enrollment.id} enrollment={enrollment} />
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <Target className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No courses in progress</h3>
                    <p className="text-muted-foreground mb-4">Start learning to track your progress here</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-6">
              {completedCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedCourses.map((enrollment) => (
                    <CourseCard key={enrollment.id} enrollment={enrollment} />
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <Trophy className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No completed courses yet</h3>
                    <p className="text-muted-foreground mb-4">Complete courses to earn certificates</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="not-started" className="space-y-6">
              {notStartedCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {notStartedCourses.map((enrollment) => (
                    <CourseCard key={enrollment.id} enrollment={enrollment} />
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">All courses started</h3>
                    <p className="text-muted-foreground mb-4">Great job on starting your learning journey!</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        ) : (
          <Card className="text-center py-12">
            <CardHeader>
              <div className="mx-auto bg-muted rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle>No Courses Enrolled</CardTitle>
              <CardDescription>
                Start your programming journey by enrolling in your first course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/browse')}>
                <BookOpen className="mr-2 h-4 w-4" />
                Browse Courses
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </LMSLayout>
  );
};

export default MyCourses;