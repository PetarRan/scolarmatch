import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('user_authenticated');
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleGetStarted = () => {
    navigate('/who-are-you');
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-6">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <img src="/logo.png" alt="Scolarmatch" className="h-16 w-auto mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-foreground mb-4 gradient-text">
            Scolarmatch
          </h1>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-6">
          Discover Your Perfect Opportunities
        </h2>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Find scholarships, internships, grants, and more tailored specifically to your profile. 
          Let AI match you with the best opportunities for your academic and career journey.
        </p>
        <Button 
          onClick={handleGetStarted}
          size="xl" 
          className="px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Index;
