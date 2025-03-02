"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Thought = {
  id: number
  negative: string
  reframed: string
}

export default function ThoughtReframingPage() {
  const [thoughts, setThoughts] = useState<Thought[]>([])
  const [newNegative, setNewNegative] = useState("")
  const [newReframed, setNewReframed] = useState("")

  const addThought = () => {
    if (newNegative.trim() && newReframed.trim()) {
      setThoughts([...thoughts, { id: Date.now(), negative: newNegative, reframed: newReframed }])
      setNewNegative("")
      setNewReframed("")
    }
  }

  const deleteThought = (id: number) => {
    setThoughts(thoughts.filter((thought) => thought.id !== id))
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
        <h1 className="mb-2 text-3xl font-bold">Thought Reframing</h1>
        <p className="mb-8 text-muted-foreground">
          Challenge and change negative thought patterns to reduce overthinking.
        </p>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add New Thought</CardTitle>
            <CardDescription>
              Identify a negative thought and practice reframing it in a more balanced way.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="negative-thought">Negative Thought</Label>
                <Textarea
                  id="negative-thought"
                  placeholder="Enter your negative thought here..."
                  value={newNegative}
                  onChange={(e) => setNewNegative(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="reframed-thought">Reframed Thought</Label>
                <Textarea
                  id="reframed-thought"
                  placeholder="Reframe the thought in a more balanced way..."
                  value={newReframed}
                  onChange={(e) => setNewReframed(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={addThought} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Thought
            </Button>
          </CardFooter>
        </Card>

        {thoughts.map((thought) => (
          <Card key={thought.id} className="mb-4">
            <CardHeader>
              <CardTitle>Reframed Thought</CardTitle>
              <CardDescription>Your progress in challenging negative thinking patterns.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <Label className="text-sm font-medium">Original Thought</Label>
                  <p className="mt-1 text-muted-foreground">{thought.negative}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Reframed Thought</Label>
                  <p className="mt-1 text-muted-foreground">{thought.reframed}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" onClick={() => deleteThought(thought.id)}>
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}

        {thoughts.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              No reframed thoughts yet. Start by adding a new thought above.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

