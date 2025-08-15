import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface OnboardingLayoutProps {
  children: ReactNode;
  title: string;
  step?: number;
  totalSteps?: number;
}

const OnboardingLayout = ({
  children,
  title,
  step,
  totalSteps = 6,
}: OnboardingLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Scolarmatch" className="h-8 w-auto" />
        </div>
      </header>

      {/* Progress indicator */}
      {step && (
        <div className="px-6 mb-8">
          <div className="flex space-x-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i < step ? "bg-primary" : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl text-foreground mb-8">{title}</h1>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
};

export default OnboardingLayout;
