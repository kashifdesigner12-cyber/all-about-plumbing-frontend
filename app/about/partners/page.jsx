"use client";

import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PartnersPage() {
  const partners = [
    {
      name: "LocalFalcon",
      image: "/images/partners/localfalcon.png",
    },
    {
      name: "Meta",
      image: "/images/partners/meta.png",
    },
    {
      name: "GoDaddy",
      image: "/images/partners/godaddy.png",
    },
    {
      name: "OpenAI",
      image: "/images/partners/openai.png",
    },
    {
      name: "Google Business Profile",
      image: "/images/partners/google-business.png",
    },
    {
      name: "Canva",
      image: "/images/partners/canva.png",
    },
    {
      name: "Ahrefs",
      image: "/images/partners/ahrefs.png",
    },
    {
      name: "Google Analytics",
      image: "/images/partners/google-analytics.png",
    },
  ];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F8FAFC] text-[#171B3A]">
        {/* ==================================================
            HERO
        ================================================== */}

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-[1200px] px-5 pb-14 pt-16 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8 lg:pb-20 lg:pt-24">
            <div className="mx-auto max-w-[900px] text-center">
              <h1 className="mt-3 text-4xl font-black leading-[1.05] tracking-[-0.045em] text-[#171B3A] sm:text-5xl lg:text-[60px]">
                The tools behind
                <br />
                <span className="text-blue-600">better systems.</span>
              </h1>

              <p className="mx-auto mt-5 max-w-[700px] text-[15px] leading-7 text-[#64748B] sm:text-base sm:leading-8">
                We work with trusted technology platforms to help businesses
                build stronger websites, improve visibility, understand their
                customers, and create better digital experiences.
              </p>
            </div>
          </div>
        </section>

        {/* ==================================================
            PARTNERS
        ================================================== */}

        <section className="bg-[#F8FAFC] px-5 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[1200px]">
            {/* Section Intro */}
            <div className="mx-auto max-w-[700px] text-center">
              <h2 className="text-3xl font-black tracking-[-0.035em] text-[#171B3A] sm:text-4xl">
                Platforms we work with
              </h2>

              <p className="mt-3 text-sm leading-7 text-[#64748B] sm:text-base">
                Reliable tools give us the foundation to deliver better results
                for the businesses we work with.
              </p>
            </div>

            {/* Partner Grid */}
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {partners.map((partner) => (
                <div
                  key={partner.name}
                  className="group flex min-h-[180px] items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-8 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_14px_35px_rgba(23,27,58,0.08)] sm:min-h-[200px] sm:px-8"
                >
                  <Image
                    src={partner.image}
                    alt={`${partner.name} logo`}
                    width={280}
                    height={120}
                    className="h-auto max-h-[85px] w-auto max-w-[82%] object-contain grayscale opacity-80 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================
            PARTNER MESSAGE
        ================================================== */}

        <section className="border-y border-slate-200 bg-white px-5 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[1100px]">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
              {/* Left */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.17em] text-blue-600 sm:text-sm">
                  Built Around The Right Tools
                </p>

                <h2 className="mt-3 text-3xl font-black leading-[1.1] tracking-[-0.04em] text-[#171B3A] sm:text-4xl lg:text-5xl">
                  Technology should
                  <br />
                  <span className="text-blue-600">work together.</span>
                </h2>
              </div>

              {/* Right */}
              <div className="max-w-[600px]">
                <p className="text-[15px] leading-7 text-[#64748B] sm:text-base sm:leading-8">
                  Running a business already comes with enough moving parts.
                  Your website, marketing, analytics, and customer communication
                  shouldn't feel like completely separate systems.
                </p>

                <p className="mt-4 text-[15px] leading-7 text-[#64748B] sm:text-base sm:leading-8">
                  That's why we use proven platforms and tools where they make
                  sense. Our job is to bring those pieces together into a system
                  that is easier to manage, easier to understand, and built
                  around your business goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            WHY PARTNERS MATTER
        ================================================== */}

        <section className="bg-[#F8FAFC] px-5 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[1100px]">
            <div className="grid gap-5 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-7">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-sm font-black text-blue-600">
                  01
                </div>

                <h3 className="mt-5 text-lg font-bold text-[#171B3A]">
                  Proven Platforms
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#64748B]">
                  We use established tools that businesses already trust, rather
                  than reinventing everything from scratch.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-7">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-sm font-black text-blue-600">
                  02
                </div>

                <h3 className="mt-5 text-lg font-bold text-[#171B3A]">
                  Better Integration
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#64748B]">
                  The goal isn't to collect tools. It's to make the tools you
                  use work together as one practical system.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-7">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-sm font-black text-blue-600">
                  03
                </div>

                <h3 className="mt-5 text-lg font-bold text-[#171B3A]">
                  Focus On Results
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#64748B]">
                  Every platform has a purpose: helping your business get found,
                  operate better, and create more opportunities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            CTA
        ================================================== */}

        <section className="bg-white px-5 pb-16 pt-2 sm:px-6 sm:pb-20 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="relative overflow-hidden rounded-2xl bg-[#171B3A] px-7 py-10 sm:px-10 sm:py-12 lg:px-14">
              {/* Subtle Decoration */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-blue-400/10" />

              <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full border border-blue-400/10" />

              <div className="relative max-w-[700px]">
                <p className="text-xs font-bold uppercase tracking-[0.17em] text-blue-400">
                  Build A Better System
                </p>

                <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.035em] text-white sm:text-4xl">
                  Ready to make your technology work harder?
                </h2>

                <p className="mt-4 max-w-[600px] text-sm leading-7 text-slate-300 sm:text-base">
                  Tell us where your business is today and we'll help you figure
                  out what needs to happen next.
                </p>

                <Link
                  href="/contact"
                  className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-6 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  Book A Call
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
