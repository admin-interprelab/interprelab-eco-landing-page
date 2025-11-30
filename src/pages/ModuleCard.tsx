import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle } from 'lucide-react';
import { Module } from '@/types/study';

interface ModuleCardProps {
  module: Module;
  onComplete: (id: string) => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, onComplete }) => (
  <Card className="h-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg text-white">{module.title}</CardTitle>
        {module.completed && (
          <CheckCircle className="h-5 w-5 text-green-400" />
        )}
      </div>
      <CardDescription className="text-blue-200">{module.description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex items-center gap-4 mb-4">
        <Badge variant="outline" className="flex items-center gap-1 border-white/30 text-white">
          <Clock className="h-3 w-3" />
          {module.duration}
        </Badge>
        <Badge variant={module.difficulty === 'Beginner' ? 'default' : module.difficulty === 'Intermediate' ? 'secondary' : 'destructive'} className="text-white">
          {module.difficulty}
        </Badge>
      </div>
      <Button onClick={() => onComplete(module.id)} disabled={module.completed} className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm">
        {module.completed ? 'Completed' : 'Start Module'}
      </Button>
    </CardContent>
  </Card>
);
