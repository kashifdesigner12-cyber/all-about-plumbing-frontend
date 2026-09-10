"use client";

import {
  ArrowRight,
  Bell,
  Clock,
  MessageSquare,
  PhoneCall,
  Users,
  Zap,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MissedCallTextBackPage() {
  const stats = [
    {
      value: "24/7",
      description:
        "your business can automatically respond to missed callers, even when you cannot answer the phone.",
    },
    {
      value: "Instant",
      description:
        "text responses help keep potential customers engaged while they are still looking for your services.",
    },
    {
      value: "1",
      description:
        "simple system keeps missed calls from becoming missed opportunities for your business.",
    },
  ];

  const features = [
    {
      icon: MessageSquare,
      title: "Automatic Text Back",
      description:
        "Send an automatic text whenever a customer calls and you are unable to answer.",
    },
    {
      icon: Clock,
      title: "Available 24/7",
      description:
        "Your business can respond to missed callers even when you're busy, unavailable, or outside business hours.",
    },
    {
      icon: Users,
      title: "Start Conversations",
      description:
        "Turn missed calls into text conversations and give potential customers an easy way to continue the conversation.",
    },
    {
      icon: Zap,
      title: "Instant Response",
      description:
        "Respond quickly while your potential customer is still looking for help instead of making them wait.",
    },
    {
      icon: Bell,
      title: "Stay Connected",
      description:
        "Keep communication moving without constantly checking your phone for every missed call.",
    },
    {
      icon: PhoneCall,
      title: "Recover Leads",
      description:
        "Give missed callers another simple way to reach your business and recover opportunities that could otherwise be lost.",
    },
  ];

  return (
    <>
      <Header />

      <main className="overflow-hidden bg-[#F3F4F6]">
        {/* ==================================================
            HERO / PRODUCT TITLE
        ================================================== */}

        <section className="relative bg-[#F3F4F6] pt-20 sm:pt-24 lg:pt-28">
          <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
            {/* PRODUCT TITLE */}

            <h1 className="text-center text-4xl font-black tracking-[-0.05em] text-[#171B3A] sm:text-5xl lg:text-6xl xl:text-7xl">
              Missed Call Text Back
            </h1>

            {/* ==================================================
                STATS + DEMO
            ================================================== */}

            <div className="mt-12 grid gap-6 lg:grid-cols-[390px_1fr]">
              {/* ==================================================
                  LEFT STATS
              ================================================== */}

              <div className="flex flex-col gap-5">
                {stats.map((stat) => (
                  <div
                    key={stat.value}
                    className="min-h-[165px] rounded-xl bg-white px-7 py-7 shadow-sm sm:min-h-[180px] sm:px-8 sm:py-8"
                  >
                    <div className="text-5xl font-black leading-none tracking-[-0.04em] text-blue-600 sm:text-6xl">
                      {stat.value}
                    </div>

                    <p className="mt-6 max-w-[320px] text-base leading-7 text-[#171B3A] sm:text-lg sm:leading-8">
                      {stat.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* ==================================================
                  DEMO / IMAGE
              ================================================== */}

              <div className="rounded-xl bg-white px-5 py-6 sm:px-7 sm:py-8 lg:px-8 lg:py-9">
                <h2 className="text-center text-3xl font-black tracking-[-0.04em] text-[#171B3A] sm:text-4xl lg:text-5xl">
                  See a short demo below
                </h2>

                <div className="mt-7 overflow-hidden rounded-lg">
                  <img
                    src="/images/products/missed-call-text-back.jpg"
                    alt="Missed Call Text Back"
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
            WHY DO I NEED MISSED CALL TEXT BACK?
        ================================================== */}

        <section className="relative bg-[#171B3A] pb-28 pt-10 sm:pb-36 sm:pt-14">
          <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
            <h2 className="text-center text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
              Why do I need Missed Call Text Back?
            </h2>

            {/* FEATURES */}

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:gap-6">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="min-h-[190px] rounded-lg bg-white p-6 sm:p-7 lg:min-h-[210px] lg:p-8"
                  >
                    <div className="flex items-center gap-4">
                      <Icon
                        size={34}
                        strokeWidth={2.2}
                        className="shrink-0 text-[#171B3A]"
                      />

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
            <div className="absolute inset-x-[-5%] bottom-[-55px] h-28 rotate-[-7deg] bg-[#F3F4F6]" />
          </div>
        </section>

        {/* ==================================================
            CTA
        ================================================== */}

        <section className="bg-[#F3F4F6] px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto max-w-[1500px]">
            <div className="relative min-h-[300px] overflow-hidden rounded-xl bg-[#171B3A]">
              <div className="grid min-h-[300px] items-center lg:grid-cols-[1fr_430px]">
                {/* ==================================================
                    CTA CONTENT
                ================================================== */}

                <div className="px-7 py-12 sm:px-10 sm:py-14 lg:px-14">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-blue-400">
                    Missed Call Text Back
                  </p>

                  <h2 className="max-w-2xl text-3xl font-black leading-tight tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                    Ready to stop losing leads from missed calls?
                  </h2>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                    Automatically text missed callers, start conversations,
                    and give every potential customer another easy way to
                    connect with your business.
                  </p>

                  <a
                    href="/about/contact"
                    className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-blue-600 px-7 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700"
                  >
                    Book A Call
                    <ArrowRight size={17} />
                  </a>
                </div>

                {/* ==================================================
                    CTA IMAGE
                ================================================== */}

                <div className="hidden h-full min-h-[300px] items-end justify-center lg:flex">
                  <img
                    src="/images/products/missed-call-text-back-cta.png"
                    alt="Missed Call Text Back"
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

