import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Award, Download, Calendar, CheckCircle, Clock, Trophy } from 'lucide-react';
import LMSLayout from '@/components/LMSLayout';
import { useAuth } from '@/hooks/useAuth';

interface Certificate {
  id: string;
  user_id: string;
  course_id: string;
  issued_at: string;
  certificate_url?: string;
}

interface Enrollment {
  course_id: string;
  progress_percentage: number;
  completed_at?: string;
  courses: {
    title: string;
    category: string;
    duration_hours: number;
  };
}

const Certificates = () => {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  const programmingCertificates = [
    {
      id: 'python-fundamentals',
      title: 'Python Programming Fundamentals',
      language: 'Python',
      level: 'Beginner',
      progress: 100,
      completed: true,
      completedDate: '2024-01-15',
      skills: ['Variables & Data Types', 'Control Flow', 'Functions', 'File Handling'],
      hours: 40,
      certificateId: 'PY-2024-001'
    },
    {
      id: 'javascript-advanced',
      title: 'Advanced JavaScript Development',
      language: 'JavaScript',
      level: 'Advanced',
      progress: 85,
      completed: false,
      completedDate: null,
      skills: ['ES6+ Features', 'Async Programming', 'DOM Manipulation', 'APIs'],
      hours: 50,
      certificateId: null
    },
    {
      id: 'java-oop',
      title: 'Java Object-Oriented Programming',
      language: 'Java',
      level: 'Intermediate',
      progress: 100,
      completed: true,
      completedDate: '2024-02-20',
      skills: ['Classes & Objects', 'Inheritance', 'Polymorphism', 'Exception Handling'],
      hours: 45,
      certificateId: 'JV-2024-002'
    },
    {
      id: 'cpp-systems',
      title: 'C++ Systems Programming',
      language: 'C++',
      level: 'Advanced',
      progress: 65,
      completed: false,
      completedDate: null,
      skills: ['Memory Management', 'Pointers', 'STL', 'Templates'],
      hours: 60,
      certificateId: null
    },
    {
      id: 'react-development',
      title: 'React Frontend Development',
      language: 'React',
      level: 'Intermediate',
      progress: 100,
      completed: true,
      completedDate: '2024-03-10',
      skills: ['Components', 'Hooks', 'State Management', 'Routing'],
      hours: 35,
      certificateId: 'RC-2024-003'
    },
    {
      id: 'nodejs-backend',
      title: 'Node.js Backend Development',
      language: 'Node.js',
      level: 'Intermediate',
      progress: 92,
      completed: false,
      completedDate: null,
      skills: ['Express.js', 'APIs', 'Database Integration', 'Authentication'],
      hours: 42,
      certificateId: null
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      // Fetch certificates
      const { data: certificatesData } = await supabase
        .from('certificates')
        .select('*')
        .eq('user_id', user.id);

      setCertificates(certificatesData || []);

      // Fetch enrollments with course details
      const { data: enrollmentsData } = await supabase
        .from('enrollments')
        .select(`
          *,
          courses (
            title,
            category,
            duration_hours
          )
        `)
        .eq('user_id', user.id);

      setEnrollments(enrollmentsData || []);
      setLoading(false);
    };

    fetchData();
  }, [user]);

  const downloadCertificate = (certificateId: string, courseName: string) => {
    // In a real application, this would download the actual certificate
    const element = document.createElement('a');
    const certificateContent = generateCertificateContent(courseName, certificateId);
    const file = new Blob([certificateContent], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = `certificate_${certificateId.toLowerCase()}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const generateCertificateContent = (courseName: string, certificateId: string) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Certificate of Completion</title>
        <style>
            body { font-family: 'Georgia', serif; margin: 0; padding: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
            .certificate { background: white; padding: 60px; margin: 0 auto; max-width: 800px; text-align: center; border: 10px solid #gold; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
            .header { font-size: 48px; color: #2c3e50; margin-bottom: 20px; font-weight: bold; }
            .subheader { font-size: 24px; color: #7f8c8d; margin-bottom: 40px; }
            .recipient { font-size: 36px; color: #e74c3c; margin: 30px 0; font-style: italic; }
            .course { font-size: 28px; color: #2c3e50; margin: 30px 0; font-weight: bold; }
            .date { font-size: 18px; color: #7f8c8d; margin-top: 40px; }
            .signature { margin-top: 60px; border-top: 2px solid #34495e; padding-top: 20px; }
            .cert-id { position: absolute; bottom: 20px; right: 20px; font-size: 12px; color: #bdc3c7; }
        </style>
    </head>
    <body>
        <div class="certificate">
            <div class="header">🏆 CERTIFICATE OF COMPLETION</div>
            <div class="subheader">Programming Excellence Achievement</div>
            <div style="margin: 40px 0;">This certifies that</div>
            <div class="recipient">${user?.user_metadata?.full_name || 'Student'}</div>
            <div style="margin: 20px 0;">has successfully completed</div>
            <div class="course">${courseName}</div>
            <div style="margin: 40px 0; font-size: 18px; line-height: 1.6;">
                This achievement represents dedicated learning and mastery of programming concepts,
                demonstrating commitment to professional development and technical excellence.
            </div>
            <div class="date">Issued on: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            <div class="signature">
                <div style="font-size: 18px; font-weight: bold;">Programming Academy</div>
                <div style="font-size: 14px; margin-top: 10px;">Director of Education</div>
            </div>
            <div class="cert-id">Certificate ID: ${certificateId}</div>
        </div>
    </body>
    </html>
    `;
  };

  if (loading) {
    return (
      <LMSLayout>
        <div className="space-y-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-64"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-64 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </LMSLayout>
    );
  }

  const completedCertificates = programmingCertificates.filter(cert => cert.completed);
  const inProgressCertificates = programmingCertificates.filter(cert => !cert.completed);

  return (
    <LMSLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">My Certificates</h1>
          <p className="text-muted-foreground mt-2">
            Track your learning achievements and download your certificates
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Certificates Earned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedCertificates.length}</div>
              <p className="text-xs text-muted-foreground">
                Completed courses with certificates
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                In Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressCertificates.length}</div>
              <p className="text-xs text-muted-foreground">
                Courses nearing completion
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Award className="h-4 w-4" />
                Total Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {completedCertificates.reduce((total, cert) => total + cert.hours, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Hours of completed learning
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Completed Certificates */}
        {completedCertificates.length > 0 && (
          <>
            <div>
              <h2 className="text-2xl font-bold mb-6">Earned Certificates</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {completedCertificates.map((certificate) => (
                <Card key={certificate.id} className="border-2 border-success/20 bg-success/5">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          <Award className="h-5 w-5 text-success" />
                          {certificate.title}
                        </CardTitle>
                        <CardDescription className="mt-2 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-success" />
                          Completed on {new Date(certificate.completedDate!).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Badge className="bg-success text-success-foreground">
                        {certificate.language}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Level:</span>
                        <div className="font-medium">{certificate.level}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <div className="font-medium">{certificate.hours} hours</div>
                      </div>
                    </div>

                    <div>
                      <span className="text-sm text-muted-foreground">Skills Mastered:</span>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {certificate.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-xs text-muted-foreground">
                        Certificate ID: {certificate.certificateId}
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => downloadCertificate(certificate.certificateId!, certificate.title)}
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* In Progress Courses */}
        {inProgressCertificates.length > 0 && (
          <>
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Courses in Progress</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inProgressCertificates.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          <Clock className="h-5 w-5" />
                          {course.title}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {course.progress}% Complete
                        </CardDescription>
                      </div>
                      <Badge variant="outline">
                        {course.language}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <Progress value={course.progress} />
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Level:</span>
                        <div className="font-medium">{course.level}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <div className="font-medium">{course.hours} hours</div>
                      </div>
                    </div>

                    <div>
                      <span className="text-sm text-muted-foreground">Skills You'll Master:</span>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {course.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t text-center">
                      <p className="text-sm text-muted-foreground mb-2">
                        {100 - course.progress}% remaining to earn certificate
                      </p>
                      <Button variant="outline" size="sm">
                        Continue Learning
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {completedCertificates.length === 0 && inProgressCertificates.length === 0 && (
          <Card className="text-center py-12">
            <CardHeader>
              <div className="mx-auto bg-muted rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle>No Certificates Yet</CardTitle>
              <CardDescription>
                Start learning and complete courses to earn your first certificate!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="mt-4">
                Browse Courses
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </LMSLayout>
  );
};

export default Certificates;