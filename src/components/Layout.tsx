import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { InterpreBotUI } from "@/components/ExtensionUI";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  showInterpreBot?: boolean;
}

export const Layout = ({ children, showInterpreBot = true }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        {children}
      </main>
      <Footer />
      
      {/* InterpreBot - AI Assessment (Available site-wide) */}
      {showInterpreBot && <InterpreBotUI />}
    </div>
  );
};