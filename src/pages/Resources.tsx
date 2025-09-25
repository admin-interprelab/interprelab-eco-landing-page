import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Resources = () => {
  const resources = [
    { title: "National Board of Certification for Medical Interpreters (NBCMI)", href: "https://www.certifiedmedicalinterpreters.org/" },
    { title: "Certification Commission for Healthcare Interpreters (CCHI)", href: "https://cchicertification.org/" },
    { title: "American Translators Association (ATA)", href: "https://www.atanet.org/" },
    { title: "International Medical Interpreters Association (IMIA)", href: "https://www.imiaweb.org/" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow container mx-auto px-6 py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Resources</h1>
          <p className="mt-4 text-lg text-muted-foreground">A curated library of resources for medical interpreters.</p>
        </div>

        <div className="max-w-4xl mx-auto mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Certification-Ready Training Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our 40 to 60-hour Healthcare Medical Interpreter Training Courses are approved by NBCMI and CCHI as prerequisite courses for their written certification exams.
                </p>
                <a href="#" className="text-primary font-bold mt-4 inline-block">Learn More</a>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Interpreter Community & Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Join our dedicated social web application and professional network for interpreters. Access community forums, job boards, and a curated library of resources.
                </p>
                <a href="#" className="text-primary font-bold mt-4 inline-block">Join InterpreLinks</a>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center">External Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {resources.map((resource) => (
              <a href={resource.href} target="_blank" rel="noopener noreferrer" key={resource.title} className="block p-6 bg-card rounded-lg hover:bg-muted">
                <h3 className="text-lg font-bold">{resource.title}</h3>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
