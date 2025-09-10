"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/text-area";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Grid3x3, CircleCheckBig, SquareUser, CalendarSearch, ListFilterPlus } from "lucide-react";
import { toast } from "sonner";

// Types
interface Program {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  ageRange: string;
  duration: string;
  thumbnail: string;
  topics: string[];
  format: "in-person" | "online" | "hybrid";
  schedule: string;
  outcomes: string[];
  teacher: string;
  pricing: string;
  registered: boolean;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  registered: number;
  rsvped: boolean;
}

interface FilterState {
  ageRanges: string[];
  topics: string[];
  format: "all" | "in-person" | "online";
}

// Mock data
const mockPrograms: Program[] = [
  {
    id: "1",
    name: "Intro to Robotics",
    description: "Build and program your first robot with LEGO Mindstorms",
    fullDescription: "Students will learn the basics of robotics engineering and programming through hands-on building with LEGO Mindstorms. This comprehensive course covers mechanical design, sensor integration, and basic programming concepts.",
    ageRange: "6–9",
    duration: "8 weeks",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=240&fit=crop",
    topics: ["Robotics", "Coding"],
    format: "in-person",
    schedule: "Saturdays 10:00-11:30 AM",
    outcomes: ["Build and program a robot", "Understanding of sensors", "Basic programming logic"],
    teacher: "Ms. Sarah Johnson",
    pricing: "$120 for 8 sessions",
    registered: false
  },
  {
    id: "2",
    name: "Python for Kids",
    description: "Learn programming fundamentals with fun games and projects",
    fullDescription: "An engaging introduction to Python programming through game development and interactive projects. Students learn programming concepts while creating their own games and animations.",
    ageRange: "10–13",
    duration: "6 weeks",
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=240&fit=crop",
    topics: ["Coding"],
    format: "online",
    schedule: "Tuesdays & Thursdays 4:00-5:00 PM",
    outcomes: ["Create simple games", "Understand programming concepts", "Problem-solving skills"],
    teacher: "Mr. Alex Chen",
    pricing: "$90 for 6 sessions",
    registered: false
  },
  {
    id: "3",
    name: "Science Experiments Lab",
    description: "Hands-on chemistry and physics experiments for young scientists",
    fullDescription: "A laboratory-style course where students conduct safe, age-appropriate experiments to explore chemistry and physics concepts. Each session includes hands-on experiments and scientific observation.",
    ageRange: "6–9",
    duration: "4 weeks",
    thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=240&fit=crop",
    topics: ["Science"],
    format: "in-person",
    schedule: "Wednesdays 3:30-4:30 PM",
    outcomes: ["Conduct experiments safely", "Scientific observation skills", "Understanding of basic chemistry"],
    teacher: "Dr. Maria Rodriguez",
    pricing: "$80 for 4 sessions",
    registered: false
  },
  {
    id: "4",
    name: "Math Games & Puzzles",
    description: "Make math fun with interactive games and brain teasers",
    fullDescription: "Transform math learning through engaging games, puzzles, and interactive challenges. Students develop problem-solving skills and mathematical thinking in a fun, collaborative environment.",
    ageRange: "3–5",
    duration: "6 weeks",
    thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=240&fit=crop",
    topics: ["Math"],
    format: "hybrid",
    schedule: "Fridays 2:00-3:00 PM",
    outcomes: ["Improve math skills", "Logical thinking", "Problem-solving confidence"],
    teacher: "Ms. Jennifer Lee",
    pricing: "$75 for 6 sessions",
    registered: false
  }
];

const mockEvents: Event[] = [
  {
    id: "1",
    title: "STEM Family Night",
    date: "2024-02-15",
    time: "6:00 PM - 8:00 PM",
    location: "Community Center",
    capacity: 50,
    registered: 32,
    rsvped: false
  },
  {
    id: "2",
    title: "Coding Workshop",
    date: "2024-02-22",
    time: "10:00 AM - 12:00 PM",
    location: "Online",
    capacity: 25,
    registered: 18,
    rsvped: false
  },
  {
    id: "3",
    title: "Science Fair Showcase",
    date: "2024-03-01",
    time: "1:00 PM - 4:00 PM",
    location: "School Auditorium",
    capacity: 100,
    registered: 67,
    rsvped: false
  }
];

const ageRangeOptions = ["3–5", "6–9", "10–13", "14+"];
const topicOptions = ["Coding", "Robotics", "Science", "Math", "Maker"];
const formatOptions = [
  { value: "all", label: "All Formats" },
  { value: "in-person", label: "In-person" },
  { value: "online", label: "Online" }
];

