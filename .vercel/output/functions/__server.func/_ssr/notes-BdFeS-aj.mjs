import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as useSdsp } from "./dates-Ca_zgasn.mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as Trash2, u as Plus } from "../_libs/lucide-react.mjs";
import { g as Button, s as Route$8, u as Input } from "./router-D_kLnrs4.mjs";
import { t as Textarea } from "./textarea-D98aYrIy.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-SG6HfCEu.mjs";
import { t as Switch } from "./switch-D0IS70IA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notes-BdFeS-aj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NotesBoard({ initialId }) {
	const notes = useSdsp((s) => s.notes.filter((n) => !n.archived));
	const add = useSdsp((s) => s.addNote);
	const upsert = useSdsp((s) => s.upsertNote);
	const remove = useSdsp((s) => s.removeNote);
	const nitya = useSdsp((s) => s.nitya);
	const [activeId, setActiveId] = (0, import_react.useState)(initialId ?? notes[0]?.id);
	const [pending, setPending] = (0, import_react.useState)(null);
	const active = notes.find((n) => n.id === activeId) ?? notes[0];
	const save = (patch) => {
		if (!active) return;
		upsert({
			...active,
			...patch,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		});
	};
	const list = (0, import_react.useMemo)(() => notes, [notes]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-[240px_1fr]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl",
						children: "Notes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon",
						variant: "outline",
						"aria-label": "New note",
						onClick: async () => {
							const n = await add({ title: "New note" });
							setActiveId(n.id);
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
					})]
				}), list.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setActiveId(n.id),
					className: `w-full rounded-xl px-3 py-2 text-left text-sm ${n.id === active?.id ? "bg-primary text-primary-foreground" : "glass"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block truncate font-medium",
						children: n.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-[11px] opacity-70",
						children: n.private ? "Private" : "Shared on device"
					})]
				}, n.id))]
			}),
			active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: active.title,
						onChange: (e) => save({ title: e.target.value })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						className: "min-h-64",
						value: active.body,
						onChange: (e) => save({ body: e.target.value })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Tags, comma separated",
						value: active.tags.join(", "),
						onChange: (e) => save({ tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Link to seva"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "h-11 rounded-lg border border-input bg-background px-3 text-sm",
							value: active.sevaId ?? "",
							onChange: (e) => save({ sevaId: e.target.value || void 0 }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "None"
							}), nitya.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s.id,
								children: s.nameEn
							}, s.id))]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center justify-between rounded-xl bg-secondary/50 px-4 py-3 text-sm",
						children: ["Private personal note", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: active.private,
							onCheckedChange: (v) => save({ private: v })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "destructive",
						onClick: () => setPending(active.id),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), " Delete"]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Create a note to begin."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: Boolean(pending),
				onOpenChange: (o) => !o && setPending(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Delete this note?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "You can undo from the toast right after." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: () => {
						if (pending) remove(pending);
						setPending(null);
					},
					children: "Delete"
				})] })] })
			})
		]
	});
}
function NotesPage() {
	const { id } = Route$8.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotesBoard, { initialId: id });
}
//#endregion
export { NotesPage as component };
