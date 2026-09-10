"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#171B3A]">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-40 top-0 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[140px]" />

      {/* Main Container */}
      <div className="relative mx-auto max-w-[1400px] px-6 py-16 lg:px-12 lg:py-20">
        {/* Top Footer */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center"
        >
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <img
              src="/images/logo.png"
              alt="Stone Systems"
              className="h-auto w-[200px] object-contain"
            />
          </Link>

          {/* CTA */}
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center md:gap-8">
            <span className="text-xl font-medium text-white md:text-2xl">
              Ready to get started?
            </span>

            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-blue-600 px-7 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 md:px-8"
            >
              Book A Call
            </Link>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="my-12 h-px bg-white/10 md:my-14" />

        {/* Footer Content */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* CTA Column */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-blue-400">
              Get Started
            </p>

            <h3 className="max-w-[280px] text-3xl font-bold leading-[1.2] tracking-[-0.03em] text-white">
              Want to learn more about how we can help?
            </h3>

            <Link
              href="/contact"
              className="mt-7 inline-flex h-12 items-center justify-center rounded-xl bg-blue-600 px-7 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20"
            >
              Book A Call
            </Link>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <h4 className="mb-6 text-lg font-bold text-white">Links</h4>

            <div className="space-y-4 text-sm text-gray-300">
              <Link
                href="/pricing"
                className="block transition-colors duration-200 hover:text-blue-400"
              >
                Pricing
              </Link>

              <Link
                href="/testimonials"
                className="block transition-colors duration-200 hover:text-blue-400"
              >
                Testimonials
              </Link>

              <Link
                href="/our-work"
                className="block transition-colors duration-200 hover:text-blue-400"
              >
                Our Work
              </Link>

              <Link
                href="/press"
                className="block transition-colors duration-200 hover:text-blue-400"
              >
                Press
              </Link>

              <Link
                href="/login"
                className="block transition-colors duration-200 hover:text-blue-400"
              >
                Log in
              </Link>
            </div>
          </motion.div>

          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h4 className="mb-6 text-lg font-bold text-white">About</h4>

            <div className="space-y-4 text-sm text-gray-300">
              <Link
                href="/process"
                className="block transition-colors duration-200 hover:text-blue-400"
              >
                Our Process
              </Link>

              <Link
                href="/trades"
                className="block transition-colors duration-200 hover:text-blue-400"
              >
                Trades We Serve
              </Link>

              <Link
                href="/careers"
                className="block transition-colors duration-200 hover:text-blue-400"
              >
                Careers
              </Link>

              <Link
                href="/partners"
                className="block transition-colors duration-200 hover:text-blue-400"
              >
                Partners
              </Link>

              <Link
                href="/contact"
                className="block transition-colors duration-200 hover:text-blue-400"
              >
                Contact
              </Link>
            </div>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <h4 className="mb-6 text-lg font-bold text-white">Products</h4>

            <div className="grid gap-x-10 gap-y-4 text-sm text-gray-300 sm:grid-cols-2">
              <Link
                href="/products/functional-website"
                className="transition-colors duration-200 hover:text-blue-400"
              >
                Functional Website
              </Link>

              <Link
                href="/products/automated-lead-follow-up"
                className="transition-colors duration-200 hover:text-blue-400"
              >
                Automated Lead Follow Up
              </Link>

              <Link
                href="/products/missed-call-text-back"
                className="transition-colors duration-200 hover:text-blue-400"
              >
                Missed Call Text Back
              </Link>

              <Link
                href="/products/marketing-campaigns"
                className="transition-colors duration-200 hover:text-blue-400"
              >
                One-Click Marketing Campaigns
              </Link>

              <Link
                href="/products/5-star-magic-funnel"
                className="transition-colors duration-200 hover:text-blue-400"
              >
                5 Star Magic Funnel
              </Link>

              <Link
                href="/products/all-in-one-inbox"
                className="transition-colors duration-200 hover:text-blue-400"
              >
                All-In-One Inbox
              </Link>

              <Link
                href="/products/printing-services"
                className="transition-colors duration-200 hover:text-blue-400"
              >
                Printing Services
              </Link>

              <Link
                href="/products/business-phone"
                className="transition-colors duration-200 hover:text-blue-400"
              >
                Business Phone
              </Link>

              <Link
                href="/products/local-seo"
                className="transition-colors duration-200 hover:text-blue-400"
              >
                Local SEO
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-14 border-t border-white/10 pt-7 md:mt-16">
          <div className="flex flex-col justify-between gap-4 text-sm text-gray-400 md:flex-row md:items-center">
            <p>© 2026 Stone Systems. All rights reserved.</p>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Link
                href="/privacy-policy"
                className="transition-colors duration-200 hover:text-white"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="transition-colors duration-200 hover:text-white"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
