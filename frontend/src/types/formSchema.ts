export interface FormField {
  id: string;
  label: string;
  type: string;
  validation: string;
}

export interface FormSchema {
  step1: FormField[];
  step2: FormField[];
}

export const formSchema: FormSchema = {
  step1: [
    { id: "aadhaarNumber", label: "Aadhaar Number", type: "text", validation: "^\\d{12}$" },
    { id: "ownerName", label: "Name as per Aadhaar", type: "text", validation: "^[A-Za-z ]{3,100}$" },
    { id: "otp", label: "OTP", type: "text", validation: "^\\d{6}$" }
  ],
  step2: [
    { id: "panNumber", label: "PAN Number", type: "text", validation: "^[A-Z]{5}\\d{4}[A-Z]$" }
  ]
};
