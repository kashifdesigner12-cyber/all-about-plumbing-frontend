"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import {
  ArrowRight,
  MessageSquare,
  Settings2,
  Rocket,
} from "lucide-react";

export default function OurWorkPage() {
  const projects = [
    { image: "/images/our-work/work-1.jpg" },
    { image: "/images/our-work/work-2.jpg" },
    { image: "/images/our-work/work-3.jpg" },
    { image: "/images/our-work/work-4.jpg" },
    { image: "/images/our-work/work-5.jpg" },
    { image: "/images/our-work/work-6.jpg" },
    { image: "/images/our-work/work-7.jpg" },
    { image: "/images/our-work/work-8.jpg" },
    { image: "/images/our-work/work-9.jpg" },
    { image: "/images/our-work/work-10.jpg" },
    { image: "/images/our-work/work-11.jpg" },
    { image: "/images/our-work/work-12.jpg" },
  ];

  const process = [
    {
      number: "01",
      title: "Demo Call",
      time: "(20 mins)",
      icon: MessageSquare,
      description:
        "We'll answer your questions, show you the features you're interested in, and walk you through how the system works.",
    },
    {
      number: "02",
      title: "We build your system",
      time: "(7–10 days)",
      icon: Settings2,
      description:
        "Share your business details through a simple onboarding form. We'll use that information to build your website and marketing system.",
    },
    {
      number: "03",
      title: "Launch Call",
      time: "(25 mins)",
      icon: Rocket,
      description:
        "We'll walk you through your new website and system, answer your questions, and make sure you're ready to go.",
    },
  ];

  return (
    <>
      <Header />

      <main className="relative min-h-screen overflow-hidden bg-[#F5F8FF] text-slate-900">
        {/* ==================================================
            BACKGROUND EFFECTS
        ================================================== */}

        <div
          className="pointer-events-none fixed -right-56 top-40 h-[600px] w-[600px] rounded-full bg-blue-100/60 blur-3xl"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none fixed -left-56 top-[900px] h-[550px] w-[550px] rounded-full bg-blue-50/80 blur-3xl"
          aria-hidden="true"
        />

        {/* ==================================================
            HERO SECTION
        ================================================== */}

        <section className="relative overflow-hidden bg-[#F5F8FF] pt-32">
          <div className="pointer-events-none absolute right-[-160px] top-[-180px] h-[500px] w-[500px] rounded-full bg-blue-200/40 blur-3xl" />

          <div className="pointer-events-none absolute bottom-[-220px] left-[-160px] h-[500px] w-[500px] rounded-full bg-blue-100/60 blur-3xl" />

          <div className="relative mx-auto max-w-[1200px] px-5 pb-20 pt-8 sm:px-8 sm:pb-24 lg:px-10 lg:pb-28">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-5xl font-black leading-[1.02] tracking-[-0.06em] sm:text-6xl lg:text-[76px]">
                Take a look at what
                <br />
                we've{" "}
                <span className="text-blue-600">built.</span>
              </h1>

              <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-[#64748B] sm:text-lg sm:leading-8">
                Explore a selection of websites and digital experiences
                we've created for contractors and service businesses.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/about/contact"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  Book A Call
                  <ArrowRight size={17} />
                </Link>

                <a
                  href="#projects"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-7 text-sm font-bold text-[#171B3A] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-600"
                >
                  View Our Work
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            PROJECT GALLERY
        ================================================== */}

        <section
          id="projects"
          className="relative bg-white px-5 py-20 sm:px-8 lg:px-10 lg:py-24"
        >
          <div className="mx-auto max-w-[1400px]">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] sm:text-4xl lg:text-5xl">
                Websites built to{" "}
                <span className="text-blue-600">perform.</span>
              </h2>

              <p className="mt-5 text-base leading-7 text-[#64748B] sm:text-lg">
                Clean design, responsive layouts, and practical digital
                experiences built around real business goals.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-7">
              {projects.map((project, index) => (
                <motion.div
                  key={project.image}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    delay: Math.min(index * 0.04, 0.2),
                  }}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-[0_10px_35px_rgba(23,27,58,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_25px_60px_rgba(37,99,235,0.12)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={project.image}
                      alt={`Stone Systems project ${index + 1}`}
                      loading={index > 1 ? "lazy" : "eager"}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#171B3A]/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================
            HOW IT WORKS SECTION
        ================================================== */}

        <section className="relative overflow-hidden bg-white px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
          {/* Soft background glow */}

          <div
            className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-blue-50/60 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-[1500px]">
            {/* Section Heading */}

            <div className="mx-auto max-w-3xl text-center">
             

              <h2 className="mt-3 text-4xl font-black tracking-[-0.055em] sm:text-5xl lg:text-6xl">
                What working with us{" "}
                <span className="text-blue-600">looks like.</span>
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#64748B] sm:text-lg">
                A simple three-step process designed to get your new
                website and marketing system live without unnecessary
                complexity.
              </p>
            </div>

            {/* ==================================================
                DESKTOP PROCESS
            ================================================== */}

            <div className="relative mt-24 hidden lg:block">
              {/* Wavy Dotted Connector */}

              <div className="pointer-events-none absolute left-[10%] right-[10%] top-[30px] z-0 h-[230px]">
                <svg
                  viewBox="0 0 1000 230"
                  className="h-full w-full overflow-visible"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M0 45
                       C95 45 120 190 250 190
                       C365 190 385 45 500 45
                       C615 45 635 190 750 190
                       C880 190 905 45 1000 45"
                    fill="none"
                    stroke="#CBD5E1"
                    strokeWidth="9"
                    strokeDasharray="10 16"
                    strokeLinecap="butt"
                  />
                </svg>
              </div>

              {/* Process Columns */}

              <div className="relative z-10 grid grid-cols-3 gap-16">
                {process.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.number}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.55,
                        delay: index * 0.12,
                      }}
                      className="relative flex flex-col items-center text-center"
                    >
                      {/* Number Circle */}

                      <div className="relative">
                        <div className="flex h-[216px] w-[216px] items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_20px_45px_rgba(37,99,235,0.18)]">
                          <span className="text-[76px] font-light leading-none tracking-[-0.05em]">
                            {index + 1}
                          </span>
                        </div>

                        {/* Icon Badge */}

                        <div className="absolute -bottom-8 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border-[7px] border-white bg-white shadow-[0_8px_25px_rgba(23,27,58,0.12)]">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                            <Icon size={21} strokeWidth={2} />
                          </div>
                        </div>
                      </div>

                      {/* Content */}

                      <div className="mt-24 max-w-[390px]">
                        <h3 className="text-[42px] font-black leading-[1.05] tracking-[-0.045em] text-[#071B55]">
                          {item.title}
                        </h3>

                        <p className="mt-4 text-[30px] font-black leading-none tracking-[-0.04em] text-[#071B55]">
                          {item.time}
                        </p>

                        <p className="mt-8 text-lg leading-8 text-[#0D3974]">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* ==================================================
                MOBILE / TABLET PROCESS
            ================================================== */}

            <div className="relative mt-16 lg:hidden">
              {/* Vertical Connector */}

              <div
                className="pointer-events-none absolute bottom-12 left-[47px] top-12 w-px bg-slate-200"
                aria-hidden="true"
              />

              <div className="relative space-y-14">
                {process.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.number}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                      }}
                      className="relative grid grid-cols-[96px_1fr] gap-6"
                    >
                      {/* Number */}

                      <div className="relative z-10">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                          <span className="text-4xl font-light">
                            {index + 1}
                          </span>
                        </div>

                        {/* Icon */}

                        <div className="absolute -bottom-4 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-blue-50 text-blue-600 shadow-md">
                          <Icon size={16} />
                        </div>
                      </div>

                      {/* Content */}

                      <div className="pt-3">
                        <h3 className="text-2xl font-black leading-tight tracking-[-0.04em] text-[#071B55] sm:text-3xl">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-xl font-black text-[#071B55]">
                          {item.time}
                        </p>

                        <p className="mt-5 text-base leading-7 text-[#0D3974] sm:text-lg">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            STANDARD CTA SECTION
        ================================================== */}

        <section className="bg-white px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[1200px]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-2xl bg-[#171B3A] px-6 py-12 shadow-[0_25px_70px_rgba(23,27,58,0.12)] sm:px-10 md:px-14 md:py-16"
            >
              {/* Background Glow */}

              <div
                className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-[120px]"
                aria-hidden="true"
              />

              <div className="relative z-10 grid items-center gap-10 md:grid-cols-2 md:gap-14">
                {/* Left */}

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
                    <ArrowRight size={18} strokeWidth={2.5} />
                  </Link>
                </motion.div>

                {/* Right Image */}

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="relative flex min-h-[250px] items-end justify-center md:min-h-[320px]"
                >
                  <div
                    className="pointer-events-none absolute bottom-0 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-blue-600/20 blur-[80px]"
                    aria-hidden="true"
                  />

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