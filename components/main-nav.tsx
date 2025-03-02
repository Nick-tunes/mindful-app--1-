"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Brain } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MainNav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Brain className="h-5 w-5 text-primary" />
          <span>Mindful</span>
        </Link>
        <nav className="ml-auto flex gap-2">
          <Link href="/exercises">
            <Button variant={pathname.startsWith("/exercises") ? "secondary" : "ghost"}>Exercises</Button>
          </Link>
          <Link href="/journal">
            <Button variant={pathname === "/journal" ? "secondary" : "ghost"}>Journal</Button>
          </Link>
          <Link href="/chat">
            <Button variant={pathname === "/chat" ? "secondary" : "ghost"}>Chat</Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}

