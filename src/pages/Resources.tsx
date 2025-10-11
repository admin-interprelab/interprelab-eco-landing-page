import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Video, FileText, Users, ExternalLink, Download, Calendar, Star } from "lucide-react";

const Resources = () => {
  const resources = [
    {
      title: "Interpretation Techniques Masterclass",
      description: "Advanced techniques for simultaneous and consecutive interpretation",
      type: "Video Course",
      duration: "4 hours",
      level: "Advanced",
      icon: Video,
      featured: true
    },
    {
      title: "Medical Terminology Guide",
      description: "Comprehensive guide to medical interpretation terminology",
      type: "PDF Guide",
      pages: "120 pages",
      level: "Intermediate",
      icon: FileText,
      featured: false
    },
    {
      title: "Legal Interpretation Handbook",
      description: "Essential guide for court and legal interpretation",
      type: "eBook",
      pages: "85 pages",
      level: "Intermediate",
      icon: BookOpen,
      featured: false
    },
    {
      title: "Community of Practice Webinars",
      description: "Monthly webinars with industry experts and peers",
      type: "Live Session",
      duration: "1 hour",
      level: "All Levels",
      icon: Users,
      featured: true
    }
  ];

  const externalResources = [
    {
      title: "National Board of Certification for Medical Interpreters",
      description: "Official certification body for medical interpreters",
      url: "https://www.certifiedmedicalinterpreters.org/",
      organization: "NBCMI"
    },
    {
      title: "Certification Commission for Healthcare Interpreters",
      description: "Professional certification for healthcare interpreters",
      url: "https://www.cchipeaks.org/",
      organization: "CCHI"
    },
    {
      title: "International Association of Conference Interpreters",
      description: "Global professional association for conference interpreters",
      url: "https://aiic.org/",
      organization: "AIIC"
    },
    {
      title: "Registry of Interpreters for the Deaf",
      description: "Professional organization for ASL interpreters",
      url: "https://www.rid.org/",
      organization: "RID"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6 text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            Professional Development
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            Resources & Training
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Access comprehensive training materials, industry resources, and professional 
            development tools to advance your interpretation career.
          </p>
          <Button size="lg" className="glass-button">
            <BookOpen className="w-5 h-5 mr-2" />
            Explore Resources
          </Button>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Featured Training Materials
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Curated content designed by industry experts to enhance your 
              interpretation skills and professional knowledge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resources.map((resource, index) => (
              <Card 
                key={index} 
                className={`glass border-border/50 hover:border-primary/50 transition-all duration-300 ${
                  resource.featured ? 'ring-2 ring-primary/20' : ''
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <resource.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <Badge variant={resource.featured ? "default" : "secondary"} className="mb-2">
                          {resource.type}
                        </Badge>
                        {resource.featured && (
                          <Badge className="ml-2 bg-amber-500/10 text-amber-500 border-amber-500/20">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{resource.title}</CardTitle>
                  <CardDescription className="text-base">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{resource.duration || resource.pages}</span>
                      <span>•</span>
                      <span>{resource.level}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Access
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Industry Organizations & Certifications
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with professional organizations and pursue industry-recognized 
              certifications to advance your career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {externalResources.map((resource, index) => (
              <Card key={index} className="glass border-border/50 hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{resource.organization}</Badge>
                    <ExternalLink className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <CardDescription>
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full justify-start p-0" asChild>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      Visit Website
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="glass rounded-2xl p-12 text-center border border-border/50">
            <Calendar className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get the latest resources, industry insights, and training materials 
              delivered to your inbox monthly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button size="lg">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Resources;
