"use client";

import { useMemo, useState } from "react";
import {
  Search,
  MoreVertical,
  Heart,
  Reply,
  CheckCircle2,
  X,
  Send,
  Trash2,
  EyeOff,
  Check,
  MessageCircle,
  Plus,
} from "lucide-react";

export default function CommentsPage() {
  /*
   * ============================================================
   * FRONTEND ONLY
   * ============================================================
   *
   * No fake/demo comments are used here.
   *
   * Later, backend integration should populate this state from:
   *
   * GET /api/marketing/social-planner/comments
   *
   * Expected comment shape:
   *
   * {
   *   id,
   *   name,
   *   text,
   *   post,
   *   time,
   *   platform,
   *   replied,
   *   liked
   * }
   *
   * For now the list intentionally starts empty.
   */

  const [comments, setComments] = useState([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState(null);
  const [replyComment, setReplyComment] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);
  const [toast, setToast] = useState("");

  const filteredComments = useMemo(() => {
    return comments.filter((comment) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        !query ||
        String(comment.name || "")
          .toLowerCase()
          .includes(query) ||
        String(comment.text || "")
          .toLowerCase()
          .includes(query) ||
        String(comment.post || "")
          .toLowerCase()
          .includes(query);

      const matchesFilter =
        filter === "All" ||
        (filter === "Replied" && comment.replied) ||
        (filter === "Needs Reply" && !comment.replied);

      return matchesSearch && matchesFilter;
    });
  }, [comments, search, filter]);

  function showToast(message) {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2200);
  }

  function toggleLike(id) {
    setComments((current) =>
      current.map((comment) =>
        comment.id === id
          ? {
              ...comment,
              liked: !comment.liked,
            }
          : comment
      )
    );
  }

  function submitReply() {
    if (!replyComment || !replyText.trim()) return;

    /*
     * Backend integration later:
     *
     * POST /api/marketing/social-planner/comments/:id/reply
     *
     * For frontend-only mode we only update the local UI state.
     */

    setComments((current) =>
      current.map((comment) =>
        comment.id === replyComment.id
          ? {
              ...comment,
              replied: true,
            }
          : comment
      )
    );

    setReplyComment(null);
    setReplyText("");

    showToast("Reply marked successfully");
  }

  function markAsReplied(id) {
    setComments((current) =>
      current.map((comment) =>
        comment.id === id
          ? {
              ...comment,
              replied: true,
            }
          : comment
      )
    );

    setOpenMenu(null);
    showToast("Comment marked as replied");
  }

  function markAsUnread(id) {
    setComments((current) =>
      current.map((comment) =>
        comment.id === id
          ? {
              ...comment,
              replied: false,
            }
          : comment
      )
    );

    setOpenMenu(null);
    showToast("Comment marked as needing reply");
  }

  function removeComment(id) {
    /*
     * Backend integration later:
     *
     * DELETE /api/marketing/social-planner/comments/:id
     */

    setComments((current) =>
      current.filter((comment) => comment.id !== id)
    );

    setOpenMenu(null);
    showToast("Comment removed from this view");
  }

  function handleTab(item) {
    const routes = {
      Planner: "/dashboard/marketing/social-planner",
      Content: "/dashboard/marketing/social-planner/content",
      Comments: "/dashboard/marketing/social-planner/comments",
      Statistics: "/dashboard/marketing/social-planner/statistics",
      "Social Listening":
        "/dashboard/marketing/social-planner/social-listening",
      Settings: "/dashboard/marketing/social-planner/settings",
    };

    if (item === "Comments") return;

    /*
     * Use normal browser navigation here so this component
     * doesn't require another dependency.
     */
    window.location.href = routes[item];
  }

  return (
    <div
      className="min-h-screen bg-[#f5f6f8] text-[#26344d]"
      onClick={() => setOpenMenu(null)}
    >
      {/* ========================================================
          HEADER
      ======================================================== */}

      <header className="border-b border-slate-200 bg-white">
        <div className="flex h-[55px] items-center gap-6 px-5">
          <strong className="text-[14px]">Marketing</strong>

          <span className="border-b-2 border-blue-600 py-5 text-[11px] font-medium text-blue-600">
            Social Planner
          </span>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setShowNewPost(true);
            }}
            className="ml-auto flex h-8 items-center gap-1.5 rounded-md bg-blue-600 px-3 text-[11px] font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus className="h-3.5 w-3.5" />
            New Post
          </button>
        </div>

        {/* ======================================================
            SOCIAL PLANNER NAV
        ====================================================== */}

        <div className="flex h-[39px] items-center gap-6 overflow-x-auto border-t border-slate-100 px-5">
          <strong className="whitespace-nowrap text-[13px]">
            Social Planner
          </strong>

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
              type="button"
              onClick={() => handleTab(item)}
              className={`whitespace-nowrap text-[11px] transition ${
                item === "Comments"
                  ? "font-medium text-blue-600"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </header>

      {/* ========================================================
          MAIN
      ======================================================== */}

      <main className="p-4">
        <div className="mx-auto max-w-[1200px]">
          <div className="rounded-lg border border-slate-200 bg-white">
            {/* ==================================================
                PAGE HEADER
            ================================================== */}

            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 p-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <MessageCircle className="h-4 w-4" />
                  </div>

                  <div>
                    <h1 className="text-[15px] font-semibold">
                      Comments
                    </h1>

                    <p className="mt-1 text-[10px] text-slate-400">
                      Monitor and respond to social media comments.
                    </p>
                  </div>
                </div>
              </div>

              {/* SEARCH */}

              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search comments"
                  className="h-8 w-[230px] rounded-md border border-slate-200 bg-white pl-8 pr-3 text-[10px] outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                />
              </div>
            </div>

            {/* ==================================================
                FILTER BAR
            ================================================== */}

            <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-4 py-3">
              <span className="mr-1 text-[9px] font-semibold uppercase tracking-wide text-slate-400">
                Filter
              </span>

              {["All", "Needs Reply", "Replied"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={`rounded-md px-2.5 py-1.5 text-[9px] font-medium transition ${
                    filter === item
                      ? "bg-blue-600 text-white"
                      : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {item}
                </button>
              ))}

              <div className="ml-auto text-[9px] text-slate-400">
                {filteredComments.length} comments
              </div>
            </div>

            {/* ==================================================
                COMMENTS
            ================================================== */}

            {filteredComments.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {filteredComments.map((comment) => (
                  <CommentRow
                    key={comment.id}
                    comment={comment}
                    openMenu={openMenu}
                    setOpenMenu={setOpenMenu}
                    onLike={toggleLike}
                    onReply={setReplyComment}
                    onMarkReplied={markAsReplied}
                    onMarkUnread={markAsUnread}
                    onRemove={removeComment}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                search={search}
                filter={filter}
                onClear={() => {
                  setSearch("");
                  setFilter("All");
                }}
              />
            )}
          </div>
        </div>
      </main>

      {/* ========================================================
          REPLY MODAL
      ======================================================== */}

      {replyComment && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4"
          onClick={() => setReplyComment(null)}
        >
          <div
            className="w-full max-w-[480px] rounded-xl border border-slate-200 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h2 className="text-[13px] font-semibold">
                  Reply to comment
                </h2>

                <p className="mt-1 text-[9px] text-slate-400">
                  Write your response below.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setReplyComment(null)}
                className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-5">
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="text-[10px] font-semibold text-slate-700">
                  {replyComment.name}
                </div>

                <p className="mt-1 text-[10px] leading-5 text-slate-500">
                  {replyComment.text}
                </p>
              </div>

              <textarea
                value={replyText}
                onChange={(event) => setReplyText(event.target.value)}
                placeholder="Write a reply..."
                rows={4}
                className="mt-4 w-full resize-none rounded-md border border-slate-200 p-3 text-[10px] outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
              />
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-200 px-5 py-4">
              <button
                type="button"
                onClick={() => setReplyComment(null)}
                className="h-8 rounded-md border border-slate-200 px-3 text-[10px] font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={submitReply}
                disabled={!replyText.trim()}
                className="flex h-8 items-center gap-1.5 rounded-md bg-blue-600 px-4 text-[10px] font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="h-3 w-3" />
                Reply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          NEW POST MODAL
      ======================================================== */}

      {showNewPost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4"
          onClick={() => setShowNewPost(false)}
        >
          <div
            className="w-full max-w-[420px] rounded-xl border border-slate-200 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h2 className="text-[13px] font-semibold">
                  Create New Post
                </h2>

                <p className="mt-1 text-[9px] text-slate-400">
                  Continue in the Social Planner.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowNewPost(false)}
                className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-5">
              <p className="text-[10px] leading-5 text-slate-500">
                Post creation belongs to the Social Planner composer.
                This comments page does not create a fake post or
                fake social account.
              </p>

              <button
                type="button"
                onClick={() => {
                  setShowNewPost(false);
                  window.location.href =
                    "/dashboard/marketing/social-planner";
                }}
                className="mt-4 h-9 w-full rounded-md bg-blue-600 text-[10px] font-semibold text-white hover:bg-blue-700"
              >
                Open Social Planner
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TOAST
      ======================================================== */}

      {toast && (
        <div className="fixed bottom-5 right-5 z-[100] flex items-center gap-2 rounded-lg bg-[#171b3a] px-4 py-3 text-[10px] font-medium text-white shadow-xl">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          {toast}
        </div>
      )}
    </div>
  );
}

