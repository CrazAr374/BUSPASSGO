import { AuthTabs } from '@/components/auth-tabs';
import { BusIcon } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background animate-in fade-in duration-500">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="bg-primary text-primary-foreground p-3 rounded-full">
          <BusIcon className="h-10 w-10" />
        </div>
        <h1 className="text-4xl font-bold font-headline tracking-tight text-gray-900 dark:text-gray-50">
          Welcome to BusPassGo
        </h1>
        <p className="text-lg text-muted-foreground max-w-md">
          Your one-stop solution for managing bus passes. Apply, track, and get
          your pass with ease.
        </p>
      </div>
      <div className="mt-8 w-full flex justify-center">
        <AuthTabs />
      </div>
    </main>
  );
}
