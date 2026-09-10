"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Quote,
  Star,
  Users,
  TrendingUp,
  Award,
  Zap,
} from "lucide-react";

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: "Mike Anderson",
      role: "General Contractor",
      company: "Anderson Construction",
      initials: "MA",
      text: "Stone Systems gave us a much better website and a simpler way to manage leads. The whole process was straightforward and easy to understand.",
    },
    {
      name: "Sarah Mitchell",
      role: "Remodeling Contractor",
      company: "Mitchell Remodeling",
      initials: "SM",
      text: "Our old website wasn't doing much for the business. The new site looks professional and makes it much easier for potential customers to contact us.",
    },
    {
      name: "David Carter",
      role: "Landscaping Business Owner",
      company: "Carter Landscaping",
      initials: "DC",
      text: "What I liked most was having everything handled in one place. We didn't have to figure out a bunch of different marketing tools ourselves.",
    },
    {
      name: "James Wilson",
      role: "Roofing Contractor",
      company: "Wilson Roofing",
      initials: "JW",
      text: "The team understood what we needed and kept the process simple. Our website is faster, cleaner, and much easier for customers to use.",
    },
    {
      name: "Robert Davis",
      role: "Home Services",
      company: "Davis Home Services",
      initials: "RD",
      text: "The missed-call follow-up has been especially useful for us. It gives customers a quick response when we're busy working on a job.",
    },
    {
      name: "Chris Thompson",
      role: "Electrical Contractor",
      company: "Thompson Electric",
      initials: "CT",
      text: "We wanted something professional without making marketing complicated. Stone Systems helped us build a system that actually fits the way we work.",
    },
  ];

  const stats = [
    {
      icon: Users,
      label: "Businesses Served",
      value: "250+",
    },
    {
      icon: TrendingUp,
      label: "Average Growth",
      value: "145%",
    },
    {
      icon: Award,
      label: "Satisfaction Rate",
      value: "98%",
    },
    {
      icon: Zap,
      label: "Projects Completed",
      value: "180+",
    },
  ];

  const features = [
    "Professional Website Design",
    "Automated Lead Follow-up",
    "Missed Call Text Back",
    "Review Management",
    "Local SEO Optimization",
    "Marketing Automation",
  ];

  return (
    <>
      <Header />

      <main className="relative overflow-hidden bg-white text-[#171B3A]">
        {/* ==================================================
            SOFT BACKGROUND BLUR
        ================================================== */}

        <div
          className="pointer-events-none absolute -right-48 top-20 h-[500px] w-[500px] rounded-full bg-blue-100/60 blur-3xl"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute -left-48 top-[550px] h-[450px] w-[450px] rounded-full bg-blue-50/80 blur-3xl"
          aria-hidden="true"
        />

        {/* ==================================================
            HERO
        ================================================== */}

        <section className="relative px-5 pb-12 pt-20 sm:px-8 sm:pt-24 lg:pb-14 lg:pt-28">
          <div className="mx-auto max-w-[950px] text-center">
            <h1 className="text-4xl font-black leading-[1.04] tracking-[-0.055em] sm:text-5xl lg:text-7xl">
              What our customers
              <span className="text-blue-600"> have to say.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#64748B] sm:text-lg sm:leading-8">
              See how contractors and service businesses are using Stone
              Systems to improve their websites, follow up with leads, and
              create a better customer experience.
            </p>

            {/* Rating */}

            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    fill="currentColor"
                    className="text-blue-600"
                  />
                ))}
              </div>

              <span className="text-sm font-semibold text-[#64748B]">
                4.9/5 from 200+ reviews
              </span>
            </div>

            {/* Stats */}

            <div className="mt-9 grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(23,27,58,0.06)] sm:grid-cols-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className={`flex items-center justify-center gap-3 px-4 py-5 sm:py-6 ${
                      index !== stats.length - 1
                        ? "border-b border-slate-100 sm:border-b-0 sm:border-r"
                        : ""
                    }`}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon size={19} />
                    </div>

                    <div className="text-left">
                      <p className="text-xl font-black text-[#171B3A]">
                        {stat.value}
                      </p>

                      <p className="text-xs font-semibold text-[#64748B]">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================================================
            TESTIMONIALS
        ================================================== */}

        <section className="relative px-5 pb-16 pt-10 sm:px-8 lg:pb-20">
          <div className="mx-auto max-w-[1200px]">
            {/* Section Header */}

            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Quote size={21} />
              </div>

              <h2 className="mt-4 text-3xl font-black leading-[1.08] tracking-[-0.045em] sm:text-4xl lg:text-5xl">
                What businesses are
                <span className="text-blue-600"> saying about us.</span>
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500">
                Real feedback from contractors and service businesses we've
                helped build a stronger online presence.
              </p>
            </div>

            {/* Cards */}

            <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <article
                  key={testimonial.name}
                  className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_35px_rgba(23,27,58,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(37,99,235,0.10)]"
                >
                  {/* Stars */}

                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        fill="currentColor"
                        className="text-blue-600"
                      />
                    ))}
                  </div>

                  {/* Quote */}

                  <p className="mt-5 flex-1 text-[15px] leading-7 text-[#334155]">
                    “{testimonial.text}”
                  </p>

                  {/* Customer */}

                  <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-black text-blue-600">
                      {testimonial.initials}
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-black text-[#171B3A]">
                        {testimonial.name}
                      </h3>

                      <p className="mt-0.5 truncate text-xs font-medium text-[#64748B]">
                        {testimonial.role}
                      </p>

                      <p className="mt-0.5 truncate text-xs font-semibold text-blue-600">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================
            FEATURES
        ================================================== */}

        <section className="relative border-y border-slate-100 bg-[#F8FAFC] px-5 py-16 sm:px-8 lg:py-20">
          <div
            className="pointer-events-none absolute -right-40 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-blue-100/70 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-[1100px]">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              {/* Left */}

              <div>
                <h2 className="text-3xl font-black leading-tight tracking-[-0.045em] sm:text-4xl lg:text-5xl">
                  More than just
                  <br />
                  <span className="text-blue-600">a website.</span>
                </h2>

                <p className="mt-5 max-w-xl text-base leading-7 text-[#64748B]">
                  Your website should make it easier for customers to find
                  you, contact you, and take the next step. That's why we
                  combine your website with practical marketing tools that
                  support your business.
                </p>

                <Link
                  href="/pricing"
                  className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  See Our Pricing
                  <ArrowRight size={17} />
                </Link>
              </div>

              {/* Features */}

              <div className="grid gap-3 sm:grid-cols-2">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-md"
                  >
                    <CheckCircle2
                      size={20}
                      className="shrink-0 text-blue-600"
                    />

                    <span className="text-sm font-bold text-[#334155]">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            MAIN CTA
        ================================================== */}

        <section className="bg-white px-5 py-14 sm:px-8 lg:py-16">
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

              <div className="relative z-10 grid items-center gap-8 md:grid-cols-2 md:gap-14">
                {/* Left Content */}

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

                  <p className="mt-5 max-w-lg text-base leading-7 text-gray-300 sm:text-lg sm:leading-8">
                    Build a stronger online presence, generate more leads, and
                    create a system that helps your contracting business grow.
                  </p>

                  <Link
                    href="/about/contact"
                    className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20"
                  >
                    Get Started
                    <ArrowUpRight size={18} strokeWidth={2.5} />
                  </Link>
                </motion.div>

                {/* Right Image */}

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="relative flex min-h-[240px] items-end justify-center md:min-h-[300px]"
                >
                  {/* Image Glow */}

                  <div
                    className="pointer-events-none absolute bottom-0 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-blue-600/20 blur-[80px]"
                    aria-hidden="true"
                  />

                  {/* Contractor Image */}

                  <img
                    src="/images/cta/contractor.png"
                    alt="Contractor"
                    className="relative z-10 mx-auto h-auto w-[230px] max-w-full object-contain transition duration-500 sm:w-[270px] md:w-[300px]"
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