import { useState, useEffect } from "react";
import { 
  BookOpen, 
  Home, 
  GraduationCap, 
  FileText, 
  MessageSquare, 
  Trophy, 
  BarChart3,
  Users,
  Settings,
  Plus,
  Calendar,
  Bell,
  Code,
  Brain
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export function LMSSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();
  const currentPath = location.pathname;
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<string>('student');
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) return;
      
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', user.id)
        .single();
      
      if (data?.role) {
        setUserRole(data.role);
      }
    };

    fetchUserRole();
  }, [user]);

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground font-medium" : "hover:bg-accent hover:text-accent-foreground";

  // Student navigation items
  const studentItems = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "My Courses", url: "/my-courses", icon: BookOpen },
    { title: "Browse Courses", url: "/browse", icon: GraduationCap },
    { title: "Assignments", url: "/assignments", icon: FileText },
    { title: "Quizzes", url: "/quizzes", icon: Brain },
    { title: "Discussions", url: "/discussions", icon: MessageSquare },
    { title: "Certificates", url: "/certificates", icon: Trophy },
    { title: "Calendar", url: "/calendar", icon: Calendar },
  ];

  // Instructor navigation items
  const instructorItems = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "My Courses", url: "/instructor/courses", icon: BookOpen },
    { title: "Create Course", url: "/instructor/create-course", icon: Plus },
    { title: "Assignments", url: "/instructor/assignments", icon: FileText },
    { title: "Students", url: "/instructor/students", icon: Users },
    { title: "Analytics", url: "/instructor/analytics", icon: BarChart3 },
    { title: "Discussions", url: "/discussions", icon: MessageSquare },
  ];

  // Admin navigation items
  const adminItems = [
    { title: "Dashboard", url: "/admin/dashboard", icon: Home },
    { title: "All Courses", url: "/admin/courses", icon: BookOpen },
    { title: "Users", url: "/admin/users", icon: Users },
    { title: "Instructors", url: "/admin/instructors", icon: GraduationCap },
    { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
    { title: "Announcements", url: "/admin/announcements", icon: Bell },
    { title: "Settings", url: "/admin/settings", icon: Settings },
  ];

  // Programming languages section for all users
  const programmingItems = [
    { title: "Python", url: "/courses/python", icon: Code, color: "bg-blue-500" },
    { title: "JavaScript", url: "/courses/javascript", icon: Code, color: "bg-yellow-500" },
    { title: "Java", url: "/courses/java", icon: Code, color: "bg-red-500" },
    { title: "C++", url: "/courses/cpp", icon: Code, color: "bg-purple-500" },
    { title: "React", url: "/courses/react", icon: Code, color: "bg-cyan-500" },
    { title: "Node.js", url: "/courses/nodejs", icon: Code, color: "bg-green-500" },
  ];

  const getNavigationItems = () => {
    switch (userRole) {
      case 'admin':
        return adminItems;
      case 'instructor':
        return instructorItems;
      default:
        return studentItems;
    }
  };

  const navigationItems = getNavigationItems();
  const isExpanded = navigationItems.some((i) => isActive(i.url));

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"}>
      <SidebarContent className="bg-card">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {!collapsed && (
              <>
                {userRole === 'admin' && 'Administration'}
                {userRole === 'instructor' && 'Teaching'}
                {userRole === 'student' && 'Learning'}
              </>
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                      {item.title === "Assignments" && unreadNotifications > 0 && !collapsed && (
                        <Badge className="ml-auto h-5 px-1.5 text-xs">
                          {unreadNotifications}
                        </Badge>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Programming Languages Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {!collapsed && 'Programming Languages'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {programmingItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <div className={`w-4 h-4 rounded-sm ${item.color}`} />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions */}
        {userRole === 'instructor' && (
          <SidebarGroup>
            <SidebarGroupLabel className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {!collapsed && 'Quick Actions'}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/instructor/create-course" className="text-primary hover:text-primary/80">
                      <Plus className="h-5 w-5" />
                      {!collapsed && <span>New Course</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}