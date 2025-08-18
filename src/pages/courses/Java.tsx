import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, BookOpen, Clock, Users, Award, Code, FileText, MessageSquare } from 'lucide-react';
import LMSLayout from '@/components/LMSLayout';
import Chatbot from '@/components/Chatbot';
import { useToast } from '@/hooks/use-toast';

const Java = () => {
  const { toast } = useToast();
  const [progress, setProgress] = useState(35);

  const courseContent = {
    title: "Java Programming Mastery",
    description: "Learn Java from basics to advanced including OOP, Spring Framework, and enterprise development.",
    level: "Beginner to Advanced",
    duration: "60 hours",
    students: 22500,
    rating: 4.8,
    instructor: "Sarah Kumar",
    
    concepts: [
      {
        category: "Core Java Fundamentals",
        items: [
          "Java Syntax and Basic Structure",
          "Variables and Data Types",
          "Control Flow (if, for, while)",
          "Methods and Functions",
          "Arrays and Collections",
          "Exception Handling"
        ]
      },
      {
        category: "Object-Oriented Programming",
        items: [
          "Classes and Objects",
          "Inheritance and Polymorphism",
          "Encapsulation and Abstraction",
          "Interfaces and Abstract Classes",
          "Method Overloading and Overriding",
          "Static Methods and Variables"
        ]
      },
      {
        category: "Advanced Java Features",
        items: [
          "Generics and Collections Framework",
          "Lambda Expressions and Streams",
          "Multithreading and Concurrency",
          "File I/O and NIO",
          "Reflection and Annotations",
          "JDBC Database Connectivity"
        ]
      },
      {
        category: "Spring Framework",
        items: [
          "Spring Boot Fundamentals",
          "Dependency Injection",
          "Spring MVC and REST APIs",
          "Spring Data JPA",
          "Spring Security",
          "Microservices with Spring Cloud"
        ]
      }
    ]
  };

  const codeExamples = {
    basic: `// Basic Java Class
public class HelloWorld {
    // Main method - entry point
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Variables and data types
        int number = 42;
        String message = "Learning Java!";
        boolean isJavaFun = true;
        
        // Method call
        greetUser(message);
    }
    
    // Custom method
    public static void greetUser(String message) {
        System.out.println("Message: " + message);
    }
}`,

    oop: `// Object-Oriented Programming Example
public class Student {
    // Private fields (encapsulation)
    private String name;
    private int age;
    private List<String> courses;
    
    // Constructor
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
        this.courses = new ArrayList<>();
    }
    
    // Getters and setters
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    // Method to add course
    public void enrollCourse(String course) {
        courses.add(course);
        System.out.println(name + " enrolled in " + course);
    }
    
    // Method to display student info
    public void displayInfo() {
        System.out.println("Student: " + name + ", Age: " + age);
        System.out.println("Enrolled courses: " + courses);
    }
}`,

    streams: `// Modern Java with Streams and Lambda
import java.util.*;
import java.util.stream.*;

public class StreamExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList(
            "Alice", "Bob", "Charlie", "David", "Eve"
        );
        
        // Filter and transform using streams
        List<String> result = names.stream()
            .filter(name -> name.length() > 3)  // Lambda expression
            .map(String::toUpperCase)           // Method reference
            .sorted()                           // Sort alphabetically
            .collect(Collectors.toList());      // Collect to list
        
        result.forEach(System.out::println);   // Print each element
        
        // Optional example
        Optional<String> longest = names.stream()
            .max(Comparator.comparing(String::length));
            
        longest.ifPresent(name -> 
            System.out.println("Longest name: " + name));
    }
}`,

    springboot: `// Spring Boot REST Controller
import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@SpringBootApplication
@RestController
public class StudentController {

    private List<Student> students = new ArrayList<>();
    
    @GetMapping("/students")
    public List<Student> getAllStudents() {
        return students;
    }
    
    @PostMapping("/students")
    public Student createStudent(@RequestBody Student student) {
        students.add(student);
        return student;
    }
    
    @GetMapping("/students/{id}")
    public Student getStudent(@PathVariable Long id) {
        return students.stream()
            .filter(s -> s.getId().equals(id))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Student not found"));
    }
    
    public static void main(String[] args) {
        SpringApplication.run(StudentController.class, args);
    }
}`
  };

  const projects = [
    {
      title: "Banking Management System",
      description: "Build a complete banking application with account management and transactions",
      difficulty: "Advanced",
      technologies: ["Java", "Spring Boot", "MySQL", "JPA"],
      status: "completed",
      score: 88
    },
    {
      title: "Library Management API",
      description: "Create REST APIs for book management with Spring Boot",
      difficulty: "Intermediate", 
      technologies: ["Spring Boot", "REST APIs", "H2 Database", "Maven"],
      status: "in-progress"
    },
    {
      title: "E-commerce Microservice",
      description: "Develop a microservice architecture for online shopping",
      difficulty: "Advanced",
      technologies: ["Spring Cloud", "Docker", "PostgreSQL", "RabbitMQ"],
      status: "upcoming"
    }
  ];

  return (
    <LMSLayout>
      <div className="space-y-8">
        {/* Course Header */}
        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 p-8 rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-red-500 text-white">
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
              <Badge className="mb-2 bg-red-500">{courseContent.level}</Badge>
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

        <Tabs defaultValue="concepts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="concepts">Concepts</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="concepts" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courseContent.concepts.map((section, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{section.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3 text-sm">
                          <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="examples" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Interactive Code Examples</CardTitle>
                  <CardDescription>Explore Java programming concepts with practical examples</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="basic">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="basic">Basic Java</TabsTrigger>
                      <TabsTrigger value="oop">OOP Example</TabsTrigger>
                    </TabsList>
                    <TabsList className="grid w-full grid-cols-2 mt-2">
                      <TabsTrigger value="streams">Streams & Lambda</TabsTrigger>
                      <TabsTrigger value="springboot">Spring Boot</TabsTrigger>
                    </TabsList>
                    
                    {Object.entries(codeExamples).map(([key, code]) => (
                      <TabsContent key={key} value={key} className="mt-4">
                        <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                          <code>{code}</code>
                        </pre>
                        <div className="mt-4 flex gap-2">
                          <Button size="sm" variant="outline">
                            <Play className="h-4 w-4 mr-2" />
                            Run Code
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => {
                            navigator.clipboard.writeText(code).then(() => toast({ title: 'Copied!', description: 'Code copied to clipboard' }));
                          }}>
                            Copy Code
                          </Button>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <Badge variant={
                        project.status === 'completed' ? 'default' :
                        project.status === 'in-progress' ? 'secondary' : 'outline'
                      }>
                        {project.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <span className="text-sm font-medium">Difficulty: </span>
                      <Badge variant="outline">{project.difficulty}</Badge>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium mb-2 block">Technologies:</span>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {project.score && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Score:</span>
                        <Badge className="bg-success">{project.score}/100</Badge>
                      </div>
                    )}

                    <Button className="w-full">
                      {project.status === 'completed' ? 'View Project' :
                       project.status === 'in-progress' ? 'Continue' : 'Start Project'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Essential Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: "Oracle Java Documentation", type: "Official Docs" },
                    { title: "Spring Framework Guide", type: "Framework" },
                    { title: "Java The Complete Reference", type: "Book" },
                    { title: "Effective Java by Joshua Bloch", type: "Best Practices" }
                  ].map((resource, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{resource.title}</div>
                        <div className="text-sm text-muted-foreground">{resource.type}</div>
                      </div>
                      <Button variant="outline" size="sm">Visit</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Practice Platforms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: "LeetCode Java", type: "Coding Problems" },
                    { title: "HackerRank Java", type: "Skills Assessment" },
                    { title: "Spring.io Guides", type: "Tutorials" },
                    { title: "Java Code Geeks", type: "Community" }
                  ].map((platform, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{platform.title}</div>
                        <div className="text-sm text-muted-foreground">{platform.type}</div>
                      </div>
                      <Button variant="outline" size="sm">Practice</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Chatbot */}
        <Chatbot programmingLanguage="Java" />
      </div>
    </LMSLayout>
  );
};

export default Java;