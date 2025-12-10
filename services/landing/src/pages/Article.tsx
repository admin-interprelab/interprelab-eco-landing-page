import { useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Share2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for articles - in a real app this would come from an API/CMS
const articles = {
  "understanding-vicarious-trauma": {
    title: "Understanding Vicarious Trauma in Healthcare Interpretation",
    subtitle: "How indirect exposure to trauma affects medical interpreters and strategies for coping.",
    date: "January 15, 2024",
    readTime: "8 min read",
    category: "Mental Health",
    content: `
      <p class="mb-6 text-lg leading-relaxed text-muted-foreground">
        Medical interpreters serve as the voice for patients during some of their most vulnerable moments.
        While essential for equitable care, this role comes with a hidden cost: vicarious trauma.
      </p>

      <h2 class="text-2xl font-bold mb-4 mt-8">What is Vicarious Trauma?</h2>
      <p class="mb-4 text-muted-foreground">
        Vicarious trauma, also known as secondary traumatic stress, is the emotional residue of exposure
        to traumatic stories and experiences of others through work. For interpreters, who must speak in
        the first person ("I am in pain," "I was assaulted"), the psychological impact can be particularly intense.
      </p>

      <h2 class="text-2xl font-bold mb-4 mt-8">Signs and Symptoms</h2>
      <ul class="list-disc pl-6 mb-6 text-muted-foreground space-y-2">
        <li>Persistent intrusive thoughts about a patient's story</li>
        <li>Emotional numbness or hypersensitivity</li>
        <li>Sleep disturbances or nightmares</li>
        <li>Increased irritability or anxiety</li>
        <li>Loss of hope or cynical worldview</li>
      </ul>

      <h2 class="text-2xl font-bold mb-4 mt-8">Strategies for Coping</h2>
      <p class="mb-4 text-muted-foreground">
        Recognizing the signs is the first step. Interpreters can protect their mental health by:
      </p>
      <ul class="list-disc pl-6 mb-6 text-muted-foreground space-y-2">
        <li>Engaging in regular debriefing sessions</li>
        <li>Practicing grounding techniques between calls</li>
        <li>Maintaining strict professional boundaries</li>
        <li>Prioritizing self-care and time away from work</li>
      </ul>
    `
  },
  "quality-matters": {
    title: "The $71M Question: Why Medical Interpretation Quality Matters",
    subtitle: "Examining the financial and human costs of poor interpretation in healthcare settings.",
    date: "January 10, 2024",
    readTime: "12 min read",
    category: "Industry Analysis",
    content: `
      <p class="mb-6 text-lg leading-relaxed text-muted-foreground">
        The cost of errors in medical interpretation goes far beyond financial metrics—it measures in human lives.
      </p>
    `
  },
  // Add other articles as needed or handle 'not found'
};

const Article = () => {
  const { slug } = useParams();
  const article = articles[slug as keyof typeof articles];

  if (!article) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you are looking for does not exist.</p>
          <Link to="/resources">
            <Button>Return to Resources</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="min-h-screen pb-20">
        {/* Article Hero */}
        <div className="bg-gradient-subtle py-20 border-b border-border/50">
          <div className="container mx-auto px-6 max-w-4xl">
            <Link to="/resources/industry-insights" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Insights
            </Link>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Badge variant="secondary">{article.category}</Badge>
                <span className="text-sm text-muted-foreground flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {article.date}
                </span>
                <span className="text-sm text-muted-foreground flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {article.readTime}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {article.title}
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                {article.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-6 max-w-3xl py-12">
          <div
            className="prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="mt-16 pt-8 border-t border-border flex justify-between items-center">
            <div className="text-muted-foreground">
              Share this article:
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => navigator.clipboard.writeText(window.location.href)}>
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default Article;
