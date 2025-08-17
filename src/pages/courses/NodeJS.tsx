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

const NodeJS = () => {
  const { toast } = useToast();
  const [progress, setProgress] = useState(38);

  const courseContent = {
    title: "Node.js Backend Development",
    description: "Master server-side JavaScript with Node.js, Express, databases, and microservices architecture.",
    level: "Intermediate to Advanced",
    duration: "55 hours",
    students: 21200,
    rating: 4.8,
    instructor: "David Johnson",
    
    concepts: [
      {
        category: "Node.js Fundamentals",
        items: [
          "Node.js Runtime and V8 Engine",
          "Modules and CommonJS",
          "Event Loop and Asynchronous Programming",
          "File System Operations",
          "Process and Environment Variables",
          "NPM and Package Management"
        ]
      },
      {
        category: "Express.js Framework",
        items: [
          "Express Application Structure",
          "Routing and Middleware",
          "Request and Response Objects",
          "Template Engines (EJS, Handlebars)",
          "Static Files and Public Directory",
          "Error Handling and Validation"
        ]
      },
      {
        category: "Database Integration",
        items: [
          "MongoDB with Mongoose ODM",
          "PostgreSQL with Sequelize ORM",
          "Redis for Caching",
          "Database Connection Pooling",
          "Transactions and ACID Properties",
          "Database Migrations and Seeding"
        ]
      },
      {
        category: "Advanced Topics",
        items: [
          "Authentication and Authorization",
          "RESTful API Design",
          "GraphQL with Apollo Server",
          "WebSocket and Real-time Communication",
          "Microservices Architecture",
          "Testing and Deployment"
        ]
      }
    ]
  };

  const codeExamples = {
    basic: `// Basic Node.js Server
const http = require('http');
const fs = require('fs');
const path = require('path');

// Create HTTP server
const server = http.createServer((req, res) => {
  // Get the file path from URL
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }
  
  // Get file extension
  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
  };
  
  const contentType = mimeTypes[extname] || 'application/octet-stream';
  
  // Read and serve the file
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // File not found
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - File Not Found</h1>', 'utf-8');
      } else {
        // Server error
        res.writeHead(500);
        res.end(\`Server Error: \${error.code}\`);
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,

    express: `// Express.js API with Middleware
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Logging middleware
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Custom middleware
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }
  
  try {
    // Verify JWT token here
    req.user = { id: 1, username: 'testuser' }; // Mock user
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Routes
app.get('/api/users', authMiddleware, async (req, res) => {
  try {
    // Mock database query
    const users = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ];
    
    res.json({
      success: true,
      data: users,
      message: 'Users retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.post('/api/users', authMiddleware, async (req, res) => {
  try {
    const { name, email } = req.body;
    
    // Validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Name and email are required'
      });
    }
    
    // Mock user creation
    const newUser = {
      id: Date.now(),
      name,
      email,
      createdAt: new Date().toISOString()
    };
    
    res.status(201).json({
      success: true,
      data: newUser,
      message: 'User created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Global error handler
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,

    database: `// MongoDB Integration with Mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v);
      },
      message: 'Invalid email format'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profile: {
    firstName: String,
    lastName: String,
    bio: String,
    avatar: String
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: Date
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance methods
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateToken = function() {
  return jwt.sign(
    { 
      id: this._id, 
      username: this.username,
      role: this.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Static methods
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

userSchema.statics.createUser = async function(userData) {
  const user = new this(userData);
  await user.save();
  return user;
};

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return \`\${this.profile.firstName} \${this.profile.lastName}\`;
});

// Create model
const User = mongoose.model('User', userSchema);

// Usage example
const createNewUser = async () => {
  try {
    const newUser = await User.createUser({
      username: 'johndoe',
      email: 'john@example.com',
      password: 'securepassword123',
      profile: {
        firstName: 'John',
        lastName: 'Doe',
        bio: 'Software developer'
      }
    });
    
    console.log('User created:', newUser.username);
    const token = newUser.generateToken();
    console.log('JWT Token:', token);
  } catch (error) {
    console.error('Error creating user:', error.message);
  }
};

module.exports = User;`,

    websocket: `// WebSocket Server with Socket.IO
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// In-memory storage (use Redis in production)
const connectedUsers = new Map();
const chatRooms = new Map();

// Socket.IO middleware for authentication
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  
  // Verify JWT token here
  if (token === 'valid-token') {
    socket.userId = 'user-123'; // Mock user ID
    socket.username = 'User123'; // Mock username
    next();
  } else {
    next(new Error('Authentication error'));
  }
});

// Socket connection handling
io.on('connection', (socket) => {
  console.log(\`User connected: \${socket.username}\`);
  
  // Store connected user
  connectedUsers.set(socket.userId, {
    socketId: socket.id,
    username: socket.username,
    status: 'online',
    joinedAt: new Date()
  });
  
  // Broadcast user list update
  io.emit('users:update', Array.from(connectedUsers.values()));
  
  // Join room event
  socket.on('room:join', (roomId) => {
    socket.join(roomId);
    
    // Initialize room if doesn't exist
    if (!chatRooms.has(roomId)) {
      chatRooms.set(roomId, {
        id: roomId,
        name: \`Room \${roomId}\`,
        users: new Set(),
        messages: []
      });
    }
    
    const room = chatRooms.get(roomId);
    room.users.add(socket.userId);
    
    socket.emit('room:joined', {
      roomId,
      messages: room.messages.slice(-50) // Last 50 messages
    });
    
    // Notify others in room
    socket.to(roomId).emit('user:joined', {
      userId: socket.userId,
      username: socket.username
    });
    
    console.log(\`\${socket.username} joined room \${roomId}\`);
  });
  
  // Leave room event
  socket.on('room:leave', (roomId) => {
    socket.leave(roomId);
    
    const room = chatRooms.get(roomId);
    if (room) {
      room.users.delete(socket.userId);
    }
    
    socket.to(roomId).emit('user:left', {
      userId: socket.userId,
      username: socket.username
    });
  });
  
  // Message handling
  socket.on('message:send', (data) => {
    const { roomId, content } = data;
    
    const message = {
      id: Date.now().toString(),
      userId: socket.userId,
      username: socket.username,
      content: content.trim(),
      timestamp: new Date().toISOString()
    };
    
    // Store message
    const room = chatRooms.get(roomId);
    if (room) {
      room.messages.push(message);
      
      // Keep only last 100 messages in memory
      if (room.messages.length > 100) {
        room.messages = room.messages.slice(-100);
      }
    }
    
    // Broadcast to room
    io.to(roomId).emit('message:received', message);
  });
  
  // Typing indicators
  socket.on('typing:start', (roomId) => {
    socket.to(roomId).emit('user:typing', {
      userId: socket.userId,
      username: socket.username
    });
  });
  
  socket.on('typing:stop', (roomId) => {
    socket.to(roomId).emit('user:stopped-typing', {
      userId: socket.userId
    });
  });
  
  // Handle disconnect
  socket.on('disconnect', (reason) => {
    console.log(\`User disconnected: \${socket.username}, reason: \${reason}\`);
    
    // Remove from connected users
    connectedUsers.delete(socket.userId);
    
    // Remove from all rooms
    chatRooms.forEach((room, roomId) => {
      if (room.users.has(socket.userId)) {
        room.users.delete(socket.userId);
        socket.to(roomId).emit('user:left', {
          userId: socket.userId,
          username: socket.username
        });
      }
    });
    
    // Broadcast user list update
    io.emit('users:update', Array.from(connectedUsers.values()));
  });
});

// REST API endpoints
app.get('/api/rooms', (req, res) => {
  const rooms = Array.from(chatRooms.values()).map(room => ({
    id: room.id,
    name: room.name,
    userCount: room.users.size,
    lastMessage: room.messages[room.messages.length - 1]
  }));
  
  res.json({ rooms });
});

app.post('/api/rooms', (req, res) => {
  const { name } = req.body;
  const roomId = Date.now().toString();
  
  chatRooms.set(roomId, {
    id: roomId,
    name,
    users: new Set(),
    messages: []
  });
  
  res.status(201).json({ roomId, name });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(\`WebSocket server running on port \${PORT}\`);
});`
  };

  const projects = [
    {
      title: "RESTful Blog API",
      description: "Build a complete blog API with authentication, CRUD operations, and file uploads",
      difficulty: "Intermediate",
      technologies: ["Node.js", "Express", "MongoDB", "JWT", "Multer"],
      status: "completed",
      score: 91
    },
    {
      title: "Real-time Chat System",
      description: "Create a scalable chat application with WebSocket support",
      difficulty: "Advanced", 
      technologies: ["Node.js", "Socket.io", "Redis", "Docker"],
      status: "in-progress"
    },
    {
      title: "E-commerce Microservice",
      description: "Develop microservices for product catalog, orders, and payments",
      difficulty: "Expert",
      technologies: ["Node.js", "Docker", "Kubernetes", "RabbitMQ", "PostgreSQL"],
      status: "upcoming"
    }
  ];

  return (
    <LMSLayout>
      <div className="space-y-8">
        {/* Course Header */}
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-8 rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-green-500 text-white">
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
              <Badge className="mb-2 bg-green-500">{courseContent.level}</Badge>
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
                          <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
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
                  <CardTitle>Interactive Node.js Examples</CardTitle>
                  <CardDescription>Learn backend development with practical Node.js examples</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="basic">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="basic">Basic Server</TabsTrigger>
                      <TabsTrigger value="express">Express API</TabsTrigger>
                    </TabsList>
                    <TabsList className="grid w-full grid-cols-2 mt-2">
                      <TabsTrigger value="database">Database</TabsTrigger>
                      <TabsTrigger value="websocket">WebSocket</TabsTrigger>
                    </TabsList>
                    
                    {Object.entries(codeExamples).map(([key, code]) => (
                      <TabsContent key={key} value={key} className="mt-4">
                        <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                          <code>{code}</code>
                        </pre>
                        <div className="mt-4 flex gap-2">
                          <Button size="sm" variant="outline">
                            <Play className="h-4 w-4 mr-2" />
                            Run Server
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
                    { title: "Node.js Official Documentation", type: "Documentation" },
                    { title: "Express.js Guide", type: "Framework" },
                    { title: "Node.js Best Practices", type: "Best Practices" },
                    { title: "MongoDB University", type: "Database Learning" }
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
                    { title: "Node.js Challenges", type: "Coding Exercises" },
                    { title: "HackerRank Node.js", type: "Skill Assessment" },
                    { title: "CodeWars", type: "Programming Kata" },
                    { title: "FreeCodeCamp", type: "Interactive Course" }
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
        <Chatbot programmingLanguage="Node.js" />
      </div>
    </LMSLayout>
  );
};

export default NodeJS;
