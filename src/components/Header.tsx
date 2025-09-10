"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Menu, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const navItems = [
  { name: "Programs", href: "#programs" },
  { name: "Events", href: "#events" },
  { name: "Impact", href: "#impact" },
  { name: "Get Involved", href: "#get-involved" },
  { name: "About", href: "#about" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Determine active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      setActiveSection(currentSection || "");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const sectionId = href.substring(1);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const handleDonateClick = () => {
    setIsDonationModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleDonationSubmit = (amount: string) => {
    // Simulate donation processing
    setIsDonationModalOpen(false);
    toast.success(`Thank you for your $${amount} donation!`);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/90 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo and Name */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm lg:text-base">S</span>
            </div>
            <span className="font-display font-bold text-lg lg:text-xl text-foreground">
              STEM Access
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm px-2 py-1 ${
                  activeSection === item.href.substring(1)
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground"
                }`}
                aria-label={`Navigate to ${item.name} section`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" className="text-sm font-medium">
              Log in
            </Button>
            <Button onClick={handleDonateClick} className="text-sm font-medium">
              Donate
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col space-y-6 mt-8">
                {/* Mobile Logo */}
                <div className="flex items-center space-x-3 px-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">S</span>
                  </div>
                  <span className="font-display font-bold text-lg text-foreground">
                    STEM Access
                  </span>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleNavClick(item.href)}
                      className={`flex items-center justify-between px-2 py-3 text-left rounded-md transition-colors hover:bg-accent focus:outline-none focus:bg-accent ${
                        activeSection === item.href.substring(1)
                          ? "text-primary bg-accent"
                          : "text-foreground"
                      }`}
                      aria-label={`Navigate to ${item.name} section`}
                    >
                      <span className="font-medium">{item.name}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                  ))}
                </nav>

                {/* Mobile Actions */}
                <div className="flex flex-col space-y-3 pt-6 border-t border-border">
                  <Button variant="ghost" className="justify-start h-12">
                    Log in
                  </Button>
                  <Button 
                    onClick={handleDonateClick}
                    className="justify-start h-12 bg-primary text-primary-foreground"
                  >
                    Donate Now
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Donation Modal */}
      <Dialog open={isDonationModalOpen} onOpenChange={setIsDonationModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-xl">
              Support STEM Access
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <p className="text-muted-foreground">
              Your donation helps us make STEM education accessible to all children.
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              {["25", "50", "100", "250"].map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  onClick={() => handleDonationSubmit(amount)}
                  className="h-12 font-medium"
                >
                  ${amount}
                </Button>
              ))}
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Custom amount:</span>
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const value = (e.target as HTMLInputElement).value;
                      if (value && parseInt(value) > 0) {
                        handleDonationSubmit(value);
                      }
                    }
                  }}
                />
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground">
              This is a demo donation form. No actual payment will be processed.
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
