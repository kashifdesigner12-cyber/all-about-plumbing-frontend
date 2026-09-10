"use client";

import { motion } from "framer-motion";

export default function Partners() {
  const partners = [
    {
      name: "Partner One",
      image: "/images/partners/partner1.png",
    },
    {
      name: "Partner Two",
      image: "/images/partners/partner2.png",
    },
    {
      name: "Partner Three",
      image: "/images/partners/partner3.png",
    },
    {
      name: "Partner Four",
      image: "/images/partners/partner4.png",
    },
    {
      name: "Partner Five",
      image: "/images/partners/partner5.png",
    },
    {
      name: "Partner Six",
      image: "/images/partners/partner6.png",
    },
    {
      name: "Partner Seven",
      image: "/images/partners/partner7.png",
    },
    {
      name: "Partner Eight",
      image: "/images/partners/partner8.png",
    },
  ];

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

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
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
            Trusted Partners
          </p>

          <h2 className="text-4xl font-bold leading-[1.02] tracking-[-0.05em] text-[#171B3A] sm:text-5xl md:text-6xl lg:text-7xl">
            Just so you know
            <br />
            we&apos;re legit,
            <br />
            we partner with...
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#64748B]">
            We work with trusted platforms and partners to help contractors
            grow their business with better systems.
          </p>
        </motion.div>

        {/* =========================================
            MOVING LOGOS
        ========================================== */}

        <div className="relative mt-12 overflow-hidden md:mt-14">
          {/* Left Fade */}

          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent md:w-32" />

          {/* Right Fade */}

          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent md:w-32" />

          <motion.div
            className="flex w-max items-center gap-12 md:gap-16"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...partners, ...partners].map((partner, index) => (
              <motion.div
                key={`${partner.name}-${index}`}
                whileHover={{
                  scale: 1.06,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="
                  flex
                  h-20
                  min-w-[150px]
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-[#E2E8F0]
                  bg-white
                  px-6
                  shadow-[0_10px_30px_rgba(23,27,58,0.05)]
                  transition-all
                  duration-300
                  hover:border-blue-200
                  hover:shadow-[0_15px_40px_rgba(37,99,235,0.10)]
                "
              >
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="
                    max-h-10
                    w-auto
                    max-w-[120px]
                    object-contain
                    grayscale
                    opacity-60
                    transition
                    duration-300
                    hover:grayscale-0
                    hover:opacity-100
                  "
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}