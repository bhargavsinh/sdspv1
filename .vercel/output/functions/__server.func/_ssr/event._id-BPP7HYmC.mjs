import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { C as STATUS_LABEL, N as useSdsp, c as isValidISODate, s as isValidHHMM, v as GUJARATI_MONTHS, x as REMINDER_PRESETS } from "./dates-Ca_zgasn.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as Button, r as Route$1, u as Input } from "./router-D_kLnrs4.mjs";
import { a as SelectTrigger, i as SelectItem, n as Select, o as SelectValue, r as SelectContent, t as Label } from "./select-B0Sipgqh.mjs";
import { t as Textarea } from "./textarea-D98aYrIy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/event._id-BPP7HYmC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EventEditor({ event }) {
	const upsert = useSdsp((s) => s.upsertEvent);
	const remove = useSdsp((s) => s.removeEvent);
	const duplicate = useSdsp((s) => s.duplicateEvent);
	const ingest = useSdsp((s) => s.ingestFiles);
	const categories = useSdsp((s) => s.categories);
	const files = useSdsp((s) => s.files);
	const [draft, setDraft] = (0, import_react.useState)(event);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const save = async () => {
		if (!isValidISODate(draft.date) || !isValidHHMM(draft.startTime)) return;
		await upsert({
			...draft,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		});
		setSaved(true);
		window.setTimeout(() => setSaved(false), 1600);
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
					draft.title
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "Vishesh seva"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "title",
							children: "Title"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "title",
							value: draft.title,
							onChange: (e) => setDraft({
								...draft,
								title: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Category" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: draft.categoryId,
							onValueChange: (v) => setDraft({
								...draft,
								categoryId: v
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: categories.filter((c) => c.kind !== "nitya").map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
								value: c.id,
								children: [
									c.name,
									" · ",
									c.nameEn
								]
							}, c.id)) })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "date",
								children: "Date"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "date",
								type: "date",
								value: draft.date,
								onChange: (e) => setDraft({
									...draft,
									date: e.target.value
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "vs",
								children: "Vikram Samvat"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "vs",
								type: "number",
								value: draft.vsYear ?? "",
								onChange: (e) => setDraft({
									...draft,
									vsYear: Number(e.target.value) || void 0
								})
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "start",
								children: "Start"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "start",
								type: "time",
								value: draft.startTime,
								onChange: (e) => setDraft({
									...draft,
									startTime: e.target.value
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "end",
								children: "End"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "end",
								type: "time",
								value: draft.endTime,
								onChange: (e) => setDraft({
									...draft,
									endTime: e.target.value
								})
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "tithi",
								children: "Tithi"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "tithi",
								className: "gu",
								value: draft.tithi ?? "",
								onChange: (e) => setDraft({
									...draft,
									tithi: e.target.value
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "paksha",
								children: "Paksha"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "paksha",
								className: "gu",
								value: draft.paksha ?? "",
								onChange: (e) => setDraft({
									...draft,
									paksha: e.target.value
								})
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Gujarati month" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: draft.gujaratiMonth ?? GUJARATI_MONTHS[0],
							onValueChange: (v) => setDraft({
								...draft,
								gujaratiMonth: v
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: GUJARATI_MONTHS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: m,
								children: m
							}, m)) })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: draft.status,
							onValueChange: (v) => setDraft({
								...draft,
								status: v
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: Object.keys(STATUS_LABEL).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: s,
								children: STATUS_LABEL[s].en
							}, s)) })]
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
							htmlFor: "proc",
							children: "Seva procedure"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "proc",
							value: draft.procedure,
							onChange: (e) => setDraft({
								...draft,
								procedure: e.target.value
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "tags",
							children: "Tags (comma)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "tags",
							value: draft.tags.join(", "),
							onChange: (e) => setDraft({
								...draft,
								tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-sm font-medium",
						children: "Reminders"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: REMINDER_PRESETS.map((m) => {
							const on = draft.reminderOffsets.includes(m);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								size: "sm",
								variant: on ? "default" : "outline",
								onClick: () => setDraft({
									...draft,
									reminderOffsets: on ? draft.reminderOffsets.filter((x) => x !== m) : [...draft.reminderOffsets, m]
								}),
								children: [m, " min"]
							}, m);
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "inline-flex h-11 w-fit cursor-pointer items-center rounded-lg border border-border px-4 text-sm",
						children: ["Attach photos or PDFs", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							multiple: true,
							className: "sr-only",
							accept: ".pdf,.jpg,.jpeg,.png,.webp,.gif",
							onChange: (e) => {
								const list = e.target.files ? Array.from(e.target.files) : [];
								const folder = draft.categoryId === "cat_manorath" ? "folder_manorath" : "folder_utsav";
								ingest(list, folder, { eventId: draft.id }).then((created) => {
									const photos = created.filter((c) => c.kind === "image").map((c) => c.id);
									const pdfs = created.filter((c) => c.kind === "pdf").map((c) => c.id);
									setDraft((d) => ({
										...d,
										photoIds: [...d.photoIds, ...photos],
										pdfIds: [...d.pdfIds, ...pdfs],
										attachmentIds: [...d.attachmentIds, ...created.map((c) => c.id)]
									}));
								});
								e.target.value = "";
							}
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "text-sm",
						children: draft.attachmentIds.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: files.find((f) => f.id === id)?.name ?? id }, id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => void save(),
								children: saved ? "Saved" : "Save"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => void duplicate(event.id),
								children: "Duplicate"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "destructive",
								onClick: () => void remove(event.id),
								children: "Delete"
							})
						]
					})
				]
			})
		]
	});
}
function EventDetail() {
	const { id } = Route$1.useParams();
	const event = useSdsp((s) => s.events.find((x) => x.id === id));
	if (!event) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-sm",
		children: ["Event not found. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/seva",
			children: "Back to seva"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventEditor, { event }, event.id);
}
//#endregion
export { EventDetail as component };
