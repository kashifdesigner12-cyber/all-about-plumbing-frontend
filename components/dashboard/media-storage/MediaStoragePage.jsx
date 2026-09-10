"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  Upload,
  ChevronDown,
  Search,
  Grid2X2,
  List,
  MoreVertical,
  Folder,
  FolderPlus,
  Image as ImageIcon,
  File,
  FileText,
  FileVideo,
  FileAudio,
  FileArchive,
  Cloud,
  Sparkles,
  HardDrive,
  X,
  Check,
  Trash2,
  Download,
  Eye,
  Copy,
  Plus,
} from "lucide-react";

export default function MediaStoragePage() {
  const fileInputRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Modified: Newest First");
  const [fileType, setFileType] = useState("All");

  const [viewMode, setViewMode] = useState("grid");

  const [sourceOpen, setSourceOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const [modal, setModal] = useState(null);

  const [folderName, setFolderName] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);

  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);

    window.clearTimeout(window.__mediaToastTimer);

    window.__mediaToastTimer = window.setTimeout(() => {
      setToast("");
    }, 2200);
  };

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.previewUrl) {
          URL.revokeObjectURL(file.previewUrl);
        }
      });
    };
  }, []);

  const getFileCategory = (file) => {
    if (!file?.type) return "Other";

    if (file.type.startsWith("image/")) {
      return "Images";
    }

    if (file.type.startsWith("video/")) {
      return "Videos";
    }

    if (file.type.startsWith("audio/")) {
      return "Audio";
    }

    if (
      file.type.includes("pdf") ||
      file.type.includes("document") ||
      file.type.includes("text") ||
      file.type.includes("word")
    ) {
      return "Documents";
    }

    return "Other";
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 KB";

    const units = ["Bytes", "KB", "MB", "GB"];

    const index = Math.min(
      Math.floor(Math.log(bytes) / Math.log(1024)),
      units.length - 1
    );

    return `${(bytes / Math.pow(1024, index)).toFixed(
      index === 0 ? 0 : 1
    )} ${units[index]}`;
  };

  const formatDate = (date) => {
    if (!date) return "";

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
    setSourceOpen(false);
  };

  const handleFilesSelected = (event) => {
    const selected = Array.from(event.target.files || []);

    if (!selected.length) return;

    const preparedFiles = selected.map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()}`,
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      category: getFileCategory(file),
      modifiedAt: new Date(),
      previewUrl: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
    }));

    setFiles((current) => [...preparedFiles, ...current]);

    showToast(
      `${preparedFiles.length} file${
        preparedFiles.length > 1 ? "s" : ""
      } added`
    );

    event.target.value = "";
  };

  const createFolder = () => {
    const trimmed = folderName.trim();

    if (!trimmed) {
      showToast("Enter a folder name");
      return;
    }

    setFolders((current) => [
      ...current,
      {
        id: `${trimmed}-${Date.now()}`,
        name: trimmed,
        createdAt: new Date(),
      },
    ]);

    setFolderName("");
    setModal(null);

    showToast("Folder created");
  };

  const deleteFile = (id) => {
    setFiles((current) => {
      const target = current.find((item) => item.id === id);

      if (target?.previewUrl) {
        URL.revokeObjectURL(target.previewUrl);
      }

      return current.filter((item) => item.id !== id);
    });

    setSelectedFile(null);
    showToast("File removed");
  };

  const copyFileName = async (name) => {
    try {
      await navigator.clipboard.writeText(name);
      showToast("File name copied");
    } catch {
      showToast("Unable to copy");
    }
  };

  const downloadFile = (item) => {
    if (!item?.file) return;

    const url = URL.createObjectURL(item.file);

    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = item.name;

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    URL.revokeObjectURL(url);

    showToast("Download started");
  };

  const filteredFiles = useMemo(() => {
    let result = [...files];

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((file) =>
        file.name.toLowerCase().includes(query)
      );
    }

    if (fileType !== "All") {
      result = result.filter(
        (file) => file.category === fileType
      );
    }

    if (sortBy === "Name: A-Z") {
      result.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    if (sortBy === "Name: Z-A") {
      result.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    }

    if (sortBy === "Modified: Newest First") {
      result.sort(
        (a, b) =>
          new Date(b.modifiedAt) -
          new Date(a.modifiedAt)
      );
    }

    if (sortBy === "Modified: Oldest First") {
      result.sort(
        (a, b) =>
          new Date(a.modifiedAt) -
          new Date(b.modifiedAt)
      );
    }

    if (sortBy === "Size: Largest First") {
      result.sort((a, b) => b.size - a.size);
    }

    if (sortBy === "Size: Smallest First") {
      result.sort((a, b) => a.size - b.size);
    }

    return result;
  }, [files, search, fileType, sortBy]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-white text-[#26344d]">

      {/* =====================================================
          HIDDEN FILE INPUT
      ====================================================== */}

      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFilesSelected}
      />


      {/* =====================================================
          PAGE
      ====================================================== */}

      <main className="min-h-screen flex-1 overflow-y-auto overflow-x-hidden bg-white">

        <div className="mx-auto w-full max-w-[1280px] px-6 pb-12 pt-5">

          {/* =================================================
              HEADER
          ================================================== */}

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <h1 className="text-[26px] font-medium tracking-[-0.6px] text-[#111827]">
              Media Storage
            </h1>


            <div className="flex flex-wrap items-center gap-2">

              {/* CANVA */}

              <button
                type="button"
                onClick={() => {
                  setModal("canva");
                }}
                className="flex h-[34px] items-center gap-2 rounded-md border border-[#dfe4ea] bg-white px-3 text-[10px] font-medium text-[#334155] shadow-sm transition hover:bg-[#f8fafc] active:scale-[0.98]"
              >
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-[#00c4cc] via-[#7d2ae8] to-[#ff7262]">
                  <span className="text-[7px] font-bold text-white">
                    C
                  </span>
                </div>

                Connect Canva
              </button>


              {/* DRIVE */}

              <button
                type="button"
                onClick={() => {
                  setModal("drive");
                }}
                className="flex h-[34px] items-center gap-2 rounded-md border border-[#dfe4ea] bg-white px-3 text-[10px] font-medium text-[#334155] shadow-sm transition hover:bg-[#f8fafc] active:scale-[0.98]"
              >
                <HardDrive
                  size={14}
                  className="text-[#4285f4]"
                />

                Connect Drive
              </button>


              {/* AI */}

              <button
                type="button"
                onClick={() =>
                  showToast(
                    "AI media tools are ready for integration"
                  )
                }
                className="flex h-[34px] w-[34px] items-center justify-center rounded-md border border-[#dfe4ea] bg-white text-[#7c3aed] shadow-sm hover:bg-[#faf5ff]"
                title="AI tools"
              >
                <Sparkles size={15} />
              </button>


              {/* NEW FOLDER */}

              <button
                type="button"
                onClick={() => setModal("folder")}
                className="flex h-[34px] w-[34px] items-center justify-center rounded-md border border-[#dfe4ea] bg-white text-[#475569] shadow-sm hover:bg-[#f8fafc]"
                title="New folder"
              >
                <FolderPlus size={15} />
              </button>


              {/* UPLOAD */}

              <div className="relative">

                <button
                  type="button"
                  onClick={() =>
                    setSourceOpen((value) => !value)
                  }
                  className="flex h-[34px] items-center gap-2 rounded-md bg-[#2563eb] px-3 text-[10px] font-semibold text-white shadow-sm transition hover:bg-[#1d4ed8] active:scale-[0.98]"
                >
                  <Upload size={14} />

                  Upload

                  <ChevronDown size={12} />
                </button>


                {sourceOpen && (
                  <Dropdown className="right-0 top-[40px]">

                    <DropdownButton
                      icon={Upload}
                      label="Upload from computer"
                      onClick={handleUploadClick}
                    />

                    <DropdownButton
                      icon={HardDrive}
                      label="Import from Drive"
                      onClick={() => {
                        setSourceOpen(false);
                        setModal("drive");
                      }}
                    />

                    <DropdownButton
                      icon={ImageIcon}
                      label="Import from Canva"
                      onClick={() => {
                        setSourceOpen(false);
                        setModal("canva");
                      }}
                    />

                  </Dropdown>
                )}

              </div>


              {/* MORE */}

              <div className="relative">

                <button
                  type="button"
                  onClick={() =>
                    setMoreOpen((value) => !value)
                  }
                  className="flex h-[34px] w-[34px] items-center justify-center rounded-md border border-[#dfe4ea] bg-white text-[#475569] shadow-sm hover:bg-[#f8fafc]"
                  title="More"
                >
                  <MoreVertical size={15} />
                </button>


                {moreOpen && (
                  <Dropdown className="right-0 top-[40px]">

                    <DropdownButton
                      icon={FolderPlus}
                      label="Create folder"
                      onClick={() => {
                        setMoreOpen(false);
                        setModal("folder");
                      }}
                    />

                    <DropdownButton
                      icon={Check}
                      label="Select all"
                      onClick={() => {
                        setMoreOpen(false);
                        showToast(
                          files.length
                            ? `${files.length} files available`
                            : "No files to select"
                        );
                      }}
                    />

                    <DropdownButton
                      icon={Upload}
                      label="Upload files"
                      onClick={() => {
                        setMoreOpen(false);
                        handleUploadClick();
                      }}
                    />

                  </Dropdown>
                )}

              </div>

            </div>

          </div>


          {/* =================================================
              TOOLBAR
          ================================================== */}

          <div className="mt-7 flex flex-col gap-3 xl:flex-row xl:items-center">

            {/* MEDIA SELECT */}

            <div className="relative">

              <button
                type="button"
                onClick={() =>
                  showToast("My Media selected")
                }
                className="flex h-[31px] min-w-[185px] items-center justify-between rounded-md border border-[#dfe4ea] bg-white px-3 text-[10px] text-[#475569]"
              >
                <span>My Media</span>

                <ChevronDown size={13} />
              </button>

            </div>


            {/* SEARCH */}

            <div className="flex h-[31px] min-w-0 flex-1 items-center gap-2 rounded-md border border-[#dfe4ea] px-3">

              <Search
                size={13}
                className="shrink-0 text-[#94a3b8]"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search media or explore stock images."
                className="w-full bg-transparent text-[10px] text-[#334155] outline-none placeholder:text-[#94a3b8]"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="text-[#94a3b8] hover:text-[#475569]"
                >
                  <X size={13} />
                </button>
              )}

            </div>


            {/* SORT */}

            <div className="relative">

              <button
                type="button"
                onClick={() =>
                  setSortOpen((value) => !value)
                }
                className="flex h-[31px] min-w-[150px] items-center justify-between gap-2 rounded-md border border-[#dfe4ea] bg-white px-3 text-[10px] text-[#475569]"
              >
                <span>{sortBy}</span>

                <ChevronDown size={13} />
              </button>


              {sortOpen && (
                <Dropdown className="right-0 top-[37px]">

                  {[
                    "Modified: Newest First",
                    "Modified: Oldest First",
                    "Name: A-Z",
                    "Name: Z-A",
                    "Size: Largest First",
                    "Size: Smallest First",
                  ].map((item) => (
                    <DropdownButton
                      key={item}
                      label={item}
                      active={sortBy === item}
                      onClick={() => {
                        setSortBy(item);
                        setSortOpen(false);
                      }}
                    />
                  ))}

                </Dropdown>
              )}

            </div>


            {/* TYPE */}

            <div className="relative">

              <button
                type="button"
                onClick={() =>
                  setTypeOpen((value) => !value)
                }
                className="flex h-[31px] min-w-[120px] items-center justify-between gap-2 rounded-md border border-[#dfe4ea] bg-white px-3 text-[10px] text-[#475569]"
              >
                <span>{fileType}</span>

                <ChevronDown size={13} />
              </button>


              {typeOpen && (
                <Dropdown className="right-0 top-[37px]">

                  {[
                    "All",
                    "Images",
                    "Videos",
                    "Audio",
                    "Documents",
                    "Other",
                  ].map((item) => (
                    <DropdownButton
                      key={item}
                      label={item}
                      active={fileType === item}
                      onClick={() => {
                        setFileType(item);
                        setTypeOpen(false);
                      }}
                    />
                  ))}

                </Dropdown>
              )}

            </div>


            {/* VIEW */}

            <div className="flex h-[31px] shrink-0 overflow-hidden rounded-md border border-[#dfe4ea]">

              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex w-[34px] items-center justify-center ${
                  viewMode === "grid"
                    ? "bg-[#f1f5f9] text-[#2563eb]"
                    : "bg-white text-[#64748b]"
                }`}
                title="Grid view"
              >
                <Grid2X2 size={14} />
              </button>


              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`flex w-[34px] items-center justify-center border-l border-[#dfe4ea] ${
                  viewMode === "list"
                    ? "bg-[#f1f5f9] text-[#2563eb]"
                    : "bg-white text-[#64748b]"
                }`}
                title="List view"
              >
                <List size={14} />
              </button>

            </div>

          </div>


          {/* =================================================
              FOLDERS
          ================================================== */}

          <div className="mt-6">

            <div className="flex items-center gap-2 text-[10px] font-medium text-[#475569]">
              Folders
              <ChevronDown
                size={12}
                className="-rotate-90"
              />
            </div>


            {folders.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">

                {folders.map((folder) => (
                  <button
                    key={folder.id}
                    type="button"
                    onClick={() =>
                      showToast(
                        `${folder.name} selected`
                      )
                    }
                    className="flex items-center gap-2 rounded-md border border-[#e2e8f0] bg-white px-3 py-2 text-[10px] hover:bg-[#f8fafc]"
                  >
                    <Folder
                      size={14}
                      className="text-[#64748b]"
                    />

                    {folder.name}
                  </button>
                ))}

              </div>
            )}

          </div>


          {/* =================================================
              FILES TITLE
          ================================================== */}

          <div className="mt-8">

            <div className="mb-4 text-[11px] font-medium text-[#475569]">
              Files
            </div>


            {/* =================================================
                EMPTY STATE
            ================================================== */}

            {filteredFiles.length === 0 && (
              <EmptyState
                search={search}
                fileType={fileType}
                onUpload={handleUploadClick}
                onClear={() => {
                  setSearch("");
                  setFileType("All");
                }}
              />
            )}


            {/* =================================================
                GRID
            ================================================== */}

            {filteredFiles.length > 0 &&
              viewMode === "grid" && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

                  {filteredFiles.map((item) => (
                    <MediaGridCard
                      key={item.id}
                      item={item}
                      onOpen={() => setSelectedFile(item)}
                      onDownload={() =>
                        downloadFile(item)
                      }
                      onDelete={() =>
                        deleteFile(item.id)
                      }
                    />
                  ))}

                </div>
              )}


            {/* =================================================
                LIST
            ================================================== */}

            {filteredFiles.length > 0 &&
              viewMode === "list" && (
                <div className="overflow-hidden rounded-md border border-[#dfe4ea]">

                  <div className="grid grid-cols-[minmax(0,1fr)_130px_130px_80px] border-b border-[#dfe4ea] bg-[#f8fafc] px-4 py-2.5 text-[9px] font-medium text-[#64748b]">

                    <span>Name</span>
                    <span>Type</span>
                    <span>Modified</span>
                    <span>Size</span>

                  </div>


                  {filteredFiles.map((item) => (
                    <MediaListRow
                      key={item.id}
                      item={item}
                      onOpen={() =>
                        setSelectedFile(item)
                      }
                      onDownload={() =>
                        downloadFile(item)
                      }
                      onDelete={() =>
                        deleteFile(item.id)
                      }
                    />
                  ))}

                </div>
              )}

          </div>

        </div>

      </main>


      {/* =====================================================
          TOAST
      ====================================================== */}

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[9999] flex -translate-x-1/2 items-center gap-2 rounded-lg bg-[#171b3a] px-4 py-2.5 text-[11px] font-medium text-white shadow-xl">

          <Check size={14} />

          {toast}

        </div>
      )}


      {/* =====================================================
          MODALS
      ====================================================== */}

      {modal === "folder" && (
        <Modal
          title="Create folder"
          onClose={() => {
            setModal(null);
            setFolderName("");
          }}
        >

          <div className="p-5">

            <label
              htmlFor="folder-name"
              className="mb-2 block text-[10px] font-semibold text-[#334155]"
            >
              Folder name
            </label>

            <input
              id="folder-name"
              autoFocus
              value={folderName}
              onChange={(event) =>
                setFolderName(event.target.value)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  createFolder();
                }
              }}
              placeholder="Enter folder name"
              className="h-10 w-full rounded-md border border-[#dfe4ea] px-3 text-[11px] outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100"
            />

          </div>


          <ModalFooter
            onCancel={() => {
              setModal(null);
              setFolderName("");
            }}
            onSubmit={createFolder}
            submitText="Create folder"
          />

        </Modal>
      )}


      {modal === "canva" && (
        <Modal
          title="Connect Canva"
          onClose={() => setModal(null)}
        >

          <div className="p-5">

            <div className="rounded-lg bg-[#f8fafc] p-4">

              <div className="flex gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">

                  <span className="text-[13px] font-bold text-[#7c3aed]">
                    C
                  </span>

                </div>

                <div>

                  <h3 className="text-[11px] font-semibold">
                    Canva connection
                  </h3>

                  <p className="mt-1 text-[10px] leading-4 text-[#64748b]">
                    The Canva connection interface is
                    ready on the frontend. The actual
                    account connection will be handled
                    when the backend integration is added.
                  </p>

                </div>

              </div>

            </div>

          </div>


          <ModalFooter
            onCancel={() => setModal(null)}
            onSubmit={() => {
              setModal(null);
              showToast("Canva connection selected");
            }}
            submitText="Continue"
          />

        </Modal>
      )}


      {modal === "drive" && (
        <Modal
          title="Connect Drive"
          onClose={() => setModal(null)}
        >

          <div className="p-5">

            <div className="rounded-lg bg-[#f8fafc] p-4">

              <div className="flex gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">

                  <HardDrive
                    size={17}
                    className="text-[#4285f4]"
                  />

                </div>

                <div>

                  <h3 className="text-[11px] font-semibold">
                    Google Drive connection
                  </h3>

                  <p className="mt-1 text-[10px] leading-4 text-[#64748b]">
                    Drive connection is prepared for
                    backend integration. No external
                    account or fake files are used here.
                  </p>

                </div>

              </div>

            </div>

          </div>


          <ModalFooter
            onCancel={() => setModal(null)}
            onSubmit={() => {
              setModal(null);
              showToast("Drive connection selected");
            }}
            submitText="Continue"
          />

        </Modal>
      )}


      {/* =====================================================
          FILE PREVIEW MODAL
      ====================================================== */}

      {selectedFile && (
        <Modal
          title={selectedFile.name}
          onClose={() => setSelectedFile(null)}
        >

          <div className="p-5">

            <div className="overflow-hidden rounded-lg border border-[#e2e8f0] bg-[#f8fafc]">

              {selectedFile.previewUrl ? (
                <img
                  src={selectedFile.previewUrl}
                  alt={selectedFile.name}
                  className="max-h-[360px] w-full object-contain"
                />
              ) : (
                <div className="flex h-[220px] items-center justify-center">
                  <FileIcon
                    type={selectedFile.type}
                    size={48}
                  />
                </div>
              )}

            </div>


            <div className="mt-4 grid grid-cols-2 gap-3">

              <InfoItem
                label="Type"
                value={selectedFile.category}
              />

              <InfoItem
                label="Size"
                value={formatFileSize(selectedFile.size)}
              />

              <InfoItem
                label="Modified"
                value={formatDate(
                  selectedFile.modifiedAt
                )}
              />

              <InfoItem
                label="Name"
                value={selectedFile.name}
              />

            </div>

          </div>


          <div className="flex flex-wrap justify-end gap-2 border-t border-[#e5e7eb] bg-[#f8fafc] px-5 py-3">

            <button
              type="button"
              onClick={() =>
                copyFileName(selectedFile.name)
              }
              className="flex h-8 items-center gap-2 rounded-md border border-[#dfe4ea] bg-white px-3 text-[10px] text-[#475569]"
            >
              <Copy size={12} />
              Copy name
            </button>


            <button
              type="button"
              onClick={() => downloadFile(selectedFile)}
              className="flex h-8 items-center gap-2 rounded-md bg-[#2563eb] px-3 text-[10px] font-semibold text-white"
            >
              <Download size={12} />
              Download
            </button>

          </div>

        </Modal>
      )}

    </div>
  );
}


