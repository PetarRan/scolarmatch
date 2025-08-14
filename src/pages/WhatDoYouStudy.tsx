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
    if (formData.field && formData.where && formData.year) {
      localStorage.setItem('onboarding_step2', JSON.stringify(formData));
      navigate('/trajectory');
    }
  };

  const isFormValid = formData.field && formData.where && formData.year;

  return (
    <OnboardingLayout title="What do you study?" step={2}>
      <div className="space-y-6">
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
            <SelectTrigger>
              <SelectValue placeholder="University (bachelor)" />
            </SelectTrigger>
            <SelectContent>
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
            <SelectTrigger>
              <SelectValue placeholder="3rd" />
            </SelectTrigger>
            <SelectContent>
              {studyYears.map((year) => (
                <SelectItem key={year.value} value={year.value}>
                  {year.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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

export default WhatDoYouStudy;