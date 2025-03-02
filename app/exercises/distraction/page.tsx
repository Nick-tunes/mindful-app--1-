"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Shuffle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DistractionTasksPage() {
  const [completedTasks, setCompletedTasks] = useState([])

  const mentalTasks = [
    "Count backward from 100 by 7s",
    "Name 10 countries that start with the letter 'S'",
    "List 5 red objects you can see around you",
    "Recite the alphabet backward",
    "Think of an animal for each letter of the alphabet",
    "Name 15 movies you've watched",
    "Try to remember the lyrics to your favorite song",
    "Solve this riddle: I'm tall when I'm young, and short when I'm old. What am I?",
    "Count how many blue items you can see from where you're sitting",
    "Name 10 foods that are both fruits and vegetables",
  ]

  const physicalTasks = [
    "Do 10 jumping jacks",
    "Stretch your arms above your head for 30 seconds",
    "Walk around your space and touch 5 different textures",
    "Do a quick body scan meditation, focusing on each part of your body",
    "Stand up and do 5 shoulder rolls forward and 5 backward",
    "Massage your temples gently for 1 minute",
    "Practice good posture for 2 minutes",
    "Take 5 deep breaths, focusing on the sensation of air entering and leaving your body",
    "Tense and release each muscle group in your body, starting from your toes",
    "Tap each finger to your thumb, one at a time, for 30 seconds",
  ]

  const creativeTasks = [
    "Draw a simple sketch of something in your room",
    "Write a haiku about how you're feeling right now",
    "Think of 3 alternative uses for a common household item",
    "Describe your ideal vacation in detail",
    "Create a short story using these words: mountain, whisper, blue, dance",
    "Imagine redesigning your living space - what would you change?",
    "Think of a problem you're facing and brainstorm 3 possible solutions",
    "Visualize your favorite place in detail - what do you see, hear, smell?",
    "Create a mental gratitude list of 5 things you're thankful for",
    "Imagine your life 5 years from now - what do you hope it looks like?",
  ]

  const [currentTask, setCurrentTask] = useState({
    mental: getRandomTask(mentalTasks),
    physical: getRandomTask(physicalTasks),
    creative: getRandomTask(creativeTasks),
  })

  function getRandomTask(taskArray) {
    const randomIndex = Math.floor(Math.random() * taskArray.length)
    return taskArray[randomIndex]
  }

  const refreshTask = (category) => {
    let taskArray

    switch (category) {
      case "mental":
        taskArray = mentalTasks
        break
      case "physical":
        taskArray = physicalTasks
        break
      case "creative":
        taskArray = creativeTasks
        break
      default:
        return
    }

    setCurrentTask({
      ...currentTask,
      [category]: getRandomTask(taskArray),
    })
  }

  const markTaskComplete = (category, task) => {
    if (!completedTasks.includes(task)) {
      setCompletedTasks([...completedTasks, task])
    }
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

      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-bold">Distraction Tasks</h1>
        <p className="mb-8 text-muted-foreground">
          When overthinking takes hold, these activities can help redirect your focus and break the cycle.
        </p>

        <Tabs defaultValue="mental" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="mental">Mental Tasks</TabsTrigger>
            <TabsTrigger value="physical">Physical Tasks</TabsTrigger>
            <TabsTrigger value="creative">Creative Tasks</TabsTrigger>
          </TabsList>

          <TabsContent value="mental" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Mental Challenge</CardTitle>
                <CardDescription>
                  Engage your brain with these cognitive tasks to shift your focus away from repetitive thoughts.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex min-h-[200px] items-center justify-center">
                <div className="text-center">
                  <p className="text-xl font-medium">{currentTask.mental}</p>
                  <div className="mt-6 flex justify-center gap-4">
                    <Button variant="outline" size="icon" onClick={() => refreshTask("mental")}>
                      <Shuffle className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => markTaskComplete("mental", currentTask.mental)}
                      className={
                        completedTasks.includes(currentTask.mental) ? "bg-primary text-primary-foreground" : ""
                      }
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Mental tasks help redirect your thoughts by requiring concentration on a specific challenge.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="physical" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Physical Activity</CardTitle>
                <CardDescription>
                  Simple physical tasks to ground yourself in your body and the present moment.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex min-h-[200px] items-center justify-center">
                <div className="text-center">
                  <p className="text-xl font-medium">{currentTask.physical}</p>
                  <div className="mt-6 flex justify-center gap-4">
                    <Button variant="outline" size="icon" onClick={() => refreshTask("physical")}>
                      <Shuffle className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => markTaskComplete("physical", currentTask.physical)}
                      className={
                        completedTasks.includes(currentTask.physical) ? "bg-primary text-primary-foreground" : ""
                      }
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Physical activities help release tension and bring awareness to your body instead of racing thoughts.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="creative" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Creative Exercise</CardTitle>
                <CardDescription>
                  Engage your imagination and creative thinking to shift your perspective.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex min-h-[200px] items-center justify-center">
                <div className="text-center">
                  <p className="text-xl font-medium">{currentTask.creative}</p>
                  <div className="mt-6 flex justify-center gap-4">
                    <Button variant="outline" size="icon" onClick={() => refreshTask("creative")}>
                      <Shuffle className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => markTaskComplete("creative", currentTask.creative)}
                      className={
                        completedTasks.includes(currentTask.creative) ? "bg-primary text-primary-foreground" : ""
                      }
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Creative tasks engage different parts of your brain and can provide a healthy outlet for processing
                  emotions.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold">Completed Tasks ({completedTasks.length})</h2>
          {completedTasks.length > 0 ? (
            <ul className="space-y-2">
              {completedTasks.map((task, index) => (
                <li key={index} className="flex items-center gap-2 rounded-md bg-muted p-3">
                  <Check className="h-4 w-4 text-primary" />
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">Complete tasks to see them listed here.</p>
          )}
        </div>
      </div>
    </div>
  )
}

