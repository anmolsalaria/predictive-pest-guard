import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "react-hot-toast"
import { AuthProvider } from "@/lib/auth"
import { LanguageProvider } from "@/lib/context/LanguageContext"
import { Navigation } from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Predictive PestGuard",
  description: "AI-powered pest outbreak prediction and management system",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <LanguageProvider>
            <Navigation />
            <main className="min-h-screen bg-background">
              {children}
            </main>
            <Toaster position="top-right" />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

import "./globals.css"

import "./globals.css"

import "./globals.css"

import "./globals.css"

import "./globals.css"

import "./globals.css"

import "./globals.css"

import "./globals.css"

import "./globals.css"

import './globals.css'