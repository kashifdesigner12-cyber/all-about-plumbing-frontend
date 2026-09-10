"use client";

import { useState } from "react";
import {
  Plus,
  FileText,
  Share2,
  Lightbulb,
  X,
  ChevronDown,
  BarChart3,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function ReportingPage() {
  const [activeTab, setActiveTab] = useState("Custom reports");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const tabs = [
    "Custom reports",
    "Google Ads",
    "Meta Ads (Facebook Ads) report",
    "Attribution report",
    "Call report",
    "Agent report",
    "Appointment report",
    "Local Marketing Audit",
  ];

  const handleCreateReport = () => {
    setShowCreateModal(true);
  };

  return (
    <div className="min-h-full w-full bg-white text-[#26344D]">
      {/* =========================================================
          TOP REPORTING NAVIGATION
      ========================================================== */}
      <div className="sticky top-0 z-30 border-b border-[#E5E7EB] bg-white">
        <div className="flex h-[47px] items-center overflow-x-auto px-3">
          <div className="mr-4 shrink-0 text-[15px] font-medium text-[#26344D]">
            Reporting
          </div>

          {tabs.map((tab) => {
            const active = activeTab === tab;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative flex h-full shrink-0 items-center whitespace-nowrap px-3 text-[11px] transition ${
                  active
                    ? "font-medium text-[#2563EB]"
                    : "text-[#475569] hover:text-[#2563EB]"
                }`}
              >
                {tab}

                {active && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-[#2563EB]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================
          PAGE BODY
      ========================================================== */}
      <main className="min-h-[calc(100vh-47px)] overflow-y-auto px-4 pb-16">
        {activeTab === "Custom reports" ? (
          <>
            {/* ===================================================
                HERO / EMPTY STATE
            ==================================================== */}
            <section className="mx-auto flex max-w-[850px] flex-col items-center px-4 pt-12 text-center">
              {/* Report illustration */}
              <div className="relative mb-4 h-[140px] w-[190px]">
                <div className="absolute left-[37px] top-[5px] h-[128px] w-[142px] rounded-[9px] border border-[#CBD5E1] bg-white shadow-sm">
                  <div className="flex h-[18px] items-center gap-1 border-b border-[#E2E8F0] px-2">
                    <span className="h-[4px] w-[4px] rounded-full bg-[#CBD5E1]" />
                    <span className="h-[4px] w-[4px] rounded-full bg-[#CBD5E1]" />
                    <span className="h-[4px] w-[4px] rounded-full bg-[#CBD5E1]" />
                  </div>

                  <div className="px-5 pt-4">
                    <div className="mb-2 h-[4px] w-[80px] rounded bg-[#CBD5E1]" />
                    <div className="mb-2 h-[4px] w-[55px] rounded bg-[#E2E8F0]" />
                    <div className="mb-3 h-[4px] w-[70px] rounded bg-[#E2E8F0]" />

                    <div className="absolute right-[19px] top-[38px] flex h-[34px] w-[34px] items-center justify-center rounded-full border-[5px] border-[#DDE8FF] border-t-[#2563EB] border-r-[#2563EB]">
                      <div className="h-[15px] w-[15px] rounded-full bg-white" />
                    </div>

                    <div className="mt-4 flex h-[36px] items-end gap-[4px]">
                      <span className="h-[12px] w-[7px] rounded-t bg-[#CBD5E1]" />
                      <span className="h-[19px] w-[7px] rounded-t bg-[#CBD5E1]" />
                      <span className="h-[15px] w-[7px] rounded-t bg-[#CBD5E1]" />
                      <span className="h-[27px] w-[7px] rounded-t bg-[#CBD5E1]" />
                      <span className="h-[21px] w-[7px] rounded-t bg-[#CBD5E1]" />
                      <span className="h-[31px] w-[7px] rounded-t bg-[#CBD5E1]" />
                      <span className="h-[24px] w-[7px] rounded-t bg-[#CBD5E1]" />
                      <span className="h-[34px] w-[7px] rounded-t bg-[#CBD5E1]" />
                    </div>
                  </div>

                  <div className="absolute bottom-[20px] left-[19px] h-[30px] w-[95px]">
                    <svg
                      viewBox="0 0 100 35"
                      className="h-full w-full"
                      fill="none"
                    >
                      <path
                        d="M2 28 C15 24, 24 19, 34 22 C46 25, 52 10, 63 14 C74 18, 80 7, 98 5"
                        stroke="#6B9AEF"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                </div>

                <div className="absolute left-[28px] top-[13px] h-[125px] w-[135px] rounded-[9px] border border-[#CBD5E1] bg-white opacity-60" />
              </div>

              <h1 className="text-[19px] font-semibold tracking-[-0.2px] text-[#1E293B]">
                Turn your data into insights that drive growth
              </h1>

              <p className="mt-2 max-w-[480px] text-[12px] leading-[18px] text-[#64748B]">
                Create powerful reports to uncover trends, track performance,
                and make
                <br />
                data-backed decisions, all in one place.
              </p>

              <button
                type="button"
                onClick={handleCreateReport}
                className="mt-4 flex h-[31px] items-center gap-2 rounded-[4px] bg-[#2563EB] px-4 text-[11px] font-semibold text-white transition hover:bg-[#1D4ED8]"
              >
                <Plus size={15} />
                Create your first report
              </button>
            </section>

            {/* ===================================================
                THREE FEATURE CARDS
            ==================================================== */}
            <section className="mx-auto mt-5 grid max-w-[820px] grid-cols-3 gap-3">
              {/* Card 1 */}
              <div className="min-h-[145px] rounded-[3px] border border-[#CBD5E1] bg-white px-5 py-4 text-center">
                <div className="mx-auto flex h-[37px] w-[37px] items-center justify-center rounded-full bg-[#EFF6FF]">
                  <FileText size={18} className="text-[#2563EB]" />
                </div>

                <h2 className="mt-3 text-[12px] font-medium text-[#26344D]">
                  Build beautiful, multi-page reports
                </h2>

                <p className="mt-1 text-[10px] leading-[15px] text-[#64748B]">
                  Design detailed, professional reports that bring your data
                  to life - all within a clean, drag & drop builder.
                </p>
              </div>

              {/* Card 2 */}
              <div className="min-h-[145px] rounded-[3px] border border-[#CBD5E1] bg-white px-5 py-4 text-center">
                <div className="mx-auto flex h-[37px] w-[37px] items-center justify-center rounded-full bg-[#FFF4F3]">
                  <Share2 size={18} className="text-[#E25555]" />
                </div>

                <h2 className="mt-3 text-[12px] font-medium text-[#26344D]">
                  Share reports automatically
                </h2>

                <p className="mt-1 text-[10px] leading-[15px] text-[#64748B]">
                  Set custom delivery schedules to keep your team and
                  stakeholders informed without lifting a finger.
                </p>
              </div>

              {/* Card 3 */}
              <div className="min-h-[145px] rounded-[3px] border border-[#CBD5E1] bg-white px-5 py-4 text-center">
                <div className="mx-auto flex h-[37px] w-[37px] items-center justify-center rounded-full bg-[#FFF9E8]">
                  <Lightbulb size={18} className="text-[#E9A817]" />
                </div>

                <h2 className="mt-3 text-[12px] font-medium text-[#26344D]">
                  Turn data into smart insights
                </h2>

                <p className="mt-1 text-[10px] leading-[15px] text-[#64748B]">
                  Highlight key takeaways, add commentary, and turn raw data
                  into clear, actionable stories.
                </p>
              </div>
            </section>

            {/* ===================================================
                LOWER SECTION
            ==================================================== */}
            <section className="mx-auto mt-7 max-w-[820px] border-t border-[#E5E7EB] pt-7">
              <div className="rounded-[4px] border border-[#CBD5E1] bg-white p-5">
                <div className="flex items-center justify-between gap-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-[37px] w-[37px] shrink-0 items-center justify-center rounded-[4px] border border-[#CBD5E1] bg-white">
                      <BarChart3 size={18} className="text-[#2563EB]" />
                    </div>

                    <div>
                      <h3 className="text-[12px] font-medium text-[#26344D]">
                        Looking to track key client metrics at a glance?
                      </h3>

                      <p className="mt-1 text-[10px] leading-[15px] text-[#64748B]">
                        Create a custom report to organize the metrics and
                        insights that matter most to your business.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCreateReport}
                    className="flex h-[31px] shrink-0 items-center gap-1 rounded-[4px] border border-[#CBD5E1] px-3 text-[10px] font-medium text-[#2563EB] hover:bg-[#F8FAFC]"
                  >
                    Create report
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </section>
          </>
        ) : (
          /* =====================================================
             OTHER REPORT TABS
          ====================================================== */
          <section className="flex min-h-[calc(100vh-90px)] items-center justify-center">
            <div className="max-w-[500px] text-center">
              <div className="mx-auto flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#EFF6FF]">
                <BarChart3 size={24} className="text-[#2563EB]" />
              </div>

              <h2 className="mt-4 text-[18px] font-semibold text-[#26344D]">
                {activeTab}
              </h2>

              <p className="mt-2 text-[12px] leading-[18px] text-[#64748B]">
                This reporting section is ready for real data and backend
                integration. No demo or fake records are displayed.
              </p>

              <button
                type="button"
                onClick={() => setActiveTab("Custom reports")}
                className="mt-4 h-[31px] rounded-[4px] bg-[#2563EB] px-4 text-[11px] font-medium text-white hover:bg-[#1D4ED8]"
              >
                Back to Custom reports
              </button>
            </div>
          </section>
        )}
      </main>

      {/* =========================================================
          CREATE REPORT MODAL
      ========================================================== */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-[470px] rounded-[8px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] px-5 py-4">
              <div>
                <h2 className="text-[14px] font-semibold text-[#26344D]">
                  Create report
                </h2>

                <p className="mt-1 text-[10px] text-[#64748B]">
                  Start building a custom report.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="rounded-[4px] p-1 text-[#64748B] hover:bg-[#F1F5F9]"
              >
                <X size={16} />
              </button>
            </div>

            <div className="px-5 py-5">
              <label className="block text-[11px] font-medium text-[#475569]">
                Report name
              </label>

              <input
                type="text"
                placeholder="Enter report name"
                className="mt-2 h-[34px] w-full rounded-[5px] border border-[#CBD5E1] px-3 text-[11px] outline-none focus:border-[#2563EB]"
              />

              <div className="mt-4 rounded-[5px] border border-[#E2E8F0] bg-[#F8FAFC] p-3">
                <div className="flex gap-2">
                  <Sparkles
                    size={15}
                    className="mt-[1px] shrink-0 text-[#2563EB]"
                  />

                  <p className="text-[10px] leading-[16px] text-[#64748B]">
                    Report data will be connected when the backend and real
                    reporting sources are integrated.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-[#E5E7EB] px-5 py-3">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="h-[31px] rounded-[4px] border border-[#CBD5E1] px-4 text-[11px] text-[#475569] hover:bg-[#F8FAFC]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="h-[31px] rounded-[4px] bg-[#2563EB] px-4 text-[11px] font-medium text-white hover:bg-[#1D4ED8]"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          INFO BUTTON
      ========================================================== */}
      {showMoreInfo && (
        <div className="fixed bottom-5 right-5 z-[90] w-[280px] rounded-[7px] border border-[#CBD5E1] bg-white p-4 shadow-xl">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-[12px] font-semibold text-[#26344D]">
                Reporting
              </h3>

              <p className="mt-1 text-[10px] leading-[16px] text-[#64748B]">
                Create and manage custom reports from your available reporting
                sources.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowMoreInfo(false)}
              className="text-[#64748B]"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}