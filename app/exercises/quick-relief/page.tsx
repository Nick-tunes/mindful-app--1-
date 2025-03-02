"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const quickReliefExercises = [
  {
    title: "5-4-3-2-1 Grounding",
    description: "Use your senses to ground yourself in the present moment.",
    steps: [
      "Name 5 things you can see",
      "Name 4 things you can touch",
      "Name 3 things you can hear",
      "Name 2 things you can smell",
      "Name 1 thing you can taste",
    ],
  },
  {
    title: "Square Breathing",
    description: "A simple breathing technique to calm your mind quickly.",
    steps: [
      "Breathe in for 4 seconds",
      "Hold for 4 seconds",
      "Breathe out for 4 seconds",
      "Hold for 4 seconds",
      "Repeat 4 times",
    ],
  },
  {
    title: "Progressive Muscle Relaxation",
    description: "Tense and relax each muscle group to release physical tension.",
    steps: [
      "Start with your toes, tense for 5 seconds",
      "Release and notice the relaxation",
      "Move to your calves, then thighs",
      "Continue up your body to your face",
      "Notice the overall sense of relaxation",
    ],
  },
  {
    title: "Mindful Observation",
    description: "Focus intently on one object to quiet racing thoughts.",
    steps: [
      "Choose an object in your surroundings",
      "Observe its color, texture, and shape",
      "Notice any patterns or imperfections",
      "Imagine its history or how it was made",
      "Spend 2 minutes in focused observation",
    ],
  },
  {
    title: "Positive Memory Recall",
    description: "Shift your focus to a positive memory to change your emotional state.",
    steps: [
      "Think of a happy or peaceful memory",
      "Visualize the scene in detail",
      "Remember the sounds and smells",
      "Recall how you felt in that moment",
      "Let the positive emotions fill you",
    ],
  },
]

export default function QuickReliefPage() {
  const [currentExercise, setCurrentExercise] = useState(quickReliefExercises[0])
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const handleNextExercise = () => {
    const currentIndex = quickReliefExercises.indexOf(currentExercise)
    const nextIndex = (currentIndex + 1) % quickReliefExercises.length
    setCurrentExercise(quickReliefExercises[nextIndex])
    setCompletedSteps([])
  }

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="container py-10">
      <div className="mb-8 flex items-center">
        <Link href="/exercises">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Exercises
          </Button>
        </Link>
      </div>

      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-3xl font-bold">Quick Relief Exercises</h1>
        <p className="mb-8 text-muted-foreground">
          Fast techniques for immediate calm when you're feeling overwhelmed.
        </p>

        <Card>
          <CardHeader>
            <CardTitle>{currentExercise.title}</CardTitle>
            <CardDescription>{currentExercise.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              {currentExercise.steps.map((step, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className={completedSteps.includes(index) ? "bg-primary text-primary-foreground" : ""}
                    onClick={() => toggleStep(index)}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <span className={completedSteps.includes(index) ? "line-through" : ""}>{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
          <CardFooter>
            <Button onClick={handleNextExercise} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Another Exercise
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

