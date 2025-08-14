import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import OpportunityCard from '@/components/OpportunityCard';
import { ArrowLeft, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock saved opportunities
const mockSavedOpportunities = [
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
  const [savedOpportunities, setSavedOpportunities] = useState<Set<string>>(new Set(['1']));

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
              <img src="/logo.png" alt="Scolarmatch" className="h-8 w-auto" />
              <span className="text-xl font-semibold text-foreground">Scolarmatch</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
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
      </main>
    </div>
  );
};

export default SavedOpportunities;