"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import Image from "next/image";

/**
 * Systems data moved outside the component so it's not recreated on each render.
 * Update images/paths and demoUrl per-system as needed.
 */
const SYSTEMS = [
  {
    id: "website",
    title: "Functional Website",
    description:
      "A modern, mobile-first website that turns visitors into text conversations that arrive directly on your phone.",
    image: "/images/systems/website.png",
    demoUrl: "/demos/website-demo.mp4",
    features: [
      {
        title: "Get Found Online",
        text: "SEO basics and structured content so local customers find you when they search.",
      },
      {
        title: "Showcase Reviews",
        text: "Surface your best testimonials to build trust immediately.",
      },
      {
        title: "Mobile-first Design",
        text: "Fast, responsive pages that look great on every device.",
      },
      {
        title: "Local Search Optimization",
        text: "Pages and metadata tuned for your local market and services.",
      },
    ],
  },
  {
    id: "reviews",
    title: "5-Star Review Funnel",
    description:
      "Automated review requests and follow-ups that make it easy for happy customers to leave 5-star reviews.",
    image: "/images/systems/reviews.png",
    demoUrl: "/demos/reviews-demo.mp4",
    features: [
      {
        title: "Encourage Positive Reviews",
        text: "Smart prompts and one-click flows for customers to leave feedback.",
      },
      {
        title: "Automated Reminders",
        text: "Timed follow-ups increase completion without extra work.",
      },
      {
        title: "Simple One-click Requests",
        text: "Send review invites from your phone or dashboard in one tap.",
      },
      {
        title: "Manage Negative Feedback Privately",
        text: "Catch concerns before they hit public review sites.",
      },
    ],
  },
  {
    id: "missed-call",
    title: "Missed Call → Text Back",
    description:
      "Capture leads even when you're on a job: missed calls trigger an instant text to start the conversation.",
    image: "/images/systems/missed-call.png",
    demoUrl: "/demos/missed-call-demo.mp4",
    features: [
      {
        title: "Never Lose Leads",
        text: "Automatic text responses convert missed calls into conversations.",
      },
      {
        title: "24/7 Availability",
        text: "Set after-hours messages and follow-up rules to keep leads warm.",
      },
      {
        title: "Personalized Replies",
        text: "Customize messages so customers feel attended to, not automated.",
      },
      {
        title: "Easy Setup",
        text: "Integrates with your current phone system — no complicated tech required.",
      },
    ],
  },
  {
    id: "campaigns",
    title: "One-Click Marketing",
    description:
      "Pre-built campaigns for referrals and repeat customers — ready to activate in one click.",
    image: "/images/systems/campaigns.png",
    demoUrl: "/demos/campaigns-demo.mp4",
    features: [
      {
        title: "Ready-made Campaigns",
        text: "Templates for referrals, re-engagement and seasonal promotions.",
      },
      {
        title: "Referral Growth",
        text: "Encourage word-of-mouth with simple referral flows.",
      },
      {
        title: "Return Customer Campaigns",
        text: "Automated messaging to bring customers back when they’re ready.",
      },
      {
        title: "No Marketing Agency Needed",
        text: "Everything organized in a simple dashboard you control.",
      },
    ],
  },
  {
    id: "local-seo",
    title: "Local SEO",
    description:
      "Build a strong local presence that attracts qualified, organic leads over time.",
    image: "/images/systems/local-seo.png",
    demoUrl: "/demos/local-seo-demo.mp4",
    features: [
      {
        title: "Qualified Leads",
        text: "People searching for services in your area find you first.",
      },
      {
        title: "Lower Acquisition Cost",
        text: "Organic traffic reduces the need for paid lead sources.",
      },
      {
        title: "Long-term Growth",
        text: "A structured foundation that continues to bring in customers.",
      },
      {
        title: "Local-first Structure",
        text: "Content and schema optimized for local search queries.",
      },
    ],
  },
];

