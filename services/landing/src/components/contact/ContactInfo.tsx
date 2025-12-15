import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/lib/ui";
import { contactInfo, quickResponseInfo } from "@/data/contact";

export const ContactInfo = () => {
  return (
    <div className="space-y-6">
      <Card className="glass border-border/50 animate-fade-in-up stagger-1">
        <CardHeader>
          <CardTitle className="font-serif text-xl text-foreground">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {contactInfo.map((info, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-10 h-10 bg-nobel-gold/10 rounded-full flex items-center justify-center flex-shrink-0 border border-nobel-gold/20">
                <info.icon className="w-5 h-5 text-nobel-gold" />
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">{info.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {info.lines.map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < info.lines.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="glass border-border/50 bg-nobel-gold/5 animate-fade-in-up stagger-2">
        <CardHeader>
          <CardTitle className="font-serif text-xl text-foreground">Quick Response</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {quickResponseInfo.text}
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-2 bg-nobel-gold/10 text-nobel-gold border border-nobel-gold/20 rounded-full text-sm font-medium">
            Average response time: {quickResponseInfo.averageTime}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
