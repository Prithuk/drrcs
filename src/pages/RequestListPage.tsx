import { useEffect, useState, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Droplets, Flame, Wind, AlertCircle } from 'lucide-react';
import { api } from '@/lib/api';
import { EmergencyRequest } from '@/types';
import { format } from 'date-fns';
import './request-list-fixes.css';

export function RequestListPage() {
  const [requests, setRequests] = useState<EmergencyRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<EmergencyRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [disasterFilter, setDisasterFilter] = useState<string>('all');

  useEffect(() => {
    loadRequests();
  }, []);

  useEffect(() => {
    let filtered = [...requests];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (req) =>
          req.id.toLowerCase().includes(query) ||
          req.description.toLowerCase().includes(query) ||
          req.location.address.toLowerCase().includes(query) ||
          req.contactName.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((req) => req.status === statusFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter((req) => req.priority === priorityFilter);
    }

    if (disasterFilter !== 'all') {
      filtered = filtered.filter((req) => req.disasterType === disasterFilter);
    }

    setFilteredRequests(filtered);
  }, [requests, searchQuery, statusFilter, priorityFilter, disasterFilter]);

  const loadRequests = async () => {
    try {
      const data = await api.getRequests();
      const sorted = [...data].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setRequests(sorted);
    } catch (error) {
      console.error('Failed to load requests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'badge-danger';
      case 'high': return 'badge-warning';
      case 'medium': return 'badge-info';
      case 'low': return 'badge-success';
      default: return 'badge-default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'badge-warning';
      case 'assigned': return 'badge-info';
      case 'in-progress': return 'badge-primary';
      case 'completed': return 'badge-success';
      case 'cancelled': return 'badge-default';
      default: return 'badge-default';
    }
  };

  const getDisasterIcon = (type: string) => {
    switch (type) {
      case 'flood': return <Droplets className="icon" />;
      case 'wildfire': return <Flame className="icon" />;
      case 'hurricane':
      case 'tornado': return <Wind className="icon" />;
      default: return <AlertCircle className="icon" />;
    }
  };

  if (isLoading) {
    return <div className="requests-page-loading">Loading requests...</div>;
  }

  return (
    <div className="requests-page container">
      <div className="requests-header">
        <h2>Emergency Requests</h2>
        <p className="muted">Manage and track all emergency requests</p>
      </div>

      <Card className="filters-card">
        <CardHeader>
          <CardTitle>
            <div className="filters-title-row">
              <Filter className="icon" /> Filters
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="filters-grid">
            <div className="relative">
              <Search className="icon absolute-icon" />
              <Input placeholder="Search requests..." value={searchQuery} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)} className="pl-10 filter-search-input" />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="filter-select-trigger">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="filter-select-trigger">
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={disasterFilter} onValueChange={setDisasterFilter}>
              <SelectTrigger className="filter-select-trigger">
                <SelectValue placeholder="All Disasters" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Disasters</SelectItem>
                <SelectItem value="flood">Flood</SelectItem>
                <SelectItem value="earthquake">Earthquake</SelectItem>
                <SelectItem value="hurricane">Hurricane</SelectItem>
                <SelectItem value="wildfire">Wildfire</SelectItem>
                <SelectItem value="tornado">Tornado</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="filters-actions">
            <div className="filters-summary">Showing <strong>{filteredRequests.length}</strong> of <strong>{requests.length}</strong> requests</div>
            <div>
              {(searchQuery || statusFilter !== 'all' || priorityFilter !== 'all' || disasterFilter !== 'all') && (
                <Button variant="outline" size="sm" onClick={() => { setSearchQuery(''); setStatusFilter('all'); setPriorityFilter('all'); setDisasterFilter('all'); }}>
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="table-wrap">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Disaster Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 muted">No requests found</TableCell>
                  </TableRow>
                ) : (
                  filteredRequests.map((request) => (
                    <TableRow key={request.id} className="hover:bg-gray-50">
                      <TableCell className="font-mono">{request.id}</TableCell>
                      <TableCell>
                        <div className="disaster-cell">
                          {getDisasterIcon(request.disasterType)}
                          <span>{request.disasterType}</span>
                        </div>
                      </TableCell>
                      <TableCell style={{ textTransform: 'capitalize', color: '#334155', fontWeight: 500 }}>{request.category}</TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(request.priority)}>{request.priority}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                      </TableCell>
                      <TableCell className="truncate">{request.location.address}</TableCell>
                      <TableCell>
                        <div className="contact-name">{request.contactName}</div>
                        <div className="contact-phone">{request.contactPhone}</div>
                      </TableCell>
                      <TableCell style={{ color: '#64748b', fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>{format(new Date(request.timestamp), 'MMM dd, HH:mm')}</TableCell>
                      <TableCell style={{ textAlign: 'right' }}>
                        <Button asChild variant="ghost" size="sm">
                          <Link to={`/requests/${request.id}`} style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>View</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default RequestListPage;