export default function ProgramsEngagement() {
  // State
  const [programs, setPrograms] = useState<Program[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    ageRanges: [],
    topics: [],
    format: "all"
  });
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showVolunteerForm, setShowVolunteerForm] = useState(false);
  const [volunteerSubmitted, setVolunteerSubmitted] = useState(false);

  // Load data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPrograms(mockPrograms);
      setEvents(mockEvents);
      setLoading(false);
    };
    loadData();
  }, []);

  // Filtered programs
  const filteredPrograms = useMemo(() => {
    return programs.filter(program => {
      const ageMatch = filters.ageRanges.length === 0 || filters.ageRanges.includes(program.ageRange);
      const topicMatch = filters.topics.length === 0 || program.topics.some(topic => filters.topics.includes(topic));
      const formatMatch = filters.format === "all" || program.format === filters.format;
      return ageMatch && topicMatch && formatMatch;
    });
  }, [programs, filters]);

  // Filter handlers
  const toggleAgeRange = useCallback((ageRange: string) => {
    setFilters(prev => ({
      ...prev,
      ageRanges: prev.ageRanges.includes(ageRange)
        ? prev.ageRanges.filter(a => a !== ageRange)
        : [...prev.ageRanges, ageRange]
    }));
  }, []);

  const toggleTopic = useCallback((topic: string) => {
    setFilters(prev => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter(t => t !== topic)
        : [...prev.topics, topic]
    }));
  }, []);

  const setFormat = useCallback((format: FilterState['format']) => {
    setFilters(prev => ({ ...prev, format }));
  }, []);

  // Registration handler
  const handleProgramRegister = useCallback(async (programId: string) => {
    setPrograms(prev => prev.map(p => 
      p.id === programId ? { ...p, registered: true } : p
    ));
    setSelectedProgram(null);
    toast.success("Registration successful! You'll receive a confirmation email shortly.");
  }, []);

  // RSVP handler
  const handleEventRSVP = useCallback(async (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    if (event.registered >= event.capacity) {
      toast.error("This event is at capacity. Please try another event.");
      return;
    }

    setEvents(prev => prev.map(e => 
      e.id === eventId ? { ...e, rsvped: true, registered: e.registered + 1 } : e
    ));
    setSelectedEvent(null);
    toast.success("RSVP confirmed! See you at the event.");
  }, [events]);

  // Volunteer submission handler
  const handleVolunteerSubmit = useCallback(async () => {
    setVolunteerSubmitted(true);
    setShowVolunteerForm(false);
    toast.success("Thank you for volunteering! We'll be in touch soon.");
  }, []);

  return (
    <section className="w-full bg-background py-16">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold mb-4">Programs & Engagement</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover hands-on STEM programs, upcoming events, and volunteer opportunities designed to inspire young minds.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-card rounded-lg border p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <ListFilterPlus className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Filters</h3>
          </div>
          
          <div className="space-y-4">
            {/* Age Ranges */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Age Range</Label>
              <div className="flex flex-wrap gap-2">
                {ageRangeOptions.map(ageRange => (
                  <Button
                    key={ageRange}
                    variant={filters.ageRanges.includes(ageRange) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleAgeRange(ageRange)}
                  >
                    {ageRange}
                  </Button>
                ))}
              </div>
            </div>

            {/* Topics */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Topics</Label>
              <div className="flex flex-wrap gap-2">
                {topicOptions.map(topic => (
                  <Button
                    key={topic}
                    variant={filters.topics.includes(topic) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleTopic(topic)}
                  >
                    {topic}
                  </Button>
                ))}
              </div>
            </div>

            {/* Format */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Format</Label>
              <Select value={filters.format} onValueChange={(value) => setFormat(value as FilterState['format'])}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {formatOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Programs Grid */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Grid3x3 className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-xl font-semibold">Programs</h3>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-32 w-full mb-4" />
                      <Skeleton className="h-3 w-full mb-2" />
                      <Skeleton className="h-3 w-2/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredPrograms.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredPrograms.map(program => (
                  <Card key={program.id} className="overflow-hidden">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={program.thumbnail} 
                        alt={program.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{program.name}</CardTitle>
                        {program.registered && (
                          <Badge variant="default" className="bg-success text-white">
                            <CircleCheckBig className="h-3 w-3 mr-1" />
                            Registered
                          </Badge>
                        )}
                      </div>
                      <CardDescription>{program.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span className="font-medium mr-1">Age:</span> {program.ageRange}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span className="font-medium mr-1">Duration:</span> {program.duration}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {program.topics.map(topic => (
                            <Badge key={topic} variant="secondary" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <div className="flex gap-2 w-full">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              className="flex-1"
                              onClick={() => setSelectedProgram(program)}
                            >
                              Learn More
                            </Button>
                          </DialogTrigger>
                        </Dialog>
                        <Button 
                          className="flex-1"
                          disabled={program.registered}
                        >
                          {program.registered ? "Registered" : "Register"}
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="text-muted-foreground mb-4">
                    <Grid3x3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">No programs match your filters</h3>
                    <p>Try adjusting your age range, topics, or format selection.</p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setFilters({ ageRanges: [], topics: [], format: "all" })}
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Events & Volunteer Section */}
          <div className="space-y-8">
            {/* Events */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-xl font-semibold">Upcoming Events</h3>
              </div>
              
              <div className="space-y-3">
                {events.map(event => (
                  <Card key={event.id}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{event.title}</CardTitle>
                      <CardDescription>
                        {new Date(event.date).toLocaleDateString()} • {event.time}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Location:</span> {event.location}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Capacity:</span> {event.registered}/{event.capacity}
                        </div>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            className="w-full mt-4" 
                            size="sm"
                            disabled={event.rsvped || event.registered >= event.capacity}
                            onClick={() => setSelectedEvent(event)}
                          >
                            {event.rsvped ? "RSVP'd" : event.registered >= event.capacity ? "Full" : "RSVP"}
                          </Button>
                        </DialogTrigger>
                      </Dialog>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Volunteer Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <SquareUser className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-xl font-semibold">Volunteer</h3>
              </div>
              
              {volunteerSubmitted ? (
                <Card className="text-center p-6">
                  <CircleCheckBig className="h-12 w-12 mx-auto text-success mb-4" />
                  <h4 className="font-semibold mb-2">Thank You!</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    We've received your volunteer application and will contact you soon.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setVolunteerSubmitted(false)}
                  >
                    Submit Another Application
                  </Button>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Join Our Team</CardTitle>
                    <CardDescription>
                      Help us inspire the next generation of STEM leaders.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <Button 
                      className="w-full" 
                      onClick={() => setShowVolunteerForm(true)}
                    >
                      Volunteer With Us
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Program Detail Modal */}
      {selectedProgram && (
        <Dialog open={!!selectedProgram} onOpenChange={() => setSelectedProgram(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedProgram.name}</DialogTitle>
              <DialogDescription>{selectedProgram.description}</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="aspect-video overflow-hidden rounded-lg">
                <img 
                  src={selectedProgram.thumbnail} 
                  alt={selectedProgram.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Age Range:</span> {selectedProgram.ageRange}
                </div>
                <div>
                  <span className="font-medium">Duration:</span> {selectedProgram.duration}
                </div>
                <div>
                  <span className="font-medium">Schedule:</span> {selectedProgram.schedule}
                </div>
                <div>
                  <span className="font-medium">Instructor:</span> {selectedProgram.teacher}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-2">About This Program</h4>
                <p className="text-sm text-muted-foreground">{selectedProgram.fullDescription}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Learning Outcomes</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {selectedProgram.outcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CircleCheckBig className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Price:</span>
                  <span className="text-lg font-bold">{selectedProgram.pricing}</span>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedProgram(null)}>
                Close
              </Button>
              <Button 
                onClick={() => handleProgramRegister(selectedProgram.id)}
                disabled={selectedProgram.registered}
              >
                {selectedProgram.registered ? "Already Registered" : "Register Now"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Event RSVP Modal */}
      {selectedEvent && (
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>RSVP for {selectedEvent.title}</DialogTitle>
              <DialogDescription>
                {new Date(selectedEvent.date).toLocaleDateString()} • {selectedEvent.time}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              handleEventRSVP(selectedEvent.id);
            }}>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="parent-name">Parent/Guardian Name</Label>
                    <Input id="parent-name" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="child-age">Child's Age</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select age range" />
                    </SelectTrigger>
                    <SelectContent>
                      {ageRangeOptions.map(age => (
                        <SelectItem key={age} value={age}>{age}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea id="notes" placeholder="Any dietary restrictions, accessibility needs, or questions..." />
                </div>
              </div>

              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={() => setSelectedEvent(null)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Confirm RSVP
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Volunteer Form Modal */}
      <Dialog open={showVolunteerForm} onOpenChange={setShowVolunteerForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Volunteer Application</DialogTitle>
            <DialogDescription>
              Help us create amazing STEM experiences for children in our community.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            handleVolunteerSubmit();
          }}>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="vol-name">Full Name</Label>
                  <Input id="vol-name" required />
                </div>
                <div>
                  <Label htmlFor="vol-email">Email</Label>
                  <Input id="vol-email" type="email" required />
                </div>
              </div>
              <div>
                <Label htmlFor="availability">Availability</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="When can you help?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekdays">Weekdays</SelectItem>
                    <SelectItem value="weekends">Weekends</SelectItem>
                    <SelectItem value="evenings">Evenings</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="skills">Skills & Interests</Label>
                <Textarea 
                  id="skills" 
                  placeholder="Tell us about your background, skills, or areas you'd like to help with..."
                  required
                />
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setShowVolunteerForm(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Submit Application
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
