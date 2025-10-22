import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus, MessageCircle, Heart, Share, MoreHorizontal, Users, BookOpen, HelpCircle, Briefcase, Network } from "lucide-react";
import { useState } from "react";

export default function InterpreHub() {
  const [searchQuery, setSearchQuery] = useState("");

  const discussions = [
    {
      id: 1,
      author: "Ana Silva",
      role: "Hospital Interpreter - CMI",
      avatar: "AS",
      avatarColor: "bg-primary",
      timeAgo: "2 hours ago",
      title: "Handling complex terminology on the fly?",
      content: "Just had a challenging session involving rare genetic disorders during a telehealth consult. The terminology was intense! How do you all prepare for or handle unexpected, highly specialized terms during a live interpretation? Any favorite quick-reference tools or techniques, especially when remote? My online glossary helps, but speed is crucial.",
      likes: 3,
      replies: 0,
      category: "Best Practices"
    },
    {
      id: 2,
      author: "Ben Carter",
      role: "ER Interpreter",
      avatar: "BC",
      avatarColor: "bg-success",
      timeAgo: "1 hour ago",
      title: "",
      content: "Great question, Ana! Happens all the time in the ER. For those moments, I sometimes use a 'placeholder' technique if the context allows. I'll interpret the concept generally (\"a condition affecting the blood\") and make a note to clarify or look up the precise term (like 'thrombocytopenia') immediately after for documentation or follow-up. Building specialty-specific glossaries beforehand is a lifesaver too.",
      likes: 5,
      replies: 0,
      isReply: true,
      category: "Best Practices"
    },
    {
      id: 3,
      author: "Chloe Garcia",
      role: "Oncology Interpreter",
      avatar: "CG",
      avatarColor: "bg-warning",
      timeAgo: "45 minutes ago",
      title: "",
      content: "Adding to Ben's point - requesting clarification is often the *best* practice in medical settings",
      likes: 0,
      replies: 0,
      isReply: true,
      category: "Best Practices"
    }
  ];

  const sidebarSections = [
    {
      title: "TOPICS",
      items: [
        { icon: MessageCircle, label: "All Discussions", active: true },
        { icon: Users, label: "Day-to-Day Spot" },
        { icon: BookOpen, label: "Best Practices" },
        { icon: BookOpen, label: "Terminology & Glossaries" },
        { icon: HelpCircle, label: "Ask the Community" },
        { icon: Users, label: "Professional Development" }
      ]
    },
    {
      title: "OPPORTUNITIES",
      items: [
        { icon: Network, label: "Networking Requests", badge: "3", badgeColor: "bg-destructive" },
        { icon: Briefcase, label: "Jobs Board" }
      ]
    }
  ];

  return (
    <Layout showInterpreBot={false}>
      <div className="min-h-screen bg-background">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-72 bg-primary text-primary-foreground min-h-screen p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-2">InterpreLab Hub</h1>
            </div>

            <div className="space-y-8">
              {sidebarSections.map((section, index) => (
                <div key={index}>
                  <h3 className="text-sm font-semibold text-primary-foreground/70 mb-4 tracking-wider">
                    {section.title}
                  </h3>
                  <div className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                          item.active
                            ? "bg-primary-foreground/10 text-primary-foreground"
                            : "text-primary-foreground/80 hover:bg-primary-foreground/5 hover:text-primary-foreground"
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="text-sm font-medium flex-1">{item.label}</span>
                        {item.badge && (
                          <Badge variant="destructive" className="text-xs px-2 py-0.5">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">Medical Interpreters' Hub</h1>
                <p className="text-xl text-muted-foreground mb-6">
                  Connect, share challenges, and discuss best practices in medical interpreting.
                </p>

                {/* Search and New Discussion */}
                <div className="flex gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search discussions..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="default" className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    New Discussion
                  </Button>
                </div>
              </div>

              {/* Discussions */}
              <div className="space-y-6">
                {discussions.map((discussion) => (
                  <Card key={discussion.id} className={`${discussion.isReply ? "ml-12" : ""}`}>
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className={discussion.avatarColor}>
                            {discussion.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{discussion.author}</h3>
                            <span className="text-sm text-muted-foreground">
                              ({discussion.role})
                            </span>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">
                              {discussion.timeAgo}
                            </span>
                          </div>
                          {discussion.title && (
                            <h2 className="text-lg font-semibold mb-3">{discussion.title}</h2>
                          )}
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground mb-4 leading-relaxed">
                        {discussion.content}
                      </p>
                      <div className="flex items-center gap-6">
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                          Reply
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                          <Heart className="w-4 h-4" />
                          Like ({discussion.likes})
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                          <Share className="w-4 h-4" />
                          Share
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}