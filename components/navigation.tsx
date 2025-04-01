"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UserCircle, Home, BarChart2, FileText, Info, Map } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useLanguage } from "@/lib/context/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

function UserAccountDropdown() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || t('common.user'),
          email: currentUser.email || t('common.noEmail'),
          initials: currentUser.displayName
            ? currentUser.displayName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
            : "U",
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [t]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-avatar.jpg" alt={user?.name || t('common.user')} />
            <AvatarFallback>
              {user ? user.initials : "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name || t('common.user')}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email || t('common.noEmail')}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/profile")}>
          <UserCircle className="mr-2 h-4 w-4" />
          <span>{t('common.profile')}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>{t('common.logout')}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Navigation() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2025-02-13_110226-removebg-preview-w517VqqW67TIg8ikMC1M9TBCiQVeKN.png"
            alt={t('website.logoAlt')}
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <span className="text-xl font-bold">{t('website.title')}</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="font-medium hover:text-primary flex items-center">
            <Home className="mr-2 h-4 w-4" />
            {t('common.home')}
          </Link>
          <Link href="/dashboard" className="font-medium hover:text-primary flex items-center">
            <BarChart2 className="mr-2 h-4 w-4" />
            {t('common.dashboard')}
          </Link>
          <Link href="/reports" className="font-medium hover:text-primary flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            {t('common.reports')}
          </Link>
          <Link href="/visualize" className="font-medium hover:text-primary flex items-center">
            <Map className="mr-2 h-4 w-4" />
            {t('common.visualize')}
          </Link>
          <Link href="/about" className="font-medium hover:text-primary flex items-center">
            <Info className="mr-2 h-4 w-4" />
            {t('common.about')}
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <UserAccountDropdown />
        </div>
      </div>
    </header>
  );
}