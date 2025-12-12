import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Careers = () => {
  const jobOpenings = [
    { title: "Senior Frontend Engineer", location: "Houston, TX (Remote)", department: "Engineering" },
    { title: "AI/ML Engineer", location: "Houston, TX (Remote)", department: "Engineering" },
    { title: "Product Manager", location: "Houston, TX (Remote)", department: "Product" },
    { title: "UX/UI Designer", location: "Houston, TX (Remote)", department: "Design" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow container mx-auto px-6 py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Careers</h1>
          <p className="mt-4 text-lg text-muted-foreground">Join our team and help us revolutionize the world of interpretation.</p>
        </div>

        <div className="max-w-4xl mx-auto mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {jobOpenings.map((job) => (
              <Card key={job.title}>
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{job.location} | {job.department}</p>
                  <Button className="mt-4">Apply Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
