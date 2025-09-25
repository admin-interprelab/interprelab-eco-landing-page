import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow container mx-auto px-6 py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="mt-4 text-lg text-muted-foreground">Learn more about the team and mission behind InterpreLab.</p>
        </div>

        <div className="max-w-4xl mx-auto mt-16">
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold">Our Mission</h2>
              <p className="mt-4 text-muted-foreground">
                InterpreLab is a cutting-edge, AI-driven training and real-time assistance platform for medical interpreters, focused on human skill optimization and bridging critical communication gaps in healthcare.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold">Our Founder</h2>
              <p className="mt-4 text-muted-foreground">
                The founder is a seasoned expert in the medical interpreting field and an early adopter/developer of AI-driven, agentic technologies. The focus is on continuous innovation of backend AI services.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold">Our Team</h2>
              <p className="mt-4 text-muted-foreground">
                We are a passionate team of interpreters, engineers, and designers dedicated to empowering medical interpreters with the tools they need to excel.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
