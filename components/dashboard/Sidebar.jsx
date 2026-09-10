"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Rocket,
  LayoutDashboard,
  MessageSquare,
  CalendarDays,
  Users,
  BriefcaseBusiness,
  CreditCard,
  Bot,
  Megaphone,
  Workflow,
  Globe,
  BookOpen,
  Image,
  Star,
  Settings,
  Search,
  ChevronDown,
  Phone,
  X,
  Store,
  Smartphone,
  Building2,
  UserCircle,
  ReceiptText,
  UserRound,
  GitBranch,
  Mail,
  PhoneCall,
  MessageCircle,
  Boxes,
  SlidersHorizontal,
  Tags,
  CheckSquare,
  MapPin,
  Bell,
  Plug,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* =========================================================
   MAIN DASHBOARD NAVIGATION
========================================================= */

const NAV_ITEMS_PRIMARY = [
  {
    label: "Launchpad",
    icon: Rocket,
    href: "/dashboard",
  },
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard/dashboard",
  },
  {
    label: "Conversations",
    icon: MessageSquare,
    href: "/dashboard/conversations",
  },
  {
    label: "Calendars",
    icon: CalendarDays,
    href: "/dashboard/calendars",
  },
  {
    label: "Contacts",
    icon: Users,
    href: "/dashboard/contacts",
  },
  {
    label: "Opportunities",
    icon: BriefcaseBusiness,
    href: "/dashboard/opportunities",
  },
  {
    label: "Payments",
    icon: CreditCard,
    href: "/dashboard/payments",
  },
];

