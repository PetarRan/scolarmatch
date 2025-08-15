import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import OnboardingLayout from '@/components/OnboardingLayout';

const educationLevels = [
  { value: 'bachelor', label: 'University (bachelor)' },
  { value: 'master', label: 'University (master)' },
  { value: 'phd', label: 'University (PhD)' },
  { value: 'high-school', label: 'High School' },
  { value: 'community-college', label: 'Community College' },
];

const studyYears = [
  { value: '1st', label: '1st' },
  { value: '2nd', label: '2nd' },
  { value: '3rd', label: '3rd' },
  { value: '4th', label: '4th' },
  { value: '5th', label: '5th' },
  { value: 'graduate', label: 'Graduate' },
];

const WhatDoYouStudy = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    field: '',
    where: '',
    year: ''
  });

  useEffect(() => {
    // Check if previous step was completed
    const step1Data = localStorage.getItem('onboarding_step1');
    if (!step1Data) {
      navigate('/who-are-you');
    }
  }, [navigate]);

  const handleNext = () => {
    // Make all fields optional - user can skip this step
    localStorage.setItem('onboarding_step2', JSON.stringify(formData));
    navigate('/trajectory');
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding_step2', JSON.stringify({ field: '', where: '', year: '' }));
    navigate('/trajectory');
  };

  // Remove form validation requirement
  const isFormValid = true;

  return (
    <OnboardingLayout title="What do you study?" step={2}>
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-muted-foreground text-sm leading-relaxed">
            Tell us about your studies to get more personalized opportunities
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Field</label>
          <Input
            placeholder="Computer Science"
            value={formData.field}
            onChange={(e) => setFormData({ ...formData, field: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Where</label>
          <Select value={formData.where} onValueChange={(value) => setFormData({ ...formData, where: value })}>
            <SelectTrigger className="h-12 bg-input border-input-border">
              <SelectValue placeholder="University (bachelor)" />
            </SelectTrigger>
            <SelectContent className="dropdown-content">
              {educationLevels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Year</label>
          <Select value={formData.year} onValueChange={(value) => setFormData({ ...formData, year: value })}>
            <SelectTrigger className="h-12 bg-input border-input-border">
              <SelectValue placeholder="3rd" />
            </SelectTrigger>
            <SelectContent className="dropdown-content">
              {studyYears.map((year) => (
                <SelectItem key={year.value} value={year.value}>
                  {year.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-3">
          <Button 
            onClick={handleSkip}
            variant="outline"
            className="flex-1" 
            size="xl"
          >
            Skip
          </Button>
          <Button 
            onClick={handleNext}
            className="flex-1" 
            size="xl"
          >
            Next
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default WhatDoYouStudy;