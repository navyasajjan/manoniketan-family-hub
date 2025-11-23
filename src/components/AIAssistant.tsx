import { useState } from "react";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI assistant. I can help you with milestone tracking, therapy suggestions, and answer questions about your child's development. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I understand your question. Based on the data I've analyzed, I recommend continuing with the current therapy plan and focusing on communication exercises. Would you like specific activity suggestions?",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-large z-50 gap-2 bg-gradient-primary"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-[500px] shadow-large z-50 flex flex-col animate-scale-in">
          <CardHeader className="gradient-primary text-primary-foreground pb-4">
            <CardTitle className="font-display flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              AI Assistant
            </CardTitle>
            <p className="text-sm text-primary-foreground/80">
              Your personalized development guide
            </p>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.sender === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback
                        className={
                          message.sender === "ai"
                            ? "bg-primary text-primary-foreground"
                            : "bg-accent text-accent-foreground"
                        }
                      >
                        {message.sender === "ai" ? <Sparkles className="h-4 w-4" /> : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`flex-1 rounded-lg p-3 ${
                        message.sender === "ai"
                          ? "bg-muted"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask me anything..."
                  className="resize-none"
                  rows={2}
                />
                <Button onClick={handleSend} size="icon" className="shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AIAssistant;
