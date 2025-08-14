import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FileUpload from '@/components/FileUpload';
import OnboardingLayout from '@/components/OnboardingLayout';

const DropCV = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    // Check if previous steps were completed
    const step1Data = localStorage.getItem('onboarding_step1');
    const step2Data = localStorage.getItem('onboarding_step2');
    const step3Data = localStorage.getItem('onboarding_step3');
    if (!step1Data || !step2Data || !step3Data) {
      navigate('/who-are-you');
    }
  }, [navigate]);

  const handleNext = () => {
    if (selectedFile) {
      // In a real app, we'd upload the file to storage
      localStorage.setItem('onboarding_step4', JSON.stringify({ 
        cvFileName: selectedFile.name,
        cvFileSize: selectedFile.size 
      }));
    }
    navigate('/anything-else');
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding_step4', JSON.stringify({ skipped: true }));
    navigate('/anything-else');
  };

  return (
    <OnboardingLayout title="Drop your cv" step={4}>
      <div className="space-y-8">
        <FileUpload 
          onFileSelect={setSelectedFile}
          selectedFile={selectedFile}
        />

        <div className="space-y-3">
          <Button 
            variant="secondary"
            onClick={handleSkip}
            className="w-full" 
            size="xl"
          >
            Skip
          </Button>
          
          <Button 
            onClick={handleNext}
            disabled={!selectedFile}
            className="w-full" 
            size="xl"
          >
            Next
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default DropCV;