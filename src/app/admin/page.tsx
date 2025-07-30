import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { applications, routes } from '@/lib/data';
import type { ApplicationStatus } from '@/lib/data';
import { ArrowRight, CheckCircle2, Clock, XCircle } from 'lucide-react';

function StatusBadge({ status }: { status: ApplicationStatus }) {
  const statusConfig = {
    Pending: {
      icon: Clock,
      color:
        'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-800',
    },
    Approved: {
      icon: CheckCircle2,
      color:
        'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800',
    },
    Rejected: {
      icon: XCircle,
      color:
        'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-800',
    },
  };
  const { icon: Icon, color } = statusConfig[status];
  return (
    <Badge variant="outline" className={`gap-1.5 ${color}`}>
      <Icon className="h-3.5 w-3.5" />
      {status}
    </Badge>
  );
}

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold font-headline mb-2">Admin Dashboard</h1>
      <p className="text-muted-foreground mb-8">
        Review and manage all incoming applications.
      </p>
      <Card>
        <CardHeader>
          <CardTitle>Incoming Applications</CardTitle>
          <CardDescription>
            A list of all applications submitted by users.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Date Applied</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.applicantName}</TableCell>
                  <TableCell>
                    {routes.find((r) => r.id === app.routeId)?.name}
                  </TableCell>
                  <TableCell>{app.dateApplied}</TableCell>
                  <TableCell>
                    <StatusBadge status={app.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/admin/applications/${app.id}`}>
                        View <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
