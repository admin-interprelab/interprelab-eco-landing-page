import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Search, Plus, MessageCircle, Heart, Share2, MoreHorizontal,
  Users, BookOpen, HelpCircle, Briefcase, Network, Video,
  Image as ImageIcon, Send, Bookmark, TrendingUp
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface SidebarItem {
  icon: any;
  label: string;
  active?: boolean;
  badge?: string;
  badgeColor?: string;
}

export default function InterpreLink() {
  const [searchQuery, setSearchQuery] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  const sidebarSections = [
    {
      title: "FEED",
      items: [
        { icon: TrendingUp, label: "Trending", active: true },
        { icon: Users, label: "Following" },
        { icon: Bookmark, label: "Saved Posts" },
      ] as SidebarItem[]
    },
    {
      title: "TOPICS",
      items: [
        { icon: MessageCircle, label: "All Discussions" },
        { icon: Users, label: "Day-to-Day Stories" },
        { icon: BookOpen, label: "Best Practices" },
        { icon: BookOpen, label: "Terminology Tips" },
        { icon: HelpCircle, label: "Ask the Community" },
        { icon: Video, label: "Reels & Videos" }
      ] as SidebarItem[]
    },
    {
      title: "OPPORTUNITIES",
      items: [
        { icon: Network, label: "InterpreLinks", badge: "3", badgeColor: "bg-destructive" },
        { icon: Briefcase, label: "Jobs Board" }
      ] as SidebarItem[]
    }
  ];

  const posts = [
    {
      id: 1,
      author: "Maria Rodriguez",
      role: "Medical Interpreter - CMI",
      avatar: "MR",
      avatarColor: "bg-blue-500",
      timeAgo: "2 hours ago",
      content: "Just wrapped up the most challenging ER shift of my career. A patient came in with chest pain, and the medical team was moving FAST. I had to interpret complex cardiac terminology while keeping up with the urgency. Moments like these remind me why we do what we do - we're literally the bridge between life-saving care and understanding. 💙 #MedicalInterpreting #ERLife",
      likes: 24,
      comments: 8,
      shares: 3,
      type: "text",
      tags: ["Medical", "Emergency"]
    },
    {
      id: 2,
      author: "James Chen",
      role: "Legal Interpreter",
      avatar: "JC",
      avatarColor: "bg-purple-500",
      timeAgo: "5 hours ago",
      content: "Quick tip for fellow interpreters: I created a color-coded system for my terminology flashcards. Red for urgent/emergency terms, blue for routine medical, green for legal, yellow for technical. Game changer for quick reference! 📚✨",
      likes: 45,
      comments: 12,
      shares: 18,
      type: "text",
      tags: ["Tips", "Terminology"],
      image: "/placeholder-flashcards.jpg"
    },
    {
      id: 3,
      author: "Sofia Martinez",
      role: "Community Interpreter",
      avatar: "SM",
      avatarColor: "bg-pink-500",
      timeAgo: "1 day ago",
      content: "New reel: 'When the doctor uses 5 medical terms in one sentence' 😅 Check out my latest video on handling rapid-fire terminology!",
      likes: 156,
      comments: 34,
      shares: 67,
      type: "reel",
      tags: ["Humor", "Reels"],
      videoThumbnail: "/placeholder-reel.jpg"
    }
  ];

  const reels = [
    {
      id: 1,
      author: "Alex Thompson",
      avatar: "AT",
      title: "Day in the life: Hospital Interpreter",
      views: "2.3K",
      thumbnail: "/placeholder-reel1.jpg"
    },
    {
      id: 2,
      author: "Nina Patel",
      avatar: "NP",
      title: "5 phrases every interpreter should know",
      views: "5.1K",
      thumbnail: "/placeholder-reel2.jpg"
    },
    {
      id: 3,
      author: "Carlos Ruiz",
      avatar: "CR",
      title: "Handling difficult terminology on the spot",
      views: "3.8K",
      thumbnail: "/placeholder-reel3.jpg"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-72 bg-card border-r min-h-screen p-6 sticky top-0">
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                InterpreLink
              </h1>
              <p className="text-sm text-muted-foreground">Connect. Share. Grow.</p>
            </div>

            <div className="space-y-8">
              {sidebarSections.map((section, index) => (
                <div key={index}>
                  <h3 className="text-xs font-semibold text-muted-foreground mb-4 tracking-wider">
                    {section.title}
                  </h3>
                  <div className="space-y-1">
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                          item.active
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-accent"
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
          <div className="flex-1 p-8 max-w-4xl">
            {/* Header */}
            <div className="mb-8">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
                Addressing Pain Point #5: Professional Community & Support
              </Badge>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold mb-2">InterpreLink: Your Professional Network</h1>
                  <p className="text-muted-foreground mb-4">
                    We're working interpreters who understand the need for real connection, not just another social media clone. InterpreLink is where you find partnerships, share the emotional weight, and build the professional relationships that sustain your career and mental health.
                  </p>
                  <div className="glass p-4 rounded-lg max-w-2xl">
                    <p className="text-sm text-muted-foreground">
                      🤝 <strong>More than networking:</strong> This is where collaborations are born, where you find your next referral partner, and where InterpreLab connects with interpreters to broaden our reach together.
                    </p>
                  </div>
                </div>
                <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Create Post
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create a New Post</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Textarea
                        placeholder="Share your experience, tips, or thoughts with the community..."
                        className="min-h-[150px]"
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                      />
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <ImageIcon className="w-4 h-4 mr-2" />
                          Add Image
                        </Button>
                        <Button variant="outline" size="sm">
                          <Video className="w-4 h-4 mr-2" />
                          Add Video/Reel
                        </Button>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsCreatePostOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => {
                          // Handle post creation
                          setIsCreatePostOpen(false);
                          setNewPostContent("");
                        }}>
                          <Send className="w-4 h-4 mr-2" />
                          Post
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search posts, people, or topics..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="feed" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="feed">Feed</TabsTrigger>
                <TabsTrigger value="reels">Reels</TabsTrigger>
                <TabsTrigger value="discussions">Discussions</TabsTrigger>
              </TabsList>

              <TabsContent value="feed" className="space-y-6">
                {posts.map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className={post.avatarColor}>
                            {post.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold">{post.author}</h3>
                              <p className="text-sm text-muted-foreground">{post.role}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">{post.timeAgo}</span>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-foreground leading-relaxed">{post.content}</p>

                      {post.type === "reel" && (
                        <div className="relative aspect-video bg-muted rounded-lg flex items-center justify-center">
                          <Video className="w-16 h-16 text-muted-foreground" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Button size="lg" className="rounded-full">
                              <Video className="w-6 h-6 mr-2" />
                              Watch Reel
                            </Button>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-6">
                          <Button variant="ghost" size="sm" className="flex items-center gap-2">
                            <Heart className="w-4 h-4" />
                            <span>{post.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-2">
                            <MessageCircle className="w-4 h-4" />
                            <span>{post.comments}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-2">
                            <Share2 className="w-4 h-4" />
                            <span>{post.shares}</span>
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="reels" className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  {reels.map((reel) => (
                    <Card key={reel.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                      <div className="relative aspect-[9/16] bg-muted rounded-t-lg flex items-center justify-center">
                        <Video className="w-12 h-12 text-muted-foreground" />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs">{reel.avatar}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{reel.author}</span>
                        </div>
                        <p className="text-sm text-foreground mb-2">{reel.title}</p>
                        <p className="text-xs text-muted-foreground">{reel.views} views</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="discussions" className="space-y-6">
                <Card>
                  <CardContent className="p-8 text-center">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">Start a Discussion</h3>
                    <p className="text-muted-foreground mb-4">
                      Ask questions, share insights, or start a conversation with the community
                    </p>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      New Discussion
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar - Trending & Suggestions */}
          <div className="w-80 p-6 border-l sticky top-0 h-screen overflow-y-auto">
            {/* Mission Card */}
            <Card className="mb-6 glass border-primary/20">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold text-lg">InterpreLab: A Lifeline for Interpreters</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We're working interpreters building solutions for the pain points we live every day. Want to collaborate, discuss partnerships, or help us reach more interpreters? Let's connect.
                </p>
                <Link to="/contact">
                  <Button className="w-full" variant="hero">
                    Get In Touch
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="mb-6">
              <CardHeader>
                <h3 className="font-semibold">Trending Topics</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {["#MedicalTerminology", "#InterpreterLife", "#BestPractices", "#ERStories"].map((tag, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">{tag}</span>
                    <span className="text-xs text-muted-foreground">{Math.floor(Math.random() * 100)}+ posts</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="font-semibold">Suggested InterpreLinks</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Dr. Lisa Wong", role: "Hospital Coordinator", avatar: "LW" },
                  { name: "Miguel Santos", role: "Legal Interpreter", avatar: "MS" },
                  { name: "Emma Johnson", role: "Community Interpreter", avatar: "EJ" }
                ].map((person, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>{person.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{person.name}</p>
                        <p className="text-xs text-muted-foreground">{person.role}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Connect</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
