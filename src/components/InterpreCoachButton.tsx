import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Chrome } from "lucide-react";
import { ExtensionUI } from "./ExtensionUI";

export const InterpreCoachButton = () => {
  const [showExtension, setShowExtension] = useState(false);

  return (
    <>
      <div className="fixed top-20 right-6 z-40">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowExtension(!showExtension)}
          className="bg-card/95 backdrop-blur-sm border-success/50 text-success hover:bg-success/10"
        >
          <Chrome className="w-4 h-4 mr-2" />
          InterpreCoach Demo
        </Button>
      </div>
      
      {showExtension && <ExtensionUI />}
    </>
  );
};