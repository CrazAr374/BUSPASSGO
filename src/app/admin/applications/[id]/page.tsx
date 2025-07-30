'use client';

import { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  predictFraud,
  type FraudDetectionOutput,
} from '@/ai/flows/fraud-detection';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { applications, routes } from '@/lib/data';
import {
  ArrowLeft,
  Bot,
  ShieldAlert,
  ShieldCheck,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';

export default function ApplicationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { toast } = useToast();
  const [analysis, setAnalysis] = useState<FraudDetectionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const application = applications.find(
    (app) => app.id.toString() === params.id
  );
  const route = application
    ? routes.find((r) => r.id === application.routeId)
    : null;

  if (!application || !route) {
    notFound();
  }

  const handleRunAnalysis = async () => {
    setIsLoading(true);
    setAnalysis(null);
    try {
      const result = await predictFraud({
        age: application.applicantAge,
        income: application.applicantIncome,
        routePopularity: route.popularity,
        priorApplications: application.applicantPriorApplications,
      });
      setAnalysis(result);
    } catch (error) {
      console.error('Fraud detection failed:', error);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'Could not run fraud analysis. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const riskScorePercent = analysis
    ? Math.round(analysis.fraudRiskScore * 100)
    : 0;

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button asChild variant="outline" size="sm">
          <Link href="/admin">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Applications
          </Link>
        </Button>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Application Details</CardTitle>
              <CardDescription>
                Review the applicant's submission and take action.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={`https://i.pravatar.cc/150?u=${application.applicantName}`}
                  />
                  <AvatarFallback>
                    {application.applicantName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-lg">
                    {application.applicantName}
                  </p>
                  <p className="text-sm text-muted-foreground">Applicant</p>
                </div>
              </div>
              <Separator />
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div className="space-y-1">
                  <dt className="text-sm font-medium text-muted-foreground">
                    Route Applied
                  </dt>
                  <dd className="font-semibold">{route.name}</dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-sm font-medium text-muted-foreground">
                    Application Date
                  </dt>
                  <dd className="font-semibold">{application.dateApplied}</dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-sm font-medium text-muted-foreground">
                    Age
                  </dt>
                  <dd className="font-semibold">{application.applicantAge}</dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-sm font-medium text-muted-foreground">
                    Income
                  </dt>
                  <dd className="font-semibold">
                    ${application.applicantIncome.toLocaleString()}
                  </dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-sm font-medium text-muted-foreground">
                    Prior Applications
                  </dt>
                  <dd className="font-semibold">
                    {application.applicantPriorApplications}
                  </dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-sm font-medium text-muted-foreground">
                    Route Popularity
                  </dt>
                  <dd className="font-semibold">{route.popularity} / 10</dd>
                </div>
              </dl>
            </CardContent>
            <CardFooter className="gap-4">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Approve
              </Button>
              <Button variant="destructive">
                <ThumbsDown className="mr-2 h-4 w-4" />
                Reject
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="text-primary" /> AI Fraud Analysis
              </CardTitle>
              <CardDescription>
                Use our AI tool to assess fraud risk.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : analysis ? (
                <div className="space-y-4 animate-in fade-in duration-500">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-semibold">Fraud Risk</p>
                      {analysis.isFraudulent ? (
                        <Badge variant="destructive" className="gap-1.5">
                          <ShieldAlert className="h-4 w-4" />
                          High Risk
                        </Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-800 border-green-200 gap-1.5 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800">
                          <ShieldCheck className="h-4 w-4" />
                          Low Risk
                        </Badge>
                      )}
                    </div>
                    <Progress
                      value={riskScorePercent}
                      className="h-2 [&>div]:bg-primary"
                    />
                    <p className="text-xs text-muted-foreground mt-1 text-right">
                      {riskScorePercent}% Risk Score
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">AI Reasoning</p>
                    <p className="text-sm text-muted-foreground italic p-3 bg-muted rounded-md mt-1">
                      "{analysis.reasoning}"
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-sm text-muted-foreground p-4 border border-dashed rounded-lg">
                  Click the button below to run the fraud detection analysis.
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleRunAnalysis}
                disabled={isLoading}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {isLoading ? 'Analyzing...' : 'Run Fraud Analysis'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
