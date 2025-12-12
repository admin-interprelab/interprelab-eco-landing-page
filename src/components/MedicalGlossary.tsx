import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, BookOpen, Heart, Brain, Bone, Eye } from 'lucide-react';

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  pronunciation?: string;
  category: 'anatomy' | 'cardiology' | 'neurology' | 'orthopedics' | 'ophthalmology' | 'general';
  difficulty: 'basic' | 'intermediate' | 'advanced';
  examples?: string[];
}

const MedicalGlossary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const glossaryTerms: GlossaryTerm[] = [
    {
      id: '1',
      term: 'Myocardial Infarction',
      definition: 'Death of heart muscle due to insufficient blood supply, commonly known as a heart attack.',
      pronunciation: 'my-oh-KAR-dee-al in-FARK-shun',
      category: 'cardiology',
      difficulty: 'intermediate',
      examples: ['The patient suffered a myocardial infarction', 'MI symptoms include chest pain']
    },
    {
      id: '2',
      term: 'Cerebrovascular Accident',
      definition: 'A stroke; sudden loss of brain function due to loss of blood flow to the brain.',
      pronunciation: 'ser-EE-bro-VAS-kyuh-lar AK-si-dent',
      category: 'neurology',
      difficulty: 'advanced',
      examples: ['CVA patient requires immediate attention', 'Stroke rehabilitation after CVA']
    },
    {
      id: '3',
      term: 'Hypertension',
      definition: 'High blood pressure; persistently elevated arterial blood pressure.',
      pronunciation: 'hy-per-TEN-shun',
      category: 'cardiology',
      difficulty: 'basic',
      examples: ['Patient has chronic hypertension', 'Monitor blood pressure for hypertension']
    },
    {
      id: '4',
      term: 'Fracture',
      definition: 'A break in the continuity of a bone.',
      pronunciation: 'FRAK-chur',
      category: 'orthopedics',
      difficulty: 'basic',
      examples: ['Compound fracture of the femur', 'X-ray shows a hairline fracture']
    },
    {
      id: '5',
      term: 'Glaucoma',
      definition: 'A group of eye diseases that damage the optic nerve, often due to increased eye pressure.',
      pronunciation: 'glaw-KOH-mah',
      category: 'ophthalmology',
      difficulty: 'intermediate',
      examples: ['Regular screening for glaucoma', 'Glaucoma can cause vision loss']
    },
    {
      id: '6',
      term: 'Pneumonia',
      definition: 'Infection that inflames air sacs in one or both lungs.',
      pronunciation: 'noo-MOH-nyah',
      category: 'general',
      difficulty: 'basic',
      examples: ['Bacterial pneumonia treatment', 'Chest X-ray shows pneumonia']
    },
    {
      id: '7',
      term: 'Arthroscopy',
      definition: 'Minimally invasive surgical procedure to examine and treat joint problems.',
      pronunciation: 'ar-THROS-koh-pee',
      category: 'orthopedics',
      difficulty: 'advanced',
      examples: ['Knee arthroscopy procedure', 'Arthroscopic surgery recovery']
    },
    {
      id: '8',
      term: 'Electroencephalogram',
      definition: 'Test that measures electrical activity in the brain using electrodes.',
      pronunciation: 'ih-lek-troh-en-SEF-ah-loh-gram',
      category: 'neurology',
      difficulty: 'advanced',
      examples: ['EEG shows abnormal brain activity', 'Seizure diagnosis with EEG']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Categories', icon: BookOpen },
    { id: 'cardiology', label: 'Cardiology', icon: Heart },
    { id: 'neurology', label: 'Neurology', icon: Brain },
    { id: 'orthopedics', label: 'Orthopedics', icon: Bone },
    { id: 'ophthalmology', label: 'Ophthalmology', icon: Eye },
    { id: 'anatomy', label: 'Anatomy', icon: BookOpen },
    { id: 'general', label: 'General', icon: BookOpen }
  ];

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter(term => {
      const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           term.definition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, glossaryTerms]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'basic': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(cat => cat.id === category);
    if (categoryData) {
      const Icon = categoryData.icon;
      return <Icon className="h-4 w-4" />;
    }
    return <BookOpen className="h-4 w-4" />;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Medical Glossary</h2>
        <p className="text-gray-600 mb-6">
          Comprehensive medical terminology reference for interpreters
        </p>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search medical terms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid grid-cols-4 lg:grid-cols-7 mb-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex items-center gap-2 text-xs"
                >
                  <Icon className="h-3 w-3" />
                  <span className="hidden sm:inline">{category.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTerms.map((term) => (
                  <Card key={term.id} className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg font-semibold text-gray-900">
                          {term.term}
                        </CardTitle>
                        <div className="flex items-center gap-1">
                          {getCategoryIcon(term.category)}
                        </div>
                      </div>
                      {term.pronunciation && (
                        <CardDescription className="text-sm italic text-blue-600">
                          /{term.pronunciation}/
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                        {term.definition}
                      </p>

                      <div className="flex items-center gap-2 mb-3">
                        <Badge className={getDifficultyColor(term.difficulty)}>
                          {term.difficulty}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {term.category}
                        </Badge>
                      </div>

                      {term.examples && term.examples.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Examples:</h4>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {term.examples.map((example, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-gray-400 mr-2">•</span>
                                <span>{example}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredTerms.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No terms found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search or selecting a different category.
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default MedicalGlossary;
