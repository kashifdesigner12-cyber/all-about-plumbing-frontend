"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function ProductDetail({
  eyebrow,
  title,
  highlight,
  description,
  icon: Icon,
  image,
  benefits = [],
  features = [],
  stats = [],
}) {
  return (
    <>
      {/* ==================================================
          HERO
      ================================================== */}

      <section className="relative overflow-hidden bg-[#F5F8FF]">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-blue-200/50 blur-[120px]" />

        <div className="pointer-events-none absolute -bottom-48 -left-40 h-[500px] w-[500px] rounded-full bg-blue-100/70 blur-[110px]" />

        <div className="relative mx-auto max-w-[1440px] px-5 pb-20 pt-20 sm:px-8 lg:px-12 lg:pb-28 lg:pt-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
            <div>
              <Link
                href="/products"
                className="mb-7 inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:gap-3"
              >
                <ChevronRight size={16} className="rotate-180" />
                All Products
              </Link>

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-600 shadow-sm">
                <Sparkles size={14} />
                {eyebrow}
              </div>

              <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.06em] text-[#171B3A] sm:text-6xl lg:text-7xl">
                {title}{" "}
                <span className="text-blue-600">
                  {highlight}
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-[#64748B] sm:text-lg">
                {description}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/about/contact"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700"
                >
                  Let's Talk
                  <ArrowRight size={17} />
                </Link>

                <Link
                  href="/pricing"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-7 text-sm font-bold text-[#171B3A] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:text-blue-600"
                >
                  View Pricing
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-5 rounded-[35px] bg-blue-100/50 blur-2xl" />

              <div className="relative overflow-hidden rounded-[30px] border border-blue-100 bg-white p-5 shadow-[0_30px_90px_rgba(37,99,235,0.12)]">
                {image ? (
                  <img
                    src={image}
                    alt={title}
                    className="h-[380px] w-full rounded-[22px] object-cover"
                  />
                ) : (
                  <div className="flex h-[380px] items-center justify-center rounded-[22px] bg-[#EEF4FF]">
                    <div className="flex h-28 w-28 items-center justify-center rounded-[28px] bg-blue-600 text-white shadow-xl shadow-blue-600/20">
                      {Icon && (
                        <Icon
                          size={55}
                          strokeWidth={1.8}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          STATS
      ================================================== */}

      {stats.length > 0 && (
        <section className="border-b border-slate-100 bg-white">
          <div className="mx-auto grid max-w-[1200px] grid-cols-2 divide-x divide-slate-100 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="px-5 py-8 text-center sm:px-8"
              >
                <p className="text-2xl font-black text-blue-600 sm:text-3xl">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs font-semibold text-[#64748B] sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ==================================================
          BENEFITS
      ================================================== */}

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-[1300px] px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Why it matters
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#171B3A] sm:text-5xl">
              Built to help your{" "}
              <span className="text-blue-600">
                business grow.
              </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#64748B] sm:text-base">
              Simple tools designed around the way contractors
              and home service businesses actually work.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              const BenefitIcon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="group rounded-[24px] border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_25px_60px_rgba(37,99,235,0.10)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                    {BenefitIcon ? (
                      <BenefitIcon size={22} />
                    ) : (
                      <Check size={22} />
                    )}
                  </div>

                  <h3 className="mt-6 text-xl font-black tracking-[-0.025em] text-[#171B3A]">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#64748B]">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================
          FEATURES
      ================================================== */}

      <section className="bg-[#F8FAFC] py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                Everything included
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#171B3A] sm:text-5xl">
                Everything you need.
              </h2>

              <p className="mt-5 text-sm leading-7 text-[#64748B] sm:text-base">
                We keep things simple so you can spend less time
                managing technology and more time growing your
                business.
              </p>

              <Link
                href="/about/contact"
                className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Get Started
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <Check size={16} />
                  </div>

                  <span className="text-sm font-bold text-[#171B3A]">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          CTA
      ================================================== */}

      <section className="bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1200px]">
          <div className="relative overflow-hidden rounded-[32px] bg-[#171B3A] px-7 py-16 text-center sm:px-12 lg:px-20 lg:py-20">
            <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-[100px]" />

            <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-blue-500/10 blur-[100px]" />

            <div className="relative">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/30">
                {Icon && <Icon size={28} />}
              </div>

              <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
                Ready to grow?
              </p>

              <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black leading-tight tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl">
                Build a better system for your{" "}
                <span className="text-blue-400">
                  business.
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Let's build the tools and systems you need to
                attract more customers and grow with confidence.
              </p>

              <Link
                href="/about/contact"
                className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700"
              >
                Let's Talk
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

