"use client";

import { useRef, useState } from "react";
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  Save,
  Plus,
  Trash2,
  X,
  CheckCircle2,
  Users,
  UserPlus,
  LockKeyhole,
  AlertCircle,
  Upload,
  Camera,
} from "lucide-react";

export default function MyProfilePage() {
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
  });

  const [profileImage, setProfileImage] = useState("");

  const [teamMembers, setTeamMembers] = useState([]);

  const [showAddUser, setShowAddUser] = useState(false);

  const [saved, setSaved] = useState(false);

  const [securityMessage, setSecurityMessage] = useState("");

  const [imageMessage, setImageMessage] = useState("");

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
  });

  /* =========================================================
     PROFILE
  ========================================================= */

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfile((current) => ({
      ...current,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleProfileSubmit = (event) => {
    event.preventDefault();

    /*
      FRONTEND ONLY

      Profile data is stored in React state for the current
      page session.

      No backend/API/database connection is being used yet.

      When backend integration is added later, this function
      will be replaced/extended with the real API request.
    */

    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 4000);
  };

  /* =========================================================
     PROFILE IMAGE
  ========================================================= */

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showImageMessage("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      showImageMessage("Image size must be less than 5 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setProfileImage(reader.result);
      showImageMessage("Profile photo uploaded successfully.");
    };

    reader.onerror = () => {
      showImageMessage("Unable to read the selected image.");
    };

    reader.readAsDataURL(file);

    event.target.value = "";
  };

  const showImageMessage = (message) => {
    setImageMessage(message);

    window.setTimeout(() => {
      setImageMessage("");
    }, 3500);
  };

  const handleRemovePhoto = () => {
    setProfileImage("");

    showImageMessage("Profile photo removed.");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /* =========================================================
     USER MANAGEMENT
  ========================================================= */

  const handleNewUserChange = (event) => {
    const { name, value } = event.target;

    setNewUser((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleAddUser = (event) => {
    event.preventDefault();

    const name = newUser.name.trim();
    const email = newUser.email.trim();

    if (!name || !email) return;

    const alreadyExists = teamMembers.some(
      (member) =>
        member.email.toLowerCase() === email.toLowerCase()
    );

    if (alreadyExists) return;

    setTeamMembers((current) => [
      ...current,
      {
        id: `${Date.now()}-${Math.random()}`,
        name,
        email,
      },
    ]);

    setNewUser({
      name: "",
      email: "",
    });

    setShowAddUser(false);
  };

  const removeUser = (id) => {
    setTeamMembers((current) =>
      current.filter((member) => member.id !== id)
    );
  };

  /* =========================================================
     HELPERS
  ========================================================= */

  const getInitials = (name) => {
    if (!name?.trim()) {
      return "U";
    }

    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  };

  const fullName =
    `${profile.firstName} ${profile.lastName}`.trim();

  const handleSecurityAction = (message) => {
    setSecurityMessage(message);

    window.setTimeout(() => {
      setSecurityMessage("");
    }, 3500);
  };

  return (
    <div className="h-full min-h-0 w-full overflow-y-auto overflow-x-hidden">
      <div className="w-full px-4 pb-10 pt-1 sm:px-5 lg:px-6 xl:px-8">

        {/* =====================================================
            PAGE HEADER
        ====================================================== */}

        <div className="mb-6">
          <div className="mb-2 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400 sm:text-sm">
            <span>Settings</span>

            <span>/</span>

            <span className="text-slate-600">
              My Profile
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-[#171B3A] sm:text-3xl">
            My Profile
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
            Manage your personal profile and dashboard access.
          </p>
        </div>

        {/* =====================================================
            SUCCESS MESSAGE
        ====================================================== */}

        {saved && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
            <CheckCircle2
              size={18}
              className="mt-0.5 shrink-0 text-emerald-600"
            />

            <div>
              <p className="text-sm font-semibold text-emerald-800">
                Profile changes saved
              </p>

              <p className="mt-0.5 text-xs text-emerald-700">
                Your profile has been temporarily saved for
                this page session.
              </p>
            </div>
          </div>
        )}

        {/* =====================================================
            IMAGE MESSAGE
        ====================================================== */}

        {imageMessage && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3">
            <Camera
              size={18}
              className="mt-0.5 shrink-0 text-blue-600"
            />

            <p className="text-sm font-medium text-blue-800">
              {imageMessage}
            </p>
          </div>
        )}

        {/* =====================================================
            SECURITY MESSAGE
        ====================================================== */}

        {securityMessage && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3">
            <ShieldCheck
              size={18}
              className="mt-0.5 shrink-0 text-blue-600"
            />

            <p className="text-sm font-medium text-blue-800">
              {securityMessage}
            </p>
          </div>
        )}

        {/* =====================================================
            MAIN FORM
        ====================================================== */}

        <form
          onSubmit={handleProfileSubmit}
          className="space-y-5"
        >

          {/* ===================================================
              PERSONAL INFORMATION
          ==================================================== */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <SectionHeader
              icon={User}
              title="Personal Information"
              description="Update the personal information associated with your profile."
            />

            <div className="p-5 sm:p-6">

              {/* PROFILE PHOTO */}

              <div className="mb-6 flex flex-col gap-5 border-b border-slate-100 pb-6 sm:flex-row sm:items-center">
                <div className="relative shrink-0">
                  <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-[#171B3A] text-2xl font-bold text-white ring-4 ring-slate-100">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      getInitials(fullName)
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    aria-label="Upload profile photo"
                    className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white shadow-sm transition hover:bg-blue-700"
                  >
                    <Camera size={14} />
                  </button>
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#171B3A]">
                    Profile Photo
                  </p>

                  <p className="mt-1 max-w-lg text-xs leading-5 text-slate-400">
                    Upload a profile photo. This preview is
                    temporary and will be removed after a page
                    refresh until the backend is connected.
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        fileInputRef.current?.click()
                      }
                      className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Upload size={14} />

                      {profileImage
                        ? "Change Photo"
                        : "Upload Photo"}
                    </button>

                    {profileImage && (
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    )}
                  </div>

                  <p className="mt-2 text-[11px] text-slate-400">
                    JPG, PNG or WEBP · Maximum 5 MB
                  </p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/jpg"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* PROFILE FIELDS */}

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <FormField
                  label="First Name"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleProfileChange}
                  placeholder="Enter first name"
                />

                <FormField
                  label="Last Name"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleProfileChange}
                  placeholder="Enter last name"
                />

                <FormField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  placeholder="Enter email address"
                  icon={Mail}
                />

                <FormField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  placeholder="Enter phone number"
                  icon={Phone}
                />

                <FormField
                  label="Job Title"
                  name="jobTitle"
                  value={profile.jobTitle}
                  onChange={handleProfileChange}
                  placeholder="Enter job title"
                />
              </div>
            </div>
          </section>

          {/* ===================================================
              SECURITY
          ==================================================== */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <SectionHeader
              icon={ShieldCheck}
              title="Security"
              description="Manage your account security settings."
            />

            <div className="divide-y divide-slate-100">
              <SecurityRow
                icon={LockKeyhole}
                title="Password"
                description="Update your account password."
                action="Change Password"
                onClick={() =>
                  handleSecurityAction(
                    "Password management will be connected to the backend later."
                  )
                }
              />

              <SecurityRow
                icon={Mail}
                title="Email Verification"
                description="Manage your email verification status."
                action="Manage"
                onClick={() =>
                  handleSecurityAction(
                    "Email verification will be connected to the backend later."
                  )
                }
              />
            </div>
          </section>

          {/* ===================================================
              DASHBOARD ACCESS
          ==================================================== */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <SectionHeader
              icon={Users}
              title="Dashboard Access"
              description="Add people who should be able to access this dashboard."
            />

            <div className="p-5 sm:p-6">
              <div className="mb-5 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
                <ShieldCheck
                  size={18}
                  className="mt-0.5 shrink-0 text-blue-600"
                />

                <div>
                  <p className="text-sm font-bold text-blue-900">
                    Give dashboard access
                  </p>

                  <p className="mt-1 text-xs leading-5 text-blue-700">
                    Add a user's name and email address to
                    prepare dashboard access. Account creation,
                    authentication, permissions and invitations
                    will be connected to the backend later.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAddUser(true)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                <UserPlus size={17} />
                Add User
              </button>

              {teamMembers.length > 0 ? (
                <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
                  <div className="hidden grid-cols-[1fr_1fr_auto] gap-4 border-b border-slate-100 bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-400 sm:grid">
                    <span>User</span>
                    <span>Email</span>
                    <span>Action</span>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {teamMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex flex-col gap-4 px-4 py-4 sm:grid sm:grid-cols-[1fr_1fr_auto] sm:items-center"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600">
                            {getInitials(member.name)}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-[#171B3A]">
                              {member.name}
                            </p>

                            <p className="truncate text-xs text-slate-400 sm:hidden">
                              {member.email}
                            </p>
                          </div>
                        </div>

                        <div className="hidden min-w-0 sm:block">
                          <p className="truncate text-sm text-slate-500">
                            {member.email}
                          </p>
                        </div>

                        <div>
                          <button
                            type="button"
                            onClick={() =>
                              removeUser(member.id)
                            }
                            className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={14} />
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-6 flex min-h-[190px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm">
                    <Users size={21} />
                  </div>

                  <h3 className="mt-4 text-sm font-bold text-[#171B3A]">
                    No additional users
                  </h3>

                  <p className="mt-1 max-w-md text-xs leading-5 text-slate-400">
                    Add a user by entering their name and email
                    address.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* ===================================================
              SAVE AREA
          ==================================================== */}

          <div className="flex flex-col gap-3 border-t border-slate-200 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-2 text-xs text-slate-400">
              <AlertCircle
                size={15}
                className="mt-0.5 shrink-0"
              />

              <span>
                Profile changes are temporarily stored on this
                page until the backend is connected.
              </span>
            </div>

            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700 active:translate-y-0"
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* =====================================================
          ADD USER MODAL
      ====================================================== */}

      {showAddUser && (
        <AddUserModal
          user={newUser}
          onChange={handleNewUserChange}
          onClose={() => {
            setShowAddUser(false);

            setNewUser({
              name: "",
              email: "",
            });
          }}
          onSubmit={handleAddUser}
        />
      )}
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

      <div className="min-w-0">
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
  icon: Icon,
}) {
  return (
    <div className="min-w-0">
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
      </div>
    </div>
  );
}

/* =========================================================
   SECURITY ROW
========================================================= */

function SecurityRow({
  icon: Icon,
  title,
  description,
  action,
  onClick,
}) {
  return (
    <div className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
          <Icon size={17} />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#171B3A]">
            {title}
          </p>

          <p className="mt-0.5 text-xs leading-5 text-slate-400">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onClick}
        className="inline-flex h-9 items-center justify-center self-start rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 sm:self-auto"
      >
        {action}
      </button>
    </div>
  );
}

/* =========================================================
   ADD USER MODAL
========================================================= */

function AddUserModal({
  user,
  onChange,
  onClose,
  onSubmit,
}) {
  const isValid =
    user.name.trim().length > 0 &&
    user.email.trim().length > 0;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-slate-950/40 p-4 backdrop-blur-[2px] sm:items-center"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="my-4 flex max-h-[calc(100vh-2rem)] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:my-8 sm:max-h-[calc(100vh-4rem)]">

        {/* HEADER */}

        <div className="flex shrink-0 items-start justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <UserPlus size={19} />
            </div>

            <div className="min-w-0">
              <h2 className="text-base font-bold text-[#171B3A]">
                Add Dashboard User
              </h2>

              <p className="mt-0.5 text-xs text-slate-400">
                Enter the user's basic information.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>

        {/* BODY */}

        <form
          onSubmit={onSubmit}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-5 sm:p-6">

            <div className="rounded-xl border border-blue-100 bg-blue-50 p-3">
              <div className="flex gap-2.5">
                <ShieldCheck
                  size={17}
                  className="mt-0.5 shrink-0 text-blue-600"
                />

                <p className="text-xs leading-5 text-blue-700">
                  This adds the user to the frontend access
                  list. Real invitations, accounts and
                  permissions will be handled by the backend
                  later.
                </p>
              </div>
            </div>

            <FormField
              label="User Name"
              name="name"
              value={user.name}
              onChange={onChange}
              placeholder="Enter user's name"
            />

            <FormField
              label="Email Address"
              name="email"
              type="email"
              value={user.email}
              onChange={onChange}
              placeholder="user@example.com"
              icon={Mail}
            />
          </div>

          {/* FOOTER */}

          <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-slate-100 bg-white p-5 sm:flex-row sm:justify-end sm:p-6">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!isValid}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus size={17} />
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}