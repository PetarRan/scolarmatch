import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ResourceCard from '@/components/ResourceCard';
import { ArrowLeft, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logoImage from '@/assets/logo-main.png';

// Mock saved resources
const mockSavedResources = [
  {
    id: '1',
    title: 'What do you do after college?',
    source: 'Reddit.com',
    description: 'I\'m kinda having a crisis. What do people do after they graduate college? Are yall happy? Do you have friends? Like what am I supposed to do, just work all day then go home. What about when I\'m 50?? Like should I just stay in school...',
    url: 'https://reddit.com/example',
    publishedAt: '2024-01-15',
    readTime: '5 min'
  }
];

const SavedResources = () => {
  const navigate = useNavigate();
  const [savedResources, setSavedResources] = useState<Set<string>>(new Set(['1']));

  const handleSaveResource = (id: string) => {
    setSavedResources(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleDiscardResource = (id: string) => {
    console.log('Discarded resource:', id);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-card-border bg-card-glass backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <img src={logoImage} alt="Scolarmatch" className="h-8 w-auto" />
              <span className="text-xl font-semibold text-foreground">Saved Resources</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Your Saved Resources</h1>
            <Button variant="glass" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Resources List */}
          <div className="space-y-4">
            {mockSavedResources.length > 0 ? (
              mockSavedResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  onSave={handleSaveResource}
                  onDiscard={handleDiscardResource}
                  isSaved={savedResources.has(resource.id)}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No saved resources yet</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => navigate('/dashboard')}
                >
                  Browse Resources
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SavedResources;