/* ============================================================
   EMPTY STATE
============================================================ */

function EmptyState({
  search,
  fileType,
  onUpload,
  onClear,
}) {
  const hasFilters = search || fileType !== "All";

  return (
    <div className="flex min-h-[390px] flex-col items-center justify-center rounded-lg border border-dashed border-[#d7dee8] bg-[#fbfcfe] px-5 text-center">

      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#eef4ff] text-[#2563eb]">

        <ImageIcon size={23} />

      </div>


      <h3 className="mt-4 text-[13px] font-semibold text-[#334155]">
        {hasFilters
          ? "No media found"
          : "No media files yet"}
      </h3>


      <p className="mt-1 max-w-[360px] text-[10px] leading-5 text-[#94a3b8]">
        {hasFilters
          ? "Try changing your search or file type filter."
          : "Upload your media files to start building your media library."}
      </p>


      <div className="mt-5 flex items-center gap-2">

        {hasFilters && (
          <button
            type="button"
            onClick={onClear}
            className="h-9 rounded-md border border-[#dfe4ea] bg-white px-4 text-[10px] font-medium text-[#475569] hover:bg-[#f8fafc]"
          >
            Clear filters
          </button>
        )}


        <button
          type="button"
          onClick={onUpload}
          className="flex h-9 items-center gap-2 rounded-md bg-[#2563eb] px-4 text-[10px] font-semibold text-white hover:bg-[#1d4ed8]"
        >
          <Upload size={13} />
          Upload media
        </button>

      </div>

    </div>
  );
}


