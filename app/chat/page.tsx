"use client"

import { useState } from "react"
import { Send } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi there! I'm your mindfulness companion. If you're feeling overwhelmed by overthinking, I'm here to listen and help. What's on your mind today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let response

      // Simple pattern matching for common overthinking concerns
      if (input.toLowerCase().includes("anxious") || input.toLowerCase().includes("anxiety")) {
        response =
          "It sounds like you're experiencing some anxiety. That's completely normal. Let's try a quick grounding exercise: Name 5 things you can see right now, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. This can help bring you back to the present moment."
      } else if (input.toLowerCase().includes("overthinking") || input.toLowerCase().includes("can't stop thinking")) {
        response =
          "Overthinking is something many of us experience. One technique that might help is to schedule 'worry time' - set aside 15-20 minutes each day dedicated to your worries. When thoughts come up outside that time, gently remind yourself that you'll address them during your scheduled worry time."
      } else if (input.toLowerCase().includes("sleep") || input.toLowerCase().includes("can't sleep")) {
        response =
          "Sleep difficulties often go hand-in-hand with overthinking. Have you tried the 4-7-8 breathing technique? Inhale for 4 seconds, hold for 7, and exhale for 8. This can help activate your parasympathetic nervous system and prepare your body for rest."
      } else if (
        input.toLowerCase().includes("work") ||
        input.toLowerCase().includes("job") ||
        input.toLowerCase().includes("stress")
      ) {
        response =
          "Work-related stress can be particularly challenging. Consider breaking down your tasks into smaller, manageable steps. Also, remember that it's important to set boundaries - perhaps try the Pomodoro technique with dedicated breaks to give your mind some rest."
      } else {
        response =
          "Thank you for sharing that with me. When we're caught in overthinking, it can help to gently bring our attention back to the present moment. Would you like to try a quick mindfulness exercise, or perhaps explore some strategies specifically for the situation you're describing?"
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="container py-10">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>Mindful Chat</CardTitle>
          <CardDescription>Talk to our AI companion when you're feeling overwhelmed by thoughts</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <div className="flex flex-col gap-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex max-w-[80%] gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                    <Avatar className="h-8 w-8">
                      {message.role === "assistant" ? (
                        <>
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>AI</AvatarFallback>
                        </>
                      ) : (
                        <>
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>You</AvatarFallback>
                        </>
                      )}
                    </Avatar>
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex max-w-[80%] gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg bg-muted px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50"></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}

