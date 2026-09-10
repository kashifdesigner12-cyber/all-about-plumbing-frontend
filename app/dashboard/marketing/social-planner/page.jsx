"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Clock3,
  CheckCircle2,
  AlertCircle,
  X,
  Image as ImageIcon,
  Video,
  FileText,
  ChevronDown,
  RefreshCw,
} from "lucide-react";

export default function SocialPlannerPage() {
  const [activeTab, setActiveTab] = useState("Planner");
  const [view, setView] = useState("Month");
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1));
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("All");
  const [showFilter, setShowFilter] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [toast, setToast] = useState("");

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Weekly business growth tips",
      platform: "Facebook",
      date: "2026-08-04",
      time: "10:00 AM",
      status: "Published",
      type: "Image",
    },
    {
      id: 2,
      title: "How to improve your local visibility",
      platform: "Instagram",
      date: "2026-08-07",
      time: "02:30 PM",
      status: "Scheduled",
      type: "Image",
    },
    {
      id: 3,
      title: "5 ways to generate better leads",
      platform: "Facebook",
      date: "2026-08-12",
      time: "11:00 AM",
      status: "Scheduled",
      type: "Video",
    },
    {
      id: 4,
      title: "Customer success story",
      platform: "Instagram",
      date: "2026-08-18",
      time: "04:00 PM",
      status: "Draft",
      type: "Image",
    },
    {
      id: 5,
      title: "Business communication checklist",
      platform: "Facebook",
      date: "2026-08-24",
      time: "09:30 AM",
      status: "Scheduled",
      type: "Text",
    },
  ]);

  const monthName = currentDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = post.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesPlatform =
        platform === "All" || post.platform === platform;

      return matchesSearch && matchesPlatform;
    });
  }, [posts, search, platform]);

  function notify(message) {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2500);
  }

  function previousMonth() {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  }

  function nextMonth() {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  }

  function today() {
    setCurrentDate(new Date(2026, 7, 1));
  }

  function handleCreatePost(post) {
    setPosts((current) => [
      ...current,
      {
        ...post,
        id: Date.now(),
        status: post.status || "Draft",
      },
    ]);

    setShowCreate(false);
    notify("Post created successfully");
  }

  function deletePost(id) {
    setPosts((current) => current.filter((post) => post.id !== id));
    setSelectedPost(null);
    notify("Post removed");
  }

  function duplicatePost(post) {
    setPosts((current) => [
      ...current,
      {
        ...post,
        id: Date.now(),
        title: `${post.title} — Copy`,
        status: "Draft",
      },
    ]);

    setSelectedPost(null);
    notify("Post duplicated");
  }

  const calendarDays = getCalendarDays(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  return (
    <div className="min-h-screen bg-[#f5f6f8] text-[#26344d]">
      {/* TOP HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="flex h-[55px] items-center gap-6 px-5">
          <div>
            <div className="text-[14px] font-semibold">Marketing</div>
          </div>

          <div className="text-[11px] font-medium text-blue-600">
            Social Planner
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setShowCreate(true)}
              className="flex h-8 items-center gap-1.5 rounded-md bg-blue-600 px-3 text-[11px] font-semibold text-white transition hover:bg-blue-700"
            >
              <Plus className="h-3.5 w-3.5" />
              Create Post
            </button>
          </div>
        </div>

        {/* SUB NAV */}
        <div className="flex h-[39px] items-center gap-6 overflow-x-auto border-t border-slate-100 px-5">
          <div className="whitespace-nowrap text-[13px] font-semibold">
            Social Planner
          </div>

          {[
            "Planner",
            "Content",
            "Comments",
            "Statistics",
            "Social Listening",
            "Settings",
          ].map((item) => (
            <button
              key={item}
              onClick={() => {
                setActiveTab(item);
                notify(`${item} selected`);
              }}
              className={`whitespace-nowrap text-[11px] transition ${
                activeTab === item
                  ? "font-semibold text-blue-600"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </header>

      {/* CONTENT */}
      <main className="p-4">
        <div className="mx-auto max-w-[1400px]">
          {/* PAGE HEADING */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-[17px] font-semibold">Social Planner</h1>

              <p className="mt-1 text-[10px] text-slate-400">
                Plan, schedule and manage your social media content.
              </p>
            </div>

            <button
              onClick={() => notify("Planner refreshed")}
              className="flex h-8 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 text-[10px] font-medium text-slate-600 hover:bg-slate-50"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Refresh
            </button>
          </div>

          {/* TOOLBAR */}
          <div className="rounded-lg border border-slate-200 bg-white">
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 p-3">
              {/* DATE NAV */}
              <button
                onClick={previousMonth}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                onClick={today}
                className="h-8 rounded-md border border-slate-200 px-3 text-[10px] font-medium text-slate-600 hover:bg-slate-50"
              >
                Today
              </button>

              <button
                onClick={nextMonth}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <div className="ml-1 flex items-center gap-2 text-[13px] font-semibold">
                <CalendarDays className="h-4 w-4 text-blue-600" />
                {monthName}
              </div>

              <div className="ml-auto flex items-center gap-2">
                {/* SEARCH */}
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search posts..."
                    className="h-8 w-[190px] rounded-md border border-slate-200 bg-white pl-8 pr-3 text-[10px] outline-none focus:border-blue-400"
                  />
                </div>

                {/* FILTER */}
                <button
                  onClick={() => setShowFilter((value) => !value)}
                  className={`flex h-8 items-center gap-1.5 rounded-md border px-3 text-[10px] font-medium ${
                    showFilter
                      ? "border-blue-200 bg-blue-50 text-blue-600"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Filter className="h-3.5 w-3.5" />
                  Filter
                </button>

                {/* VIEW */}
                <div className="flex h-8 overflow-hidden rounded-md border border-slate-200">
                  {["Month", "Week"].map((item) => (
                    <button
                      key={item}
                      onClick={() => setView(item)}
                      className={`px-3 text-[10px] font-medium ${
                        view === item
                          ? "bg-blue-600 text-white"
                          : "bg-white text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* FILTER PANEL */}
            {showFilter && (
              <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-3 py-2">
                <span className="text-[10px] font-semibold text-slate-600">
                  Platform
                </span>

                {["All", "Facebook", "Instagram"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setPlatform(item)}
                    className={`rounded-md px-2.5 py-1.5 text-[9px] font-medium ${
                      platform === item
                        ? "bg-blue-600 text-white"
                        : "bg-white text-slate-500 border border-slate-200"
                    }`}
                  >
                    {item}
                  </button>
                ))}

                <button
                  onClick={() => {
                    setPlatform("All");
                    setSearch("");
                  }}
                  className="ml-auto text-[9px] text-blue-600 hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* CALENDAR */}
            {view === "Month" ? (
              <div>
                <div className="grid grid-cols-7 border-b border-slate-200">
                  {[
                    "Sun",
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                  ].map((day) => (
                    <div
                      key={day}
                      className="border-r border-slate-100 px-3 py-2 text-[9px] font-semibold uppercase text-slate-400 last:border-r-0"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7">
                  {calendarDays.map((day, index) => {
                    const dayPosts = filteredPosts.filter(
                      (post) =>
                        post.date ===
                        formatDate(
                          currentDate.getFullYear(),
                          currentDate.getMonth(),
                          day.date
                        )
                    );

                    return (
                      <div
                        key={`${day.date}-${index}`}
                        className={`min-h-[135px] border-b border-r border-slate-100 p-2 ${
                          !day.currentMonth ? "bg-slate-50/60" : "bg-white"
                        }`}
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span
                            className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] ${
                              day.today
                                ? "bg-blue-600 font-semibold text-white"
                                : day.currentMonth
                                ? "text-slate-600"
                                : "text-slate-300"
                            }`}
                          >
                            {day.date}
                          </span>

                          {day.currentMonth && (
                            <button
                              onClick={() => setShowCreate(true)}
                              className="flex h-5 w-5 items-center justify-center rounded text-slate-300 hover:bg-blue-50 hover:text-blue-600"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          )}
                        </div>

                        <div className="space-y-1">
                          {dayPosts.map((post) => (
                            <PostCard
                              key={post.id}
                              post={post}
                              onClick={() => setSelectedPost(post)}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <WeekView
                posts={filteredPosts}
                currentDate={currentDate}
                onSelect={setSelectedPost}
              />
            )}
          </div>

          {/* BOTTOM SUMMARY */}
          <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
            <SummaryCard
              icon={Clock3}
              label="Scheduled"
              value={posts.filter((p) => p.status === "Scheduled").length}
            />

            <SummaryCard
              icon={CheckCircle2}
              label="Published"
              value={posts.filter((p) => p.status === "Published").length}
            />

            <SummaryCard
              icon={FileText}
              label="Drafts"
              value={posts.filter((p) => p.status === "Draft").length}
            />

            <SummaryCard
              icon={AlertCircle}
              label="Total Posts"
              value={posts.length}
            />
          </div>
        </div>
      </main>

      {/* CREATE MODAL */}
      {showCreate && (
        <CreatePostModal
          onClose={() => setShowCreate(false)}
          onCreate={handleCreatePost}
        />
      )}

      {/* POST DETAILS */}
      {selectedPost && (
        <PostDetailsModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onDelete={deletePost}
          onDuplicate={duplicatePost}
          onNotify={notify}
        />
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-[100] flex items-center gap-2 rounded-lg bg-[#171b3a] px-4 py-3 text-[10px] font-medium text-white shadow-xl">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          {toast}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   POST CARD
============================================================ */

function PostCard({ post, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group w-full rounded-md border border-slate-200 bg-white p-2 text-left shadow-sm transition hover:-translate-y-[1px] hover:border-blue-200 hover:shadow"
    >
      <div className="flex items-center gap-1.5">
        <PlatformBadge platform={post.platform} />

        <span className="truncate text-[9px] font-medium text-slate-700">
          {post.platform}
        </span>

        <span className="ml-auto text-[8px] text-slate-400">
          {post.time}
        </span>
      </div>

      <div className="mt-1.5 truncate text-[9px] font-medium text-slate-600">
        {post.title}
      </div>

      <div className="mt-1.5 flex items-center justify-between">
        <StatusBadge status={post.status} />

        {post.type === "Image" && (
          <ImageIcon className="h-3 w-3 text-slate-300" />
        )}

        {post.type === "Video" && (
          <Video className="h-3 w-3 text-slate-300" />
        )}

        {post.type === "Text" && (
          <FileText className="h-3 w-3 text-slate-300" />
        )}
      </div>
    </button>
  );
}

/* ============================================================
   PLATFORM BADGE
============================================================ */

function PlatformBadge({ platform }) {
  return (
    <span
      className={`flex h-4 w-4 items-center justify-center rounded-full text-[7px] font-bold text-white ${
        platform === "Facebook"
          ? "bg-blue-600"
          : "bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400"
      }`}
    >
      {platform === "Facebook" ? "f" : "◎"}
    </span>
  );
}

/* ============================================================
   STATUS
============================================================ */

function StatusBadge({ status }) {
  const styles = {
    Published: "bg-emerald-50 text-emerald-600",
    Scheduled: "bg-blue-50 text-blue-600",
    Draft: "bg-slate-100 text-slate-500",
  };

  return (
    <span
      className={`rounded-full px-1.5 py-0.5 text-[7px] font-medium ${
        styles[status] || styles.Draft
      }`}
    >
      {status}
    </span>
  );
}

/* ============================================================
   SUMMARY
============================================================ */

function SummaryCard({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        <Icon className="h-4 w-4" />
      </div>

      <div>
        <div className="text-[9px] text-slate-400">{label}</div>
        <div className="mt-0.5 text-[14px] font-semibold text-slate-700">
          {value}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   WEEK VIEW
============================================================ */

function WeekView({ posts, currentDate, onSelect }) {
  const start = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - currentDate.getDay()
  );

  const days = Array.from({ length: 7 }, (_, index) => {
    return new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate() + index
    );
  });

  return (
    <div className="grid grid-cols-7">
      {days.map((day) => {
        const dateString = formatFullDate(day);

        const dayPosts = posts.filter((post) => post.date === dateString);

        return (
          <div
            key={dateString}
            className="min-h-[500px] border-r border-slate-100 p-3 last:border-r-0"
          >
            <div className="mb-3 border-b border-slate-100 pb-2">
              <div className="text-[9px] uppercase text-slate-400">
                {day.toLocaleString("en-US", { weekday: "short" })}
              </div>

              <div className="mt-1 text-[13px] font-semibold">
                {day.getDate()}
              </div>
            </div>

            <div className="space-y-2">
              {dayPosts.length === 0 ? (
                <button className="w-full rounded-md border border-dashed border-slate-200 py-5 text-[9px] text-slate-300 hover:border-blue-300 hover:text-blue-500">
                  No posts
                </button>
              ) : (
                dayPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onClick={() => onSelect(post)}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ============================================================
   CREATE POST MODAL
============================================================ */

function CreatePostModal({ onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("Facebook");
  const [date, setDate] = useState("2026-08-20");
  const [time, setTime] = useState("10:00 AM");
  const [type, setType] = useState("Image");
  const [status, setStatus] = useState("Draft");

  function submit(e) {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    onCreate({
      title: title.trim(),
      platform,
      date,
      time,
      type,
      status,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-[500px] rounded-xl border border-slate-200 bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-[14px] font-semibold">Create Post</h2>
            <p className="mt-1 text-[9px] text-slate-400">
              Create a new social planner post.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 p-5">
          <div>
            <label className="mb-1.5 block text-[10px] font-semibold text-slate-600">
              Post title
            </label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title..."
              className="h-9 w-full rounded-md border border-slate-200 px-3 text-[10px] outline-none focus:border-blue-400"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Platform">
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="h-9 w-full rounded-md border border-slate-200 px-3 text-[10px] outline-none"
              >
                <option>Facebook</option>
                <option>Instagram</option>
              </select>
            </Field>

            <Field label="Content type">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="h-9 w-full rounded-md border border-slate-200 px-3 text-[10px] outline-none"
              >
                <option>Image</option>
                <option>Video</option>
                <option>Text</option>
              </select>
            </Field>

            <Field label="Date">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-9 w-full rounded-md border border-slate-200 px-3 text-[10px] outline-none"
              />
            </Field>

            <Field label="Time">
              <input
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="h-9 w-full rounded-md border border-slate-200 px-3 text-[10px] outline-none"
              />
            </Field>
          </div>

          <div>
            <label className="mb-1.5 block text-[10px] font-semibold text-slate-600">
              Status
            </label>

            <div className="flex gap-2">
              {["Draft", "Scheduled"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setStatus(item)}
                  className={`rounded-md px-3 py-2 text-[9px] font-medium ${
                    status === item
                      ? "bg-blue-600 text-white"
                      : "border border-slate-200 text-slate-500"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-200 px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="h-8 rounded-md border border-slate-200 px-3 text-[10px] font-medium text-slate-600"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={!title.trim()}
            className="h-8 rounded-md bg-blue-600 px-4 text-[10px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
}

/* ============================================================
   POST DETAILS MODAL
============================================================ */

function PostDetailsModal({
  post,
  onClose,
  onDelete,
  onDuplicate,
  onNotify,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4">
      <div className="w-full max-w-[450px] rounded-xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div className="flex items-center gap-2">
            <PlatformBadge platform={post.platform} />

            <div>
              <div className="text-[12px] font-semibold">{post.platform}</div>
              <div className="text-[8px] text-slate-400">{post.status}</div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5">
          <h2 className="text-[14px] font-semibold text-slate-700">
            {post.title}
          </h2>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Detail label="Date" value={post.date} />
            <Detail label="Time" value={post.time} />
            <Detail label="Content type" value={post.type} />
            <Detail label="Status" value={post.status} />
          </div>

          <div className="mt-5 rounded-lg border border-slate-100 bg-slate-50 p-4">
            <div className="text-[9px] font-semibold text-slate-500">
              Content preview
            </div>

            <div className="mt-3 flex h-[100px] items-center justify-center rounded-md border border-dashed border-slate-200 bg-white">
              {post.type === "Image" && (
                <ImageIcon className="h-6 w-6 text-slate-300" />
              )}

              {post.type === "Video" && (
                <Video className="h-6 w-6 text-slate-300" />
              )}

              {post.type === "Text" && (
                <FileText className="h-6 w-6 text-slate-300" />
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4">
          <button
            onClick={() => onDelete(post.id)}
            className="text-[10px] font-medium text-red-500 hover:text-red-600"
          >
            Delete
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => onDuplicate(post)}
              className="h-8 rounded-md border border-slate-200 px-3 text-[10px] font-medium text-slate-600 hover:bg-slate-50"
            >
              Duplicate
            </button>

            <button
              onClick={() => {
                onNotify("Post editor opened");
                onClose();
              }}
              className="h-8 rounded-md bg-blue-600 px-4 text-[10px] font-semibold text-white hover:bg-blue-700"
            >
              Edit Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SMALL COMPONENTS
============================================================ */

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-semibold text-slate-600">
        {label}
      </label>

      {children}
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="rounded-md border border-slate-100 bg-slate-50 p-3">
      <div className="text-[8px] uppercase text-slate-400">{label}</div>
      <div className="mt-1 text-[10px] font-medium text-slate-700">
        {value}
      </div>
    </div>
  );
}

/* ============================================================
   CALENDAR HELPERS
============================================================ */

function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const previousMonthDays = new Date(year, month, 0).getDate();

  const days = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({
      date: previousMonthDays - i,
      currentMonth: false,
      today: false,
    });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const today =
      year === 2026 &&
      month === 7 &&
      i === 15;

    days.push({
      date: i,
      currentMonth: true,
      today,
    });
  }

  let nextDay = 1;

  while (days.length < 42) {
    days.push({
      date: nextDay,
      currentMonth: false,
      today: false,
    });

    nextDay++;
  }

  return days;
}

function formatDate(year, month, day) {
  const date = new Date(year, month, day);

  return formatFullDate(date);
}

function formatFullDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}