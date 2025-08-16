import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Plus, Pin, Clock, Users, Send, Search } from 'lucide-react';
import LMSLayout from '@/components/LMSLayout';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Discussion {
  id: string;
  title: string;
  description: string;
  course_id: string;
  is_pinned: boolean;
  created_by: string;
  created_at: string;
  profiles?: {
    full_name?: string;
    avatar_url?: string;
  };
  courses?: {
    title: string;
    category: string;
  };
  discussion_posts?: {
    id: string;
    content: string;
    created_at: string;
    profiles?: {
      full_name?: string;
    };
  }[];
}

const Discussions = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [newDiscussion, setNewDiscussion] = useState({
    title: '',
    description: '',
    language: 'python'
  });
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const programmingLanguages = [
    { id: 'python', name: 'Python', color: 'bg-blue-500' },
    { id: 'javascript', name: 'JavaScript', color: 'bg-yellow-500' },
    { id: 'java', name: 'Java', color: 'bg-red-500' },
    { id: 'cpp', name: 'C++', color: 'bg-purple-500' },
    { id: 'react', name: 'React', color: 'bg-cyan-500' },
    { id: 'nodejs', name: 'Node.js', color: 'bg-green-500' }
  ];

  const sampleDiscussions = [
    {
      id: '1',
      title: 'Python Best Practices for Beginners',
      description: 'Share your favorite Python coding conventions and best practices for new developers.',
      language: 'Python',
      author: 'Sarah Johnson',
      posts: 24,
      lastActivity: '2 hours ago',
      isPinned: true,
      topics: ['Best Practices', 'Beginner', 'Code Style']
    },
    {
      id: '2',
      title: 'JavaScript Async/Await vs Promises',
      description: 'When should we use async/await over promises? Discuss the pros and cons.',
      language: 'JavaScript',
      author: 'Mike Chen',
      posts: 18,
      lastActivity: '5 hours ago',
      isPinned: false,
      topics: ['Async Programming', 'ES6+', 'Performance']
    },
    {
      id: '3',
      title: 'Java Memory Management Deep Dive',
      description: 'Understanding heap, stack, and garbage collection in Java applications.',
      language: 'Java',
      author: 'Dr. Emily Rodriguez',
      posts: 31,
      lastActivity: '1 day ago',
      isPinned: true,
      topics: ['Memory Management', 'Performance', 'JVM']
    },
    {
      id: '4',
      title: 'C++ Modern Features (C++17/20)',
      description: 'Exploring the latest features in modern C++ and how to use them effectively.',
      language: 'C++',
      author: 'Alex Kumar',
      posts: 15,
      lastActivity: '3 hours ago',
      isPinned: false,
      topics: ['Modern C++', 'C++17', 'C++20', 'Features']
    },
    {
      id: '5',
      title: 'React Hooks vs Class Components',
      description: 'Migration strategies and when to choose hooks over class components.',
      language: 'React',
      author: 'Lisa Park',
      posts: 22,
      lastActivity: '6 hours ago',
      isPinned: false,
      topics: ['React Hooks', 'Migration', 'Best Practices']
    },
    {
      id: '6',
      title: 'Node.js Performance Optimization',
      description: 'Tips and techniques for optimizing Node.js applications in production.',
      language: 'Node.js',
      author: 'Tom Wilson',
      posts: 19,
      lastActivity: '8 hours ago',
      isPinned: false,
      topics: ['Performance', 'Optimization', 'Production']
    }
  ];

  useEffect(() => {
    const fetchDiscussions = async () => {
      const { data: discussionsData, error } = await supabase
        .from('discussions')
        .select(`
          *,
          courses (
            title,
            category
          )
        `)
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching discussions:', error);
      } else {
        setDiscussions(discussionsData || []);
      }

      setLoading(false);
    };

    fetchDiscussions();
  }, []);

  const createDiscussion = async () => {
    if (!user || !newDiscussion.title.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('discussions')
        .insert({
          title: newDiscussion.title,
          description: newDiscussion.description,
          course_id: newDiscussion.language,
          created_by: user.id,
        });

      if (error) throw error;

      toast({
        title: "Discussion Created!",
        description: "Your discussion has been created successfully.",
      });

      setNewDiscussion({ title: '', description: '', language: 'python' });
      setIsCreateDialogOpen(false);
      
      // Refresh discussions
      window.location.reload();
    } catch (error) {
      console.error('Error creating discussion:', error);
      toast({
        title: "Error",
        description: "Failed to create discussion. Please try again.",
        variant: "destructive"
      });
    }
  };

  const filteredDiscussions = sampleDiscussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = languageFilter === 'all' || discussion.language.toLowerCase() === languageFilter;
    return matchesSearch && matchesLanguage;
  });

  if (loading) {
    return (
      <LMSLayout>
        <div className="space-y-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-64"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
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
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Programming Discussions</h1>
            <p className="text-muted-foreground mt-2">
              Connect with fellow developers and share knowledge
            </p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Discussion
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Discussion</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={newDiscussion.title}
                    onChange={(e) => setNewDiscussion({...newDiscussion, title: e.target.value})}
                    placeholder="Enter discussion title..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Programming Language</label>
                  <Select 
                    value={newDiscussion.language} 
                    onValueChange={(value) => setNewDiscussion({...newDiscussion, language: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {programmingLanguages.map((lang) => (
                        <SelectItem key={lang.id} value={lang.id}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={newDiscussion.description}
                    onChange={(e) => setNewDiscussion({...newDiscussion, description: e.target.value})}
                    placeholder="Describe your discussion topic..."
                    rows={3}
                  />
                </div>
                <Button onClick={createDiscussion} className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Create Discussion
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filter Discussions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search discussions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={languageFilter} onValueChange={setLanguageFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Languages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  {programmingLanguages.map((lang) => (
                    <SelectItem key={lang.id} value={lang.name.toLowerCase()}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Discussions List */}
        <div className="space-y-4">
          {filteredDiscussions.map((discussion) => (
            <Card key={discussion.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {discussion.isPinned && (
                        <Pin className="h-4 w-4 text-primary" />
                      )}
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        {discussion.title}
                      </CardTitle>
                    </div>
                    <CardDescription>
                      {discussion.description}
                    </CardDescription>
                    <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {discussion.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span>by {discussion.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{discussion.lastActivity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{discussion.posts} posts</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                      {discussion.language}
                    </Badge>
                    {discussion.isPinned && (
                      <Badge variant="outline">Pinned</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {discussion.topics.map((topic, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Active discussion with {discussion.posts} replies
                  </div>
                  <Button variant="outline" size="sm">
                    Join Discussion
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDiscussions.length === 0 && (
          <Card className="text-center py-12">
            <CardHeader>
              <div className="mx-auto bg-muted rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle>No Discussions Found</CardTitle>
              <CardDescription>
                Try adjusting your search criteria or start a new discussion
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </LMSLayout>
  );
};

export default Discussions;