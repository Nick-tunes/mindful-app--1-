import Link from "next/link"
import { ArrowRight, Brain, Clock, Compass, Dumbbell, Sparkles, Wind } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ExercisesPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-bold tracking-tight lg:text-5xl">Exercises</h1>
          <p className="text-xl text-muted-foreground">
            Choose from our collection of exercises designed to help you manage overthinking.
          </p>
        </div>
      </div>
      <div className="grid gap-6 pt-10 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Wind className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Breathing Exercises</CardTitle>
              <CardDescription>Calm your mind with guided breathing</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-muted-foreground">
              Breathing exercises help activate your parasympathetic nervous system, reducing stress and anxiety.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/exercises/breathing" className="w-full">
              <Button className="w-full">
                Start Exercise
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Compass className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Mindfulness</CardTitle>
              <CardDescription>Ground yourself in the present moment</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-muted-foreground">
              Mindfulness practices help you focus on the present, breaking the cycle of rumination and overthinking.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/exercises/mindfulness" className="w-full">
              <Button className="w-full">
                Start Exercise
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Dumbbell className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Distraction Tasks</CardTitle>
              <CardDescription>Redirect your focus to break thought patterns</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-muted-foreground">
              Engaging activities that help shift your attention away from repetitive thoughts and worries.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/exercises/distraction" className="w-full">
              <Button className="w-full">
                Start Exercise
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Quick Relief</CardTitle>
              <CardDescription>Fast techniques for immediate calm</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-muted-foreground">
              When you need immediate relief from overwhelming thoughts, these quick exercises can help in just minutes.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/exercises/quick-relief" className="w-full">
              <Button className="w-full">
                Start Exercise
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Thought Reframing</CardTitle>
              <CardDescription>Challenge and change negative thought patterns</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-muted-foreground">
              Learn to identify, challenge, and reframe unhelpful thoughts that contribute to overthinking.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/exercises/reframing" className="w-full">
              <Button className="w-full">
                Start Exercise
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Guided Visualization</CardTitle>
              <CardDescription>Use your imagination to find calm</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-muted-foreground">
              Guided imagery exercises to help you mentally escape from stressful thoughts and find a peaceful mental
              space.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/exercises/visualization" className="w-full">
              <Button className="w-full">
                Start Exercise
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

