import React from 'react';
import { Button } from "@/lib/ui/components/ui/button";
import { Card, CardContent, CardHeader } from "@/lib/ui/components/ui/card";
import { Avatar, AvatarFallback } from "@/lib/ui/components/ui/avatar";
import { Link } from "react-router-dom";
import { trendingTopics, suggestedConnections } from "@/data/interpreLink";

export const LinkRightSidebar = () => {
    return (
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
                {trendingTopics.map((tag, index) => (
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
                {suggestedConnections.map((person, index) => (
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
    );
};
