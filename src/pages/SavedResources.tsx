import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ResourceCard from '@/components/ResourceCard';
import { ArrowLeft, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock saved resources - using the same structure as main dashboard
const mockSavedResources = [
  {
    id: '1',
    title: 'What do you do after college? Career advice from recent graduates',
    source: 'Reddit.com',
    description: 'A comprehensive thread where recent college graduates share their post-college experiences, career paths, and advice for those about to enter the workforce. Covers various industries and personal stories.',
    url: 'https://reddit.com/r/careerguidance/comments/example',
    publishedAt: '2024-01-15',
    readTime: '8 min',
    logo: '/logos/reddit.png'
  },
  {
    id: '2',
    title: 'Ask HN: Steps to becoming a software engineer in 2024',
    source: 'ycombinator.com',
    description: 'Hacker News discussion about the evolving path to becoming a software engineer, considering the impact of AI tools, changing industry requirements, and advice for career changers.',
    url: 'https://news.ycombinator.com/item?id=example',
    publishedAt: '2024-01-14',
    readTime: '12 min',
    logo: '/logos/ycombinator.png'
  },
  {
    id: '3',
    title: 'My journey from non-tech background to FAANG engineer',
    source: 'medium.com',
    description: 'Personal story of transitioning from a non-technical background to a software engineering role at a major tech company. Includes study strategies, interview preparation, and lessons learned.',
    url: 'https://medium.com/@example/career-transition',
    publishedAt: '2024-01-13',
    readTime: '15 min',
    logo: '/logos/medium.png'
  }
];

const SavedResources = () => {
  const navigate = useNavigate();
  const [savedResources, setSavedResources] = useState<Set<string>>(new Set(['1', '2', '3']));

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
    <div className="min-h-screen dashboard-bg">
      {/* Header */}
      <header>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <img src="/logo.png" alt="Scolarmatch" className="h-8 w-auto" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-gradient-to-br from-[#FDFDFD0D] to-[#F0F0E41A] border-2 border-[#FFFFFF0D] rounded-xl p-6 backdrop-blur-md">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-foreground">Your Saved Resources</h1>
              <Button variant="glass" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
            
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
        </div>
      </main>
    </div>
  );
};

export default SavedResources;