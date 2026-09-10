"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      question: "When am I going to start seeing results?",
      answer:
        "This completely depends on your advertising, how long you have been in business, the quality of your work, and how consistently you use the system. Stone Systems helps you build a strong online foundation to attract and convert more leads.",
    },
    {
      question: "How does Stone Systems help me grow my business?",
      answer:
        "We help you grow by improving your online presence, building a professional website, helping you collect more reviews, following up with leads instantly, and creating simple marketing systems.",
    },
    {
      question: "Do I need technical knowledge to use the system?",
      answer:
        "No. Everything is designed to be simple. You don't need coding or marketing experience to use your website and marketing tools.",
    },
    {
      question: "Will this work for my type of business?",
      answer:
        "Our systems are built for contractors and home service businesses including landscaping, remodeling, roofing, HVAC, plumbing, electrical, and many more.",
    },
    {
      question: "Do I need to sign a long-term contract?",
      answer:
        "No. Our goal is to provide value and build a long-term partnership without complicated contracts.",
    },
  ];

  const [open, setOpen] = useState(null);

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-24">
      {/* =========================================
          BACKGROUND GLOW
      ========================================== */}

      <div className="pointer-events-none absolute left-[-220px] top-20 h-[450px] w-[450px] rounded-full bg-blue-600/[0.04] blur-[140px]" />

      <div className="pointer-events-none absolute bottom-[-200px] right-[-220px] h-[450px] w-[450px] rounded-full bg-blue-600/[0.04] blur-[140px]" />

      {/* =========================================
          MAIN CONTAINER
      ========================================== */}

      <div className="relative mx-auto max-w-[1000px] px-6 lg:px-12">
        {/* =========================================
            HEADING
        ========================================== */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Frequently Asked Questions
          </p>

          <h2 className="text-4xl font-bold leading-[1.02] tracking-[-0.05em] text-[#171B3A] sm:text-5xl md:text-6xl lg:text-7xl">
            Got questions?
            <br />
            We have answers.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#64748B]">
            Everything you need to know about Stone Systems and how we help
            contractors grow their business.
          </p>
        </motion.div>

        {/* =========================================
            FAQ LIST
        ========================================== */}

        <div className="mt-12 space-y-4 md:mt-14">
          {faqs.map((faq, index) => {
            const isOpen = open === index;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                }}
                className={`
                  overflow-hidden
                  rounded-xl
                  border
                  bg-white
                  transition-all
                  duration-300
                  ${
                    isOpen
                      ? "border-blue-200 shadow-[0_15px_40px_rgba(37,99,235,0.08)]"
                      : "border-[#E2E8F0] shadow-sm hover:border-blue-200 hover:shadow-[0_12px_35px_rgba(23,27,58,0.06)]"
                  }
                `}
              >
                {/* Question */}

                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-7 sm:py-6"
                >
                  <span className="text-base font-bold leading-7 text-[#171B3A] sm:text-lg">
                    {faq.question}
                  </span>

                  {/* Icon */}

                  <span
                    className={`
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      transition-all
                      duration-300
                      ${
                        isOpen
                          ? "bg-blue-600 text-white"
                          : "bg-blue-600/10 text-blue-600"
                      }
                    `}
                  >
                    {isOpen ? (
                      <Minus size={18} strokeWidth={2.5} />
                    ) : (
                      <Plus size={18} strokeWidth={2.5} />
                    )}
                  </span>
                </button>

                {/* Answer */}

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="border-t border-[#E2E8F0] px-5 pb-6 pt-5 sm:px-7">
                        <p className="max-w-3xl text-base leading-7 text-[#64748B]">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}