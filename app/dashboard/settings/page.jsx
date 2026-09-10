"use client";

export default function SettingsPage() {
  return (
    <div className="min-h-full p-6 bg-gray-50">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#171B3A] flex items-center gap-2">
          <span className="text-3xl">⚙️</span>
          Settings
        </h1>
        <p className="mt-2 text-sm text-[#64748B] border-l-4 border-blue-500 pl-3">
          Manage your workspace settings.
        </p>
      </div>

      {/* Settings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { icon: "👤", label: "Profile", desc: "Update your personal info" },
          { icon: "🔒", label: "Security", desc: "Password & 2FA settings" },
          { icon: "🔔", label: "Notifications", desc: "Manage alerts" },
          { icon: "🎨", label: "Appearance", desc: "Theme & display" },
          { icon: "🌍", label: "Preferences", desc: "Language & region" },
          { icon: "🔗", label: "Integrations", desc: "Connect your apps" },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#171B3A] transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                {item.icon}
              </span>
              <div>
                <h3 className="font-semibold text-[#171B3A] group-hover:text-blue-600 transition-colors">
                  {item.label}
                </h3>
                <p className="text-sm text-[#64748B] mt-0.5">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}