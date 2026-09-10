"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  TrendingUp,
  Heart,
  MessageCircle,
  Share2,
  Users,
  CalendarDays,
  ChevronDown,
  Plus,
  RefreshCw,
  ArrowUpRight,
  FileText,
  Radio,
  MessageSquare,
  Settings,
} from "lucide-react";

export default function StatisticsPage() {
  const router = useRouter();

  const [dateRange, setDateRange] = useState("Last 30 days");
  const [showDateMenu, setShowDateMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  /*
   * ============================================================
   * BACKEND DATA
   * ============================================================
   *
   * This page intentionally does NOT contain demo/fake statistics.
   *
   * When the backend/API is connected, populate this object from
   * the real statistics endpoint.
   *
   * Expected shape:
   *
   * {
   *   totalPosts: number,
   *   engagement: number,
   *   comments: number,
   *   shares: number,
   *   audience: number,
   *   previousPeriod: {
   *     totalPosts: number,
   *     engagement: number,
   *     comments: number,
   *     shares: number
   *   },
   *   engagementByDay: [
   *     { label: "Mon", value: 20 }
   *   ],
   *   audienceByPlatform: [
   *     { platform: "Facebook", percentage: 60 },
   *     { platform: "Instagram", percentage: 40 }
   *   ]
   * }
   *
   * Keep null until the backend is connected.
   */
  const [statistics, setStatistics] = useState(null);

  const dateOptions = [
    "Last 7 days",
    "Last 30 days",
    "Last 90 days",
    "This year",
  ];

  const stats = useMemo(() => {
    if (!statistics) return [];

    return [
      {
        title: "Total Posts",
        value: formatNumber(statistics.totalPosts),
        change: calculateChange(
          statistics.totalPosts,
          statistics.previousPeriod?.totalPosts
        ),
        icon: BarChart3,
      },
      {
        title: "Engagement",
        value: formatNumber(statistics.engagement),
        change: calculateChange(
          statistics.engagement,
          statistics.previousPeriod?.engagement
        ),
        icon: Heart,
      },
      {
        title: "Comments",
        value: formatNumber(statistics.comments),
        change: calculateChange(
          statistics.comments,
          statistics.previousPeriod?.comments
        ),
        icon: MessageCircle,
      },
      {
        title: "Shares",
        value: formatNumber(statistics.shares),
        change: calculateChange(
          statistics.shares,
          statistics.previousPeriod?.shares
        ),
        icon: Share2,
      },
    ];
  }, [statistics]);

  const engagementData = statistics?.engagementByDay || [];
  const audienceData = statistics?.audienceByPlatform || [];

  const maxEngagement = Math.max(
    ...engagementData.map((item) => Number(item.value) || 0),
    1
  );

  function handleDateChange(value) {
    setDateRange(value);
    setShowDateMenu(false);

    /*
     * Backend integration will use this selected range.
     *
     * Example later:
     *
     * fetchStatistics(value);
     */
  }

  async function handleRefresh() {
    /*
     * No fake refresh/data is generated here.
     *
     * When backend is connected, call the real statistics API here.
     */
    setLoading(true);

    try {
      // Backend API call will be added here.
      await new Promise((resolve) => setTimeout(resolve, 400));
    } finally {
      setLoading(false);
    }
  }

  function navigate(path) {
    router.push(path);
  }

  return (
    <div className="min-h-screen bg-[#f5f6f8] text-[#26344d]">
      {/* =========================================================
          HEADER
      ========================================================= */}

      <header className="border-b border-slate-200 bg-white">
        <div className="flex h-[55px] items-center gap-6 px-5">
          <button
            type="button"
            onClick={() => navigate("/dashboard/marketing")}
            className="flex items-center gap-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <BarChart3 className="h-4 w-4" />
            </div>

            <strong className="text-[14px] text-slate-800">
              Marketing
            </strong>
          </button>

          <span className="text-[11px] font-medium text-blue-600">
            Social Planner
          </span>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate("/dashboard/marketing")}
              className="flex h-8 items-center gap-1.5 rounded-md border border-slate-200 px-3 text-[10px] font-medium text-slate-600 transition hover:bg-slate-50"
            >
              <ArrowUpRight className="h-3 w-3" />
              Marketing
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/dashboard/marketing/social-planner/settings")
              }
              className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition hover:bg-slate-50"
              title="Settings"
            >
              <Settings className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/dashboard/marketing/social-planner/content")
              }
              className="flex h-8 items-center gap-1.5 rounded-md border border-slate-200 px-3 text-[10px] font-medium text-slate-600 transition hover:bg-slate-50"
            >
              <FileText className="h-3 w-3" />
              Content
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/dashboard/marketing/social-planner/content")
              }
              className="flex h-8 items-center gap-1.5 rounded-md bg-blue-600 px-3 text-[10px] font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Plus className="h-3 w-3" />
              New Post
            </button>
          </div>
        </div>

        {/* =======================================================
            SOCIAL PLANNER NAVIGATION
        ======================================================= */}

        <div className="flex h-[39px] items-center gap-6 overflow-x-auto border-t border-slate-100 px-5">
          <button
            type="button"
            onClick={() =>
              navigate("/dashboard/marketing/social-planner")
            }
            className="whitespace-nowrap text-[11px] text-slate-500 transition hover:text-slate-700"
          >
            Planner
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/dashboard/marketing/social-planner/content")
            }
            className="whitespace-nowrap text-[11px] text-slate-500 transition hover:text-slate-700"
          >
            Content
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/dashboard/marketing/social-planner/comments")
            }
            className="whitespace-nowrap text-[11px] text-slate-500 transition hover:text-slate-700"
          >
            Comments
          </button>

          <button
            type="button"
            className="relative flex h-full shrink-0 items-center text-[11px] font-medium text-blue-600"
          >
            Statistics

            <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-t-full bg-blue-600" />
          </button>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/dashboard/marketing/social-planner/social-listening"
              )
            }
            className="whitespace-nowrap text-[11px] text-slate-500 transition hover:text-slate-700"
          >
            Social Listening
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/dashboard/marketing/social-planner/settings")
            }
            className="whitespace-nowrap text-[11px] text-slate-500 transition hover:text-slate-700"
          >
            Settings
          </button>
        </div>
      </header>

      {/* =========================================================
          MAIN
      ========================================================= */}

      <main className="p-4">
        <div className="mx-auto max-w-[1200px]">
          <div className="rounded-lg border border-slate-200 bg-white">
            {/* ===================================================
                PAGE HEADER
            =================================================== */}

            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 p-4">
              <div>
                <h1 className="text-[15px] font-semibold text-slate-800">
                  Statistics
                </h1>

                <p className="mt-1 text-[11px] text-slate-400">
                  Track your social media performance.
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* Refresh */}

                <button
                  type="button"
                  onClick={handleRefresh}
                  disabled={loading}
                  className="flex h-8 items-center justify-center gap-1.5 rounded-md border border-slate-200 px-3 text-[10px] font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <RefreshCw
                    className={`h-3.5 w-3.5 ${
                      loading ? "animate-spin" : ""
                    }`}
                  />

                  Refresh
                </button>

                {/* Date Range */}

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowDateMenu((prev) => !prev)}
                    className="flex h-8 items-center gap-2 rounded-md border border-slate-200 px-3 text-[10px] font-medium text-slate-600 transition hover:bg-slate-50"
                  >
                    <CalendarDays className="h-3.5 w-3.5" />

                    {dateRange}

                    <ChevronDown className="h-3 w-3" />
                  </button>

                  {showDateMenu && (
                    <div className="absolute right-0 top-10 z-30 w-[145px] overflow-hidden rounded-md border border-slate-200 bg-white p-1 shadow-lg">
                      {dateOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleDateChange(option)}
                          className={`flex w-full rounded px-2.5 py-2 text-left text-[10px] transition ${
                            dateRange === option
                              ? "bg-blue-50 font-medium text-blue-600"
                              : "text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ===================================================
                NO BACKEND DATA STATE
            =================================================== */}

            {!statistics && !loading && (
              <div className="border-b border-slate-200 p-8">
                <div className="mx-auto flex max-w-[500px] flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <BarChart3 className="h-5 w-5" />
                  </div>

                  <h2 className="mt-4 text-[13px] font-semibold text-slate-700">
                    No statistics available
                  </h2>

                  <p className="mt-2 text-[10px] leading-5 text-slate-400">
                    Statistics will appear here when social media data is
                    available from the connected backend accounts.
                  </p>

                  <button
                    type="button"
                    onClick={handleRefresh}
                    className="mt-4 flex h-8 items-center gap-1.5 rounded-md bg-blue-600 px-3 text-[10px] font-semibold text-white transition hover:bg-blue-700"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Check for data
                  </button>
                </div>
              </div>
            )}

            {/* ===================================================
                LOADING
            =================================================== */}

            {loading && (
              <div className="border-b border-slate-200 p-8">
                <div className="mx-auto flex max-w-[500px] flex-col items-center text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  </div>

                  <p className="mt-3 text-[11px] font-medium text-slate-600">
                    Loading statistics...
                  </p>

                  <p className="mt-1 text-[9px] text-slate-400">
                    Fetching the latest marketing performance data.
                  </p>
                </div>
              </div>
            )}

            {/* ===================================================
                STATISTICS DATA
            =================================================== */}

            {statistics && (
              <>
                {/* STATS */}

                <div className="grid grid-cols-1 gap-3 border-b border-slate-200 p-4 sm:grid-cols-2 xl:grid-cols-4">
                  {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                      <div
                        key={stat.title}
                        className="rounded-lg border border-slate-200 p-4 transition hover:border-blue-200"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-slate-400">
                            {stat.title}
                          </span>

                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <Icon className="h-4 w-4" />
                          </div>
                        </div>

                        <div className="mt-3 text-[24px] font-semibold text-slate-800">
                          {stat.value}
                        </div>

                        {stat.change !== null && (
                          <div className="mt-1 flex items-center gap-1 text-[9px] text-emerald-600">
                            <TrendingUp className="h-3 w-3" />

                            {stat.change}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* =================================================
                    CHART + AUDIENCE
                ================================================= */}

                <div className="grid grid-cols-1 gap-4 p-4 xl:grid-cols-[1fr_320px]">
                  {/* ENGAGEMENT */}

                  <div className="rounded-lg border border-slate-200 p-4">
                    <div className="mb-5">
                      <h2 className="text-[12px] font-semibold text-slate-700">
                        Engagement Overview
                      </h2>

                      <p className="mt-1 text-[9px] text-slate-400">
                        Social engagement during the selected period.
                      </p>
                    </div>

                    {engagementData.length === 0 ? (
                      <EmptyChart
                        icon={BarChart3}
                        text="No engagement data available."
                      />
                    ) : (
                      <div className="flex h-[245px] items-end gap-3 border-b border-l border-slate-200 px-4 pb-5 pt-5 sm:gap-5">
                        {engagementData.map((item, index) => {
                          const value = Number(item.value) || 0;

                          const height =
                            value === 0
                              ? 0
                              : Math.max(
                                  8,
                                  (value / maxEngagement) * 180
                                );

                          return (
                            <div
                              key={`${item.label}-${index}`}
                              className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                            >
                              <span className="text-[8px] font-medium text-slate-500">
                                {formatNumber(value)}
                              </span>

                              <div
                                className="w-full max-w-[42px] rounded-t-md bg-blue-500 transition hover:bg-blue-600"
                                style={{
                                  height: `${height}px`,
                                }}
                                title={`${item.label}: ${formatNumber(
                                  value
                                )}`}
                              />

                              <span className="text-[9px] text-slate-400">
                                {item.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* AUDIENCE */}

                  <div className="rounded-lg border border-slate-200 p-4">
                    <h2 className="text-[12px] font-semibold text-slate-700">
                      Audience
                    </h2>

                    <p className="mt-1 text-[9px] text-slate-400">
                      Audience distribution by connected platform.
                    </p>

                    {audienceData.length === 0 ? (
                      <div className="mt-6">
                        <EmptyChart
                          icon={Users}
                          text="No audience data available."
                        />
                      </div>
                    ) : (
                      <div className="mt-5">
                        <div className="flex flex-col items-center">
                          <div className="flex h-36 w-36 items-center justify-center rounded-full border-[22px] border-blue-500">
                            <div className="text-center">
                              <Users className="mx-auto h-5 w-5 text-slate-400" />

                              <div className="mt-1 text-[18px] font-semibold">
                                {formatNumber(statistics.audience)}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-5 w-full space-y-2">
                          {audienceData.map((item) => (
                            <div
                              key={item.platform}
                              className="rounded-md bg-slate-50 px-2.5 py-2"
                            >
                              <div className="flex items-center justify-between text-[10px]">
                                <span className="text-slate-500">
                                  {item.platform}
                                </span>

                                <strong className="text-slate-700">
                                  {item.percentage}%
                                </strong>
                              </div>

                              <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-slate-200">
                                <div
                                  className="h-full rounded-full bg-blue-500"
                                  style={{
                                    width: `${Math.min(
                                      100,
                                      Math.max(
                                        0,
                                        Number(item.percentage) || 0
                                      )
                                    )}%`,
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* ===================================================
                FOOTER QUICK LINKS
            =================================================== */}

            <div className="grid grid-cols-1 gap-2 border-t border-slate-200 p-4 sm:grid-cols-3">
              <button
                type="button"
                onClick={() =>
                  navigate("/dashboard/marketing/social-planner")
                }
                className="flex h-9 items-center justify-center gap-1.5 rounded-md border border-slate-200 text-[10px] font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              >
                <CalendarDays className="h-3.5 w-3.5" />
                Open Planner
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/dashboard/marketing/social-planner/comments")
                }
                className="flex h-9 items-center justify-center gap-1.5 rounded-md border border-slate-200 text-[10px] font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                View Comments
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/dashboard/marketing/social-planner/social-listening"
                  )
                }
                className="flex h-9 items-center justify-center gap-1.5 rounded-md border border-slate-200 text-[10px] font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              >
                <Radio className="h-3.5 w-3.5" />
                Social Listening
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ================================================================
   EMPTY CHART
================================================================ */

function EmptyChart({ icon: Icon, text }) {
  return (
    <div className="flex h-[180px] flex-col items-center justify-center text-center">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-400">
        <Icon className="h-4 w-4" />
      </div>

      <p className="mt-2 text-[10px] text-slate-400">{text}</p>
    </div>
  );
}

/* ================================================================
   NUMBER FORMAT
================================================================ */

function formatNumber(value) {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  const number = Number(value);

  if (Number.isNaN(number)) {
    return "—";
  }

  return new Intl.NumberFormat("en-US", {
    notation: number >= 10000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(number);
}

/* ================================================================
   CHANGE CALCULATION
================================================================ */

function calculateChange(current, previous) {
  if (
    current === null ||
    current === undefined ||
    previous === null ||
    previous === undefined
  ) {
    return null;
  }

  const currentNumber = Number(current);
  const previousNumber = Number(previous);

  if (
    Number.isNaN(currentNumber) ||
    Number.isNaN(previousNumber) ||
    previousNumber === 0
  ) {
    return null;
  }

  const percentage =
    ((currentNumber - previousNumber) / previousNumber) * 100;

  const sign = percentage >= 0 ? "+" : "";

  return `${sign}${percentage.toFixed(1)}% from previous period`;
}