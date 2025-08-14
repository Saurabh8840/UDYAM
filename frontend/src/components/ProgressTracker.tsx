import { ChevronRight, CheckCircle } from "lucide-react";

interface ProgressTrackerProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={stepNumber} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                isCompleted
                  ? 'bg-green-500 border-green-500 text-white'
                  : isActive
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'bg-gray-100 border-gray-300 text-gray-500'
              }`}>
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{stepNumber}</span>
                )}
              </div>

              <div className="ml-3 flex-1">
                <div className={`text-sm font-medium ${
                  isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                }`}>
                  Step {stepNumber}
                </div>
                <div className="text-xs text-gray-400">
                  {stepNumber === 1 ? 'Aadhaar Verification' : 'Additional Details'}
                </div>
              </div>

              {stepNumber < totalSteps && (
                <ChevronRight className={`w-5 h-5 mx-4 ${
                  isCompleted ? 'text-green-400' : 'text-gray-300'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTracker;
