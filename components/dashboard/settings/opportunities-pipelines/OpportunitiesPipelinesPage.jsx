"use client";

import { useEffect, useRef, useState } from "react";
import {
  GitBranch,
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

export default function OpportunitiesPipelinesPage() {
  const [pipelines, setPipelines] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState("down");
  const [editingPipeline, setEditingPipeline] = useState(null);
  const [pipelineName, setPipelineName] = useState("");

  const menuRef = useRef(null);

  const filteredPipelines = pipelines.filter((pipeline) =>
    pipeline.name.toLowerCase().includes(search.toLowerCase())
  );

  /* =========================================================
     CLOSE MENU ON OUTSIDE CLICK
  ========================================================= */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  /* =========================================================
     CREATE MODAL
  ========================================================= */

  const openCreateModal = () => {
    setEditingPipeline(null);
    setPipelineName("");
    setShowModal(true);
    setOpenMenu(null);
  };

  /* =========================================================
     EDIT MODAL
  ========================================================= */

  const openEditModal = (pipeline) => {
    setEditingPipeline(pipeline);
    setPipelineName(pipeline.name);
    setShowModal(true);
    setOpenMenu(null);
  };

  /* =========================================================
     CLOSE MODAL
  ========================================================= */

  const closeModal = () => {
    setShowModal(false);
    setEditingPipeline(null);
    setPipelineName("");
  };

  /* =========================================================
     CREATE / UPDATE PIPELINE
  ========================================================= */

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = pipelineName.trim();

    if (!name) return;

    if (editingPipeline) {
      setPipelines((current) =>
        current.map((pipeline) =>
          pipeline.id === editingPipeline.id
            ? {
                ...pipeline,
                name,
              }
            : pipeline
        )
      );
    } else {
      setPipelines((current) => [
        ...current,
        {
          id: Date.now(),
          name,
          stages: 0,
        },
      ]);
    }

    closeModal();
  };

  /* =========================================================
     DELETE PIPELINE
  ========================================================= */

  const handleDelete = (id) => {
    setPipelines((current) =>
      current.filter((pipeline) => pipeline.id !== id)
    );

    setOpenMenu(null);
  };

  /* =========================================================
     OPEN THREE DOT MENU
  ========================================================= */

  const toggleMenu = (event, id) => {
    event.stopPropagation();

    if (openMenu === id) {
      setOpenMenu(null);
      return;
    }

    const buttonRect = event.currentTarget.getBoundingClientRect();

    const spaceBelow = window.innerHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;

    /*
      Menu height approximately 90px.
      If there isn't enough room below,
      open it above the button.
    */

    if (spaceBelow < 130 && spaceAbove > 130) {
      setMenuPosition("up");
    } else {
      setMenuPosition("down");
    }

    setOpenMenu(id);
  };

  return (
    <div className="h-full min-h-0 w-full overflow-y-auto overflow-x-hidden bg-slate-50">
      <div className="w-full px-4 pb-12 pt-4 sm:px-5 lg:px-6 xl:px-8">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-400">
            <span>Settings</span>
            <span>/</span>

            <span className="text-slate-600">
              Opportunities & Pipelines
            </span>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#171B3A] sm:text-3xl">
                Opportunities & Pipelines
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage your opportunity pipelines and stages.
              </p>
            </div>

            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
            >
              <Plus size={17} />
              Add Pipeline
            </button>
          </div>
        </div>

        {/* =====================================================
            MAIN CARD
        ===================================================== */}

        <section className="overflow-visible rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* TOOLBAR */}

          <div className="flex flex-col gap-4 rounded-t-2xl border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#171B3A]">
                Pipelines
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Create and manage your opportunity pipelines.
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search pipelines..."
                className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              />
            </div>
          </div>

          {/* ===================================================
              EMPTY STATE
          =================================================== */}

          {filteredPipelines.length === 0 ? (
            <div className="flex min-h-[360px] flex-col items-center justify-center px-5 py-12 text-center">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <GitBranch size={21} />
              </div>

              <h3 className="mt-4 text-sm font-bold text-[#171B3A]">
                {search
                  ? "No pipelines found"
                  : "No pipelines yet"}
              </h3>

              <p className="mt-1 max-w-sm text-xs leading-5 text-slate-400">
                {search
                  ? "Try a different search term."
                  : "Create your first pipeline to start organizing opportunities."}
              </p>

              {!search && (
                <button
                  type="button"
                  onClick={openCreateModal}
                  className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-xs font-bold text-white transition hover:bg-blue-700"
                >
                  <Plus size={16} />
                  Create Pipeline
                </button>
              )}
            </div>
          ) : (
            /* =================================================
               PIPELINE LIST
            ================================================= */

            <div className="divide-y divide-slate-100">

              {filteredPipelines.map((pipeline) => (
                <div
                  key={pipeline.id}
                  className="relative flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-slate-50"
                >

                  {/* PIPELINE INFO */}

                  <div className="flex min-w-0 items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <GitBranch size={18} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-[#171B3A]">
                        {pipeline.name}
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        {pipeline.stages} stages
                      </p>
                    </div>
                  </div>

                  {/* =================================================
                     THREE DOT ACTION MENU
                  ================================================= */}

                  <div
                    ref={
                      openMenu === pipeline.id
                        ? menuRef
                        : null
                    }
                    className="relative shrink-0"
                  >

                    <button
                      type="button"
                      aria-label="Pipeline options"
                      onClick={(event) =>
                        toggleMenu(event, pipeline.id)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {openMenu === pipeline.id && (
                      <div
                        className={`absolute right-0 z-[60] w-40 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl ${
                          menuPosition === "up"
                            ? "bottom-10"
                            : "top-10"
                        }`}
                      >

                        {/* EDIT */}

                        <button
                          type="button"
                          onClick={() =>
                            openEditModal(pipeline)
                          }
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Pencil size={14} />
                          Edit
                        </button>

                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(pipeline.id)
                          }
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* =====================================================
            PIPELINE STAGES
        ===================================================== */}

        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div>
            <h2 className="text-sm font-bold text-[#171B3A]">
              Pipeline Stages
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              Pipeline stages can be configured here when the
              backend data is connected.
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

            <div className="rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50/30">
              <p className="text-xs font-semibold text-slate-500">
                Opportunity
              </p>

              <p className="mt-1 text-sm font-bold text-[#171B3A]">
                Pipeline management
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50/30">
              <p className="text-xs font-semibold text-slate-500">
                Stages
              </p>

              <p className="mt-1 text-sm font-bold text-[#171B3A]">
                Stage configuration
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50/30">
              <p className="text-xs font-semibold text-slate-500">
                Backend
              </p>

              <p className="mt-1 text-sm font-bold text-[#171B3A]">
                Ready for integration
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* =======================================================
          MODAL
      ======================================================= */}

      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >

          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* MODAL HEADER */}

            <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">

              <div>
                <h2 className="text-base font-bold text-[#171B3A]">
                  {editingPipeline
                    ? "Edit Pipeline"
                    : "Add Pipeline"}
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  {editingPipeline
                    ? "Update the pipeline name."
                    : "Create a new opportunity pipeline."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close modal"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={17} />
              </button>
            </div>

            {/* FORM */}

            <form onSubmit={handleSubmit}>

              <div className="p-5">

                <label className="mb-2 block text-xs font-semibold text-slate-700">
                  Pipeline Name
                </label>

                <input
                  autoFocus
                  type="text"
                  value={pipelineName}
                  onChange={(event) =>
                    setPipelineName(event.target.value)
                  }
                  placeholder="Enter pipeline name"
                  className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                />
              </div>

              {/* MODAL FOOTER */}

              <div className="flex justify-end gap-2 border-t border-slate-100 px-5 py-4">

                <button
                  type="button"
                  onClick={closeModal}
                  className="h-10 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!pipelineName.trim()}
                  className="h-10 rounded-xl bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {editingPipeline
                    ? "Save Changes"
                    : "Create Pipeline"}
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}