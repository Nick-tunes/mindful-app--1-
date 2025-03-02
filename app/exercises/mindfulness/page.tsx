"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Eye,
  Ear,
  Hand,
  SnailIcon as Nose,
  Utensils,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const mindfulnessExercises = [
  {
    title: "Body Scan",
    description: "Gradually focus your attention on different parts of your body.",
    duration: 300, // 5 minutes
    instructions: [
      "Find a comfortable position and close your eyes.",
      "Take a few deep breaths to center yourself.",
      "Begin to focus your attention on your feet.",
      "Slowly move your attention up through your legs.",
      "Continue up through your torso, arms, and shoulders.",
      "Focus on your neck and head.",
      "Notice any sensations or tension in each area.",
      "If your mind wanders, gently bring it back to your body.",
      "Take a final deep breath and slowly open your eyes.",
    ],
  },
  {
    title: "Mindful Breathing",
    description: "Focus on your breath to anchor yourself in the present moment.",
    duration: 180, // 3 minutes
    instructions: [
      "Sit comfortably with your back straight.",
      "Close your eyes and take a few deep breaths.",
      "Focus your attention on your breath.",
      "Notice the sensation of air entering and leaving your nostrils.",
      "If your mind wanders, gently bring it back to your breath.",
      "Don't judge your thoughts, just observe them.",
      "Continue focusing on your breath for the duration.",
      "Slowly open your eyes when the exercise ends.",
    ],
  },
  {
    title: "Five Senses Awareness",
    description: "Use your five senses to ground yourself in the present.",
    duration: 300, // 5 minutes
    instructions: [
      "Sit or stand comfortably and take a deep breath.",
      "Sight: Look around and notice 5 things you can see. Observe their colors, shapes, and textures.",
      "Touch: Become aware of 4 things you can feel. This could be the chair supporting you, the air on your skin, or the texture of your clothing.",
      "Hearing: Listen for 3 distinct sounds in your environment. It could be distant traffic, birds chirping, or the hum of electronics.",
      "Smell: Try to identify 2 different scents. You might need to move around to find them. Notice if they're pleasant or unpleasant.",
      "Taste: Focus on 1 taste in your mouth. If you can't taste anything, take a sip of water or tea and focus on that taste.",
      "Spend time with each sense, fully experiencing it.",
      "If your mind wanders, gently bring it back to your senses.",
      "Take a final deep breath to conclude the exercise.",
    ],
  },
]

export default function MindfulnessPage() {
  const [currentExercise, setCurrentExercise] = useState(mindfulnessExercises[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(currentExercise.duration)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isPlaying && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            setIsPlaying(false)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isPlaying, timeRemaining])

  useEffect(() => {
    const stepDuration = currentExercise.duration / currentExercise.instructions.length
    const currentStep = Math.floor((currentExercise.duration - timeRemaining) / stepDuration)
    setCurrentStepIndex(Math.min(currentStep, currentExercise.instructions.length - 1))
  }, [timeRemaining, currentExercise])

  useEffect(() => {
    resetExercise()
  }, []) // Removed unnecessary dependency: currentExercise

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const resetExercise = () => {
    setIsPlaying(false)
    setCurrentStepIndex(0)
    setTimeRemaining(currentExercise.duration)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const getSenseIcon = (step: string) => {
    if (step.startsWith("Sight:")) return <Eye className="h-6 w-6" />
    if (step.startsWith("Touch:")) return <Hand className="h-6 w-6" />
    if (step.startsWith("Hearing:")) return <Ear className="h-6 w-6" />
    if (step.startsWith("Smell:")) return <Nose className="h-6 w-6" />
    if (step.startsWith("Taste:")) return <Utensils className="h-6 w-6" />
    return null
  }

  return (
    <div className="container py-10">
      <div className="mb-8 flex items-center justify-between">
        <Link href="/exercises">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Exercises
          </Button>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/exercises/breathing">
                <Button variant="ghost" size="sm">
                  Breathing
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/exercises/distraction">
                <Button variant="ghost" size="sm">
                  Distraction
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/exercises/reframing">
                <Button variant="ghost" size="sm">
                  Reframing
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-3xl font-bold">Mindfulness Exercises</h1>
        <p className="mb-8 text-muted-foreground">
          Practice being present in the moment to reduce overthinking and anxiety.
        </p>

        <Tabs defaultValue="body-scan" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="body-scan" onClick={() => setCurrentExercise(mindfulnessExercises[0])}>
              Body Scan
            </TabsTrigger>
            <TabsTrigger value="mindful-breathing" onClick={() => setCurrentExercise(mindfulnessExercises[1])}>
              Mindful Breathing
            </TabsTrigger>
            <TabsTrigger value="five-senses" onClick={() => setCurrentExercise(mindfulnessExercises[2])}>
              Five Senses
            </TabsTrigger>
          </TabsList>

          {mindfulnessExercises.map((exercise, index) => (
            <TabsContent key={index} value={exercise.title.toLowerCase().replace(" ", "-")}>
              <Card>
                <CardHeader>
                  <CardTitle>{exercise.title}</CardTitle>
                  <CardDescription>{exercise.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 text-lg font-medium flex items-center gap-2">
                    {exercise.title === "Five Senses Awareness" &&
                      getSenseIcon(exercise.instructions[currentStepIndex])}
                    {exercise.instructions[currentStepIndex]}
                  </div>

                  <Slider
                    value={[((exercise.duration - timeRemaining) / exercise.duration) * 100]}
                    max={100}
                    step={1}
                    className="mb-2"
                    onValueChange={() => {}}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>
                      Step {currentStepIndex + 1}/{exercise.instructions.length}
                    </span>
                    <span>{formatTime(timeRemaining)}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="icon" onClick={resetExercise}>
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button onClick={togglePlayPause}>
                    {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                    {isPlaying ? "Pause" : "Start"} Exercise
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentExercise(mindfulnessExercises[(index + 1) % mindfulnessExercises.length])}
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

