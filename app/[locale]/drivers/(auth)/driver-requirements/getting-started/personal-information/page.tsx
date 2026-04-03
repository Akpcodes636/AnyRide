"use client";
import { useRouter } from "next/navigation";
import { useDriverVerificationStatus, useMyDriverDocuments } from "@/hooks/useApiHooks";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function VerificationsPage() {
  const router = useRouter();
  const { data: verificationStatus, isLoading: isStatusLoading } = useDriverVerificationStatus();
  const { data: documents, isLoading: isDocumentsLoading } = useMyDriverDocuments();

  const isLoading = isStatusLoading || isDocumentsLoading;

  // Debug: Log what we're getting from the API
  console.log('Documents from API:', documents);
  console.log('Verification status from API:', verificationStatus);

  // Define verification types with their document type identifiers
  const verificationTypes = [
    {
      id: "drivers_license",
      label: "Driver's License",
      description: "Verify your driving license.",
      route: "/drivers/verifications/drivers-license",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <circle cx="8" cy="12" r="2" />
          <path d="M14 10h4M14 14h2" />
        </svg>
      ),
    },
    {
      id: "national_id",
      label: "National ID / Passport",
      description: "Verify your identity or passport.",
      route: "/drivers/verifications/national-id",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2z" />
          <path d="M3 21v-1a9 9 0 0 1 18 0v1" />
        </svg>
      ),
    },
    {
      id: "profile_photo",
      label: "Profile Photo (Selfie)",
      description: "Verify your profile picture.",
      route: "/drivers/verifications/profile-photo",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      ),
    },
  ];

  // Get document status for each verification type
  const getDocumentStatus = (verificationId: string) => {
    // Handle case where documents is not an array or is undefined/null
    if (!documents || !Array.isArray(documents) || documents.length === 0) {
      return { status: 'pending', text: 'Verification required', color: 'bg-[#FEF5E7] border border-[#FEF5E7] text-[#F59E0B]' };
    }

    const document = documents.find(doc => doc.document_type === verificationId);
    
    if (!document) {
      return { status: 'pending', text: 'Verification required', color: 'bg-[#FEF5E7] border border-[#FEF5E7] text-[#F59E0B]' };
    }

    switch (document.verification_status) {
      case 'verified':
        return { status: 'verified', text: 'Verified', color: 'bg-[#E9F9EE] border border-[#22C553] text-green-600' };
      case 'pending':
        return { status: 'pending', text: 'Under review', color: 'bg-[#FEF5E7] border border-[#FEF5E7] text-[#F59E0B]' };
      case 'rejected':
        return { status: 'rejected', text: 'Rejected', color: 'bg-[#FEE2E2] border border-[#EF4444] text-red-600' };
      default:
        return { status: 'pending', text: 'Verification required', color: 'bg-[#FEF5E7] border border-[#FEF5E7] text-[#F59E0B]' };
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-[#02093A]" />
          <span className="text-gray-600">Loading verification status...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto py-[100px]">
        <div className="mb-8">
          <h2 className="font-bold text-[#02093A] mb-2">Verifications</h2>
          {verificationStatus && (
            <p className="text-[16px] text-[#545454]">
              Overall Status: <span className={`font-semibold ${
                verificationStatus.overall_status === 'approved' ? 'text-green-600' :
                verificationStatus.overall_status === 'pending' ? 'text-yellow-600' :
                verificationStatus.overall_status === 'rejected' ? 'text-red-600' :
                'text-gray-600'
              }`}>
                {verificationStatus.overall_status?.charAt(0).toUpperCase() + verificationStatus.overall_status?.slice(1) || 'Unknown'}
              </span>
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {verificationTypes.map((item) => {
            const documentStatus = getDocumentStatus(item.id);
            
            return (
              <button
                key={item.id}
                onClick={() => router.push(item.route)}
                className="w-full flex items-center justify-between bg-[#F5F5F7] border border-[#E5E7EB] hover:border-gray-300 transition-all rounded-[16px] px-[20px] py-4 text-left group cursor-pointer"
              >
                {/* Left: icon + text */}
                <div className="flex items-center gap-3">
                  {/* Icon circle */}
                  <div className="mt-0.5 w-[40px] h-[40px] rounded-full bg-[#E6E7ED] flex items-center justify-center text-gray-500 shrink-0">
                    {item.icon}
                  </div>

                  {/* Text */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[18px] font-semibold text-[#02093A] leading-snug">
                        {item.label}
                      </span>
                      {getStatusIcon(documentStatus.status)}
                    </div>
                    <span className="text-[16px] text-[#353A61] leading-[120%]">
                      {item.description}
                    </span>
                    <span
                      className={`mt-1 self-start text-[14px] font-medium px-2.5 py-0.5 rounded-full ${documentStatus.color}`}
                    >
                      {documentStatus.text}
                    </span>
                  </div>
                </div>

                {/* Chevron */}
                <svg
                  width="18"
                  height="18"
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

        {/* Overall verification status message */}
        {verificationStatus?.overall_status === 'approved' && (
          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-green-800 font-medium">
                Congratulations! All your documents have been verified. You can now start accepting rides.
              </p>
            </div>
          </div>
        )}

        {verificationStatus?.overall_status === 'pending' && (
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <p className="text-yellow-800">
                Your documents are under review. We'll notify you once the verification is complete.
              </p>
            </div>
          </div>
        )}

        {verificationStatus?.overall_status === 'rejected' && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-red-800 font-medium">Some documents were rejected.</p>
                <p className="text-red-600 text-sm mt-1">
                  Please check the rejected items and re-upload the required documents.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}