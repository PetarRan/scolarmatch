import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import OnboardingLayout from '@/components/OnboardingLayout';
import PageTransition from '@/components/PageTransition';

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
    <PageTransition>
      <OnboardingLayout title="What do you study?" step={2}>
        <div className="space-y-6">
          <div className="text-center">
            <p className="subtitle-text text-sm leading-relaxed">
              Tell us about your studies to get more personalized opportunities
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="field" className="input-label text-sm">
              What field do you study?
            </label>
            <Input
              id="field"
              type="text"
              placeholder="Computer Science"
              value={formData.field}
              onChange={(e) => setFormData({ ...formData, field: e.target.value })}
              className="onboarding-input"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="level" className="input-label text-sm">
              What level are you studying at?
            </label>
            <Select value={formData.where} onValueChange={(value) => setFormData({ ...formData, where: value })}>
              <SelectTrigger className="onboarding-dropdown">
                <SelectValue placeholder="Select your level" />
              </SelectTrigger>
              <SelectContent className="onboarding-dropdown-content">
                <SelectItem value="high-school">High School</SelectItem>
                <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                <SelectItem value="masters">Master's Degree</SelectItem>
                <SelectItem value="phd">PhD</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="year" className="input-label text-sm">
              What year are you in?
            </label>
            <Select value={formData.year} onValueChange={(value) => setFormData({ ...formData, year: value })}>
              <SelectTrigger className="onboarding-dropdown">
                <SelectValue placeholder="3rd" />
              </SelectTrigger>
              <SelectContent className="onboarding-dropdown-content">
                {studyYears.map((year) => (
                  <SelectItem key={year.value} value={year.value}>
                    {year.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={handleNext}
              className="w-full onboarding-button continue-button"
            >
              Continue
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleSkip}
              className="w-full onboarding-button"
            >
              Skip
            </Button>
          </div>
        </div>
      </OnboardingLayout>
    </PageTransition>
  );
};

export default WhatDoYouStudy;