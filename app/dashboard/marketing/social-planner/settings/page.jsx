"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Settings,
  Bell,
  CalendarDays,
  ShieldCheck,
  Save,
  ChevronRight,
  Plus,
  Check,
  X,
  AlertCircle,
  Clock3,
} from "lucide-react";

export default function SocialPlannerSettingsPage() {
  const [autoPublish, setAutoPublish] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [approval, setApproval] = useState(false);

  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showConnect, setShowConnect] = useState(false);
  const [saved, setSaved] = useState(false);

  const [timezone, setTimezone] = useState("Asia/Karachi");
  const [defaultTime, setDefaultTime] = useState("10:00");

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const navigation = [
    {
      label: "Planner",
      href: "/dashboard/marketing/social-planner",
    },
    {
      label: "Content",
      href: "/dashboard/marketing/social-planner/content",
    },
    {
      label: "Comments",
      href: "/dashboard/marketing/social-planner/comments",
    },
    {
      label: "Statistics",
      href: "/dashboard/marketing/social-planner/statistics",
    },
    {
      label: "Social Listening",
      href: "/dashboard/marketing/social-planner/social-listening",
    },
    {
      label: "Settings",
      href: "/dashboard/marketing/social-planner/settings",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f6f8] text-[#26344d]">
      {/* =========================================================
          TOP HEADER
      ========================================================= */}

      <header className="border-b border-slate-200 bg-white">
        <div className="flex h-[55px] items-center gap-6 px-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Settings className="h-4 w-4" />
            </div>

            <strong className="text-[14px] text-slate-800">
              Marketing
            </strong>

            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />

            <span className="text-[11px] font-medium text-blue-600">
              Social Planner
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {saved && (
              <span className="mr-2 flex items-center gap-1.5 text-[9px] font-medium text-emerald-600">
                <Check className="h-3 w-3" />
                Changes saved
              </span>
            )}

            <button
              type="button"
              onClick={handleSave}
              className="flex h-8 items-center gap-1.5 rounded-md bg-blue-600 px-3 text-[10px] font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Save className="h-3 w-3" />
              Save Changes
            </button>
          </div>
        </div>

        {/* =======================================================
            SOCIAL PLANNER NAV
        ======================================================= */}

        <div className="flex h-[39px] items-center gap-6 overflow-x-auto border-t border-slate-100 px-5">
          <strong className="shrink-0 text-[13px] text-slate-700">
            Social Planner
          </strong>

          {navigation.map((item) => {
            const active =
              item.label === "Settings";

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative flex h-full shrink-0 items-center text-[11px] transition ${
                  active
                    ? "font-medium text-blue-600"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {item.label}

                {active && (
                  <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-t-full bg-blue-600" />
                )}
              </Link>
            );
          })}
        </div>
      </header>

      {/* =========================================================
          MAIN
      ========================================================= */}

      <main className="p-4">
        <div className="mx-auto max-w-[1050px]">
          {/* PAGE HEADER */}

          <div className="mb-4">
            <h1 className="text-[17px] font-semibold text-slate-800">
              Social Planner Settings
            </h1>

            <p className="mt-1 text-[10px] text-slate-400">
              Manage publishing preferences and social planner settings.
            </p>
          </div>

          {/* =====================================================
              GENERAL SETTINGS
          ===================================================== */}

          <section className="rounded-lg border border-slate-200 bg-white">
            <div className="border-b border-slate-100 p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Settings className="h-4 w-4" />
                </div>

                <div>
                  <h2 className="text-[12px] font-semibold text-slate-700">
                    General Settings
                  </h2>

                  <p className="mt-1 text-[9px] text-slate-400">
                    Configure how Social Planner behaves.
                  </p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              <SettingRow
                icon={CalendarDays}
                title="Auto publish scheduled posts"
                description="Automatically publish posts when their scheduled time is reached."
                enabled={autoPublish}
                onToggle={() => setAutoPublish((value) => !value)}
              />

              <SettingRow
                icon={Bell}
                title="Publishing notifications"
                description="Receive notifications when scheduled content is published or fails."
                enabled={notifications}
                onToggle={() => setNotifications((value) => !value)}
              />

              <SettingRow
                icon={ShieldCheck}
                title="Require approval before publishing"
                description="Require content approval before a scheduled post can be published."
                enabled={approval}
                onToggle={() => setApproval((value) => !value)}
              />
            </div>
          </section>

          {/* =====================================================
              SCHEDULING
          ===================================================== */}

          <section className="mt-4 rounded-lg border border-slate-200 bg-white">
            <div className="border-b border-slate-100 p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                  <Clock3 className="h-4 w-4" />
                </div>

                <div>
                  <h2 className="text-[12px] font-semibold text-slate-700">
                    Scheduling Preferences
                  </h2>

                  <p className="mt-1 text-[9px] text-slate-400">
                    Choose your default timezone and publishing time.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[10px] font-medium text-slate-600">
                  Timezone
                </label>

                <select
                  value={timezone}
                  onChange={(event) => setTimezone(event.target.value)}
                  className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[10px] text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="Asia/Karachi">
                    Asia/Karachi
                  </option>

                  <option value="UTC">
                    UTC
                  </option>

                  <option value="America/New_York">
                    America/New_York
                  </option>

                  <option value="America/Los_Angeles">
                    America/Los_Angeles
                  </option>

                  <option value="Europe/London">
                    Europe/London
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-[10px] font-medium text-slate-600">
                  Default publishing time
                </label>

                <input
                  type="time"
                  value={defaultTime}
                  onChange={(event) => setDefaultTime(event.target.value)}
                  className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[10px] text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </section>

          {/* =====================================================
              SOCIAL ACCOUNTS
          ===================================================== */}

          <section className="mt-4 rounded-lg border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-100 p-4">
              <div>
                <h2 className="text-[12px] font-semibold text-slate-700">
                  Social Accounts
                </h2>

                <p className="mt-1 text-[9px] text-slate-400">
                  Connect and manage the social accounts used by Social Planner.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowConnect(true)}
                className="flex h-8 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 text-[9px] font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              >
                <Plus className="h-3 w-3" />
                Connect Account
              </button>
            </div>

            {/* Empty state — no fake connected accounts */}

            <div className="p-6">
              <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50/50 p-8 text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm">
                  <RadioIcon />
                </div>

                <h3 className="mt-3 text-[11px] font-semibold text-slate-700">
                  No social accounts connected
                </h3>

                <p className="mx-auto mt-1 max-w-[380px] text-[9px] leading-4 text-slate-400">
                  Connect a social account to publish and manage content
                  through Social Planner.
                </p>

                <button
                  type="button"
                  onClick={() => setShowConnect(true)}
                  className="mt-4 inline-flex h-8 items-center gap-1.5 rounded-md bg-blue-600 px-3 text-[9px] font-semibold text-white transition hover:bg-blue-700"
                >
                  <Plus className="h-3 w-3" />
                  Connect Social Account
                </button>
              </div>
            </div>
          </section>

          {/* =====================================================
              SAVE AREA
          ===================================================== */}

          <div className="mt-4 flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4">
            <div>
              <p className="text-[10px] font-medium text-slate-700">
                Save your changes
              </p>

              <p className="mt-1 text-[9px] text-slate-400">
                Your settings will be used by the Social Planner.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSave}
              className="flex h-9 items-center gap-2 rounded-md bg-blue-600 px-4 text-[10px] font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Save className="h-3.5 w-3.5" />
              Save Changes
            </button>
          </div>
        </div>
      </main>

      {/* =========================================================
          CONNECT ACCOUNT MODAL
      ========================================================= */}

      {showConnect && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowConnect(false);
            }
          }}
        >
          <div className="w-full max-w-[420px] rounded-xl border border-slate-200 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-4">
              <div>
                <h2 className="text-[13px] font-semibold text-slate-800">
                  Connect Social Account
                </h2>

                <p className="mt-1 text-[9px] text-slate-400">
                  Choose a platform to connect.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowConnect(false)}
                className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2 p-4">
              <AccountOption
                icon={Facebook}
                title="Facebook"
                description="Connect a Facebook page"
                className="bg-blue-50 text-blue-600"
                selected={selectedAccount === "Facebook"}
                onClick={() => setSelectedAccount("Facebook")}
              />

              <AccountOption
                icon={Instagram}
                title="Instagram"
                description="Connect an Instagram account"
                className="bg-pink-50 text-pink-600"
                selected={selectedAccount === "Instagram"}
                onClick={() => setSelectedAccount("Instagram")}
              />
            </div>

            <div className="border-t border-slate-100 p-4">
              <div className="mb-3 flex gap-2 rounded-md bg-amber-50 p-3 text-amber-700">
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />

                <p className="text-[9px] leading-4">
                  Social account connection requires backend/OAuth
                  integration. This frontend currently only provides the
                  interface.
                </p>
              </div>

              <button
                type="button"
                disabled={!selectedAccount}
                onClick={() => {
                  setShowConnect(false);
                  setSelectedAccount(null);
                }}
                className="flex h-9 w-full items-center justify-center rounded-md bg-blue-600 text-[10px] font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================================================
   SETTING ROW
