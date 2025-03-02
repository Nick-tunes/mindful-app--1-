"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Pause, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BreathingExercisePage() {
  const [isActive, setIsActive] = useState(false)
  const [currentPhase, setCurrentPhase] = useState("inhale")
  const [progress, setProgress] = useState(0)
  const [breathingPattern, setBreathingPattern] = useState({
    inhale: 4,
    hold1: 4,
    exhale: 6,
    hold2: 0,
  })

  const toggleExercise = () => {
    setIsActive(!isActive)
  }

  useEffect(() => {
    if (!isActive) return

    const totalDuration =
      breathingPattern.inhale + breathingPattern.hold1 + breathingPattern.exhale + breathingPattern.hold2

    const interval = 50 // Update every 50ms for smooth animation
    let elapsed = 0
    let phaseTime = 0
    let currentPhaseIndex = 0
    const phases = ["inhale", "hold1", "exhale", "hold2"]

    // Set initial phase
    setCurrentPhase("inhale")

    const timer = setInterval(() => {
      elapsed += interval / 1000
      phaseTime += interval / 1000

      // Calculate which phase we should be in
      const phaseDuration = breathingPattern[phases[currentPhaseIndex]]

      // If current phase is complete, move to next phase
      if (phaseTime >= phaseDuration) {
        phaseTime = 0
        currentPhaseIndex = (currentPhaseIndex + 1) % 4

        // Skip phases with 0 duration
        while (breathingPattern[phases[currentPhaseIndex]] === 0) {
          currentPhaseIndex = (currentPhaseIndex + 1) % 4
        }

        setCurrentPhase(phases[currentPhaseIndex])
      }

      // Calculate overall progress (0-100)
      const progressPercentage = calculateProgress(currentPhaseIndex, phaseTime, breathingPattern)

      setProgress(progressPercentage)

      if (elapsed >= totalDuration) {
        elapsed = 0
      }
    }, interval)

    return () => clearInterval(timer)
  }, [isActive, breathingPattern])

  const calculateProgress = (phaseIndex, timeInPhase, pattern) => {
    const phases = ["inhale", "hold1", "exhale", "hold2"]
    const phaseDurations = phases.map((phase) => pattern[phase])
    const totalDuration = phaseDurations.reduce((sum, duration) => sum + duration, 0)

    // Calculate progress within current phase
    const currentPhaseDuration = phaseDurations[phaseIndex]
    const phaseProgress = currentPhaseDuration > 0 ? timeInPhase / currentPhaseDuration : 1

    // Calculate overall progress
    let overallProgress = 0
    for (let i = 0; i < phaseIndex; i++) {
      overallProgress += (phaseDurations[i] / totalDuration) * 100
    }
    overallProgress += ((phaseProgress * phaseDurations[phaseIndex]) / totalDuration) * 100

    return overallProgress
  }

  const getInstructionText = () => {
    if (!isActive) return "Press play to begin"

    switch (currentPhase) {
      case "inhale":
        return "Breathe in slowly..."
      case "hold1":
        return "Hold your breath..."
      case "exhale":
        return "Breathe out slowly..."
      case "hold2":
        return "Hold before breathing in..."
      default:
        return "Breathe naturally"
    }
  }

  const updateBreathingPattern = (key, value) => {
    setBreathingPattern({
      ...breathingPattern,
      [key]: value[0],
    })
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
        <h1 className="mb-2 text-3xl font-bold">Breathing Exercises</h1>
        <p className="mb-8 text-muted-foreground">
          Controlled breathing helps calm your nervous system and reduce anxiety.
        </p>

        <Tabs defaultValue="box" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="box">Box Breathing</TabsTrigger>
            <TabsTrigger value="478">4-7-8 Technique</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>
          <TabsContent value="box" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Box Breathing</CardTitle>
                <CardDescription>
                  Equal inhale, hold, exhale, and hold pattern to promote calm and focus.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-8 flex justify-center">
                  <div className="relative flex h-64 w-64 items-center justify-center">
                    {/* Background circle */}
                    <div className="absolute inset-0 rounded-full border-8 border-primary/10"></div>

                    {/* Progress indicator */}
                    <svg className="absolute inset-0 h-full w-full -rotate-90 transform">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="46%"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="12"
                        strokeDasharray={`${progress * 2.89} 289`}
                        strokeLinecap="round"
                      />
                    </svg>

                    {/* Phase indicator */}
                    <div className={`absolute inset-0 flex items-center justify-center`}>
                      <div
                        className={`rounded-full bg-primary/20 transition-all duration-500 ${
                          currentPhase === "inhale"
                            ? "h-24 w-24 animate-pulse"
                            : currentPhase === "hold1"
                              ? "h-32 w-32"
                              : currentPhase === "exhale"
                                ? "h-16 w-16 animate-pulse"
                                : "h-24 w-24"
                        }`}
                      ></div>
                    </div>

                    {/* Text and controls */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="mb-2 text-2xl font-semibold">{getInstructionText()}</p>
                      <Button
                        variant="outline"
                        size="icon"
                        className="mt-4 h-12 w-12 rounded-full"
                        onClick={toggleExercise}
                      >
                        {isActive ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  <p>Inhale: 4s • Hold: 4s • Exhale: 4s • Hold: 4s</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setBreathingPattern({
                      inhale: 4,
                      hold1: 4,
                      exhale: 4,
                      hold2: 4,
                    })
                    setIsActive(false)
                  }}
                >
                  Reset
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="478" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>4-7-8 Breathing</CardTitle>
                <CardDescription>
                  Inhale for 4, hold for 7, exhale for 8. A powerful relaxation technique.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-8 flex justify-center">
                  <div className="relative flex h-64 w-64 items-center justify-center">
                    {/* Background circle */}
                    <div className="absolute inset-0 rounded-full border-8 border-primary/10"></div>

                    {/* Progress indicator */}
                    <svg className="absolute inset-0 h-full w-full -rotate-90 transform">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="46%"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="12"
                        strokeDasharray={`${progress * 2.89} 289`}
                        strokeLinecap="round"
                      />
                    </svg>

                    {/* Phase indicator */}
                    <div className={`absolute inset-0 flex items-center justify-center`}>
                      <div
                        className={`rounded-full bg-primary/20 transition-all duration-500 ${
                          currentPhase === "inhale"
                            ? "h-24 w-24 animate-pulse"
                            : currentPhase === "hold1"
                              ? "h-32 w-32"
                              : currentPhase === "exhale"
                                ? "h-16 w-16 animate-pulse"
                                : "h-24 w-24"
                        }`}
                      ></div>
                    </div>

                    {/* Text and controls */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="mb-2 text-2xl font-semibold">{getInstructionText()}</p>
                      <Button
                        variant="outline"
                        size="icon"
                        className="mt-4 h-12 w-12 rounded-full"
                        onClick={toggleExercise}
                      >
                        {isActive ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  <p>Inhale: 4s • Hold: 7s • Exhale: 8s • Hold: 0s</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setBreathingPattern({
                      inhale: 4,
                      hold1: 7,
                      exhale: 8,
                      hold2: 0,
                    })
                    setIsActive(false)
                  }}
                >
                  Reset
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="custom" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Custom Breathing</CardTitle>
                <CardDescription>Create your own breathing pattern to suit your needs.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-8 flex justify-center">
                  <div className="relative flex h-64 w-64 items-center justify-center">
                    {/* Background circle */}
                    <div className="absolute inset-0 rounded-full border-8 border-primary/10"></div>

                    {/* Progress indicator */}
                    <svg className="absolute inset-0 h-full w-full -rotate-90 transform">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="46%"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="12"
                        strokeDasharray={`${progress * 2.89} 289`}
                        strokeLinecap="round"
                      />
                    </svg>

                    {/* Phase indicator */}
                    <div className={`absolute inset-0 flex items-center justify-center`}>
                      <div
                        className={`rounded-full bg-primary/20 transition-all duration-500 ${
                          currentPhase === "inhale"
                            ? "h-24 w-24 animate-pulse"
                            : currentPhase === "hold1"
                              ? "h-32 w-32"
                              : currentPhase === "exhale"
                                ? "h-16 w-16 animate-pulse"
                                : "h-24 w-24"
                        }`}
                      ></div>
                    </div>

                    {/* Text and controls */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="mb-2 text-2xl font-semibold">{getInstructionText()}</p>
                      <Button
                        variant="outline"
                        size="icon"
                        className="mt-4 h-12 w-12 rounded-full"
                        onClick={toggleExercise}
                      >
                        {isActive ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Inhale Duration: {breathingPattern.inhale}s</label>
                    </div>
                    <Slider
                      disabled={isActive}
                      value={[breathingPattern.inhale]}
                      min={1}
                      max={10}
                      step={1}
                      onValueChange={(value) => updateBreathingPattern("inhale", value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Hold After Inhale: {breathingPattern.hold1}s</label>
                    </div>
                    <Slider
                      disabled={isActive}
                      value={[breathingPattern.hold1]}
                      min={0}
                      max={10}
                      step={1}
                      onValueChange={(value) => updateBreathingPattern("hold1", value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Exhale Duration: {breathingPattern.exhale}s</label>
                    </div>
                    <Slider
                      disabled={isActive}
                      value={[breathingPattern.exhale]}
                      min={1}
                      max={10}
                      step={1}
                      onValueChange={(value) => updateBreathingPattern("exhale", value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Hold After Exhale: {breathingPattern.hold2}s</label>
                    </div>
                    <Slider
                      disabled={isActive}
                      value={[breathingPattern.hold2]}
                      min={0}
                      max={10}
                      step={1}
                      onValueChange={(value) => updateBreathingPattern("hold2", value)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  <p>
                    Total cycle:{" "}
                    {breathingPattern.inhale +
                      breathingPattern.hold1 +
                      breathingPattern.exhale +
                      breathingPattern.hold2}
                    s
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setBreathingPattern({
                      inhale: 4,
                      hold1: 4,
                      exhale: 6,
                      hold2: 0,
                    })
                    setIsActive(false)
                  }}
                >
                  Reset
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

