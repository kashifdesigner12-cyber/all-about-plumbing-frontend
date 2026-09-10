"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ChevronDown,
  Menu,
  X,
  Monitor,
  PhoneCall,
  Printer,
  Inbox,
  Smartphone,
  Search,
  Star,
  FileChartColumn,
  ClipboardClock,
  Users,
  TrendingUp,
  Wrench,
  BriefcaseBusiness,
  Handshake,
  Mail,
  ArrowUpRight,
} from "lucide-react";

/* ==================================================
   CONSTANTS
================================================== */

const NAV_CONFIG = {
  headerHeight: 82,
  desktopBreakpoint: 1024,
  closeDelay: 220,
};

/* ==================================================
   PRODUCTS
================================================== */

const products = [
  {
    title: "Functional Website",
    description: "Get a lead-generating website in just days",
    href: "/products/functional-website",
    icon: Monitor,
  },
  {
    title: "Missed Call Text Back",
    description: "Automatically text back missed calls",
    href: "/products/missed-call-text-back",
    icon: PhoneCall,
  },
  {
    title: "Printing Services",
    description: "Put your business out there both on and offline",
    href: "/products/printing-services",
    icon: Printer,
  },
  {
    title: "All-In-One Inbox",
    description: "Get all your messages in one place",
    href: "/products/all-in-one-inbox",
    icon: Inbox,
  },
  {
    title: "Business Phone",
    description: "Separate business and personal",
    href: "/products/business-phone",
    icon: Smartphone,
  },
  {
    title: "Local SEO",
    description: "Actually get found on Google",
    href: "/products/local-seo",
    icon: Search,
  },
  {
    title: "5-Star Magic Review Funnel",
    description: "Get more 5 star reviews and prevent bad ones",
    href: "/products/review-funnel",
    icon: Star,
    fill: true,
  },
  {
    title: "One-Click Marketing Campaigns",
    description: "Keep your customers thinking about you",
    href: "/products/marketing-campaigns",
    icon: FileChartColumn,
  },
  {
    title: "Automated Lead Follow Up",
    description: "Automatically follow up with leads via text",
    href: "/products/automated-lead-follow-up",
    icon: ClipboardClock,
  },
];

/* ==================================================
   ABOUT
================================================== */

const aboutItems = [
  {
    title: "About Us",
    description: "Get to know Stone Systems",
    href: "/about",
    icon: Users,
  },
  {
    title: "Our Process",
    description: "Discover how we work",
    href: "/about/process",
    icon: TrendingUp,
  },
  {
    title: "Trades We Serve",
    description: "Who we work with",
    href: "/about/trades",
    icon: Wrench,
  },
  {
    title: "Careers",
    description: "Join the team",
    href: "/about/careers",
    icon: BriefcaseBusiness,
  },
  {
    title: "Partners",
    description: "Meet our partners",
    href: "/about/partners",
    icon: Handshake,
  },
  {
    title: "Contact",
    description: "Let's talk about your business",
    href: "/about/contact",
    icon: Mail,
  },
];

/* ==================================================
   NAV LINKS
================================================== */

const navLinks = [
  {
    title: "Pricing",
    href: "/pricing",
  },
  {
    title: "Testimonials",
    href: "/testimonials",
  },
  {
    title: "Our Work",
    href: "/our-work",
  },
  {
    title: "Press",
    href: "/press",
  },
];

/* ==================================================
   PRODUCT CARD
================================================== */

const ProductCard = ({ product, onClose }) => {
  const Icon = product.icon;

  return (
    <li>
      <Link
        href={product.href}
        onClick={onClose}
        className="group flex min-h-[88px] gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-blue-50"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-all duration-200 group-hover:bg-blue-600 group-hover:text-white">
          <Icon
            size={23}
            strokeWidth={1.9}
            fill={product.fill ? "currentColor" : "none"}
          />
        </div>

        <div className="min-w-0 pt-0.5">
          <div className="flex items-start gap-1">
            <h4 className="text-[15px] font-bold leading-5 text-[#171B3A] transition-colors duration-200 group-hover:text-blue-600">
              {product.title}
            </h4>

            <ArrowUpRight
              size={14}
              className="mt-0.5 shrink-0 text-transparent transition-all duration-200 group-hover:text-blue-600"
            />
          </div>

          <p className="mt-1.5 text-[13px] leading-5 text-[#64748B]">
            {product.description}
          </p>
        </div>
      </Link>
    </li>
  );
};

/* ==================================================
   ABOUT CARD
================================================== */

