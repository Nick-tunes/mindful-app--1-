"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Pause, Play, SkipBack } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

const guidedVisualizations = [
  {
    title: "Peaceful Beach",
    description: "Visualize yourself on a calm, serene beach.",
    script: [
      "Close your eyes and take a deep breath.",
      "Imagine yourself standing on a beautiful, peaceful beach.",
      "Feel the warm sand beneath your feet.",
      "Listen to the gentle sound of waves lapping at the shore.",
      "Smell the salty sea air and feel the warm sun on your skin.",
      "Watch seagulls gliding peacefully overhead.",
      "Feel a sense of calm wash over you like the waves on the sand.",
      "Take another deep breath, feeling relaxed and at peace.",
      "When you're ready, slowly open your eyes, carrying this peaceful feeling with you.",
    ],
  },
  {
    title: "Forest Retreat",
    description: "Take a mental journey through a lush, calming forest.",
    script: [
      "Close your eyes and take a few deep breaths.",
      "Imagine yourself walking along a path in a beautiful forest.",
      "Notice the soft earth beneath your feet and the dappled sunlight through the leaves.",
      "Hear the gentle rustling of leaves and chirping of birds.",
      "Smell the fresh, earthy scent of the forest.",
      "Feel a cool, gentle breeze on your skin.",
      "Come to a clearing with a peaceful stream and sit on a comfortable rock.",
      "Watch the clear water flow by, taking your worries with it.",
      "Feel a deep sense of peace and connection with nature.",
      "When you're ready, slowly open your eyes, bringing the forest's calm with you.",
    ],
  },
  {
    title: "Mountain Top",
    description: "Visualize reaching the peak of a majestic mountain.",
    script: [
      "Close your eyes and take a deep, grounding breath.",
      "Imagine yourself standing at the base of a magnificent mountain.",
      "Begin to climb, feeling your strength and determination with each step.",
      "As you ascend, feel the cool, crisp air filling your lungs.",
      "Notice the changing landscape - from forests to rocky paths.",
      "Finally, reach the summit and look out at the breathtaking view.",
      "Feel a sense of accomplishment and perspective.",
      "The world stretches out before you, and your worries seem small.",
      "Take in the silence and majesty of the mountain top.",
      "When you're ready, slowly open your eyes, carrying this sense of achievement and peace.",
    ],
  },
]

export default function GuidedVisualizationPage() {
  const [currentVisualization, setCurrentVisualization] = useState(guidedVisualizations[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            if (currentStepIndex < currentVisualization.script.length - 1) {
              setCurrentStepIndex((prevIndex) => prevIndex + 1)
              return 0
            } else {
              setIsPlaying(false)
              return 100
            }
          }
          return prevProgress + 1
        })
      }, 100) // Update every 100ms for smooth progress
    }
    return () => clearInterval(timer)
  }, [isPlaying, currentStepIndex, currentVisualization.script.length])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const resetVisualization = () => {
    setIsPlaying(false)
    setCurrentStepIndex(0)
    setProgress(0)
  }

  const changeVisualization = () => {
    const currentIndex = guidedVisualizations.indexOf(currentVisualization)
    const nextIndex = (currentIndex + 1) % guidedVisualizations.length
    setCurrentVisualization(guidedVisualizations[nextIndex])
    resetVisualization()
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
        <h1 className="mb-2 text-3xl font-bold">Guided Visualization</h1>
        <p className="mb-8 text-muted-foreground">
          Use your imagination to find calm and escape from stressful thoughts.
        </p>

        <Card>
          <CardHeader>
            <CardTitle>{currentVisualization.title}</CardTitle>
            <CardDescription>{currentVisualization.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 text-lg font-medium">{currentVisualization.script[currentStepIndex]}</div>

            <Slider value={[progress]} max={100} step={1} className="mb-2" onValueChange={() => {}} />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {currentStepIndex + 1}</span>
              <span>{currentVisualization.script.length} Steps</span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="icon" onClick={resetVisualization}>
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button onClick={togglePlayPause}>
              {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
              {isPlaying ? "Pause" : "Start"} Visualization
            </Button>
            <Button variant="outline" onClick={changeVisualization}>
              Next Visualization
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

