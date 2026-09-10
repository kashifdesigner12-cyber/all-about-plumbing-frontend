"use client";

import { useState } from "react";
import {
  Apple,
  Smartphone,
  Link2,
  Zap,
  Check,
  Search,
  X,
  ExternalLink,
  Copy,
  Download,
  MessageSquare,
  Mail,
  Menu,
  Bell,
} from "lucide-react";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/go-highlevel/id1412540076";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.gohighlevel";

export default function MobileAppPage() {
  const [autoInvite, setAutoInvite] = useState(false);
  const [teamSearch, setTeamSearch] = useState("");
  const [copied, setCopied] = useState("");
  const [activeStore, setActiveStore] = useState(null);

  const showCopied = (type) => {
    setCopied(type);

    window.setTimeout(() => {
      setCopied("");
    }, 1800);
  };

  const handleCopy = async (type, value) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        showCopied(type);
        return;
      }

      throw new Error("Clipboard API unavailable");
    } catch {
      try {
        const textarea = document.createElement("textarea");

        textarea.value = value;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        textarea.style.pointerEvents = "none";

        document.body.appendChild(textarea);
        textarea.select();

        const successful = document.execCommand("copy");

        document.body.removeChild(textarea);

        if (successful) {
          showCopied(type);
        }
      } catch {
        // Clipboard operation failed.
      }
    }
  };

  const handleDownload = (type) => {
    const url = type === "apple" ? APP_STORE_URL : PLAY_STORE_URL;

    setActiveStore(type);

    window.open(url, "_blank", "noopener,noreferrer");

    window.setTimeout(() => {
      setActiveStore(null);
    }, 1200);
  };

  const clearSearch = () => {
    setTeamSearch("");
  };

  return (
    <div className="mobile-app-page h-[calc(100vh-0px)] min-h-0 overflow-y-auto overflow-x-hidden bg-[#F7F9FC] text-[#26344D]">
      <div className="min-h-[1200px] w-full">
        {/* =====================================================
            PAGE TITLE
        ====================================================== */}
        <div className="border-b border-[#DCE2E8] bg-white px-6 py-5">
          <h1 className="text-[24px] font-normal leading-none text-[#1E293B]">
            Mobile App
          </h1>
        </div>

        <main className="w-full px-6 pb-16 pt-5">
          {/* =====================================================
              DOWNLOAD APP BANNER
          ====================================================== */}
          <section className="rounded-[6px] border border-[#D7DEE7] bg-[#F3F6FA]">
            <div className="flex min-h-[172px] flex-col items-start justify-between gap-6 px-[18px] py-[20px] sm:flex-row sm:items-center">
              {/* LEFT */}
              <div className="min-w-0">
                <h2 className="text-[26px] font-semibold leading-[34px] text-[#172033]">
                  Download HighLevel Mobile App
                </h2>

                <p className="mt-2 text-[18px] leading-[26px] text-[#3974D8]">
                  Get your mobile app from appstore and playstore now!
                </p>

                <div className="mt-4 inline-flex max-w-full items-center gap-2 rounded-full border border-[#E2E7ED] bg-white px-3 py-2 shadow-sm">
                  <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-[#FF7043] text-white">
                    <Smartphone size={14} />
                  </span>

                  <span className="truncate text-[12px] text-[#64748B]">
                    Stay connected on the go and improve your response rate
                  </span>

                  <Zap
                    size={16}
                    className="shrink-0 text-[#FF7043]"
                    fill="currentColor"
                  />
                </div>
              </div>

              {/* STORE ICONS */}
              <div className="flex shrink-0 items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleDownload("apple")}
                  title="Open Apple App Store"
                  aria-label="Open Apple App Store"
                  className="flex h-[35px] w-[35px] items-center justify-center rounded-[7px] bg-black text-white transition hover:scale-105 hover:bg-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2"
                >
                  {activeStore === "apple" ? (
                    <Check size={19} />
                  ) : (
                    <Apple size={21} fill="white" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleDownload("android")}
                  title="Open Google Play Store"
                  aria-label="Open Google Play Store"
                  className="flex h-[35px] w-[35px] items-center justify-center rounded-[7px] bg-black text-white transition hover:scale-105 hover:bg-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2"
                >
                  {activeStore === "android" ? (
                    <Check size={19} />
                  ) : (
                    <Smartphone size={18} />
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* =====================================================
              MAIN CARD
          ====================================================== */}
          <section className="mt-6 rounded-[6px] border border-[#D7DEE7] bg-white p-[17px]">
            <div className="grid grid-cols-1 gap-[18px] xl:grid-cols-[46%_54%]">
              {/* =================================================
                  LEFT COLUMN
              ================================================== */}
              <div className="min-w-0">
                {/* =================================================
                    COPY LINKS
                ================================================== */}
                <div className="rounded-[6px] border border-[#D7DEE7] bg-[#F7F9FC] p-[17px]">
                  <h3 className="text-[14px] font-medium text-[#334155]">
                    Copy Link to download app
                  </h3>

                  {/* APPLE LINK */}
                  <div className="mt-4 flex min-h-[35px] overflow-hidden rounded-[5px] border border-[#CBD5E1] bg-white">
                    <div className="flex w-[35px] shrink-0 items-center justify-center bg-black text-white">
                      <Apple size={18} fill="white" />
                    </div>

                    <input
                      value={APP_STORE_URL}
                      readOnly
                      aria-label="Apple App Store link"
                      onFocus={(event) => event.target.select()}
                      className="min-w-0 flex-1 bg-white px-3 text-[11px] text-[#64748B] outline-none"
                    />

                    <button
                      type="button"
                      onClick={() => handleCopy("apple", APP_STORE_URL)}
                      className="flex w-[96px] shrink-0 items-center justify-center gap-1.5 border-l border-[#CBD5E1] bg-white text-[11px] text-[#3974D8] transition hover:bg-[#EFF6FF] focus:outline-none focus:ring-1 focus:ring-inset focus:ring-[#3974D8]"
                    >
                      {copied === "apple" ? (
                        <>
                          <Check size={14} />
                          Copied
                        </>
                      ) : (
                        <>
                          <Link2 size={14} />
                          Download
                        </>
                      )}
                    </button>
                  </div>

                  {/* GOOGLE LINK */}
                  <div className="mt-3 flex min-h-[35px] overflow-hidden rounded-[5px] border border-[#CBD5E1] bg-white">
                    <div className="flex w-[35px] shrink-0 items-center justify-center bg-black text-white">
                      <Smartphone size={17} />
                    </div>

                    <input
                      value={PLAY_STORE_URL}
                      readOnly
                      aria-label="Google Play Store link"
                      onFocus={(event) => event.target.select()}
                      className="min-w-0 flex-1 bg-white px-3 text-[11px] text-[#64748B] outline-none"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        handleCopy("android", PLAY_STORE_URL)
                      }
                      className="flex w-[96px] shrink-0 items-center justify-center gap-1.5 border-l border-[#CBD5E1] bg-white text-[11px] text-[#3974D8] transition hover:bg-[#EFF6FF] focus:outline-none focus:ring-1 focus:ring-inset focus:ring-[#3974D8]"
                    >
                      {copied === "android" ? (
                        <>
                          <Check size={14} />
                          Copied
                        </>
                      ) : (
                        <>
                          <Link2 size={14} />
                          Download
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* =================================================
                    INVITE USERS
                ================================================== */}
                <div className="mt-4 rounded-[6px] border border-[#D7DEE7] bg-[#F7F9FC] p-[17px]">
                  <h3 className="text-[15px] font-medium text-[#334155]">
                    Invite users to download app
                  </h3>

                  {/* CHECKBOX */}
                  <label className="mt-5 flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={autoInvite}
                      onChange={(event) =>
                        setAutoInvite(event.target.checked)
                      }
                      className="h-[15px] w-[15px] cursor-pointer accent-[#3974D8]"
                    />

                    <span className="text-[11px] text-[#64748B]">
                      Automatically send invite when new user added
                    </span>
                  </label>

                  {/* TEAM MEMBER SEARCH */}
                  <div className="mt-5">
                    <label
                      htmlFor="team-member-search"
                      className="text-[11px] text-[#475569]"
                    >
                      Team member
                    </label>

                    <div className="relative mt-2">
                      <Search
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                      />

                      <input
                        id="team-member-search"
                        type="text"
                        value={teamSearch}
                        onChange={(event) =>
                          setTeamSearch(event.target.value)
                        }
                        placeholder="Search"
                        autoComplete="off"
                        className="h-[36px] w-full rounded-[5px] border border-[#CBD5E1] bg-white pl-9 pr-9 text-[11px] outline-none transition focus:border-[#3974D8] focus:ring-1 focus:ring-[#DBEAFE]"
                      />

                      {teamSearch && (
                        <button
                          type="button"
                          onClick={clearSearch}
                          aria-label="Clear team member search"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] transition hover:text-[#475569]"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>

                    {/* FRONTEND EMPTY STATE */}
                    {teamSearch && (
                      <div className="mt-2 rounded-[5px] border border-[#E2E8F0] bg-white px-3 py-3">
                        <p className="text-[11px] text-[#94A3B8]">
                          No team members available.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* =================================================
                    INFORMATION
                ================================================== */}
                <div className="mt-4 rounded-[6px] border border-[#D7DEE7] bg-white p-[17px]">
                  <div className="flex items-start gap-3">
                    <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#3974D8]">
                      <MessageSquare size={16} />
                    </div>

                    <div>
                      <h3 className="text-[14px] font-medium text-[#334155]">
                        Mobile communication
                      </h3>

                      <p className="mt-1 text-[11px] leading-[18px] text-[#64748B]">
                        Access your conversations and stay connected with
                        your customers from your mobile device.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================
                  RIGHT COLUMN
              ================================================== */}
              <div className="min-w-0 rounded-[6px] border border-[#EEF0F3] bg-[#FBFBFC] p-5">
                {/* HEADER */}
                <div className="flex items-center gap-3">
                  <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[8px] border border-[#D9E0E8] bg-white">
                    <Smartphone
                      size={23}
                      className="text-[#3974D8]"
                    />
                  </div>

                  <h3 className="text-[15px] font-medium text-[#334155]">
                    Conversations
                  </h3>
                </div>

                {/* DESCRIPTION AREA */}
                <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[42%_58%]">
                  {/* =================================================
                      PHONE MOCKUP
                  ================================================== */}
                  <div className="flex min-h-[430px] items-start justify-center">
                    <div className="relative mt-1 h-[425px] w-[200px] overflow-hidden rounded-[30px] border-[6px] border-[#151515] bg-white shadow-xl">
                      {/* NOTCH */}
                      <div className="absolute left-1/2 top-0 z-20 h-[20px] w-[80px] -translate-x-1/2 rounded-b-[13px] bg-[#151515]" />

                      {/* STATUS BAR */}
                      <div className="flex items-center justify-between px-3 pb-1 pt-2 text-[7px] font-medium text-[#334155]">
                        <span>11:16</span>

                        <div className="flex items-center gap-1">
                          <span>●</span>
                          <span>●</span>
                          <span>▮</span>
                        </div>
                      </div>

                      {/* APP HEADER */}
                      <div className="border-b border-[#E5E7EB] px-3 pb-2 pt-2">
                        <div className="flex items-center justify-between">
                          <Menu size={11} />

                          <span className="text-[8px] font-semibold text-[#334155]">
                            Conversations
                          </span>

                          <Bell size={10} />
                        </div>
                      </div>

                      {/* FILTERS */}
                      <div className="flex gap-1 border-b border-[#F1F5F9] px-2 py-2">
                        <span className="rounded-full bg-[#2563EB] px-2 py-1 text-[6px] text-white">
                          Unread
                        </span>

                        <span className="rounded-full bg-[#F1F5F9] px-2 py-1 text-[6px] text-[#64748B]">
                          Recent
                        </span>

                        <span className="rounded-full bg-[#F1F5F9] px-2 py-1 text-[6px] text-[#64748B]">
                          All
                        </span>
                      </div>

                      {/* EMPTY STATE */}
                      <div className="px-2 pt-3">
                        <div className="rounded-[6px] border border-dashed border-[#CBD5E1] px-3 py-8 text-center">
                          <MessageSquare
                            size={20}
                            className="mx-auto text-[#CBD5E1]"
                          />

                          <p className="mt-2 text-[8px] font-medium text-[#64748B]">
                            Conversations
                          </p>

                          <p className="mt-1 text-[7px] leading-[12px] text-[#94A3B8]">
                            Your conversations will appear here.
                          </p>
                        </div>
                      </div>

                      {/* BOTTOM NAVIGATION */}
                      <div className="absolute bottom-0 left-0 right-0 flex h-[40px] items-center justify-around border-t border-[#E5E7EB] bg-white">
                        <div className="text-center">
                          <MessageSquare
                            size={12}
                            className="mx-auto text-[#2563EB]"
                          />

                          <span className="text-[5px] text-[#2563EB]">
                            Chats
                          </span>
                        </div>

                        <div className="text-center">
                          <Bell
                            size={12}
                            className="mx-auto text-[#94A3B8]"
                          />

                          <span className="text-[5px] text-[#94A3B8]">
                            Alerts
                          </span>
                        </div>

                        <div className="text-center">
                          <Smartphone
                            size={12}
                            className="mx-auto text-[#94A3B8]"
                          />

                          <span className="text-[5px] text-[#94A3B8]">
                            More
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* =================================================
                      DESCRIPTION
                  ================================================== */}
                  <div className="rounded-[5px] bg-[#E6E6E6] p-5">
                    <h4 className="text-[14px] font-medium text-[#334155]">
                      Conversations
                    </h4>

                    <p className="mt-3 text-[11px] leading-[19px] text-[#64748B]">
                      Enables you to seamlessly communicate with your
                      potential and existing customers across multiple
                      channels from a single platform.
                    </p>

                    <p className="mt-3 text-[11px] leading-[19px] text-[#64748B]">
                      You can manage conversations from leads on Google My
                      Business, Facebook, Instagram, Messages, and Email,
                      all in one place.
                    </p>

                    {/* CHANNELS */}
                    <div className="mt-6 space-y-2">
                      {/* MESSAGES */}
                      <div className="flex items-center gap-2 rounded-[5px] bg-white px-3 py-2">
                        <MessageSquare
                          size={14}
                          className="text-[#3974D8]"
                        />

                        <span className="text-[10px] text-[#475569]">
                          Messages
                        </span>
                      </div>

                      {/* FACEBOOK */}
                      <div className="flex items-center gap-2 rounded-[5px] bg-white px-3 py-2">
                        <span className="flex h-[14px] w-[14px] items-center justify-center rounded-full bg-[#1877F2] text-[9px] font-bold leading-none text-white">
                          f
                        </span>

                        <span className="text-[10px] text-[#475569]">
                          Facebook
                        </span>
                      </div>

                      {/* INSTAGRAM */}
                      <div className="flex items-center gap-2 rounded-[5px] bg-white px-3 py-2">
                        <span className="flex h-[14px] w-[14px] items-center justify-center rounded-[4px] bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-[8px] font-bold leading-none text-white">
                          ◎
                        </span>

                        <span className="text-[10px] text-[#475569]">
                          Instagram
                        </span>
                      </div>

                      {/* EMAIL */}
                      <div className="flex items-center gap-2 rounded-[5px] bg-white px-3 py-2">
                        <Mail
                          size={14}
                          className="text-[#3974D8]"
                        />

                        <span className="text-[10px] text-[#475569]">
                          Email
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =====================================================
                LOWER SECTION
            ====================================================== */}
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* QUICK DOWNLOAD */}
              <div className="rounded-[6px] border border-[#D7DEE7] bg-white p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[15px] font-medium text-[#334155]">
                      Download the app
                    </h3>

                    <p className="mt-1 text-[11px] text-[#64748B]">
                      Choose your mobile platform.
                    </p>
                  </div>

                  <Download
                    size={20}
                    className="text-[#3974D8]"
                  />
                </div>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {/* APP STORE */}
                  <button
                    type="button"
                    onClick={() => handleDownload("apple")}
                    className="flex h-[40px] items-center justify-center gap-2 rounded-[5px] bg-black px-4 text-[11px] font-medium text-white transition hover:bg-[#1F1F1F] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2"
                  >
                    <Apple size={17} fill="white" />

                    {activeStore === "apple"
                      ? "Opening..."
                      : "App Store"}

                    <ExternalLink size={12} />
                  </button>

                  {/* GOOGLE PLAY */}
                  <button
                    type="button"
                    onClick={() => handleDownload("android")}
                    className="flex h-[40px] items-center justify-center gap-2 rounded-[5px] bg-black px-4 text-[11px] font-medium text-white transition hover:bg-[#1F1F1F] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2"
                  >
                    <Smartphone size={17} />

                    {activeStore === "android"
                      ? "Opening..."
                      : "Google Play"}

                    <ExternalLink size={12} />
                  </button>
                </div>
              </div>

              {/* LINK MANAGEMENT */}
              <div className="rounded-[6px] border border-[#D7DEE7] bg-white p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[15px] font-medium text-[#334155]">
                      Download links
                    </h3>

                    <p className="mt-1 text-[11px] text-[#64748B]">
                      Copy a link to share with your team.
                    </p>
                  </div>

                  <Copy
                    size={19}
                    className="text-[#3974D8]"
                  />
                </div>

                <div className="mt-5 space-y-3">
                  {/* APPLE */}
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy("apple", APP_STORE_URL)
                    }
                    className="flex h-[38px] w-full items-center justify-between rounded-[5px] border border-[#CBD5E1] bg-white px-3 text-left transition hover:bg-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-[#3974D8]"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <Apple
                        size={15}
                        fill="currentColor"
                      />

                      <span className="truncate text-[10px] text-[#475569]">
                        Apple App Store
                      </span>
                    </span>

                    {copied === "apple" ? (
                      <Check
                        size={14}
                        className="shrink-0 text-[#16A34A]"
                      />
                    ) : (
                      <Copy
                        size={14}
                        className="shrink-0 text-[#64748B]"
                      />
                    )}
                  </button>

                  {/* GOOGLE PLAY */}
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy("android", PLAY_STORE_URL)
                    }
                    className="flex h-[38px] w-full items-center justify-between rounded-[5px] border border-[#CBD5E1] bg-white px-3 text-left transition hover:bg-[#F8FAFC] focus:outline-none focus:ring-1 focus:ring-[#3974D8]"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <Smartphone
                        size={15}
                        className="shrink-0"
                      />

                      <span className="truncate text-[10px] text-[#475569]">
                        Google Play Store
                      </span>
                    </span>

                    {copied === "android" ? (
                      <Check
                        size={14}
                        className="shrink-0 text-[#16A34A]"
                      />
                    ) : (
                      <Copy
                        size={14}
                        className="shrink-0 text-[#64748B]"
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* =====================================================
                FOOTER INFORMATION
            ====================================================== */}
            <div className="mt-5 rounded-[6px] border border-[#D7DEE7] bg-[#F8FAFD] p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-[14px] font-medium text-[#334155]">
                    Stay connected on the go
                  </h3>

                  <p className="mt-1 text-[11px] leading-[18px] text-[#64748B]">
                    Download the mobile app to manage conversations and
                    customer communication from anywhere.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleDownload("apple")}
                  className="flex h-[36px] shrink-0 items-center justify-center gap-2 rounded-[5px] bg-[#2563EB] px-4 text-[11px] font-medium text-white transition hover:bg-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2"
                >
                  <Download size={14} />
                  Download App
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* =========================================================
          CUSTOM SCROLLBAR
      ========================================================== */}
      <style jsx>{`
        .mobile-app-page {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }

        .mobile-app-page::-webkit-scrollbar {
          width: 8px;
        }

        .mobile-app-page::-webkit-scrollbar-track {
          background: transparent;
        }

        .mobile-app-page::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 999px;
        }

        .mobile-app-page::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}