import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { api } from '../lib/api';
import { EmergencyRequest } from '../types';
import { TrendingUp, AlertCircle, Clock, CheckCircle } from 'lucide-react';

export function Analytics() {
  const [requests, setRequests] = useState<EmergencyRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await api.getRequests();
      setRequests(data);
    } catch (error) {
      console.error('Failed to load analytics data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate analytics data
  const statusData = [
    { name: 'Pending', value: requests.filter(r => r.status === 'pending').length, color: '#eab308' },
    { name: 'Assigned', value: requests.filter(r => r.status === 'assigned').length, color: '#3b82f6' },
    { name: 'In Progress', value: requests.filter(r => r.status === 'in-progress').length, color: '#8b5cf6' },
    { name: 'Completed', value: requests.filter(r => r.status === 'completed').length, color: '#10b981' },
    { name: 'Cancelled', value: requests.filter(r => r.status === 'cancelled').length, color: '#6b7280' },
  ];

  const priorityData = [
    { name: 'Critical', value: requests.filter(r => r.priority === 'critical').length, color: '#ef4444' },
    { name: 'High', value: requests.filter(r => r.priority === 'high').length, color: '#f97316' },
    { name: 'Medium', value: requests.filter(r => r.priority === 'medium').length, color: '#eab308' },
    { name: 'Low', value: requests.filter(r => r.priority === 'low').length, color: '#22c55e' },
  ];

  const disasterTypeData = [
    { name: 'Flood', value: requests.filter(r => r.disasterType === 'flood').length },
    { name: 'Earthquake', value: requests.filter(r => r.disasterType === 'earthquake').length },
    { name: 'Hurricane', value: requests.filter(r => r.disasterType === 'hurricane').length },
    { name: 'Wildfire', value: requests.filter(r => r.disasterType === 'wildfire').length },
    { name: 'Tornado', value: requests.filter(r => r.disasterType === 'tornado').length },
    { name: 'Other', value: requests.filter(r => r.disasterType === 'other').length },
  ];

  const categoryData = [
    { name: 'Rescue', value: requests.filter(r => r.category === 'rescue').length },
    { name: 'Medical', value: requests.filter(r => r.category === 'medical').length },
    { name: 'Shelter', value: requests.filter(r => r.category === 'shelter').length },
    { name: 'Food', value: requests.filter(r => r.category === 'food').length },
    { name: 'Evacuation', value: requests.filter(r => r.category === 'evacuation').length },
    { name: 'Supplies', value: requests.filter(r => r.category === 'supplies').length },
    { name: 'Other', value: requests.filter(r => r.category === 'other').length },
  ];

  // Response time mock data (hours)
  const responseTimeData = [
    { timeRange: '0-1h', count: 3 },
    { timeRange: '1-3h', count: 4 },
    { timeRange: '3-6h', count: 2 },
    { timeRange: '6-12h', count: 1 },
    { timeRange: '12-24h', count: 0 },
  ];

  const completionRateData = [
    { day: 'Mon', completed: 8, total: 10 },
    { day: 'Tue', completed: 12, total: 15 },
    { day: 'Wed', completed: 10, total: 12 },
    { day: 'Thu', completed: 15, total: 18 },
    { day: 'Fri', completed: 9, total: 11 },
    { day: 'Sat', completed: 6, total: 8 },
    { day: 'Sun', completed: 7, total: 10 },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Analytics & Reports</h2>
        <p className="text-gray-600 mt-1">System performance and request insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Requests</CardTitle>
            <TrendingUp className="size-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{requests.length}</div>
            <p className="text-xs text-gray-500 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Completion Rate</CardTitle>
            <CheckCircle className="size-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {requests.length > 0 
                ? Math.round((requests.filter(r => r.status === 'completed').length / requests.length) * 100)
                : 0}%
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {requests.filter(r => r.status === 'completed').length} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Response Time</CardTitle>
            <Clock className="size-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">2.4h</div>
            <p className="text-xs text-gray-500 mt-1">From submission to assignment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Critical Alerts</CardTitle>
            <AlertCircle className="size-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {requests.filter(r => r.priority === 'critical').length}
            </div>
            <p className="text-xs text-gray-500 mt-1">Requiring immediate attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Request Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => percent > 0 ? `${name} ${(percent * 100).toFixed(0)}%` : ''}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Priority Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => percent > 0 ? `${name} ${(percent * 100).toFixed(0)}%` : ''}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Requests by Disaster Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={disasterTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Requests by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Response Time Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timeRange" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={completionRateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#3b82f6" name="Total Requests" />
                <Line type="monotone" dataKey="completed" stroke="#10b981" name="Completed" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <TrendingUp className="size-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900">High Activity Period</p>
                <p className="text-sm text-blue-700">Most requests are received during morning hours (8 AM - 12 PM)</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="size-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-green-900">Strong Completion Rate</p>
                <p className="text-sm text-green-700">
                  {Math.round((requests.filter(r => r.status === 'completed').length / requests.length) * 100)}% of requests 
                  have been successfully completed
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <Clock className="size-5 text-orange-600 mt-0.5" />
              <div>
                <p className="font-medium text-orange-900">Fast Response Time</p>
                <p className="text-sm text-orange-700">Average response time is 2.4 hours from submission to assignment</p>
              </div>
            </div>

            {requests.filter(r => r.priority === 'critical').length > 0 && (
              <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="size-5 text-red-600 mt-0.5" />
                <div>
                  <p className="font-medium text-red-900">Critical Requests Pending</p>
                  <p className="text-sm text-red-700">
                    {requests.filter(r => r.priority === 'critical' && r.status !== 'completed').length} critical requests 
                    require immediate attention
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
