// src/pages/ASLTeacher.tsx
import { Layout } from "@/components/Layout";
import SignDetection from "@/components/SignDetection";
import React, { useState, useEffect } from "react";

const signsToPractice = ['A', 'B', 'C', 'L', 'Y'];

const ASLTeacher = () => {
  const [currentTargetSign, setCurrentTargetSign] = useState('A');
  const [isCorrect, setIsCorrect] = useState(false);
  const [detectedSign, setDetectedSign] = useState<string | null>(null);

  useEffect(() => {
    if (detectedSign && detectedSign === currentTargetSign) {
      setIsCorrect(true);
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
              <div className="absolute inset-0 bg-green-500 bg-opacity-50 flex items-center justify-center">
                <p className="text-white text-4xl font-bold">Correct!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ASLTeacher;