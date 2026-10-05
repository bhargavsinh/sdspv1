import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as useSdsp, S as SEVA_FOLDER, s as isValidHHMM, x as REMINDER_PRESETS } from "./dates-Ca_zgasn.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as Button, n as Route, u as Input } from "./router-D_kLnrs4.mjs";
import { a as SelectTrigger, i as SelectItem, n as Select, o as SelectValue, r as SelectContent, t as Label } from "./select-B0Sipgqh.mjs";
import { t as Textarea } from "./textarea-D98aYrIy.mjs";
import { t as Switch } from "./switch-D0IS70IA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seva._id-zLOOW87J.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SevaEditor({ seva }) {
	const upsert = useSdsp((s) => s.upsertNitya);
	const ingest = useSdsp((s) => s.ingestFiles);
	const files = useSdsp((s) => s.files);
	const [draft, setDraft] = (0, import_react.useState)(seva);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const save = async () => {
		if (!isValidHHMM(draft.time)) return;
		await upsert({
			...draft,
			durationMin: Math.max(1, Number(draft.durationMin) || 1),
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		});
		setSaved(true);
		window.setTimeout(() => setSaved(false), 1600);
	};
	const toggleReminder = (mins) => {
		const has = draft.reminderOffsets.includes(mins);
		setDraft({
			...draft,
			reminderOffsets: has ? draft.reminderOffsets.filter((m) => m !== mins) : [...draft.reminderOffsets, mins].sort((a, b) => a - b)
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/seva",
						className: "text-muted-foreground hover:text-foreground",
						children: "Seva"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "px-2 text-muted-foreground",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "gu",
						children: draft.name
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Edit seva"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "name",
							children: "Seva name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "name",
							className: "gu",
							value: draft.name,
							onChange: (e) => setDraft({
								...draft,
								name: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "nameEn",
							children: "English name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "nameEn",
							value: draft.nameEn,
							onChange: (e) => setDraft({
								...draft,
								nameEn: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "time",
								children: "Time"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "time",
								type: "time",
								value: draft.time,
								onChange: (e) => setDraft({
									...draft,
									time: e.target.value
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "dur",
								children: "Duration (min)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "dur",
								type: "number",
								min: 1,
								value: draft.durationMin,
								onChange: (e) => setDraft({
									...draft,
									durationMin: Number(e.target.value)
								})
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Recurrence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: draft.recurrence.kind,
							onValueChange: (v) => setDraft({
								...draft,
								recurrence: { kind: v }
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
								"daily",
								"weekly",
								"monthly",
								"yearly",
								"none"
							].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: k,
								children: k
							}, k)) })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "desc",
							children: "Description"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "desc",
							value: draft.description,
							onChange: (e) => setDraft({
								...draft,
								description: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "ins",
							children: "Instructions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "ins",
							value: draft.instructions,
							onChange: (e) => setDraft({
								...draft,
								instructions: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "notes",
							children: "Notes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "notes",
							value: draft.notes,
							onChange: (e) => setDraft({
								...draft,
								notes: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-sm font-medium",
						children: "Reminders"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: REMINDER_PRESETS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: draft.reminderOffsets.includes(m) ? "default" : "outline",
							onClick: () => toggleReminder(m),
							children: m < 60 ? `${m} min` : "1 hour"
						}, m))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center justify-between gap-3 rounded-xl bg-secondary/50 px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm",
							children: "Enabled"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: draft.enabled,
							onCheckedChange: (v) => setDraft({
								...draft,
								enabled: v
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-sm font-medium",
							children: "Attachments"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "inline-flex h-11 cursor-pointer items-center rounded-lg border border-border px-4 text-sm",
							children: ["Attach PDF or photo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								multiple: true,
								className: "sr-only",
								accept: ".pdf,.jpg,.jpeg,.png,.webp,.gif",
								onChange: (e) => {
									const list = e.target.files ? Array.from(e.target.files) : [];
									const folder = SEVA_FOLDER[seva.id] ?? "folder_nitya";
									ingest(list, folder, { sevaId: seva.id }).then((created) => {
										setDraft((d) => ({
											...d,
											attachmentIds: [...d.attachmentIds, ...created.map((c) => c.id)]
										}));
									});
									e.target.value = "";
								}
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 space-y-1 text-sm",
							children: draft.attachmentIds.map((id) => {
								const f = files.find((x) => x.id === id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: f?.name ?? id }, id);
							})
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => void save(),
						children: saved ? "Saved" : "Save seva"
					})
				]
			})
		]
	});
}
function SevaDetail() {
	const { id } = Route.useParams();
	const seva = useSdsp((s) => s.nitya.find((x) => x.id === id));
	if (!seva) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-sm",
		children: ["Seva not found. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/seva",
			children: "Back to seva"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SevaEditor, { seva }, seva.id);
}
//#endregion
export { SevaDetail as component };
