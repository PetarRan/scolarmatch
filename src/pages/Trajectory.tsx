import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ExternalLink } from 'lucide-react';
import OnboardingLayout from '@/components/OnboardingLayout';

const trajectoryOptions = [
  {
    id: 'faang',
    title: 'Join a FAANG/Startup',
    description: 'Learn more',
    icon: '💼',
    color: 'bg-blue-500/10 border-blue-500/20'
  },
  {
    id: 'consulting',
    title: 'Work in consulting',
    description: 'Learn more',
    icon: '📊',
    color: 'bg-orange-500/10 border-orange-500/20'
  },
  {
    id: 'research',
    title: 'Do research',
    description: 'Learn more',
    icon: '🔬',
    color: 'bg-green-500/10 border-green-500/20'
  },
  {
    id: 'other',
    title: 'Other',
    description: '',
    icon: '❓',
    color: 'bg-gray-500/10 border-gray-500/20'
  },
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

  const handleNext = () => {
    if (selectedOptions.length > 0) {
      localStorage.setItem('onboarding_step3', JSON.stringify({ trajectory: selectedOptions }));
      navigate('/drop-cv');
    }
  };

  return (
    <OnboardingLayout title="Whats your trajectory?" step={3}>
      <div className="space-y-4">
        {trajectoryOptions.map((option) => (
          <div
            key={option.id}
            className={`p-4 rounded-lg border backdrop-blur-sm cursor-pointer transition-all hover:border-primary/30 ${
              selectedOptions.includes(option.id) 
                ? 'border-primary bg-primary/10' 
                : 'border-input-border bg-input'
            }`}
            onClick={() => handleOptionToggle(option.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{option.icon}</span>
                <div>
                  <h3 className="font-medium text-foreground">{option.title}</h3>
                  {option.description && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <span>{option.description}</span>
                      <ExternalLink className="h-3 w-3" />
                    </div>
                  )}
                </div>
              </div>
              <Checkbox 
                checked={selectedOptions.includes(option.id)}
                onCheckedChange={() => handleOptionToggle(option.id)}
              />
            </div>
          </div>
        ))}

        <Button 
          onClick={handleNext}
          disabled={selectedOptions.length === 0}
          className="w-full mt-8" 
          size="xl"
        >
          Next
        </Button>
      </div>
    </OnboardingLayout>
  );
};

export default Trajectory;