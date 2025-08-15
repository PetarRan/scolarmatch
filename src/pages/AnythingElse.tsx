import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import OnboardingLayout from '@/components/OnboardingLayout';
import PageTransition from '@/components/PageTransition';

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
    <PageTransition>
      <OnboardingLayout title="Anything else?" step={5}>
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="subtitle-text text-center text-lg">
              Is there anything else you'd like us to know about you?
            </p>
          </div>

          <div className="space-y-4">
            <Textarea
              placeholder="Tell us about your interests, goals, or any specific requirements..."
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="onboarding-input min-h-[200px] resize-none"
            />
          </div>

          <Button 
            onClick={handleNext}
            className="w-full onboarding-button continue-button"
          >
            Continue
          </Button>
        </div>
      </OnboardingLayout>
    </PageTransition>
  );
};

export default AnythingElse;