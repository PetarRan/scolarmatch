import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import OnboardingLayout from '@/components/OnboardingLayout';
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
    <OnboardingLayout title="Who are you?" step={1}>
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Name</label>
          <Input
            placeholder="John"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Nationality</label>
          <Select value={formData.nationality} onValueChange={(value) => setFormData({ ...formData, nationality: value })}>
            <SelectTrigger className="h-12 bg-input border-input-border">
              <SelectValue placeholder="🇮🇹 Italy" />
            </SelectTrigger>
            <SelectContent className="dropdown-content">
              {countryOptions.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Age</label>
          <Input
            type="number"
            placeholder="22"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            min="16"
            max="100"
          />
        </div>

        <Button 
          onClick={handleNext}
          disabled={!isFormValid}
          className="w-full mt-8" 
          size="xl"
        >
          Next
        </Button>
      </div>
    </OnboardingLayout>
  );
};

export default WhoAreYou;