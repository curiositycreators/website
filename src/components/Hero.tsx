"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Play, MousePointerClick, PackageOpen } from "lucide-react";
import { toast } from "sonner";

interface HeroProps {
  className?: string;
}

export default function Hero({ className }: HeroProps) {
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [selectedAgeRange, setSelectedAgeRange] = useState("all");
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const ageRanges = [
    { value: "all", label: "All Ages" },
    { value: "5-8", label: "5-8 years" },
    { value: "9-12", label: "9-12 years" },
    { value: "13-17", label: "13-17 years" }
  ];

  const handleExplorePrograms = () => {
    // Store selected age range for filtering
    localStorage.setItem("preferredAgeFilter", selectedAgeRange);
    
    // Smooth scroll to Programs section
    const programsSection = document.getElementById("programs");
    if (programsSection) {
      programsSection.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
    
    toast.success("Navigating to programs...");
  };

  const handleDonationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const amount = formData.get("amount") as string;
    
    // Simulate donation processing
    setTimeout(() => {
      setDonationModalOpen(false);
      toast.success(`Thank you for your ${amount} donation!`);
    }, 1000);
  };

  const handlePlayVideo = () => {
    setVideoModalOpen(true);
  };

  return (
    <section className={`relative w-full bg-gradient-to-br from-background via-brand-soft to-accent ${className || ""}`}>
      <div className="container max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Column */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-800 text-foreground leading-tight">
                Making STEM 
                <span className="block">
                  <mark className="bg-badge-new-bg text-badge-new-text px-3 py-1 rounded-full">
                    Accessible
                  </mark>
                </span>
                for Every Child
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl">
                Empowering the next generation through hands-on science, technology, 
                engineering, and math programs that inspire curiosity and build confidence.
              </p>
            </div>

            {/* Age Range Filter */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground block">
                I'm interested in programs for:
              </label>
              <div className="flex flex-wrap gap-2">
                {ageRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setSelectedAgeRange(range.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                      selectedAgeRange === range.value
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card text-card-foreground border-border hover:bg-secondary"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handleExplorePrograms}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base font-semibold"
              >
                <PackageOpen className="w-5 h-5 mr-2" />
                Explore Programs
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => setDonationModalOpen(true)}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 text-base font-semibold"
              >
                <MousePointerClick className="w-5 h-5 mr-2" />
                Donate Now
              </Button>
            </div>
          </div>

          {/* Media Column */}
          <div className="relative">
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <div className="aspect-video bg-gradient-to-br from-accent to-secondary rounded-xl relative overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&crop=center"
                  alt="Children engaged in hands-on STEM activities"
                  className="w-full h-full object-cover"
                />
                
                {/* Video Play Overlay */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={handlePlayVideo}
                    className="bg-white/90 hover:bg-white text-primary rounded-full p-4 transition-all duration-200 transform hover:scale-110"
                    aria-label="Play introduction video"
                  >
                    <Play className="w-8 h-8 ml-1" />
                  </button>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <h3 className="text-xl font-display font-600 text-card-foreground">
                  See Our Impact in Action
                </h3>
                <p className="text-muted-foreground">
                  Watch how we're transforming STEM education and inspiring 
                  young minds across our community.
                </p>
                
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div>
                    <span className="font-semibold text-foreground">2,500+</span> Students Reached
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">95%</span> Engagement Rate
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Modal */}
      <Dialog open={donationModalOpen} onOpenChange={setDonationModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Support Our Mission</DialogTitle>
            <DialogDescription>
              Your donation helps us provide STEM education to more children in our community.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleDonationSubmit} className="space-y-6 mt-4">
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground block">
                Donation Amount
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["$25", "$50", "$100"].map((amount) => (
                  <label key={amount} className="relative">
                    <input
                      type="radio"
                      name="amount"
                      value={amount}
                      className="peer sr-only"
                      defaultChecked={amount === "$50"}
                    />
                    <div className="border border-border rounded-lg p-3 text-center cursor-pointer peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground hover:bg-secondary transition-all">
                      {amount}
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDonationModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Donate
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Video Modal */}
      <Dialog open={videoModalOpen} onOpenChange={setVideoModalOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Our STEM Education Program</DialogTitle>
          </DialogHeader>
          
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-white">
              <div className="text-center">
                <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Video player would be embedded here</p>
                <p className="text-sm opacity-75 mt-2">
                  Showcasing our STEM programs and student success stories
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
