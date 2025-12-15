import React, { useState } from 'react';
import { Button } from "@/lib/ui/components/ui/button";
import { Input } from "@/lib/ui/components/ui/input";
import { Textarea } from "@/lib/ui/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/lib/ui/components/ui/card";
import { Avatar, AvatarFallback } from "@/lib/ui/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/lib/ui/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/lib/ui/components/ui/dialog";
import {
  Search, Plus, MessageCircle, Heart, Share2, MoreHorizontal,
  Video, Image as ImageIcon, Send, Bookmark
} from "lucide-react";
import { PainPointBadge } from "@/components/PainPointBadge";
import { Badge } from "@/lib/ui/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { formatDistanceToNow } from "date-fns";
import { reels } from "@/data/interpreLink";

interface Post {
  id: string;
  content: string;
  created_at: string;
  media_url?: string;
  media_type?: string;
  tags?: string[];
  user_id: string;
}

export const LinkFeed = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [newPostContent, setNewPostContent] = useState("");
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
    const { user } = useAuth();
    const queryClient = useQueryClient();

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

    return (
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
    );
};
