"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth, googleProvider } from "@/lib/firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile,
  signInWithPopup,
  sendEmailVerification
} from "firebase/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuth } from '@/lib/auth';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useTranslations } from '@/lib/translations';
import { toast } from 'react-hot-toast';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, setUser } = useAuth();
  const { language } = useLanguage();
  const t = useTranslations(language);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if user just verified their email
    const verified = searchParams.get('verified');
    if (verified === 'true') {
      toast.success(t.auth.emailVerified, {
        duration: 5000,
        position: 'top-center',
        style: {
          background: '#4CAF50',
          color: '#fff',
        },
      });
      // Remove the query parameter from URL
      router.replace('/auth');
    }
  }, [searchParams, router, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        const result = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        if (result.user) {
          if (!result.user.emailVerified) {
            toast.error(t.auth.emailNotVerified, {
              duration: 5000,
              position: 'top-center',
              style: {
                background: '#f44336',
                color: '#fff',
              },
            });
            await sendEmailVerification(result.user);
            router.push('/verify-email');
            return;
          }
          setUser(result.user);
          toast.success(t.auth.loginSuccess, {
            duration: 3000,
            position: 'top-center',
            style: {
              background: '#4CAF50',
              color: '#fff',
            },
          });
          router.push('/dashboard');
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast.error(t.auth.passwordsDontMatch, {
            duration: 3000,
            position: 'top-center',
            style: {
              background: '#f44336',
              color: '#fff',
            },
          });
          return;
        }
        const result = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        if (result.user) {
          if (formData.name) {
            await updateProfile(result.user, { displayName: formData.name });
          }
          await sendEmailVerification(result.user);
          toast.success(t.auth.verificationEmailSent, {
            duration: 5000,
            position: 'top-center',
            style: {
              background: '#4CAF50',
              color: '#fff',
            },
          });
          router.push('/verify-email');
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast.error(error.message || t.auth.authError, {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#f44336',
          color: '#fff',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        if (!result.user.emailVerified) {
          await sendEmailVerification(result.user);
          router.push('/verify-email');
          return;
        }
        setUser(result.user);
        toast.success(t.auth.googleSignInSuccess, {
          duration: 3000,
          position: 'top-center',
          style: {
            background: '#4CAF50',
            color: '#fff',
          },
        });
        router.push('/dashboard');
      }
    } catch (error: any) {
      console.error('Google auth error:', error);
      toast.error(error.message || t.auth.googleAuthError, {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#f44336',
          color: '#fff',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>{isLogin ? t.auth.loginTitle : t.auth.signupTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <Input
              type="text"
              placeholder={t.common.name}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          )}
          <Input
            type="email"
            placeholder={t.common.email}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            type="password"
            placeholder={t.common.password}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          {!isLogin && (
            <Input
              type="password"
              placeholder={t.common.confirmPassword}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
          )}
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full mb-4">
            {loading ? t.common.processing : (isLogin ? t.auth.loginButton : t.auth.signupButton)}
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">{t.common.orContinueWith}</span>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full"
          >
            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
            {t.common.signInWithGoogle}
          </Button>
        </form>
        <p className="mt-4 text-center">
          {isLogin ? t.auth.noAccount : t.auth.hasAccount}{" "}
          <button
            type="button"
            className="text-blue-500 underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? t.auth.signupButton : t.auth.loginButton}
          </button>
        </p>
      </CardContent>
    </Card>
  );
}