const NAV_ITEMS_SECONDARY = [
  {
    label: "AI Agents",
    icon: Bot,
    href: "/dashboard/ai-agents",
  },
  {
    label: "Marketing",
    icon: Megaphone,
    href: "/dashboard/marketing",
  },
  {
    label: "Automation",
    icon: Workflow,
    href: "/dashboard/automation",
  },
  {
    label: "Sites",
    icon: Globe,
    href: "/dashboard/sites",
  },
  {
    label: "Memberships",
    icon: BookOpen,
    href: "/dashboard/memberships",
  },
  {
    label: "Media Storage",
    icon: Image,
    href: "/dashboard/media-storage",
  },
  {
    label: "Reputation",
    icon: Star,
    href: "/dashboard/reputation",
  },
  {
    label: "Reporting",
    icon: LayoutDashboard,
    href: "/dashboard/reporting",
  },
  {
    label: "App Marketplace",
    icon: Store,
    href: "/dashboard/app-marketplace",
  },
  {
    label: "Mobile App",
    icon: Smartphone,
    href: "/dashboard/mobile-app",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

/* =========================================================
   SETTINGS NAVIGATION
========================================================= */

const SETTINGS_SECTIONS = [
  {
    title: "MY BUSINESS",
    items: [
      {
        label: "Business Profile",
        icon: Building2,
        href: "/dashboard/settings/business-profile",
      },
      {
        label: "My Profile",
        icon: UserCircle,
        href: "/dashboard/settings/my-profile",
      },
      {
        label: "Billing",
        icon: ReceiptText,
        href: "/dashboard/settings/billing",
      },
      {
        label: "My Staff",
        icon: UserRound,
        href: "/dashboard/settings/my-staff",
      },
      {
        label: "Opportunities & Pipelines",
        icon: GitBranch,
        href: "/dashboard/settings/opportunities-pipelines",
      },
    ],
  },
  {
    title: "BUSINESS SERVICES",
    items: [
      {
        label: "Calendars",
        icon: CalendarDays,
        href: "/dashboard/settings/calendars",
      },
      {
        label: "Email Services",
        icon: Mail,
        href: "/dashboard/settings/email-services",
      },
      {
        label: "Phone System",
        icon: PhoneCall,
        href: "/dashboard/settings/phone-system",
      },
      {
        label: "WhatsApp",
        icon: MessageCircle,
        href: "/dashboard/settings/whatsapp",
      },
    ],
  },
  {
    title: "OTHER SETTINGS",
    items: [
      {
        label: "Objects",
        icon: Boxes,
        href: "/dashboard/settings/objects",
      },
      {
        label: "Custom Fields",
        icon: SlidersHorizontal,
        href: "/dashboard/settings/custom-fields",
      },
      {
        label: "Custom Values",
        icon: SlidersHorizontal,
        href: "/dashboard/settings/custom-values",
      },
      {
        label: "Tags",
        icon: Tags,
        href: "/dashboard/settings/tags",
      },
      {
        label: "Tasks",
        icon: CheckSquare,
        href: "/dashboard/settings/tasks",
      },
      {
        label: "Locations",
        icon: MapPin,
        href: "/dashboard/settings/locations",
      },
      {
        label: "Notifications",
        icon: Bell,
        href: "/dashboard/settings/notifications",
      },
      {
        label: "Integrations",
        icon: Plug,
        href: "/dashboard/settings/integrations",
      },
    ],
  },
];

/* =========================================================
   MAIN SIDEBAR
========================================================= */

export default function Sidebar({
  mobileOpen = false,
  onClose,
}) {
  const pathname = usePathname();

  /*
    Settings routes use the Settings sidebar
    in the exact same sidebar position.
  */
  const isSettingsRoute =
    pathname === "/dashboard/settings" ||
    pathname.startsWith("/dashboard/settings/");

  if (isSettingsRoute) {
    return (
      <SettingsSidebar
        mobileOpen={mobileOpen}
        onClose={onClose}
      />
    );
  }

  return (
    <DashboardSidebar
      mobileOpen={mobileOpen}
      onClose={onClose}
    />
  );
}

/* =========================================================
   DASHBOARD SIDEBAR
========================================================= */

function DashboardSidebar({
  mobileOpen,
  onClose,
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState("");

  const handleNavigation = (href) => {
    router.push(href);

    if (onClose) {
      onClose();
    }
  };

  const renderItem = (item) => {
    const Icon = item.icon;

    const isActive =
      item.label === "Launchpad"
        ? pathname === "/dashboard" ||
          pathname === "/dashboard/launchpad"
        : pathname === item.href ||
          pathname.startsWith(`${item.href}/`);

    return (
      <button
        key={item.label}
        type="button"
        onClick={() => handleNavigation(item.href)}
        className={`group flex w-full items-center gap-3 rounded-lg px-3 py-[7px] text-left text-[13px] transition-all ${
          isActive
            ? "bg-[#F4D35E] font-semibold text-[#171B3A]"
            : "text-white/80 hover:bg-white/10 hover:text-white"
        }`}
      >
        <Icon
          size={16}
          strokeWidth={1.8}
          className="shrink-0"
        />

        <span className="truncate">
          {item.label}
        </span>
      </button>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[178px] flex-col bg-[#171B3A] transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Mobile Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close sidebar"
          className="absolute right-2 top-2 rounded-md p-1 text-white/70 hover:bg-white/10 hover:text-white lg:hidden"
        >
          <X size={18} />
        </button>

        {/* Logo */}
        <div className="flex h-[52px] shrink-0 items-center px-4">
          <div className="flex flex-col leading-none">
            <span className="text-[14px] font-extrabold tracking-[0.12em] text-white">
              ALL DRAINS
            </span>

            <span className="mt-1 text-[9px] font-semibold tracking-[0.28em] text-white/70">
              PLUMBING
            </span>
          </div>
        </div>

        {/* Workspace */}
        <div className="shrink-0 border-b border-white/10 px-3 pb-3">
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left hover:bg-white/5"
          >
            <div className="min-w-0">
              <p className="truncate text-[12px] font-semibold text-white">
                felipe perez - All Abo...
              </p>

              <p className="mt-0.5 truncate text-[10px] text-white/50">
                San Ysidro, CA
              </p>
            </div>

            <ChevronDown
              size={14}
              className="shrink-0 text-white/50"
            />
          </button>

          {/* Search */}
          <div className="mt-2 flex h-8 items-center rounded-md border border-white/10 bg-white/5 px-2">
            <Search
              size={14}
              className="shrink-0 text-white/40"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search"
              className="min-w-0 flex-1 bg-transparent px-2 text-[11px] text-white outline-none placeholder:text-white/40"
            />

            <span className="rounded border border-white/10 px-1 text-[8px] text-white/40">
              ctrlK
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-2 py-3">
          <nav className="space-y-1">
            {NAV_ITEMS_PRIMARY.map(renderItem)}
          </nav>

          <div className="my-3 border-t border-white/10" />

          <nav className="space-y-1">
            {NAV_ITEMS_SECONDARY.map(renderItem)}
          </nav>
        </div>

        {/* Bottom */}
        <div className="shrink-0 border-t border-white/10 px-3 py-2">
          <div className="flex items-center gap-2 text-[10px] text-white/40">
            <Phone size={12} />
            <span>Support</span>
          </div>
        </div>
      </aside>
    </>
  );
}

/* =========================================================
   SETTINGS SIDEBAR
========================================================= */

function SettingsSidebar({
  mobileOpen,
  onClose,
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [collapsed, setCollapsed] =
    useState(false);

  const handleNavigation = (href) => {
    router.push(href);

    if (onClose) {
      onClose();
    }
  };

  const handleBackToDashboard = () => {
    router.push("/dashboard");

    if (onClose) {
      onClose();
    }
  };

  const isActive = (href) => {
    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close settings sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      {/* Settings Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col bg-[#171B3A] transition-all duration-200 lg:translate-x-0 ${
          collapsed
            ? "w-[178px]"
            : "w-[178px]"
        } ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Mobile Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close sidebar"
          className="absolute right-2 top-2 rounded-md p-1 text-white/70 hover:bg-white/10 hover:text-white lg:hidden"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex h-[52px] shrink-0 items-center px-4">
          <button
            type="button"
            onClick={handleBackToDashboard}
            className="flex flex-col text-left leading-none"
          >
            <span className="text-[14px] font-extrabold tracking-[0.12em] text-white">
              ALL DRAINS
            </span>

            <span className="mt-1 text-[9px] font-semibold tracking-[0.28em] text-white/70">
              SETTINGS
            </span>
          </button>
        </div>

        {/* Settings Title */}
        <div className="shrink-0 border-b border-white/10 px-3 pb-3">
          <button
            type="button"
            onClick={handleBackToDashboard}
            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-white/70 transition hover:bg-white/5 hover:text-white"
          >
            <ChevronLeft size={15} />

            <span className="text-[11px] font-medium">
              Back to Dashboard
            </span>
          </button>

          <div className="mt-2 flex items-center gap-2 px-2">
            <Settings
              size={14}
              className="text-white/50"
            />

            <span className="text-[12px] font-semibold text-white">
              Settings
            </span>
          </div>
        </div>

        {/* Settings Navigation */}
        <div className="flex-1 overflow-y-auto px-2 py-3">
          {SETTINGS_SECTIONS.map((section) => (
            <div
              key={section.title}
              className="mb-4"
            >
              <div className="mb-2 px-3">
                <p className="text-[9px] font-bold tracking-[0.08em] text-white/40">
                  {section.title}
                </p>
              </div>

              <nav className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(
                    item.href
                  );

                  return (
                    <button
                      key={item.href}
                      type="button"
                      onClick={() =>
                        handleNavigation(
                          item.href
                        )
                      }
                      className={`group flex w-full items-center gap-3 rounded-lg px-3 py-[7px] text-left text-[12px] transition-all ${
                        active
                          ? "bg-[#F4D35E] font-semibold text-[#171B3A]"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Icon
                        size={15}
                        strokeWidth={
                          active ? 2 : 1.8
                        }
                        className="shrink-0"
                      />

                      <span className="min-w-0 truncate">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="shrink-0 border-t border-white/10 px-3 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] text-white/40">
              <Phone size={12} />
              <span>Support</span>
            </div>

            <button
              type="button"
              onClick={() =>
                setCollapsed(
                  (value) => !value
                )
              }
              className="rounded-md p-1 text-white/40 transition hover:bg-white/10 hover:text-white"
              aria-label="Toggle settings sidebar"
            >
              {collapsed ? (
                <ChevronRight size={13} />
              ) : (
                <ChevronLeft size={13} />
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}