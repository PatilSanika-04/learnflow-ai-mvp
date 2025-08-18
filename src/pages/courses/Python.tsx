import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, BookOpen, Clock, Users, Award, Code, FileText, MessageSquare } from 'lucide-react';
import LMSLayout from '@/components/LMSLayout';
import Chatbot from '@/components/Chatbot';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const Python = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeLesson, setActiveLesson] = useState(0);
  const [progress, setProgress] = useState(35);

  const courseContent = {
    title: "Python Programming Fundamentals",
    description: "Master Python programming from basics to advanced concepts. Learn data structures, algorithms, web development, and more.",
    level: "Beginner to Intermediate",
    duration: "40 hours",
    students: 15420,
    rating: 4.8,
    instructor: "Dr. Sarah Johnson",
    
    modules: [
      {
        title: "Python Basics",
        lessons: [
          { title: "Introduction to Python", duration: "15 min", completed: true },
          { title: "Variables and Data Types", duration: "20 min", completed: true },
          { title: "Input and Output", duration: "18 min", completed: true },
          { title: "Comments and Documentation", duration: "12 min", completed: false }
        ]
      },
      {
        title: "Control Flow",
        lessons: [
          { title: "If Statements", duration: "22 min", completed: true },
          { title: "Loops - For and While", duration: "25 min", completed: false },
          { title: "Break and Continue", duration: "15 min", completed: false },
          { title: "Match Statements (Python 3.10+)", duration: "18 min", completed: false }
        ]
      },
      {
        title: "Data Structures",
        lessons: [
          { title: "Lists and List Methods", duration: "30 min", completed: false },
          { title: "Dictionaries", duration: "25 min", completed: false },
          { title: "Sets and Tuples", duration: "20 min", completed: false },
          { title: "String Manipulation", duration: "22 min", completed: false }
        ]
      },
      {
        title: "Functions and Modules",
        lessons: [
          { title: "Defining Functions", duration: "28 min", completed: false },
          { title: "Parameters and Arguments", duration: "24 min", completed: false },
          { title: "Lambda Functions", duration: "18 min", completed: false },
          { title: "Modules and Packages", duration: "26 min", completed: false }
        ]
      }
    ],

    assignments: [
      {
        title: "Python Basics Assessment",
        description: "Complete exercises covering variables, data types, and basic operations",
        dueDate: "2024-01-20",
        points: 100,
        status: "completed",
        score: 95
      },
      {
        title: "Control Flow Practice",
        description: "Solve problems using if statements, loops, and conditional logic",
        dueDate: "2024-01-25",
        points: 150,
        status: "pending"
      },
      {
        title: "Data Structures Project",
        description: "Build a contact manager using lists and dictionaries",
        dueDate: "2024-02-01",
        points: 200,
        status: "upcoming"
      }
    ],

    quizzes: [
      {
        title: "Python Syntax Quiz",
        questions: 15,
        timeLimit: 20,
        attempts: 3,
        bestScore: 87,
        lastAttempt: "2024-01-18"
      },
      {
        title: "Data Types Assessment",
        questions: 12,
        timeLimit: 15,
        attempts: 2,
        bestScore: null,
        lastAttempt: null
      }
    ],

    resources: [
      { title: "Python Official Documentation", type: "link", url: "#" },
      { title: "Python Style Guide (PEP 8)", type: "link", url: "#" },
      { title: "Python Cheat Sheet", type: "pdf", url: "#" },
      { title: "Practice Exercises", type: "pdf", url: "#" }
    ]
  };

  const pythonConcepts = [
    {
      category: "Core Concepts",
      items: [
        "Variables and Data Types (int, float, string, boolean)",
        "Operators (arithmetic, comparison, logical, assignment)",
        "Input/Output functions (input(), print())",
        "String formatting (f-strings, .format(), %)"
      ]
    },
    {
      category: "Control Structures",
      items: [
        "Conditional statements (if, elif, else)",
        "Loops (for, while, nested loops)",
        "Loop control (break, continue, pass)",
        "Exception handling (try, except, finally)"
      ]
    },
    {
      category: "Data Structures",
      items: [
        "Lists (creation, indexing, slicing, methods)",
        "Dictionaries (key-value pairs, methods)",
        "Sets (unique elements, operations)",
        "Tuples (immutable sequences)"
      ]
    },
    {
      category: "Functions & OOP",
      items: [
        "Function definition and calling",
        "Parameters and return values",
        "Classes and objects",
        "Inheritance and polymorphism"
      ]
    }
  ];

  const codeExamples = {
    variables: `# Variables and Data Types
name = "Python Learner"
age = 25
height = 5.8
is_student = True

print(f"Hello {name}! You are {age} years old.")`,

    loops: `# For Loop Example
fruits = ["apple", "banana", "orange"]
for fruit in fruits:
    print(f"I like {fruit}")

# While Loop Example
count = 0
while count < 5:
    print(f"Count: {count}")
    count += 1`,

    functions: `# Function Definition
def calculate_area(length, width):
    """Calculate the area of a rectangle"""
    area = length * width
    return area

# Function Call
result = calculate_area(10, 5)
print(f"Area: {result}")`,

    classes: `# Class Definition
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        self.grades = []
    
    def add_grade(self, grade):
        self.grades.append(grade)
    
    def get_average(self):
        return sum(self.grades) / len(self.grades)

# Create instance
student = Student("Alice", 20)
student.add_grade(85)
student.add_grade(92)`
  };

  const startLesson = (moduleIndex: number, lessonIndex: number) => {
    const lessonTitle = courseContent.modules[moduleIndex].lessons[lessonIndex].title;
    setActiveLesson(lessonIndex);
    toast({
      title: 'Lesson Started',
      description: `Starting: ${lessonTitle}`,
    });
  };

  const completeAssignment = (assignmentIndex: number) => {
    toast({
      title: "Assignment Opened",
      description: `Opening: ${courseContent.assignments[assignmentIndex].title}`,
    });
  };

  return (
    <LMSLayout>
      <div className="space-y-8">
        {/* Course Header */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-8 rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-blue-500 text-white">
                  <Code className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{courseContent.title}</h1>
                  <p className="text-muted-foreground mt-1">{courseContent.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{courseContent.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{courseContent.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span>⭐ {courseContent.rating}/5</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <Badge className="mb-2">{courseContent.level}</Badge>
              <div className="text-sm text-muted-foreground mb-2">
                Instructor: {courseContent.instructor}
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Your Progress</div>
                <Progress value={progress} className="w-32" />
                <div className="text-xs text-muted-foreground">{progress}% complete</div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="lessons" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="concepts">Concepts</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="lessons" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {courseContent.modules.map((module, moduleIndex) => (
                <Card key={moduleIndex}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      {module.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div key={lessonIndex} className="flex items-center justify-between p-3 rounded-lg border">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${
                              lesson.completed ? 'bg-success' : 'bg-muted'
                            }`} />
                            <div>
                              <div className="font-medium text-sm">{lesson.title}</div>
                              <div className="text-xs text-muted-foreground">{lesson.duration}</div>
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            variant={lesson.completed ? "outline" : "default"}
                            onClick={() => startLesson(moduleIndex, lessonIndex)}
                          >
                            <Play className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Lesson Viewer with video & notes */}
            <Card>
              <CardHeader>
                <CardTitle>Lesson Viewer</CardTitle>
                <CardDescription>Watch the lesson video and take notes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video w-full rounded-lg overflow-hidden border">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/kqtD5dpn9C8`}
                    title="Python lesson video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Your Notes</label>
                  <textarea
                    className="w-full mt-2 p-3 rounded-md border bg-background"
                    rows={6}
                    placeholder="Write your notes here..."
                    onChange={(e) => {
                      try {
                        const key = `lms:notes:${user?.id || 'anon'}:python:lesson-${activeLesson}`;
                        localStorage.setItem(key, e.target.value);
                      } catch {}
                    }}
                    defaultValue={() => {
                      try {
                        const key = `lms:notes:${user?.id || 'anon'}:python:lesson-${activeLesson}`;
                        return localStorage.getItem(key) || '';
                      } catch { return ''; }
                    } as any}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="concepts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                {pythonConcepts.map((section, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{section.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Code Examples</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="variables">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="variables">Variables</TabsTrigger>
                        <TabsTrigger value="loops">Loops</TabsTrigger>
                      </TabsList>
                      <TabsList className="grid w-full grid-cols-2 mt-2">
                        <TabsTrigger value="functions">Functions</TabsTrigger>
                        <TabsTrigger value="classes">Classes</TabsTrigger>
                      </TabsList>
                      
                      {Object.entries(codeExamples).map(([key, code]) => (
                        <TabsContent key={key} value={key}>
                          <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                            <code>{code}</code>
                          </pre>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courseContent.assignments.map((assignment, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        {assignment.title}
                      </CardTitle>
                      <Badge variant={
                        assignment.status === 'completed' ? 'default' :
                        assignment.status === 'pending' ? 'secondary' : 'outline'
                      }>
                        {assignment.status}
                      </Badge>
                    </div>
                    <CardDescription>{assignment.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Due Date:</span>
                        <span className="font-medium">{assignment.dueDate}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Points:</span>
                        <span className="font-medium">{assignment.points}</span>
                      </div>
                      {assignment.score && (
                        <div className="flex items-center justify-between text-sm">
                          <span>Score:</span>
                          <Badge className="bg-success">{assignment.score}/{assignment.points}</Badge>
                        </div>
                      )}
                      <Button 
                        className="w-full" 
                        variant={assignment.status === 'completed' ? 'outline' : 'default'}
                        onClick={() => completeAssignment(index)}
                      >
                        {assignment.status === 'completed' ? 'View Submission' : 
                         assignment.status === 'pending' ? 'Submit Assignment' : 'View Details'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quizzes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courseContent.quizzes.map((quiz, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      {quiz.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Questions:</span>
                          <div className="font-medium">{quiz.questions}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Time Limit:</span>
                          <div className="font-medium">{quiz.timeLimit} min</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Attempts:</span>
                          <div className="font-medium">{quiz.attempts} allowed</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Best Score:</span>
                          <div className="font-medium">
                            {quiz.bestScore ? `${quiz.bestScore}%` : 'Not taken'}
                          </div>
                        </div>
                      </div>
                      
                      {quiz.lastAttempt && (
                        <div className="text-xs text-muted-foreground">
                          Last attempt: {quiz.lastAttempt}
                        </div>
                      )}
                      
                      <Button className="w-full">
                        {quiz.bestScore ? 'Retake Quiz' : 'Start Quiz'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courseContent.resources.map((resource, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          resource.type === 'link' ? 'bg-blue-500/10 text-blue-500' : 'bg-red-500/10 text-red-500'
                        }`}>
                          {resource.type === 'link' ? <BookOpen className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                        </div>
                        <div>
                          <div className="font-medium">{resource.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {resource.type === 'link' ? 'External Link' : 'PDF Document'}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        {resource.type === 'link' ? 'Visit' : 'Download'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Chatbot */}
        <Chatbot programmingLanguage="Python" />
      </div>
    </LMSLayout>
  );
};

export default Python;