"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  MessageCircle,
  Heart,
  TrendingUp,
  Globe2,
  MoreVertical,
  Bell,
  ChevronDown,
  RefreshCw,
  Filter,
  X,
  ExternalLink,
  Eye,
  AlertCircle,
} from "lucide-react";

export default function SocialListeningPage() {
  const [search, setSearch] = useState("");
  const [sentimentFilter, setSentimentFilter] = useState("All");
  const [showFilter, setShowFilter] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  /*
   * ============================================================
   * BACKEND DATA
   * ============================================================
   *
   * No fake/demo data is used here.
   *
   * Backend integration will populate these values later.
   * Keep this structure when connecting the API.
   */

  const mentions = [];
  const stats = {
    totalMentions: null,
    positiveSentiment: null,
    newAlerts: null,
  };

  /*
   * ============================================================
   * FILTERING
   * ============================================================
   */

  const filteredMentions = useMemo(() => {
    return mentions.filter((item) => {
      const searchValue = search.trim().toLowerCase();

      const matchesSearch =
        !searchValue ||
        String(item.name || "")
          .toLowerCase()
          .includes(searchValue) ||
        String(item.text || "")
          .toLowerCase()
          .includes(searchValue) ||
        String(item.source || "")
          .toLowerCase()
          .includes(searchValue);

      const matchesSentiment =
        sentimentFilter === "All" ||
        String(item.sentiment || "") === sentimentFilter;

      return matchesSearch && matchesSentiment;
    });
  }, [search, sentimentFilter]);

  /*
   * ============================================================
   * ACTIONS
   * ============================================================
   */

  const handleRefresh = () => {
    setRefreshing(true);

    /*
     * API refresh will be connected here later.
     *
     * Example later:
     * await fetchSocialListeningData();
     */

    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  const clearSearch = () => {
    setSearch("");
  };

  const closeMenus = () => {
    setOpenMenu(null);
  };

  return (
    <div
      className="min-h-screen bg-[#f5f6f8] text-[#26344d]"
      onClick={closeMenus}
    >
      {/* =========================================================
          HEADER
      ========================================================= */}

      <header className="border-b border-slate-200 bg-white">
        <div className="flex h-[55px] items-center gap-6 px-5">
          <div className="flex items-center gap-2">
            <strong className="text-[14px] text-slate-800">
              Marketing
            </strong>

            <span className="text-slate-300">/</span>

            <span className="text-[11px] font-medium text-blue-600">
              Social Planner
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setShowAlerts((value) => !value);
              }}
              className="relative flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
              title="Notifications"
            >
              <Bell className="h-3.5 w-3.5" />

              {stats.newAlerts !== null && stats.newAlerts > 0 && (
                <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-red-500" />
              )}
            </button>

            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
              title="Refresh"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${
                  refreshing ? "animate-spin" : ""
                }`}
              />
            </button>

            <Link
              href="/dashboard/marketing/social-planner"
              className="flex h-8 items-center gap-1.5 rounded-md border border-slate-200 px-3 text-[10px] font-medium text-slate-600 transition hover:bg-slate-50"
            >
              Social Planner
            </Link>

            <Link
              href="/dashboard/marketing/social-planner/content"
              className="flex h-8 items-center gap-1.5 rounded-md bg-blue-600 px-3 text-[10px] font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Plus className="h-3 w-3" />
              New Post
            </Link>
          </div>
        </div>

        {/* =======================================================
            SOCIAL PLANNER NAVIGATION
        ======================================================= */}

        <div className="flex h-[39px] items-center gap-6 overflow-x-auto border-t border-slate-100 px-5">
          <Link
            href="/dashboard/marketing/social-planner"
            className="flex h-full shrink-0 items-center text-[11px] text-slate-500 transition hover:text-slate-700"
          >
            Planner
          </Link>

          <Link
            href="/dashboard/marketing/social-planner/content"
            className="flex h-full shrink-0 items-center text-[11px] text-slate-500 transition hover:text-slate-700"
          >
            Content
          </Link>

          <Link
            href="/dashboard/marketing/social-planner/comments"
            className="flex h-full shrink-0 items-center text-[11px] text-slate-500 transition hover:text-slate-700"
          >
            Comments
          </Link>

          <Link
            href="/dashboard/marketing/social-planner/statistics"
            className="flex h-full shrink-0 items-center text-[11px] text-slate-500 transition hover:text-slate-700"
          >
            Statistics
          </Link>

          <Link
            href="/dashboard/marketing/social-planner/social-listening"
            className="relative flex h-full shrink-0 items-center text-[11px] font-medium text-blue-600"
          >
            Social Listening

            <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-t-full bg-blue-600" />
          </Link>

          <Link
            href="/dashboard/marketing/social-planner/settings"
            className="flex h-full shrink-0 items-center text-[11px] text-slate-500 transition hover:text-slate-700"
          >
            Settings
          </Link>
        </div>
      </header>

      {/* =========================================================
          NOTIFICATIONS PANEL
      ========================================================= */}

      {showAlerts && (
        <div
          onClick={(event) => event.stopPropagation()}
          className="absolute right-5 top-[64px] z-50 w-[280px] rounded-lg border border-slate-200 bg-white p-3 shadow-lg"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <h3 className="text-[11px] font-semibold text-slate-700">
                Notifications
              </h3>

              <p className="mt-0.5 text-[8px] text-slate-400">
                Social listening alerts
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAlerts(false)}
              className="flex h-6 w-6 items-center justify-center rounded-md text-slate-400 hover:bg-slate-50"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {stats.newAlerts === null ? (
            <div className="py-6 text-center">
              <Bell className="mx-auto h-5 w-5 text-slate-300" />

              <p className="mt-2 text-[9px] text-slate-400">
                No notification data available yet.
              </p>
            </div>
          ) : (
            <div className="py-4 text-center">
              <p className="text-[9px] text-slate-400">
                {stats.newAlerts} new alerts
              </p>
            </div>
          )}
        </div>
      )}

      {/* =========================================================
          MAIN
      ========================================================= */}

      <main className="p-4">
        <div className="mx-auto max-w-[1200px]">
          {/* =====================================================
              PAGE HEADER
          ===================================================== */}

          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-[17px] font-semibold text-slate-800">
                Social Listening
              </h1>

              <p className="mt-1 text-[10px] text-slate-400">
                Monitor mentions and conversations around your brand.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search mentions"
                  className="h-8 w-[220px] rounded-md border border-slate-200 bg-white pl-8 pr-8 text-[10px] outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                />

                {search && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-center text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setShowFilter((value) => !value);
                }}
                className={`flex h-8 items-center gap-1.5 rounded-md border px-3 text-[10px] transition ${
                  showFilter || sentimentFilter !== "All"
                    ? "border-blue-200 bg-blue-50 text-blue-600"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Filter className="h-3 w-3" />
                Filter
                <ChevronDown className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* =====================================================
              FILTER DROPDOWN
          ===================================================== */}

          {showFilter && (
            <div
              onClick={(event) => event.stopPropagation()}
              className="mb-4 rounded-lg border border-slate-200 bg-white p-3 shadow-sm"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 text-[9px] font-medium text-slate-500">
                  Sentiment:
                </span>

                {["All", "Positive", "Neutral", "Negative"].map(
                  (option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSentimentFilter(option)}
                      className={`rounded-md px-3 py-1.5 text-[9px] transition ${
                        sentimentFilter === option
                          ? "bg-blue-600 font-medium text-white"
                          : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      {option}
                    </button>
                  )
                )}

                {sentimentFilter !== "All" && (
                  <button
                    type="button"
                    onClick={() => setSentimentFilter("All")}
                    className="ml-auto text-[9px] font-medium text-blue-600 hover:text-blue-700"
                  >
                    Clear filter
                  </button>
                )}
              </div>
            </div>
          )}

          {/* =====================================================
              STATS
          ===================================================== */}

          <div className="grid grid-cols-1 gap-3 border-b border-slate-200 sm:grid-cols-3">
            <StatCard
              icon={Globe2}
              label="Total Mentions"
              value={stats.totalMentions}
            />

            <StatCard
              icon={TrendingUp}
              label="Positive Sentiment"
              value={
                stats.positiveSentiment !== null
                  ? `${stats.positiveSentiment}%`
                  : null
              }
              valueClass="text-emerald-600"
            />

            <StatCard
              icon={Bell}
              label="New Alerts"
              value={stats.newAlerts}
              valueClass="text-blue-600"
            />
          </div>

          {/* =====================================================
              MENTIONS
          ===================================================== */}

          <section className="mt-4 overflow-hidden rounded-lg border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-100 p-4">
              <div>
                <h2 className="text-[12px] font-semibold text-slate-700">
                  Mentions
                </h2>

                <p className="mt-1 text-[9px] text-slate-400">
                  {search || sentimentFilter !== "All"
                    ? "Filtered social conversations"
                    : "Social conversations from connected sources"}
                </p>
              </div>

              {search && (
                <span className="rounded-full bg-blue-50 px-2 py-1 text-[8px] font-medium text-blue-600">
                  Search active
                </span>
              )}
            </div>

            {filteredMentions.length === 0 ? (
              <EmptyState
                search={search}
                sentimentFilter={sentimentFilter}
                onClear={() => {
                  setSearch("");
                  setSentimentFilter("All");
                }}
              />
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredMentions.map((item, index) => (
                  <MentionRow
                    key={item.id || `${item.name}-${index}`}
                    item={item}
                    index={index}
                    openMenu={openMenu}
                    setOpenMenu={setOpenMenu}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

/* ================================================================
   STAT CARD
================================================================ */

function StatCard({
  icon: Icon,
  label,
  value,
  valueClass = "text-slate-800",
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="flex items-center gap-2 text-slate-400">
        <Icon className="h-4 w-4" />

        <span className="text-[10px]">{label}</span>
      </div>

      <strong
        className={`mt-2 block text-[22px] font-semibold ${valueClass}`}
      >
        {value === null || value === undefined ? "—" : value}
      </strong>

      <p className="mt-1 text-[8px] text-slate-400">
        Backend data will appear here.
      </p>
    </div>
  );
}

/* ================================================================
   MENTION ROW
================================================================ */

function MentionRow({
  item,
  index,
  openMenu,
  setOpenMenu,
}) {
  const sentiment = item.sentiment || "Unknown";

  const sentimentClasses =
    sentiment === "Positive"
      ? "bg-emerald-50 text-emerald-600"
      : sentiment === "Negative"
      ? "bg-red-50 text-red-500"
      : sentiment === "Neutral"
      ? "bg-slate-100 text-slate-500"
      : "bg-blue-50 text-blue-600";

  return (
    <div className="flex gap-3 p-4 transition hover:bg-slate-50">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        <MessageCircle className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <strong className="text-[11px] text-slate-700">
            {item.name || "Unknown user"}
          </strong>

          {item.source && (
            <span className="text-[9px] text-slate-400">
              {item.source}
            </span>
          )}

          <span
            className={`rounded-full px-2 py-0.5 text-[8px] ${sentimentClasses}`}
          >
            {sentiment}
          </span>
        </div>

        <p className="mt-1 text-[11px] text-slate-600">
          {item.text || "No message content available."}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-3 text-[9px] text-slate-400">
          {item.time && <span>{item.time}</span>}

          {item.likes !== undefined && (
            <span className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              {item.likes}
            </span>
          )}
        </div>
      </div>

      {/* ==========================================================
          ACTION MENU
      ========================================================== */}

      <div className="relative shrink-0">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setOpenMenu(openMenu === index ? null : index);
          }}
          className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          title="More actions"
        >
          <MoreVertical className="h-4 w-4" />
        </button>

        {openMenu === index && (
          <div
            onClick={(event) => event.stopPropagation()}
            className="absolute right-0 top-8 z-20 w-[150px] rounded-md border border-slate-200 bg-white p-1.5 shadow-lg"
          >
            <button
              type="button"
              onClick={() => setOpenMenu(null)}
              className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[9px] text-slate-600 hover:bg-slate-50"
            >
              <Eye className="h-3.5 w-3.5" />
              View mention
            </button>

            <button
              type="button"
              onClick={() => setOpenMenu(null)}
              className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[9px] text-slate-600 hover:bg-slate-50"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Open source
            </button>

            <button
              type="button"
              onClick={() => setOpenMenu(null)}
              className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[9px] text-slate-600 hover:bg-slate-50"
            >
              <AlertCircle className="h-3.5 w-3.5" />
              Mark for review
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================================================================
   EMPTY STATE
================================================================ */

function EmptyState({
  search,
  sentimentFilter,
  onClear,
}) {
  const isFiltered = search || sentimentFilter !== "All";

  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center px-6 py-10 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400">
        {isFiltered ? (
          <Search className="h-4 w-4" />
        ) : (
          <MessageCircle className="h-4 w-4" />
        )}
      </div>

      <h3 className="mt-3 text-[11px] font-semibold text-slate-700">
        {isFiltered
          ? "No mentions match your filters"
          : "No social listening data yet"}
      </h3>

      <p className="mt-1 max-w-[360px] text-[9px] leading-4 text-slate-400">
        {isFiltered
          ? "Try changing your search or sentiment filter."
          : "Once social listening data is available from the backend, mentions and conversations will appear here."}
      </p>

      {isFiltered && (
        <button
          type="button"
          onClick={onClear}
          className="mt-4 flex h-8 items-center gap-1.5 rounded-md bg-blue-600 px-3 text-[9px] font-semibold text-white transition hover:bg-blue-700"
        >
          <X className="h-3 w-3" />
          Clear filters
        </button>
      )}
    </div>
  );
}