import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const InterpreCoach = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow container mx-auto px-6 py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold">InterpreCoach</h1>
          <p className="mt-4 text-lg text-muted-foreground">Your real-time AI assistant for medical interpretation.</p>
        </div>

        <div className="max-w-4xl mx-auto mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center">
              {/* Placeholder for an image or illustration */}
              <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                <p className="text-muted-foreground">InterpreCoach in action</p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold">Your AI Companion in Live Sessions</h2>
              <p className="mt-4 text-muted-foreground">
                InterpreCoach is a browser extension that provides real-time assistance during your interpretation sessions. Get access to advanced terminology management, voice training, and key insights.
              </p>
              <ul className="mt-6 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-primary">✔</span>
                  <span>Advanced Terminology Management with images.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✔</span>
                  <span>Acoustic & Voice Training.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✔</span>
                  <span>Key Insights & Summarization.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✔</span>
                  <span>Predictive Assistance.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto mt-16">
          <h2 className="text-2xl font-bold text-center">Join the Waitlist</h2>
          <p className="text-center text-muted-foreground mt-2">Be the first to experience InterpreCoach.</p>
          <form className="space-y-4 mt-6">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="John Doe" />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="john.doe@example.com" />
            </div>
            <Button type="submit" className="w-full">Join the Waitlist</Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InterpreCoach;
