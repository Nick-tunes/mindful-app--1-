"use client"

import { useState } from "react"
import { CalendarIcon, Plus, Trash } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"

export default function JournalPage() {
  const [date, setDate] = useState(new Date())
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: new Date(2025, 2, 1),
      gratefulFor: ["My supportive friends", "Having a safe place to live", "My health"],
      notes: "Today was challenging but I'm proud of how I handled my anxiety during the meeting.",
    },
    {
      id: 2,
      date: new Date(2025, 2, 2),
      gratefulFor: ["The beautiful weather", "My morning coffee", "My progress in therapy"],
      notes:
        "I noticed I was overthinking about the project deadline, but I used my breathing techniques and it helped.",
    },
  ])
  const [newEntry, setNewEntry] = useState({
    gratefulFor: ["", "", ""],
    notes: "",
  })
  const [openDialog, setOpenDialog] = useState(false)

  const handleAddEntry = () => {
    const filledGratitudes = newEntry.gratefulFor.filter((item) => item.trim() !== "")

    if (filledGratitudes.length === 0 && newEntry.notes.trim() === "") {
      return
    }

    setEntries([
      ...entries,
      {
        id: Date.now(),
        date: new Date(date),
        gratefulFor: filledGratitudes.length > 0 ? filledGratitudes : [],
        notes: newEntry.notes,
      },
    ])

    setNewEntry({
      gratefulFor: ["", "", ""],
      notes: "",
    })

    setOpenDialog(false)
  }

  const handleDeleteEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id))
  }

  const updateGratitudeItem = (index, value) => {
    const updatedGratitudes = [...newEntry.gratefulFor]
    updatedGratitudes[index] = value
    setNewEntry({
      ...newEntry,
      gratefulFor: updatedGratitudes,
    })
  }

  const entriesForSelectedDate = entries.filter(
    (entry) => format(entry.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd"),
  )

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="md:w-80">
          <Card>
            <CardHeader>
              <CardTitle>Gratitude Journal</CardTitle>
              <CardDescription>Record what you're grateful for</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            </CardContent>
            <CardFooter>
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    New Entry
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Journal Entry</DialogTitle>
                    <DialogDescription>
                      What are you grateful for today? Focusing on gratitude can help shift your mind from overthinking.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="date" className="mb-2 block">
                        Date
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {format(date, "PPP")}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label className="mb-2 block">I am grateful for...</Label>
                      {newEntry.gratefulFor.map((item, index) => (
                        <Input
                          key={index}
                          placeholder={`Gratitude ${index + 1}`}
                          value={item}
                          onChange={(e) => updateGratitudeItem(index, e.target.value)}
                        />
                      ))}
                    </div>
                    <div>
                      <Label htmlFor="notes" className="mb-2 block">
                        Additional Notes
                      </Label>
                      <Textarea
                        id="notes"
                        placeholder="How did you manage overthinking today? What went well?"
                        value={newEntry.notes}
                        onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleAddEntry}>
                      Save Entry
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">{format(date, "MMMM d, yyyy")}</h2>
          </div>

          {entriesForSelectedDate.length > 0 ? (
            <div className="space-y-6">
              {entriesForSelectedDate.map((entry) => (
                <Card key={entry.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Gratitude List</CardTitle>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteEntry(entry.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription>{format(entry.date, "MMMM d, yyyy")}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {entry.gratefulFor.length > 0 && (
                      <div>
                        <h3 className="mb-2 font-medium">I am grateful for:</h3>
                        <ul className="ml-6 list-disc space-y-1">
                          {entry.gratefulFor.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {entry.notes && (
                      <div>
                        <h3 className="mb-2 font-medium">Notes:</h3>
                        <p className="text-muted-foreground">{entry.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex h-[300px] flex-col items-center justify-center rounded-lg border border-dashed">
              <p className="mb-4 text-muted-foreground">No entries for this date</p>
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Entry
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Journal Entry</DialogTitle>
                    <DialogDescription>
                      What are you grateful for today? Focusing on gratitude can help shift your mind from overthinking.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="date" className="mb-2 block">
                        Date
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {format(date, "PPP")}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label className="mb-2 block">I am grateful for...</Label>
                      {newEntry.gratefulFor.map((item, index) => (
                        <Input
                          key={index}
                          placeholder={`Gratitude ${index + 1}`}
                          value={item}
                          onChange={(e) => updateGratitudeItem(index, e.target.value)}
                        />
                      ))}
                    </div>
                    <div>
                      <Label htmlFor="notes" className="mb-2 block">
                        Additional Notes
                      </Label>
                      <Textarea
                        id="notes"
                        placeholder="How did you manage overthinking today? What went well?"
                        value={newEntry.notes}
                        onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleAddEntry}>
                      Save Entry
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

