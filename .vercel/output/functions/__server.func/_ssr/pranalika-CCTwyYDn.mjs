import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as useSdsp } from "./dates-Ca_zgasn.mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { T as Bookmark, n as Upload, u as Plus } from "../_libs/lucide-react.mjs";
import { g as Button, o as Route$6, u as Input } from "./router-D_kLnrs4.mjs";
import { t as Textarea } from "./textarea-D98aYrIy.mjs";
import { t as MediaViewer } from "./media-viewer-BJBZwI6Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pranalika-CCTwyYDn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PranalikaBoard({ initialId }) {
	const procedures = useSdsp((s) => s.procedures.filter((p) => !p.archived));
	const add = useSdsp((s) => s.addProcedure);
	const upsert = useSdsp((s) => s.upsertProcedure);
	const saveVersion = useSdsp((s) => s.saveProcedureVersion);
	const ingest = useSdsp((s) => s.ingestFiles);
	const nitya = useSdsp((s) => s.nitya);
	const files = useSdsp((s) => s.files);
	const [activeId, setActiveId] = (0, import_react.useState)(initialId ?? procedures[0]?.id);
	const [q, setQ] = (0, import_react.useState)("");
	const [viewer, setViewer] = (0, import_react.useState)(null);
	const active = procedures.find((p) => p.id === activeId) ?? procedures[0];
	const visible = procedures.filter((p) => {
		if (!q) return true;
		return `${p.title} ${p.body} ${p.notes} ${p.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase());
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-semibold",
					children: "Seva Pranalika"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Written procedures, versions, and original PDFs. Uploaded documents are never rewritten."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: async () => {
						const p = await add();
						setActiveId(p.id);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " New procedure"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				placeholder: "Search procedures, tags, notes",
				value: q,
				onChange: (e) => setQ(e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-[260px_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "space-y-2",
					children: visible.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: `w-full rounded-xl px-3 py-2 text-left ${p.id === active?.id ? "bg-primary text-primary-foreground" : "glass"}`,
						onClick: () => setActiveId(p.id),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2 text-sm font-medium",
							children: [p.bookmarked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: p.title
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[11px] opacity-70",
							children: ["v", p.version]
						})]
					}, p.id))
				}), active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: active.title,
							onChange: (e) => void upsert({
								...active,
								title: e.target.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							className: "min-h-56",
							value: active.body,
							onChange: (e) => void upsert({
								...active,
								body: e.target.value,
								updatedAt: (/* @__PURE__ */ new Date()).toISOString()
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								onClick: () => void saveVersion(active.id, active.body),
								children: ["Save version ", active.version + 1]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: active.bookmarked ? "default" : "outline",
								onClick: () => void upsert({
									...active,
									bookmarked: !active.bookmarked
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-4" }), " Bookmark"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-sm",
							children: ["Assign to seva", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "mt-1 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm",
								value: active.sevaIds[0] ?? "",
								onChange: (e) => void upsert({
									...active,
									sevaIds: e.target.value ? [e.target.value] : []
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Unassigned"
								}), nitya.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: s.id,
									children: [
										s.name,
										" · ",
										s.nameEn
									]
								}, s.id))]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Tags",
							value: active.tags.join(", "),
							onChange: (e) => void upsert({
								...active,
								tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							placeholder: "Notes",
							value: active.notes,
							onChange: (e) => void upsert({
								...active,
								notes: e.target.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "inline-flex h-11 cursor-pointer items-center gap-2 rounded-lg border border-border px-4 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }),
								" Upload pranalika PDF or image",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "file",
									className: "sr-only",
									accept: ".pdf,.jpg,.jpeg,.png,.webp,.gif",
									multiple: true,
									onChange: (e) => {
										const list = e.target.files ? Array.from(e.target.files) : [];
										ingest(list, "folder_pranalika").then((created) => {
											upsert({
												...active,
												fileIds: [...active.fileIds, ...created.map((c) => c.id)]
											});
										});
										e.target.value = "";
									}
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-1",
							children: active.fileIds.map((id) => {
								const f = files.find((x) => x.id === id);
								if (!f) return null;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "text-sm text-primary",
									onClick: () => setViewer(f),
									children: f.name
								}) }, id);
							})
						}),
						active.versions.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
							className: "text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
								className: "cursor-pointer",
								children: "Version history"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-2 space-y-1 text-muted-foreground",
								children: active.versions.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									"v",
									v.version,
									" · ",
									new Date(v.createdAt).toLocaleString()
								] }, v.version))
							})]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Create a written procedure or upload a pranalika PDF."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaViewer, {
				file: viewer,
				onClose: () => setViewer(null)
			})
		]
	});
}
function PranalikaPage() {
	const { id } = Route$6.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PranalikaBoard, { initialId: id });
}
//#endregion
export { PranalikaPage as component };
