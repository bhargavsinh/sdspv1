import "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { E as cn, M as todayISO, N as useSdsp, g as APP_GU, h as APP_FULL, i as formatMedium, j as sevaStatusFor, o as formatTime, t as addDays } from "./dates-Ca_zgasn.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { D as ArrowRight, _ as FileText } from "../_libs/lucide-react.mjs";
import { g as Button } from "./router-D_kLnrs4.mjs";
import { t as Badge } from "./status-badge-BI6vmsn-.mjs";
import { n as SevaCard, t as PanchangStrip } from "./seva-card-a7GmPhvG.mjs";
import { t as Progress } from "./progress-DhkrOvqb.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("glass rounded-2xl text-card-foreground", className),
		...props
	});
}
function CardHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1 p-5 pb-2", className),
		...props
	});
}
function CardTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: cn("font-display text-xl font-semibold tracking-tight", className),
		...props
	});
}
function CardContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("p-5 pt-3", className),
		...props
	});
}
function HomeDashboard() {
	const date = todayISO();
	const nitya = useSdsp((s) => s.nitya.filter((x) => x.enabled).sort((a, b) => a.order - b.order));
	const logs = useSdsp((s) => s.logs);
	const events = useSdsp((s) => s.events);
	const files = useSdsp((s) => s.files);
	const recents = useSdsp((s) => s.recents);
	const categories = useSdsp((s) => s.categories);
	const compact = useSdsp((s) => s.settings.dashboardCompact);
	const setStatus = useSdsp((s) => s.setSevaStatus);
	const clearStatus = useSdsp((s) => s.clearSevaStatus);
	const done = nitya.filter((s) => sevaStatusFor(logs, date, s.id) === "completed").length;
	const pct = nitya.length ? Math.round(done / nitya.length * 100) : 0;
	const todayEvents = events.filter((e) => e.date === date);
	const utsav = todayEvents.filter((e) => e.categoryId === "cat_utsav" || categories.find((c) => c.id === e.categoryId)?.nameEn === "Utsav");
	const manorath = todayEvents.filter((e) => e.categoryId === "cat_manorath");
	const upcoming = events.filter((e) => e.date >= date && e.status === "upcoming").sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime)).slice(0, 5);
	const pending = nitya.filter((s) => {
		const st = sevaStatusFor(logs, date, s.id);
		return st === "upcoming" || st === "in-progress";
	});
	const recentFiles = recents.filter((r) => r.kind === "file").slice(0, 5);
	const fileLookup = Object.fromEntries(files.map((f) => [f.id, f]));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.22em] text-muted-foreground uppercase",
						children: APP_FULL
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display mt-1 text-4xl font-semibold sm:text-5xl",
						children: "SDSP"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "gu mt-1 text-lg text-muted-foreground",
						children: APP_GU
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-2xl px-5 py-4 text-right",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Today’s completion"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-3xl font-semibold tabular-nums",
							children: [pct, "%"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							value: pct,
							className: "mt-2 w-36"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanchangStrip, { date }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Today’s Seva"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/planner",
						children: ["Planner ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: nitya.map((seva) => {
					const status = sevaStatusFor(logs, date, seva.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SevaCard, {
						seva,
						status,
						date,
						compact,
						onComplete: () => {
							if (status === "completed") clearStatus(date, seva.id);
							else setStatus(date, seva.id, "completed");
						},
						onSkip: () => void setStatus(date, seva.id, "skipped")
					}, seva.id);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "gu",
						children: "આજનો ઉત્સવ"
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "space-y-2",
						children: [utsav.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "No utsav scheduled today."
						}), utsav.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/event/$id",
							params: { id: e.id },
							className: "block rounded-xl bg-secondary/50 p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: e.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: formatTime(e.startTime)
							})]
						}, e.id))]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "gu",
						children: "આજનો મનોરથ"
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "space-y-2",
						children: [manorath.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "No manorath today."
						}), manorath.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/event/$id",
							params: { id: e.id },
							className: "block rounded-xl bg-secondary/50 p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: e.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: formatTime(e.startTime)
							})]
						}, e.id))]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Pending seva" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "space-y-2",
						children: [pending.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "All nitya seva complete."
						}), pending.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "gu",
								children: s.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums text-muted-foreground",
								children: formatTime(s.time)
							})]
						}, s.id))]
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					className: "flex-row items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Upcoming seva" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/seva",
							children: "Open"
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-2",
					children: [
						upcoming.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Nothing upcoming."
						}),
						upcoming.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/event/$id",
							params: { id: e.id },
							className: "flex items-center justify-between rounded-xl p-2 hover:bg-accent",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate pr-2",
								children: e.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs whitespace-nowrap text-muted-foreground",
								children: formatMedium(e.date)
							})]
						}, e.id)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"Also look ahead to ",
								formatMedium(addDays(date, 7)),
								"."
							]
						})
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					className: "flex-row items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Recent files" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/files",
							children: "Library"
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "space-y-2",
					children: [recentFiles.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Open a PDF or photograph to see it here."
					}), recentFiles.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/files",
						search: { file: r.refId },
						className: "flex items-center gap-2 rounded-xl p-2 hover:bg-accent",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4 text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-sm",
								children: fileLookup[r.refId]?.name ?? r.title
							}),
							fileLookup[r.refId]?.favorite && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								children: "Favorite"
							})
						]
					}, r.id))]
				})] })]
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeDashboard, {});
}
//#endregion
export { Home as component };
