import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, MapPin, TrendingUp } from 'lucide-react';
import { useEvents } from '@/hooks/useEvents';
import NewRequests from '@/components/requests/NewRequests';

export const Dashboard: React.FC = () => {
  const { events, loading } = useEvents();

  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());
  const totalEvents = events.length;
  const thisMonthEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const now = new Date();
    return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();
  });

  const stats = [
    {
      title: 'Total Events',
      value: totalEvents,
      description: 'All events in system',
      icon: Calendar,
      color: 'text-blue-600',
    },
    {
      title: 'Upcoming Events',
      value: upcomingEvents.length,
      description: 'Events scheduled ahead',
      icon: TrendingUp,
      color: 'text-green-600',
    },
    {
      title: 'This Month',
      value: thisMonthEvents.length,
      description: 'Events this month',
      icon: Users,
      color: 'text-purple-600',
    },
    {
      title: 'Locations',
      value: new Set(events.map(e => e.location)).size,
      description: 'Unique venues',
      icon: MapPin,
      color: 'text-orange-600',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your events and activities</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="shadow-card hover:shadow-medium transition-all duration-200 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Events */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Port:80 Requests</CardTitle>
        </CardHeader>
        <NewRequests />
      </Card>
    </div>
  );
};