/* ============================================================
   GRID CARD
============================================================ */

function MediaGridCard({
  item,
  onOpen,
  onDownload,
  onDelete,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="group relative overflow-hidden rounded-lg border border-[#dfe4ea] bg-white">

      <button
        type="button"
        onClick={onOpen}
        className="block w-full text-left"
      >

        <div className="flex h-[165px] items-center justify-center overflow-hidden bg-[#f1f5f9]">

          {item.previewUrl ? (
            <img
              src={item.previewUrl}
              alt={item.name}
              className="h-full w-full object-cover transition duration-200 group-hover:scale-[1.02]"
            />
          ) : (
            <FileIcon
              type={item.type}
              size={42}
            />
          )}

        </div>


        <div className="border-t border-[#e5e7eb] px-3 py-2.5">

          <p
            className="truncate text-[9px] font-medium text-[#334155]"
            title={item.name}
          >
            {item.name}
          </p>

          <p className="mt-1 text-[8px] text-[#94a3b8]">
            {formatSizeShort(item.size)}
          </p>

        </div>

      </button>


      <div className="absolute right-2 top-2">

        <button
          type="button"
          onClick={() =>
            setMenuOpen((value) => !value)
          }
          className="flex h-7 w-7 items-center justify-center rounded-md bg-white/95 text-[#475569] opacity-0 shadow-sm transition group-hover:opacity-100"
        >
          <MoreVertical size={14} />
        </button>


        {menuOpen && (
          <div className="absolute right-0 top-8 z-20 w-[140px] rounded-md border border-[#dfe4ea] bg-white p-1 shadow-xl">

            <SmallMenuButton
              icon={Eye}
              label="Open"
              onClick={onOpen}
            />

            <SmallMenuButton
              icon={Download}
              label="Download"
              onClick={onDownload}
            />

            <SmallMenuButton
              icon={Trash2}
              label="Delete"
              danger
              onClick={onDelete}
            />

          </div>
        )}

      </div>

    </div>
  );
}


