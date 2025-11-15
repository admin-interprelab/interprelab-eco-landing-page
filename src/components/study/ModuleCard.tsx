import React from 'react';
import { Module } from '@/types/study';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

interface ModuleCardProps {
  module: Module;
  onComplete: (moduleId: string) => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, onComplete }) => {
  return (
    <Card className={`bg-white/10 backdrop-blur-md border border-white/20 shadow-xl ${module.completed ? 'opacity-60' : ''}`}>
      <CardHeader>
        <CardTitle className="text-white">{module.title}</CardTitle>
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>{module.duration}</span>
          <Badge variant={
            module.difficulty === 'Beginner' ? 'default' :
            module.difficulty === 'Intermediate' ? 'secondary' :
            'destructive'
          }>{module.difficulty}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-blue-200">{module.description}</p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => onComplete(module.id)}
          disabled={module.completed}
          className="w-full"
        >
          {module.completed ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Completed
            </>
          ) : (
            'Mark as Complete'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
