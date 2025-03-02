import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Compass, Heart, MessageSquare, Wind } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Find peace in your thoughts
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Mindful helps you manage overthinking with guided exercises, breathing techniques, and supportive
                  tools.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/exercises">
                  <Button size="lg">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/chat">
                  <Button size="lg" variant="outline">
                    Talk to Someone
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg"
                width={550}
                height={450}
                alt="Mindful app screenshot"
                className="aspect-video overflow-hidden rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Tools for a Calmer Mind</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover our range of evidence-based techniques to help you manage overthinking and find mental clarity.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Wind className="h-8 w-8 text-primary" />
                <div className="grid gap-1">
                  <CardTitle>Breathing Exercises</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Guided breathing techniques to calm your nervous system and reduce anxiety.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/exercises/breathing" className="w-full">
                  <Button variant="ghost" className="w-full">
                    Try Now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Compass className="h-8 w-8 text-primary" />
                <div className="grid gap-1">
                  <CardTitle>Mindful Exercises</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Practices to ground yourself in the present moment and break the cycle of overthinking.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/exercises/mindfulness" className="w-full">
                  <Button variant="ghost" className="w-full">
                    Try Now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Heart className="h-8 w-8 text-primary" />
                <div className="grid gap-1">
                  <CardTitle>Gratitude Journal</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Record what you're grateful for to shift your focus from worries to appreciation.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/journal" className="w-full">
                  <Button variant="ghost" className="w-full">
                    Start Writing
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card className="md:col-span-2 lg:col-span-3">
              <CardHeader className="flex flex-row items-center gap-4">
                <MessageSquare className="h-8 w-8 text-primary" />
                <div className="grid gap-1">
                  <CardTitle>Supportive Chat</CardTitle>
                  <CardDescription>Feeling overwhelmed? Our AI companion is here to listen and help.</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our supportive chatbot is available 24/7 to help you work through anxious thoughts, provide coping
                  strategies, and offer a judgment-free space to express yourself.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/chat" className="w-full">
                  <Button className="w-full">Chat Now</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 Mindful. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/privacy"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

