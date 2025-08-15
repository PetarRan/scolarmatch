import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Info } from 'lucide-react';
import OnboardingLayout from '@/components/OnboardingLayout';
import PageTransition from '@/components/PageTransition';

const trajectoryOptions = [
  {
    id: 'faangstartup',
    title: 'FAANG/Startup',
    description: 'Work at major tech companies like Google, Apple, Meta, or innovative startups. Focus on software engineering, product management, or data science roles with competitive salaries and equity packages.',
    image: '/traject/faang.png'
  },
  {
    id: 'consult',
    title: 'Consulting',
    description: 'Join consulting firms like McKinsey, BCG, or Bain. Work on diverse projects across industries, develop strategic thinking, and gain exposure to different business challenges and solutions.',
    image: '/traject/consult.png'
  },
  {
    id: 'research',
    title: 'Research',
    description: 'Pursue academic or industry research positions. Contribute to scientific advancement, publish papers, and work on cutting-edge technologies that could shape the future.',
    image: '/traject/research.png'
  },
  {
    id: 'other',
    title: 'Other',
    description: 'Explore alternative career paths like entrepreneurship, non-profit work, government positions, or creative industries. Find your unique path that aligns with your values and interests.',
    image: '/traject/other.png'
  }
];

const Trajectory = () => {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    // Check if previous steps were completed
    const step1Data = localStorage.getItem('onboarding_step1');
    const step2Data = localStorage.getItem('onboarding_step2');
    if (!step1Data || !step2Data) {
      navigate('/who-are-you');
    }
  }, [navigate]);

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleNext = (optionId: string) => {
    if (optionId) {
      localStorage.setItem('onboarding_step3', JSON.stringify({ trajectory: optionId }));
      navigate('/drop-cv');
    }
  };

  return (
    <PageTransition>
      <OnboardingLayout title="Whats your trajectory?" step={3}>
        <div className="space-y-4">
          <div className="space-y-3">
            {trajectoryOptions.map((option) => (
              <Dialog key={option.id}>
                <DialogTrigger asChild>
                  <div className="trajectory-option p-4 rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <img 
                        src={option.image} 
                        alt={option.title}
                        className="w-12 h-12 object-cover rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      <div>
                        <h3 className="font-semibold text-base">{option.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {option.description.slice(0, 80)}...
                        </p>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="trajectory-modal max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                      <img 
                        src={option.image} 
                        alt={option.title}
                        className="w-8 h-8 object-cover rounded"
                      />
                      {option.title}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {option.description}
                    </p>
                    <div className="flex justify-end">
                      <Button onClick={() => handleNext(option.id)}>
                        Choose This Path
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </OnboardingLayout>
    </PageTransition>
  );
};

export default Trajectory;