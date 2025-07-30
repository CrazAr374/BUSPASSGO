import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { applications, busPasses, routes } from '@/lib/data';
import type { ApplicationStatus } from '@/lib/data';
import { BusIcon, CheckCircle2, Ticket, XCircle, Clock } from 'lucide-react';

// Assuming a logged in applicant with ID 1
const APPLICANT_ID = 1;
const applicantApplications = applications.filter(
  (app) => app.applicantId === APPLICANT_ID
);
const applicantPass = busPasses.find((pass) =>
  applicantApplications.some(
    (app) => app.id === pass.applicationId && app.status === 'Approved'
  )
);

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

export default function ApplicantDashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold font-headline mb-2">My Dashboard</h1>
      <p className="text-muted-foreground mb-8">
        Manage your routes, applications, and bus pass.
      </p>
      <Tabs defaultValue="routes">
        <TabsList className="mb-4">
          <TabsTrigger value="routes">Available Routes</TabsTrigger>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
          <TabsTrigger value="pass">My Bus Pass</TabsTrigger>
        </TabsList>
        <TabsContent value="routes">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {routes.map((route) => (
              <Card key={route.id} className="flex flex-col hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BusIcon className="text-primary" />
                    {route.name}
                  </CardTitle>
                  <CardDescription>{route.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow"></CardContent>
                <CardFooter>
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    Apply Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle>Application History</CardTitle>
              <CardDescription>
                Here's a list of your past and current applications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route</TableHead>
                    <TableHead>Date Applied</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applicantApplications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">
                        {routes.find((r) => r.id === app.routeId)?.name}
                      </TableCell>
                      <TableCell>{app.dateApplied}</TableCell>
                      <TableCell className="text-right">
                        <StatusBadge status={app.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pass">
          {applicantPass ? (
            <Card className="max-w-lg mx-auto bg-gradient-to-br from-primary/80 to-primary text-primary-foreground shadow-lg animate-in fade-in-50 zoom-in-95 duration-500">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl font-bold">BusPassGo</CardTitle>
                <Ticket className="h-8 w-8" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-sm opacity-80">PASS HOLDER</p>
                  <p className="text-2xl font-semibold">
                    {applicantPass.applicantName}
                  </p>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm opacity-80">ROUTE</p>
                    <p className="font-semibold">{applicantPass.routeName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-80">STATUS</p>
                    <p className="font-semibold">{applicantPass.status}</p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm opacity-80">ISSUED</p>
                    <p className="font-semibold">{applicantPass.issueDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-80">EXPIRES</p>
                    <p className="font-semibold">{applicantPass.expiryDate}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="text-center block text-xs opacity-70">
                Pass ID: {applicantPass.id}
              </CardFooter>
            </Card>
          ) : (
            <Card className="text-center py-12 border-dashed">
              <CardHeader>
                <CardTitle>No Active Bus Pass</CardTitle>
                <CardDescription>
                  Once your application is approved, your bus pass will appear
                  here.
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
