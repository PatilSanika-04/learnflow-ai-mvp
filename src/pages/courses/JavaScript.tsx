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

const JavaScript = () => {
  const { toast } = useToast();
  const [progress, setProgress] = useState(42);

  const courseContent = {
    title: "Advanced JavaScript Development",
    description: "Master modern JavaScript including ES6+, async programming, DOM manipulation, and popular frameworks.",
    level: "Intermediate to Advanced",
    duration: "50 hours",
    students: 18750,
    rating: 4.9,
    instructor: "Mike Chen",
    
    concepts: [
      {
        category: "ES6+ Features",
        items: [
          "Arrow Functions and Lexical Scope",
          "Destructuring Assignment (Arrays & Objects)",
          "Template Literals and Tagged Templates",
          "Classes and Inheritance",
          "Modules (Import/Export)",
          "Spread and Rest Operators"
        ]
      },
      {
        category: "Asynchronous Programming", 
        items: [
          "Promises and Promise Chaining",
          "Async/Await Syntax",
          "Fetch API and HTTP Requests",
          "Event Loop and Call Stack",
          "Error Handling in Async Code",
          "Promise.all, Promise.race"
        ]
      },
      {
        category: "DOM & Browser APIs",
        items: [
          "DOM Manipulation Methods",
          "Event Handling and Delegation",
          "Local Storage and Session Storage",
          "Geolocation and Notifications",
          "Canvas and WebGL Basics",
          "Service Workers and PWAs"
        ]
      },
      {
        category: "Advanced Concepts",
        items: [
          "Closures and Scope",
          "Prototypes and Inheritance",
          "Higher Order Functions",
          "Functional Programming",
          "Regular Expressions",
          "Performance Optimization"
        ]
      }
    ]
  };

  const codeExamples = {
    arrow: `// Arrow Functions
const numbers = [1, 2, 3, 4, 5];

// Traditional function
const squares1 = numbers.map(function(n) {
  return n * n;
});

// Arrow function
const squares2 = numbers.map(n => n * n);

// Multiple parameters
const add = (a, b) => a + b;
console.log(add(5, 3)); // 8`,

    async: `// Async/Await Example
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Usage
fetchUserData(123)
  .then(user => console.log(user))
  .catch(error => console.error(error));`,

    destructuring: `// Destructuring Examples
const person = {
  name: 'John',
  age: 30,
  address: {
    city: 'New York',
    country: 'USA'
  }
};

// Object destructuring
const { name, age } = person;
const { address: { city } } = person;

// Array destructuring
const colors = ['red', 'green', 'blue'];
const [first, second, ...rest] = colors;

// Function parameters
function greet({ name, age }) {
  return \`Hello \${name}, you are \${age} years old\`;
}`,

    classes: `// ES6 Classes
class Animal {
  constructor(name, species) {
    this.name = name;
    this.species = species;
  }
  
  speak() {
    return \`\${this.name} makes a sound\`;
  }
  
  static getSpecies() {
    return 'Various animal species';
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name, 'Canine');
    this.breed = breed;
  }
  
  speak() {
    return \`\${this.name} barks!\`;
  }
}

const myDog = new Dog('Buddy', 'Golden Retriever');
console.log(myDog.speak()); // Buddy barks!`
  };

  const projects = [
    {
      title: "Interactive Todo App",
      description: "Build a full-featured todo application with local storage and drag-and-drop",
      difficulty: "Intermediate",
      technologies: ["Vanilla JS", "HTML5", "CSS3", "Local Storage"],
      status: "completed",
      score: 92
    },
    {
      title: "Weather Dashboard",
      description: "Create a weather app using async/await and external APIs",
      difficulty: "Intermediate", 
      technologies: ["JavaScript", "Fetch API", "Charts.js", "CSS Grid"],
      status: "in-progress"
    },
    {
      title: "E-commerce Cart System",
      description: "Implement a shopping cart with state management and persistence",
      difficulty: "Advanced",
      technologies: ["ES6+", "Modules", "State Management", "Webpack"],
      status: "upcoming"
    }
  ];

  return (
    <LMSLayout>
      <div className="space-y-8">
        {/* Course Header */}
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-8 rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-yellow-500 text-white">
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
              <Badge className="mb-2 bg-yellow-500">{courseContent.level}</Badge>
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
                          <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0" />
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
                  <CardDescription>Click on each example to see modern JavaScript in action</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="arrow">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="arrow">Arrow Functions</TabsTrigger>
                      <TabsTrigger value="async">Async/Await</TabsTrigger>
                    </TabsList>
                    <TabsList className="grid w-full grid-cols-2 mt-2">
                      <TabsTrigger value="destructuring">Destructuring</TabsTrigger>
                      <TabsTrigger value="classes">ES6 Classes</TabsTrigger>
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
                          <Button size="sm" variant="outline">
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
                    { title: "MDN JavaScript Guide", type: "Documentation" },
                    { title: "ECMAScript Specifications", type: "Reference" },
                    { title: "JavaScript.info Tutorial", type: "Tutorial" },
                    { title: "You Don't Know JS", type: "Book Series" }
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
                    { title: "CodePen", type: "Online Editor" },
                    { title: "JSFiddle", type: "Code Playground" },
                    { title: "LeetCode", type: "Coding Challenges" },
                    { title: "HackerRank", type: "Skill Assessment" }
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
        <Chatbot programmingLanguage="JavaScript" />
      </div>
    </LMSLayout>
  );
};

export default JavaScript;