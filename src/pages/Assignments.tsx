import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Clock, CheckCircle, AlertTriangle, Upload } from 'lucide-react';
import LMSLayout from '@/components/LMSLayout';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Assignment {
  id: string;
  title: string;
  description: string;
  instructions: string;
  due_date: string;
  max_points: number;
  courses: {
    title: string;
    category: string;
  };
  assignment_submissions?: {
    id: string;
    submission_text: string;
    submitted_at: string;
    grade: number;
    feedback: string;
  }[];
}

const Assignments = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submissionText, setSubmissionText] = useState('');
  const [submittingId, setSubmittingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      if (!user) return;

      // Get user's enrolled courses
      const { data: enrollments } = await supabase
        .from('enrollments')
        .select('course_id')
        .eq('user_id', user.id);

      const courseIds = enrollments?.map(e => e.course_id) || [];

      if (courseIds.length === 0) {
        setLoading(false);
        return;
      }

      // Fetch assignments for enrolled courses
      const { data: assignmentsData, error } = await supabase
        .from('assignments')
        .select(`
          *,
          courses!inner (title, category),
          assignment_submissions!left (
            id, submission_text, submitted_at, grade, feedback
          )
        `)
        .in('course_id', courseIds)
        .eq('is_published', true)
        .eq('assignment_submissions.user_id', user.id)
        .order('due_date', { ascending: true });

      if (error) {
        console.error('Error fetching assignments:', error);
      } else {
        setAssignments(assignmentsData || []);
      }
      setLoading(false);
    };

    fetchAssignments();
  }, [user]);

  const handleSubmission = async (assignmentId: string) => {
    if (!user || !submissionText.trim()) return;

    setSubmittingId(assignmentId);

    try {
      const { error } = await supabase
        .from('assignment_submissions')
        .insert({
          assignment_id: assignmentId,
          user_id: user.id,
          submission_text: submissionText
        });

      if (error) {
        toast({
          title: "Submission Failed",
          description: "Unable to submit assignment. Please try again.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Assignment Submitted!",
          description: "Your submission has been received.",
        });
        setSubmissionText('');
        // Refresh assignments to show the submission
        window.location.reload();
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setSubmittingId(null);
    }
  };

  const getStatusInfo = (assignment: Assignment) => {
    const submission = assignment.assignment_submissions?.[0];
    const dueDate = new Date(assignment.due_date);
    const now = new Date();
    
    if (submission) {
      if (submission.grade !== null && submission.grade !== undefined) {
        return {
          status: 'graded',
          color: 'success',
          icon: CheckCircle,
          text: `Graded: ${submission.grade}/${assignment.max_points} points`
        };
      } else {
        return {
          status: 'submitted',
          color: 'secondary',
          icon: CheckCircle,
          text: 'Submitted - Awaiting Grade'
        };
      }
    } else if (dueDate < now) {
      return {
        status: 'overdue',
        color: 'destructive',
        icon: AlertTriangle,
        text: 'Overdue'
      };
    } else {
      return {
        status: 'pending',
        color: 'outline',
        icon: Clock,
        text: `Due ${dueDate.toLocaleDateString()}`
      };
    }
  };

  const pendingAssignments = assignments.filter(a => {
    const submission = a.assignment_submissions?.[0];
    const dueDate = new Date(a.due_date);
    return !submission && dueDate >= new Date();
  });

  const submittedAssignments = assignments.filter(a => a.assignment_submissions?.[0]);
  const overdueAssignments = assignments.filter(a => {
    const submission = a.assignment_submissions?.[0];
    const dueDate = new Date(a.due_date);
    return !submission && dueDate < new Date();
  });

  const AssignmentCard = ({ assignment }: { assignment: Assignment }) => {
    const statusInfo = getStatusInfo(assignment);
    const submission = assignment.assignment_submissions?.[0];

    return (
      <Card className="hover:shadow-medium transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {assignment.title}
              </CardTitle>
              <CardDescription className="mt-2">
                {assignment.description}
              </CardDescription>
              <Badge variant="outline" className="mt-2 w-fit">
                {assignment.courses?.title}
              </Badge>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge variant={statusInfo.color as any}>
                <statusInfo.icon className="mr-1 h-3 w-3" />
                {statusInfo.text}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {assignment.max_points} points
              </span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Instructions:</h4>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {assignment.instructions}
            </p>
          </div>

          {submission ? (
            <div className="space-y-3">
              <div>
                <h4 className="font-medium mb-2">Your Submission:</h4>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">{submission.submission_text}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Submitted on {new Date(submission.submitted_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              {submission.feedback && (
                <div>
                  <h4 className="font-medium mb-2">Instructor Feedback:</h4>
                  <div className="bg-accent/50 p-3 rounded-lg">
                    <p className="text-sm">{submission.feedback}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <h4 className="font-medium mb-2">Submit Your Work:</h4>
                <Textarea
                  placeholder="Type your assignment submission here..."
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  className="min-h-32"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Due: {new Date(assignment.due_date).toLocaleString()}
                </span>
                <Button 
                  onClick={() => handleSubmission(assignment.id)}
                  disabled={!submissionText.trim() || submittingId === assignment.id}
                >
                  {submittingId === assignment.id ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Submit
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <LMSLayout>
        <div className="space-y-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-64"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-48 bg-muted rounded-lg"></div>
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
        <div>
          <h1 className="text-3xl font-bold">Assignments</h1>
          <p className="text-muted-foreground mt-2">
            Complete assignments to demonstrate your learning progress
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assignments.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingAssignments.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Submitted</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{submittedAssignments.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overdueAssignments.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Assignment Tabs */}
        {assignments.length > 0 ? (
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All ({assignments.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({pendingAssignments.length})</TabsTrigger>
              <TabsTrigger value="submitted">Submitted ({submittedAssignments.length})</TabsTrigger>
              <TabsTrigger value="overdue">Overdue ({overdueAssignments.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {assignments.map((assignment) => (
                <AssignmentCard key={assignment.id} assignment={assignment} />
              ))}
            </TabsContent>

            <TabsContent value="pending" className="space-y-6">
              {pendingAssignments.length > 0 ? (
                pendingAssignments.map((assignment) => (
                  <AssignmentCard key={assignment.id} assignment={assignment} />
                ))
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <CheckCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No pending assignments</h3>
                    <p className="text-muted-foreground">All caught up! Great work!</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="submitted" className="space-y-6">
              {submittedAssignments.length > 0 ? (
                submittedAssignments.map((assignment) => (
                  <AssignmentCard key={assignment.id} assignment={assignment} />
                ))
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No submitted assignments</h3>
                    <p className="text-muted-foreground">Start working on your assignments</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="overdue" className="space-y-6">
              {overdueAssignments.length > 0 ? (
                overdueAssignments.map((assignment) => (
                  <AssignmentCard key={assignment.id} assignment={assignment} />
                ))
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <CheckCircle className="mx-auto h-12 w-12 text-success mb-4" />
                    <h3 className="text-lg font-medium mb-2">No overdue assignments</h3>
                    <p className="text-muted-foreground">Keep up the good work!</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        ) : (
          <Card className="text-center py-12">
            <CardHeader>
              <div className="mx-auto bg-muted rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle>No Assignments Available</CardTitle>
              <CardDescription>
                Enroll in courses to see assignments
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </LMSLayout>
  );
};

export default Assignments;