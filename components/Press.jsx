"use client";

import { FileText } from "lucide-react";

export default function Press() {
  const pressItems = [
    {
      image: "/images/press/surf.jpg",
      date: "November 17, 2025",
      title: "Contractor Growth Made Simple",
      author: "By Grace Mahas",
      description:
        "Interview with Kai Stone on innovation strategy and contractor marketing.",
      source: "Innovation Strategy",
    },
    {
      image: "/images/press/kai.jpg",
      date: "December 18, 2025",
      title: "Startup Savvy: Kai Stone of StoneSystems.io",
      author: "",
      description:
        "Authority Magazine interview about building and scaling a startup.",
      source: "Authority Magazine",
    },
    {
      image: "/images/press/team.jpg",
      date: "December 8, 2025",
      title: "Kai Stone & Michael Vanhoutte Announce Software Debut",
      author: "",
      description:
        "Yahoo Finance coverage of the multi-million-dollar software launch.",
      source: "Yahoo Finance",
    },
    {
      image: "/images/press/business.jpg",
      date: "",
      title: "Kai Stone's Unfiltered Approach to Life and Business",
      author: "",
      description:
        "Millennium Magazine feature on values-driven entrepreneurship.",
      source: "Millennium Magazine",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-36">
      {/* =========================================
          BACKGROUND GLOW
      ========================================== */}

      <div
        className="pointer-events-none absolute left-[-220px] top-20 h-[450px] w-[450px] rounded-full bg-blue-600/[0.04] blur-[140px]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute bottom-0 right-[-220px] h-[450px] w-[450px] rounded-full bg-blue-600/[0.04] blur-[140px]"
        aria-hidden="true"
      />

      {/* =========================================
          MAIN CONTAINER
      ========================================== */}

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* =========================================
            HEADING
        ========================================== */}

        <div className="mb-14 max-w-4xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            In The News
          </p>

          <h2 className="text-4xl font-bold leading-[1.02] tracking-[-0.05em] text-[#171B3A] sm:text-5xl md:text-6xl lg:text-7xl">
            Stone Systems
            <br />
            in the Press
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#64748B]">
            See what people are saying about Stone Systems, our approach to
            contractor marketing, and the team behind the company.
          </p>
        </div>

        {/* =========================================
            PRESS CARDS
        ========================================== */}

        <div className="grid gap-6 lg:grid-cols-2">
          {pressItems.map((item) => (
            <article
              key={item.title}
              className="
                group
                flex
                min-h-[380px]
                overflow-hidden
                rounded-2xl
                border
                border-[#E2E8F0]
                bg-[#171B3A]
                shadow-[0_15px_45px_rgba(23,27,58,0.07)]
                transition-all
                duration-500
                hover:-translate-y-1
                hover:shadow-[0_25px_60px_rgba(37,99,235,0.14)]
              "
            >
              {/* =================================
                  IMAGE
              ================================== */}

              <div className="relative w-[42%] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="
                    h-full
                    min-h-[380px]
                    w-full
                    object-cover
                    transition
                    duration-700
                    group-hover:scale-105
                  "
                />

                {/* Image overlay */}

                <div className="absolute inset-0 bg-[#171B3A]/10 transition duration-500 group-hover:bg-[#171B3A]/0" />
              </div>

              {/* =================================
                  CONTENT
              ================================== */}

              <div className="flex w-[58%] flex-col p-6 sm:p-7">
                {/* Top */}

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span
                    className="
                      inline-flex
                      h-8
                      items-center
                      rounded-lg
                      bg-blue-600
                      px-3
                      text-[11px]
                      font-bold
                      uppercase
                      tracking-[0.12em]
                      text-white
                    "
                  >
                    Press
                  </span>

                  {item.date && (
                    <span className="text-xs text-gray-400">
                      {item.date}
                    </span>
                  )}
                </div>

                {/* Title */}

                <h3
                  className="
                    mt-6
                    text-xl
                    font-bold
                    leading-tight
                    tracking-tight
                    text-white
                    sm:text-2xl
                  "
                >
                  {item.title}
                </h3>

                {/* Author */}

                {item.author && (
                  <p className="mt-3 text-sm italic text-gray-400">
                    {item.author}
                  </p>
                )}

                {/* Description */}

                <p className="mt-4 text-sm leading-7 text-gray-300 sm:text-base">
                  {item.description}
                </p>

                {/* =================================
                    BOTTOM SOURCE
                ================================== */}

                <div
                  className="
                    mt-auto
                    flex
                    items-center
                    gap-2
                    border-t
                    border-white/10
                    pt-5
                    text-gray-300
                  "
                >
                  <FileText
                    size={17}
                    strokeWidth={2}
                    className="shrink-0 text-blue-400"
                  />

                  <span className="truncate text-sm">
                    {item.source}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

