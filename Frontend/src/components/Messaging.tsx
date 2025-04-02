
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Video, Search, Send, Paperclip, Image, Smile } from "lucide-react";
import { cn } from "@/lib/utils";

type Contact = {
  id: string;
  name: string;
  avatar: string;
  role: string;
  status: "online" | "offline";
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
};

type Message = {
  id: string;
  contactId: string;
  content: string;
  timestamp: Date;
  isMe: boolean;
  status?: "sent" | "delivered" | "read";
};

// Sample contacts
const contacts: Contact[] = [
  {
    id: "dr-sarah-johnson",
    name: "Dr. Sarah Johnson",
    avatar: "",
    role: "Therapist",
    status: "online",
    lastMessage: "Looking forward to our session tomorrow!",
    lastMessageTime: "10:32 AM",
    unreadCount: 1,
  },
  {
    id: "dr-michael-chen",
    name: "Dr. Michael Chen",
    avatar: "",
    role: "Sleep Specialist",
    status: "offline",
    lastMessage: "How has your sleep been this week?",
    lastMessageTime: "Yesterday",
  },
  {
    id: "support-team",
    name: "Support Team",
    avatar: "",
    role: "Customer Support",
    status: "online",
    lastMessage: "Let us know if you have any other questions!",
    lastMessageTime: "2 days ago",
  },
];

// Sample messages for Dr. Sarah Johnson
const sampleMessages: Message[] = [
  {
    id: "msg-1",
    contactId: "dr-sarah-johnson",
    content: "Hi there! How have you been since our last session?",
    timestamp: new Date(new Date().setHours(new Date().getHours() - 2)),
    isMe: false,
  },
  {
    id: "msg-2",
    contactId: "dr-sarah-johnson",
    content: "I've been doing better, actually. The mindfulness exercises have been helping a lot!",
    timestamp: new Date(new Date().setHours(new Date().getHours() - 2)),
    isMe: true,
    status: "read",
  },
  {
    id: "msg-3",
    contactId: "dr-sarah-johnson",
    content: "That's wonderful to hear! Have you been keeping up with your journal?",
    timestamp: new Date(new Date().setHours(new Date().getHours() - 1)),
    isMe: false,
  },
  {
    id: "msg-4",
    contactId: "dr-sarah-johnson",
    content: "Yes, I've been writing in it almost every evening. It's becoming a good habit.",
    timestamp: new Date(new Date().setHours(new Date().getHours() - 1)),
    isMe: true,
    status: "read",
  },
  {
    id: "msg-5",
    contactId: "dr-sarah-johnson",
    content: "Looking forward to our session tomorrow!",
    timestamp: new Date(new Date().setMinutes(new Date().getMinutes() - 30)),
    isMe: false,
  },
];

