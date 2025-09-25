import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const InterpreBot = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow container mx-auto px-6 py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold">InterpreBot</h1>
          <p className="mt-4 text-lg text-muted-foreground">AI-driven training and real-time assistance for medical interpreters.</p>
        </div>

        <div className="max-w-4xl mx-auto mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold">Hone Your Skills with AI</h2>
              <p className="mt-4 text-muted-foreground">
                InterpreBot provides realistic, interactive linguistic assessments to evaluate and hone your core skills. Our deep grammatical and contextual analysis helps you identify areas for improvement.
              </p>
              <ul className="mt-6 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-primary">✔</span>
                  <span>Deep analysis of linguistic accuracy and terminology.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✔</span>
                  <span>Grammatical correctness (tense, syntax).</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✔</span>
                  <span>Detailed performance dashboard.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✔</span>
                  <span>Customized Learning Paths.</span>
                </li>
              </ul>
            </div>
            <div className="text-center">
              {/* Placeholder for an image or illustration */}
              <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                <p className="text-muted-foreground">InterpreBot in action</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <Button size="lg" asChild>
            <Link to="/signin">Take the Assessment</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InterpreBot;
