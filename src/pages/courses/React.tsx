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

const ReactCourse = () => {
  const { toast } = useToast();
  const [progress, setProgress] = useState(55);

  const courseContent = {
    title: "React.js Complete Mastery",
    description: "Learn React from fundamentals to advanced patterns including hooks, context, performance optimization, and modern React features.",
    level: "Beginner to Advanced",
    duration: "45 hours",
    students: 28500,
    rating: 4.9,
    instructor: "Alex Rodriguez",
    
    concepts: [
      {
        category: "React Fundamentals",
        items: [
          "JSX Syntax and Elements",
          "Components and Props",
          "State and Lifecycle",
          "Event Handling",
          "Conditional Rendering",
          "Lists and Keys"
        ]
      },
      {
        category: "React Hooks",
        items: [
          "useState and useEffect",
          "useContext and useReducer",
          "useMemo and useCallback",
          "Custom Hooks",
          "useRef and useLayoutEffect",
          "Hooks Rules and Best Practices"
        ]
      },
      {
        category: "Advanced React Patterns",
        items: [
          "Context API and State Management",
          "Higher-Order Components (HOC)",
          "Render Props Pattern",
          "Error Boundaries",
          "Code Splitting and Lazy Loading",
          "Performance Optimization"
        ]
      },
      {
        category: "React Ecosystem",
        items: [
          "React Router for Navigation",
          "State Management (Redux/Zustand)",
          "Styling Solutions (CSS-in-JS)",
          "Testing with React Testing Library",
          "Next.js and Server-Side Rendering",
          "TypeScript with React"
        ]
      }
    ]
  };

  const codeExamples = {
    components: `// React Component Examples
import React, { useState } from 'react';

// Functional Component with Hooks
const Counter = () => {
  const [count, setCount] = useState(0);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);
  
  return (
    <div className="counter">
      <h2>Counter: {count}</h2>
      <div className="buttons">
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

// Component with Props
const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div className="user-card">
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <div className="actions">
        <button onClick={() => onEdit(user.id)}>Edit</button>
        <button onClick={() => onDelete(user.id)}>Delete</button>
      </div>
    </div>
  );
};

// Using the components
const App = () => {
  const user = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    avatar: "/avatar.jpg"
  };
  
  return (
    <div>
      <Counter />
      <UserCard 
        user={user}
        onEdit={(id) => console.log('Edit user:', id)}
        onDelete={(id) => console.log('Delete user:', id)}
      />
    </div>
  );
};

export default App;`,

    hooks: `// Advanced React Hooks Examples
import React, { useState, useEffect, useContext, useMemo, useCallback } from 'react';

// Context for theme management
const ThemeContext = React.createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom Hook for API data fetching
const useApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]);
  
  return { data, loading, error };
};

// Component using multiple hooks
const UserList = () => {
  const { theme } = useContext(ThemeContext);
  const { data: users, loading, error } = useApi('/api/users');
  const [filter, setFilter] = useState('');
  
  // Memoized filtered users
  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return users.filter(user => 
      user.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [users, filter]);
  
  // Memoized callback
  const handleFilterChange = useCallback((event) => {
    setFilter(event.target.value);
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div className={\`user-list \${theme}\`}>
      <input
        type="text"
        placeholder="Filter users..."
        value={filter}
        onChange={handleFilterChange}
      />
      {filteredUsers.map(user => (
        <div key={user.id} className="user-item">
          {user.name} - {user.email}
        </div>
      ))}
    </div>
  );
};`,

    advanced: `// Advanced React Patterns
import React, { Component, lazy, Suspense } from 'react';

// Error Boundary
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong!</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Try Again
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Higher-Order Component (HOC)
const withAuth = (WrappedComponent) => {
  return function AuthComponent(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(() => {
      // Check authentication status
      const checkAuth = async () => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
      };
      checkAuth();
    }, []);
    
    if (!isAuthenticated) {
      return <div>Please log in to access this content.</div>;
    }
    
    return <WrappedComponent {...props} />;
  };
};

// Lazy loaded component
const LazyComponent = lazy(() => import('./LazyLoadedComponent'));

// Render Props Pattern
const DataFetcher = ({ render, url }) => {
  const { data, loading, error } = useApi(url);
  
  return render({ data, loading, error });
};

// Usage of advanced patterns
const AdvancedApp = () => {
  return (
    <ErrorBoundary>
      <div className="app">
        <h1>Advanced React Patterns</h1>
        
        {/* Render Props */}
        <DataFetcher 
          url="/api/posts" 
          render={({ data, loading, error }) => {
            if (loading) return <div>Loading posts...</div>;
            if (error) return <div>Error: {error}</div>;
            return (
              <div>
                {data?.map(post => (
                  <div key={post.id}>{post.title}</div>
                ))}
              </div>
            );
          }}
        />
        
        {/* Lazy Loading with Suspense */}
         <Suspense fallback={<div>Loading component...</div>}>
           <LazyComponent />
         </Suspense>
      </div>
    </ErrorBoundary>
  );
};

// HOC Usage
const AuthenticatedComponent = withAuth(AdvancedApp);

export default AuthenticatedComponent;`,

    performance: `// React Performance Optimization
import React, { memo, useMemo, useCallback, useState } from 'react';

// Memoized component to prevent unnecessary re-renders
const ExpensiveItem = memo(({ item, onUpdate }) => {
  console.log('Rendering ExpensiveItem:', item.id);
  
  // Expensive calculation
  const expensiveValue = useMemo(() => {
    console.log('Calculating expensive value for:', item.id);
    return item.data.reduce((acc, val) => acc + val * 2, 0);
  }, [item.data]);
  
  return (
    <div className="item">
      <h3>{item.name}</h3>
      <p>Expensive Value: {expensiveValue}</p>
      <button onClick={() => onUpdate(item.id)}>
        Update Item
      </button>
    </div>
  );
});

// Virtualized List for large datasets
const VirtualizedList = ({ items, itemHeight = 50 }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerHeight = 400;
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleCount, items.length - 1);
  const visibleItems = items.slice(startIndex, endIndex + 1);
  
  return (
    <div 
      className="virtual-list"
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: items.length * itemHeight }}>
        <div 
          style={{ 
            transform: \`translateY(\${startIndex * itemHeight}px)\`
          }}
        >
          {visibleItems.map((item, index) => (
            <div 
              key={startIndex + index} 
              style={{ height: itemHeight }}
              className="virtual-item"
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Performance optimized parent component
const PerformanceDemo = () => {
  const [items, setItems] = useState(() => 
    Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      name: \`Item \${i}\`,
      data: Array.from({ length: 100 }, () => Math.random())
    }))
  );
  
  const [filter, setFilter] = useState('');
  const [count, setCount] = useState(0);
  
  // Memoized filtered items
  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return items.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]);
  
  // Memoized callback to prevent child re-renders
  const handleItemUpdate = useCallback((id) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, data: item.data.map(() => Math.random()) }
          : item
      )
    );
  }, []);
  
  return (
    <div>
      <div>
        <button onClick={() => setCount(c => c + 1)}>
          Count: {count}
        </button>
        <input
          type="text"
          placeholder="Filter items..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      
      <h2>Performance Optimized List</h2>
      {filteredItems.slice(0, 10).map(item => (
        <ExpensiveItem 
          key={item.id} 
          item={item} 
          onUpdate={handleItemUpdate}
        />
      ))}
      
      <h2>Virtualized List</h2>
      <VirtualizedList items={items} />
    </div>
  );
};

export default PerformanceDemo;`
  };

  const projects = [
    {
      title: "E-commerce Dashboard",
      description: "Build a complete admin dashboard with React, Context API, and Chart.js",
      difficulty: "Advanced",
      technologies: ["React", "Context API", "Chart.js", "Tailwind CSS"],
      status: "completed",
      score: 94
    },
    {
      title: "Real-time Chat App",
      description: "Create a chat application with React, WebSocket, and user authentication",
      difficulty: "Intermediate", 
      technologies: ["React", "WebSocket", "Firebase Auth", "Material-UI"],
      status: "in-progress"
    },
    {
      title: "Task Management System",
      description: "Develop a Kanban-style task manager with drag-and-drop functionality",
      difficulty: "Intermediate",
      technologies: ["React", "React DnD", "Local Storage", "CSS Modules"],
      status: "upcoming"
    }
  ];

  return (
    <LMSLayout>
      <div className="space-y-8">
        {/* Course Header */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-8 rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-cyan-500 text-white">
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
              <Badge className="mb-2 bg-cyan-500">{courseContent.level}</Badge>
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
                          <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0" />
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
                  <CardTitle>Interactive React Examples</CardTitle>
                  <CardDescription>Learn React with practical, runnable examples</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="components">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="components">Components & Props</TabsTrigger>
                      <TabsTrigger value="hooks">Hooks & State</TabsTrigger>
                    </TabsList>
                    <TabsList className="grid w-full grid-cols-2 mt-2">
                      <TabsTrigger value="advanced">Advanced Patterns</TabsTrigger>
                      <TabsTrigger value="performance">Performance</TabsTrigger>
                    </TabsList>
                    
                    {Object.entries(codeExamples).map(([key, code]) => (
                      <TabsContent key={key} value={key} className="mt-4">
                        <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                          <code>{code}</code>
                        </pre>
                        <div className="mt-4 flex gap-2">
                          <Button size="sm" variant="outline">
                            <Play className="h-4 w-4 mr-2" />
                            Run Example
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
                    { title: "React Official Documentation", type: "Documentation" },
                    { title: "React DevTools", type: "Development Tool" },
                    { title: "React Patterns", type: "Best Practices" },
                    { title: "React Testing Library", type: "Testing Framework" }
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
                    { title: "CodeSandbox", type: "Online IDE" },
                    { title: "React CodePen", type: "Code Playground" },
                    { title: "Scrimba React Course", type: "Interactive Learning" },
                    { title: "React Challenges", type: "Coding Exercises" }
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
        <Chatbot programmingLanguage="React" />
      </div>
    </LMSLayout>
  );
};

export default ReactCourse;