const AboutCard = ({ item, onClose }) => {
  const Icon = item.icon;

  return (
    <li>
      <Link
        href={item.href}
        onClick={onClose}
        className="group flex min-h-[82px] gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-blue-50"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-all duration-200 group-hover:bg-blue-600 group-hover:text-white">
          <Icon size={19} strokeWidth={1.9} />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1">
            <h4 className="text-[14px] font-bold text-[#171B3A] transition-colors duration-200 group-hover:text-blue-600">
              {item.title}
            </h4>

            <ArrowUpRight
              size={13}
              className="text-transparent transition-all duration-200 group-hover:text-blue-600"
            />
          </div>

          <p className="mt-1 text-[12px] leading-5 text-[#64748B]">
            {item.description}
          </p>
        </div>
      </Link>
    </li>
  );
};

/* ==================================================
   MOBILE LINK
================================================== */

const MobileLink = ({
  href,
  title,
  onClose,
  icon: Icon,
  showIcon = false,
}) => {
  return (
    <li>
      <Link
        href={href}
        onClick={onClose}
        className="flex items-center gap-3 border-b border-slate-100 py-4 text-[15px] font-semibold text-[#26344D] transition-colors duration-200 hover:text-blue-600"
      >
        {showIcon && Icon && (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Icon size={17} strokeWidth={1.9} />
          </span>
        )}

        <span>{title}</span>

        <ArrowUpRight
          size={15}
          className="ml-auto text-slate-300"
        />
      </Link>
    </li>
  );
};

/* ==================================================
   MAIN HEADER
================================================== */

