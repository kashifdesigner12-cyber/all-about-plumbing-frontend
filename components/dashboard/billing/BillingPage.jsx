"use client";

import { useState } from "react";
import {
  CreditCard,
  Receipt,
  CheckCircle2,
  Plus,
  X,
  Zap,
  WholeWord,
  KeySquare,
} from "lucide-react";

export default function BillingPage() {
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [message, setMessage] = useState("");

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const selectPlan = (plan) => {
    setShowPlanModal(false);
    showMessage(`${plan} selected. Backend billing will be connected later.`);
  };

  const savePayment = (e) => {
    e.preventDefault();
    setShowPaymentModal(false);
    showMessage("Payment method saved for frontend preview.");
  };

  return (
    <div className="min-h-full w-full overflow-y-auto bg-slate-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-6">
          <p className="mb-1 text-xs font-medium text-slate-400">
            Settings / Billing
          </p>

          <h1 className="text-2xl font-bold text-[#171B3A]">
            Billing
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your subscription and payment details.
          </p>
        </div>

        {/* MESSAGE */}
        {message && (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3">
            <CheckCircle2 size={17} className="text-blue-600" />
            <p className="text-sm font-medium text-blue-700">
              {message}
            </p>
          </div>
        )}

        <div className="space-y-5">
          {/* CURRENT PLAN */}
          <section className="rounded-xl border border-slate-200 bg-white">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="font-semibold text-[#171B3A]">
                Current Plan
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Your current subscription details.
              </p>
            </div>

            <div className="p-5">
              <div className="flex flex-col gap-5 rounded-xl bg-blue-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600 text-white">
                    <Zap size={20} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-[#171B3A]">
                        Current Plan
                      </h3>

                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                        Active
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-slate-500">
                      Subscription information will come from the backend.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPlanModal(true)}
                  className="h-10 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Change Plan
                </button>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <Detail
                  label="Billing Amount"
                  value="Not available"
                />

                <Detail
                  label="Billing Cycle"
                  value="Not available"
                />

                <Detail
                  label="Next Billing"
                  value="Not available"
                />
              </div>
            </div>
          </section>

          {/* PAYMENT METHOD */}
          <section className="rounded-xl border border-slate-200 bg-white">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="font-semibold text-[#171B3A]">
                Payment Method
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Manage the payment method for your subscription.
              </p>
            </div>

            <div className="p-5">
              <div className="flex flex-col gap-4 rounded-xl border border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                    <CreditCard size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#171B3A]">
                      No payment method
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      No payment method has been added.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPaymentModal(true)}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                >
                  <Plus size={16} />
                  Add Payment Method
                </button>
              </div>
            </div>
          </section>

          {/* BILLING HISTORY */}
          <section className="rounded-xl border border-slate-200 bg-white">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="font-semibold text-[#171B3A]">
                Billing History
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Your invoices and previous payments.
              </p>
            </div>

            <div className="p-5">
              <div className="flex min-h-[180px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-5 text-center">
                <Receipt size={28} className="text-slate-300" />

                <h3 className="mt-3 text-sm font-semibold text-[#171B3A]">
                  No billing history
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  Invoices will appear here when billing data is available.
                </p>
              </div>
            </div>
          </section>

          {/* BILLING DETAILS */}
          <section className="rounded-xl border border-slate-200 bg-white">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="font-semibold text-[#171B3A]">
                Billing Details
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Manage your billing information.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-sm font-semibold text-[#171B3A]">
                  Account Details
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Billing and business information will be loaded from
                  your account.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    showMessage(
                      "Billing details will be connected to the backend later."
                    )
                  }
                  className="mt-4 h-9 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Manage Details
                </button>
              </div>

              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="text-sm font-semibold text-[#171B3A]">
                  Invoices
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  View and download your billing invoices.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    showMessage(
                      "Invoices will be available after backend integration."
                    )
                  }
                  className="mt-4 h-9 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  View Invoices
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* PLAN MODAL */}
      {showPlanModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/40 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowPlanModal(false);
            }
          }}
        >
          <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h2 className="font-semibold text-[#171B3A]">
                  Change Plan
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Choose your preferred billing plan.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowPlanModal(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X size={17} />
              </button>
            </div>

            <div className="p-5">
              {/* BILLING TOGGLE */}
              <div className="mb-5 flex justify-center">
                <div className="flex rounded-lg bg-slate-100 p-1">
                  <button
                    type="button"
                    onClick={() => setBillingCycle("monthly")}
                    className={`rounded-md px-4 py-2 text-xs font-semibold ${
                      billingCycle === "monthly"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-500"
                    }`}
                  >
                    Monthly
                  </button>

                  <button
                    type="button"
                    onClick={() => setBillingCycle("yearly")}
                    className={`rounded-md px-4 py-2 text-xs font-semibold ${
                      billingCycle === "yearly"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-500"
                    }`}
                  >
                    Yearly
                  </button>
                </div>
              </div>

              {/* PLANS */}
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <Plan
                  name="Starter"
                  description="Basic features for small teams."
                  onSelect={() => selectPlan("Starter")}
                />

                <Plan
                  name="Professional"
                  description="More features for growing teams."
                  active
                  onSelect={() => selectPlan("Professional")}
                />

                <Plan
                  name="Business"
                  description="Advanced features for businesses."
                  onSelect={() => selectPlan("Business")}
                />
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-100 px-5 py-4">
              <button
                type="button"
                onClick={() => setShowPlanModal(false)}
                className="h-9 rounded-lg border border-slate-200 px-4 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PAYMENT MODAL */}
      {showPaymentModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/40 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowPaymentModal(false);
            }
          }}
        >
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <CreditCard size={18} />
                </div>

                <div>
                  <h2 className="font-semibold text-[#171B3A]">
                    Add Payment Method
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Add payment details.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowPaymentModal(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X size={17} />
              </button>
            </div>

            <form onSubmit={savePayment}>
              <div className="space-y-4 p-5">
                <Field
                  label="Cardholder Name"
                  placeholder="Enter name"
                />

                <Field
                  label="Card Number"
                  placeholder="Enter card number"
                  inputMode="numeric"
                />

                <div className="grid grid-cols-2 gap-3">
                  <Field
                    label="Expiry Date"
                    placeholder="MM / YY"
                  />

                  <Field
                    label="CVV"
                    placeholder="CVV"
                    inputMode="numeric"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-100 px-5 py-4">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="h-10 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Save Method
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* DETAIL */

function Detail({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-[#171B3A]">
        {value}
      </p>
    </div>
  );
}

/* PLAN */

function Plan({
  name,
  description,
  active = false,
  onSelect,
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        active
          ? "border-blue-300 bg-blue-50/50"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#171B3A]">
          {name}
        </h3>

        {active && (
          <span className="rounded-full bg-blue-600 px-2 py-1 text-[9px] font-bold text-white">
            Recommended
          </span>
        )}
      </div>

      <p className="mt-2 min-h-[40px] text-xs leading-5 text-slate-400">
        {description}
      </p>

      <button
        type="button"
        onClick={onSelect}
        className={`mt-4 h-9 w-full rounded-lg text-xs font-semibold ${
          active
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "border border-slate-200 text-slate-600 hover:bg-slate-50"
        }`}
      >
        Select Plan
      </button>
    </div>
  );
}

/* INPUT */

function Field({
  label,
  placeholder,
  inputMode,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-600">
        {label}
      </label>

      <input
        type="text"
        placeholder={placeholder}
        inputMode={inputMode}
        className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}