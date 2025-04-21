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
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import { ReactNode } from 'react';

function formatMessage(content: string) {
  // Convert bullet points (- or *) at the start of lines to proper HTML lists
  const withBullets = content.split('\n').map(line => {
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      return line;
    }
    return line + '\n';
  }).join('\n');

  return withBullets;
}

const markdownComponents: Components = {
  p: (props) => <p className="mb-2 last:mb-0" {...props} />,
  ul: (props) => <ul className="list-disc pl-4 mb-2 last:mb-0" {...props} />,
  li: (props) => <li className="mb-1" {...props} />,
  strong: (props) => <span className="font-bold" {...props} />
};

function ProFeaturesContent() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState<Array<{ id: string, title: string, messages: Array<{ role: 'user' | 'assistant', content: string }> }>>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);

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

  const handleNewChat = () => {
    setActiveConversation(null);
    setChatHistory([]);
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversation(id);
    const conversation = conversations.find(conv => conv.id === id);
    if (conversation) {
      setChatHistory(conversation.messages);
    }
  };

  const handleChatSubmit = async () => {
    if (!chatMessage.trim()) return;
    
    setIsLoading(true);
    try {
      // Add user message to chat history
      const userMessage = chatMessage.trim();
      const newMessage = { role: 'user' as const, content: userMessage };
      setChatHistory(prev => [...prev, newMessage]);
      setChatMessage('');

      // Check if the message is related to agriculture/pest management
      const isAgricultureRelated = /(agriculture|farming|pest|crop|soil|plant|disease|pesticide|harvest|irrigation|fertilizer|sustainable|organic)/i.test(userMessage);
      
      if (!isAgricultureRelated) {
        const aiResponse = "I'm sorry, I cannot provide information about topics unrelated to pest management or agricultural science. How can I help you with your pest or farming questions instead?";
        const aiMessage = { role: 'assistant' as const, content: aiResponse };
        setChatHistory(prev => [...prev, aiMessage]);
        setIsLoading(false);
        return;
      }

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
      const aiMessage = { role: 'assistant' as const, content: aiResponse };
      setChatHistory(prev => [...prev, aiMessage]);

      // Update or create conversation
      if (!activeConversation) {
        const newConversation = {
          id: Date.now().toString(),
          title: userMessage.slice(0, 30) + (userMessage.length > 30 ? '...' : ''),
          messages: [newMessage, aiMessage]
        };
        setConversations(prev => [newConversation, ...prev]);
        setActiveConversation(newConversation.id);
      } else {
        setConversations(prev => prev.map(conv => 
          conv.id === activeConversation 
            ? { ...conv, messages: [...conv.messages, newMessage, aiMessage] }
            : conv
        ));
      }
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

        <div className="grid grid-cols-1 gap-8">
          {/* Pest Detection by Image */}
          <Card className="bg-white shadow-sm border-0">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Upload className="h-6 w-6" />
                <CardTitle className="text-xl font-semibold">Pest Detection by Image</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Upload an image of a pest to get instant detection and analysis using our advanced AI model.
                </p>
                <Button
                  onClick={() => window.open('https://dummy-flask-app-url.com', '_blank')}
                  className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white flex items-center justify-center gap-2 py-6 rounded-lg"
                >
                  <Upload className="h-5 w-5" />
                  Go to Pest Detection App
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Chat Section with Sidebar */}
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4">
            {/* Chat History Sidebar */}
            <div className="bg-white shadow-sm rounded-lg p-4">
              <div className="mb-4">
                <Button 
                  onClick={handleNewChat}
                  className="w-full flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                  New Chat
                </Button>
              </div>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => handleSelectConversation(conv.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      activeConversation === conv.id
                        ? 'bg-[#2563eb] text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <p className="text-sm font-medium truncate">{conv.title}</p>
                    <p className="text-xs opacity-70 truncate">
                      {conv.messages[conv.messages.length - 1].content.slice(0, 40)}...
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Chat Assistant */}
            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="text-[#2563eb]">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold">AI Pest Management Assistant</CardTitle>
                    <p className="text-gray-600 text-sm">Specialized in agricultural science, pest management, and sustainable farming practices</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-[400px] overflow-y-auto rounded-lg bg-gray-50 p-4">
                    {chatHistory.length === 0 && (
                      <div className="flex items-start gap-3 mb-4">
                        <div className="h-8 w-8 rounded-full bg-[#2563eb] text-white flex items-center justify-center">
                          P
                        </div>
                        <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                          <p className="text-gray-800">
                            Hello! I'm your AI Pest Management Assistant. I specialize in agricultural science, pest management, and sustainable farming practices. I can help you with:
                            <br />
                            - Pest identification and control
                            <br />
                            - Crop diseases and treatments
                            <br />
                            - Sustainable farming methods
                            <br />
                            - Soil health and management
                            <br />
                            - Pesticide usage and alternatives
                            <br />
                            <br />
                            Please note that I can only answer questions related to agriculture and pest management. How can I assist you today?
                          </p>
                        </div>
                      </div>
                    )}
                    {chatHistory.map((message, index) => (
                      <div
                        key={index}
                        className={`flex items-start gap-3 mb-4 ${
                          message.role === 'user' ? 'flex-row-reverse' : ''
                        }`}
                      >
                        {message.role === 'assistant' && (
                          <div className="h-8 w-8 rounded-full bg-[#2563eb] text-white flex items-center justify-center">
                            P
                          </div>
                        )}
                        <div
                          className={`rounded-lg p-3 max-w-[80%] ${
                            message.role === 'user'
                              ? 'bg-[#2563eb] text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <div className="prose prose-sm max-w-none">
                            <ReactMarkdown components={markdownComponents}>
                              {formatMessage(message.content)}
                            </ReactMarkdown>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex items-start gap-3 mb-4">
                        <div className="h-8 w-8 rounded-full bg-[#2563eb] text-white flex items-center justify-center">
                          P
                        </div>
                        <div className="bg-gray-100 rounded-lg p-3">
                          <p className="text-gray-600">Thinking...</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask Pesty about pest management..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleChatSubmit();
                        }
                      }}
                      className="flex-1 bg-white"
                    />
                    <Button
                      onClick={handleChatSubmit}
                      disabled={!chatMessage.trim() || isLoading}
                      className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        className="h-4 w-4"
                      >
                        <path 
                          d="M22 2L11 13"
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                        <path 
                          d="M22 2L15 22L11 13L2 9L22 2Z" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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