================================================================ */

function SettingRow({
  icon: Icon,
  title,
  description,
  enabled,
  onToggle,
}) {
  return (
    <div className="flex items-center gap-3 p-4">
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${
          enabled
            ? "bg-blue-50 text-blue-600"
            : "bg-slate-50 text-slate-400"
        }`}
      >
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-[10px] font-semibold text-slate-700">
          {title}
        </h3>

        <p className="mt-1 text-[9px] leading-4 text-slate-400">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label={title}
        onClick={onToggle}
        className={`relative h-5 w-9 shrink-0 rounded-full transition ${
          enabled ? "bg-blue-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            enabled ? "left-[18px]" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}

/* ================================================================
   ACCOUNT OPTION
================================================================ */

function AccountOption({
  icon: Icon,
  title,
  description,
  className,
  selected,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition ${
        selected
          ? "border-blue-300 bg-blue-50/50"
          : "border-slate-200 hover:border-blue-200 hover:bg-slate-50"
      }`}
    >
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-lg ${className}`}
      >
        <Icon className="h-4 w-4" />
      </div>

      <div className="flex-1">
        <p className="text-[10px] font-semibold text-slate-700">
          {title}
        </p>

        <p className="mt-0.5 text-[8px] text-slate-400">
          {description}
        </p>
      </div>

      {selected && (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
          <Check className="h-3 w-3" />
        </div>
      )}
    </button>
  );
}

/* ================================================================
   EMPTY STATE ICON
================================================================ */

function RadioIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="2.5" />
      <path d="M8.5 8.5a5 5 0 0 0 0 7" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M6 6a8.5 8.5 0 0 0 0 12" />
      <path d="M18 6a8.5 8.5 0 0 1 0 12" />
    </svg>
  );
}