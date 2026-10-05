import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { E as cn, N as useSdsp, o as formatTime, r as formatLong, v as GUJARATI_MONTHS, w as TITHIS } from "./dates-Ca_zgasn.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { C as Check, E as Bell, _ as FileText, d as Pencil, s as SkipForward } from "../_libs/lucide-react.mjs";
import { d as Dialog, f as DialogContent, g as Button, h as DialogTitle, m as DialogHeader, p as DialogFooter, u as Input } from "./router-D_kLnrs4.mjs";
import { n as resolvePanchang, r as weekdayGu, t as formatVs } from "./panchang-CPGzWG-D.mjs";
import { a as SelectTrigger, i as SelectItem, n as Select, o as SelectValue, r as SelectContent, t as Label } from "./select-B0Sipgqh.mjs";
import { t as SevaIcon } from "./seva-icons-BP2CteLE.mjs";
import { n as StatusBadge } from "./status-badge-BI6vmsn-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seva-card-a7GmPhvG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PanchangStrip({ date }) {
	const settings = useSdsp((s) => s.settings);
	const overrides = useSdsp((s) => s.panchang);
	const upsert = useSdsp((s) => s.upsertPanchang);
	const clear = useSdsp((s) => s.clearPanchang);
	const p = resolvePanchang(date, overrides, settings.vsNewYearMd);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)(p);
	const openEditor = () => {
		setDraft(p);
		setOpen(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "glass rounded-2xl p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-widest text-muted-foreground uppercase",
						children: "Panchang"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display mt-1 text-2xl font-semibold",
						children: formatLong(date)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "gu mt-1 text-sm text-muted-foreground",
						children: weekdayGu(date)
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					onClick: openEditor,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" }), " Override"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-secondary/60 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-[11px] tracking-wide text-muted-foreground uppercase",
							children: "Vikram Samvat"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "gu mt-1 text-lg font-medium",
							children: formatVs(p.vsYear)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-secondary/60 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-[11px] tracking-wide text-muted-foreground uppercase",
							children: "Gujarati month"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "gu mt-1 text-lg font-medium",
							children: p.gujaratiMonth
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-secondary/60 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-[11px] tracking-wide text-muted-foreground uppercase",
							children: "Tithi"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "gu mt-1 text-lg font-medium",
							children: p.tithi
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-secondary/60 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-[11px] tracking-wide text-muted-foreground uppercase",
							children: "Paksha"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "gu mt-1 text-lg font-medium",
							children: p.paksha
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-muted-foreground",
				children: p.manual ? "Manual override — SDSP will not replace this with an estimate." : "Estimated from your Vikram Samvat new-year setting. Tap Override to enter your panchang."
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Edit panchang" }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "vs",
							children: "Vikram Samvat year"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "vs",
							type: "number",
							value: draft.vsYear,
							onChange: (e) => setDraft({
								...draft,
								vsYear: Number(e.target.value) || draft.vsYear
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Gujarati month" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: draft.gujaratiMonth,
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Tithi" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: draft.tithi,
							onValueChange: (v) => setDraft({
								...draft,
								tithi: v
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
								...TITHIS,
								"પૂનમ",
								"અમાસ"
							].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: m,
								children: m
							}, m)) })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Paksha" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: draft.paksha,
							onValueChange: (v) => setDraft({
								...draft,
								paksha: v
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "શુક્લ પક્ષ",
								children: "શુક્લ પક્ષ"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "કૃષ્ણ પક્ષ",
								children: "કૃષ્ણ પક્ષ"
							})] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "pnotes",
							children: "Notes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "pnotes",
							value: draft.notes ?? "",
							onChange: (e) => setDraft({
								...draft,
								notes: e.target.value
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				onClick: () => {
					clear(date);
					setOpen(false);
				},
				children: "Use estimate"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => {
					const year = Number(draft.vsYear);
					if (!Number.isFinite(year) || year < 2e3 || year > 2200) return;
					upsert({
						...draft,
						date,
						manual: true,
						vsYear: year
					});
					setOpen(false);
				},
				children: "Save override"
			})] })
		] })
	})] });
}
function SevaCard({ seva, status, date, compact, onComplete, onSkip }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: cn("glass relative overflow-hidden rounded-2xl p-4 transition-[box-shadow,transform] duration-200", status === "completed" && "opacity-80"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SevaIcon, {
				name: seva.icon,
				className: "size-12 shrink-0"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/seva/$id",
							params: { id: seva.id },
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "gu truncate font-display text-xl font-semibold",
								children: seva.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: seva.nameEn
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums",
								children: formatTime(seva.time)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [seva.durationMin, " min"] }),
							seva.reminderOffsets.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-3" }),
									" ",
									seva.reminderOffsets[0],
									"m"
								]
							}),
							seva.attachmentIds.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-3" }),
									" ",
									seva.attachmentIds.length
								]
							})
						]
					}),
					!compact && seva.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 line-clamp-2 text-sm text-muted-foreground",
						children: seva.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								onClick: onComplete,
								disabled: status === "completed",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), " Complete"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								onClick: onSkip,
								disabled: status === "skipped",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipForward, { className: "size-4" }), " Skip"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/calendar/$date",
									params: { date },
									children: "Day"
								})
							})
						]
					})
				]
			})]
		})
	});
}
//#endregion
export { SevaCard as n, PanchangStrip as t };
