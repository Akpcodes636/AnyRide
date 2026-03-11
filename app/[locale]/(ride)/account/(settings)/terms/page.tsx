"use client";

export default function TermsAndConditionsPanel() {
  return (
    <div className="w-full max-w-[831px]">
      {/* Version + Download */}
        <p className="text-[#34383F] text-[24px] font-normal tracking-[-2%] leading-[160%]">AnyRide terms & policy</p>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-semibold text-[#A20602]">v.1.1.0</span>
        <span className="text-sm text-[#8B8EA4]">
          Last updated: <strong className="text-[#02093A]">August 8, 2025</strong>
        </span>
      </div>
      <a
        href="#"
        className="text-sm text-[#A20602] underline underline-offset-2 hover:text-blue-800 transition-colors mb-4 inline-block"
      >
        Download as PDF
      </a>

      {/* Scrollable content box */}
      <div className="bg-[#F5F5F7] rounded-[8px] p-5 h-[260px] overflow-y-auto mb-6 text-sm text-[#02093A] leading-relaxed">
        <p className="mb-3">
          Welcome to <strong>AnyRide!</strong>
        </p>
        <p className="mb-3">
          Before you get started, here&apos;s the boring but important stuff. You are
          responsible for maintaining the confidentiality of your account details
          and for all activities that occur under your account. Content: Any
          content you submit remains yours, but you grant us a license to use as
          necessary for app functionality.
        </p>
        <p className="mb-3">
          You are responsible for maintaining the confidentiality of your account
          details and for all activities that occur under your account. Content:
          Any content you submit remains yours, but you grant us a license to
          use, display, and share it as necessary for app functionality.
        </p>
        <p className="mb-3">
          <strong>Limitations of Liability:</strong> We are not liable for any
          loss, damage, or inconvenience caused by the use or inability to use
          the app.
        </p>
        <p className="mb-3">
          <strong>Changes to Terms:</strong> We may update these terms from time
          to time. Continued use of the app after changes constitutes acceptance
          of the new terms.
        </p>
        <p>
          <strong>Contact:</strong> If you have any questions about these terms,
          please contact our support team through the app or via our website.
        </p>
      </div>

      {/* I agree button */}
      <button className="w-full bg-[#02093A] hover:bg-[#0a1660] active:scale-[0.99] transition-all text-white text-sm font-medium py-3.5 rounded-[8px]">
        I agree
      </button>
    </div>
  );
}