/* ============================================================
   LIST ROW
============================================================ */

function MediaListRow({
  item,
  onOpen,
  onDownload,
  onDelete,
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_130px_130px_80px] items-center border-b border-[#e5e7eb] px-4 py-3 last:border-b-0 hover:bg-[#f8fafc]">

      <button
        type="button"
        onClick={onOpen}
        className="flex min-w-0 items-center gap-3 text-left"
      >

        <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#f1f5f9]">

          {item.previewUrl ? (
            <img
              src={item.previewUrl}
              alt={item.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <FileIcon
              type={item.type}
              size={17}
            />
          )}

        </div>


        <span className="truncate text-[10px] font-medium text-[#334155]">
          {item.name}
        </span>

      </button>


      <span className="text-[9px] text-[#64748b]">
        {item.category}
      </span>


      <span className="text-[9px] text-[#64748b]">
        {formatDate(item.modifiedAt)}
      </span>


      <div className="flex items-center gap-1">

        <button
          type="button"
          onClick={onDownload}
          className="flex h-7 w-7 items-center justify-center rounded-md text-[#64748b] hover:bg-[#eef4ff] hover:text-[#2563eb]"
          title="Download"
        >
          <Download size={13} />
        </button>


        <button
          type="button"
          onClick={onDelete}
          className="flex h-7 w-7 items-center justify-center rounded-md text-[#64748b] hover:bg-[#fef2f2] hover:text-[#dc2626]"
          title="Delete"
        >
          <Trash2 size={13} />
        </button>

      </div>

    </div>
  );
}


/* ============================================================
   FILE ICON
============================================================ */

function FileIcon({
  type,
  size = 24,
}) {
  if (type?.startsWith("image/")) {
    return (
      <ImageIcon
        size={size}
        className="text-[#2563eb]"
      />
    );
  }

  if (type?.startsWith("video/")) {
    return (
      <FileVideo
        size={size}
        className="text-[#7c3aed]"
      />
    );
  }

  if (type?.startsWith("audio/")) {
    return (
      <FileAudio
        size={size}
        className="text-[#db2777]"
      />
    );
  }

  if (
    type?.includes("pdf") ||
    type?.includes("document") ||
    type?.includes("word")
  ) {
    return (
      <FileText
        size={size}
        className="text-[#ef4444]"
      />
    );
  }

  if (
    type?.includes("zip") ||
    type?.includes("rar") ||
    type?.includes("compressed")
  ) {
    return (
      <FileArchive
        size={size}
        className="text-[#f59e0b]"
      />
    );
  }

  return (
    <File
      size={size}
      className="text-[#64748b]"
    />
  );
}


/* ============================================================
   FORMAT SIZE
============================================================ */

function formatSizeShort(bytes) {
  if (!bytes) return "0 KB";

  const mb = bytes / 1024 / 1024;

  if (mb >= 1) {
    return `${mb.toFixed(1)} MB`;
  }

  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}


/* ============================================================
   DROPDOWN
============================================================ */

function Dropdown({
  children,
  className = "",
}) {
  return (
    <div
      className={`absolute z-[100] min-w-[190px] rounded-lg border border-[#dfe4ea] bg-white p-1.5 shadow-xl ${className}`}
    >
      {children}
    </div>
  );
}


/* ============================================================
   DROPDOWN BUTTON
============================================================ */

function DropdownButton({
  icon: Icon,
  label,
  onClick,
  active = false,
  danger = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-left text-[10px] transition ${
        danger
          ? "text-[#dc2626] hover:bg-[#fef2f2]"
          : active
          ? "bg-[#eef4ff] text-[#2563eb]"
          : "text-[#475569] hover:bg-[#f8fafc]"
      }`}
    >
      {Icon && <Icon size={13} />}

      {label}
    </button>
  );
}


/* ============================================================
   SMALL MENU BUTTON
============================================================ */

function SmallMenuButton({
  icon: Icon,
  label,
  onClick,
  danger = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[9px] ${
        danger
          ? "text-[#dc2626] hover:bg-[#fef2f2]"
          : "text-[#475569] hover:bg-[#f8fafc]"
      }`}
    >
      <Icon size={12} />

      {label}
    </button>
  );
}


