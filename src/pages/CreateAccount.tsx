import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import OnboardingLayout from '@/components/OnboardingLayout';
import PageTransition from '@/components/PageTransition';
import { Apple, Mail } from 'lucide-react';

const CreateAccount = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if all previous steps were completed
    const step1Data = localStorage.getItem('onboarding_step1');
    const step2Data = localStorage.getItem('onboarding_step2');
    const step3Data = localStorage.getItem('onboarding_step3');
    const step4Data = localStorage.getItem('onboarding_step4');
    const step5Data = localStorage.getItem('onboarding_step5');
    
    if (!step1Data || !step2Data || !step3Data || !step4Data || !step5Data) {
      navigate('/who-are-you');
    }
  }, [navigate]);

  const handleGoogleSignIn = () => {
    // Mock authentication - in real app would integrate with Supabase auth
    console.log('Google authentication');
    // Simulate successful auth
    localStorage.setItem('user_authenticated', 'true');
    navigate('/dashboard');
  };

  const handleAppleSignIn = () => {
    // Mock authentication
    console.log('Apple authentication');
    localStorage.setItem('user_authenticated', 'true');
    navigate('/dashboard');
  };

  const handleEmailSignIn = () => {
    // Mock authentication
    console.log('Email authentication');
    localStorage.setItem('user_authenticated', 'true');
    navigate('/dashboard');
  };

  return (
    <PageTransition>
      <OnboardingLayout title="Create an account to access your dashboard" step={6}>
        <div className="space-y-8">
          <div className="space-y-4">
            <Button 
              variant="outline" 
              onClick={() => handleGoogleSignIn()}
              className="w-full onboarding-button h-12"
            >
              <img src="/login/google-white.png" alt="Google" className="w-4 h-4 mr-1" />
              Continue with Google
            </Button>

            <Button 
              variant="outline" 
              onClick={() => handleAppleSignIn()}
              className="w-full onboarding-button h-12"
            >
              <img src="/login/apple-white.png" alt="Google" className="w-4 h-4 mr-1" />
              Continue with Apple
            </Button>

            <Button 
              variant="outline" 
              onClick={() => handleEmailSignIn()}
              className="w-full onboarding-button h-12"
            >
              Continue with Email
            </Button>
          </div>
        </div>
      </OnboardingLayout>
    </PageTransition>
  );
};

export default CreateAccount;