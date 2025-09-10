"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  GraduationCap, 
  Quote, 
  ChevronsLeft, 
  Dot,
  Accessibility
} from "lucide-react"
import { toast } from "sonner"

interface KPIMetric {
  label: string
  value: number
  suffix: string
  prefix?: string
  description: string
}

interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
  fullStory?: string
  location?: string
}

interface PartnerLogo {
  name: string
  logo: string
}

const kpiMetrics: KPIMetric[] = [
  {
    label: "Students Reached",
    value: 25000,
    suffix: "+",
    description: "Students engaged in STEM programs"
  },
  {
    label: "Volunteer Hours",
    value: 15000,
    suffix: "+",
    description: "Hours donated by community volunteers"
  },
  {
    label: "School Partners",
    value: 150,
    suffix: "",
    description: "Schools actively participating"
  },
  {
    label: "Underserved Communities",
    value: 85,
    suffix: "%",
    description: "Programs serving high-need areas"
  }
]

const featuredStory = {
  name: "Maria Rodriguez",
  role: "8th Grade Student",
  image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=400&fit=crop&crop=face",
  quote: "The robotics program changed how I see myself. I never thought I could build something that actually works!",
  fullStory: "When Maria first joined our after-school robotics program, she was quiet and hesitant to participate. Coming from a family where no one had studied engineering, she didn't see herself as 'good at tech.' But with patient mentoring from our volunteer engineers and hands-on projects that connected to her interests in art and design, Maria discovered her passion for creative problem-solving. Now she leads a team of younger students, teaching them basic programming while designing robots that can create digital art. Her confidence has transformed not just in STEM, but across all her subjects. This fall, she'll be attending the state robotics championship as team captain."
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Jennifer Chen",
    role: "Parent",
    quote: "My daughter went from being afraid of math to asking for extra science books. The change has been incredible.",
    location: "San Francisco"
  },
  {
    id: "2", 
    name: "Marcus Thompson",
    role: "Teacher",
    quote: "The curriculum support and volunteer mentors have completely transformed my classroom dynamics.",
    location: "Oakland"
  },
  {
    id: "3",
    name: "Ana Gutierrez", 
    role: "Student",
    quote: "I learned that coding isn't just for certain types of people - it's for anyone willing to learn and create.",
    location: "San Jose"
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    role: "Principal", 
    quote: "Our students' engagement in STEM subjects has increased by 40% since partnering with this organization.",
    location: "Berkeley"
  },
  {
    id: "5",
    name: "Sofia Patel",
    role: "Student",
    quote: "Building my first app felt impossible at the start, but now I'm teaching other kids how to code.",
    location: "Fremont"
  }
]

