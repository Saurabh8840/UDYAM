
import type { FormField as FieldType } from "../types/formSchema";
import { Circle, CheckCircle, User, CreditCard, Phone, Building } from "lucide-react";

interface FormStepProps {
  field: FieldType;
  value: string;
  error: string;
  onChange: (id: string, value: string) => void;
  onBlur: (id: string) => void;
}

const FormStep: React.FC<FormStepProps> = ({ field, value, error, onChange, onBlur }) => {
  const getIcon = () => {
    switch (field.id) {
      case 'aadhaarNumber': return <CreditCard className="w-5 h-5" />;
      case 'ownerName': return <User className="w-5 h-5" />;
      case 'otp': return <Phone className="w-5 h-5" />;
      case 'panNumber': return <Building className="w-5 h-5" />;
      default: return <Circle className="w-5 h-5" />;
    }
  };

  const formatValue = (inputValue: string) => {
    if (field.id === 'aadhaarNumber') {
      return inputValue.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    }
    if (field.id === 'panNumber') {
      return inputValue.toUpperCase();
    }
    return inputValue;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = formatValue(rawValue);
    const cleanValue = field.id === 'aadhaarNumber' ? formattedValue.replace(/\s/g, '') : formattedValue;
    onChange(field.id, cleanValue);
  };

  const displayValue = field.id === 'aadhaarNumber' ? formatValue(value) : value;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
        <span className="text-gray-400">{getIcon()}</span>
        {field.label}
        <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          type={field.type}
          value={displayValue}
          onChange={handleChange}
          onBlur={() => onBlur(field.id)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
            error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
          }`}
          placeholder={`Enter your ${field.label.toLowerCase()}`}
        />
        {field.id === 'aadhaarNumber' && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-xs text-gray-400">12 digits</span>
          </div>
        )}
        {field.id === 'panNumber' && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-xs text-gray-400">ABCDE1234F</span>
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <Circle className="w-3 h-3 fill-current" />
          {error}
        </p>
      )}
      {!error && value && (
        <p className="text-sm text-green-600 flex items-center gap-1">
          <CheckCircle className="w-3 h-3" />
          Valid format
        </p>
      )}
    </div>
  );
};

export default FormStep;
