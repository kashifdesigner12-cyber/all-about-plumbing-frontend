"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  UserCircle,
  CreditCard,
  Users,
  GitBranch,
  CalendarDays,
  Mail,
  Phone,
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
  Settings,
} from "lucide-react";

const SETTINGS_SECTIONS = [
  {
    title: "MY BUSINESS",
    items: [
      {
        label: "Business Profile",
        href: "/dashboard/settings/business-profile",
        icon: Building2,
      },
      {
        label: "My Profile",
        href: "/dashboard/settings/my-profile",
        icon: UserCircle,
      },
      {
        label: "Billing",
        href: "/dashboard/settings/billing",
        icon: CreditCard,
      },
      {
        label: "My Staff",
        href: "/dashboard/settings/my-staff",
        icon: Users,
      },
      {
        label: "Opportunities & Pipelines",
        href: "/dashboard/settings/opportunities-pipelines",
        icon: GitBranch,
      },
    ],
  },
  {
    title: "BUSINESS SERVICES",
    items: [
      {
        label: "Calendars",
        href: "/dashboard/settings/calendars",
        icon: CalendarDays,
      },
      {
        label: "Email Services",
        href: "/dashboard/settings/email-services",
        icon: Mail,
      },
      {
        label: "Phone System",
        href: "/dashboard/settings/phone-system",
        icon: Phone,
      },
      {
        label: "WhatsApp",
        href: "/dashboard/settings/whatsapp",
        icon: MessageCircle,
      },
    ],
  },
  {
    title: "OTHER SETTINGS",
    items: [
      {
        label: "Objects",
        href: "/dashboard/settings/objects",
        icon: Boxes,
      },
      {
        label: "Custom Fields",
        href: "/dashboard/settings/custom-fields",
        icon: SlidersHorizontal,
      },
      {
        label: "Custom Values",
        href: "/dashboard/settings/custom-values",
        icon: SlidersHorizontal,
      },
      {
        label: "Tags",
        href: "/dashboard/settings/tags",
        icon: Tags,
      },
      {
        label: "Tasks",
        href: "/dashboard/settings/tasks",
        icon: CheckSquare,
      },
      {
        label: "Locations",
        href: "/dashboard/settings/locations",
        icon: MapPin,
      },
      {
        label: "Notifications",
        href: "/dashboard/settings/notifications",
        icon: Bell,
      },
      {
        label: "Integrations",
        href: "/dashboard/settings/integrations",
        icon: Plug,
      },
    ],
  },
];

export default function SettingsSidebar({
  collapsed = false,
  onToggle,
}) {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/dashboard/settings") {
      return pathname === href;
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  return (
    <div
      className={`flex h-full min-h-0 flex-col overflow-hidden bg-[#171B3A] text-white transition-all duration-300 ${
        collapsed ? "w-[76px]" : "w-[270px]"
      }`}
    >
      {/* =========================================
          SETTINGS HEADER
      ========================================== */}
      <div
        className={`flex h-[72px] shrink-0 items-center border-b border-white/10 ${
          collapsed
            ? "justify-center px-2"
            : "px-5"
        }`}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] text-white">
            <Settings
              size={19}
              strokeWidth={2.2}
            />
          </div>

          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-white">
                Settings
              </p>

              <p className="mt-0.5 truncate text-[11px] text-slate-400">
                Workspace settings
              </p>
            </div>
          )}
        </div>
      </div>

      {/* =========================================
          NAVIGATION
      ========================================== */}
      <nav
        className={`min-h-0 flex-1 overflow-y-auto overflow-x-hidden py-5 ${
          collapsed ? "px-2" : "px-3"
        }`}
      >
        {SETTINGS_SECTIONS.map((section) => (
          <div
            key={section.title}
            className="mb-6 last:mb-2"
          >
            {/* Section Title */}
            {!collapsed && (
              <div className="mb-2 px-3">
                <p className="text-[10px] font-bold tracking-[0.08em] text-slate-500">
                  {section.title}
                </p>
              </div>
            )}

            {collapsed && (
              <div className="mx-auto mb-3 h-px w-8 bg-white/10" />
            )}

            {/* Section Items */}
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={
                      collapsed
                        ? item.label
                        : undefined
                    }
                    className={`group relative flex min-h-[42px] items-center rounded-xl transition-all duration-150 ${
                      collapsed
                        ? "justify-center px-2"
                        : "gap-3 px-3"
                    } ${
                      active
                        ? "bg-[#2563EB] text-white shadow-sm"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {/* Active Indicator */}
                    {active && !collapsed && (
                      <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-white" />
                    )}

                    <Icon
                      size={18}
                      strokeWidth={
                        active ? 2.3 : 2
                      }
                      className={`shrink-0 transition-colors ${
                        active
                          ? "text-white"
                          : "text-slate-400 group-hover:text-white"
                      }`}
                    />

                    {!collapsed && (
                      <span className="min-w-0 flex-1 truncate text-[13px] font-medium">
                        {item.label}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* =========================================
          COLLAPSE BUTTON
      ========================================== */}
      <div
        className={`shrink-0 border-t border-white/10 p-3 ${
          collapsed ? "flex justify-center" : ""
        }`}
      >
        <button
          type="button"
          onClick={onToggle}
          title={
            collapsed
              ? "Expand sidebar"
              : "Collapse sidebar"
          }
          className={`flex h-10 items-center rounded-xl text-slate-400 transition hover:bg-white/5 hover:text-white ${
            collapsed
              ? "w-10 justify-center"
              : "w-full justify-center gap-2"
          }`}
        >
          {collapsed ? (
            <ChevronRight size={17} />
          ) : (
            <>
              <ChevronLeft size={17} />

              <span className="text-xs font-semibold">
                Collapse sidebar
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}