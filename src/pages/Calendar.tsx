import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, BookOpen, Users, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import LMSLayout from '@/components/LMSLayout';
import { useAuth } from '@/hooks/useAuth';

interface CalendarEvent {
  id: string;
  title: string;
  type: 'assignment' | 'quiz' | 'lesson' | 'discussion' | 'deadline';
  date: Date;
  time: string;
  duration?: string;
  course: string;
  description?: string;
  status: 'upcoming' | 'completed' | 'overdue';
}

const Calendar = () => {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // Sample calendar events
  const sampleEvents: CalendarEvent[] = [
    {
      id: '1',
      title: 'Python Assignment: Data Structures',
      type: 'assignment',
      date: new Date(2024, new Date().getMonth(), new Date().getDate() + 1),
      time: '23:59',
      course: 'Python Fundamentals',
      description: 'Implement various data structures including lists, dictionaries, and sets',
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'JavaScript Quiz: Async Programming',
      type: 'quiz',
      date: new Date(2024, new Date().getMonth(), new Date().getDate() + 2),
      time: '14:00',
      duration: '45 min',
      course: 'Advanced JavaScript',
      description: 'Test your knowledge of promises, async/await, and event loop',
      status: 'upcoming'
    },
    {
      id: '3',
      title: 'React Hooks Deep Dive',
      type: 'lesson',
      date: new Date(2024, new Date().getMonth(), new Date().getDate() + 3),
      time: '10:00',
      duration: '90 min',
      course: 'React Development',
      description: 'Comprehensive lesson on advanced React hooks patterns',
      status: 'upcoming'
    },
    {
      id: '4',
      title: 'C++ Memory Management Discussion',
      type: 'discussion',
      date: new Date(2024, new Date().getMonth(), new Date().getDate() + 4),
      time: '16:00',
      course: 'C++ Systems Programming',
      description: 'Group discussion on memory management best practices',
      status: 'upcoming'
    },
    {
      id: '5',
      title: 'Java Project Submission',
      type: 'deadline',
      date: new Date(2024, new Date().getMonth(), new Date().getDate() + 5),
      time: '23:59',
      course: 'Java OOP',
      description: 'Final project submission for the Java OOP course',
      status: 'upcoming'
    },
    {
      id: '6',
      title: 'Node.js API Development',
      type: 'lesson',
      date: new Date(2024, new Date().getMonth(), new Date().getDate() + 7),
      time: '11:00',
      duration: '120 min',
      course: 'Node.js Backend',
      description: 'Building RESTful APIs with Express.js',
      status: 'upcoming'
    }
  ];

  useEffect(() => {
    setEvents(sampleEvents);
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const getEventsForSelectedDate = () => {
    return getEventsForDate(selectedDate);
  };

  const getTodaysEvents = () => {
    const today = new Date();
    const todayEvents = getEventsForDate(today);
    const upcomingEvents = events
      .filter(event => event.date > today)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 3);
    
    return [...todayEvents, ...upcomingEvents];
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'assignment':
        return 'bg-blue-500';
      case 'quiz':
        return 'bg-purple-500';
      case 'lesson':
        return 'bg-green-500';
      case 'discussion':
        return 'bg-orange-500';
      case 'deadline':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return <BookOpen className="h-3 w-3" />;
      case 'quiz':
        return <Clock className="h-3 w-3" />;
      case 'lesson':
        return <CalendarIcon className="h-3 w-3" />;
      case 'discussion':
        return <Users className="h-3 w-3" />;
      case 'deadline':
        return <Clock className="h-3 w-3" />;
      default:
        return <CalendarIcon className="h-3 w-3" />;
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <LMSLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Learning Calendar</h1>
            <p className="text-muted-foreground mt-2">
              Plan your study schedule and track important deadlines
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Event
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth('prev')}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentDate(new Date())}
                    >
                      Today
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth('next')}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {dayNames.map((day) => (
                    <div
                      key={day}
                      className="text-center text-sm font-medium text-muted-foreground p-2"
                    >
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {getDaysInMonth(currentDate).map((day, index) => {
                    if (day === null) {
                      return <div key={index} className="p-2 h-20"></div>;
                    }
                    
                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                    const dayEvents = getEventsForDate(date);
                    const isSelected = selectedDate.getDate() === day &&
                                     selectedDate.getMonth() === currentDate.getMonth() &&
                                     selectedDate.getFullYear() === currentDate.getFullYear();
                    const isToday = new Date().getDate() === day &&
                                   new Date().getMonth() === currentDate.getMonth() &&
                                   new Date().getFullYear() === currentDate.getFullYear();

                    return (
                      <div
                        key={day}
                        className={`p-1 h-20 border rounded cursor-pointer transition-colors ${
                          isSelected 
                            ? 'bg-primary text-primary-foreground' 
                            : isToday
                            ? 'bg-primary/10 border-primary'
                            : 'hover:bg-muted'
                        }`}
                        onClick={() => setSelectedDate(date)}
                      >
                        <div className={`text-sm font-medium ${isSelected ? 'text-primary-foreground' : ''}`}>
                          {day}
                        </div>
                        <div className="space-y-1 mt-1">
                          {dayEvents.slice(0, 2).map((event, eventIndex) => (
                            <div
                              key={eventIndex}
                              className={`w-full h-1.5 rounded ${getEventTypeColor(event.type)}`}
                            />
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-muted-foreground">
                              +{dayEvents.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Events Sidebar */}
          <div className="space-y-6">
            {/* Selected Date Events */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getEventsForSelectedDate().length > 0 ? (
                    getEventsForSelectedDate().map((event) => (
                      <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg border">
                        <div className={`p-1 rounded ${getEventTypeColor(event.type)} text-white`}>
                          {getEventTypeIcon(event.type)}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{event.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {event.time} {event.duration && `• ${event.duration}`}
                          </div>
                          <Badge variant="outline" className="text-xs mt-1">
                            {event.course}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No events scheduled</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
                <CardDescription>Next important deadlines and activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getTodaysEvents().map((event) => (
                    <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg border">
                      <div className={`p-1 rounded ${getEventTypeColor(event.type)} text-white`}>
                        {getEventTypeIcon(event.type)}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{event.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {event.date.toLocaleDateString()} at {event.time}
                          {event.duration && ` • ${event.duration}`}
                        </div>
                        <Badge variant="outline" className="text-xs mt-1">
                          {event.course}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Assignments Due</span>
                    <Badge variant="secondary">3</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Quizzes Scheduled</span>
                    <Badge variant="secondary">2</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Lessons Planned</span>
                    <Badge variant="secondary">5</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Study Hours</span>
                    <Badge variant="secondary">12</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </LMSLayout>
  );
};

export default Calendar;