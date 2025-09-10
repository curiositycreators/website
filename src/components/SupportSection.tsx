"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { CircleDollarSign, CreditCard, HeartHandshake, HandCoins } from "lucide-react";

const donationFormSchema = z.object({
  amount: z.string().min(1, "Please select or enter an amount"),
  frequency: z.enum(["one-time", "monthly"]),
  paymentMethod: z.string().min(1, "Please select a payment method"),
  cardNumber: z.string().min(16, "Please enter a valid card number").optional(),
  expiryDate: z.string().min(5, "Please enter expiry date (MM/YY)").optional(),
  cvv: z.string().min(3, "Please enter CVV").optional(),
});

const sponsorshipFormSchema = z.object({
  company: z.string().min(2, "Company name is required"),
  contact: z.string().min(2, "Contact name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  interests: z.string().min(10, "Please describe your interests"),
});

const newsletterFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  ageGroup: z.boolean().default(false),
  consent: z.boolean().refine((val) => val === true, "Please consent to receive updates"),
});

const suggestedAmounts = [25, 50, 100, 250, 500, 1000];

export default function SupportSection() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [donationFrequency, setDonationFrequency] = useState<"one-time" | "monthly">("one-time");
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [sponsorshipSuccess, setSponsorshipSuccess] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const donationForm = useForm<z.infer<typeof donationFormSchema>>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      amount: "",
      frequency: "one-time",
      paymentMethod: "",
    },
  });

  const sponsorshipForm = useForm<z.infer<typeof sponsorshipFormSchema>>({
    resolver: zodResolver(sponsorshipFormSchema),
    defaultValues: {
      company: "",
      contact: "",
      email: "",
      phone: "",
      interests: "",
    },
  });

  const newsletterForm = useForm<z.infer<typeof newsletterFormSchema>>({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: {
      email: "",
      ageGroup: false,
      consent: false,
    },
  });

  const handleAmountSelect = useCallback((amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
    donationForm.setValue("amount", amount.toString());
  }, [donationForm]);

  const handleCustomAmountChange = useCallback((value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
    donationForm.setValue("amount", value);
  }, [donationForm]);

  const onDonationSubmit = useCallback(async (values: z.infer<typeof donationFormSchema>) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      const amount = selectedAmount || parseInt(customAmount);
      toast.success(`Thank you! Your ${donationFrequency} donation of $${amount} has been processed.`);
      setIsDonationModalOpen(false);
      donationForm.reset();
      setSelectedAmount(null);
      setCustomAmount("");
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [selectedAmount, customAmount, donationFrequency, donationForm]);

  const onSponsorshipSubmit = useCallback(async (values: z.infer<typeof sponsorshipFormSchema>) => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSponsorshipSuccess(true);
    toast.success("Partnership inquiry sent! We'll contact you within 2 business days.");
    sponsorshipForm.reset();
    setIsProcessing(false);
  }, [sponsorshipForm]);

  const onNewsletterSubmit = useCallback(async (values: z.infer<typeof newsletterFormSchema>) => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setNewsletterSuccess(true);
    toast.success("Welcome! You've been added to our newsletter.");
    newsletterForm.reset();
    setIsProcessing(false);
  }, [newsletterForm]);

  return (
    <section className="w-full bg-card py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Support Our Mission</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Help us make STEM education accessible to every child through donations, partnerships, and community support.
          </p>
        </div>

        {/* Donation Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <CircleDollarSign className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold">Make a Donation</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Your Impact:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• $25 provides hands-on materials for one child</li>
                  <li>• $50 sponsors a coding workshop session</li>
                  <li>• $100 funds a complete robotics kit</li>
                  <li>• $250 sponsors field trip transportation</li>
                  <li>• $500 equips a classroom with STEM supplies</li>
                  <li>• $1000 sponsors a full summer program</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Suggested Amounts:</h4>
                <div className="grid grid-cols-3 gap-2">
                  {suggestedAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleAmountSelect(amount)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                        selectedAmount === amount
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card border-border hover:border-primary/50"
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Donation Details</CardTitle>
              <CardDescription>
                Choose your amount and frequency to support our programs.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="custom-amount" className="block text-sm font-medium mb-2">
                  Custom Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="custom-amount"
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    className="pl-7"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Frequency</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDonationFrequency("one-time")}
                    className={`flex-1 p-3 rounded-lg border text-sm font-medium transition-colors ${
                      donationFrequency === "one-time"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border hover:border-primary/50"
                    }`}
                  >
                    One-time
                  </button>
                  <button
                    onClick={() => setDonationFrequency("monthly")}
                    className={`flex-1 p-3 rounded-lg border text-sm font-medium transition-colors ${
                      donationFrequency === "monthly"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border hover:border-primary/50"
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              <Dialog open={isDonationModalOpen} onOpenChange={setIsDonationModalOpen}>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full" 
                    size="lg"
                    disabled={!selectedAmount && !customAmount}
                  >
                    <HandCoins className="h-4 w-4 mr-2" />
                    Donate ${selectedAmount || customAmount || "0"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Complete Your Donation</DialogTitle>
                    <DialogDescription>
                      Secure payment processing for your ${selectedAmount || customAmount} {donationFrequency} donation.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Form {...donationForm}>
                    <form onSubmit={donationForm.handleSubmit(onDonationSubmit)} className="space-y-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Amount:</span>
                          <span className="font-bold">${selectedAmount || customAmount}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Frequency:</span>
                          <span className="capitalize">{donationFrequency}</span>
                        </div>
                      </div>

                      <FormField
                        control={donationForm.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Payment Method</FormLabel>
                            <FormControl>
                              <div className="space-y-2">
                                <button
                                  type="button"
                                  onClick={() => field.onChange("card")}
                                  className={`w-full p-3 rounded-lg border text-left transition-colors ${
                                    field.value === "card"
                                      ? "bg-primary text-primary-foreground border-primary"
                                      : "bg-card border-border hover:border-primary/50"
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <CreditCard className="h-4 w-4" />
                                    Credit/Debit Card
                                  </div>
                                </button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {donationForm.watch("paymentMethod") === "card" && (
                        <div className="space-y-3">
                          <FormField
                            control={donationForm.control}
                            name="cardNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Card Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="1234 5678 9012 3456" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <FormField
                              control={donationForm.control}
                              name="expiryDate"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Expiry Date</FormLabel>
                                  <FormControl>
                                    <Input placeholder="MM/YY" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={donationForm.control}
                              name="cvv"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>CVV</FormLabel>
                                  <FormControl>
                                    <Input placeholder="123" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      )}

                      <div className="text-xs text-muted-foreground">
                        <p>🔒 Secure SSL encryption protects your payment information.</p>
                        <p>📄 Tax-deductible receipt will be emailed after donation.</p>
                      </div>

                      <Button type="submit" className="w-full" disabled={isProcessing}>
                        {isProcessing ? "Processing..." : `Donate $${selectedAmount || customAmount}`}
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>

              <p className="text-xs text-muted-foreground text-center">
                Donations are tax-deductible. You'll receive a receipt via email.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Corporate Sponsorship Section */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <HeartHandshake className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle>Corporate Sponsorship</CardTitle>
                  <CardDescription>
                    Partner with us to sponsor programs, events, and educational initiatives.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {sponsorshipSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-success-soft rounded-full flex items-center justify-center mx-auto mb-4">
                    <HeartHandshake className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                  <p className="text-muted-foreground">
                    We've received your partnership inquiry and will contact you within 2 business days to discuss opportunities.
                  </p>
                </div>
              ) : (
                <Form {...sponsorshipForm}>
                  <form onSubmit={sponsorshipForm.handleSubmit(onSponsorshipSubmit)} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={sponsorshipForm.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your Company" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={sponsorshipForm.control}
                        name="contact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Person</FormLabel>
                            <FormControl>
                              <Input placeholder="Your Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={sponsorshipForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="contact@company.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={sponsorshipForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="(555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={sponsorshipForm.control}
                      name="interests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Partnership Interests</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your sponsorship goals, budget range, and areas of interest (e.g., robotics programs, scholarships, events)..."
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" disabled={isProcessing}>
                      {isProcessing ? "Sending..." : "Request Partnership Information"}
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Newsletter Section */}
        <Card>
          <CardHeader>
            <CardTitle>Stay Connected</CardTitle>
            <CardDescription>
              Get updates on our programs, success stories, and volunteer opportunities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {newsletterSuccess ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-success-soft rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-success text-2xl">✓</span>
                </div>
                <h3 className="text-lg font-semibold mb-1">Welcome aboard!</h3>
                <p className="text-muted-foreground text-sm">
                  You'll receive our next newsletter with program updates and impact stories.
                </p>
              </div>
            ) : (
              <Form {...newsletterForm}>
                <form onSubmit={newsletterForm.handleSubmit(onNewsletterSubmit)} className="space-y-4">
                  <FormField
                    control={newsletterForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={newsletterForm.control}
                    name="ageGroup"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm">
                            I have children aged 5-17 interested in STEM programs
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={newsletterForm.control}
                    name="consent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm">
                            I consent to receive newsletters and program updates
                          </FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={isProcessing} className="w-full sm:w-auto">
                    {isProcessing ? "Subscribing..." : "Subscribe to Newsletter"}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
