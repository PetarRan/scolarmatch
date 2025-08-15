import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import OpportunityCard from '@/components/OpportunityCard';
import ResourceCard from '@/components/ResourceCard';
import { User, BookmarkIcon, Loader2 } from 'lucide-react';

// Realistic mock data
const mockOpportunities = [
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
    title: 'Startup Accelerator Program Grant',
    organization: 'Y Combinator',
    type: 'grant' as const,
    description: 'Get up to $500,000 in funding and mentorship for your startup. Join our 3-month accelerator program with access to our network of founders, investors, and industry experts.',
    deadline: 'March 1, 2025',
    location: 'San Francisco, CA',
    isAISuggested: false,
    tags: ['Startup', 'Funding', 'Mentorship'],
    url: 'https://ycombinator.com/apply',
    sponsorsVisa: false,
    sponsorsH1B: false,
    logo: '/logos/ycombinator.png'
  },
  {
    id: '3',
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
  },
  {
    id: '4',
    title: 'University of Utah Presidential Scholarship',
    organization: 'University of Utah',
    type: 'scholarship' as const,
    description: 'Full-tuition scholarship for outstanding academic achievement. Renewable for up to 4 years. Includes access to honors program, research opportunities, and exclusive campus events.',
    deadline: 'December 15, 2024',
    location: 'Salt Lake City, UT',
    isAISuggested: false,
    tags: ['Academic Excellence', 'Full Tuition', 'Honors Program'],
    url: 'https://admissions.utah.edu/scholarships',
    sponsorsVisa: true,
    sponsorsH1B: true,
    logo: '/logos/utah.png'
  }
];

const mockResources = [
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
  },
  {
    id: '4',
    title: 'How to network effectively at tech conferences',
    source: 'dev.to',
    description: 'Practical tips for making meaningful connections at developer conferences, hackathons, and tech meetups. Learn how to approach speakers, fellow attendees, and potential employers.',
    url: 'https://dev.to/example/networking-tips',
    publishedAt: '2024-01-12',
    readTime: '6 min',
    logo: '/logos/devto.png'
  },
  {
    id: '5',
    title: 'The future of remote work in software development',
    source: 'stackoverflow.blog',
    description: 'Analysis of remote work trends in the tech industry, including productivity metrics, team collaboration tools, and best practices for distributed engineering teams.',
    url: 'https://stackoverflow.blog/remote-work-future',
    publishedAt: '2024-01-11',
    readTime: '10 min',
    logo: '/logos/stackoverflow.png'
  },
  {
    id: '6',
    title: 'Building a portfolio that gets you hired',
    source: 'github.blog',
    description: 'Guide to creating an impressive developer portfolio using GitHub, including project showcases, contribution graphs, and how to make your profile stand out to recruiters.',
    url: 'https://github.blog/portfolio-guide',
    publishedAt: '2024-01-10',
    readTime: '9 min',
    logo: '/logos/github.png'
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
  const [agentModalOpen, setAgentModalOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [workingOpportunities, setWorkingOpportunities] = useState<Set<string>>(new Set());

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

  const handleTaskAgent = (opportunity: any) => {
    setSelectedOpportunity(opportunity);
    setAgentModalOpen(true);
  };

  const handleSubmitAgentTask = () => {
    if (!selectedOpportunity) return;
    
    // Add loading state
    setWorkingOpportunities(prev => new Set(prev).add(selectedOpportunity.id));
    
    // Simulate agent working
    setTimeout(() => {
      console.log('Agent task submitted for:', selectedOpportunity?.title);
      console.log('Additional info:', additionalInfo);
      setWorkingOpportunities(prev => {
        const newSet = new Set(prev);
        newSet.delete(selectedOpportunity.id);
        return newSet;
      });
      setAgentModalOpen(false);
      setAdditionalInfo('');
      setSelectedOpportunity(null);
    }, 3000); // 3 second delay to simulate processing
  };

  return (
    <div className="min-h-screen dashboard-bg">
      {/* Header */}
      <header>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo-full.png" alt="Scolarmatch" className="h-8 w-auto" />
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
          <div className="bg-gradient-to-br from-[#FDFDFD0D] to-[#F0F0E41A] border-2 border-[#FFFFFF0D] rounded-xl p-6 backdrop-blur-md">
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
                    onTaskAgent={handleTaskAgent}
                    isSaved={savedOpportunities.has(opportunity.id)}
                    isWorking={workingOpportunities.has(opportunity.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Resources Column */}
          <div className="bg-gradient-to-br from-[#FDFDFD0D] to-[#F0F0E41A] border-2 border-[#FFFFFF0D] rounded-xl p-6 backdrop-blur-md">
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
        </div>
      </main>

      {/* Agent Task Modal */}
      <Dialog open={agentModalOpen} onOpenChange={setAgentModalOpen}>
        <DialogContent className="dashboard-modal max-w-md border-0">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              🤖 Task Agent
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Task agent to apply for: <strong>{selectedOpportunity?.title}</strong>
              </p>
              <p className="text-xs text-muted-foreground">
                The system already has all your information. You can optionally add more details or attachments below.
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Additional Information (Optional)</label>
              <Textarea
                placeholder="Any additional details, preferences, or specific requirements..."
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className="min-h-[100px] resize-none"
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setAgentModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitAgentTask}
                className="flex-1 gap-2"
              >
                <Loader2 className="h-4 w-4" />
                Task Agent
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;