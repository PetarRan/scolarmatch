import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import OnboardingLayout from '@/components/OnboardingLayout';
import PageTransition from '@/components/PageTransition';
import { countryOptions } from '@/lib/countries';

const WhoAreYou = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    nationality: 'us',
    age: ''
  });

  const handleNext = () => {
    if (formData.name && formData.nationality && formData.age) {
      // Store in localStorage for now (will move to Supabase later)
      localStorage.setItem('onboarding_step1', JSON.stringify(formData));
      navigate('/what-do-you-study');
    }
  };

  const isFormValid = formData.name && formData.nationality && formData.age;

  return (
    <PageTransition>
      <OnboardingLayout title="Who are you?" step={1}>
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="input-label text-sm">
              What's your name?
            </label>
            <Input
              id="name"
              type="text"
              placeholder="John"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="onboarding-input"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="age" className="input-label text-sm">
              How old are you?
            </label>
            <Input
              id="age"
              type="number"
              placeholder="22"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="onboarding-input"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="nationality" className="input-label text-sm">
              What's your nationality?
            </label>
            <Select value={formData.nationality} onValueChange={(value) => setFormData({ ...formData, nationality: value })}>
              <SelectTrigger className="onboarding-dropdown">
                <SelectValue placeholder="Select your nationality" />
              </SelectTrigger>
              <SelectContent className="onboarding-dropdown-content">
                {countryOptions.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleNext}
            disabled={!isFormValid}
            className="w-full mt-8 onboarding-button continue-button" 
            size="xl"
          >
            Next
          </Button>
        </div>
      </OnboardingLayout>
    </PageTransition>
  );
};

export default WhoAreYou;