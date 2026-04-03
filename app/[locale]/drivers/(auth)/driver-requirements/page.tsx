"use client";

import React from "react";
import { stepOne } from "@/app/utils/Content";
import { useRouter } from "next/navigation";
import { useDriverVerificationStatus, useMyDriverDocuments, useCurrentUser } from "@/hooks/useApiHooks";
import { useAppStore } from "@/store/useAppStore";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function GettingStartedPage() {
  const router = useRouter();
  const { data: verificationStatus, isLoading: isStatusLoading } = useDriverVerificationStatus();
  const { data: documents, isLoading: isDocumentsLoading } = useMyDriverDocuments();
  const { data: currentUser } = useCurrentUser();
  const { driverOnboardingStatus, setDriverOnboardingStatus } = useAppStore();

  const isLoading = isStatusLoading || isDocumentsLoading;

  // Update store with latest verification status
  React.useEffect(() => {
    if (verificationStatus) {
      const status = verificationStatus.overall_status === 'approved' ? 'verified' :
                   verificationStatus.overall_status === 'pending' ? 'under_review' :
                   verificationStatus.overall_status === 'rejected' ? 'rejected' :
                   'not_started';
      setDriverOnboardingStatus(status);
    }
  }, [verificationStatus, setDriverOnboardingStatus]);

  // Get completion status for each step
  const getStepStatus = (stepId: string | number) => {
    if (isLoading) return 'loading';
    
    switch (stepId) {
      case 'personal-information':
        return currentUser ? 'completed' : 'pending';
      case 'verifications':
        if (!documents || documents.length === 0) return 'pending';
        const hasAllDocuments = documents.length >= 3; // Assuming 3 required documents
        const allVerified = documents.every(doc => doc.verification_status === 'verified');
        if (hasAllDocuments && allVerified) return 'completed';
        if (hasAllDocuments) return 'pending'; // Some pending/rejected
        return 'pending';
      case 'vehicle-details':
        // This would need to be implemented with vehicle API
        return 'pending';
      default:
        return 'pending';
    }
  };

  // Update step badges with real status
  const updatedStepOne = stepOne.map(step => {
    const status = getStepStatus(step.id);
    
    let badge = { text: '', color: '' };
    
    switch (status) {
      case 'completed':
        badge = { text: 'Completed', color: 'bg-[#E9F9EE] border border-[#22C553] text-green-600' };
        break;
      case 'pending':
        badge = { text: 'Action required', color: 'bg-[#FEF5E7] border border-[#FEF5E7] text-[#F59E0B]' };
        break;
      case 'loading':
        badge = { text: 'Loading...', color: 'bg-gray-100 border border-gray-300 text-gray-600' };
        break;
      default:
        badge = { text: 'Not started', color: 'bg-gray-100 border border-gray-300 text-gray-600' };
    }

    return { ...step, badge };
  });

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* ── Main ── */}
      <main className="flex-1 flex flex-col items-center px-4 pt-[80px] pb-20">
        <div className="w-full container mx-auto">

          {/* Title block */}
          <div className="mb-8">
            <h2 className="mb-2 w-full max-w-[941px] mx-auto text-[32px] font-bold text-[#02093A]">
              Before you get started
            </h2>
            <p className="text-[18px] text-[#545454] leading-[160%] tracking-[-2%] max-w-[941px] mx-auto w-full">
              To keep riders safe and maintain quality, we&apos;ll need a few
              details from you.
            </p>
            
            {/* Overall status indicator */}
            {verificationStatus && (
              <div className="mt-4 flex items-center gap-2 max-w-[941px] mx-auto">
                {verificationStatus.overall_status === 'approved' && (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-600 font-medium">
                      All requirements completed! You're ready to drive.
                    </span>
                  </>
                )}
                {verificationStatus.overall_status === 'pending' && (
                  <>
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    <span className="text-yellow-600 font-medium">
                      Your verification is under review.
                    </span>
                  </>
                )}
                {verificationStatus.overall_status === 'rejected' && (
                  <>
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="text-red-600 font-medium">
                      Some items need attention.
                    </span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#02093A]" />
              <span className="mt-2 text-gray-600">Loading your onboarding status...</span>
            </div>
          )}

          {/* Steps list */}
          {!isLoading && (
            <div className="flex flex-col gap-3">
              {updatedStepOne.map((step) => {
                const status = getStepStatus(String(step.id));
                const StatusIcon = status === 'completed' ? CheckCircle : 
                                 status === 'pending' ? AlertCircle : null;
                
                return (
                  <button
                    key={step.id}
                    onClick={() => router.push(step.route)}
                    className="w-full flex items-center justify-between bg-[#F5F5F7] transition-all rounded-[24px] w-full max-w-[941px] mx-auto h-[88px] px-4 text-left group cursor-pointer hover:border-gray-300 border border-transparent"
                  >
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-[14px] md:text-[18px] lg:text-[20px] leading-[120%] font-semibold text-[#000000]">
                        {step.label}
                      </span>
                      {StatusIcon && (
                        <StatusIcon className={`w-5 h-5 ${
                          status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                        }`} />
                      )}
                      <span
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${step.badge.color}`}
                      >
                        {step.badge.text}
                      </span>
                    </div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#9ca3af"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0 ml-3 group-hover:stroke-gray-600 transition-colors"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                );
              })}
            </div>
          )}

          {/* Completion message */}
          {verificationStatus?.overall_status === 'approved' && !isLoading && (
            <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-[24px] max-w-[941px] mx-auto">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="text-green-800 font-semibold text-lg mb-1">
                    Congratulations! 🎉
                  </h3>
                  <p className="text-green-700">
                    You've completed all the requirements and are now ready to start earning with AnyRide. 
                    Go to your driver dashboard to set your availability and start accepting rides.
                  </p>
                  <button
                    onClick={() => router.push('/drivers')}
                    className="mt-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Go to Driver Dashboard
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
