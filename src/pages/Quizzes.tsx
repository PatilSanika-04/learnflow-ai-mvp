import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Brain, Trophy, Play, CheckCircle } from 'lucide-react';
import LMSLayout from '@/components/LMSLayout';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Quiz {
  id: string;
  title: string;
  description: string;
  course_id: string;
  time_limit_minutes: number;
  total_questions: number;
  passing_score: number;
  courses: {
    title: string;
    category: string;
  };
}

interface QuizAttempt {
  id: string;
  quiz_id: string;
  score: number;
  total_points: number;
  completed_at: string;
}

const Quizzes = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      // Fetch available quizzes
      const { data: quizzesData, error } = await supabase
        .from('quizzes')
        .select(`
          *,
          courses (
            title,
            category
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching quizzes:', error);
      } else {
        setQuizzes(quizzesData || []);
      }

      // Fetch user's quiz attempts
      if (user) {
        const { data: attemptsData } = await supabase
          .from('quiz_attempts')
          .select('*')
          .eq('user_id', user.id);
        
        setAttempts(attemptsData || []);
      }

      setLoading(false);
    };

    fetchQuizzes();
  }, [user]);

  const startQuiz = async (quizId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to take quizzes.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('quiz_attempts')
        .insert({
          user_id: user.id,
          quiz_id: quizId,
          score: 0,
          total_points: 0
        });

      if (error) throw error;

      toast({
        title: "Quiz Started!",
        description: "Good luck with your quiz.",
      });
    } catch (error) {
      console.error('Error starting quiz:', error);
      toast({
        title: "Error",
        description: "Failed to start quiz. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getQuizAttempt = (quizId: string) => {
    return attempts.find(attempt => attempt.quiz_id === quizId);
  };

  const calculateScore = (attempt: QuizAttempt) => {
    if (attempt.total_points === 0) return 0;
    return Math.round((attempt.score / attempt.total_points) * 100);
  };

  const programmingQuizzes = [
    {
      id: 'python-basics',
      title: 'Python Fundamentals',
      description: 'Test your understanding of Python basics, syntax, and data types.',
      language: 'Python',
      difficulty: 'Beginner',
      questions: 15,
      timeLimit: 30,
      topics: ['Variables', 'Data Types', 'Control Flow', 'Functions']
    },
    {
      id: 'javascript-advanced',
      title: 'JavaScript Advanced Concepts',
      description: 'Advanced JavaScript concepts including closures, promises, and async/await.',
      language: 'JavaScript',
      difficulty: 'Advanced',
      questions: 20,
      timeLimit: 45,
      topics: ['Closures', 'Promises', 'Async/Await', 'ES6+']
    },
    {
      id: 'java-oop',
      title: 'Java Object-Oriented Programming',
      description: 'Test your knowledge of OOP concepts in Java.',
      language: 'Java',
      difficulty: 'Intermediate',
      questions: 18,
      timeLimit: 40,
      topics: ['Classes', 'Inheritance', 'Polymorphism', 'Encapsulation']
    },
    {
      id: 'cpp-memory',
      title: 'C++ Memory Management',
      description: 'Understanding pointers, references, and memory management in C++.',
      language: 'C++',
      difficulty: 'Advanced',
      questions: 12,
      timeLimit: 35,
      topics: ['Pointers', 'References', 'Dynamic Memory', 'Smart Pointers']
    },
    {
      id: 'react-hooks',
      title: 'React Hooks & State Management',
      description: 'Master React hooks and modern state management patterns.',
      language: 'React',
      difficulty: 'Intermediate',
      questions: 16,
      timeLimit: 30,
      topics: ['useState', 'useEffect', 'Custom Hooks', 'Context API']
    },
    {
      id: 'nodejs-backend',
      title: 'Node.js Backend Development',
      description: 'Test your Node.js backend development skills.',
      language: 'Node.js',
      difficulty: 'Intermediate',
      questions: 14,
      timeLimit: 35,
      topics: ['Express.js', 'APIs', 'Database', 'Authentication']
    }
  ];

  if (loading) {
    return (
      <LMSLayout>
        <div className="space-y-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-64"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-muted rounded-lg"></div>
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
          <h1 className="text-3xl font-bold">Programming Quizzes</h1>
          <p className="text-muted-foreground mt-2">
            Test your programming knowledge and track your learning progress
          </p>
        </div>

        {/* Programming Language Quizzes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programmingQuizzes.map((quiz) => (
            <Card key={quiz.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      {quiz.title}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {quiz.description}
                    </CardDescription>
                  </div>
                  <Badge variant={
                    quiz.difficulty === 'Beginner' ? 'secondary' :
                    quiz.difficulty === 'Intermediate' ? 'outline' : 'destructive'
                  }>
                    {quiz.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{quiz.timeLimit} min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4" />
                    <span>{quiz.questions} questions</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Topics Covered:</p>
                  <div className="flex flex-wrap gap-1">
                    {quiz.topics.map((topic, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                    {quiz.language}
                  </Badge>
                  <Button 
                    onClick={() => startQuiz(quiz.id)}
                    className="flex items-center gap-2"
                  >
                    <Play className="h-4 w-4" />
                    Start Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Database Quizzes */}
        {quizzes.length > 0 && (
          <>
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Course Quizzes</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map((quiz) => {
                const attempt = getQuizAttempt(quiz.id);
                const score = attempt ? calculateScore(attempt) : null;

                return (
                  <Card key={quiz.id} className="group hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="flex items-center gap-2">
                            <Brain className="h-5 w-5" />
                            {quiz.title}
                          </CardTitle>
                          <CardDescription className="mt-2">
                            {quiz.description}
                          </CardDescription>
                          <p className="text-sm text-muted-foreground mt-1">
                            Course: {quiz.courses?.title}
                          </p>
                        </div>
                        <Badge>{quiz.courses?.category}</Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{quiz.time_limit_minutes} min</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4" />
                          <span>{quiz.total_questions} questions</span>
                        </div>
                      </div>

                      {attempt && attempt.completed_at && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Your Score:</span>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-success" />
                              <span className="font-bold">{score}%</span>
                            </div>
                          </div>
                          <Progress value={score || 0} />
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          Passing Score: {quiz.passing_score}%
                        </div>
                        {attempt && attempt.completed_at ? (
                          <Button variant="outline" size="sm">
                            Retake Quiz
                          </Button>
                        ) : (
                          <Button 
                            onClick={() => startQuiz(quiz.id)}
                            className="flex items-center gap-2"
                          >
                            <Play className="h-4 w-4" />
                            Start Quiz
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </div>
    </LMSLayout>
  );
};

export default Quizzes;