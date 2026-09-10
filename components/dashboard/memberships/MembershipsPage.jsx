"use client";

import { useState } from "react";

import {
  ChevronDown,
  Copy,
  Link2,
  Send,
  Settings,
  Users,
  UserPlus,
  X,
  Check,
  BookOpen,
  Plus,
  Smartphone,
  ShieldCheck,
  Search,
  MoreHorizontal,
} from "lucide-react";

export default function MembershipsPage() {
  const [activeTab, setActiveTab] = useState("Client Portal");

  const [magicLinkOpen, setMagicLinkOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [coursesOpen, setCoursesOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [credentialsOpen, setCredentialsOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState("");

  const [portalEnabled, setPortalEnabled] = useState(true);
  const [requireApproval, setRequireApproval] = useState(false);

  const showToast = (message) => {
    setToast(message);

    if (typeof window !== "undefined") {
      window.clearTimeout(window.membershipToastTimer);

      window.membershipToastTimer = window.setTimeout(() => {
        setToast("");
      }, 2200);
    }
  };

  const copyPortalUrl = async () => {
    const path = "/client-portal";

    try {
      if (
        typeof navigator !== "undefined" &&
        navigator.clipboard
      ) {
        await navigator.clipboard.writeText(
          `${window.location.origin}${path}`
        );

        setCopied(true);
        showToast("Portal URL copied");

        window.setTimeout(() => {
          setCopied(false);
        }, 1500);
      } else {
        showToast("Copy is not supported");
      }
    } catch {
      showToast("Unable to copy URL");
    }
  };

  const submitInvite = (event) => {
    event.preventDefault();

    if (!email.trim()) {
      showToast("Please enter a client email");
      return;
    }

    setInviteOpen(false);
    setEmail("");

    showToast("Invitation prepared");
  };

  const submitLogin = (event) => {
    event.preventDefault();

    if (!email.trim()) {
      showToast("Please enter a client email");
      return;
    }

    setLoginOpen(false);
    setEmail("");

    showToast("Login email prepared");
  };

  const generateMagicLink = () => {
    setMagicLinkOpen(false);
    showToast("Magic link generation ready");
  };

  return (
    <div className="flex min-h-screen w-full flex-col overflow-hidden bg-[#f8fafc] text-[#26344d]">

      {/* =====================================================
          MEMBERSHIPS TOP NAVIGATION
      ====================================================== */}

      <header className="sticky top-0 z-50 border-b border-[#e2e6eb] bg-white">

        <div className="flex h-[44px] items-center overflow-x-auto px-4">

          <div className="mr-6 shrink-0 text-[14px] font-semibold text-[#26344d]">
            Memberships
          </div>

          {/* CLIENT PORTAL */}

          <button
            type="button"
            onClick={() => {
              setActiveTab("Client Portal");
              setCoursesOpen(false);
              setCommunityOpen(false);
              setCredentialsOpen(false);
            }}
            className={`relative flex h-full shrink-0 items-center gap-1 px-3 text-[11px] ${
              activeTab === "Client Portal"
                ? "font-medium text-[#2563eb]"
                : "text-[#64748b] hover:text-[#26344d]"
            }`}
          >
            Client Portal
            <ChevronDown size={12} />

            {activeTab === "Client Portal" && (
              <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-[#2563eb]" />
            )}
          </button>

          {/* COURSES */}

          <NavigationMenu
            label="Courses"
            open={coursesOpen}
            setOpen={setCoursesOpen}
            closeOthers={() => {
              setCommunityOpen(false);
              setCredentialsOpen(false);
            }}
            items={[
              "All Courses",
              "Create Course",
              "Course Settings",
            ]}
            onSelect={showToast}
          />

          {/* COMMUNITIES */}

          <NavigationMenu
            label="Communities"
            open={communityOpen}
            setOpen={setCommunityOpen}
            closeOthers={() => {
              setCoursesOpen(false);
              setCredentialsOpen(false);
            }}
            items={[
              "All Communities",
              "Create Community",
              "Community Settings",
            ]}
            onSelect={showToast}
          />

          {/* CREDENTIALS */}

          <NavigationMenu
            label="Credentials"
            open={credentialsOpen}
            setOpen={setCredentialsOpen}
            closeOthers={() => {
              setCoursesOpen(false);
              setCommunityOpen(false);
            }}
            items={[
              "All Credentials",
              "Create Credential",
              "Credential Settings",
            ]}
            onSelect={showToast}
          />

          {/* MARKETPLACE */}

          <button
            type="button"
            onClick={() => showToast("Marketplace selected")}
            className="relative shrink-0 px-3 text-[11px] text-[#64748b] hover:text-[#26344d]"
          >
            Gokollab Marketplace

            <span className="absolute -right-1 -top-2 rounded bg-[#facc15] px-1 text-[6px] font-bold text-black">
              New
            </span>
          </button>

          {/* SETTINGS */}

          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[#64748b] hover:bg-[#f1f5f9]"
          >
            <Settings size={14} />
          </button>

        </div>
      </header>


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="h-[calc(100vh-44px)] w-full overflow-y-auto overflow-x-hidden px-5 pb-20 pt-5">

        {/* =====================================================
            PROMOTIONAL BANNER
        ====================================================== */}

        <section className="relative h-[118px] overflow-hidden rounded-[8px] bg-gradient-to-r from-[#c879a7] via-[#ad98c5] to-[#5ca8dc]">

          <div className="relative z-20 flex h-full items-center px-7">

            <div>

              <h1 className="text-[27px] font-semibold tracking-[-0.6px] text-white">
                Your Brand. Your App.
              </h1>

              <p className="mt-1 max-w-[320px] text-[11px] leading-[17px] text-white/95">
                Launch your white label app with courses
                and communities
              </p>

            </div>

          </div>

          {/* PHONE 1 */}

          <div className="absolute right-[240px] top-[-25px] hidden h-[175px] w-[103px] rotate-[11deg] rounded-[18px] border-[5px] border-white bg-white shadow-lg lg:block">

            <div className="m-2 h-5 rounded bg-[#f1f5f9]" />

            <div className="mx-2 mt-2 h-10 rounded bg-[#dbeafe]" />

            <div className="mx-2 mt-2 h-6 rounded bg-[#f1f5f9]" />

            <div className="mx-2 mt-2 h-6 rounded bg-[#e2e8f0]" />

          </div>

          {/* PHONE 2 */}

          <div className="absolute right-[120px] top-[-25px] hidden h-[175px] w-[103px] rotate-[-8deg] rounded-[18px] border-[5px] border-white bg-white shadow-lg lg:block">

            <div className="m-2 h-5 rounded bg-[#f1f5f9]" />

            <div className="mx-2 mt-2 h-8 rounded bg-[#e0f2fe]" />

            <div className="mx-2 mt-2 h-6 rounded bg-[#f1f5f9]" />

            <div className="mx-2 mt-2 h-6 rounded bg-[#e2e8f0]" />

            <div className="mx-2 mt-2 h-6 rounded bg-[#2563eb]" />

          </div>

          {/* LEARN MORE */}

          <button
            type="button"
            onClick={() => showToast("Learn More selected")}
            className="absolute right-5 top-1/2 z-30 -translate-y-1/2 rounded-md bg-white px-4 py-2 text-[10px] font-semibold text-[#2563eb] shadow-sm transition hover:bg-[#f8fafc] active:scale-95"
          >
            Learn More
          </button>

        </section>


        {/* =====================================================
            DASHBOARD TITLE
        ====================================================== */}

        <section className="mt-6">

          <h2 className="text-[25px] font-medium tracking-[-0.5px]">
            Dashboard
          </h2>

          <p className="mt-1 text-[11px] text-[#64748b]">
            Manage your client portal activities
          </p>

        </section>


        {/* =====================================================
            PORTAL OVERVIEW
        ====================================================== */}

        <section className="mt-6 overflow-hidden rounded-[8px] border border-[#dfe4ea] bg-white">

          <div className="border-b border-[#e5e7eb] px-5 py-4">

            <h3 className="text-[14px] font-semibold">
              Creating a protected online gateway for client
              interactions
            </h3>

          </div>


          <div className="grid grid-cols-1 gap-5 p-5 xl:grid-cols-[minmax(0,1fr)_350px]">

            {/* DESCRIPTION */}

            <div className="rounded-[8px] bg-[#f8fafc] p-5">

              <div className="flex items-start justify-between">

                <div>

                  <h4 className="text-[14px] font-medium">
                    What is a client portal?
                  </h4>

                  <p className="mt-2 max-w-[690px] text-[10px] leading-[17px] text-[#64748b]">
                    Your clients can log in anytime to
                    access courses, communities and manage
                    their membership activities.
                  </p>

                </div>

                <div
                  className={`flex items-center gap-1 rounded-full px-2 py-1 text-[8px] font-medium ${
                    portalEnabled
                      ? "bg-[#dcfce7] text-[#15803d]"
                      : "bg-[#fee2e2] text-[#b91c1c]"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />

                  {portalEnabled ? "Enabled" : "Disabled"}
                </div>

              </div>


              <div className="mt-6">

                <p className="text-[11px] font-medium">
                  Client portal URL
                </p>

                <div className="mt-1 flex items-center gap-1">

                  <span className="text-[11px] text-[#2563eb]">
                    /client-portal
                  </span>

                  <button
                    type="button"
                    onClick={copyPortalUrl}
                    className="rounded p-1 hover:bg-[#e5edff]"
                    title="Copy URL"
                  >
                    {copied ? (
                      <Check
                        size={13}
                        className="text-green-600"
                      />
                    ) : (
                      <Copy
                        size={13}
                        className="text-[#2563eb]"
                      />
                    )}
                  </button>

                </div>

              </div>

            </div>


            {/* STATS */}

            <div className="grid grid-cols-2 gap-4 xl:grid-cols-1">

              {/* Empty/real-data-ready state: 0 */}

              <StatCard
                icon={UserPlus}
                title="Invited"
                value="0"
              />

              <StatCard
                icon={Users}
                title="Users"
                value="0"
              />

            </div>

          </div>

        </section>


        {/* =====================================================
            ACTIONS + CLIENT PORTAL APP
            THIS IS DIRECTLY BELOW THE PORTAL OVERVIEW
        ====================================================== */}

        <section className="mt-5 grid w-full grid-cols-1 gap-5 xl:grid-cols-2">

          {/* ===================================================
              ACTIONS
          ==================================================== */}

          <div className="overflow-hidden rounded-[8px] border border-[#dfe4ea] bg-white">

            <div className="flex h-[55px] items-center justify-between border-b border-[#e5e7eb] px-5">

              <h3 className="text-[14px] font-semibold">
                Actions
              </h3>

              <button
                type="button"
                onClick={() =>
                  showToast("More actions opened")
                }
                className="rounded-md p-1.5 text-[#64748b] hover:bg-[#f1f5f9]"
              >
                <MoreHorizontal size={15} />
              </button>

            </div>


            {/* GENERATE MAGIC LINK */}

            <ActionRow
              icon={Link2}
              title="Generate magic link"
              button="Generate"
              onClick={() => setMagicLinkOpen(true)}
            />


            {/* INVITE */}

            <ActionRow
              icon={UserPlus}
              title="Invite to client portal"
              button="Invite"
              onClick={() => setInviteOpen(true)}
            />


            {/* SEND LOGIN EMAIL */}

            <ActionRow
              icon={Send}
              title="Send login email"
              button="Send"
              onClick={() => setLoginOpen(true)}
              last
            />

          </div>


          {/* ===================================================
              CLIENT PORTAL APP
          ==================================================== */}

          <div className="min-h-[256px] overflow-hidden rounded-[8px] border border-[#dfe4ea] bg-white">

            <div className="flex items-center gap-3 px-5 pt-5">

              <div className="flex h-[34px] w-[34px] items-center justify-center rounded-lg border-2 border-[#2563eb] text-[#2563eb]">
                <Smartphone size={17} />
              </div>

              <div>

                <h3 className="text-[14px] font-medium">
                  Client Portal App
                </h3>

                <p className="mt-0.5 text-[9px] text-[#94a3b8]">
                  Your branded client experience
                </p>

              </div>

            </div>


            <div className="relative flex h-[190px] items-center justify-center">

              <PortalIllustration />

            </div>

          </div>

        </section>


        {/* =====================================================
            SEARCH / FILTER
        ====================================================== */}

        <section className="mt-5 rounded-[8px] border border-[#dfe4ea] bg-white px-5 py-3">

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

            <div className="flex h-9 w-full max-w-[300px] items-center gap-2 rounded-md border border-[#dfe4ea] px-3">

              <Search
                size={14}
                className="text-[#94a3b8]"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search clients..."
                className="w-full bg-transparent text-[10px] outline-none placeholder:text-[#94a3b8]"
              />

            </div>


            <button
              type="button"
              onClick={() => showToast("Filter options opened")}
              className="flex h-9 items-center gap-2 rounded-md border border-[#dfe4ea] px-3 text-[10px] text-[#475569] hover:bg-[#f8fafc]"
            >
              Status
              <ChevronDown size={12} />
            </button>

          </div>


          {search.trim() && (
            <div className="mt-3 rounded-md bg-[#f8fafc] px-3 py-2 text-[10px] text-[#64748b]">
              No client records to display.
            </div>
          )}

        </section>


        {/* =====================================================
            PORTAL SETTINGS
        ====================================================== */}

        <section className="mt-5 overflow-hidden rounded-[8px] border border-[#dfe4ea] bg-white">

          <div className="border-b border-[#e5e7eb] px-5 py-4">

            <h3 className="text-[14px] font-semibold">
              Portal settings
            </h3>

          </div>


          <div className="divide-y divide-[#e5e7eb]">

            <ToggleRow
              icon={ShieldCheck}
              title="Client portal"
              description="Allow clients to access the portal."
              enabled={portalEnabled}
              onChange={() =>
                setPortalEnabled((value) => !value)
              }
            />


            <ToggleRow
              icon={Users}
              title="Require approval"
              description="Review client access before allowing entry."
              enabled={requireApproval}
              onChange={() =>
                setRequireApproval((value) => !value)
              }
            />

          </div>

        </section>

      </main>


      {/* =====================================================
          TOAST
      ====================================================== */}

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[9999] flex -translate-x-1/2 items-center gap-2 rounded-lg bg-[#171b3a] px-4 py-2.5 text-[11px] font-medium text-white shadow-xl">

          <Check size={14} />

          {toast}

        </div>
      )}


      {/* =====================================================
          MAGIC LINK MODAL
      ====================================================== */}

      {magicLinkOpen && (
        <Modal
          title="Generate magic link"
          onClose={() => setMagicLinkOpen(false)}
        >

          <div className="p-5">

            <div className="rounded-lg bg-[#eef4ff] p-4">

              <div className="flex gap-3">

                <Link2
                  size={18}
                  className="mt-0.5 text-[#2563eb]"
                />

                <div>

                  <h4 className="text-[12px] font-semibold">
                    Generate magic link
                  </h4>

                  <p className="mt-1 text-[10px] leading-4 text-[#64748b]">
                    A secure client access link can be
                    generated here once the backend service
                    is connected.
                  </p>

                </div>

              </div>

            </div>

          </div>


          <ModalFooter
            cancel={() => setMagicLinkOpen(false)}
            submit={generateMagicLink}
            text="Generate"
          />

        </Modal>
      )}


      {/* =====================================================
          INVITE MODAL
      ====================================================== */}

      {inviteOpen && (
        <Modal
          title="Invite to client portal"
          onClose={() => {
            setInviteOpen(false);
            setEmail("");
          }}
        >

          <form onSubmit={submitInvite}>

            <div className="p-5">

              <label
                htmlFor="invite-email"
                className="mb-2 block text-[11px] font-semibold"
              >
                Client email
              </label>

              <input
                id="invite-email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="client@example.com"
                autoFocus
                className="h-10 w-full rounded-md border border-[#dfe4ea] px-3 text-[11px] outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100"
              />

            </div>


            <ModalFooter
              cancel={() => {
                setInviteOpen(false);
                setEmail("");
              }}
              text="Invite"
              type="submit"
            />

          </form>

        </Modal>
      )}


      {/* =====================================================
          LOGIN EMAIL MODAL
      ====================================================== */}

      {loginOpen && (
        <Modal
          title="Send login email"
          onClose={() => {
            setLoginOpen(false);
            setEmail("");
          }}
        >

          <form onSubmit={submitLogin}>

            <div className="p-5">

              <label
                htmlFor="login-email"
                className="mb-2 block text-[11px] font-semibold"
              >
                Client email
              </label>

              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="client@example.com"
                autoFocus
                className="h-10 w-full rounded-md border border-[#dfe4ea] px-3 text-[11px] outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100"
              />

            </div>


            <ModalFooter
              cancel={() => {
                setLoginOpen(false);
                setEmail("");
              }}
              text="Send"
              type="submit"
            />

          </form>

        </Modal>
      )}


      {/* =====================================================
          SETTINGS MODAL
      ====================================================== */}

      {settingsOpen && (
        <Modal
          title="Membership settings"
          onClose={() => setSettingsOpen(false)}
        >

          <div className="divide-y divide-[#e5e7eb]">

            <ToggleRow
              icon={ShieldCheck}
              title="Client portal"
              description="Enable client portal access."
              enabled={portalEnabled}
              onChange={() =>
                setPortalEnabled((value) => !value)
              }
            />


            <ToggleRow
              icon={Users}
              title="Require approval"
              description="Manually approve new clients."
              enabled={requireApproval}
              onChange={() =>
                setRequireApproval((value) => !value)
              }
            />

          </div>


          <div className="flex justify-end border-t border-[#e5e7eb] bg-[#f8fafc] px-5 py-3">

            <button
              type="button"
              onClick={() => setSettingsOpen(false)}
              className="h-8 rounded-md bg-[#2563eb] px-4 text-[10px] font-semibold text-white hover:bg-[#1d4ed8]"
            >
              Done
            </button>

          </div>

        </Modal>
      )}

    </div>
  );
}


/* ============================================================
   NAVIGATION MENU
============================================================ */

function NavigationMenu({
  label,
  open,
  setOpen,
  closeOthers,
  items,
  onSelect,
}) {
  return (
    <div className="relative shrink-0">

      <button
        type="button"
        onClick={() => {
          closeOthers();
          setOpen((value) => !value);
        }}
        className="flex h-[44px] items-center gap-1 px-3 text-[11px] text-[#64748b] hover:text-[#26344d]"
      >
        {label}

        <ChevronDown size={12} />
      </button>


      {open && (
        <div className="absolute left-0 top-[42px] z-[100] w-[190px] rounded-lg border border-[#dfe4ea] bg-white p-1.5 shadow-xl">

          {items.map((item, index) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setOpen(false);
                onSelect(item);
              }}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-left text-[10px] text-[#475569] hover:bg-[#f8fafc]"
            >
              {index === 0 && <BookOpen size={13} />}

              {index === 1 && <Plus size={13} />}

              {index === 2 && <Settings size={13} />}

              {item}
            </button>
          ))}

        </div>
      )}

    </div>
  );
}


/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  icon: Icon,
  title,
  value,
}) {
  return (
    <div className="flex min-h-[88px] items-center justify-between rounded-lg border border-[#dfe4ea] bg-white px-5">

      <div>

        <p className="text-[10px] text-[#64748b]">
          {title}
        </p>

        <p className="mt-1 text-[27px] font-medium leading-none text-[#111827]">
          {value}
        </p>

      </div>


      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f1f5f9] text-[#2563eb]">

        <Icon size={15} />

      </div>

    </div>
  );
}


/* ============================================================
   ACTION ROW
============================================================ */

function ActionRow({
  icon: Icon,
  title,
  button,
  onClick,
  last,
}) {
  return (
    <div
      className={`flex h-[67px] items-center justify-between px-5 ${
        !last
          ? "border-b border-[#e5e7eb]"
          : ""
      }`}
    >

      <div className="flex items-center gap-3">

        <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#f1f5f9] text-[#2563eb]">

          <Icon size={15} />

        </div>


        <span className="text-[10px] text-[#475569]">
          {title}
        </span>

      </div>


      <button
        type="button"
        onClick={onClick}
        className="h-[32px] rounded-md bg-[#eef4ff] px-3 text-[10px] font-semibold text-[#2563eb] transition hover:bg-[#e1ebff] active:scale-95"
      >
        {button}
      </button>

    </div>
  );
}


/* ============================================================
   TOGGLE ROW
============================================================ */

function ToggleRow({
  icon: Icon,
  title,
  description,
  enabled,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between px-5 py-4">

      <div className="flex items-center gap-3">

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f1f5f9] text-[#2563eb]">

          <Icon size={14} />

        </div>


        <div>

          <p className="text-[11px] font-medium">
            {title}
          </p>

          <p className="mt-0.5 text-[9px] text-[#94a3b8]">
            {description}
          </p>

        </div>

      </div>


      <button
        type="button"
        onClick={onChange}
        aria-label={`Toggle ${title}`}
        className={`relative h-[22px] w-[40px] rounded-full transition ${
          enabled
            ? "bg-[#2563eb]"
            : "bg-[#cbd5e1]"
        }`}
      >

        <span
          className={`absolute top-[3px] h-4 w-4 rounded-full bg-white shadow-sm transition ${
            enabled
              ? "left-[21px]"
              : "left-[3px]"
          }`}
        />

      </button>

    </div>
  );
}


/* ============================================================
   PORTAL ILLUSTRATION
============================================================ */

function PortalIllustration() {
  return (
    <div className="relative h-[125px] w-[270px]">

      {/* PERSON */}

      <div className="absolute left-[65px] top-[18px] h-[30px] w-[30px] rounded-full border-2 border-[#374151] bg-white" />

      <div className="absolute left-[58px] top-[45px] h-[48px] w-[48px] rounded-t-[20px] border-2 border-[#374151] bg-white" />

      <div className="absolute left-[25px] top-[55px] h-[7px] w-[48px] rotate-[-25deg] rounded-full bg-[#374151]" />

      <div className="absolute left-[94px] top-[48px] h-[7px] w-[50px] rotate-[-28deg] rounded-full bg-[#374151]" />

      <div className="absolute left-[58px] top-[86px] h-[7px] w-[44px] rotate-[25deg] rounded-full bg-[#374151]" />

      <div className="absolute left-[91px] top-[86px] h-[7px] w-[44px] rotate-[-20deg] rounded-full bg-[#374151]" />


      {/* PHONE */}

      <div className="absolute left-[109px] top-[17px] h-[81px] w-[48px] rotate-[7deg] rounded-[8px] border-2 border-[#475569] bg-white">

        <div className="mx-auto mt-1 h-[3px] w-[15px] rounded-full bg-[#cbd5e1]" />

        <div className="mx-[6px] mt-[7px] h-[26px] rounded bg-[#f1f5f9]" />

        <div className="mx-[6px] mt-[5px] h-[9px] rounded bg-[#e2e8f0]" />

        <div className="mx-[6px] mt-[5px] h-[9px] rounded bg-[#dbeafe]" />

      </div>


      {/* BIG GEAR */}

      <div className="absolute right-[52px] top-[35px] flex h-[47px] w-[47px] items-center justify-center rounded-full border-[5px] border-[#91a6c5] bg-white">

        <div className="h-[15px] w-[15px] rounded-full border-[3px] border-[#91a6c5]" />

      </div>

      <div className="absolute right-[68px] top-[25px] h-[9px] w-[9px] rotate-45 bg-[#91a6c5]" />

      <div className="absolute right-[39px] top-[39px] h-[9px] w-[9px] rotate-45 bg-[#91a6c5]" />

      <div className="absolute right-[62px] top-[80px] h-[9px] w-[9px] rotate-45 bg-[#91a6c5]" />


      {/* SMALL GEAR */}

      <div className="absolute right-[13px] top-[67px] flex h-[34px] w-[34px] items-center justify-center rounded-full border-[4px] border-[#91a6c5] bg-white">

        <div className="h-[9px] w-[9px] rounded-full border-2 border-[#91a6c5]" />

      </div>

      <div className="absolute right-[24px] top-[58px] h-[7px] w-[7px] rotate-45 bg-[#91a6c5]" />

      <div className="absolute right-[4px] top-[80px] h-[7px] w-[7px] rotate-45 bg-[#91a6c5]" />


      {/* FLOATING SHAPES */}

      <div className="absolute left-[145px] top-[24px] h-[8px] w-[8px] rotate-45 bg-[#cbd5e1]" />

      <div className="absolute right-[95px] top-[97px] h-[7px] w-[7px] rotate-45 bg-[#cbd5e1]" />

    </div>
  );
}


/* ============================================================
   MODAL
============================================================ */

function Modal({
  title,
  onClose,
  children,
}) {
  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >

      <div
        className="w-full max-w-[430px] overflow-hidden rounded-xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >

        <div className="flex h-[52px] items-center justify-between border-b border-[#e5e7eb] px-5">

          <h2 className="text-[14px] font-semibold">
            {title}
          </h2>


          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-md text-[#64748b] hover:bg-[#f1f5f9]"
          >
            <X size={15} />
          </button>

        </div>


        {children}

      </div>

    </div>
  );
}


/* ============================================================
   MODAL FOOTER
============================================================ */

function ModalFooter({
  cancel,
  submit,
  text,
  type = "button",
}) {
  return (
    <div className="flex justify-end gap-2 border-t border-[#e5e7eb] bg-[#f8fafc] px-5 py-3">

      <button
        type="button"
        onClick={cancel}
        className="h-8 rounded-md border border-[#dfe4ea] bg-white px-4 text-[10px] text-[#475569] hover:bg-[#f8fafc]"
      >
        Cancel
      </button>


      <button
        type={type}
        onClick={submit}
        className="h-8 rounded-md bg-[#2563eb] px-4 text-[10px] font-semibold text-white hover:bg-[#1d4ed8]"
      >
        {text}
      </button>

    </div>
  );
}