'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, MessageSquare } from "lucide-react";
import AuthCheck from "@/components/auth/AuthCheck";
import ProFeatureGuard from "@/components/ProFeatureGuard";
import SubscriptionManagement from "@/components/SubscriptionManagement";
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

function ProFeaturesContent() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsLoading(true);
    try {
      // Mock upload and analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Pest analysis complete! Check your dashboard for results.');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatSubmit = async () => {
    if (!chatMessage.trim()) return;
    
    setIsLoading(true);
    try {
      // Add user message to chat history
      const userMessage = chatMessage.trim();
      setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);
      setChatMessage('');

      // Call Gemini API
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDc5w7ym-3PktJFe3kFb___LViy14kRnAQ`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: userMessage }]
          }]
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;

      // Add AI response to chat history
      setChatHistory(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('Error in chat:', error);
      toast.error('Failed to get response. Please try again.');
    } finally {
      setIsLoading(false);
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
          <div className="mt-4">
            <SubscriptionManagement />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pest Detection by Image */}
          <Card className="bg-white">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Upload className="h-6 w-6 text-primary" />
                <CardTitle>Pest Detection by Image</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Upload an image of a pest to get instant detection and analysis using our advanced AI model.
                </p>
                <Button
                  onClick={() => window.open('https://dummy-flask-app-url.com', '_blank')}
                  className="w-full"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Go to Pest Detection App
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Chat Assistant */}
          <Card className="bg-white">
            <CardHeader>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-primary" />
                <CardTitle>AI Pest Expert</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-[300px] overflow-y-auto border rounded-lg p-4 bg-gray-50">
                  {chatHistory.map((message, index) => (
                    <div
                      key={index}
                      className={`mb-4 ${
                        message.role === 'user' ? 'text-right' : 'text-left'
                      }`}
                    >
                      <div
                        className={`inline-block p-3 rounded-lg ${
                          message.role === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="text-center text-gray-500">
                      AI is thinking...
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about your pest problem..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleChatSubmit();
                      }
                    }}
                  />
                  <Button
                    onClick={handleChatSubmit}
                    disabled={!chatMessage.trim() || isLoading}
                  >
                    {isLoading ? 'Sending...' : 'Send'}
                  </Button>
                </div>
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