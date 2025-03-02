import type React from "react"
import { MainNav } from "@/components/main-nav"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"
import "@/styles/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mindful",
  description: "A mental health and wellness app focused on managing overthinking",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <MainNav />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}



import './globals.css'