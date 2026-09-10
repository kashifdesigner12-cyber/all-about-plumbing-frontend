"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import {
  ArrowRight,
  Search,
  CalendarDays,
  User,
} from "lucide-react";

export default function PressPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const articles = [
    {
      category: "Marketing",
      date: "May 7, 2026",
      title: "How to Build a Contractor Training Program That Prints Money",
      author: "Michael Vanhoutte",
      description:
        "Your business is stuck because you can't clone yourself. Build a system that creates great employees and helps your business grow.",
      image: "/images/blog/blog-1.jpg",
    },
    {
      category: "Lead Generation",
      date: "May 5, 2026",
      title: "How to Qualify Contractor Leads and Stop Wasting Time",
      author: "Michael Vanhoutte",
      description:
        "Stop driving across town for estimates that go nowhere. Learn a simple framework for identifying the right leads before you spend your time.",
      image: "/images/blog/blog-2.jpg",
    },
    {
      category: "Marketing",
      date: "May 4, 2026",
      title: "Email Marketing for Contractors: Your Untapped Goldmine",
      author: "Michael Vanhoutte",
      description:
        "A simple email marketing strategy can help contractors reconnect with past customers and create more opportunities.",
      image: "/images/blog/blog-3.jpg",
    },
    {
      category: "Growth",
      date: "May 3, 2026",
      title: "Contractor Marketing Plan: A 5-Step Blueprint for 2026",
      author: "Michael Vanhoutte",
      description:
        "Skip the marketing fluff. Use this practical five-step blueprint to create a system for consistent contractor business growth.",
      image: "/images/blog/blog-4.jpg",
    },
    {
      category: "Lead Generation",
      date: "May 2, 2026",
      title: "Is Thumbtack Worth It for Contractors?",
      author: "Michael Vanhoutte",
      description:
        "Paid lead platforms can become expensive quickly. Here's what contractors should consider before relying on third-party leads.",
      image: "/images/blog/blog-5.jpg",
    },
    {
      category: "Business",
      date: "May 1, 2026",
      title:
        "Master Your Projects: The Power of Contractor Project Management Software",
      author: "Michael Vanhoutte",
      description:
        "Better project management can reduce missed deadlines, improve communication, and help contractors protect their profits.",
      image: "/images/blog/blog-6.jpg",
    },
    {
      category: "Operations",
      date: "April 30, 2026",
      title: "The Contractor's Guide to a Bulletproof Change Order Process",
      author: "Michael Vanhoutte",
      description:
        "Scope creep and verbal agreements can destroy project profits. Build a better change order process and protect your business.",
      image: "/images/blog/blog-7.jpg",
    },
    {
      category: "Technology",
      date: "April 29, 2026",
      title: "What Is a Contractor CRM and Why Does Your Business Need One?",
      author: "Michael Vanhoutte",
      description:
        "A CRM can give contractors one central place to manage leads, customers, conversations, and opportunities.",
      image: "/images/blog/blog-8.jpg",
    },
    {
      category: "Growth",
      date: "April 28, 2026",
      title:
        "Service Agreements for Contractors: Your Key to Recurring Revenue",
      author: "Michael Vanhoutte",
      description:
        "Learn how service agreements can create predictable recurring revenue and help smooth out seasonal slowdowns.",
      image: "/images/blog/blog-9.jpg",
    },
  ];

  const categories = [
    "All",
    "Marketing",
    "Lead Generation",
    "Growth",
    "Business",
    "Operations",
    "Technology",
  ];

  const filteredArticles = useMemo(() => {
    const query = search.toLowerCase().trim();

    return articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query);

      const matchesCategory =
        activeCategory === "All" ||
        article.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const clearFilters = () => {
    setSearch("");
    setActiveCategory("All");
  };

  return (
    <>
      {/* ==================================================
          NAVBAR
      ================================================== */}

      <Header />

      <main className="min-h-screen bg-white text-[#171B3A]">

        {/* ==================================================
            HERO SECTION
        ================================================== */}

        <section className="relative overflow-hidden border-b border-slate-100 bg-[#F5F8FF] pt-32">

          {/* Background Glow */}

          <div className="pointer-events-none absolute -right-48 -top-48 h-[650px] w-[650px] rounded-full bg-blue-200/50 blur-[120px]" />

          <div className="pointer-events-none absolute -bottom-56 -left-48 h-[550px] w-[550px] rounded-full bg-blue-100/70 blur-[110px]" />

          {/* Hero Content */}

          <div className="relative mx-auto max-w-[1440px] px-5 pb-20 pt-8 sm:px-8 lg:px-12 lg:pb-28">

            <div className="mx-auto max-w-5xl text-center">

              <h1 className="text-5xl font-black leading-[0.98] tracking-[-0.06em] sm:text-6xl lg:text-8xl">
                The Stone Systems{" "}
                <span className="text-blue-600">Blog.</span>
              </h1>

              <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-[#64748B] sm:text-lg lg:text-xl">
                Practical marketing strategies, website advice, and growth
                insights built specifically for contractors and home service
                businesses.
              </p>

              {/* Search */}

              <div className="mx-auto mt-10 max-w-3xl">
                <div className="group relative">

                  <Search
                    size={21}
                    className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-600"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search articles, marketing tips, strategies..."
                    className="h-16 w-full rounded-2xl border border-slate-200 bg-white pl-14 pr-6 text-sm font-medium text-[#171B3A] shadow-[0_20px_60px_rgba(23,27,58,0.08)] outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ==================================================
            ARTICLES SECTION
        ================================================== */}

        <section
          id="articles"
          className="bg-white py-16 lg:py-20"
        >
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">

            {/* Section Header */}

            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

              <div>

                <h2 className="text-4xl font-black tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                  Insights for{" "}
                  <span className="text-blue-600">
                    contractors.
                  </span>
                </h2>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-[#64748B] sm:text-base">
                  Straightforward ideas to help you generate more leads,
                  improve your marketing, and build a better business.
                </p>

              </div>

              {/* Categories */}

              <div className="flex max-w-full flex-wrap gap-2">

                {categories.map((category) => {
                  const active = activeCategory === category;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-200 ${
                        active
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                          : "border border-slate-200 bg-white text-[#64748B] hover:border-blue-200 hover:text-blue-600"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}

              </div>
            </div>

            {/* Results Bar */}

            <div className="mt-10 flex items-center justify-between border-b border-slate-100 pb-5">

              <p className="text-sm font-semibold text-[#64748B]">
                Showing{" "}
                <span className="font-black text-[#171B3A]">
                  {filteredArticles.length}
                </span>{" "}
                {filteredArticles.length === 1
                  ? "article"
                  : "articles"}
              </p>

              {(search || activeCategory !== "All") && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm font-bold text-blue-600 transition hover:text-blue-700"
                >
                  Clear filters
                </button>
              )}

            </div>

            {/* Article Grid */}

            {filteredArticles.length > 0 ? (
              <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">

                {filteredArticles.map((article) => (
                  <article
                    key={article.title}
                    className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 hover:shadow-[0_30px_80px_rgba(37,99,235,0.13)]"
                  >

                    {/* Image */}

                    <div className="relative h-[300px] overflow-hidden bg-[#EEF4FF] sm:h-[320px]">

                      <img
                        src={article.image}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#171B3A]/50 via-transparent to-transparent opacity-70" />

                      <div className="absolute left-6 top-6">

                        <span className="inline-flex rounded-full bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-blue-600 shadow-lg">
                          {article.category}
                        </span>

                      </div>
                    </div>

                    {/* Content */}

                    <div className="flex flex-1 flex-col p-7 sm:p-8">

                      {/* Meta */}

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-400">

                        <span className="flex items-center gap-1.5">
                          <CalendarDays
                            size={14}
                            className="text-blue-600"
                          />
                          {article.date}
                        </span>

                        <span className="h-1 w-1 rounded-full bg-slate-300" />

                        <span className="flex items-center gap-1.5">
                          <User
                            size={14}
                            className="text-blue-600"
                          />
                          {article.author}
                        </span>

                      </div>

                      {/* Title */}

                      <h3 className="mt-5 text-2xl font-black leading-[1.12] tracking-[-0.035em] text-[#171B3A] transition-colors duration-300 group-hover:text-blue-600 sm:text-[28px]">
                        {article.title}
                      </h3>

                      {/* Description */}

                      <p className="mt-5 flex-1 text-sm leading-7 text-[#64748B] sm:text-[15px]">
                        {article.description}
                      </p>

                      {/* Bottom */}

                      <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">

                        {/* Author */}

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                            <User size={16} />
                          </div>

                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                              Written by
                            </p>

                            <p className="mt-1 text-xs font-bold text-[#171B3A]">
                              {article.author}
                            </p>
                          </div>

                        </div>

                        {/* Read Button */}

                        <button
                          type="button"
                          className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-xs font-bold text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white group-hover:bg-blue-600 group-hover:text-white"
                        >
                          Read
                          <ArrowRight size={14} />
                        </button>

                      </div>
                    </div>
                  </article>
                ))}

              </div>
            ) : (

              /* Empty State */

              <div className="mt-10 rounded-[28px] border border-slate-200 bg-[#F8FAFC] px-6 py-24 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Search size={26} />
                </div>

                <h3 className="mt-6 text-2xl font-black text-[#171B3A]">
                  No articles found.
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#64748B]">
                  We couldn't find anything matching your search. Try another
                  keyword or select a different category.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-7 inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-6 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  View All Articles
                </button>

              </div>
            )}
          </div>
        </section>

        {/* ==================================================
            CTA SECTION
        ================================================== */}

        <section className="relative mb-16 overflow-hidden bg-[#171B3A] sm:mb-20 lg:mb-24">

          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">

            <div className="relative min-h-[500px] lg:min-h-[570px]">

              {/* Left Content */}

              <div className="relative z-10 flex min-h-[500px] max-w-[700px] flex-col justify-center py-16 sm:py-20 lg:min-h-[570px] lg:py-24">

                <h2 className="max-w-[650px] text-5xl font-black leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-[72px]">
                  Ready to grow
                  <br />
                  your business?
                </h2>

                <p className="mt-7 max-w-[650px] text-base leading-7 text-slate-200 sm:text-lg sm:leading-8 lg:text-[21px] lg:leading-9">
                  Build a stronger online presence, generate more leads, and
                  create a system that helps your contracting business grow.
                </p>

                <div className="mt-8">

                  <Link
                    href="/about/contact"
                    className="inline-flex h-14 items-center gap-3 rounded-xl bg-blue-600 px-7 text-base font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 sm:h-16 sm:px-9 sm:text-lg"
                  >
                    Get Started
                    <ArrowRight size={21} />
                  </Link>

                </div>
              </div>

              {/* Contractor Illustration */}

              <div className="pointer-events-none absolute bottom-0 right-0 z-[1] hidden h-full w-[46%] lg:block">

                <img
                  src="/images/cta/contractor.png"
                  alt="Contractor"
                  className="absolute bottom-0 right-[-20px] h-[94%] w-auto max-w-none object-contain object-bottom"
                />

              </div>

              {/* Mobile Illustration */}

              <div className="relative z-10 mt-4 flex justify-center lg:hidden">

                <img
                  src="/images/cta-contractor.png"
                  alt="Contractor"
                  className="h-[300px] w-auto object-contain object-bottom sm:h-[360px]"
                />

              </div>

            </div>
          </div>
        </section>

      </main>

      {/* ==================================================
          FOOTER
      ================================================== */}

      <Footer />
    </>
  );
}