const partnerLogos: PartnerLogo[] = [
  { name: "Google for Education", logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=120&h=60&fit=crop" },
  { name: "Microsoft Education", logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=120&h=60&fit=crop" },
  { name: "Bay Area Schools Foundation", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=60&fit=crop" },
  { name: "Tech for Good Alliance", logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120&h=60&fit=crop" },
  { name: "STEM Education Coalition", logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=120&h=60&fit=crop" },
  { name: "Future Engineers Fund", logo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=120&h=60&fit=crop" }
]

function CountUp({ end, duration = 2000, suffix = "", prefix = "" }: { 
  end: number
  duration?: number 
  suffix?: string
  prefix?: string
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      setCount(Math.floor(progress * end))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [end, duration])

  return (
    <span className="font-display text-3xl font-bold text-foreground">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

function KPICards({ isLoading }: { isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="bg-card border border-border">
            <CardContent className="p-6">
              <div className="space-y-2">
                <div className="h-8 bg-muted rounded animate-pulse" />
                <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiMetrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="bg-card border border-border hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="space-y-2">
                <CountUp 
                  end={metric.value} 
                  suffix={metric.suffix}
                  prefix={metric.prefix}
                />
                <h3 className="font-display font-semibold text-foreground">
                  {metric.label}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {metric.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

function FeaturedStory() {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleBookmark = useCallback(() => {
    toast.success("Story bookmarked for later reading")
  }, [])

  return (
    <Card className="bg-accent border border-border">
      <CardContent className="p-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="flex-shrink-0">
            <img
              src={featuredStory.image}
              alt={featuredStory.name}
              className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-card"
            />
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <Badge variant="secondary" className="mb-3">
                <GraduationCap className="w-3 h-3 mr-1" />
                Featured Story
              </Badge>
              <blockquote className="text-lg font-medium text-foreground leading-relaxed">
                <Quote className="w-5 h-5 text-muted-foreground mb-2" />
                "{featuredStory.quote}"
              </blockquote>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{featuredStory.name}</p>
                  <p className="text-sm text-muted-foreground">{featuredStory.role}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBookmark}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Bookmark
                </Button>
              </div>
            </div>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t border-border">
                    <p className="text-muted-foreground leading-relaxed">
                      {featuredStory.fullStory}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <Button
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full lg:w-auto"
            >
              {isExpanded ? "Show Less" : "Read Full Story"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function TestimonialsCarousel({ isLoading }: { isLoading: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    
    const handleChange = () => setReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (!isPlaying || reducedMotion) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isPlaying, reducedMotion])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-6 bg-muted rounded animate-pulse w-48" />
        <Card className="bg-card border border-border">
          <CardContent className="p-6 space-y-4">
            <div className="h-4 bg-muted rounded animate-pulse" />
            <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
            <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-display font-semibold text-foreground">
          Community Voices
        </h3>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
          >
            {isPlaying ? "Pause" : "Play"}
          </Button>
        </div>
      </div>

      <div className="relative">
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-card border border-border">
                <CardContent className="p-6">
                  <blockquote className="text-lg text-foreground mb-4 leading-relaxed">
                    <Quote className="w-5 h-5 text-muted-foreground mb-2" />
                    "{testimonials[currentIndex].quote}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">
                        {testimonials[currentIndex].name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonials[currentIndex].role}
                        {testimonials[currentIndex].location && 
                          ` • ${testimonials[currentIndex].location}`
                        }
                      </p>
                    </div>
                    <Badge variant="outline">{testimonials[currentIndex].role}</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? 'bg-primary' : 'bg-muted'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevSlide}
              aria-label="Previous testimonial"
            >
              <ChevronsLeft className="w-4 h-4 rotate-0" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextSlide}
              aria-label="Next testimonial"
            >
              <ChevronsLeft className="w-4 h-4 rotate-180" />
            </Button>
          </div>
        </div>
      </div>

      <div 
        role="status"
        aria-live="polite"
        aria-label="Current testimonial"
        className="sr-only"
      >
        Testimonial {currentIndex + 1} of {testimonials.length} from {testimonials[currentIndex].name}
      </div>
    </div>
  )
}

function PartnersMarquee() {
  const [isPaused, setIsPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    
    const handleChange = () => setReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-display font-semibold text-foreground">
          Trusted Partners
        </h3>
        {!reducedMotion && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsPaused(!isPaused)}
            aria-label={isPaused ? "Resume partner logos scroll" : "Pause partner logos scroll"}
          >
            {isPaused ? "Resume" : "Pause"}
          </Button>
        )}
      </div>

      <div className="relative overflow-hidden">
        <div 
          className={`flex gap-8 ${
            !reducedMotion && !isPaused 
              ? 'animate-[scroll_30s_linear_infinite]' 
              : ''
          }`}
          style={{
            width: 'calc(200% + 2rem)'
          }}
        >
          {[...partnerLogos, ...partnerLogos].map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center h-16 px-4 bg-card border border-border rounded-lg"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-8 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-200"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}

function ErrorFallback({ onRetry }: { onRetry: () => void }) {
  return (
    <Card className="bg-destructive/5 border border-destructive/20">
      <CardContent className="p-8 text-center">
        <div className="space-y-4">
          <div className="w-12 h-12 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
            <Accessibility className="w-6 h-6 text-destructive" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Unable to Load Impact Data
            </h3>
            <p className="text-muted-foreground mb-4">
              We're experiencing technical difficulties. Please try again or contact us for assistance.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={onRetry} variant="outline">
              Try Again
            </Button>
            <Button variant="ghost">
              Contact Support
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ImpactSection() {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Simulate loading time for demonstration
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleRetry = useCallback(() => {
    setHasError(false)
    setIsLoading(true)
    
    // Simulate retry
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  if (hasError) {
    return (
      <section className="py-16 bg-background">
        <div className="container max-w-6xl">
          <ErrorFallback onRetry={handleRetry} />
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-background" aria-labelledby="impact-heading">
      <div className="container max-w-6xl space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <Badge variant="secondary" className="mb-2">
            <Dot className="w-3 h-3 mr-1" />
            Our Impact
          </Badge>
          <h2 id="impact-heading" className="text-3xl lg:text-4xl font-display font-bold text-foreground">
            Transforming Lives Through STEM
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real numbers, real stories, and real change happening in communities across the Bay Area.
          </p>
        </div>

        {/* KPI Metrics */}
        <KPICards isLoading={isLoading} />

        {/* Featured Story */}
        <div>
          <FeaturedStory />
        </div>

        {/* Testimonials and Partners */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <TestimonialsCarousel isLoading={isLoading} />
          <div className="space-y-8">
            <PartnersMarquee />
          </div>
        </div>
      </div>
    </section>
  )
}
