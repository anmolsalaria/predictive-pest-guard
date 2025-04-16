"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/context/LanguageContext"
import { Crown, CheckCircle2, Zap, Shield, Globe, BarChart2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function ProPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const features = [
    {
      title: "Advanced Analytics",
      description: "Access to detailed pest prediction models and advanced data visualization tools",
      icon: <BarChart2 className="h-6 w-6" />,
    },
    {
      title: "Real-time Alerts",
      description: "Get instant notifications about pest outbreaks in your region",
      icon: <Zap className="h-6 w-6" />,
    },
    {
      title: "Global Coverage",
      description: "Access pest data and predictions from around the world",
      icon: <Globe className="h-6 w-6" />,
    },
    {
      title: "Priority Support",
      description: "24/7 access to our expert team for personalized assistance",
      icon: <Shield className="h-6 w-6" />,
    },
  ]

  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (amount: number, plan: string) => {
    try {
      setLoading(true);
      
      // Load Razorpay script
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!res) {
        toast.error("Razorpay SDK failed to load");
        return;
      }

      // Create order
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency: "INR",
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to create order");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: "INR",
        name: "PestGuard Pro",
        description: `Subscription for ${plan} plan`,
        order_id: data.order.id,
        handler: async function (response: any) {
          // Handle successful payment
          toast.success("Payment successful! Welcome to PestGuard Pro!");
          router.push("/dashboard");
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
        },
        theme: {
          color: "#F8DEB9",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8DEB9]">
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">PestGuard Pro</h1>
          <p className="text-xl text-muted-foreground">
            Unlock advanced features and get the most out of Predictive PestGuard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Pro Plan</span>
                <Crown className="h-6 w-6 text-yellow-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <div className="text-4xl font-bold text-green-600">₹1<span className="text-lg text-muted-foreground">/month</span></div>
                  <div className="text-sm text-muted-foreground line-through">₹1,000/month</div>
                  <div className="text-sm font-semibold text-green-600">99.99% OFF</div>
                </div>
                <p className="text-muted-foreground">Limited time offer! Regular price ₹1,000/month after promotion</p>
                <Button 
                  className="w-full" 
                  onClick={() => handlePayment(1, "monthly")}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Get Pro Now"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Pro Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="mt-1">{feature.icon}</div>
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">We accept all major credit cards, debit cards, UPI, and net banking through Razorpay.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I cancel my subscription anytime?</h3>
                <p className="text-muted-foreground">Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is there a free trial available?</h3>
                <p className="text-muted-foreground">Yes, we offer a 14-day free trial for all new Pro subscribers.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
} 