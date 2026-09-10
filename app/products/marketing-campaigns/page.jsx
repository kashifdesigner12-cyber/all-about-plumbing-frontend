"use client";

import {
  ArrowRight,
  BarChart3,
  Check,
  Megaphone,
  MousePointerClick,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MarketingCampaignsPage() {
  const stats = [
    {
      value: "24/7",
      description:
        "your business can stay visible with consistent marketing campaigns reaching customers throughout the day.",
    },
    {
      value: "3X",
      description:
        "more opportunities to reconnect with customers and turn marketing activity into real business leads.",
    },
    {
      value: "100%",
      description:
        "focused on keeping your business visible, consistent, and connected with your target audience.",
    },
  ];

  const features = [
    {
      icon: Sparkles,
      title: "One-Click Campaigns",
      description:
        "Launch professional marketing campaigns without spending hours planning, writing, and setting everything up.",
    },
    {
      icon: Target,
      title: "Reach The Right People",
      description:
        "Create campaigns designed around your services, audience, and business goals to generate better opportunities.",
    },
    {
      icon: Send,
      title: "Stay Consistent",
      description:
        "Keep your business visible with consistent marketing that keeps your brand in front of potential customers.",
    },
    {
      icon: TrendingUp,
      title: "Drive More Growth",
      description:
        "Turn simple marketing campaigns into more engagement, more conversations, and more opportunities for your business.",
    },
    {
      icon: Users,
      title: "Reconnect With Customers",
      description:
        "Stay connected with previous customers and bring your business back to their attention with timely campaigns.",
    },
    {
      icon: BarChart3,
      title: "Track Campaign Results",
      description:
        "Monitor campaign performance and understand how your marketing is helping create more engagement and opportunities.",
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
              Marketing Campaigns
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
                    src="/images/products/marketing-campaigns.jpg"
                    alt="Marketing Campaigns"
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
            WHY DO I NEED MARKETING CAMPAIGNS?
        ================================================== */}

        <section className="relative bg-[#171B3A] pb-28 pt-10 sm:pb-36 sm:pt-14">
          <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
            <h2 className="text-center text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
              Why do I need Marketing Campaigns?
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
                    Marketing Campaigns
                  </p>

                  <h2 className="max-w-2xl text-3xl font-black leading-tight tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                    Ready to grow your business with better marketing?
                  </h2>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                    Launch consistent marketing campaigns, reconnect with
                    customers, and create more opportunities without making
                    marketing complicated.
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
                    src="/images/products/marketing-campaigns-cta.png"
                    alt="Marketing Campaigns"
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