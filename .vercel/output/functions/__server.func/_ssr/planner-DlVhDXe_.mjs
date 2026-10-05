import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { M as todayISO, N as useSdsp, a as formatMonthYear, f as startOfWeek, i as formatMedium, j as sevaStatusFor, k as parseISODate, l as monthGrid, m as yearMonths, p as weekDays, t as addDays, u as sameMonth } from "./dates-Ca_zgasn.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-BpbCcKDq.mjs";
import { t as Progress } from "./progress-DhkrOvqb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/planner-DlVhDXe_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function completion(logs, nityaIds, date) {
	if (!nityaIds.length) return 0;
	const done = nityaIds.filter((id) => sevaStatusFor(logs, date, id) === "completed").length;
	return Math.round(done / nityaIds.length * 100);
}
function PlannerBoard() {
	const today = todayISO();
	const [span, setSpan] = (0, import_react.useState)("week");
	const nitya = useSdsp((s) => s.nitya.filter((x) => x.enabled));
	const logs = useSdsp((s) => s.logs);
	const events = useSdsp((s) => s.events);
	const ids = nitya.map((s) => s.id);
	const week = (0, import_react.useMemo)(() => weekDays(today), [today]);
	const month = (0, import_react.useMemo)(() => monthGrid(today), [today]);
	const year = parseISODate(today).getFullYear();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: "Seva planner"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Week, month and year at a glance."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
				value: span,
				onValueChange: (v) => setSpan(v),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "week",
						children: "Weekly"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "month",
						children: "Monthly"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "year",
						children: "Yearly"
					})
				] })
			}),
			span === "week" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:grid-cols-7",
				children: week.map((iso) => {
					const pct = completion(logs, ids, iso);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/calendar/$date",
						params: { date: iso },
						className: "glass rounded-2xl p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: formatMedium(iso)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 font-display text-2xl tabular-nums",
								children: [pct, "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: pct,
								className: "mt-2"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 space-y-1 text-xs",
								children: events.filter((e) => e.date === iso).slice(0, 3).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "truncate text-primary",
									children: e.title
								}, e.id))
							})
						]
					}, iso);
				})
			}),
			span === "month" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-7 gap-1",
				children: month.map((iso) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/calendar/$date",
					params: { date: iso },
					className: "rounded-xl bg-secondary/40 p-2 text-center text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: sameMonth(iso, today) ? "" : "opacity-40",
						children: parseISODate(iso).getDate()
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-complete tabular-nums",
						children: [completion(logs, ids, iso), "%"]
					})]
				}, iso))
			}),
			span === "year" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: yearMonths(year).map((m) => {
					const days = Array.from({ length: 28 }, (_, i) => addDays(m, i));
					const avg = Math.round(days.reduce((a, d) => a + completion(logs, ids, d), 0) / days.length);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass rounded-2xl p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: formatMonthYear(m)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: [
									"Approx. completion ",
									avg,
									"%"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: avg,
								className: "mt-2"
							})
						]
					}, m);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: [
					"Week of ",
					formatMedium(startOfWeek(today)),
					"."
				]
			})
		]
	});
}
function PlannerPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlannerBoard, {});
}
//#endregion
export { PlannerPage as component };