/* ============================================================
   MODAL
============================================================ */

function Modal({
  title,
  onClose,
  children,
}) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/35 px-4"
      onClick={onClose}
    >

      <div
        className="w-full max-w-[460px] overflow-hidden rounded-xl bg-white shadow-2xl"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        <div className="flex h-[52px] items-center justify-between border-b border-[#e5e7eb] px-5">

          <h2 className="text-[13px] font-semibold text-[#26344d]">
            {title}
          </h2>


          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-md text-[#64748b] hover:bg-[#f1f5f9]"
          >
            <X size={15} />
          </button>

        </div>


        {children}

      </div>

    </div>
  );
}


/* ============================================================
   MODAL FOOTER
============================================================ */

function ModalFooter({
  onCancel,
  onSubmit,
  submitText,
}) {
  return (
    <div className="flex justify-end gap-2 border-t border-[#e5e7eb] bg-[#f8fafc] px-5 py-3">

      <button
        type="button"
        onClick={onCancel}
        className="h-8 rounded-md border border-[#dfe4ea] bg-white px-4 text-[10px] font-medium text-[#475569] hover:bg-[#f8fafc]"
      >
        Cancel
      </button>


      <button
        type="button"
        onClick={onSubmit}
        className="h-8 rounded-md bg-[#2563eb] px-4 text-[10px] font-semibold text-white hover:bg-[#1d4ed8]"
      >
        {submitText}
      </button>

    </div>
  );
}


/* ============================================================
   INFO ITEM
============================================================ */

function InfoItem({
  label,
  value,
}) {
  return (
    <div className="rounded-md bg-[#f8fafc] p-3">

      <p className="text-[8px] uppercase tracking-wide text-[#94a3b8]">
        {label}
      </p>

      <p
        className="mt-1 truncate text-[10px] font-medium text-[#475569]"
        title={value}
      >
        {value}
      </p>

    </div>
  );
}