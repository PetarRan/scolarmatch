import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import OpportunityCard from '@/components/OpportunityCard';
import { ArrowLeft, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock saved opportunities - using the same structure as main dashboard
const mockSavedOpportunities = [
  {
    id: '1',
    title: 'Google Software Engineering Internship',
    organization: 'Google',
    type: 'internship' as const,
    description: 'Join Google\'s engineering team for a 12-week summer internship. Work on real projects that impact millions of users worldwide. Gain experience with cutting-edge technologies and collaborate with world-class engineers.',
    deadline: 'February 15, 2025',
    location: 'Mountain View, CA',
    isAISuggested: true,
    tags: ['Software Engineering', 'Python', 'Machine Learning'],
    url: 'https://careers.google.com/internships',
    sponsorsVisa: true,
    sponsorsH1B: true,
    logo: '/logos/google.png'
  },
  {
    id: '2',
    title: 'Erasmus+ Exchange Program',
    organization: 'European Commission',
    type: 'scholarship' as const,
    description: 'Study abroad in Europe for 6-12 months at partner universities. Receive monthly stipend of €850, travel allowance, and full tuition coverage. Experience different cultures and expand your academic network.',
    deadline: 'January 31, 2025',
    location: 'Europe',
    isAISuggested: true,
    tags: ['Study Abroad', 'Europe', 'Cultural Exchange'],
    url: 'https://erasmus-plus.ec.europa.eu',
    sponsorsVisa: true,
    sponsorsH1B: false,
    logo: '/logos/erasmus.png'
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

const SavedOpportunities = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [savedOpportunities, setSavedOpportunities] = useState<Set<string>>(new Set(['1', '2']));

  const filteredOpportunities = activeFilter === 'all' 
    ? mockSavedOpportunities 
    : mockSavedOpportunities.filter(opp => opp.type === activeFilter);

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

  const handleDiscardOpportunity = (id: string) => {
    console.log('Discarded opportunity:', id);
  };

  const handleTaskAgent = (opportunity: any) => {
    // In real app, would open agent modal
    console.log('Task agent for:', opportunity.title);
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
              <h1 className="text-3xl font-bold text-foreground">Your Saved Opportunities</h1>
              <Button variant="glass" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
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
              {filteredOpportunities.length > 0 ? (
                filteredOpportunities.map((opportunity) => (
                  <OpportunityCard
                    key={opportunity.id}
                    opportunity={opportunity}
                    onSave={handleSaveOpportunity}
                    onDiscard={handleDiscardOpportunity}
                    onTaskAgent={handleTaskAgent}
                    isSaved={savedOpportunities.has(opportunity.id)}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No saved opportunities yet</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => navigate('/dashboard')}
                  >
                    Browse Opportunities
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

export default SavedOpportunities;