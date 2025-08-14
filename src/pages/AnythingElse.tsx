import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import OnboardingLayout from '@/components/OnboardingLayout';

const AnythingElse = () => {
  const navigate = useNavigate();
  const [additionalInfo, setAdditionalInfo] = useState('');

  useEffect(() => {
    // Check if previous steps were completed
    const step1Data = localStorage.getItem('onboarding_step1');
    const step2Data = localStorage.getItem('onboarding_step2');
    const step3Data = localStorage.getItem('onboarding_step3');
    const step4Data = localStorage.getItem('onboarding_step4');
    if (!step1Data || !step2Data || !step3Data || !step4Data) {
      navigate('/who-are-you');
    }
  }, [navigate]);

  const handleNext = () => {
    localStorage.setItem('onboarding_step5', JSON.stringify({ additionalInfo }));
    navigate('/create-account');
  };

  return (
    <OnboardingLayout title="Anything else?" step={5}>
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-muted-foreground text-sm leading-relaxed">
            Add anything else that will help Scolarmatch find the best opportunities for you
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Other info</label>
          <Textarea
            placeholder="For example, I want to look at opportunities abroad, potentially in France, but in small cities only"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            className="min-h-[120px] resize-none"
          />
        </div>

        <Button 
          onClick={handleNext}
          className="w-full mt-8" 
          size="xl"
        >
          Next
        </Button>
      </div>
    </OnboardingLayout>
  );
};

export default AnythingElse;