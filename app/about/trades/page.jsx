"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { ArrowRight } from "lucide-react";

export default function TradesPage() {
  const trades = [
    {
      title: "Landscapers",
      image:
        "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Remodeling",
      image:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Pressure Washer",
      image:
        "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Dog Groomers",
      image:
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Moving Companies",
      image:
        "https://plus.unsplash.com/premium_photo-1661409078904-42334551db0c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TW92aW5nJTIwQ29tcGFuaWVzfGVufDB8fDB8fHww",
    },
    {
      title: "Floor & Carpet Cleaning",
      image:
        "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Roofing",
      image:
        "https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "HVAC",
      image:
        "https://plus.unsplash.com/premium_photo-1683134512538-7b390d0adc9e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8SFZBQ3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      title: "Plumbing",
      image:
        "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Electrician",
      image:
        "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Handyman",
      image:
        "https://plus.unsplash.com/premium_photo-1682597000831-5b3496f9246d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fEhhbmR5bWFufGVufDB8fDB8fHww",
    },
    {
      title: "Painters",
      image:
        "https://images.unsplash.com/photo-1717281234297-3def5ae3eee1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8UGFpbnRlcnN8ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "Decks & Patios",
      image:
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Siding",
      image:
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Pool Construction",
      image:
        "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Paving",
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Hardscaping",
      image:
        "https://images.unsplash.com/photo-1558521958-0a228e77e984?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Windows & Doors",
      image:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "General Contractors",
      image:
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Pest Control",
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Tree Service",
      image:
        "https://images.unsplash.com/photo-1531835551805-16d864c8d311?auto=format&fit=crop&w=900&q=80",
    },
  ];

  const categories = [
    "Additions & Remodeling",
    "Air Conditioning",
    "Appliances",
    "Appraiser",
    "Architects & Engineers",
    "Art & Mirror Mounting",
    "Audio/Visual & Computers",
    "Awnings",
    "Brick & Stone",
    "Cabinets",
    "Carpenters",
    "Carpet & Upholstery Cleaning",
    "Ceilings",
    "Central Vacuum",
    "Cleaning & Maid Services",
    "Commercial Contractors",
    "Concrete",
    "Construction",
    "Countertops",
    "Decks",
    "Demolition Service",
    "Designers & Decorators",
    "Disability Services",
    "Disaster Recovery Services",
    "Docks",
    "Doors",
    "Drywall & Plaster",
    "Electrical",
    "Excavation",
    "Fans",
    "Fences",
    "Fireplace & Wood Stoves",
    "Sports Equipment Assembly",
    "Flooring & Carpet",
    "Foundations",
    "Fountains & Ponds",
    "Furniture Assembly",
    "Furniture Repair & Refinish",
    "Garage & Garage Doors",
    "General Contractors",
    "Glass & Mirrors",
    "Gutters",
    "Handyman Services",
    "Heating & Furnace Systems",
    "Home Inspection",
    "Home Maintenance",
    "Home Services",
    "Hot Tubs, Spas & Saunas",
    "Household Help",
    "HVAC",
    "Insulation",
    "Landscaping",
    "Lawn & Garden Care",
    "Lifting & Moving Heavy Items",
    "Locksmith",
    "Metal Fabrication",
    "Mold & Asbestos Services",
    "Moving",
    "New Home Builders",
    "Organizers",
    "Outdoor Playgrounds",
    "Packing & Unpacking Services",
    "Painting",
    "Paving",
    "Permit Services",
    "Pest Control",
    "Plumbing",
    "Powdercoating",
    "Remodeling",
    "Roofing",
    "Sandblasting Service",
    "Septic Tanks & Wells",
    "Sheds & Enclosures",
    "Siding",
    "Sign Making Service",
    "Skylights",
    "Snow Removal Service",
    "Solar",
    "Stained Glass",
    "Swimming Pools",
    "Tennis or Game Court",
    "Tile",
    "Tree Service",
    "Wall Coverings",
    "Waste Material Removal",
    "Water Treatment System",
    "Waterproofing",
    "Window Coverings",
    "Windows",
    "Yard & Garden Work",
  ];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F5F6F8] text-[#171B3A]">
        {/* ==================================================
            HERO
        ================================================== */}
        <section className="relative overflow-hidden bg-[#EEF4FF]">
          <div
            className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-200/40 blur-3xl"
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute -bottom-48 -left-32 h-[450px] w-[450px] rounded-full bg-blue-100/60 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
            <div className="mx-auto max-w-[900px] text-center">
              <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                Serving businesses that{" "}
                <span className="text-blue-600">keep things moving.</span>
              </h1>

              <p className="mx-auto mt-6 max-w-[700px] text-base leading-7 text-[#64748B] sm:text-lg sm:leading-8">
                From contractors and home service companies to specialized local
                businesses, we build digital systems that help you get found,
                build trust, and generate more customers.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  Book A Call
                  <ArrowRight size={17} />
                </Link>

                <a
                  href="#featured-trades"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-blue-200 bg-white px-7 text-sm font-bold text-[#171B3A] transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-600"
                >
                  Explore Trades
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            FEATURED TRADES
        ================================================== */}
        <section
          id="featured-trades"
          className="bg-[#F5F6F8] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
        >
          <div className="mx-auto max-w-[1250px]">
            <div className="mx-auto max-w-[800px] text-center">
              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                Serving all these trades and more...
              </h2>

              <p className="mt-4 text-sm leading-6 text-[#64748B] sm:text-base sm:leading-7">
                We work with businesses across the trades and home services
                industry.
              </p>
            </div>

            {/* TRADE CARDS */}
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
              {trades.map((trade) => (
                <div
                  key={trade.title}
                  className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                >
                  {/* IMAGE */}
                  <div className="h-[145px] overflow-hidden sm:h-[165px] lg:h-[180px]">
                    <img
                      src={trade.image}
                      alt={`${trade.title} services`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* NAME */}
                  <div className="flex min-h-[58px] items-center justify-center px-4 py-4">
                    <h3 className="text-center text-sm font-black text-[#171B3A] sm:text-base">
                      {trade.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================
            CATEGORY SECTION
        ================================================== */}
        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-black tracking-[-0.04em] text-[#171B3A] sm:text-4xl lg:text-5xl">
                All Trades by Category
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#64748B] sm:text-base">
                Our system is built to support a wide range of local service
                businesses and specialized trades.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-6xl rounded-3xl border border-slate-200 bg-[#F8FAFC] p-5 shadow-[0_10px_40px_rgba(15,23,42,0.04)] sm:p-8 lg:p-10">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {categories.map((category) => (
                  <div
                    key={category}
                    className="group flex min-h-[54px] items-center gap-3 rounded-xl border border-transparent bg-white px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-100 hover:bg-blue-50/50 hover:shadow-sm"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-50 transition-colors duration-200 group-hover:border-blue-500 group-hover:bg-blue-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 transition-colors duration-200 group-hover:bg-white" />
                    </span>

                    <span className="text-xs font-medium leading-5 text-[#475569] transition-colors duration-200 group-hover:text-blue-600 sm:text-sm">
                      {category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            WHY US
        ================================================== */}
        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
              {/* LEFT */}
              <div>
                <h2 className="max-w-xl text-3xl font-black leading-[1.1] tracking-[-0.04em] text-[#171B3A] sm:text-4xl lg:text-5xl">
                  Your business is local.
                  <span className="mt-1 block text-blue-600">
                    Your digital system should be too.
                  </span>
                </h2>

                <p className="mt-6 max-w-xl text-sm leading-7 text-[#64748B] sm:text-base sm:leading-8">
                  Customers are searching for your services every day. Your
                  website and marketing system should make it easy for them to
                  find you, understand what you offer, and take the next step.
                </p>

                <Link
                  href="/contact"
                  className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 text-sm font-bold text-white shadow-md shadow-blue-600/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  Grow Your Business
                  <ArrowRight size={17} />
                </Link>
              </div>

              {/* RIGHT */}
              <div className="border-l border-slate-200 pl-0 lg:pl-12">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
                  What We Build
                </p>

                <h3 className="mt-3 text-2xl font-bold tracking-tight text-[#171B3A] sm:text-3xl">
                  Everything your business needs online.
                </h3>

                <div className="mt-7 divide-y divide-slate-200 border-y border-slate-200">
                  {[
                    "Professional websites",
                    "Lead generation systems",
                    "Local search visibility",
                    "Customer communication",
                    "Marketing systems",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="group flex items-center justify-between py-4"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-bold text-slate-300">
                          0{index + 1}
                        </span>

                        <span className="text-sm font-semibold text-[#475569] transition-colors duration-200 group-hover:text-blue-600 sm:text-base">
                          {item}
                        </span>
                      </div>

                      <ArrowRight
                        size={16}
                        className="text-slate-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-blue-600"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            CTA
        ================================================== */}
        <section className="bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[1200px]">
            <div className="relative overflow-hidden rounded-3xl bg-[#171B3A] px-7 py-14 text-center sm:px-12 sm:py-16 lg:px-20 lg:py-20">
              <div
                className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl"
                aria-hidden="true"
              />

              <div
                className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl"
                aria-hidden="true"
              />

              <div className="relative mx-auto max-w-[800px]">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-400 sm:text-sm">
                  Ready to grow?
                </p>

                <h2 className="mt-4 text-3xl font-black leading-tight tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                  Let's build a better system for your business.
                </h2>

                <p className="mx-auto mt-5 max-w-[620px] text-sm leading-7 text-slate-300 sm:text-base">
                  See how we can help your business get found, look
                  professional, and turn more visitors into customers.
                </p>

                <Link
                  href="/contact"
                  className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700"
                >
                  Book A Call
                  <ArrowRight size={17} />
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
