import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { D as formatBytes, E as cn, N as useSdsp } from "./dates-Ca_zgasn.mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { O as Archive, a as Star, f as List, h as Grid3x3, i as Trash2, l as Search, m as Heart, n as Upload, u as Plus, v as Copy } from "../_libs/lucide-react.mjs";
import { a as Root2, i as Portal2, n as Item2, o as Separator2, r as Label2, s as Trigger, t as Content2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { c as Route$10, g as Button, u as Input } from "./router-D_kLnrs4.mjs";
import { t as MediaViewer } from "./media-viewer-BJBZwI6Z.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-SG6HfCEu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/files-DXiYSBC5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 6, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 min-w-44 overflow-hidden rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-lg", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm outline-none select-none focus:bg-accent data-disabled:pointer-events-none data-disabled:opacity-50", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-border", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
	ref,
	className: cn("px-3 py-1.5 text-xs font-medium text-muted-foreground", className),
	...props
}));
DropdownMenuLabel.displayName = Label2.displayName;
function FileManager({ initialFolder, initialFile }) {
	const folders = useSdsp((s) => s.folders);
	const files = useSdsp((s) => s.files);
	const recents = useSdsp((s) => s.recents);
	const ingest = useSdsp((s) => s.ingestFiles);
	const addFolder = useSdsp((s) => s.addFolder);
	const renameFolder = useSdsp((s) => s.renameFolder);
	const renameFile = useSdsp((s) => s.renameFile);
	const moveFile = useSdsp((s) => s.moveFile);
	const copyFile = useSdsp((s) => s.copyFile);
	const archiveFile = useSdsp((s) => s.archiveFile);
	const removeFile = useSdsp((s) => s.removeFile);
	const toggleFavorite = useSdsp((s) => s.toggleFavoriteFile);
	const usage = useSdsp((s) => s.usage);
	const quota = useSdsp((s) => s.quota);
	const [folderId, setFolderId] = (0, import_react.useState)(initialFolder ?? "folder_root");
	const [view, setView] = (0, import_react.useState)("grid");
	const [q, setQ] = (0, import_react.useState)("");
	const [sort, setSort] = (0, import_react.useState)("name");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [viewer, setViewer] = (0, import_react.useState)(files.find((f) => f.id === initialFile) ?? null);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const children = folders.filter((f) => f.parentId === folderId && !f.archived);
	const listed = (0, import_react.useMemo)(() => {
		let rows = files.filter((f) => {
			if (filter === "archive") return f.archived;
			if (filter === "favorite") return f.favorite;
			if (f.archived) return false;
			if (f.folderId !== folderId && filter === "all") return false;
			if (filter === "pdf") return f.kind === "pdf";
			if (filter === "image") return f.kind === "image";
			return true;
		});
		if (q) rows = rows.filter((f) => f.name.toLowerCase().includes(q.toLowerCase()) || f.tags.some((t) => t.includes(q.toLowerCase())));
		rows = [...rows].sort((a, b) => {
			if (sort === "size") return b.size - a.size;
			if (sort === "date") return b.updatedAt.localeCompare(a.updatedAt);
			return a.name.localeCompare(b.name);
		});
		return rows;
	}, [
		files,
		folderId,
		q,
		sort,
		filter
	]);
	const crumbs = [];
	let cursor = folderId;
	while (cursor) {
		const f = folders.find((x) => x.id === cursor);
		if (!f) break;
		crumbs.unshift({
			id: f.id,
			name: f.name
		});
		cursor = f.parentId;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-semibold",
					children: "Files"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => void addFolder(folderId, "New folder"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Folder"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }),
							" Upload",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								className: "sr-only",
								accept: ".pdf,.jpg,.jpeg,.png,.webp,.gif,application/pdf,image/*",
								multiple: true,
								onChange: (e) => {
									const list = e.target.files ? Array.from(e.target.files) : [];
									ingest(list, folderId);
									e.target.value = "";
								}
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap items-center gap-2 text-sm",
				children: crumbs.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "hover:text-primary",
					onClick: () => setFolderId(c.id),
					children: [c.name, i < crumbs.length - 1 ? " /" : ""]
				}, c.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative min-w-48 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "pl-9",
							placeholder: "Search files and tags",
							value: q,
							onChange: (e) => setQ(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "h-11 rounded-lg border border-input bg-background px-3 text-sm",
						value: sort,
						onChange: (e) => setSort(e.target.value),
						"aria-label": "Sort",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "name",
								children: "Name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "date",
								children: "Recent"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "size",
								children: "Size"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "h-11 rounded-lg border border-input bg-background px-3 text-sm",
						value: filter,
						onChange: (e) => setFilter(e.target.value),
						"aria-label": "Filter",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "all",
								children: "All"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "pdf",
								children: "PDF"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "image",
								children: "Photos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "favorite",
								children: "Favorites"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "archive",
								children: "Archive"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: view === "grid" ? "secondary" : "ghost",
						size: "icon",
						onClick: () => setView("grid"),
						"aria-label": "Grid view",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid3x3, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: view === "list" ? "secondary" : "ghost",
						size: "icon",
						onClick: () => setView("list"),
						"aria-label": "List view",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { className: "size-4" })
					})
				]
			}),
			quota > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: [
					"Storage ",
					formatBytes(usage),
					" of ",
					formatBytes(quota)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border border-dashed border-border p-4 text-sm text-muted-foreground",
				onDragOver: (e) => e.preventDefault(),
				onDrop: (e) => {
					e.preventDefault();
					ingest(Array.from(e.dataTransfer.files), folderId);
				},
				children: "Drop PDFs or photographs here. Documents are stored locally and never rewritten."
			}),
			children.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4",
				children: children.map((folder) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "glass rounded-2xl p-4 text-left",
					onClick: () => setFolderId(folder.id),
					onDoubleClick: () => {
						const name = window.prompt("Rename folder", folder.name);
						if (name) renameFolder(folder.id, name);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: folder.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: folder.system ? "System" : "Custom"
					})]
				}, folder.id))
			}),
			filter === "all" && recents.filter((r) => r.kind === "file").length > 0 && folderId === "folder_root" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Recent files are listed under Recents in search."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn(view === "grid" ? "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" : "space-y-2"),
				children: listed.map((file) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: cn("glass rounded-2xl p-3", view === "list" && "flex items-center gap-3"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "min-w-0 flex-1 text-left",
						onClick: () => setViewer(file),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate font-medium",
							children: file.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								file.kind.toUpperCase(),
								" · ",
								formatBytes(file.size)
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "size-9",
							onClick: () => void toggleFavorite(file.id),
							"aria-label": "Favorite",
							children: file.favorite ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-4 fill-current" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "sm",
								children: "More"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
								onClick: () => {
									const name = window.prompt("Rename file", file.name);
									if (name) renameFile(file.id, name);
								},
								children: "Rename"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								onClick: () => void copyFile(file.id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), " Copy"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
								onClick: () => {
									const dest = window.prompt("Move to folder id", file.folderId);
									if (dest) moveFile(file.id, dest);
								},
								children: "Move"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								onClick: () => void archiveFile(file.id, !file.archived),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, { className: "size-4" }),
									" ",
									file.archived ? "Restore" : "Archive"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								onClick: () => setPendingDelete(file.id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), " Delete"]
							})
						] })] })]
					})]
				}, file.id))
			}),
			listed.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-10 text-center text-sm text-muted-foreground",
				children: "This folder is empty."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaViewer, {
				file: viewer,
				onClose: () => setViewer(null)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: Boolean(pendingDelete),
				onOpenChange: (o) => !o && setPendingDelete(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Delete this file?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "The file is removed from this device. This cannot be undone once the binary is cleared." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: () => {
						if (pendingDelete) removeFile(pendingDelete);
						setPendingDelete(null);
					},
					children: "Delete"
				})] })] })
			})
		]
	});
}
function FilesPage() {
	const { folder, file } = Route$10.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileManager, {
		initialFolder: folder,
		initialFile: file
	});
}
//#endregion
export { FilesPage as component };
