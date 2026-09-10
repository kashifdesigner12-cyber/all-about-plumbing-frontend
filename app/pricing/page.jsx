"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, MessageSquare, SlidersHorizontal, Rocket } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  const monthlyPrice = 297;
  const annualPrice = 2970;

  const features = [
    "Functional Website (10–20 pages)",
    "Automated Lead Follow Up",
    "Missed Call Text Back",
    "5-Star Magic Review Funnel",
    "One-Click Marketing Campaigns",
    "On-Site SEO",
  ];

  const process = [
    {
      number: "1",
      title: "Demo Call",
      time: "(20 mins)",
      icon: MessageSquare,
      description:
        "It's actually a sales call, we just didn't want to scare you. We'll answer your questions, show you the features you're interested in, and walk you through real client accounts and results.",
    },
    {
      number: "2",
      title: "We build your system",
      time: "(7–10 days)",
      icon: SlidersHorizontal,
      description:
        "Fill out a basic onboarding form with your business details. Once we have the information we need, we'll get to work building your new website and marketing system.",
    },
    {
      number: "3",
      title: "Launch Call",
      time: "(25 mins)",
      icon: Rocket,
      description:
        "We'll walk you through your new website and marketing system, answer your questions, and show you how everything works.",
    },
  ];

  return (
    <>
      <Header />

      <main className="relative min-h-screen overflow-hidden bg-white text-[#171B3A]">
        {/* =====================================================
            SOFT BLUE BACKGROUND BLURS
        ====================================================== */}

        <div
          className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-blue-100/60 blur-3xl"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute -left-48 top-[600px] h-[550px] w-[550px] rounded-full bg-blue-50/80 blur-3xl"
          aria-hidden="true"
        />

        {/* =====================================================
            PRICING HEADER
        ====================================================== */}

        <section className="relative px-5 pb-12 pt-24 sm:px-8 sm:pt-28 lg:pt-32">
          <div className="mx-auto max-w-[1100px] text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl font-black tracking-[-0.055em] sm:text-6xl lg:text-[76px]"
            >
              Our pricing
            </motion.h1>

            {/* BILLING TOGGLE */}

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-9 flex items-center justify-center gap-5 sm:gap-7"
            >
              <span
                className={`text-lg font-semibold transition-colors duration-200 ${
                  !annual ? "text-[#171B3A]" : "text-slate-400"
                }`}
              >
                Monthly
              </span>

              <button
                type="button"
                aria-label="Toggle billing period"
                aria-pressed={annual}
                onClick={() => setAnnual((prev) => !prev)}
                className={`relative h-9 w-[68px] shrink-0 rounded-full p-1 shadow-inner transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600/30 ${
                  annual ? "bg-blue-600" : "bg-blue-200"
                }`}
              >
                <span
                  className={`block h-7 w-7 rounded-full bg-white shadow-md transition-transform duration-300 ease-out ${
                    annual ? "translate-x-7" : "translate-x-0"
                  }`}
                />
              </button>

              <span
                className={`text-lg font-semibold transition-colors duration-200 ${
                  annual ? "text-[#171B3A]" : "text-slate-400"
                }`}
              >
                Annually
              </span>
            </motion.div>
          </div>
        </section>

        {/* =====================================================
            PRICING CARD
        ====================================================== */}

        <section className="relative px-5 pb-24 sm:px-8 lg:pb-28">
          <div className="mx-auto max-w-[768px]">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="overflow-hidden rounded-[24px] bg-blue-600 shadow-[0_25px_70px_rgba(37,99,235,0.20)]"
            >
              <div className="px-7 pb-10 pt-16 text-center sm:px-12 sm:pt-20">
                {/* MOST POPULAR */}

                <div className="inline-block">
                  <p className="text-2xl font-black uppercase tracking-[-0.025em] text-white sm:text-3xl">
                    Most Popular
                  </p>

                  <div className="mt-2 h-[4px] w-full bg-white" />
                </div>

                {/* PLAN NAME */}

                <h2 className="mt-7 text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl">
                  Contractor Advanced
                </h2>

                {/* PRICE */}

                <div className="mt-9 flex items-end justify-center">
                  <span className="text-6xl font-black tracking-[-0.065em] text-white sm:text-7xl">
                    $
                    {annual
                      ? annualPrice.toLocaleString()
                      : monthlyPrice}
                  </span>

                  <span className="mb-2 ml-2 text-xl font-semibold text-white/90 sm:text-2xl">
                    {annual ? "/year" : "/mo"}
                  </span>
                </div>

                {annual && (
                  <p className="mt-3 text-sm font-semibold text-white/90">
                    Save with annual billing
                  </p>
                )}

                {/* DIVIDER */}

                <div className="mt-12 border-t border-white/30" />

                {/* WHAT'S INCLUDED */}

                <div className="pt-9 text-left">
                  <h3 className="text-center text-2xl font-black text-white sm:text-3xl">
                    What's Included
                  </h3>

                  <div className="mx-auto mt-8 grid max-w-[590px] gap-4 sm:grid-cols-2">
                    {features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-3"
                      >
                        <span className="mt-[2px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-blue-600">
                          <Check
                            size={13}
                            strokeWidth={3.5}
                          />
                        </span>

                        <span className="text-[15px] font-semibold leading-6 text-white sm:text-base">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}

                <Link
                  href="/about/contact"
                  className="mx-auto mt-11 flex h-14 w-full max-w-[590px] items-center justify-center gap-2 rounded-xl bg-white px-7 text-base font-black text-[#171B3A] shadow-[0_8px_25px_rgba(0,0,0,0.10)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.15)]"
                >
                  Get Started
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =====================================================
            HOW IT WORKS
        ====================================================== */}

        <section className="relative overflow-hidden bg-white px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[1400px]">
            {/* PROCESS */}

            <div className="relative">
              {/* DOTTED CURVED CONNECTION */}

              <svg
                className="pointer-events-none absolute left-[14%] right-[14%] top-[65px] hidden h-[150px] w-[72%] lg:block"
                viewBox="0 0 1000 180"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M0 20 C170 20 170 160 330 160 C490 160 510 20 670 20 C830 20 830 160 1000 160"
                  stroke="#CBD5E1"
                  strokeWidth="9"
                  strokeDasharray="12 12"
                  fill="none"
                />
              </svg>

              <div className="relative grid gap-16 lg:grid-cols-3 lg:gap-10">
                {process.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.number}
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{
                        once: true,
                        amount: 0.2,
                      }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.12,
                      }}
                      className="relative text-center"
                    >
                      {/* NUMBER */}

                      <div className="relative z-10 mx-auto flex h-36 w-36 items-center justify-center">
                        <div className="flex h-36 w-36 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_18px_35px_rgba(37,99,235,0.22)]">
                          <span className="text-[52px] font-medium leading-none">
                            {item.number}
                          </span>
                        </div>
                      </div>

                      {/* SMALL ICON */}

                      <div className="relative z-20 mx-auto -mt-1 flex h-10 w-10 items-center justify-center rounded-full border-[5px] border-white bg-blue-50 text-blue-600 shadow-sm">
                        <Icon size={16} strokeWidth={2} />
                      </div>

                      {/* TITLE */}

                      <h3 className="mx-auto mt-10 max-w-[500px] text-3xl font-black leading-[1.15] tracking-[-0.04em] text-[#07194A] sm:text-4xl">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-2xl font-black tracking-[-0.025em] text-[#07194A]">
                        {item.time}
                      </p>

                      {/* DESCRIPTION */}

                      <p className="mx-auto mt-12 max-w-[570px] text-base leading-8 text-[#17345F] sm:text-lg sm:leading-9">
                        {item.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            MAIN CTA
        ====================================================== */}

        <section className="bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[1200px]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-2xl bg-[#171B3A] px-6 py-12 shadow-[0_25px_70px_rgba(23,27,58,0.12)] sm:px-10 md:px-14 md:py-16"
            >
              {/* BACKGROUND GLOW */}

              <div
                className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-[120px]"
                aria-hidden="true"
              />

              <div
                className="pointer-events-none absolute -bottom-40 -left-40 h-[360px] w-[360px] rounded-full bg-blue-600/10 blur-[110px]"
                aria-hidden="true"
              />

              {/* CONTENT */}

              <div className="relative z-10 grid items-center gap-10 md:grid-cols-2 md:gap-14">
                {/* LEFT */}

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-4xl font-bold leading-[1.02] tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">
                    Ready to grow
                    <br />
                    your business?
                  </h2>

                  <p className="mt-6 max-w-lg text-base leading-7 text-gray-300 sm:text-lg sm:leading-8">
                    Build a stronger online presence, generate more leads,
                    and create a system that helps your contracting business
                    grow.
                  </p>

                  <Link
                    href="/about/contact"
                    className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20"
                  >
                    Get Started
                    <ArrowUpRight
                      size={18}
                      strokeWidth={2.5}
                    />
                  </Link>
                </motion.div>

                {/* RIGHT IMAGE */}

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1,
                  }}
                  className="relative flex min-h-[280px] items-end justify-center md:min-h-[320px]"
                >
                  {/* IMAGE GLOW */}

                  <div
                    className="pointer-events-none absolute bottom-0 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-blue-600/20 blur-[80px]"
                    aria-hidden="true"
                  />

                  {/* CONTRACTOR IMAGE */}

                  <img
                    src="/images/cta/contractor.png"
                    alt="Contractor"
                    className="relative z-10 mx-auto h-auto w-[250px] max-w-full object-contain transition duration-500 sm:w-[280px] md:w-[300px] lg:w-[320px]"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}