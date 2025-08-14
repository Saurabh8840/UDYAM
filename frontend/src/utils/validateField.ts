import type { FormField } from "../types/formSchema";

export const validateField = (field: FormField, value: string): string => {
  if (!value.trim()) {
    return `${field.label} is required`;
  }

  const regex = new RegExp(field.validation);
  if (!regex.test(value)) {
    switch (field.id) {
      case 'aadhaarNumber': return 'Aadhaar number must be exactly 12 digits';
      case 'ownerName': return 'Name should contain only letters and spaces (3-100 characters)';
      case 'otp': return 'OTP must be exactly 6 digits';
      case 'panNumber': return 'PAN format should be like ABCDE1234F';
      default: return `Invalid ${field.label.toLowerCase()} format`;
    }
  }
  return '';
};
