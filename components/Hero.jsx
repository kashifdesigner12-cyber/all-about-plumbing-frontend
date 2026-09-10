"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#171B3A]">
      {/* ==================================================
          BACKGROUND GLOWS
      ================================================== */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]" />

        <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[140px]" />

        <div className="absolute bottom-0 left-1/2 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/5 blur-[120px]" />
      </div>

      {/* ==================================================
          MAIN CONTAINER
      ================================================== */}
      <div className="relative mx-auto flex min-h-[calc(100vh-82px)] w-full max-w-[1500px] items-center px-6 py-20 sm:px-8 lg:px-12 lg:py-16">
        {/* ==================================================
            LEFT CONTENT
        ================================================== */}
        <div className="relative z-20 w-full lg:w-[64%]">
          {/* Heading */}
          <h1 className="max-w-[1000px] text-[54px] font-extrabold leading-[0.92] tracking-[-0.055em] text-white sm:text-[70px] md:text-[82px] lg:text-[88px] xl:text-[100px]">
            Website Design
            <br />
            &amp; Marketing
            <br />
            Systems For
            <br />
            <span className="text-blue-400">Contractors</span>
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-[650px] text-lg leading-8 text-[#CBD0DE] sm:text-xl">
            Cut the bullshit. Marketing isn&apos;t rocket science.
            <br className="hidden sm:block" />
            No agency has the miracle solution.
          </p>

          {/* ==================================================
              BUTTONS
          ================================================== */}
          <div className="mt-9 flex flex-wrap gap-4">
            {/* Primary Button */}
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-blue-600 px-7 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 sm:px-8 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#171B3A]"
            >
              Get Started
            </Link>

            {/* Secondary Button */}
            <Link
              href="/our-work"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-7 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-blue-600/10 hover:text-blue-300 sm:px-8 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#171B3A]"
            >
              View Work
            </Link>
          </div>

          {/* ==================================================
              TRUST TEXT
          ================================================== */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-[#AEB5C8]">
            <span>Built for contractors</span>

            <span
              className="h-1.5 w-1.5 rounded-full bg-blue-400"
              aria-hidden="true"
            />

            <span>Simple systems</span>

            <span
              className="h-1.5 w-1.5 rounded-full bg-blue-400"
              aria-hidden="true"
            />

            <span>More leads</span>
          </div>
        </div>

        {/* ==================================================
            RIGHT MASCOT
        ================================================== */}
        <div className="pointer-events-none absolute bottom-0 right-[-90px] z-10 hidden h-[760px] w-[600px] lg:block xl:right-[-20px] xl:h-[800px] xl:w-[630px]">
          {/* Mascot Glow */}
          <div
            className="absolute bottom-[100px] left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-600/15 blur-[110px]"
            aria-hidden="true"
          />

          {/* ==================================================
              MASCOT IMAGE
          ================================================== */}
          <div className="absolute bottom-0 left-1/2 h-full w-full -translate-x-1/2">
            <img
              src="/images/contractor-mascot.png"
              alt="Stone Systems Contractor"
              className="h-full w-full object-contain object-bottom"
            />
          </div>
        </div>
      </div>

      {/* ==================================================
          BOTTOM WHITE CURVE
      ================================================== */}
      <div
        className="absolute bottom-0 left-0 z-30 h-[45px] w-full rounded-t-[40px] bg-white md:h-[55px] md:rounded-t-[80px]"
        aria-hidden="true"
      />
    </section>
  );
}