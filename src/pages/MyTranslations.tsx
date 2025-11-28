import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Translation {
  id: string;
  sourceText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

const MyTranslations = () => {
  const [translations, setTranslations] = useState<Translation[]>([
    { id: "1", sourceText: "Hello", translatedText: "Hola", sourceLanguage: "en", targetLanguage: "es" },
    { id: "2", sourceText: "World", translatedText: "Mundo", sourceLanguage: "en", targetLanguage: "es" },
  ]);
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("es");

  const handleAddTranslation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceText || !translatedText) return;
    const newTranslation: Translation = {
      id: new Date().toISOString(),
      sourceText,
      translatedText,
      sourceLanguage,
      targetLanguage,
    };
    setTranslations([...translations, newTranslation]);
    setSourceText("");
    setTranslatedText("");
  };

  const handleDeleteTranslation = (id: string) => {
    setTranslations(translations.filter((t) => t.id !== id));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">My Custom Translations</h1>

        <div className="grid gap-12 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Add New Translation</CardTitle>
              <CardDescription>
                Add a new translation pair to your custom glossary.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddTranslation} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sourceText">Source Text</Label>
                  <Input
                    id="sourceText"
                    value={sourceText}
                    onChange={(e) => setSourceText(e.target.value)}
                    placeholder="e.g., Hello"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="translatedText">Translated Text</Label>
                  <Input
                    id="translatedText"
                    value={translatedText}
                    onChange={(e) => setTranslatedText(e.target.value)}
                    placeholder="e.g., Hola"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="sourceLanguage">Source Language</Label>
                        <Input
                            id="sourceLanguage"
                            value={sourceLanguage}
                            onChange={(e) => setSourceLanguage(e.target.value)}
                            placeholder="e.g., en"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="targetLanguage">Target Language</Label>
                        <Input
                            id="targetLanguage"
                            value={targetLanguage}
                            onChange={(e) => setTargetLanguage(e.target.value)}
                            placeholder="e.g., es"
                            required
                        />
                    </div>
                </div>
                 <Button type="submit" className="w-full">Add Translation</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Translation Glossary</CardTitle>
               <CardDescription>
                Your custom-defined translations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Source</TableHead>
                    <TableHead>Translation</TableHead>
                    <TableHead>Languages</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {translations.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell>{t.sourceText}</TableCell>
                      <TableCell>{t.translatedText}</TableCell>
                      <TableCell>{t.sourceLanguage} → {t.targetLanguage}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteTranslation(t.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default MyTranslations;
