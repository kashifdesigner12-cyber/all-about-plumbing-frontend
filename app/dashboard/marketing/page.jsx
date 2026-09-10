"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Megaphone,
  Plus,
  Search,
  CalendarDays,
  BarChart3,
  Radio,
  FileText,
  MessageCircle,
  Settings,
  X,
  Send,
  Clock3,
  Trash2,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

export default function MarketingPage() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [notice, setNotice] = useState("");

  const [form, setForm] = useState({
    title: "",
    content: "",
    platform: "Social",
    status: "Draft",
  });

  const filteredPosts = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return posts;

    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(value) ||
        post.content.toLowerCase().includes(value) ||
        post.platform.toLowerCase().includes(value)
    );
  }, [posts, search]);

  function createPost(e) {
    e.preventDefault();

    if (!form.title.trim() || !form.content.trim()) {
      setNotice("Please add a title and content.");
      return;
    }

    const newPost = {
      id: Date.now(),
      title: form.title.trim(),
      content: form.content.trim(),
      platform: form.platform,
      status: form.status,
      createdAt: new Date().toLocaleString(),
    };

    setPosts((current) => [newPost, ...current]);

    setForm({
      title: "",
      content: "",
      platform: "Social",
      status: "Draft",
    });

    setShowCreate(false);
    setNotice("Post created successfully.");

    setTimeout(() => setNotice(""), 2500);
  }

  function deletePost(id) {
    setPosts((current) => current.filter((post) => post.id !== id));
    setNotice("Post removed.");

    setTimeout(() => setNotice(""), 2000);
  }

  return (
    <div className="min-h-screen bg-[#f5f6f8] text-[#26344d]">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="flex h-[56px] items-center px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Megaphone className="h-4 w-4" />
            </div>

            <div>
              <h1 className="text-[14px] font-semibold text-slate-800">
                Marketing
              </h1>

              <p className="text-[9px] text-slate-400">
                Manage your marketing workspace
              </p>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/dashboard/marketing/social-planner/settings"
              className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition hover:bg-slate-50"
            >
              <Settings className="h-3.5 w-3.5" />
            </Link>

            <button
              type="button"
              onClick={() => setShowCreate(true)}
              className="flex h-8 items-center gap-1.5 rounded-md bg-blue-600 px-3 text-[10px] font-semibold text-white transition hover:bg-blue-700"
            >
              <Plus className="h-3.5 w-3.5" />
              New Post
            </button>
          </div>
        </div>

        <nav className="flex h-[40px] items-center gap-6 border-t border-slate-100 px-5">
          <NavLink href="/dashboard/marketing" active>
            Overview
          </NavLink>

          <NavLink href="/dashboard/marketing/social-planner">
            Social Planner
          </NavLink>

          <NavLink href="/dashboard/marketing/social-planner/content">
            Content
          </NavLink>

          <NavLink href="/dashboard/marketing/social-planner/comments">
            Comments
          </NavLink>

          <NavLink href="/dashboard/marketing/social-planner/statistics">
            Statistics
          </NavLink>

          <NavLink href="/dashboard/marketing/social-planner/social-listening">
            Social Listening
          </NavLink>
        </nav>
      </header>

      {/* MAIN */}
      <main className="p-4">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="text-[18px] font-semibold text-slate-800">
                Marketing Overview
              </h2>

              <p className="mt-1 text-[10px] text-slate-400">
                Create, organize and monitor your marketing content.
              </p>
            </div>

            <div className="flex h-8 w-[230px] items-center rounded-md border border-slate-200 bg-white px-2.5">
              <Search className="h-3.5 w-3.5 text-slate-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search your content..."
                className="ml-2 w-full bg-transparent text-[10px] outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <ActionCard
              href="/dashboard/marketing/social-planner"
              icon={CalendarDays}
              title="Social Planner"
              description="Plan and schedule content"
            />

            <ActionCard
              href="/dashboard/marketing/social-planner/content"
              icon={FileText}
              title="Content"
              description="Manage your created content"
            />

            <ActionCard
              href="/dashboard/marketing/social-planner/comments"
              icon={MessageCircle}
              title="Comments"
              description="Review and manage comments"
            />

            <ActionCard
              href="/dashboard/marketing/social-planner/statistics"
              icon={BarChart3}
              title="Statistics"
              description="Review your content activity"
            />
          </div>

          {/* CONTENT */}
          <section className="mt-4 rounded-lg border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-100 p-4">
              <div>
                <h3 className="text-[12px] font-semibold text-slate-700">
                  Your Content
                </h3>

                <p className="mt-1 text-[9px] text-slate-400">
                  Content created during this session.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowCreate(true)}
                className="flex h-7 items-center gap-1.5 rounded-md bg-blue-600 px-2.5 text-[9px] font-semibold text-white hover:bg-blue-700"
              >
                <Plus className="h-3 w-3" />
                Create
              </button>
            </div>

            {filteredPosts.length === 0 ? (
              <EmptyState
                search={search}
                onCreate={() => setShowCreate(true)}
              />
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center gap-3 p-4"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <FileText className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-[11px] font-semibold text-slate-700">
                        {post.title}
                      </h4>

                      <p className="mt-1 truncate text-[9px] text-slate-400">
                        {post.content}
                      </p>

                      <div className="mt-1.5 flex items-center gap-2">
                        <span className="text-[8px] text-slate-400">
                          {post.platform}
                        </span>

                        <span className="h-1 w-1 rounded-full bg-slate-300" />

                        <span className="text-[8px] text-slate-400">
                          {post.createdAt}
                        </span>
                      </div>
                    </div>

                    <StatusBadge status={post.status} />

                    <button
                      type="button"
                      onClick={() => deletePost(post.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                      title="Delete"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* EMPTY STATS */}
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
            <InfoCard
              icon={Send}
              title="Publishing"
              value={posts.filter((p) => p.status === "Published").length}
              description="Published in this session"
            />

            <InfoCard
              icon={Clock3}
              title="Scheduled"
              value={posts.filter((p) => p.status === "Scheduled").length}
              description="Scheduled in this session"
            />

            <InfoCard
              icon={FileText}
              title="Drafts"
              value={posts.filter((p) => p.status === "Draft").length}
              description="Drafts created in this session"
            />
          </div>
        </div>
      </main>

      {/* CREATE MODAL */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4">
          <div className="w-full max-w-[520px] rounded-xl border border-slate-200 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h3 className="text-[13px] font-semibold text-slate-800">
                  Create New Post
                </h3>

                <p className="mt-1 text-[9px] text-slate-400">
                  Add content to your marketing workspace.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={createPost} className="space-y-4 p-5">
              <Field label="Title">
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  placeholder="Enter post title"
                  className="h-9 w-full rounded-md border border-slate-200 px-3 text-[10px] outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-50"
                />
              </Field>

              <Field label="Content">
                <textarea
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  placeholder="Write your content..."
                  rows={4}
                  className="w-full resize-none rounded-md border border-slate-200 p-3 text-[10px] outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-50"
                />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Platform">
                  <select
                    value={form.platform}
                    onChange={(e) =>
                      setForm({ ...form, platform: e.target.value })
                    }
                    className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[10px] outline-none focus:border-blue-500"
                  >
                    <option>Social</option>
                    <option>Facebook</option>
                    <option>Instagram</option>
                    <option>LinkedIn</option>
                    <option>Twitter</option>
                  </select>
                </Field>

                <Field label="Status">
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                    className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[10px] outline-none focus:border-blue-500"
                  >
                    <option>Draft</option>
                    <option>Scheduled</option>
                    <option>Published</option>
                  </select>
                </Field>
              </div>

              {notice && (
                <div className="rounded-md bg-amber-50 px-3 py-2 text-[9px] text-amber-700">
                  {notice}
                </div>
              )}

              <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="h-9 rounded-md border border-slate-200 px-4 text-[10px] font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex h-9 items-center gap-1.5 rounded-md bg-blue-600 px-4 text-[10px] font-semibold text-white hover:bg-blue-700"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Create Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function NavLink({ href, children, active = false }) {
  return (
    <Link
      href={href}
      className={`relative flex h-full items-center text-[10px] transition ${
        active
          ? "font-semibold text-blue-600"
          : "text-slate-500 hover:text-slate-700"
      }`}
    >
      {children}

      {active && (
        <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-t-full bg-blue-600" />
      )}
    </Link>
  );
}

function ActionCard({ href, icon: Icon, title, description }) {
  return (
    <Link
      href={href}
      className="group rounded-lg border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <Icon className="h-4 w-4" />
        </div>

        <ChevronRight className="h-3.5 w-3.5 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-500" />
      </div>

      <h3 className="mt-3 text-[11px] font-semibold text-slate-700">
        {title}
      </h3>

      <p className="mt-1 text-[9px] text-slate-400">
        {description}
      </p>
    </Link>
  );
}

function EmptyState({ search, onCreate }) {
  return (
    <div className="flex min-h-[230px] flex-col items-center justify-center px-5 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
        {search ? (
          <Search className="h-5 w-5" />
        ) : (
          <FileText className="h-5 w-5" />
        )}
      </div>

      <h3 className="mt-3 text-[11px] font-semibold text-slate-700">
        {search ? "No content found" : "No content yet"}
      </h3>

      <p className="mt-1 max-w-[300px] text-[9px] leading-4 text-slate-400">
        {search
          ? "Try another search term."
          : "Create your first post to start managing your marketing content."}
      </p>

      {!search && (
        <button
          type="button"
          onClick={onCreate}
          className="mt-4 flex h-8 items-center gap-1.5 rounded-md bg-blue-600 px-3 text-[9px] font-semibold text-white hover:bg-blue-700"
        >
          <Plus className="h-3 w-3" />
          Create First Post
        </button>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Draft: "bg-slate-100 text-slate-500",
    Scheduled: "bg-blue-50 text-blue-600",
    Published: "bg-emerald-50 text-emerald-600",
  };

  return (
    <span
      className={`shrink-0 rounded-full px-2 py-1 text-[8px] font-medium ${
        styles[status] || styles.Draft
      }`}
    >
      {status}
    </span>
  );
}

function InfoCard({ icon: Icon, title, value, description }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <Icon className="h-4 w-4" />
        </div>

        <div>
          <p className="text-[9px] text-slate-400">{title}</p>

          <p className="text-[17px] font-semibold text-slate-800">
            {value}
          </p>
        </div>
      </div>

      <p className="mt-3 text-[8px] text-slate-400">
        {description}
      </p>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[9px] font-medium text-slate-600">
        {label}
      </span>

      {children}
    </label>
  );
}