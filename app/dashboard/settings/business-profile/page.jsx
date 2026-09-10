"use client";

import { useState } from "react";
import {
  Building2,
  Globe2,
  MapPin,
  Phone,
  Mail,
  Save,
  Upload,
  Image as ImageIcon,
  Trash2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function BusinessProfilePage() {
  const [logoPreview, setLogoPreview] = useState("");
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    businessName: "",
    businessEmail: "",
    businessPhone: "",
    website: "",
    businessType: "",
    industry: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    timezone: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (saved) {
      setSaved(false);
    }
  };

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setLogoPreview(previewUrl);
    setSaved(false);
  };

  const removeLogo = () => {
    setLogoPreview("");
    setSaved(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Frontend only.
    // Real business profile data will be saved through the backend later.
    setSaved(true);
  };

  return (
    <div className="w-full pb-12">
      {/* Page Header */}
      <div className="mb-6">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400 sm:text-sm">
          <span>Settings</span>
          <span>/</span>
          <span className="text-slate-600">Business Profile</span>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#171B3A] sm:text-3xl">
              Business Profile
            </h1>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
              Manage your business information and profile details.
            </p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
          <CheckCircle2
            size={18}
            className="mt-0.5 shrink-0 text-emerald-600"
          />

          <div>
            <p className="text-sm font-semibold text-emerald-800">
              Changes saved
            </p>

            <p className="mt-0.5 text-xs text-emerald-700">
              Your changes are currently stored in this page session.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Business Information */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <SectionHeader
            icon={Building2}
            title="Business Information"
            description="Basic information about your business."
          />

          <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 lg:grid-cols-2">
            <FormField
              label="Business Name"
              name="businessName"
              value={form.businessName}
              onChange={handleChange}
              placeholder="Enter business name"
            />

            <FormField
              label="Business Type"
              name="businessType"
              value={form.businessType}
              onChange={handleChange}
              placeholder="Select business type"
              select
              options={[
                "Service Business",
                "Agency",
                "Consulting",
                "E-commerce",
                "Other",
              ]}
            />

            <FormField
              label="Industry"
              name="industry"
              value={form.industry}
              onChange={handleChange}
              placeholder="Select industry"
              select
              options={[
                "Construction",
                "Healthcare",
                "Real Estate",
                "Professional Services",
                "Retail",
                "Technology",
                "Other",
              ]}
            />

            <FormField
              label="Website"
              name="website"
              value={form.website}
              onChange={handleChange}
              placeholder="https://example.com"
              type="url"
            />
          </div>
        </section>

        {/* Business Logo */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <SectionHeader
            icon={ImageIcon}
            title="Business Logo"
            description="Upload a logo that represents your business."
          />

          <div className="p-5 sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-50">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Business logo preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Building2
                    size={30}
                    strokeWidth={1.5}
                    className="text-slate-300"
                  />
                )}
              </div>

              <div>
                <div className="flex flex-wrap gap-2">
                  <label className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-700">
                    <Upload size={15} />
                    Upload Logo

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                    />
                  </label>

                  {logoPreview && (
                    <button
                      type="button"
                      onClick={removeLogo}
                      className="inline-flex h-10 items-center gap-2 rounded-xl border border-red-200 bg-white px-4 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      <Trash2 size={15} />
                      Remove
                    </button>
                  )}
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  JPG, PNG or WEBP. Logo preview is handled locally for now.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <SectionHeader
            icon={Phone}
            title="Contact Information"
            description="Contact details customers can use to reach your business."
          />

          <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 lg:grid-cols-2">
            <FormField
              label="Business Email"
              name="businessEmail"
              value={form.businessEmail}
              onChange={handleChange}
              placeholder="business@example.com"
              type="email"
              icon={Mail}
            />

            <FormField
              label="Business Phone"
              name="businessPhone"
              value={form.businessPhone}
              onChange={handleChange}
              placeholder="Enter business phone"
              type="tel"
              icon={Phone}
            />
          </div>
        </section>

        {/* Business Address */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <SectionHeader
            icon={MapPin}
            title="Business Address"
            description="Add the primary location associated with your business."
          />

          <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 lg:grid-cols-2">
            <div className="lg:col-span-2">
              <FormField
                label="Street Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter street address"
              />
            </div>

            <FormField
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Enter city"
            />

            <FormField
              label="State / Province"
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="Enter state or province"
            />

            <FormField
              label="Postal Code"
              name="postalCode"
              value={form.postalCode}
              onChange={handleChange}
              placeholder="Enter postal code"
            />

            <FormField
              label="Country"
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Select country"
              select
              options={[
                "Pakistan",
                "United States",
                "United Kingdom",
                "Canada",
                "Australia",
                "Other",
              ]}
            />
          </div>
        </section>

        {/* Regional Settings */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <SectionHeader
            icon={Globe2}
            title="Regional Settings"
            description="Configure the timezone used by your business workspace."
          />

          <div className="p-5 sm:p-6 lg:max-w-xl">
            <FormField
              label="Timezone"
              name="timezone"
              value={form.timezone}
              onChange={handleChange}
              placeholder="Select timezone"
              select
              options={[
                "Asia/Karachi",
                "Asia/Dubai",
                "Asia/Kolkata",
                "Europe/London",
                "America/New_York",
                "America/Los_Angeles",
                "UTC",
              ]}
            />
          </div>
        </section>

        {/* Bottom Actions */}
        <div className="sticky bottom-0 z-20 -mx-4 border-t border-slate-200 bg-[#f8fafc]/95 px-4 py-4 backdrop-blur sm:-mx-5 sm:px-5 lg:-mx-6 lg:px-6 xl:-mx-8 xl:px-8">
          <div className="mx-auto flex w-full max-w-[1500px] flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-2 text-xs text-slate-400">
              <AlertCircle
                size={15}
                className="mt-0.5 shrink-0"
              />

              <span>
                Backend saving will be connected later.
              </span>
            </div>

            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="flex items-start gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        <Icon size={18} strokeWidth={1.8} />
      </div>

      <div>
        <h2 className="text-sm font-bold text-[#171B3A] sm:text-base">
          {title}
        </h2>

        <p className="mt-0.5 text-xs leading-5 text-slate-400 sm:text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   FORM FIELD
========================================================= */

function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  select = false,
  options = [],
  icon: Icon,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-xs font-semibold text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}

        {select ? (
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value="">{placeholder}</option>

            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`h-11 w-full rounded-xl border border-slate-200 bg-white text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 ${
              Icon ? "pl-10 pr-3.5" : "px-3.5"
            }`}
          />
        )}
      </div>
    </div>
  );
}