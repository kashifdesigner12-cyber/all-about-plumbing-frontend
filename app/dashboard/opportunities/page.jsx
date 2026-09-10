"use client";

import { useState } from "react";
import {
  BriefcaseBusiness,
  ChevronDown,
  MoreHorizontal,
  Plus,
  Search,
} from "lucide-react";

export default function OpportunitiesPage() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState("pipeline");

  const stages = [
    {
      id: "new",
      title: "New",
      count: 0,
    },
    {
      id: "qualified",
      title: "Qualified",
      count: 0,
    },
    {
      id: "proposal",
      title: "Proposal",
      count: 0,
    },
    {
      id: "won",
      title: "Won",
      count: 0,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="w-full px-6 py-6">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Opportunities
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage your sales opportunities and pipeline.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            New Opportunity
          </button>
        </div>

        <div className="mb-6 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search opportunities..."
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setView("pipeline")}
              className={`rounded-lg px-3 py-2 text-sm font-medium ${
                view === "pipeline"
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              Pipeline
            </button>

            <button
              type="button"
              onClick={() => setView("list")}
              className={`rounded-lg px-3 py-2 text-sm font-medium ${
                view === "list"
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              List
            </button>
          </div>
        </div>

        {view === "pipeline" ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stages.map((stage) => (
              <section
                key={stage.id}
                className="min-h-[420px] rounded-xl border border-slate-200 bg-white"
              >
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-semibold text-slate-900">
                      {stage.title}
                    </h2>

                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
                      {stage.count}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    aria-label={`${stage.title} options`}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex min-h-[350px] items-center justify-center p-6">
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                      <BriefcaseBusiness className="h-5 w-5 text-blue-600" />
                    </div>

                    <h3 className="text-sm font-medium text-slate-900">
                      No opportunities
                    </h3>

                    <p className="mt-1 max-w-[220px] text-xs leading-5 text-slate-500">
                      Opportunities added to this stage will appear here.
                    </p>
                  </div>
                </div>
              </section>
            ))}
          </div>
        ) : (
          <section className="rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Opportunities
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  {search
                    ? `No results found for "${search}".`
                    : "No opportunities have been added yet."}
                </p>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Filter
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            <div className="flex min-h-[350px] items-center justify-center p-6">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                  <BriefcaseBusiness className="h-5 w-5 text-blue-600" />
                </div>

                <h3 className="text-base font-semibold text-slate-900">
                  No opportunities yet
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Create your first opportunity to start managing your pipeline.
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}