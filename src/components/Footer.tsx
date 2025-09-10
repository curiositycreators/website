"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SquareArrowOutUpRight } from "lucide-react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      toast.error("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success("Thank you for subscribing to our newsletter!")
      setEmail("")
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="bg-muted border-t">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About Column */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-foreground">About STEM Access</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Making STEM education accessible and engaging for all children through hands-on programs, 
              mentorship, and community partnerships.
            </p>
          </div>

          {/* Programs Column */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-foreground">Programs</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#programs" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Coding Workshops
                </a>
              </li>
              <li>
                <a 
                  href="#programs" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Science Labs
                </a>
              </li>
              <li>
                <a 
                  href="#programs" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Mentorship
                </a>
              </li>
              <li>
                <a 
                  href="#programs" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Summer Camps
                </a>
              </li>
            </ul>
          </div>

          {/* Get Involved Column */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-foreground">Get Involved</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#support" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Volunteer
                </a>
              </li>
              <li>
                <a 
                  href="#support" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Donate
                </a>
              </li>
              <li>
                <a 
                  href="#support" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Partnerships
                </a>
              </li>
              <li>
                <a 
                  href="#programs" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Events
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Subscribe Column */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-foreground">Stay Connected</h4>
            
            {/* Newsletter Subscription */}
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-sm"
                disabled={isSubmitting}
              />
              <Button 
                type="submit" 
                size="sm" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>

            {/* Contact Info */}
            <div className="space-y-2 pt-2">
              <p className="text-xs text-muted-foreground">
                123 Education Way<br />
                Learning City, LC 12345
              </p>
              <p className="text-xs text-muted-foreground">
                info@stemaccess.org<br />
                (555) 123-4567
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Follow us on Facebook"
              >
                <SquareArrowOutUpRight className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Follow us on Twitter"
              >
                <SquareArrowOutUpRight className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Follow us on Instagram"
              >
                <SquareArrowOutUpRight className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Connect with us on LinkedIn"
              >
                <SquareArrowOutUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal Footer */}
        <div className="border-t border-border mt-8 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span>© 2024 STEM Access Initiative</span>
              <span>•</span>
              <span>EIN: 12-3456789</span>
              <span>•</span>
              <a 
                href="/privacy" 
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </a>
              <span>•</span>
              <a 
                href="/terms" 
                className="hover:text-foreground transition-colors"
              >
                Terms of Service
              </a>
            </div>
            <p className="text-xs text-muted-foreground">
              501(c)(3) Non-Profit Organization
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
