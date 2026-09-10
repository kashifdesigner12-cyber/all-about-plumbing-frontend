"use client";

import Link from "next/link";
import Image from "next/image";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const values = [
    {
      number: "01",
      title: "F*cks Given",
      description:
        "We're in the business of giving a f*ck. And business is booming.",
    },
    {
      number: "02",
      title: "Humor",
      description:
        "We're serious about results, but our team meetings might as well be stand-up gigs.",
    },
    {
      number: "03",
      title: "Genuine",
      description:
        "Real talk and real action. We're genuine because anything else is boring.",
    },
    {
      number: "04",
      title: "Humility",
      description:
        "We're perfect. We've never made a mistake, right? But if we do, you know we'll fix it right away.",
    },
    {
      number: "05",
      title: "Integrity",
      description: "When we say we'll do something we do it. It's that simple.",
    },
  ];

  /* ==================================================
     TEAM
  ================================================== */

  const team = [
    {
      name: "Alex Johnson",
      role: "Founder",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85",
      alt: "Alex Johnson - Founder",
    },
    {
      name: "Sarah Williams",
      role: "Operations",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=85",
      alt: "Sarah Williams - Operations",
    },
    {
      name: "Michael Davis",
      role: "Marketing",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85",
      alt: "Michael Davis - Marketing",
    },
  ];

  const socialLinks = [
    {
      href: "#",
      label: "YouTube",
      icon: (
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.5-5.8ZM9.6 15.9V8.1l6.5 3.9-6.5 3.9Z" />
        </svg>
      ),
    },
    {
      href: "#",
      label: "Instagram",
      icon: (
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <Header />

      <main className="overflow-hidden bg-[#F3F4F6] text-[#171B3A]">
        {/* ==================================================
            INTRO / HERO
        ================================================== */}

        <section
          className="relative overflow-hidden bg-[#F3F4F6] pb-24 pt-24 sm:pb-28 sm:pt-28 lg:pb-36 lg:pt-32"
          aria-labelledby="hero-title"
        >
          {/* Background decorations */}

          <div
            className="pointer-events-none absolute -left-56 top-20 h-[600px] w-[600px] rounded-full bg-blue-200/25 blur-[150px]"
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute -right-56 top-0 h-[600px] w-[600px] rounded-full bg-blue-100/40 blur-[150px]"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
            {/* BIG TITLE */}

            <div className="mx-auto max-w-[1250px] text-center">
              <h1
                id="hero-title"
                className="text-5xl font-black leading-[0.94] tracking-[-0.065em] text-[#171B3A] sm:text-6xl md:text-7xl lg:text-[82px] xl:text-[96px]"
              >
                Less bullshit,
                <br />
                <span className="text-blue-600">more results.</span>
              </h1>
            </div>

            {/* INTRO CONTENT */}

            <div className="mx-auto mt-20 grid max-w-[1250px] items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
              {/* TEXT */}

              <div className="max-w-xl">
                <p className="text-lg font-medium leading-8 text-[#171B3A] sm:text-xl sm:leading-9">
                  At StoneSystems, our mission is simple: cut out the complexity
                  and nonsense from marketing. We&apos;ve seen too many agencies
                  drown contractors in buzzwords and nerdy technical terms that
                  make the basics seem like rocket science.
                </p>

                <p className="mt-7 text-lg leading-8 text-[#64748B] sm:text-xl sm:leading-9">
                  Marketing doesn&apos;t need to be complicated, and it
                  definitely shouldn&apos;t come with a hefty price tag just
                  because someone tries to make it sound fancy.
                </p>

                <p className="mt-7 text-lg leading-8 text-[#64748B] sm:text-xl sm:leading-9">
                  StoneSystems was built to offer affordable, no-nonsense
                  systems for contractors who want to grow their business and
                  online presence the right way.
                </p>

                <p className="mt-7 text-lg leading-8 text-[#64748B] sm:text-xl sm:leading-9">
                  No overhyped promises. No unnecessary complexity. No confusing
                  marketing language. Just simple systems designed to help your
                  business grow.
                </p>

                {/* SOCIAL LINKS */}

                <div className="mt-9 flex items-center gap-3">
                  {socialLinks.map(({ href, label, icon }) => (
                    <Link
                      key={label}
                      href={href}
                      aria-label={label}
                      className="flex h-11 w-11 items-center justify-center rounded-lg border border-blue-200 bg-white text-blue-600 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                    >
                      {icon}
                    </Link>
                  ))}
                </div>
              </div>

              {/* IMAGE */}

              <div className="relative">
                <div
                  className="absolute -right-5 -top-5 h-32 w-32 rounded-2xl bg-blue-200/60"
                  aria-hidden="true"
                />

                <div
                  className="absolute -bottom-5 -left-5 h-32 w-32 rounded-2xl bg-blue-100/70"
                  aria-hidden="true"
                />

                <div className="relative overflow-hidden rounded-2xl bg-white p-2 shadow-[0_25px_70px_rgba(23,27,58,0.12)]">
                  <Image
                    src="/images/about/about-story.jpg"
                    alt="StoneSystems team collaborating on marketing strategies"
                    width={600}
                    height={560}
                    className="h-[420px] w-full object-cover sm:h-[500px] lg:h-[560px]"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            STATEMENT
        ================================================== */}

        <section
          className="relative overflow-hidden bg-[#171B3A] py-24 sm:py-28 lg:py-36"
          aria-labelledby="statement-title"
        >
          <div
            className="pointer-events-none absolute -left-48 top-0 h-[550px] w-[550px] rounded-full bg-blue-600/10 blur-[140px]"
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute -right-48 bottom-0 h-[550px] w-[550px] rounded-full bg-blue-500/10 blur-[140px]"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-[1350px] px-5 sm:px-8 lg:px-12">
            <div className="grid items-start gap-12 lg:grid-cols-[280px_1fr] lg:gap-20">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-400">
                  What We Believe
                </p>

                <div className="mt-6 h-1 w-16 rounded-full bg-blue-600" />
              </div>

              <div>
                <h2
                  id="statement-title"
                  className="max-w-5xl text-4xl font-black leading-[1.04] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl xl:text-7xl"
                >
                  Good marketing should
                  <span className="text-blue-400">
                    {" "}
                    make things easier,
                  </span>{" "}
                  not make them more complicated.
                </h2>

                <p className="mt-8 max-w-4xl text-lg leading-8 text-slate-300 sm:text-xl sm:leading-9">
                  We believe business owners should be able to understand what
                  they&apos;re paying for, see the value behind it, and actually
                  use the systems that are built for them.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            CULTURE
        ================================================== */}

        <section
          className="relative overflow-hidden bg-[#F3F4F6] py-24 sm:py-28 lg:py-36"
          aria-labelledby="culture-title"
        >
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
            {/* HEADING */}

            <div className="mx-auto max-w-[950px] text-center">
              <h2
                id="culture-title"
                className="mt-5 text-4xl font-black leading-[1.02] tracking-[-0.055em] text-[#171B3A] sm:text-5xl lg:text-6xl xl:text-7xl"
              >
                Our culture? It&apos;s no accident.
              </h2>

              <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-[#64748B] sm:text-xl sm:leading-9">
                We&apos;ve crafted it with the same precision as a Tinder bio
                that actually works.
              </p>
            </div>

            {/* VALUES + IMAGE */}

            <div className="mt-20 grid items-center gap-16 lg:grid-cols-[1fr_430px] lg:gap-24">
              {/* VALUES */}

              <div className="max-w-3xl">
                {values.map((value, index) => (
                  <div
                    key={value.number}
                    className={`group grid grid-cols-[70px_1fr] gap-5 py-7 sm:grid-cols-[90px_1fr] sm:gap-7 sm:py-8 ${
                      index !== values.length - 1
                        ? "border-b border-[#CBD5E1]"
                        : ""
                    }`}
                  >
                    <div>
                      <span
                        className="text-4xl font-black leading-none tracking-[-0.05em] text-blue-600/25 transition-colors duration-300 group-hover:text-blue-600 sm:text-5xl"
                        aria-hidden="true"
                      >
                        {value.number}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-black tracking-[-0.025em] text-[#171B3A] transition-colors duration-300 group-hover:text-blue-600 sm:text-2xl">
                        {value.title}
                      </h3>

                      <p className="mt-3 max-w-xl text-sm leading-7 text-[#64748B] sm:text-base sm:leading-8">
                        {value.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* MASCOT IMAGE */}

              <div className="flex items-center justify-center lg:justify-end">
                <Image
                  src="/images/about/contractor-mascot.png"
                  alt="StoneSystems mascot character representing our brand personality"
                  width={430}
                  height={560}
                  className="h-[380px] w-auto object-contain sm:h-[470px] lg:h-[560px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            TEAM
        ================================================== */}

        <section
          className="bg-white py-24 sm:py-28 lg:py-36"
          aria-labelledby="team-title"
        >
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
            {/* HEADING */}

            <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
              <div>
                <h2
                  id="team-title"
                  className="mt-4 text-4xl font-black leading-[1.05] tracking-[-0.05em] text-[#171B3A] sm:text-5xl lg:text-6xl"
                >
                  Meet Your Team
                </h2>
              </div>

              <p className="max-w-xl text-base leading-7 text-[#64748B] sm:text-lg sm:leading-8">
                Real people, real work, and a team focused on building systems
                that actually help businesses move forward.
              </p>
            </div>

            {/* ==================================================
                TEAM GRID
            ================================================== */}

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="group overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(23,27,58,0.10)]"
                >
                  {/* TEAM IMAGE */}

                  <div className="relative h-[350px] overflow-hidden bg-slate-100 sm:h-[400px]">
                    <img
                      src={member.image}
                      alt={member.alt}
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Image overlay */}

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#171B3A]/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  {/* TEAM INFO */}

                  <div className="px-7 py-6">
                    <h3 className="text-xl font-black tracking-[-0.02em] text-[#171B3A]">
                      {member.name}
                    </h3>

                    <p className="mt-2 text-base font-semibold text-blue-600">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================
            FINAL STATEMENT
        ================================================== */}

        <section
          className="bg-[#F3F4F6] px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-36"
          aria-labelledby="cta-title"
        >
          <div className="mx-auto max-w-[1250px]">
            <div className="relative overflow-hidden rounded-3xl bg-[#171B3A] px-7 py-16 sm:px-12 sm:py-20 lg:px-20 lg:py-24">
              {/* GLOW EFFECTS */}

              <div
                className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-[110px]"
                aria-hidden="true"
              />

              <div
                className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-blue-500/10 blur-[100px]"
                aria-hidden="true"
              />

              {/* CONTENT */}

              <div className="relative text-center">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-400">
                  StoneSystems
                </p>

                <h2
                  id="cta-title"
                  className="mx-auto mt-5 max-w-4xl text-4xl font-black leading-[1.03] tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl xl:text-7xl"
                >
                  No bullshit.
                  <br />
                  <span className="text-blue-400">Just better systems.</span>
                </h2>

                <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl sm:leading-9">
                  Simple technology, better customer experiences, and practical
                  systems built to help your business grow.
                </p>

                <Link
                  href="/contact"
                  className="mt-9 inline-flex h-12 items-center justify-center rounded-xl bg-blue-600 px-8 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-[#171B3A]"
                >
                  Let&apos;s Talk
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
