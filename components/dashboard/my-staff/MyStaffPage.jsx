"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  Users,
  X,
  UserRound,
  Mail,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function MyStaffPage() {
  const [staff, setStaff] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const [showModal, setShowModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Staff",
  });

  const filteredStaff = useMemo(() => {
    return staff.filter((member) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        member.name.toLowerCase().includes(searchValue) ||
        member.email.toLowerCase().includes(searchValue);

      const matchesRole =
        roleFilter === "all" || member.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [staff, search, roleFilter]);

  const openAddModal = () => {
    setEditingStaff(null);
    setForm({
      name: "",
      email: "",
      role: "Staff",
    });
    setShowModal(true);
  };

  const openEditModal = (member) => {
    setEditingStaff(member);
    setForm({
      name: member.name,
      email: member.email,
      role: member.role,
    });
    setOpenMenu(null);
    setShowModal(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      return;
    }

    if (editingStaff) {
      setStaff((current) =>
        current.map((member) =>
          member.id === editingStaff.id
            ? {
                ...member,
                name: form.name.trim(),
                email: form.email.trim(),
                role: form.role,
              }
            : member
        )
      );
    } else {
      const newStaff = {
        id: Date.now(),
        name: form.name.trim(),
        email: form.email.trim(),
        role: form.role,
      };

      setStaff((current) => [newStaff, ...current]);
    }

    setShowModal(false);
    setEditingStaff(null);
  };

  const handleDelete = (id) => {
    setOpenMenu(null);
    setStaff((current) =>
      current.filter((member) => member.id !== id)
    );
  };

  return (
    <div className="h-full min-h-0 w-full overflow-y-auto bg-slate-50">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-5 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#171B3A]">
              My Staff
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your staff members and their access.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus size={17} />
            Add Staff
          </button>
        </div>

        {/* TOOLBAR */}
        <div className="mb-4 rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {/* SEARCH */}
            <div className="relative w-full md:max-w-sm">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search staff..."
                className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* FILTER */}
            <select
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.target.value)}
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none focus:border-blue-500"
            >
              <option value="all">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Staff">Staff</option>
            </select>
          </div>
        </div>

        {/* STAFF TABLE */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Staff Member
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Email
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Role
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="w-16 px-4 py-3"></th>
                </tr>
              </thead>

              <tbody>
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((member) => (
                    <tr
                      key={member.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                    >
                      {/* NAME */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                            <UserRound size={17} />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-[#171B3A]">
                              {member.name}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* EMAIL */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Mail size={15} />
                          {member.email}
                        </div>
                      </td>

                      {/* ROLE */}
                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                          {member.role}
                        </span>
                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                          <CheckCircle2 size={14} />
                          Active
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="relative px-4 py-4">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenu(
                              openMenu === member.id
                                ? null
                                : member.id
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        >
                          <MoreHorizontal size={18} />
                        </button>

                        {openMenu === member.id && (
                          <div className="absolute right-4 top-12 z-20 w-36 rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
                            <button
                              type="button"
                              onClick={() =>
                                openEditModal(member)
                              }
                              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs font-semibold text-slate-600 hover:bg-slate-50"
                            >
                              <Pencil size={14} />
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(member.id)
                              }
                              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs font-semibold text-red-600 hover:bg-red-50"
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>
                      <div className="flex min-h-[360px] flex-col items-center justify-center px-5 text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                          <Users size={25} />
                        </div>

                        <h3 className="mt-4 text-sm font-bold text-[#171B3A]">
                          No staff members
                        </h3>

                        <p className="mt-1 max-w-sm text-xs leading-5 text-slate-400">
                          Staff members added to your account will
                          appear here.
                        </p>

                        {!search && roleFilter === "all" && (
                          <button
                            type="button"
                            onClick={openAddModal}
                            className="mt-4 inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-4 text-xs font-semibold text-white hover:bg-blue-700"
                          >
                            <Plus size={15} />
                            Add Staff
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
          <span>
            {filteredStaff.length} staff member
            {filteredStaff.length !== 1 ? "s" : ""}
          </span>

          <span>
            Staff management
          </span>
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowModal(false);
            }
          }}
        >
          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h2 className="text-base font-bold text-[#171B3A]">
                  {editingStaff ? "Edit Staff" : "Add Staff"}
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  {editingStaff
                    ? "Update staff member details."
                    : "Add a new staff member."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={17} />
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 p-5">
                {/* NAME */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Name
                  </label>

                  <div className="relative">
                    <UserRound
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      value={form.name}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          name: event.target.value,
                        })
                      }
                      placeholder="Enter staff name"
                      className="h-10 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Email
                  </label>

                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          email: event.target.value,
                        })
                      }
                      placeholder="Enter email address"
                      className="h-10 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                {/* ROLE */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Role
                  </label>

                  <div className="relative">
                    <ShieldCheck
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <select
                      value={form.role}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          role: event.target.value,
                        })
                      }
                      className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Staff">Staff</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* MODAL FOOTER */}
              <div className="flex justify-end gap-2 border-t border-slate-100 px-5 py-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="h-10 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  {editingStaff ? "Save Changes" : "Add Staff"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}