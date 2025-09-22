import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  Calendar, 
  Plus, 
  Settings,
  ChevronRight
} from 'lucide-react';

const navigation = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Landing Page',
    url: '/dashboard/landing',
    icon: LayoutDashboard
  }
  // },
  // {
  //   title: 'Events',
  //   url: '/dashboard/events',
  //   icon: Calendar,
  // },
  // {
  //   title: 'Add Event',
  //   url: '/dashboard/events/new',
  //   icon: Plus,
  // },
  // {
  //   title: 'Landing',
  //   url: '/dashboard/landing',
  //   icon: LayoutDashboard
  // },
  // {
  //   title: 'Settings',
  //   url: '/dashboard/settings',
  //   icon: Settings,
  // },
];

export const Sidebar: React.FC = () => {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <SidebarRoot className={`border-r bg-card transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <SidebarContent>
        <div className="flex h-14 items-center border-b px-4">
          {!collapsed && (
            <h2 className="text-lg font-semibold text-primary">Port 80</h2>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? 'sr-only' : ''}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive: navIsActive }) =>
                        `flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                          isActive(item.url) || navIsActive
                            ? 'bg-primary text-primary-foreground shadow-card'
                            : 'text-foreground bg-muted'
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1">{item.title}</span>
                          {(isActive(item.url)) && (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarRoot>
  );
};