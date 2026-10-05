import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { E as cn, M as todayISO, N as useSdsp, _ as EN_WEEKDAYS, a as formatMonthYear, d as startOfMonth, i as formatMedium, j as sevaStatusFor, k as parseISODate, l as monthGrid, m as yearMonths, o as formatTime, p as weekDays, t as addDays, u as sameMonth } from "./dates-Ca_zgasn.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { b as ChevronRight, x as ChevronLeft } from "../_libs/lucide-react.mjs";
import { g as Button } from "./router-D_kLnrs4.mjs";
import { n as resolvePanchang } from "./panchang-CPGzWG-D.mjs";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-BpbCcKDq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/calendar-board-Dq6bONQQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function eventsOn(events, date) {
	return events.filter((e) => e.date === date || e.endDate && e.date <= date && e.endDate >= date);
}
function CalendarBoard({ initialView }) {
	const today = todayISO();
	const settings = useSdsp((s) => s.settings);
	const [view, setView] = (0, import_react.useState)(initialView ?? settings.calendarDefaultView);
	const [cursor, setCursor] = (0, import_react.useState)(today);
	const nitya = useSdsp((s) => s.nitya.filter((s) => s.enabled));
	const logs = useSdsp((s) => s.logs);
	const events = useSdsp((s) => s.events);
	const panchang = useSdsp((s) => s.panchang);
	const cells = (0, import_react.useMemo)(() => monthGrid(cursor), [cursor]);
	const week = (0, import_react.useMemo)(() => weekDays(cursor), [cursor]);
	const year = parseISODate(cursor).getFullYear();
	const shift = (dir) => {
		if (view === "day") setCursor(addDays(cursor, dir));
		else if (view === "week" || view === "agenda") setCursor(addDays(cursor, dir * 7));
		else if (view === "year") setCursor(todayISO(new Date(year + dir, 0, 1)));
		else setCursor(todayISO(new Date(parseISODate(cursor).getFullYear(), parseISODate(cursor).getMonth() + dir, 1)));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-semibold",
					children: "Calendar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "icon",
							onClick: () => shift(-1),
							"aria-label": "Previous",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							onClick: () => setCursor(today),
							children: "Today"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "icon",
							onClick: () => shift(1),
							"aria-label": "Next",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: view === "year" ? year : formatMonthYear(cursor)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
				value: view,
				onValueChange: (v) => setView(v),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList, {
					className: "flex w-full flex-wrap",
					children: [
						"day",
						"week",
						"month",
						"year",
						"agenda"
					].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: v,
						className: "flex-1 capitalize",
						children: v
					}, v))
				})
			}),
			view === "month" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass overflow-hidden rounded-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-7 border-b border-border text-center text-[11px] tracking-wide text-muted-foreground uppercase",
					children: Array.from({ length: 7 }, (_, i) => EN_WEEKDAYS[(i + 1) % 7]?.slice(0, 3)).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "py-2",
						children: d
					}, d))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-7",
					children: cells.map((iso) => {
						const inMonth = sameMonth(iso, cursor);
						const ev = eventsOn(events, iso);
						const done = nitya.filter((s) => sevaStatusFor(logs, iso, s.id) === "completed").length;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/calendar/$date",
							params: { date: iso },
							className: cn("min-h-20 border-border border-r border-b p-2 hover:bg-accent", !inMonth && "opacity-40", iso === today && "bg-primary/10"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums",
									children: parseISODate(iso).getDate()
								}), done > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-complete",
									children: done
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 space-y-0.5",
								children: ev.slice(0, 2).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate rounded bg-primary/15 px-1 text-[10px] text-primary",
									children: e.title
								}, e.id))
							})]
						}, iso);
					})
				})]
			}),
			view === "week" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:grid-cols-7",
				children: week.map((iso) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/calendar/$date",
					params: { date: iso },
					className: "glass rounded-2xl p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: formatMedium(iso)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-2 space-y-1 text-sm",
						children: [nitya.slice(0, 4).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "gu truncate text-xs",
							children: s.name
						}, s.id)), eventsOn(events, iso).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "truncate text-xs text-primary",
							children: e.title
						}, e.id))]
					})]
				}, iso))
			}),
			view === "day" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayAgenda, { date: cursor }),
			view === "year" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: yearMonths(year).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "glass rounded-2xl p-4 text-left hover:bg-accent",
					onClick: () => {
						setCursor(m);
						setView("month");
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: formatMonthYear(m)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: [events.filter((e) => e.date.startsWith(m.slice(0, 7))).length, " vishesh"]
					})]
				}, m))
			}),
			view === "agenda" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: Array.from({ length: 14 }, (_, i) => addDays(startOfMonth(cursor), i)).map((iso) => {
					const ev = eventsOn(events, iso);
					const pan = resolvePanchang(iso, panchang, settings.vsNewYearMd);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/calendar/$date",
						params: { date: iso },
						className: "glass block rounded-2xl p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-baseline justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: formatMedium(iso)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "gu text-xs text-muted-foreground",
								children: [
									pan.tithi,
									" · ",
									pan.paksha
								]
							})]
						}), ev.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Nitya seva only"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 space-y-1 text-sm",
							children: ev.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: e.title }, e.id))
						})]
					}, iso);
				})
			})
		]
	});
}
function DayAgenda({ date }) {
	const nitya = useSdsp((s) => s.nitya.filter((s) => s.enabled).sort((a, b) => a.order - b.order));
	const logs = useSdsp((s) => s.logs);
	const events = useSdsp((s) => s.events.filter((e) => e.date === date));
	const setStatus = useSdsp((s) => s.setSevaStatus);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [nitya.map((s) => {
			const status = sevaStatusFor(logs, date, s.id);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass flex items-center gap-3 rounded-2xl p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-16 text-xs tabular-nums text-muted-foreground",
						children: formatTime(s.time)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "gu font-medium",
							children: s.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								s.nameEn,
								" · ",
								status
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: status === "completed" ? "secondary" : "default",
						onClick: () => void setStatus(date, s.id, "completed"),
						children: "Done"
					})
				]
			}, s.id);
		}), events.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/event/$id",
			params: { id: e.id },
			className: "glass block rounded-2xl p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: [
					formatTime(e.startTime),
					" – ",
					formatTime(e.endTime)
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium",
				children: e.title
			})]
		}, e.id))]
	});
}
//#endregion
export { DayAgenda as n, CalendarBoard as t };
