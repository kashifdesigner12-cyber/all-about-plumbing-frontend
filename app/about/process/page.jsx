"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import {
  ArrowRight,
  Search,
  PenTool,
  Rocket,
} from "lucide-react";

export default function ProcessPage() {
  const processSteps = [
    {
      number: "01",
      icon: Search,
      title: "Consultation Call",
      description:
        "It's actually a sales call, we just didn't want to scare you. But seriously... we'll answer all your questions, show you exactly how we can help, and show you live client accounts & results.",
    },
    {
      number: "02",
      icon: PenTool,
      title: "Buildout",
      description:
        "Fill out a basic onboarding form with your business details. After we have the correct information, we'll get to work on building your new website & marketing system.",
    },
    {
      number: "03",
      icon: Rocket,
      title: "Launch",
      description:
        "We'll walk you through your new website & marketing system, answer any questions you have, and show you how everything works. And by everything, we're really just talking about pressing two buttons.",
    },
  ];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F8F8F8] text-[#171B3A]">

        {/* ==================================================
            HERO
        ================================================== */}
        <section className="relative overflow-hidden px-5 pb-20 pt-24 sm:px-6 sm:pb-24 sm:pt-28 lg:px-10 lg:pb-28 lg:pt-32">
          {/* Background glow */}
          <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />

          <div className="relative mx-auto max-w-[950px] text-center">
            {/* <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-blue-600">
              Our Process
            </span> */}

            <h1 className="mx-auto mt-6 max-w-[850px] text-4xl font-black leading-[1.05] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              What working with us
              <span className="block text-blue-600">
                actually looks like.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-[650px] text-sm leading-6 text-[#64748B] sm:text-base sm:leading-7">
              A simple process designed to take the confusion out of
              building your website and marketing system.
            </p>
          </div>
        </section>

        {/* ==================================================
            PROCESS SECTION
        ================================================== */}
        <section className="px-5 pb-24 sm:px-6 sm:pb-28 lg:px-10 lg:pb-32">
          <div className="mx-auto max-w-[1100px]">

            <div className="relative">

              {/* Desktop connecting line */}
              <div className="pointer-events-none absolute left-1/2 top-[100px] hidden h-[600px] w-[360px] -translate-x-1/2 lg:block">
                <svg
                  viewBox="0 0 360 600"
                  className="h-full w-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M65 20
                       C65 155 295 125 295 285
                       C295 445 65 415 65 575"
                    stroke="#CBD5E1"
                    strokeWidth="3"
                    strokeDasharray="7 9"
                  />
                </svg>
              </div>

              {/* Mobile connecting line */}
              <div className="pointer-events-none absolute left-[39px] top-[90px] h-[850px] border-l-2 border-dashed border-slate-200 lg:hidden" />

              <div className="relative space-y-10 lg:space-y-0">

                {processSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isMiddle = index === 1;

                  return (
                    <div
                      key={step.number}
                      className={`relative lg:min-h-[300px] ${
                        isMiddle
                          ? "lg:flex lg:justify-end"
                          : "lg:flex lg:justify-start"
                      }`}
                    >
                      <div
                        className={`relative z-10 flex w-full items-start gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8 lg:w-[530px] lg:items-center lg:p-9 ${
                          isMiddle
                            ? "lg:flex-row-reverse lg:text-right"
                            : ""
                        }`}
                      >

                        {/* Number */}
                        <div className="relative shrink-0">
                          <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-blue-600 text-2xl font-black text-white shadow-lg shadow-blue-600/20 sm:h-[88px] sm:w-[88px] sm:text-3xl">
                            {step.number}
                          </div>

                          {/* Small dot */}
                          <div className="absolute -right-1 -top-1 h-4 w-4 rounded-full border-4 border-white bg-blue-600" />
                        </div>

                        {/* Content */}
                        <div className="flex-1">

                          <div
                            className={`mb-2 flex items-center gap-2 ${
                              isMiddle
                                ? "lg:justify-end"
                                : "lg:justify-start"
                            }`}
                          >
                            <Icon
                              size={16}
                              strokeWidth={2.5}
                              className="text-blue-600"
                            />

                            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-blue-600">
                              Step {index + 1}
                            </span>
                          </div>

                          <h2 className="text-2xl font-black tracking-[-0.03em] sm:text-3xl">
                            {step.title}
                          </h2>

                          <p className="mt-3 text-sm leading-6 text-[#64748B] sm:text-[15px] sm:leading-7">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}

              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            CTA
        ================================================== */}
        <section className="px-5 pb-24 sm:px-6 sm:pb-28 lg:px-10 lg:pb-32">
          <div className="mx-auto max-w-[1050px]">

            <div className="relative overflow-hidden rounded-3xl bg-[#171B3A] px-7 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">

              {/* Glows */}
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />

              <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-blue-400">
                    Ready when you are
                  </span>

                  <h2 className="mt-3 max-w-[600px] text-3xl font-black leading-tight tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
                    Want to schedule a time to talk?
                  </h2>

                  <p className="mt-5 max-w-[560px] text-sm leading-6 text-slate-300 sm:text-[15px] sm:leading-7">
                    See everything we've done to help businesses grow.
                    We'll show you exactly what we can build and how the
                    process works.
                  </p>

                  <Link
                    href="/contact"
                    className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700"
                  >
                    Book A Call
                    <ArrowRight size={17} />
                  </Link>
                </div>

                {/* CTA visual */}
                <div className="hidden lg:flex">
                  <div className="flex h-40 w-40 items-center justify-center rounded-full border border-blue-400/20 bg-blue-600/10">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 shadow-xl shadow-blue-600/30">
                      <ArrowRight
                        size={38}
                        strokeWidth={2}
                        className="text-white"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            PROOF / TESTIMONIAL INTRO
        ================================================== */}
        <section className="border-t border-slate-100 bg-white px-5 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[900px] text-center">

            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-blue-600">
              Client Results
            </span>

            <h2 className="mt-4 text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              The proof is in the pudding.
            </h2>

            <p className="mx-auto mt-4 max-w-[600px] text-sm leading-6 text-[#64748B] sm:text-base">
              Don't just take our word for it. See what our clients
              have to say about working with us.
            </p>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

