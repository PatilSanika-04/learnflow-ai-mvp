import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Trophy, Users, TrendingUp, Play, Award, Bell, Calendar, Target } from 'lucide-react';
import LMSLayout from '@/components/LMSLayout';
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

// Only keep programming-related courses
const PROGRAMMING_KEYWORDS = [
  'python','javascript','java','c++','cpp','react','node','node.js','nodejs',
  'programming','development','backend','frontend','full stack','web development'
];
const isProgrammingCourse = (title?: string, category?: string) => {
  const t = (title || '').toLowerCase();
  const c = (category || '').toLowerCase();
  return PROGRAMMING_KEYWORDS.some(k => t.includes(k) || c.includes(k));
};

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [upcomingAssignments, setUpcomingAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;

      // Fetch enrollments
      const { data: enrollmentsData, error: enrollmentsError } = await supabase
        .from('enrollments')
        .select(`
          *,
          courses (*)
        `)
        .eq('user_id', user.id);

      if (enrollmentsError) {
        console.error('Error fetching enrollments:', enrollmentsError);
      } else {
        const filtered = (enrollmentsData || []).filter((e: any) => isProgrammingCourse(e.courses?.title, e.courses?.category));
        setEnrollments(filtered);
      }

      // Fetch announcements
      const courseIds = (enrollmentsData || [])
        .filter((e: any) => isProgrammingCourse(e.courses?.title, e.courses?.category))
        .map((e: any) => e.courses?.id)
        .filter(Boolean) as string[];
      const { data: announcementsData } = await supabase
        .from('announcements')
        .select('*')
        .or(`is_global.eq.true,course_id.in.(${courseIds.join(',')})`)
        .order('created_at', { ascending: false })
        .limit(5);

      setAnnouncements(announcementsData || []);

      // Fetch upcoming assignments
      const { data: assignmentsData } = await supabase
        .from('assignments')
        .select(`
          *,
          courses!inner(*)
        `)
        .in('courses.id', courseIds)
        .gte('due_date', new Date().toISOString())
        .order('due_date', { ascending: true })
        .limit(5);

      setUpcomingAssignments(assignmentsData || []);

      setLoading(false);
    };

    fetchDashboardData();
  }, [user]);

  const completedCourses = enrollments.filter(e => e.completed_at);
  const inProgressCourses = enrollments.filter(e => !e.completed_at && e.progress_percentage > 0);
  const totalHours = enrollments.reduce((sum, e) => sum + (e.courses?.duration_hours || 0), 0);

  if (loading) {
    return (
      <LMSLayout>
        <div className="space-y-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-64"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded-lg"></div>
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
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome back! 👋</h1>
            <p className="text-muted-foreground mt-2">Continue your programming journey and master new skills.</p>
          </div>
          <Button onClick={() => navigate('/browse')} className="bg-hero-gradient hover:opacity-90">
            <BookOpen className="mr-2 h-4 w-4" />
            Explore Courses
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-primary/20 hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{enrollments.length}</div>
              <p className="text-xs text-muted-foreground">Currently enrolled</p>
            </CardContent>
          </Card>

          <Card className="border-success/20 hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Trophy className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedCourses.length}</div>
              <p className="text-xs text-muted-foreground">Courses finished</p>
            </CardContent>
          </Card>

          <Card className="border-warning/20 hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalHours}</div>
              <p className="text-xs text-muted-foreground">Total study time</p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assignments Due</CardTitle>
              <Target className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingAssignments.length}</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - My Courses */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Announcements */}
            {announcements.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Latest Announcements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {announcements.slice(0, 3).map((announcement) => (
                    <div key={announcement.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                      <h4 className="font-medium">{announcement.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {announcement.content}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <Badge variant={announcement.is_global ? 'destructive' : 'secondary'}>
                          {announcement.is_global ? 'Global' : 'Course'}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(announcement.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* My Courses */}
            {enrollments.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">Continue Learning</h2>
                  <Button variant="outline" onClick={() => navigate('/my-courses')}>
                    View All
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {enrollments.slice(0, 4).map((enrollment) => (
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
                        
                        <Button className="w-full" size="sm" onClick={() => navigate(`/course/${enrollment.courses?.id}`)}>
                          <Play className="mr-2 h-4 w-4" />
                          {enrollment.progress_percentage === 0 ? 'Start Learning' : 'Continue'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardHeader>
                  <div className="mx-auto bg-muted rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
                    <BookOpen className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <CardTitle>Start Your Programming Journey</CardTitle>
                  <CardDescription>
                    Discover courses in Python, JavaScript, Java, C++, and more!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="bg-hero-gradient hover:opacity-90" onClick={() => navigate('/browse')}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Browse Courses
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Assignments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingAssignments.length > 0 ? (
                  <div className="space-y-3">
                    {upcomingAssignments.slice(0, 3).map((assignment) => (
                      <div key={assignment.id} className="p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                        <h4 className="font-medium text-sm">{assignment.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Due: {new Date(assignment.due_date).toLocaleDateString()}
                        </p>
                        <Badge variant="outline" className="mt-2 text-xs">
                          {assignment.courses?.title}
                        </Badge>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full mt-3" onClick={() => navigate('/assignments')}>
                      View All Assignments
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No upcoming assignments</p>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/browse')}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse Courses
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/discussions')}>
                  <Users className="mr-2 h-4 w-4" />
                  Join Discussions
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/certificates')}>
                  <Trophy className="mr-2 h-4 w-4" />
                  My Certificates
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </LMSLayout>
  );
};

export default Dashboard;