export const Messaging = () => {
  const [activeContact, setActiveContact] = useState<Contact | null>(contacts[0]);
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Filter contacts based on search term
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send a new message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeContact) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      contactId: activeContact.id,
      content: newMessage,
      timestamp: new Date(),
      isMe: true,
      status: "sent",
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");

    // Simulate response after delay
    setTimeout(() => {
      const responseMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        contactId: activeContact.id,
        content: "Thank you for your message! I'll get back to you soon.",
        timestamp: new Date(),
        isMe: false,
      };
      setMessages(prev => [...prev, responseMsg]);
    }, 2000);
  };

  // Format message timestamp
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    if (messageDate.getTime() === today.getTime()) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } else if (messageDate.getTime() === today.getTime() - 86400000) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  return (
    <div className="h-[calc(100vh-120px)]">
      <div className="grid grid-cols-1 md:grid-cols-4 h-full gap-6">
        {/* Contact list */}
        <div className="md:col-span-1 h-full">
          <Card className="h-full glass-card">
            <CardHeader className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mindmend-text-muted h-4 w-4" />
                <Input
                  className="pl-9"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-y-auto h-[calc(100%-4rem)]">
              <Tabs defaultValue="recent" className="w-full">
                <div className="px-4">
                  <TabsList className="w-full">
                    <TabsTrigger value="recent" className="flex-1">Recent</TabsTrigger>
                    <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="recent" className="m-0">
                  <div className="space-y-1 py-2">
                    {filteredContacts.map((contact) => (
                      <div
                        key={contact.id}
                        className={cn(
                          "flex items-center p-3 cursor-pointer hover:bg-mindmend-blue/5 transition-colors",
                          activeContact?.id === contact.id && "bg-mindmend-blue/10"
                        )}
                        onClick={() => setActiveContact(contact)}
                      >
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={contact.avatar} />
                            <AvatarFallback className="bg-mindmend-blue/20 text-mindmend-blue">
                              {contact.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span
                            className={cn(
                              "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white",
                              contact.status === "online" ? "bg-green-500" : "bg-gray-300"
                            )}
                          ></span>
                        </div>
                        <div className="ml-3 flex-1 overflow-hidden">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium truncate">{contact.name}</h3>
                            <span className="text-xs text-mindmend-text-muted">
                              {contact.lastMessageTime}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-xs text-mindmend-text-muted truncate">
                              {contact.lastMessage}
                            </p>
                            {contact.unreadCount && (
                              <Badge className="ml-1 bg-mindmend-blue h-5 min-w-5 p-0 flex items-center justify-center rounded-full">
                                {contact.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="all" className="m-0">
                  <div className="space-y-1 py-2">
                    {filteredContacts.map((contact) => (
                      <div
                        key={contact.id}
                        className={cn(
                          "flex items-center p-3 cursor-pointer hover:bg-mindmend-blue/5 transition-colors",
                          activeContact?.id === contact.id && "bg-mindmend-blue/10"
                        )}
                        onClick={() => setActiveContact(contact)}
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={contact.avatar} />
                          <AvatarFallback className="bg-mindmend-blue/20 text-mindmend-blue">
                            {contact.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-3">
                          <h3 className="font-medium">{contact.name}</h3>
                          <p className="text-xs text-mindmend-text-muted">{contact.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Chat area */}
        <div className="md:col-span-3 h-full">
          {activeContact ? (
            <Card className="h-full flex flex-col glass-card">
              {/* Chat header */}
              <div className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={activeContact.avatar} />
                    <AvatarFallback className="bg-mindmend-blue/20 text-mindmend-blue">
                      {activeContact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <div className="flex items-center">
                      <h3 className="font-medium">{activeContact.name}</h3>
                      <span
                        className={cn(
                          "ml-2 h-2 w-2 rounded-full",
                          activeContact.status === "online" ? "bg-green-500" : "bg-gray-300"
                        )}
                      ></span>
                    </div>
                    <p className="text-xs text-mindmend-text-muted">
                      {activeContact.status === "online" ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-mindmend-text-muted hover:text-mindmend-blue hover:bg-mindmend-blue/10"
                    onClick={() => setShowVideo(!showVideo)}
                  >
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-mindmend-text-muted hover:text-mindmend-blue hover:bg-mindmend-blue/10"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="19" cy="12" r="1" />
                      <circle cx="5" cy="12" r="1" />
                    </svg>
                  </Button>
                </div>
              </div>

              {/* Video call */}
              {showVideo && (
                <div className="relative bg-gray-900 h-64">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Video className="h-10 w-10 mx-auto mb-2" />
                      <p>Starting video call...</p>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => setShowVideo(false)}
                    >
                      End Call
                    </Button>
                  </div>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.filter(m => m.contactId === activeContact.id).map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.isMe ? "justify-end" : "justify-start"
                    )}
                  >
                    {!message.isMe && (
                      <Avatar className="h-8 w-8 mr-2 mt-1">
                        <AvatarImage src={activeContact.avatar} />
                        <AvatarFallback className="bg-mindmend-blue/20 text-mindmend-blue">
                          {activeContact.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        "max-w-[75%] rounded-lg p-3",
                        message.isMe
                          ? "bg-mindmend-blue text-white"
                          : "bg-gray-100"
                      )}
                    >
                      <p>{message.content}</p>
                      <div className={cn(
                        "text-xs mt-1 flex justify-end",
                        message.isMe ? "text-blue-100" : "text-gray-500"
                      )}>
                        {formatTimestamp(message.timestamp)}
                        {message.isMe && message.status && (
                          <span className="ml-1">
                            {message.status === "sent" && "✓"}
                            {message.status === "delivered" && "✓✓"}
                            {message.status === "read" && "✓✓"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input area */}
              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-mindmend-text-muted hover:text-mindmend-blue"
                  >
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-mindmend-text-muted hover:text-mindmend-blue"
                  >
                    <Image className="h-5 w-5" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSendMessage();
                        }
                      }}
                      className="pr-10"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-mindmend-text-muted hover:text-mindmend-blue"
                    >
                      <Smile className="h-5 w-5" />
                    </Button>
                  </div>
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-mindmend-blue text-white"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center glass-card">
              <div className="text-center max-w-md">
                <MessageCircle className="h-12 w-12 mx-auto text-mindmend-blue mb-4" />
                <h2 className="text-xl font-medium mb-2">Your messages</h2>
                <p className="text-mindmend-text-muted">
                  Connect with your mental health care providers through secure messaging.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
