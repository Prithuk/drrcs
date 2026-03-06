import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  User, 
  Clock, 
  AlertCircle,
  CheckCircle,
  Save,
  Droplets,
  Flame,
  Wind
} from 'lucide-react';
import { api } from '../lib/api';
import { EmergencyRequest, RequestStatus } from '../types';
import { format } from 'date-fns';
import { toast } from 'sonner';

export function RequestDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [request, setRequest] = useState<EmergencyRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [newStatus, setNewStatus] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [assignedTeam, setAssignedTeam] = useState('');
  const [resources, setResources] = useState('');

  useEffect(() => {
    if (id) {
      loadRequest();
    }
  }, [id]);

  useEffect(() => {
    if (request) {
      setNewStatus(request.status);
      setNotes(request.notes || '');
      setAssignedTeam(request.assignedTo || '');
      setResources(request.assignedResources?.join(', ') || '');
    }
  }, [request]);

  const loadRequest = async () => {
    try {
      if (!id) return;
      const data = await api.getRequestById(id);
      if (data) {
        setRequest(data);
      } else {
        toast.error('Request not found');
        navigate('/requests');
      }
    } catch (error) {
      console.error('Failed to load request:', error);
      toast.error('Failed to load request details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!request) return;
    
    setIsSaving(true);
    try {
      await api.updateRequestStatus(request.id, newStatus, notes);
      toast.success('Status updated successfully');
      loadRequest();
    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error('Failed to update status');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAssignResources = async () => {
    if (!request) return;
    
    setIsSaving(true);
    try {
      const resourceList = resources.split(',').map(r => r.trim()).filter(r => r);
      await api.assignResources(request.id, resourceList, assignedTeam);
      toast.success('Resources assigned successfully');
      loadRequest();
    } catch (error) {
      console.error('Failed to assign resources:', error);
      toast.error('Failed to assign resources');
    } finally {
      setIsSaving(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'assigned': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDisasterIcon = (type: string) => {
    switch (type) {
      case 'flood': return <Droplets className="size-5" />;
      case 'wildfire': return <Flame className="size-5" />;
      case 'hurricane':
      case 'tornado': return <Wind className="size-5" />;
      default: return <AlertCircle className="size-5" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading request details...</p>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="size-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Request not found</h3>
        <Button asChild>
          <Link to="/requests">Back to Requests</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="sm">
            <Link to="/admin/requests" className="flex items-center gap-2">
              <ArrowLeft className="size-4" />
              Back
            </Link>
          </Button>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{request.id}</h2>
            <p className="text-gray-600 mt-1">Emergency Request Details</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={getPriorityColor(request.priority)}>
            {request.priority}
          </Badge>
          <Badge className={getStatusColor(request.status)}>
            {request.status}
          </Badge>
        </div>
      </div>

      {/* Main Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="size-5" />
              Request Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-600">Disaster Type</Label>
              <div className="flex items-center gap-2 mt-1">
                {getDisasterIcon(request.disasterType)}
                <span className="capitalize font-medium">{request.disasterType}</span>
              </div>
            </div>

            <div>
              <Label className="text-gray-600">Category</Label>
              <p className="font-medium capitalize mt-1">{request.category}</p>
            </div>

            <div>
              <Label className="text-gray-600">Description</Label>
              <p className="mt-1 text-gray-900">{request.description}</p>
            </div>

            <div>
              <Label className="text-gray-600 flex items-center gap-2">
                <Clock className="size-4" />
                Timestamp
              </Label>
              <p className="mt-1 font-medium">
                {format(new Date(request.timestamp), 'PPpp')}
              </p>
            </div>

            {request.updatedAt && (
              <div>
                <Label className="text-gray-600">Last Updated</Label>
                <p className="mt-1 font-medium">
                  {format(new Date(request.updatedAt), 'PPpp')}
                </p>
              </div>
            )}

            {request.completedAt && (
              <div>
                <Label className="text-gray-600 flex items-center gap-2">
                  <CheckCircle className="size-4" />
                  Completed At
                </Label>
                <p className="mt-1 font-medium">
                  {format(new Date(request.completedAt), 'PPpp')}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="size-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-600 flex items-center gap-2">
                <User className="size-4" />
                Contact Name
              </Label>
              <p className="font-medium mt-1">{request.contactName}</p>
            </div>

            <div>
              <Label className="text-gray-600 flex items-center gap-2">
                <Phone className="size-4" />
                Phone Number
              </Label>
              <p className="font-medium mt-1">{request.contactPhone}</p>
            </div>

            <div>
              <Label className="text-gray-600 flex items-center gap-2">
                <MapPin className="size-4" />
                Location
              </Label>
              <p className="mt-1">{request.location.address}</p>
              {request.location.coordinates && (
                <p className="text-sm text-gray-500 mt-1">
                  Coordinates: {request.location.coordinates.lat}, {request.location.coordinates.lng}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resource Assignment */}
      <Card>
        <CardHeader>
          <CardTitle>Resource Assignment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="team">Assigned Team</Label>
              <Input
                id="team"
                value={assignedTeam}
                onChange={(e) => setAssignedTeam(e.target.value)}
                placeholder="e.g., Team Alpha"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="resources">Resources (comma-separated)</Label>
              <Input
                id="resources"
                value={resources}
                onChange={(e) => setResources(e.target.value)}
                placeholder="e.g., Ambulance Unit 5, Medical Team"
                className="mt-1"
              />
            </div>
          </div>

          <Button onClick={handleAssignResources} disabled={isSaving}>
            <Save className="size-4 mr-2" />
            {isSaving ? 'Saving...' : 'Assign Resources'}
          </Button>

          {request.assignedResources && request.assignedResources.length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-900 mb-2">Currently Assigned:</p>
              <div className="flex flex-wrap gap-2">
                {request.assignedResources.map((resource, index) => (
                  <Badge key={index} variant="outline" className="bg-white">
                    {resource}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Status Update */}
      <Card>
        <CardHeader>
          <CardTitle>Update Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger id="status" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add status update notes..."
              rows={4}
              className="mt-1"
            />
          </div>

          <Button onClick={handleUpdateStatus} disabled={isSaving}>
            <Save className="size-4 mr-2" />
            {isSaving ? 'Updating...' : 'Update Status'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}