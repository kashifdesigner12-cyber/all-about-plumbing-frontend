"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log("Register Data:", formData);

    alert("Account created successfully!");

    router.push("/login");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-5 py-10 sm:px-6">
      {/* Background Glow */}

      <div className="pointer-events-none fixed -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-blue-100/60 blur-[120px]" />

      <div className="pointer-events-none fixed -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-blue-50 blur-[120px]" />

      <div className="relative z-10 w-full max-w-[460px]">
        {/* Logo */}

        <div className="mb-7 text-center">
          <Link
            href="/"
            className="text-2xl font-black tracking-[-0.04em] text-[#171B3A]"
          >
            Stone<span className="text-blue-600">Systems</span>
          </Link>
        </div>

        {/* Card */}

        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(23,27,58,0.07)] sm:p-8">
          {/* Heading */}

          <div className="mb-7 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
              Get Started
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-[-0.045em] text-[#171B3A] sm:text-4xl">
              Create your account
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#64748B]">
              Create your account and get started with Stone Systems.
            </p>
          </div>

          {/* Google */}

          <button
            type="button"
            className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-sm font-bold text-[#171B3A] transition hover:border-blue-200 hover:bg-slate-50"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M21.35 12.27c0-.78-.07-1.53-.2-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42Z"
              />

              <path
                fill="#34A853"
                d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.75 9.75 0 0 0 12 21.75Z"
              />

              <path
                fill="#FBBC05"
                d="M6.54 13.84A5.86 5.86 0 0 1 6.23 12c0-.64.11-1.26.31-1.84V7.63H3.3A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.37l3.24-2.53Z"
              />

              <path
                fill="#EA4335"
                d="M12 6.13c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.22 14.63 2.25 12 2.25A9.75 9.75 0 0 0 3.3 7.63l3.24 2.53C7.31 7.85 9.46 6.13 12 6.13Z"
              />
            </svg>

            Continue with Google
          </button>

          {/* Divider */}

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />

            <span className="text-[11px] font-semibold text-slate-400">
              OR
            </span>

            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Form */}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}

            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-bold text-[#171B3A]"
              >
                Full name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                autoComplete="name"
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-[#171B3A] outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {/* Email */}

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-bold text-[#171B3A]"
              >
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-[#171B3A] outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {/* Password */}

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-bold text-[#171B3A]"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 pr-12 text-sm font-medium text-[#171B3A] outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-blue-600"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-bold text-[#171B3A]"
              >
                Confirm password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 pr-12 text-sm font-medium text-[#171B3A] outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-blue-600"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Terms */}

            <label className="flex cursor-pointer items-start gap-2.5 pt-1">
              <input
                type="checkbox"
                required
                className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-blue-600"
              />

              <span className="text-xs leading-5 text-[#64748B]">
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="font-bold text-blue-600 hover:text-blue-700"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="font-bold text-blue-600 hover:text-blue-700"
                >
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            {/* Submit */}

            <button
              type="submit"
              className="group mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Create account

              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </form>

          {/* Login */}

          <div className="mt-6 border-t border-slate-100 pt-6 text-center">
            <p className="text-sm text-[#64748B]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-blue-600 transition hover:text-blue-700"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Security */}

        <p className="mt-5 text-center text-xs text-slate-400">
          Your information is securely protected.
        </p>
      </div>
    </main>
  );
}