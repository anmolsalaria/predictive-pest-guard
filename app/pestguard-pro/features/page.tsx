'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, MessageSquare } from "lucide-react";
import AuthCheck from "@/components/auth/AuthCheck";
import ProFeatureGuard from "@/components/ProFeatureGuard";

function ProFeaturesContent() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [expertQuestion, setExpertQuestion] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    try {
      // Mock upload and analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Pest analysis complete! Check your dashboard for results.');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleExpertSubmit = async () => {
    if (!expertQuestion.trim()) return;
    
    setIsSending(true);
    try {
      // Mock expert consultation
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Your question has been sent to our experts. You will receive a response within 24 hours.');
      setExpertQuestion('');
    } catch (error) {
      console.error('Error sending question:', error);
      alert('Failed to send question. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8DEB9] py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Pro Dashboard</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Access your premium pest management tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pest Detection */}
          <Card className="bg-white">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Upload className="h-6 w-6 text-primary" />
                <CardTitle>Pest Detection</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Upload an image of the pest
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                </div>
                <Button
                  onClick={handleUpload}
                  disabled={!selectedFile || isUploading}
                  className="w-full"
                >
                  {isUploading ? 'Analyzing...' : 'Upload Image'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Ask an Expert */}
          <Card className="bg-white">
            <CardHeader>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-primary" />
                <CardTitle>Ask an Expert</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Your Question
                  </label>
                  <Textarea
                    placeholder="Describe your pest problem in detail..."
                    value={expertQuestion}
                    onChange={(e) => setExpertQuestion(e.target.value)}
                    className="min-h-[150px]"
                  />
                </div>
                <Button
                  onClick={handleExpertSubmit}
                  disabled={!expertQuestion.trim() || isSending}
                  className="w-full"
                >
                  {isSending ? 'Sending...' : 'Send to Expert'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

export default function ProFeaturesPage() {
  return (
    <AuthCheck>
      <ProFeatureGuard>
        <ProFeaturesContent />
      </ProFeatureGuard>
    </AuthCheck>
  );
} 