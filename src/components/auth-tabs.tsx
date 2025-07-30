"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

export function AuthTabs() {
  const router = useRouter();
  const { toast } = useToast();
  const [loginEmail, setLoginEmail] = useState('');
  const [signupEmail, setSignupEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail.toLowerCase() === 'admin@buspassgo.com') {
      router.push('/admin');
    } else if (loginEmail) {
      router.push('/dashboard');
    } else {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Please enter a valid email.',
      });
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupEmail) {
      toast({
        title: 'Signup Successful',
        description: 'Please log in with your new account.',
      });
      // In a real app, you'd create the user and then maybe log them in.
      // Here we just show a message and switch to the login tab.
    } else {
      toast({
        variant: 'destructive',
        title: 'Signup Failed',
        description: 'Please enter a valid email.',
      });
    }
  };

  return (
    <Tabs defaultValue="login" className="w-full max-w-md">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Access your dashboard to manage your bus pass applications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="user@example.com or admin@buspassgo.com"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  required
                  defaultValue="password"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Create an account to start applying for bus passes today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input id="signup-name" type="text" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="user@example.com"
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" required />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Create Account
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
