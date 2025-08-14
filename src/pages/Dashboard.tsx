import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import OpportunityCard from '@/components/OpportunityCard';
import ResourceCard from '@/components/ResourceCard';
import { User, BookmarkIcon } from 'lucide-react';
import logoImage from '@/assets/logo-main.png';

// Mock data - in real app would come from Supabase
const mockOpportunities = [
  {
    id: '1',
    title: 'Fullbright Scolarship',
    organization: 'Scolarships',
    type: 'scholarship' as const,
    description: 'Fullbright Foreign Student Program (Master\'s Degree) Application for the Fullbright Foreign Student Program in the United States (Master\'s Degree) A mainstay of America\'s public-diplomacy efforts, the Fullbright Foreign Student Program brings citizens of other countries to the United States for Master\'s degree at U.S...',
    deadline: '12 dic 2024',
    location: 'United States',
    isAISuggested: true,
    tags: ['Computer Science', 'Masters', 'International'],
    url: 'https://example.com/fullbright'
  },
  {
    id: '2',
    title: 'Erasmus Mundus',
    organization: 'Scolarships',
    type: 'scholarship' as const,
    description: 'The Erasmus Mundus Programme is a flagship educational initiative of the European Union, unique in its design and implementation. It allows students to pursue a joint master\'s degree by studying at two or more universities in different countries, within Europe and beyond...',
    deadline: '12 dic 2024',
    isAISuggested: false,
    tags: ['Europe', 'Joint Degree', 'Masters'],
    url: 'https://example.com/erasmus'
  },
  {
    id: '3',
    title: 'Internships - Careers',
    organization: 'Internship',
    type: 'internship' as const,
    description: 'Internships in business, engineering and technology, and more. You can explore all open internships on the Google Careers site.',
    deadline: 'Rolling',
    location: 'Global',
    isAISuggested: false,
    tags: ['Google', 'Tech', 'Business'],
    url: 'https://example.com/google-internships'
  }
];

const mockResources = [
  {
    id: '1',
    title: 'What do you do after college?',
    source: 'Reddit.com',
    description: 'I\'m kinda having a crisis. What do people do after they graduate college? Are yall happy? Do you have friends? Like what am I supposed to do, just work all day then go home. What about when I\'m 50?? Like should I just stay in school...',
    url: 'https://reddit.com/example',
    publishedAt: '2024-01-15',
    readTime: '5 min'
  },
  {
    id: '2',
    title: 'Ask HN: Steps to becoming a software enginee...',
    source: 'ycombinator.com',
    description: 'I know this has probably been asked before many times, but wondering if the steps to becoming a software engineer have changed given the rise in popularity of LLMs, and whether someone in their early 30s even has a chance of becoming a software engineer (at FAANG or other companies with similar compensation and competitiveness) with no prior programming experience...',
    url: 'https://ycombinator.com/example',
    publishedAt: '2024-01-14',
    readTime: '8 min'
  },
  {
    id: '3',
    title: 'My journey applying to a FAANG',
    source: 'medium.com',
    description: 'It all started as a LinkedIn message from a recruiter asking me if I was interested in applying for this position they had. That was on September 24th, 2024. Following that message, I had a phone call with her sometime around late September...',
    url: 'https://medium.com/example',
    publishedAt: '2024-01-13',
    readTime: '12 min'
  }
];

const filterOptions = [
  { value: 'all', label: 'All opportunities' },
  { value: 'scholarship', label: 'Scholarships' },
  { value: 'grant', label: 'Grants' },
  { value: 'internship', label: 'Internships' },
  { value: 'summer-camp', label: 'Summer Camps' },
  { value: 'competition', label: 'Competitions' }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [savedOpportunities, setSavedOpportunities] = useState<Set<string>>(new Set());
  const [savedResources, setSavedResources] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('user_authenticated');
    if (!isAuthenticated) {
      navigate('/who-are-you');
    }
  }, [navigate]);

  const filteredOpportunities = activeFilter === 'all' 
    ? mockOpportunities 
    : mockOpportunities.filter(opp => opp.type === activeFilter);

  const handleSaveOpportunity = (id: string) => {
    setSavedOpportunities(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

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

  const handleDiscardOpportunity = (id: string) => {
    // In real app, would mark as discarded in DB
    console.log('Discarded opportunity:', id);
  };

  const handleDiscardResource = (id: string) => {
    // In real app, would mark as discarded in DB
    console.log('Discarded resource:', id);
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Header */}
      <header className="border-b border-card-border bg-card-glass backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logoImage} alt="Scolarmatch" className="h-8 w-auto" />
              <span className="text-xl font-semibold text-foreground">Scolarmatch</span>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="glass" 
                className="gap-2"
                onClick={() => navigate('/saved-opportunities')}
              >
                <BookmarkIcon className="h-4 w-4" />
                Saved opportunities
              </Button>
              <Button 
                variant="glass" 
                className="gap-2"
                onClick={() => navigate('/saved-resources')}
              >
                <BookmarkIcon className="h-4 w-4" />
                Saved resources
              </Button>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Opportunities Column */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Opportunities</h2>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((filter) => (
                <Badge
                  key={filter.value}
                  variant={activeFilter === filter.value ? "default" : "outline"}
                  className="cursor-pointer px-3 py-1"
                  onClick={() => setActiveFilter(filter.value)}
                >
                  {filter.label}
                </Badge>
              ))}
            </div>

            {/* Opportunities List */}
            <div className="space-y-4">
              {filteredOpportunities.map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  onSave={handleSaveOpportunity}
                  onDiscard={handleDiscardOpportunity}
                  isSaved={savedOpportunities.has(opportunity.id)}
                />
              ))}
            </div>
          </div>

          {/* Resources Column */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Resources</h2>
            
            <div className="space-y-4">
              {mockResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  onSave={handleSaveResource}
                  onDiscard={handleDiscardResource}
                  isSaved={savedResources.has(resource.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;