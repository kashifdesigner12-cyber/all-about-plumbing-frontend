"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ==================================================
   TRADES DATA (Moved outside to prevent re-creation)
================================================== */
const trades = [
  { title: "Landscapers", image: "/images/trades/landscapers.jpg" },
  { title: "Remodeling", image: "/images/trades/remodeling.jpg" },
  { title: "Pressure Washer", image: "/images/trades/pressure-washer.jpg" },
  { title: "Dog Groomers", image: "/images/trades/dog-groomers.jpg" },
  { title: "Moving Companies", image: "/images/trades/moving.jpg" },
  { title: "Floor & Carpet Cleaning", image: "/images/trades/floor-cleaning.jpg" },
  { title: "Roofing", image: "/images/trades/roofing.jpg" },
  { title: "HVAC", image: "/images/trades/hvac.jpg" },
  { title: "Plumbing", image: "/images/trades/plumbing.jpg" },
  { title: "Electrician", image: "/images/trades/electrician.jpg" },
  { title: "Handyman", image: "/images/trades/handyman.jpg" },
  { title: "Painters", image: "/images/trades/painters.jpg" },
];

export default function Trades() {
  const sliderRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  /* ==================================================
     SLIDER LOGIC
  ================================================== */
  const moveSlider = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Get the first card to calculate dynamic width
    const card = slider.firstElementChild;
    if (!card) return;

    const gap = 16; // 1rem (Tailwind gap-4)
    const amount = card.offsetWidth + gap;
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    if (maxScroll <= 0) return;

    let next = slider.scrollLeft + direction * amount;

    // Wrap around logic
    if (next >= maxScroll + (amount / 2)) {
      next = 0;
    } else if (next < 0) {
      next = maxScroll;
    }

    slider.scrollTo({
      left: next,
      behavior: "smooth",
    });
  };

  // Auto-scroll Effect
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      moveSlider(1);
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section 
      className="relative overflow-hidden bg-white py-24 lg:py-32"
      aria-labelledby="trades-heading"
    >
      
      {/* ==================================================
         BACKGROUND GLOWS
      ================================================== */}
      <div 
        className="pointer-events-none absolute left-[-220px] top-20 h-[450px] w-[450px] rounded-full bg-blue-600/[0.04] blur-[140px]" 
        aria-hidden="true" 
      />
      <div 
        className="pointer-events-none absolute bottom-0 right-[-220px] h-[450px] w-[450px] rounded-full bg-blue-600/[0.04] blur-[140px]" 
        aria-hidden="true" 
      />

      {/* ==================================================
         MAIN CONTAINER
      ================================================== */}
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        
        {/* ==================================================
            HEADER & CONTROLS
        ================================================== */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-3xl">
            {/* <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Trades We Serve
            </p> */}
            <h2 
              id="trades-heading"
              className="text-4xl font-bold leading-[1.02] tracking-[-0.05em] text-[#171B3A] sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Serving all these
              <br />
              trades and more...
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#64748B]">
              We work with contractors and local service businesses across
              many industries.
            </p>
          </div>

          {/* Slider Controls */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => moveSlider(-1)}
              aria-label="Previous trades"
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-[#171B3A] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-600/20 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              <ChevronLeft size={20} strokeWidth={2.5} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => moveSlider(1)}
              aria-label="Next trades"
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-[#171B3A] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-600/20 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              <ChevronRight size={20} strokeWidth={2.5} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* ==================================================
            TRADES SLIDER
        ================================================== */}
        <div
          className="mt-12 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}     // Pause when navigating via keyboard
          onBlur={() => setIsPaused(false)}
          role="region"
          aria-label="Trades carousel"
        >
          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {trades.map((trade) => (
              <div
                key={trade.title}
                className="group min-w-[280px] overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_15px_45px_rgba(23,27,58,0.07)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(37,99,235,0.12)] sm:min-w-[300px]"
              >
                {/* Image */}
                <div className="relative aspect-[1.3] overflow-hidden bg-gray-100">
                  <Image
                    src={trade.image}
                    alt={`${trade.title} industry`}
                    fill
                    sizes="(max-width: 640px) 280px, 300px"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  {/* Image Overlay */}
                  <div 
                    className="absolute inset-0 bg-[#171B3A]/20 transition duration-500 group-hover:bg-[#171B3A]/10" 
                    aria-hidden="true" 
                  />
                </div>

                {/* Title */}
                <div className="flex h-20 items-center justify-center bg-[#171B3A] px-6">
                  <h3 className="text-center text-lg font-bold text-white">
                    {trade.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==================================================
            BOTTOM BUTTON
        ================================================== */}
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-blue-600 px-7 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            See All Trades We Work With
          </button>
        </div>
      </div>
    </section>
  );
}