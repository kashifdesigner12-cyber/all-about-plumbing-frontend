"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, MapPin, Phone, Send, CheckCircle, X } from "lucide-react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowSuccess(true);

    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  const avatars = [
    "https://i.pravatar.cc/100?img=12",
    "https://i.pravatar.cc/100?img=32",
    "https://i.pravatar.cc/100?img=47",
    "https://i.pravatar.cc/100?img=56",
  ];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F8FAFC] text-[#171B3A]">
        {/* ==================================================
            CONTACT PAGE
        ================================================== */}

        <section className="px-5 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[1050px]">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
              {/* ==================================================
                  LEFT SIDE
              ================================================== */}

              <div className="lg:pt-3">
                <h1 className="mt-4 text-4xl font-black leading-[1.08] tracking-[-0.045em] text-[#171B3A] sm:text-5xl">
                  Let&apos;s talk about your business.
                </h1>

                <p className="mt-5 max-w-md text-[15px] leading-7 text-[#64748B]">
                  Have a project in mind or need help figuring out what comes
                  next? Send us a message and tell us a little about what
                  you&apos;re working on.
                </p>

                {/* Contact Details */}

                <div className="mt-8 space-y-4">
                  {/* Email */}

                  <div className="group flex items-start gap-3.5 rounded-xl p-2 transition-colors hover:bg-white">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
                      <Mail size={18} />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#64748B]">
                        Email
                      </p>

                      <a
                        href="mailto:hello@stonesystems.io"
                        className="mt-1 block text-sm font-semibold text-[#171B3A] transition-colors hover:text-blue-600"
                      >
                        hello@stonesystems.io
                      </a>
                    </div>
                  </div>

                  {/* Phone */}

                  <div className="group flex items-start gap-3.5 rounded-xl p-2 transition-colors hover:bg-white">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
                      <Phone size={18} />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#64748B]">
                        Phone
                      </p>

                      <button
                        type="button"
                        className="mt-1 text-left text-sm font-semibold text-[#171B3A] transition-colors hover:text-blue-600"
                      >
                        Schedule a call with our team
                      </button>
                    </div>
                  </div>

                  {/* Service Area */}

                  <div className="group flex items-start gap-3.5 rounded-xl p-2 transition-colors hover:bg-white">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
                      <MapPin size={18} />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#64748B]">
                        Service Area
                      </p>

                      <p className="mt-1 text-sm font-semibold leading-6 text-[#171B3A]">
                        Serving businesses across the United States
                      </p>
                    </div>
                  </div>
                </div>

                {/* ==================================================
                    TRUST INDICATOR
                ================================================== */}

                <div className="mt-10 border-t border-slate-200/70 pt-6">
                  <div className="flex items-center gap-4">
                    {/* Real Avatars */}

                    <div className="flex -space-x-2.5">
                      {avatars.map((avatar, index) => (
                        <div
                          key={avatar}
                          className="h-9 w-9 overflow-hidden rounded-full border-2 border-white bg-slate-100 shadow-sm"
                        >
                          <img
                            src={avatar}
                            alt={`Customer ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Trust Text */}

                    <div>
                      <p className="text-sm text-[#64748B]">
                        Trusted by{" "}
                        <span className="font-bold text-[#171B3A]">100+</span>{" "}
                        businesses
                      </p>

                      <div className="mt-0.5 flex items-center gap-2">
                        <span className="text-xs tracking-[0.08em] text-blue-600"></span>

                        <span className="text-xs text-slate-400">
                          Trusted partners
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ==================================================
                  CONTACT FORM
              ================================================== */}

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(23,27,58,0.05)] transition-shadow hover:shadow-[0_8px_40px_rgba(23,27,58,0.08)] sm:p-8">
                <div className="border-b border-slate-100 pb-5">
                  <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-[#171B3A]">
                    Send us a message
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#64748B]">
                    Give us a few details and we&apos;ll get back to you.
                  </p>
                </div>

                <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                  {/* Name */}

                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-bold text-[#26344D]"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Smith"
                      required
                      className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-[#171B3A] outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>

                  {/* Email */}

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-bold text-[#26344D]"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@company.com"
                      required
                      className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-[#171B3A] outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>

                  {/* Phone + Business */}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-bold text-[#26344D]"
                      >
                        Phone Number
                      </label>

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-[#171B3A] outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="business"
                        className="mb-2 block text-sm font-bold text-[#26344D]"
                      >
                        Business Name
                      </label>

                      <input
                        id="business"
                        name="business"
                        type="text"
                        placeholder="Your company"
                        className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-[#171B3A] outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>
                  </div>

                  {/* Service */}

                  <div>
                    <label
                      htmlFor="service"
                      className="mb-2 block text-sm font-bold text-[#26344D]"
                    >
                      What do you need help with?{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <select
                      id="service"
                      name="service"
                      defaultValue=""
                      required
                      className="h-12 w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 pr-10 text-sm text-[#171B3A] outline-none transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                      }}
                    >
                      <option value="" disabled>
                        Select an option
                      </option>

                      <option value="website">Website Development</option>

                      <option value="seo">Local SEO</option>

                      <option value="marketing">Marketing</option>

                      <option value="communication">
                        Customer Communication
                      </option>

                      <option value="other">Something Else</option>
                    </select>
                  </div>

                  {/* Message */}

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-bold text-[#26344D]"
                    >
                      How can we help? <span className="text-red-500">*</span>
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Tell us about your business, what you're trying to improve, and what you'd like help with..."
                      className="min-h-[120px] w-full resize-y rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-[#171B3A] outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>

                  {/* Submit */}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg active:translate-y-0 active:shadow-sm disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="h-5 w-5 animate-spin text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />

                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send
                          size={17}
                          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs leading-5 text-slate-400">
                    We&apos;ll review your message and get back to you as soon
                    as possible.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* ==================================================
          SUCCESS NOTIFICATION
      ================================================== */}

      {showSuccess && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            </div>

            <div className="flex-1">
              <h3 className="font-bold text-emerald-800">
                Message Sent Successfully!
              </h3>

              <p className="mt-1 text-sm leading-5 text-emerald-700">
                Thank you for reaching out. We&apos;ll get back to you within 24
                hours.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowSuccess(false)}
              className="rounded-lg p-1 text-emerald-500 transition-colors hover:bg-emerald-100 hover:text-emerald-700"
              aria-label="Close notification"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