/* ==============================================================
   COMMENT ROW
============================================================== */

function CommentRow({
  comment,
  openMenu,
  setOpenMenu,
  onLike,
  onReply,
  onMarkReplied,
  onMarkUnread,
  onRemove,
}) {
  const initials = String(comment.name || "User")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative flex gap-4 p-4 transition hover:bg-slate-50">
      {/* AVATAR */}

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-semibold text-slate-600">
        {initials || "U"}
      </div>

      {/* CONTENT */}

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <strong className="text-[11px] text-slate-700">
            {comment.name || "Unknown user"}
          </strong>

          <PlatformIcon platform={comment.platform} />

          <span className="text-[9px] text-slate-400">
            {comment.time || ""}
          </span>

          {comment.replied && (
            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[8px] font-medium text-emerald-600">
              <CheckCircle2 className="h-2.5 w-2.5" />
              Replied
            </span>
          )}
        </div>

        <p className="mt-1 text-[11px] leading-5 text-slate-600">
          {comment.text}
        </p>

        {comment.post && (
          <div className="mt-2 rounded-md bg-slate-50 px-2 py-1.5 text-[9px] text-slate-400">
            Post: {comment.post}
          </div>
        )}

        <div className="mt-3 flex items-center gap-4">
          {/* LIKE */}

          <button
            type="button"
            onClick={() => onLike(comment.id)}
            className={`flex items-center gap-1 text-[10px] transition ${
              comment.liked
                ? "text-red-500"
                : "text-slate-500 hover:text-red-500"
            }`}
          >
            <Heart
              className={`h-3 w-3 ${
                comment.liked ? "fill-current" : ""
              }`}
            />

            {comment.liked ? "Liked" : "Like"}
          </button>

          {/* REPLY */}

          <button
            type="button"
            onClick={() => onReply(comment)}
            className="flex items-center gap-1 text-[10px] text-slate-500 transition hover:text-blue-600"
          >
            <Reply className="h-3 w-3" />
            Reply
          </button>

          {/* STATUS */}

          {!comment.replied && (
            <button
              type="button"
              onClick={() => onMarkReplied(comment.id)}
              className="flex items-center gap-1 text-[10px] text-slate-500 transition hover:text-emerald-600"
            >
              <Check className="h-3 w-3" />
              Mark replied
            </button>
          )}
        </div>
      </div>

      {/* MORE */}

      <div className="relative shrink-0">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setOpenMenu(
              openMenu === comment.id ? null : comment.id
            );
          }}
          className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100"
        >
          <MoreVertical className="h-4 w-4" />
        </button>

        {openMenu === comment.id && (
          <div
            onClick={(event) => event.stopPropagation()}
            className="absolute right-0 top-8 z-20 w-[160px] rounded-lg border border-slate-200 bg-white p-1 shadow-lg"
          >
            {comment.replied ? (
              <button
                type="button"
                onClick={() => onMarkUnread(comment.id)}
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[9px] text-slate-600 hover:bg-slate-50"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Needs reply
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onMarkReplied(comment.id)}
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[9px] text-slate-600 hover:bg-slate-50"
              >
                <Check className="h-3.5 w-3.5" />
                Mark replied
              </button>
            )}

            <button
              type="button"
              onClick={() => onRemove(comment.id)}
              className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[9px] text-red-500 hover:bg-red-50"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Remove
            </button>

            <button
              type="button"
              onClick={() => setOpenMenu(null)}
              className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[9px] text-slate-500 hover:bg-slate-50"
            >
              <EyeOff className="h-3.5 w-3.5" />
              Close menu
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ==============================================================
   PLATFORM ICON
============================================================== */

function PlatformIcon({ platform }) {
  if (String(platform).toLowerCase() === "facebook") {
    return <Facebook className="h-3 w-3 text-blue-600" />;
  }

  if (String(platform).toLowerCase() === "instagram") {
    return <Instagram className="h-3 w-3 text-pink-500" />;
  }

  return <MessageCircle className="h-3 w-3 text-slate-400" />;
}

/* ==============================================================
   EMPTY STATE
============================================================== */

function EmptyState({ search, filter, onClear }) {
  const hasFilters = Boolean(search || filter !== "All");

  return (
    <div className="flex min-h-[380px] flex-col items-center justify-center px-5 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-300">
        <MessageCircle className="h-5 w-5" />
      </div>

      <h2 className="mt-4 text-[12px] font-semibold text-slate-600">
        {hasFilters ? "No comments found" : "No comments available"}
      </h2>

      <p className="mt-1 max-w-[350px] text-[9px] leading-5 text-slate-400">
        {hasFilters
          ? "No comments match the current search or filter. Try changing your filters."
          : "Comments from connected social accounts will appear here once they are available from the backend."}
      </p>

      {hasFilters && (
        <button
          type="button"
          onClick={onClear}
          className="mt-4 h-8 rounded-md border border-slate-200 bg-white px-3 text-[9px] font-medium text-slate-600 hover:bg-slate-50"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}