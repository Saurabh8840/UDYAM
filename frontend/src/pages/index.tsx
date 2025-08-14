// pages/index.tsx
import { useEffect, useMemo, useState } from "react";
import {
  Phone,
  CreditCard,
  Building,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import { formSchema as fallbackSchema } from "../types/formSchema";
import type { FormField, FormSchema } from "../types/formSchema";
import { validateField } from "../utils/validateField";
import ProgressTracker from "../components/ProgressTracker";
import FormStep from "../components/FormStep";
import { submitForm, checkHealth, getSchema } from "../utils/api";

interface FormData {
  [key: string]: string;
}

interface ValidationErrors {
  [key: string]: string;
}

export default function UdyamForm() {
  const [schema, setSchema] = useState<FormSchema | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);     // for OTP button
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bootMsg, setBootMsg] = useState<string>("Loading form…");

  // Boot: health + schema
  useEffect(() => {
    (async () => {
      try {
        const health = await checkHealth();
        console.log("Backend health:", health);
      } catch (err) {
        console.warn("Backend health failed:", err);
      }

      try {
        const s = await getSchema();
        setSchema(s);
        setBootMsg("");
        console.log("Schema from API:", s);
      } catch (err) {
        console.warn("Schema API failed, using fallback:", err);
        setSchema(fallbackSchema);
        setBootMsg("");
      }
    })();
  }, []);

  const totalSteps = useMemo(() => {
    if (!schema) return 0;
    return Object.keys(schema).length;
  }, [schema]);

  const currentFields: FormField[] = useMemo(() => {
    if (!schema) return [];
    return currentStep === 1 ? schema.step1 : schema.step2;
  }, [schema, currentStep]);

  const handleFieldChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const handleFieldBlur = (id: string) => {
    if (!schema) return;
    const fields = [...schema.step1, ...schema.step2];
    const field = fields.find((f) => f.id === id);
    if (field) {
      const error = validateField(field, formData[id] || "");
      setErrors((prev) => ({ ...prev, [id]: error }));
    }
  };

  const validateCurrentStep = (): boolean => {
    if (!schema) return false;
    const newErrors: ValidationErrors = {};
    let isValid = true;

    currentFields.forEach((field) => {
      const error = validateField(field, formData[field.id] || "");
      if (error) {
        newErrors[field.id] = error;
        isValid = false;
      }
    });

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const handleGenerateOtp = () => {
    if (!formData.aadhaarNumber || !formData.ownerName) {
      setErrors((prev) => ({
        ...prev,
        aadhaarNumber: !formData.aadhaarNumber ? "Aadhaar number is required" : prev.aadhaarNumber,
        ownerName: !formData.ownerName ? "Name is required" : prev.ownerName,
      }));
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsOtpSent(true);
      setIsLoading(false);
      alert("OTP sent successfully to your registered mobile number!");
    }, 1000);
  };

  const handleNext = async () => {
    if (!schema) return;
    if (validateCurrentStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep((s) => s + 1);
      } else {
        // Final submit
        try {
          setIsSubmitting(true);
          const payload = {
            aadhaarNumber: formData.aadhaarNumber,
            ownerName: formData.ownerName,
            otp: formData.otp,
            panNumber: formData.panNumber,
          };
          const result = await submitForm(payload as any);
          alert("Form submitted successfully!");
          console.log("Saved:", result);
          // Optional: reset form
          setFormData({});
          setErrors({});
          setIsOtpSent(false);
          setCurrentStep(1);
        } catch (e: any) {
          console.error(e);

          // If backend sent { errors: { fieldId: "message" } }, show them on the form
          const serverErrors = e?.details?.errors as Record<string, string> | undefined;
          if (serverErrors) {
            setErrors(serverErrors);

            // Jump to the step that contains the first invalid field
            const first = Object.keys(serverErrors)[0];
            const inStep1 = schema.step1.some((f) => f.id === first);
            setCurrentStep(inStep1 ? 1 : 2);

            // Also show a toast/alert with a summary
            alert(Object.values(serverErrors).join("\n"));
          } else {
            alert(e?.message || "Submission failed");
          }
        } finally {
          setIsSubmitting(false);
        }
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const isStepValid = useMemo(() => {
    if (!schema) return false;
    return currentFields.every(
      (field) => formData[field.id] && !validateField(field, formData[field.id])
    );
  }, [schema, currentFields, formData]);

  if (!schema) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        {bootMsg || "Loading…"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-indigo-600 text-white px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <Building className="w-5 h-5 text-indigo-600" />
            </div>
            <h1 className="text-xl font-semibold">Ministry of MSME</h1>
          </div>
          <h2 className="text-2xl font-bold mb-1">UDYAM REGISTRATION FORM</h2>
          <p className="text-indigo-200 text-sm">
            For New Enterprise who are not Registered yet as MSME
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ProgressTracker currentStep={currentStep} totalSteps={totalSteps} />

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Step Header */}
          <div className="bg-blue-500 text-white px-6 py-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              {currentStep === 1 ? (
                <>
                  <Phone className="w-5 h-5" />
                  Aadhaar Verification With OTP
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Additional Details
                </>
              )}
            </h3>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <div className="space-y-6">
              {currentFields.map((field) => (
                <FormStep
                  key={field.id}
                  field={field}
                  value={formData[field.id] || ""}
                  error={errors[field.id] || ""}
                  onChange={handleFieldChange}
                  onBlur={handleFieldBlur}
                />
              ))}

              {/* OTP Generation for Step 1 */}
              {currentStep === 1 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleGenerateOtp}
                      disabled={
                        isLoading ||
                        !formData.aadhaarNumber ||
                        !formData.ownerName
                      }
                      className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Generating OTP...
                        </>
                      ) : (
                        <>
                          <Phone className="w-4 h-4" />
                          {isOtpSent ? "Regenerate OTP" : "Generate OTP"}
                        </>
                      )}
                    </button>
                  </div>
                  {isOtpSent && (
                    <p className="text-sm text-green-600 mt-2 text-center">
                      ✓ OTP sent to your registered mobile number
                    </p>
                  )}
                </div>
              )}

              {/* Consent Checkbox for Step 1 */}
              {currentStep === 1 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      defaultChecked
                    />
                    <span className="text-sm text-gray-700 leading-relaxed">
                      I, the holder of the above Aadhaar, hereby give my consent
                      to Ministry of MSME, Government of India, for using my
                      Aadhaar number as allotted by UIDAI for Udyam
                      Registration. NIC / Ministry of MSME, Government of India,
                      have informed me that my Aadhaar data will not be
                      stored/shared.
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t">
              {currentStep > 1 && (
                <button
                  onClick={handleBack}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all duration-200"
                >
                  ← Back
                </button>
              )}

              <button
                onClick={handleNext}
                disabled={
                  !isStepValid ||
                  (currentStep === 1 && !isOtpSent) ||
                  isSubmitting
                }
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
              >
                {currentStep === totalSteps ? (
                  <>
                    {isSubmitting ? (
                      <>Submitting...</>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Submit Registration
                      </>
                    )}
                  </>
                ) : (
                  <>
                    Continue
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>
            © 2025 Ministry of Micro, Small & Medium Enterprises, Government of
            India
          </p>
        </div>
      </div>
    </div>
  );
}
