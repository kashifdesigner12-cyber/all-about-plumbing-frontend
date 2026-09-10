"use client";

import { useState } from "react";
import {
  Rocket,
  Search,
  Plus,
  MoreHorizontal,
  LayoutGrid,
  List,
} from "lucide-react";

const LaunchpadPage = () => {
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");

  const launchpads = [];

  const filteredLaunchpads = launchpads.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="flex items-center justify-between gap-4 px-6 py-5">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Launchpad
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage and organize your launchpad projects.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            New Launchpad
          </button>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search launchpads..."
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex items-center rounded-lg border border-slate-200 bg-white p-1">
            <button
              type="button"
              onClick={() => setView("grid")}
              className={`rounded-md p-2 ${
                view === "grid"
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-400 hover:text-slate-700"
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid size={18} />
            </button>

            <button
              type="button"
              onClick={() => setView("list")}
              className={`rounded-md p-2 ${
                view === "list"
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-400 hover:text-slate-700"
              }`}
              aria-label="List view"
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {filteredLaunchpads.length === 0 ? (
          <div className="flex min-h-[420px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white">
            <div className="max-w-md px-6 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
                <Rocket size={30} className="text-blue-600" />
              </div>

              <h2 className="text-xl font-semibold text-slate-900">
                No launchpads found
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                There are no launchpads to display yet. Create a new launchpad
                to get started.
              </p>

              <button
                type="button"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                <Plus size={18} />
                Create Launchpad
              </button>
            </div>
          </div>
        ) : view === "grid" ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredLaunchpads.map((launchpad) => (
              <div
                key={launchpad.id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                      <Rocket size={20} className="text-blue-600" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {launchpad.name}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {launchpad.status}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  >
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            {filteredLaunchpads.map((launchpad) => (
              <div
                key={launchpad.id}
                className="flex items-center justify-between border-b border-slate-100 p-5 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <Rocket size={20} className="text-blue-600" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {launchpad.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {launchpad.status}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  <MoreHorizontal size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LaunchpadPage;