'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useRouter } from "next/navigation";
import { Camera, MessageSquare, FileText, CheckCircle2 } from "lucide-react";
import AuthCheck from "@/components/auth/AuthCheck";
import ProUserRedirect from "@/components/ProUserRedirect";

function PestGuardProContent() {
  const { t } = useLanguage();
  const router = useRouter();

  const features = [
    {
      title: "Pest Detection by Image",
      description: "Upload images of pests and get instant AI-powered identification and analysis",
      icon: Camera,
    },
    {
      title: "Ask an Expert",
      description: "Get personalized advice from agricultural experts for your specific pest problems",
      icon: MessageSquare,
    },
    {
      title: "Detailed Reports",
      description: "Generate comprehensive reports with recommendations and preventive measures",
      icon: FileText,
    },
  ];

  const handleGetPro = () => {
    router.push("/pestguard-pro/payment");
  };

  return (
    <main className="min-h-screen bg-[#F8DEB9] py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">PestGuard Pro</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock advanced features to protect your crops with AI-powered pest management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <feature.icon className="h-6 w-6 text-primary" />
                  <CardTitle>{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-3xl font-bold text-green-600">₹1</span>
              <span className="text-xl text-gray-500 line-through">₹1000</span>
            </div>
            <p className="text-sm text-gray-600">99.99% off for a limited time</p>
            <p className="text-gray-600">Cancel anytime</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>Unlimited pest detection</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>Priority expert support</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>Detailed analysis reports</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>Advanced prediction models</span>
            </div>
          </div>

          <Button
            onClick={handleGetPro}
            className="w-full py-6 text-lg"
          >
            Get Pro Now for ₹1
          </Button>
        </div>
      </div>
    </main>
  );
}

export default function PestGuardProPage() {
  return (
    <AuthCheck>
      <ProUserRedirect>
        <PestGuardProContent />
      </ProUserRedirect>
    </AuthCheck>
  );
} 