export default function Header() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const productsTimeout = useRef(null);
  const aboutTimeout = useRef(null);

  /* ==================================================
     SCROLL EFFECT
  ================================================== */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ==================================================
     CLEAR TIMEOUTS
  ================================================== */

  const clearTimeouts = useCallback(() => {
    if (productsTimeout.current) {
      clearTimeout(productsTimeout.current);
      productsTimeout.current = null;
    }

    if (aboutTimeout.current) {
      clearTimeout(aboutTimeout.current);
      aboutTimeout.current = null;
    }
  }, []);

  /* ==================================================
     CLOSE ALL MENUS
  ================================================== */

  const closeAllMenus = useCallback(() => {
    setMobileOpen(false);
    setProductsOpen(false);
    setAboutOpen(false);
    clearTimeouts();
  }, [clearTimeouts]);

  /* ==================================================
     ROUTE CHANGE
  ================================================== */

  useEffect(() => {
    closeAllMenus();
  }, [pathname, closeAllMenus]);

  /* ==================================================
     RESIZE
  ================================================== */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= NAV_CONFIG.desktopBreakpoint) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* ==================================================
     BODY SCROLL
  ================================================== */

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* ==================================================
     DESKTOP PRODUCTS
  ================================================== */

  const openProducts = useCallback(() => {
    clearTimeouts();
    setProductsOpen(true);
    setAboutOpen(false);
  }, [clearTimeouts]);

  const closeProducts = useCallback(() => {
    clearTimeouts();

    productsTimeout.current = setTimeout(() => {
      setProductsOpen(false);
    }, NAV_CONFIG.closeDelay);
  }, [clearTimeouts]);

  /* ==================================================
     DESKTOP ABOUT
  ================================================== */

  const openAbout = useCallback(() => {
    clearTimeouts();
    setAboutOpen(true);
    setProductsOpen(false);
  }, [clearTimeouts]);

  const closeAbout = useCallback(() => {
    clearTimeouts();

    aboutTimeout.current = setTimeout(() => {
      setAboutOpen(false);
    }, NAV_CONFIG.closeDelay);
  }, [clearTimeouts]);

  /* ==================================================
     MOBILE TOGGLE
  ================================================== */

  const toggleMobile = () => {
    clearTimeouts();

    setMobileOpen((prev) => {
      const next = !prev;

      if (!next) {
        setProductsOpen(false);
        setAboutOpen(false);
      }

      return next;
    });
  };

  /* ==================================================
     ACTIVE LINK
  ================================================== */

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname?.startsWith(href);
  };

  /* ==================================================
     NAV CLASSES
  ================================================== */

  const getNavLinkClass = (href) => {
    const base =
      "flex h-11 items-center rounded-xl px-4 text-[14px] font-semibold transition-colors duration-200";

    if (isActive(href)) {
      return `${base} bg-blue-50 text-blue-600`;
    }

    return `${base} text-[#26344D] hover:bg-slate-50 hover:text-blue-600`;
  };

  const getDropdownButtonClass = (isOpen) => {
    const base =
      "flex h-11 items-center gap-1.5 rounded-xl px-4 text-[14px] font-semibold transition-colors duration-200";

    if (isOpen) {
      return `${base} bg-blue-50 text-blue-600`;
    }

    return `${base} text-[#26344D] hover:bg-slate-50 hover:text-blue-600`;
  };

  /* ==================================================
     RENDER
  ================================================== */

  return (
    <>
      {/* ==================================================
          HEADER
      ================================================== */}

      <header
        className={`fixed left-0 right-0 top-0 z-[1000] w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl"
            : "border-b border-slate-200/50 bg-white/80 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-[82px] max-w-[1500px] items-center justify-between px-5 sm:px-6 lg:px-10">

          {/* ==================================================
              LOGO
          ================================================== */}

          <Link
            href="/"
            onClick={closeAllMenus}
            className="group flex shrink-0 items-center"
            aria-label="Stone Systems Home"
          >
            <img
              src="/images/logo2.png"
              alt="Stone Systems"
              className="h-[50px] w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02] sm:h-[54px] lg:h-[58px]"
            />
          </Link>

          {/* ==================================================
              DESKTOP NAV
          ================================================== */}

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Main Navigation"
          >
            {/* PRODUCTS */}

            <div
              className="relative"
              onMouseEnter={openProducts}
              onMouseLeave={closeProducts}
            >
              <button
                type="button"
                onClick={() => {
                  if (productsOpen) {
                    setProductsOpen(false);
                  } else {
                    openProducts();
                  }
                }}
                aria-expanded={productsOpen}
                aria-haspopup="true"
                className={getDropdownButtonClass(productsOpen)}
              >
                Products

                <ChevronDown
                  size={15}
                  strokeWidth={2.2}
                  className={`transition-transform duration-200 ${
                    productsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {productsOpen && (
                <div
                  className="fixed left-1/2 top-[82px] z-[999] w-[calc(100vw-32px)] max-w-[1420px] -translate-x-1/2 pt-3"
                  onMouseEnter={openProducts}
                  onMouseLeave={closeProducts}
                >
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_70px_rgba(23,27,58,0.15)]">

                    <div className="flex items-end justify-between border-b border-slate-200 px-7 py-6">
                      <div>
                        <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600">
                          Products & Services
                        </p>

                        <h3 className="text-[23px] font-bold tracking-[-0.035em] text-[#171B3A]">
                          Tools built for business growth
                        </h3>
                      </div>

                      <p className="hidden max-w-xs text-right text-sm leading-6 text-[#64748B] md:block">
                        Everything you need to attract customers, follow up
                        with leads, and grow.
                      </p>
                    </div>

                    <ul className="grid grid-cols-3 gap-x-3 gap-y-2 p-5">
                      {products.map((product) => (
                        <ProductCard
                          key={product.href}
                          product={product}
                          onClose={closeAllMenus}
                        />
                      ))}
                    </ul>

                    <div className="border-t border-slate-200 bg-slate-50 px-7 py-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-[#64748B]">
                          Not sure which solution is right for you?
                        </p>

                        <Link
                          href="/about/contact"
                          onClick={closeAllMenus}
                          className="text-sm font-bold text-blue-600 hover:text-blue-700"
                        >
                          Talk to our team →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* STANDARD LINKS */}

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeAllMenus}
                className={getNavLinkClass(link.href)}
              >
                {link.title}
              </Link>
            ))}

            {/* ABOUT */}

            <div
              className="relative"
              onMouseEnter={openAbout}
              onMouseLeave={closeAbout}
            >
              <button
                type="button"
                onClick={() => {
                  if (aboutOpen) {
                    setAboutOpen(false);
                  } else {
                    openAbout();
                  }
                }}
                aria-expanded={aboutOpen}
                aria-haspopup="true"
                className={getDropdownButtonClass(aboutOpen)}
              >
                About

                <ChevronDown
                  size={15}
                  strokeWidth={2.2}
                  className={`transition-transform duration-200 ${
                    aboutOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {aboutOpen && (
                <div
                  className="absolute right-0 top-full z-[999] w-[650px] pt-3"
                  onMouseEnter={openAbout}
                  onMouseLeave={closeAbout}
                >
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_70px_rgba(23,27,58,0.15)]">

                    <div className="border-b border-slate-200 px-6 py-5">
                      <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600">
                        Company
                      </p>

                      <h3 className="text-[23px] font-bold tracking-[-0.035em] text-[#171B3A]">
                        Get to know Stone Systems
                      </h3>
                    </div>

                    <ul className="grid grid-cols-2 gap-2 p-4">
                      {aboutItems.map((item) => (
                        <AboutCard
                          key={item.href}
                          item={item}
                          onClose={closeAllMenus}
                        />
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* LOGIN */}

            <Link
              href="/login"
              onClick={closeAllMenus}
              className="ml-1 flex h-11 items-center rounded-xl px-4 text-[14px] font-semibold text-[#26344D] transition-colors duration-200 hover:bg-slate-50 hover:text-blue-600"
            >
              Log In
            </Link>

            {/* CTA */}

            <Link
              href="/about/contact"
              onClick={closeAllMenus}
              className="ml-2 inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-6 text-[14px] font-bold text-white shadow-[0_5px_16px_rgba(37,99,235,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 active:scale-95"
            >
              Book A Call
            </Link>
          </nav>

          {/* ==================================================
              MOBILE BUTTON
          ================================================== */}

          <button
            type="button"
            onClick={toggleMobile}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-[#171B3A] transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 lg:hidden"
          >
            {mobileOpen ? (
              <X size={22} strokeWidth={2} />
            ) : (
              <Menu size={22} strokeWidth={2} />
            )}
          </button>
        </div>

        {/* ==================================================
            MOBILE MENU
        ================================================== */}

        {mobileOpen && (
          <>
            {/* Backdrop */}

            <div
              className="fixed inset-0 top-[82px] z-[998] bg-slate-900/20 backdrop-blur-sm lg:hidden"
              onClick={closeAllMenus}
              aria-hidden="true"
            />

            {/* Mobile Panel */}

            <div className="fixed left-0 right-0 top-[82px] z-[999] max-h-[calc(100vh-82px)] overflow-y-auto border-t border-slate-200 bg-white shadow-[0_20px_50px_rgba(23,27,58,0.15)] lg:hidden">
              <nav
                className="mx-auto max-w-[1500px] px-5 py-3 sm:px-6"
                aria-label="Mobile Navigation"
              >
                {/* PRODUCTS */}

                <button
                  type="button"
                  onClick={() => {
                    setProductsOpen((prev) => !prev);
                    setAboutOpen(false);
                  }}
                  aria-expanded={productsOpen}
                  className="flex w-full items-center justify-between border-b border-slate-100 py-4 text-left text-[15px] font-semibold text-[#26344D]"
                >
                  <span>Products</span>

                  <ChevronDown
                    size={17}
                    className={`transition-transform duration-200 ${
                      productsOpen
                        ? "rotate-180 text-blue-600"
                        : "text-slate-400"
                    }`}
                  />
                </button>

                {productsOpen && (
                  <div className="rounded-b-xl bg-slate-50 px-3 py-1">
                    <ul>
                      {products.map((product) => (
                        <MobileLink
                          key={product.href}
                          href={product.href}
                          title={product.title}
                          onClose={closeAllMenus}
                          icon={product.icon}
                          showIcon={true}
                        />
                      ))}
                    </ul>
                  </div>
                )}

                {/* NORMAL LINKS */}

                <ul>
                  {navLinks.map((link) => (
                    <MobileLink
                      key={link.href}
                      href={link.href}
                      title={link.title}
                      onClose={closeAllMenus}
                    />
                  ))}
                </ul>

                {/* ABOUT */}

                <button
                  type="button"
                  onClick={() => {
                    setAboutOpen((prev) => !prev);
                    setProductsOpen(false);
                  }}
                  aria-expanded={aboutOpen}
                  className="flex w-full items-center justify-between border-b border-slate-100 py-4 text-left text-[15px] font-semibold text-[#26344D]"
                >
                  <span>About</span>

                  <ChevronDown
                    size={17}
                    className={`transition-transform duration-200 ${
                      aboutOpen
                        ? "rotate-180 text-blue-600"
                        : "text-slate-400"
                    }`}
                  />
                </button>

                {aboutOpen && (
                  <div className="rounded-b-xl bg-slate-50 px-3 py-1">
                    <ul>
                      {aboutItems.map((item) => (
                        <MobileLink
                          key={item.href}
                          href={item.href}
                          title={item.title}
                          onClose={closeAllMenus}
                          icon={item.icon}
                          showIcon={true}
                        />
                      ))}
                    </ul>
                  </div>
                )}

                {/* LOGIN */}

                <ul>
                  <MobileLink
                    href="/login"
                    title="Log In"
                    onClose={closeAllMenus}
                  />
                </ul>

                {/* CTA */}

                <Link
                  href="/about/contact"
                  onClick={closeAllMenus}
                  className="mb-5 mt-5 flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:bg-blue-700 active:scale-[0.98]"
                >
                  Book A Call
                </Link>
              </nav>
            </div>
          </>
        )}
      </header>

      {/* ==================================================
          HEADER SPACER
      ================================================== */}

      <div
        className="h-[82px]"
        aria-hidden="true"
      />
    </>
  );
}