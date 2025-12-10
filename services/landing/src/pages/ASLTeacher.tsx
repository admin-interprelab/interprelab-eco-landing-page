import { Layout } from "@/components/Layout";
import SignDetection from "@/components/SignDetection";
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const signsToPractice = ['A', 'B', 'C', 'L', 'Y'];

const ASLTeacher = () => {
  const { user } = useAuth();
  const [currentTargetSign, setCurrentTargetSign] = useState('A');
  const [isCorrect, setIsCorrect] = useState(false);
  const [detectedSign, setDetectedSign] = useState<string | null>(null);

  const saveProgress = async (sign: string) => {
    if (!user) return;

    try {
      // Check if record exists
      const { data: existingData } = await supabase
        .from('asl_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('sign_letter', sign)
        .maybeSingle();

      if (existingData) {
        // Update
        await supabase
          .from('asl_progress')
          .update({
            attempts: (existingData.attempts || 0) + 1,
            success_count: (existingData.success_count || 0) + 1,
            last_practiced: new Date().toISOString(),
          })
          .eq('id', existingData.id);
      } else {
        // Insert
        await supabase
          .from('asl_progress')
          .insert({
            user_id: user.id,
            sign_letter: sign,
            attempts: 1,
            success_count: 1,
          });
      }
      toast.success(`Progress saved for sign ${sign}!`);
    } catch (error) {
      console.error('Error saving ASL progress:', error);
      toast.error("Failed to save progress.");
    }
  };

  useEffect(() => {
    if (detectedSign && detectedSign === currentTargetSign) {
      setIsCorrect(true);
      saveProgress(currentTargetSign);
      setTimeout(() => {
        const nextSignIndex = (signsToPractice.indexOf(currentTargetSign) + 1) % signsToPractice.length;
        setCurrentTargetSign(signsToPractice[nextSignIndex]);
        setIsCorrect(false);
        setDetectedSign(null);
      }, 2000);
    }
  }, [detectedSign, currentTargetSign]);

  return (
    <Layout>
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">ASL Teacher</h1>
        <p className="text-muted-foreground mb-8">
          Try to make the sign for the letter shown below.
        </p>
        <div className="text-6xl font-bold mb-8">{currentTargetSign}</div>
        <div className="flex justify-center">
          <div className="w-full max-w-2xl border rounded-lg p-4 relative">
            <SignDetection onSignDetected={setDetectedSign} />
            {isCorrect && (
              <div className="absolute inset-0 bg-green-500/50 flex items-center justify-center rounded-lg backdrop-blur-sm">
                <p className="text-white text-4xl font-bold animate-bounce">Correct!</p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-8 text-sm text-muted-foreground">
            Current Detection: {detectedSign || "None"}
        </div>
      </div>
    </Layout>
  );
};

export default ASLTeacher;
