"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BusIcon, LogOut, User } from 'lucide-react';

type DashboardHeaderProps = {
  userType: 'applicant' | 'admin';
};

export function DashboardHeader({ userType }: DashboardHeaderProps) {
  const router = useRouter();
  const userName = userType === 'admin' ? 'Admin User' : 'Applicant User';
  const userEmail =
    userType === 'admin' ? 'admin@buspassgo.com' : 'applicant@buspassgo.com';
  const userInitials = userName
    .split(' ')
    .map((n) => n[0])
    .join('');

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href={userType === 'admin' ? '/admin' : '/dashboard'}
          className="flex items-center gap-2 font-bold"
        >
          <BusIcon className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg">BusPassGo</span>
        </Link>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={`https://i.pravatar.cc/150?u=${userEmail}`}
                    alt={userName}
                  />
                  <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {userEmail}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
