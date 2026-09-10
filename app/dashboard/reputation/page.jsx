"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  X,
  CalendarDays,
  LayoutGrid,
  CheckCircle2,
  Circle,
  Star,
  MessageSquare,
  Send,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export default function ReputationPage() {
  const [activeTopTab, setActiveTopTab] = useState("Overview");
  const [activeSubTab, setActiveSubTab] = useState("My Stats");

  const [sourceOpen, setSourceOpen] = useState(false);
  const [source, setSource] = useState("Sources");

  const [aiRecapVisible, setAiRecapVisible] = useState(true);

  const [sectionsOpen, setSectionsOpen] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [sendRequestOpen, setSendRequestOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  const topTabs = [
    "Overview",
    "Requests",
    "Reviews",
    "Video Testimonials",
    "Widgets",
    "Listings",
    "Settings",
  ];

  const subTabs = ["Overview", "My Stats", "Competitor Analysis"];

  const onboardingItems = [
    {
      id: 1,
      title: "Connect Google Business Profile",
      completed: false,
    },
    {
      id: 2,
      title: "Setup Review Link",
      completed: false,
    },
    {
      id: 3,
      title: "Configure Reviews AI",
      completed: false,
    },
    {
      id: 4,
      title: "Create a Review Widget",
      completed: false,
    },
    {
      id: 5,
      title: "Send your 1st Review Request",
      completed: false,
    },
    {
      id: 6,
      title: "Connect more platforms",
      completed: false,
    },
  ];

  const [completedItems, setCompletedItems] = useState([]);

  const toggleOnboardingItem = (id) => {
    setCompletedItems((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const completedCount = completedItems.length;

  const handleSendRequest = () => {
    setSendRequestOpen(true);
  };

  const closeSendRequest = () => {
    setSendRequestOpen(false);
  };

  const selectSource = (value) => {
    setSource(value);
    setSourceOpen(false);
  };

  return (
    <div className="min-h-full w-full bg-white text-[#26344D]">
      {/* =========================================================
          TOP REPUTATION NAVIGATION
      ========================================================== */}
      <div className="sticky top-0 z-30 border-b border-[#E5E7EB] bg-white">
        <div className="flex h-[47px] items-center justify-between px-4">
          <div className="flex h-full items-center gap-0 overflow-x-auto">
            <div className="mr-5 whitespace-nowrap text-[15px] font-medium text-[#26344D]">
              Reputation
            </div>

            {topTabs.map((tab) => {
              const active = activeTopTab === tab;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTopTab(tab)}
                  className={`relative h-full whitespace-nowrap px-3 text-[12px] transition ${
                    active
                      ? "font-medium text-[#2563EB]"
                      : "text-[#475569] hover:text-[#2563EB]"
                  }`}
                >
                  {tab}

                  {tab === "Video Testimonials" && (
                    <span className="absolute -right-1 top-[2px] rounded-[4px] bg-[#F5C400] px-[3px] py-[1px] text-[7px] font-bold text-white">
                      New
                    </span>
                  )}

                  {active && (
                    <span className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-[#2563EB]" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="ml-3 flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={handleSendRequest}
              className="h-[26px] rounded-[4px] bg-[#2563EB] px-4 text-[11px] font-semibold text-white transition hover:bg-[#1D4ED8]"
            >
              Send Review Request
            </button>
          </div>
        </div>

        {/* =========================================================
            SECOND NAVIGATION
        ========================================================== */}
        <div className="flex h-[38px] items-center border-t border-[#F1F5F9] px-4">
          {subTabs.map((tab) => {
            const active = activeSubTab === tab;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveSubTab(tab)}
                className={`relative mr-5 h-full text-[12px] ${
                  active
                    ? "font-medium text-[#2563EB]"
                    : "text-[#475569] hover:text-[#2563EB]"
                }`}
              >
                {tab}

                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2563EB]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================
          PAGE CONTENT
      ========================================================== */}
      <main className="min-h-[calc(100vh-85px)] overflow-y-auto bg-white px-4 pb-12">
        {/* =======================================================
            FILTER ROW
        ======================================================== */}
        <div className="flex min-h-[72px] items-center justify-between gap-4 border-b border-[#F1F5F9]">
          {/* Source */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setSourceOpen((value) => !value)}
              className="flex h-[31px] min-w-[192px] items-center justify-between rounded-[6px] border border-[#D7DCE3] bg-white px-3 text-[12px] text-[#475569] hover:border-[#B9C1CC]"
            >
              <span>{source}</span>
              <ChevronDown
                size={14}
                className={`transition ${
                  sourceOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {sourceOpen && (
              <div className="absolute left-0 top-[36px] z-50 w-[192px] overflow-hidden rounded-[6px] border border-[#D7DCE3] bg-white shadow-lg">
                {["Sources", "Google Business Profile", "Facebook", "All Sources"].map(
                  (item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => selectSource(item)}
                      className="block w-full px-3 py-2 text-left text-[12px] text-[#334155] hover:bg-[#F5F8FC]"
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          {/* Right filters */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setSectionsOpen((value) => !value)}
                className="flex h-[31px] items-center gap-2 rounded-[6px] border border-[#D7DCE3] bg-white px-3 text-[12px] text-[#475569] hover:border-[#B9C1CC]"
              >
                <LayoutGrid size={14} />
                Sections
              </button>

              {sectionsOpen && (
                <div className="absolute right-0 top-[36px] z-50 w-[180px] rounded-[6px] border border-[#D7DCE3] bg-white p-2 shadow-lg">
                  <button
                    type="button"
                    className="w-full rounded px-3 py-2 text-left text-[12px] hover:bg-[#F5F8FC]"
                  >
                    Reviews Trend
                  </button>

                  <button
                    type="button"
                    className="w-full rounded px-3 py-2 text-left text-[12px] hover:bg-[#F5F8FC]"
                  >
                    Review Summary
                  </button>

                  <button
                    type="button"
                    className="w-full rounded px-3 py-2 text-left text-[12px] hover:bg-[#F5F8FC]"
                  >
                    Sources
                  </button>
                </div>
              )}
            </div>

            {/* Start Date */}
            <label className="flex h-[31px] w-[184px] items-center gap-2 rounded-[6px] border border-[#D7DCE3] bg-white px-2">
              <CalendarDays size={14} className="text-[#64748B]" />
              <input
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                className="w-full bg-transparent text-[12px] text-[#475569] outline-none"
              />
            </label>

            {/* End Date */}
            <label className="flex h-[31px] w-[184px] items-center gap-2 rounded-[6px] border border-[#D7DCE3] bg-white px-2">
              <CalendarDays size={14} className="text-[#64748B]" />
              <input
                type="date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
                className="w-full bg-transparent text-[12px] text-[#475569] outline-none"
              />
            </label>
          </div>
        </div>

        {/* =======================================================
            AI RECAP
        ======================================================== */}
        {aiRecapVisible && (
          <section className="mt-5 rounded-[7px] border border-[#AFC8F5] bg-[#F7FAFF]">
            <div className="flex items-start justify-between gap-4 px-3 py-3">
              <div className="flex gap-2">
                <div className="mt-[1px] flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full border border-[#6B9DEB]">
                  <Sparkles size={9} className="text-[#2563EB]" />
                </div>

                <div>
                  <div className="flex items-center gap-1 text-[12px] font-medium text-[#2563EB]">
                    AI Recap
                    <span className="text-[10px]">🤔</span>
                  </div>

                  <p className="mt-1 text-[11px] leading-[17px] text-[#2563EB]">
                    Get concise AI summaries of customer reviews from your
                    selected pages and time frames!
                  </p>

                  <button
                    type="button"
                    onClick={() => setAiRecapVisible(false)}
                    className="mt-1 text-[11px] font-medium text-[#2563EB] hover:underline"
                  >
                    Check out AI Summary
                    <span className="ml-1">→</span>
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setAiRecapVisible(false)}
                className="rounded p-1 text-[#64748B] hover:bg-white"
                aria-label="Close AI recap"
              >
                <X size={15} />
              </button>
            </div>
          </section>
        )}

        {/* =======================================================
            GET STARTED
        ======================================================== */}
        <section className="mt-6 rounded-[7px] border border-[#E2E5EA] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <div className="grid grid-cols-[290px_1fr] gap-6 px-5 py-5">
            {/* Left */}
            <div className="flex flex-col justify-center">
              <div className="mb-3 text-[27px] leading-none">👋</div>

              <h2 className="text-[14px] font-medium text-[#26344D]">
                Hi there
              </h2>

              <p className="mt-2 max-w-[230px] text-[11px] leading-[17px] text-[#64748B]">
                Finish all these Steps to Set up Your Reputation Dashboard
              </p>

              <button
                type="button"
                onClick={() => setOnboardingOpen(true)}
                className="mt-2 w-fit text-[11px] text-[#2563EB] hover:underline"
              >
                Skip Onboarding
              </button>
            </div>

            {/* Right */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[12px] font-medium text-[#475569]">
                  Get Started
                </span>

                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4, 5].map((item) => (
                    <span
                      key={item}
                      className={`h-[6px] w-[24px] rounded-full ${
                        item < completedCount
                          ? "bg-[#2563EB]"
                          : "bg-[#E5E7EB]"
                      }`}
                    />
                  ))}

                  <span className="ml-2 text-[11px] text-[#475569]">
                    {completedCount}/6
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {onboardingItems.map((item) => {
                  const completed = completedItems.includes(item.id);

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleOnboardingItem(item.id)}
                      className="flex min-h-[38px] items-center justify-between rounded-[6px] border border-[#E5E7EB] px-3 text-left transition hover:bg-[#F8FAFC]"
                    >
                      <span className="flex items-center gap-2">
                        {completed ? (
                          <CheckCircle2
                            size={15}
                            className="shrink-0 text-[#2563EB]"
                          />
                        ) : (
                          <Circle
                            size={15}
                            className="shrink-0 text-[#CBD5E1]"
                          />
                        )}

                        <span
                          className={`text-[11px] ${
                            completed
                              ? "text-[#64748B] line-through"
                              : "text-[#475569]"
                          }`}
                        >
                          {item.title}
                        </span>
                      </span>

                      {item.id === 5 && !completed && (
                        <span className="flex items-center gap-1 text-[11px] font-medium text-[#2563EB]">
                          Go
                          <ChevronRight size={13} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* =======================================================
            REVIEWS AND RATINGS TREND
        ======================================================== */}
        <section className="mt-6 rounded-[7px] border border-[#E2E5EA] bg-white">
          <div className="border-b border-[#EEF1F4] px-5 py-4">
            <div className="flex items-center gap-2">
              <h2 className="text-[13px] font-medium text-[#26344D]">
                Reviews and ratings trend
              </h2>

              <span className="flex h-[15px] w-[15px] items-center justify-center rounded-full border border-[#94A3B8] text-[9px] text-[#64748B]">
                i
              </span>
            </div>

            <p className="mt-1 text-[11px] text-[#64748B]">
              Track how your ratings and review volume change over time.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 p-5">
            {/* Average Ratings */}
            <div className="min-h-[170px] rounded-[7px] border border-[#E5E7EB] p-4">
              <div className="mb-4 flex h-[25px] w-[25px] items-center justify-center rounded-full bg-[#FFF7D6]">
                <Star size={14} className="text-[#EAB308]" />
              </div>

              <div className="text-[12px] text-[#475569]">
                Average ratings
              </div>

              <div className="mt-3 text-[28px] font-semibold text-[#26344D]">
                —
              </div>

              <p className="mt-2 text-[11px] text-[#94A3B8]">
                No review data available
              </p>
            </div>

            {/* Total Reviews */}
            <div className="min-h-[170px] rounded-[7px] border border-[#E5E7EB] p-4">
              <div className="mb-4 flex h-[25px] w-[25px] items-center justify-center rounded-full bg-[#FFF7D6]">
                <MessageSquare size={14} className="text-[#EAB308]" />
              </div>

              <div className="text-[12px] text-[#475569]">
                Total reviews
              </div>

              <div className="mt-3 text-[28px] font-semibold text-[#26344D]">
                —
              </div>

              <p className="mt-2 text-[11px] text-[#94A3B8]">
                No review data available
              </p>
            </div>
          </div>

          {/* Empty chart area */}
          <div className="mx-5 mb-5 flex min-h-[220px] items-center justify-center rounded-[7px] border border-dashed border-[#DCE2EA] bg-[#FAFBFC]">
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white">
                <MessageSquare size={18} className="text-[#94A3B8]" />
              </div>

              <p className="text-[12px] font-medium text-[#64748B]">
                No review data available
              </p>

              <p className="mt-1 text-[11px] text-[#94A3B8]">
                Connect a review source to see your reputation trends.
              </p>
            </div>
          </div>
        </section>

        {/* =======================================================
            ADDITIONAL EMPTY FRONTEND SECTIONS
        ======================================================== */}
        <section className="mt-6 grid grid-cols-3 gap-4">
          <div className="rounded-[7px] border border-[#E2E5EA] bg-white p-5">
            <div className="flex items-center gap-2">
              <Star size={16} className="text-[#64748B]" />
              <h3 className="text-[12px] font-medium">Review summary</h3>
            </div>

            <div className="mt-8 text-center">
              <p className="text-[12px] text-[#64748B]">
                No data available
              </p>
            </div>
          </div>

          <div className="rounded-[7px] border border-[#E2E5EA] bg-white p-5">
            <div className="flex items-center gap-2">
              <Send size={16} className="text-[#64748B]" />
              <h3 className="text-[12px] font-medium">Review requests</h3>
            </div>

            <div className="mt-8 text-center">
              <p className="text-[12px] text-[#64748B]">
                No data available
              </p>
            </div>
          </div>

          <div className="rounded-[7px] border border-[#E2E5EA] bg-white p-5">
            <div className="flex items-center gap-2">
              <ExternalLink size={16} className="text-[#64748B]" />
              <h3 className="text-[12px] font-medium">Connected sources</h3>
            </div>

            <div className="mt-8 text-center">
              <p className="text-[12px] text-[#64748B]">
                No sources connected
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================
          SEND REVIEW REQUEST MODAL
      ========================================================== */}
      {sendRequestOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-[430px] rounded-[8px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] px-5 py-4">
              <h3 className="text-[14px] font-semibold text-[#26344D]">
                Send Review Request
              </h3>

              <button
                type="button"
                onClick={closeSendRequest}
                className="rounded p-1 text-[#64748B] hover:bg-[#F1F5F9]"
              >
                <X size={16} />
              </button>
            </div>

            <div className="px-5 py-6">
              <div className="rounded-[6px] border border-[#E5E7EB] bg-[#F8FAFC] p-4">
                <p className="text-[12px] font-medium text-[#475569]">
                  Review requests
                </p>

                <p className="mt-2 text-[11px] leading-[18px] text-[#64748B]">
                  No contacts are available yet. Connect your data source
                  before sending review requests.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-[#E5E7EB] px-5 py-3">
              <button
                type="button"
                onClick={closeSendRequest}
                className="h-[32px] rounded-[5px] border border-[#D7DCE3] px-4 text-[11px] text-[#475569] hover:bg-[#F8FAFC]"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled
                className="h-[32px] rounded-[5px] bg-[#2563EB] px-4 text-[11px] font-medium text-white opacity-50"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          SKIP ONBOARDING MODAL
      ========================================================== */}
      {onboardingOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-[400px] rounded-[8px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] px-5 py-4">
              <h3 className="text-[14px] font-semibold text-[#26344D]">
                Skip onboarding?
              </h3>

              <button
                type="button"
                onClick={() => setOnboardingOpen(false)}
                className="rounded p-1 text-[#64748B] hover:bg-[#F1F5F9]"
              >
                <X size={16} />
              </button>
            </div>

            <div className="px-5 py-5">
              <p className="text-[12px] leading-[19px] text-[#64748B]">
                You can continue setting up your reputation dashboard later.
              </p>
            </div>

            <div className="flex justify-end gap-2 border-t border-[#E5E7EB] px-5 py-3">
              <button
                type="button"
                onClick={() => setOnboardingOpen(false)}
                className="h-[32px] rounded-[5px] border border-[#D7DCE3] px-4 text-[11px] text-[#475569]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => setOnboardingOpen(false)}
                className="h-[32px] rounded-[5px] bg-[#2563EB] px-4 text-[11px] font-medium text-white hover:bg-[#1D4ED8]"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}