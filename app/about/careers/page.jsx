"use client";

import { useState } from "react";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { ArrowRight, ChevronDown, MapPin } from "lucide-react";

export default function CareersPage() {
  const [openRole, setOpenRole] = useState(null);

  const positions = [
    {
      title: "Sales Associate",
      location: "Remote / Hybrid",
      type: "Full Time",
      description:
        "Help local businesses understand how Stone Systems can improve their online presence and generate more opportunities.",
      responsibilities: [
        "Connect with potential customers",
        "Understand business needs and goals",
        "Present relevant Stone Systems solutions",
        "Build strong relationships with prospects",
      ],
    },
    {
      title: "Senior SEO Specialist",
      location: "Remote / Hybrid",
      type: "Full Time",
      description:
        "Help local businesses improve their visibility in search and build a stronger presence in their markets.",
      responsibilities: [
        "Develop and manage local SEO strategies",
        "Perform keyword and competitor research",
        "Improve website search visibility",
        "Monitor rankings and campaign performance",
      ],
    },
    {
      title: "Senior Software Engineer",
      location: "Remote / Hybrid",
      type: "Full Time",
      description:
        "Build reliable digital products and systems that help businesses operate and grow more effectively.",
      responsibilities: [
        "Build and maintain web applications",
        "Work closely with design and product teams",
        "Develop scalable frontend and backend systems",
        "Improve performance and reliability",
      ],
    },
  ];

  const toggleRole = (index) => {
    setOpenRole(openRole === index ? null : index);
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F8FAFC] text-[#171B3A]">
        {/* ==================================================
            INTRO
        ================================================== */}

        <section className="border-b border-slate-200 bg-[#F8FAFC]">
          <div className="mx-auto max-w-[1050px] px-5 pb-10 pt-14 text-center sm:px-6 sm:pb-12 sm:pt-16 lg:px-8 lg:pt-20">
            <h1 className="text-4xl font-black tracking-[-0.045em] text-[#171B3A] sm:text-5xl lg:text-[56px]">
              Want to join the <span className="text-blue-600">squad?</span>
            </h1>

            <p className="mx-auto mt-4 max-w-[780px] text-[15px] leading-7 text-[#64748B] sm:mt-5 sm:text-base sm:leading-7">
              At Stone Systems, we're all about doing good work with good
              people. We work hard, solve real problems, and build systems that
              help businesses grow.
            </p>
          </div>
        </section>

        {/* ==================================================
            OPEN POSITIONS
        ================================================== */}

        <section
          id="open-positions"
          className="bg-[#F8FAFC] px-5 pb-14 pt-10 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8"
        >
          <div className="mx-auto max-w-[820px]">
            {/* Section Heading */}
            <div className="rounded-lg bg-blue-600 px-6 py-4 text-center sm:py-5">
              <h2 className="text-2xl font-black tracking-[-0.03em] text-white sm:text-3xl">
                Open Positions
              </h2>
            </div>

            {/* Job List */}
            <div className="mt-5 border-t border-slate-200">
              {positions.map((position, index) => {
                const isOpen = openRole === index;

                return (
                  <div
                    key={position.title}
                    className="border-b border-slate-200 bg-white"
                  >
                    {/* Job Row */}
                    <button
                      type="button"
                      onClick={() => toggleRole(index)}
                      className="flex w-full items-center justify-between gap-6 px-4 py-4 text-left transition-colors duration-200 hover:bg-slate-50 sm:px-5"
                    >
                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-[#171B3A] sm:text-lg">
                          {position.title}
                        </h3>

                        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#64748B] sm:text-sm">
                          <span className="flex items-center gap-1.5">
                            <MapPin size={13} strokeWidth={1.8} />
                            {position.location}
                          </span>

                          <span>{position.type}</span>
                        </div>
                      </div>

                      <ChevronDown
                        size={19}
                        strokeWidth={1.8}
                        className={`shrink-0 text-[#171B3A] transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Job Details */}
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="border-t border-slate-100 px-4 pb-5 pt-4 sm:px-5">
                          <p className="max-w-[680px] text-sm leading-6 text-[#64748B]">
                            {position.description}
                          </p>

                          <div className="mt-4">
                            <h4 className="text-sm font-bold text-[#171B3A]">
                              What you'll do
                            </h4>

                            <ul className="mt-2 space-y-1.5">
                              {position.responsibilities.map(
                                (responsibility) => (
                                  <li
                                    key={responsibility}
                                    className="flex items-start gap-3 text-sm leading-6 text-[#64748B]"
                                  >
                                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />

                                    <span>{responsibility}</span>
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>

                          <Link
                            href="/contact"
                            className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-bold text-white transition-colors duration-200 hover:bg-blue-700"
                          >
                            Apply for this role
                            <ArrowRight size={16} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================================================
            CTA
        ================================================== */}

        <section className="bg-white px-5 pb-14 pt-2 sm:px-6 sm:pb-16 lg:px-8">
          <div className="mx-auto max-w-[1200px]">
            <div className="overflow-hidden rounded-xl bg-[#171B3A]">
              <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
                {/* Left Content */}
                <div className="px-7 py-9 sm:px-10 sm:py-11 lg:px-12 lg:py-12">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-400">
                    Work With Us
                  </p>

                  <h2 className="mt-2 max-w-xl text-3xl font-black leading-tight tracking-[-0.035em] text-white sm:text-4xl">
                    Want to schedule a time to talk?
                  </h2>

                  <p className="mt-4 max-w-[500px] text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
                    Don't see the right position? We'd still love to hear from
                    you. Tell us a little about yourself and how you could
                    contribute to the team.
                  </p>

                  <Link
                    href="/contact"
                    className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700"
                  >
                    Get In Touch
                    <ArrowRight size={17} />
                  </Link>
                </div>

                {/* Right Side */}
                <div className="relative hidden min-h-[260px] lg:block">
                  <div className="absolute inset-y-0 right-0 w-full overflow-hidden">
                    {/* Subtle background shape */}
                    <div className="absolute -right-28 top-1/2 h-[320px] w-[320px] -translate-y-1/2 rounded-full border border-white/[0.06]" />

                    <div className="absolute -right-4 top-1/2 h-[230px] w-[230px] -translate-y-1/2 rounded-full border border-white/[0.06]" />

                    {/* Simple architectural blocks */}
                    <div className="absolute right-20 top-1/2 flex h-28 w-28 -translate-y-1/2 items-end justify-center">
                      <div className="h-20 w-14 rounded-t-md bg-blue-600/20" />

                      <div className="absolute bottom-0 right-3 h-28 w-18 rounded-t-md border border-white/[0.08] bg-white/[0.03]" />

                      <div className="absolute bottom-0 left-3 h-14 w-11 rounded-t-md border border-white/[0.06] bg-white/[0.02]" />
                    </div>
                  </div>
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

