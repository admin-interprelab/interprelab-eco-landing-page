import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LucideIcon } from "lucide-react";
import {
  Search, Plus, MessageCircle, Heart, Share2, MoreHorizontal,
  Users, BookOpen, HelpCircle, Briefcase, Network, Video,
  Image as ImageIcon, Send, Bookmark, TrendingUp
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PainPointBadge } from "@/components/PainPointBadge";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { formatDistanceToNow } from "date-fns";

interface SidebarItem {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  badge?: string;
  badgeColor?: string;
}

interface Post {
  id: string;
  content: string;
  created_at: string;
  media_url?: string;
  media_type?: string;
  tags?: string[];
  user_id: string;
}

export default function InterpreLink() {
  const [searchQuery, setSearchQuery] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const { user } = useAuth();
  const queryClient = useQueryClient();

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

  // Fetch posts
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Post[];
    }
  });

  // Create post mutation
  const createPostMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!user) throw new Error("Must be logged in");

      const { error } = await supabase
        .from('posts')
        .insert({
          content,
          user_id: user.id
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setIsCreatePostOpen(false);
      setNewPostContent("");
      toast.success("Post created successfully!");
    },
    onError: (error) => {
      toast.error("Failed to create post: " + error.message);
    }
  });

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;
    createPostMutation.mutate(newPostContent);
  };

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
          <div className="w-72 bg-card border-r min-h-screen p-6 sticky top-0 hidden lg:block">
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
          <div className="flex-1 p-4 md:p-8 max-w-4xl">
            {/* Header */}
            <div className="mb-8">
              <PainPointBadge 
                painPoint="Addressing Pain Point #5: Professional Community & Support" 
                className="mb-6 bg-primary/10 text-primary border-primary/20"
              />
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">InterpreLink</h1>
                  <p className="text-muted-foreground mb-4">
                    Your professional network for connection and support.
                  </p>
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
                        <Button onClick={handleCreatePost} disabled={createPostMutation.isPending}>
                          {createPostMutation.isPending ? "Posting..." : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Post
                            </>
                          )}
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
                {isLoading ? (
                  <div className="text-center py-8 text-muted-foreground">Loading posts...</div>
                ) : posts?.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No posts yet. Be the first to share!</div>
                ) : (
                  posts?.map((post) => (
                    <Card key={post.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-semibold">User</h3>
                                <p className="text-sm text-muted-foreground">Interpreter</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">
                                  {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                                </span>
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

                        {post.tags && (
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex items-center gap-6">
                            <Button variant="ghost" size="sm" className="flex items-center gap-2">
                              <Heart className="w-4 h-4" />
                              <span>0</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="flex items-center gap-2">
                              <MessageCircle className="w-4 h-4" />
                              <span>0</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="flex items-center gap-2">
                              <Share2 className="w-4 h-4" />
                              <span>0</span>
                            </Button>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Bookmark className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="reels" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          <div className="w-80 p-6 border-l sticky top-0 h-screen overflow-y-auto hidden xl:block">
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
