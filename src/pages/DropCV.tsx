import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FileUpload from '@/components/FileUpload';
import OnboardingLayout from '@/components/OnboardingLayout';
import { Upload, FileText, X } from 'lucide-react';

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
    // Skip CV upload and go to next page
    navigate('/anything-else');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <OnboardingLayout title="Drop your cv" step={4}>
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="relative onboarding-input rounded-lg p-8 text-center border-dashed border-2 border-[#FFFFFF0D] hover:border-[#FFFFFF1A] transition-colors cursor-pointer">
            <div className="space-y-4">
              <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
              <div>
                <p className="text-lg font-medium">Drop your CV here</p>
                <p className="text-sm text-muted-foreground">or click to browse</p>
              </div>
            </div>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          
          {selectedFile && (
            <div className="onboarding-input rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="font-medium">{selectedFile.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedFile(null)}
                  className="text-destructive hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Button 
            onClick={handleNext}
            disabled={!selectedFile}
            className="w-full onboarding-button continue-button"
          >
            Continue
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleSkip}
            className="w-full onboarding-button"
          >
            Skip for now
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default DropCV;