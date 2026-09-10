'use client';

import IntegrationRow from '@/components/dashboard/IntegrationRow';

/* ── SVG Icon helpers ── */
const AppleAndroidIcon = () => (
  <div className="flex gap-1 items-center">
    {/* Apple */}
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#26344D]" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
    {/* Android */}
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#78C257]" fill="currentColor">
      <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48A5.84 5.84 0 0 0 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31A5.983 5.983 0 0 0 6 7h12a5.983 5.983 0 0 0-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z" />
    </svg>
  </div>
);

const GoogleBusinessIcon = () => (
  <svg viewBox="0 0 40 40" className="w-8 h-8">
    <circle cx="20" cy="20" r="20" fill="#4285F4" />
    <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial">G</text>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 40 40" className="w-8 h-8">
    <circle cx="20" cy="20" r="20" fill="#1877F2" />
    <path d="M22.5 20h-2v8h-3v-8h-1.5v-3H17.5v-1.5c0-2 1-3.5 3-3.5H23v3h-1.5c-.6 0-.5.4-.5.8V17H23l-.5 3z" fill="white" />
  </svg>
);

const WebchatIcon = () => (
  <svg viewBox="0 0 40 40" className="w-8 h-8">
    <circle cx="20" cy="20" r="20" fill="#EEF4FF" />
    <path d="M20 10c-5.5 0-10 4-10 9 0 3 1.6 5.6 4 7.3V30l3.8-2.1c.7.1 1.4.1 2.2.1 5.5 0 10-4 10-9s-4.5-9-10-9z" fill="#2563EB" />
    <circle cx="15" cy="19" r="1.5" fill="white" />
    <circle cx="20" cy="19" r="1.5" fill="white" />
    <circle cx="25" cy="19" r="1.5" fill="white" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 40 40" className="w-8 h-8">
    <circle cx="20" cy="20" r="20" fill="#25D366" />
    <path d="M20 11c-5 0-9 4-9 9 0 1.6.4 3.1 1.2 4.4L11 30l5.8-1.5c1.3.7 2.7 1.1 4.2 1.1 5 0 9-4 9-9s-4-9.6-10-9.6zm0 17.4c-1.4 0-2.7-.4-3.8-1l-.3-.2-3.4.9.9-3.3-.2-.3c-.7-1.2-1.1-2.5-1.1-3.9 0-4.1 3.4-7.5 7.5-7.5s7.5 3.4 7.5 7.5-3.4 7.8-7.1 7.8zm4.1-5.6c-.2-.1-1.3-.6-1.5-.7s-.3-.1-.5.1-.5.7-.7.8-.3.2-.5.1c-.6-.3-1.2-.7-1.7-1.1-.5-.5-.9-1-1.3-1.6-.1-.2 0-.3.1-.5l.4-.4c.1-.1.1-.2.2-.3s0-.2-.1-.3l-.7-1.6c-.1-.4-.3-.4-.5-.4h-.4c-.2 0-.4.1-.6.3-.5.5-.8 1.2-.8 1.9 0 1.1.8 2.2 1.7 3.1 1.5 1.5 3.1 2.4 4.8 2.7.5.1.9 0 1.3-.2.4-.2.7-.7.8-1.2v-.5c-.1 0-.2-.1-.5-.2z" fill="white" />
  </svg>
);

const StripeIcon = () => (
  <div className="w-9 h-9 bg-[#635BFF] rounded-lg flex items-center justify-center">
    <svg viewBox="0 0 40 40" className="w-6 h-6">
      <path d="M18.5 16.5c0-1.1.9-1.6 2.3-1.6 2.1 0 4.7.6 6.8 1.7v-6.4c-2.3-.9-4.5-1.3-6.8-1.3-5.5 0-9.2 2.9-9.2 7.8 0 7.6 10.5 6.4 10.5 9.6 0 1.3-1.1 1.7-2.6 1.7-2.3 0-5.2-.9-7.5-2.3v6.5c2.5 1.1 5.1 1.6 7.5 1.6 5.7 0 9.6-2.8 9.6-7.8-.1-8.2-10.6-6.7-10.6-9.5z" fill="white" />
    </svg>
  </div>
);

export default function LaunchpadPage() {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto light-scroll items-center px-4 py-8 bg-[#F8FAFC]">
      {/* Heading */}
      <h2 className="text-[17px] font-semibold text-[#26344D] mb-5 text-center">
        Let&apos;s get you on the path to success
      </h2>

      {/* Integration card */}
      <div
        className="w-full bg-white border border-[#E2E8F0] rounded-lg overflow-hidden"
        style={{ maxWidth: 520 }}
      >
        {/* ROW 1 — Mobile App */}
        <IntegrationRow
          icon={<AppleAndroidIcon />}
          description="Download our app and engage with your leads on the go!"
          buttonLabel="Send Link"
          buttonVariant="green"
        />

        {/* ROW 2 — Google Business Profile */}
        <IntegrationRow
          icon={<GoogleBusinessIcon />}
          description="Manage your Google Business Profile within your CRM! Monitor and reply to your Google Business Profile reviews."
          buttonLabel="Connect"
          buttonVariant="blue"
        />

        {/* ROW 3 — Facebook */}
        <IntegrationRow
          icon={<FacebookIcon />}
          description="Connect directly with prospects and customers via Messenger in Conversation and sync your Facebook leads with our CRM."
          buttonLabel="Connect"
          buttonVariant="blue"
        />

        {/* ROW 4 — Webchat */}
        <IntegrationRow
          icon={<WebchatIcon />}
          description="Generate leads from your website by connecting webchat widget."
          subtext="(The chat widget status check may not be accurate, if the widget code is not directly embedded within the website)"
          buttonLabel="Connect"
          buttonVariant="blue"
        />

        {/* ROW 5 — WhatsApp */}
        <IntegrationRow
          icon={<WhatsAppIcon />}
          title="Integrate WhatsApp"
          description="Connect your WhatsApp Business account for instant, real-time communication and reach out to your customers on their preferred platform"
          buttonLabel="Connect"
          buttonVariant="blue"
        />

        {/* ROW 6 — Stripe */}
        <IntegrationRow
          icon={<StripeIcon />}
          description="Connect your Stripe account to start accepting payments."
          subtext="(Existing stripe API integration will continue to work, but it is advised to use Stripe API directly for more security)"
          buttonLabel="Connect"
          buttonVariant="blue"
        />
      </div>

      {/* Spacer so the page can grow for future rows */}
      <div className="h-10" />
    </div>
  );
}
