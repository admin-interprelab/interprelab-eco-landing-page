import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow container mx-auto px-6 py-24">
        <div className="max-w-sm mx-auto mt-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Sign In</h1>
            <p className="mt-4 text-muted-foreground">Access your InterpreLab account.</p>
          </div>
          <form className="space-y-4 mt-6">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="john.doe@example.com" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="********" />
            </div>
            <Button type="submit" className="w-full">Sign In</Button>
          </form>
          <div className="text-center mt-4 text-sm">
            <p>Don't have an account? <Link to="#" className="text-primary">Sign Up</Link></p>
            <p><Link to="#" className="text-primary">Forgot your password?</Link></p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;