function DemoModal({ open, onClose, title, demoUrl }) {
  const closeButtonRef = useRef(null);

  // Focus management and body scroll lock
  useEffect(() => {
    if (open) {
      // focus close button for accessibility
      closeButtonRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKey = (e) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-modal-title"
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-3xl w-full rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 id="demo-modal-title" className="text-lg font-semibold">
            {title} — Demo
          </h3>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
            aria-label="Close demo"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4">
          {/* Demo placeholder: replace with a video player or embed as needed */}
          {demoUrl ? (
            <video
              src={demoUrl}
              controls
              className="w-full h-auto rounded-md bg-black"
              aria-label={`${title} demo video`}
            />
          ) : (
            <div className="aspect-video w-full rounded-md bg-gray-100 flex items-center justify-center text-gray-500">
              Demo coming soon
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SystemCard({ system, index, onRequestDemo }) {
  const imageLeft = index % 2 === 0;

  return (
    <article className="relative" aria-labelledby={`${system.id}-title`}>
      <div
        className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
          imageLeft ? "" : "lg:[&>.system-image]:order-2"
        }`}
      >
        <figure className="system-image relative">
          <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-slate-50 p-3 shadow-[0_18px_50px_rgba(23,27,58,0.06)] transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(37,99,235,0.08)]">
            <div className="overflow-hidden rounded-xl bg-white">
              <Image
                src={system.image}
                alt={`${system.title} interface preview`}
                width={1200}
                height={800}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                priority={index < 2}
              />
            </div>
          </div>
          <figcaption className="sr-only">
            {system.title} preview image
          </figcaption>

          <div
            className="pointer-events-none absolute -bottom-8 -right-8 -z-10 h-36 w-36 rounded-full bg-blue-600/10 blur-3xl"
            aria-hidden="true"
          />
        </figure>

        <div className="max-w-xl">
          <header>
            <h3
              id={`${system.id}-title`}
              className="text-3xl font-bold leading-snug text-slate-900 sm:text-4xl"
            >
              {system.title}
            </h3>
            <p className="mt-4 text-base leading-7 text-slate-600">
              {system.description}
            </p>
          </header>

          <ul className="mt-6 space-y-4" role="list" aria-label={`${system.title} features`}>
            {system.features.map((f) => (
              <li key={f.title} className="flex gap-4">
                <div className="flex-shrink-0 mt-1 h-3 w-3 rounded-full bg-blue-600 ring-2 ring-white" aria-hidden="true" />
                <div>
                  <h4 className="text-md font-semibold text-slate-900">
                    {f.title}
                  </h4>
                  <p className="mt-1 text-sm text-slate-600">{f.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => onRequestDemo(system)}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-bold text-white shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white"
              aria-expanded="false"
              aria-controls="demo-modal"
            >
              See Short Demo
              <ArrowUpRight size={16} strokeWidth={2.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Systems() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [activeSystem, setActiveSystem] = useState(null);

  const openDemo = (system) => {
    setActiveSystem(system);
    setDemoOpen(true);
  };

  const closeDemo = () => {
    setDemoOpen(false);
    // leave activeSystem in case you want persisted state; optionally clear:
    // setActiveSystem(null);
  };

  return (
    <section
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="systems-heading"
    >
      {/* Decorative background glows (hidden from assistive tech) */}
      <div className="pointer-events-none absolute left-[-200px] top-[16%] h-[480px] w-[480px] rounded-full bg-blue-600/5 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute right-[-200px] top-[55%] h-[480px] w-[480px] rounded-full bg-blue-600/5 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <h2
            id="systems-heading"
            className="text-4xl font-bold leading-[1.02] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
          >
            Simple systems that
            <br />
            actually work
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            No complicated marketing nonsense — just focused tools to help contractors generate leads, build trust, and grow.
          </p>
        </div>

        <div className="mt-12 space-y-20 lg:mt-16 lg:space-y-24">
          {SYSTEMS.map((system, idx) => (
            <SystemCard key={system.id} system={system} index={idx} onRequestDemo={openDemo} />
          ))}
        </div>
      </div>

      <DemoModal
        open={demoOpen}
        onClose={closeDemo}
        title={activeSystem?.title ?? "System"}
        demoUrl={activeSystem?.demoUrl}
      />
    </section>
  );
}