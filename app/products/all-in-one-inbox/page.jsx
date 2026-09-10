"use client";

import {
  Inbox,
  MessageSquare,
  Users,
  Smartphone,
  Zap,
  Search,
  ArrowRight,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AllInOneInboxPage() {
  const stats = [
    {
      value: "70%",
      description:
        "of contractors respond faster to customers with one inbox.",
    },
    {
      value: "61%",
      description:
        "of contractors are less overwhelmed when using only one inbox.",
    },
    {
      value: "83%",
      description:
        "of contractors become more organized when using just one inbox.",
    },
  ];

  const features = [
    {
      icon: Inbox,
      title: "One Central Inbox",
      description:
        "Keep all your customer conversations in one place instead of switching between different apps and platforms.",
    },
    {
      icon: MessageSquare,
      title: "Manage Every Conversation",
      description:
        "Stay on top of texts, messages, and customer conversations without losing track of important details.",
    },
    {
      icon: Users,
      title: "Never Miss a Lead",
      description:
        "Keep your leads and customer conversations visible so opportunities don't get forgotten.",
    },
    {
      icon: Smartphone,
      title: "Work From Anywhere",
      description:
        "Access your customer conversations from the devices you use every day, whether you're in the office or on the job.",
    },
    {
      icon: Zap,
      title: "Respond Faster",
      description:
        "Find conversations quickly and respond to customers faster with everything organized in one place.",
    },
    {
      icon: Search,
      title: "Stay Organized",
      description:
        "Easily keep track of customer conversations, leads, and follow-ups as your business grows.",
    },
  ];

  return (
    <>
      <Header />

      <main className="overflow-hidden bg-white">
        {/* ==================================================
            HERO / PRODUCT TITLE
        ================================================== */}

        <section className="relative bg-white pt-20 sm:pt-24 lg:pt-28">
          <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
            {/* TITLE */}

            <h1 className="text-center text-4xl font-black tracking-[-0.05em] text-[#171B3A] sm:text-5xl lg:text-6xl xl:text-7xl">
              All-In-One Inbox
            </h1>

            {/* STATS + DEMO */}

            <div className="mt-12 grid gap-6 lg:grid-cols-[340px_1fr] xl:grid-cols-[390px_1fr]">
              {/* ==================================================
                  LEFT STATS
              ================================================== */}

              <div className="flex flex-col gap-5">
                {stats.map((stat) => (
                  <div
                    key={stat.value}
                    className="min-h-[145px] rounded-xl border border-slate-200 bg-white px-7 py-6 shadow-[0_10px_35px_rgba(23,27,58,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(37,99,235,0.10)] sm:min-h-[165px] sm:px-8 sm:py-7"
                  >
                    <div className="text-5xl font-black leading-none tracking-[-0.04em] text-blue-600 sm:text-6xl">
                      {stat.value}
                    </div>

                    <p className="mt-5 max-w-[300px] text-base leading-7 text-[#171B3A] sm:text-lg sm:leading-8">
                      {stat.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* ==================================================
                  DEMO AREA
              ================================================== */}

              <div className="rounded-xl border border-slate-200 bg-white px-5 py-6 shadow-[0_15px_50px_rgba(23,27,58,0.07)] sm:px-7 sm:py-8 lg:px-8 lg:py-9">
                <h2 className="text-center text-3xl font-black tracking-[-0.04em] text-[#171B3A] sm:text-4xl lg:text-5xl">
                  See a short demo below
                </h2>

                <div className="mt-7 overflow-hidden rounded-lg">
                  <img
                    src="/images/products/all-in-one-inbox.jpg"
                    alt="All-In-One Inbox"
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ==================================================
              SLANTED DIVIDER
          ================================================== */}

          <div className="relative mt-16 h-24 sm:mt-20 sm:h-32">
            <div className="absolute inset-x-[-5%] bottom-[-65px] h-32 rotate-[-7deg] bg-[#171B3A]" />
          </div>
        </section>

        {/* ==================================================
            WHY DO I NEED AN ALL-IN-ONE INBOX?
        ================================================== */}

        <section className="relative bg-[#171B3A] pb-28 pt-10 sm:pb-36 sm:pt-14">
          <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
            <h2 className="text-center text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
              Why do I need an All-In-One Inbox?
            </h2>

            {/* FEATURES */}

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:gap-6">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="min-h-[190px] rounded-xl border border-slate-100 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(37,99,235,0.15)] sm:p-7 lg:min-h-[210px] lg:p-8"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                        <Icon
                          size={25}
                          strokeWidth={2.2}
                          className="text-blue-600"
                        />
                      </div>

                      <h3 className="text-lg font-black tracking-[-0.02em] text-blue-600 sm:text-xl">
                        {feature.title}
                      </h3>
                    </div>

                    <p className="mt-5 max-w-2xl text-sm leading-6 text-[#171B3A] sm:text-base sm:leading-7">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ==================================================
              BOTTOM SLANT
          ================================================== */}

          <div className="absolute bottom-[-1px] left-0 right-0 h-20 overflow-hidden sm:h-28">
            <div className="absolute inset-x-[-5%] bottom-[-55px] h-28 rotate-[-7deg] bg-white" />
          </div>
        </section>

        {/* ==================================================
            CTA
        ================================================== */}

        <section className="bg-white px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto max-w-[1500px]">
            <div className="relative min-h-[300px] overflow-hidden rounded-xl bg-[#171B3A]">
              <div className="grid min-h-[300px] items-center lg:grid-cols-[1fr_430px]">
                {/* ==================================================
                    CTA CONTENT
                ================================================== */}

                <div className="px-7 py-12 sm:px-10 sm:py-14 lg:px-14">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-blue-400">
                    All-In-One Inbox
                  </p>

                  <h2 className="max-w-2xl text-3xl font-black leading-tight tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                    Want to simplify your customer communication?
                  </h2>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                    See everything you can do with an All-In-One Inbox and
                    start managing your customer conversations from one place.
                  </p>

                  <a
                    href="/about/contact"
                    className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 text-sm font-bold text-white shadow-[0_8px_25px_rgba(37,99,235,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_12px_30px_rgba(37,99,235,0.35)]"
                  >
                    Book A Call

                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300"
                    />
                  </a>
                </div>

                {/* ==================================================
                    CTA IMAGE
                ================================================== */}

                <div className="hidden h-full min-h-[300px] items-end justify-center lg:flex">
                  <img
                    src="/images/products/all-in-one-inbox-cta.png"
                    alt="All-In-One Inbox"
                    className="h-[280px] w-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

