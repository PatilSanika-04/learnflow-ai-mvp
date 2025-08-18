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

const Cpp = () => {
  const { toast } = useToast();
  const [progress, setProgress] = useState(28);

  const courseContent = {
    title: "C++ Programming Complete Guide",
    description: "Master C++ from fundamentals to advanced topics including STL, memory management, and modern C++.",
    level: "Intermediate to Advanced",
    duration: "70 hours",
    students: 19800,
    rating: 4.7,
    instructor: "Robert Chen",
    
    concepts: [
      {
        category: "C++ Fundamentals",
        items: [
          "Basic Syntax and Structure",
          "Variables and Data Types",
          "Pointers and References",
          "Control Structures",
          "Functions and Function Overloading",
          "Arrays and Strings"
        ]
      },
      {
        category: "Object-Oriented Programming",
        items: [
          "Classes and Objects",
          "Constructors and Destructors",
          "Inheritance and Polymorphism",
          "Virtual Functions",
          "Abstract Classes and Interfaces",
          "Operator Overloading"
        ]
      },
      {
        category: "Advanced C++ Features",
        items: [
          "Templates and Generic Programming",
          "STL (Standard Template Library)",
          "Smart Pointers and Memory Management",
          "Exception Handling",
          "Namespaces and Modules",
          "File I/O and Streams"
        ]
      },
      {
        category: "Modern C++ (C++11/14/17/20)",
        items: [
          "Auto Keyword and Type Deduction",
          "Lambda Expressions",
          "Move Semantics and Rvalue References",
          "Multithreading and Concurrency",
          "Concepts and Ranges (C++20)",
          "Coroutines and Modern Features"
        ]
      }
    ]
  };

  const codeExamples = {
    basic: `// Basic C++ Program
#include <iostream>
#include <string>
#include <vector>

int main() {
    // Basic variables
    int number = 42;
    double price = 19.99;
    std::string message = "Hello, C++!";
    
    // Output
    std::cout << message << std::endl;
    std::cout << "Number: " << number << std::endl;
    
    // Arrays and vectors
    int arr[5] = {1, 2, 3, 4, 5};
    std::vector<int> vec = {10, 20, 30, 40, 50};
    
    // Loops
    for (int i = 0; i < vec.size(); ++i) {
        std::cout << "Vector[" << i << "] = " << vec[i] << std::endl;
    }
    
    // Range-based for loop (C++11)
    for (const auto& value : vec) {
        std::cout << "Value: " << value << std::endl;
    }
    
    return 0;
}`,

    oop: `// Object-Oriented Programming Example
#include <iostream>
#include <string>
#include <memory>

class Animal {
protected:
    std::string name;
    int age;
    
public:
    // Constructor
    Animal(const std::string& n, int a) : name(n), age(a) {}
    
    // Virtual destructor
    virtual ~Animal() = default;
    
    // Pure virtual function (makes this an abstract class)
    virtual void makeSound() const = 0;
    
    // Virtual function
    virtual void displayInfo() const {
        std::cout << "Name: " << name << ", Age: " << age << std::endl;
    }
    
    // Getters
    std::string getName() const { return name; }
    int getAge() const { return age; }
};

class Dog : public Animal {
private:
    std::string breed;
    
public:
    Dog(const std::string& n, int a, const std::string& b) 
        : Animal(n, a), breed(b) {}
    
    // Override virtual function
    void makeSound() const override {
        std::cout << name << " says: Woof! Woof!" << std::endl;
    }
    
    void displayInfo() const override {
        Animal::displayInfo();
        std::cout << "Breed: " << breed << std::endl;
    }
};

int main() {
    // Using smart pointers (modern C++)
    auto dog = std::make_unique<Dog>("Buddy", 3, "Golden Retriever");
    
    dog->displayInfo();
    dog->makeSound();
    
    return 0;
}`,

    templates: `// Templates and Generic Programming
#include <iostream>
#include <vector>
#include <algorithm>
#include <type_traits>

// Function template
template<typename T>
T findMax(const std::vector<T>& vec) {
    if (vec.empty()) {
        throw std::runtime_error("Empty vector");
    }
    
    return *std::max_element(vec.begin(), vec.end());
}

// Class template
template<typename T>
class Stack {
private:
    std::vector<T> data;
    
public:
    void push(const T& item) {
        data.push_back(item);
    }
    
    T pop() {
        if (data.empty()) {
            throw std::runtime_error("Stack is empty");
        }
        T top = data.back();
        data.pop_back();
        return top;
    }
    
    bool empty() const {
        return data.empty();
    }
    
    size_t size() const {
        return data.size();
    }
};

// Template specialization
template<>
class Stack<bool> {
private:
    std::vector<bool> data;
    
public:
    void push(bool item) {
        data.push_back(item);
        std::cout << "Boolean stack: pushed " << std::boolalpha << item << std::endl;
    }
    
    bool pop() {
        if (data.empty()) {
            throw std::runtime_error("Boolean stack is empty");
        }
        bool top = data.back();
        data.pop_back();
        return top;
    }
};

int main() {
    // Using function template
    std::vector<int> numbers = {10, 5, 20, 15, 30};
    std::cout << "Max number: " << findMax(numbers) << std::endl;
    
    // Using class template
    Stack<int> intStack;
    intStack.push(10);
    intStack.push(20);
    std::cout << "Popped: " << intStack.pop() << std::endl;
    
    // Using specialized template
    Stack<bool> boolStack;
    boolStack.push(true);
    boolStack.push(false);
    
    return 0;
}`,

    modern: `// Modern C++ Features (C++11/14/17/20)
#include <iostream>
#include <vector>
#include <algorithm>
#include <memory>
#include <thread>
#include <future>
#include <functional>

class ModernCppExample {
public:
    // Lambda expressions and auto
    static void lambdaExample() {
        std::vector<int> numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        
        // Lambda with capture
        int multiplier = 2;
        auto multiplyBy = [multiplier](int x) { return x * multiplier; };
        
        // Transform using lambda
        std::transform(numbers.begin(), numbers.end(), numbers.begin(), multiplyBy);
        
        // Range-based for with auto
        for (const auto& num : numbers) {
            std::cout << num << " ";
        }
        std::cout << std::endl;
    }
    
    // Smart pointers and RAII
    static void smartPointerExample() {
        // Unique pointer
        auto ptr = std::make_unique<int>(42);
        std::cout << "Unique ptr value: " << *ptr << std::endl;
        
        // Shared pointer
        auto shared1 = std::make_shared<std::string>("Hello, World!");
        auto shared2 = shared1; // Reference count increases
        
        std::cout << "Shared ptr value: " << *shared1 << std::endl;
        std::cout << "Reference count: " << shared1.use_count() << std::endl;
    }
    
    // Move semantics
    static std::vector<int> createLargeVector() {
        std::vector<int> vec(1000000, 42);
        return vec; // Return value optimization + move semantics
    }
    
    // Multithreading example
    static void threadExample() {
        // Async execution
        auto future1 = std::async(std::launch::async, []() {
            std::this_thread::sleep_for(std::chrono::milliseconds(100));
            return 42;
        });
        
        auto future2 = std::async(std::launch::async, []() {
            std::this_thread::sleep_for(std::chrono::milliseconds(100));
            return 24;
        });
        
        // Wait for results
        int result1 = future1.get();
        int result2 = future2.get();
        
        std::cout << "Async results: " << result1 << ", " << result2 << std::endl;
    }
};

int main() {
    ModernCppExample::lambdaExample();
    ModernCppExample::smartPointerExample();
    
    // Move semantics in action
    auto largeVec = ModernCppExample::createLargeVector();
    std::cout << "Large vector size: " << largeVec.size() << std::endl;
    
    ModernCppExample::threadExample();
    
    return 0;
}`
  };

  const projects = [
    {
      title: "Memory Management System",
      description: "Build a custom memory allocator with garbage collection",
      difficulty: "Advanced",
      technologies: ["C++", "Memory Management", "Algorithms", "Performance"],
      status: "completed",
      score: 95
    },
    {
      title: "Game Engine Core",
      description: "Develop a basic 2D game engine with rendering and physics",
      difficulty: "Expert", 
      technologies: ["C++", "OpenGL", "Physics", "Game Development"],
      status: "in-progress"
    },
    {
      title: "High-Performance Calculator",
      description: "Create a scientific calculator with expression parsing",
      difficulty: "Intermediate",
      technologies: ["C++", "STL", "Parsing", "Mathematics"],
      status: "upcoming"
    }
  ];

  return (
    <LMSLayout>
      <div className="space-y-8">
        {/* Course Header */}
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-8 rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-purple-500 text-white">
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
              <Badge className="mb-2 bg-purple-500">{courseContent.level}</Badge>
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
                          <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
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
                  <CardDescription>Learn C++ programming with comprehensive examples</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="basic">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="basic">Basic C++</TabsTrigger>
                      <TabsTrigger value="oop">OOP Example</TabsTrigger>
                    </TabsList>
                    <TabsList className="grid w-full grid-cols-2 mt-2">
                      <TabsTrigger value="templates">Templates</TabsTrigger>
                      <TabsTrigger value="modern">Modern C++</TabsTrigger>
                    </TabsList>
                    
                    {Object.entries(codeExamples).map(([key, code]) => (
                      <TabsContent key={key} value={key} className="mt-4">
                        <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                          <code>{code}</code>
                        </pre>
                        <div className="mt-4 flex gap-2">
                          <Button size="sm" variant="outline">
                            <Play className="h-4 w-4 mr-2" />
                            Compile & Run
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
                    { title: "C++ Reference (cppreference)", type: "Documentation" },
                    { title: "ISO C++ Standards", type: "Standards" },
                    { title: "Effective Modern C++", type: "Book" },
                    { title: "C++ Core Guidelines", type: "Best Practices" }
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
                    { title: "Codeforces", type: "Competitive Programming" },
                    { title: "AtCoder", type: "Algorithm Contests" },
                    { title: "Compiler Explorer", type: "Code Analysis" },
                    { title: "Godbolt", type: "Assembly Viewer" }
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
        <Chatbot programmingLanguage="C++" />
      </div>
    </LMSLayout>
  );
};

export default Cpp;