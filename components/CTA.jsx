"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1200px]">
        {/* ==================================================
            MAIN CTA
        ================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl bg-[#171B3A] px-6 py-12 shadow-[0_25px_70px_rgba(23,27,58,0.12)] sm:px-10 md:px-14 md:py-16"
        >
          {/* ==================================================
              BACKGROUND GLOW
          ================================================== */}
          <div
            className="pointer-events-none absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-[120px]"
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-[120px]"
            aria-hidden="true"
          />

          {/* ==================================================
              CONTENT
          ================================================== */}
          <div className="relative z-10 grid items-center gap-10 md:grid-cols-2 md:gap-14">
            {/* ==================================================
                LEFT CONTENT
            ================================================== */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              {/* Heading */}
              <h2 className="text-4xl font-bold leading-[1.02] tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">
                Ready to grow
                <br />
                your business?
              </h2>

              {/* Description */}
              <p className="mt-6 max-w-lg text-base leading-7 text-gray-300 sm:text-lg sm:leading-8">
                Build a stronger online presence, generate more leads, and
                create a system that helps your contracting business grow.
              </p>

              {/* Button */}
              <Link
                href="/about/contact"
                className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20"
              >
                Get Started
                <ArrowUpRight size={18} strokeWidth={2.5} />
              </Link>
            </motion.div>

            {/* ==================================================
                RIGHT IMAGE
            ================================================== */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative flex min-h-[280px] items-end justify-center md:min-h-[320px]"
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
                className="relative z-10 mx-auto h-auto w-[250px] max-w-full object-contain transition duration-500 sm:w-[280px] md:w-[300px] lg:w-[320px]"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
