import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as useSdsp, i as formatMedium } from "./dates-Ca_zgasn.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as Input } from "./router-D_kLnrs4.mjs";
import { n as StatusBadge } from "./status-badge-BI6vmsn-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/history-TwelwSwp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HistoryBoard() {
	const logs = useSdsp((s) => Object.values(s.logs));
	const nitya = useSdsp((s) => s.nitya);
	const events = useSdsp((s) => s.events);
	const [q, setQ] = (0, import_react.useState)("");
	const [from, setFrom] = (0, import_react.useState)("");
	const [to, setTo] = (0, import_react.useState)("");
	const grouped = (0, import_react.useMemo)(() => {
		return logs.filter((l) => {
			if (from && l.date < from) return false;
			if (to && l.date > to) return false;
			const seva = nitya.find((s) => s.id === l.sevaId);
			const hay = `${seva?.name ?? ""} ${seva?.nameEn ?? ""} ${l.status} ${l.note ?? ""}`.toLowerCase();
			if (q && !hay.includes(q.toLowerCase())) return false;
			return true;
		}).sort((a, b) => b.date.localeCompare(a.date) || b.updatedAt.localeCompare(a.updatedAt));
	}, [
		logs,
		from,
		to,
		q,
		nitya
	]).reduce((acc, row) => {
		acc[row.date] ??= [];
		acc[row.date].push(row);
		return acc;
	}, {});
	const eventHistory = events.filter((e) => e.status === "completed" || e.status === "skipped");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: "Seva history"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Date-wise record of completed and skipped seva."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Search seva or status",
						value: q,
						onChange: (e) => setQ(e.target.value),
						className: "max-w-xs"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						value: from,
						onChange: (e) => setFrom(e.target.value),
						"aria-label": "From"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						value: to,
						onChange: (e) => setTo(e.target.value),
						"aria-label": "To"
					})
				]
			}),
			Object.keys(grouped).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "No history yet. Complete a seva to begin the ledger."
			}),
			Object.entries(grouped).map(([date, list]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass rounded-2xl p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: formatMedium(date)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/calendar/$date",
						params: { date },
						className: "text-sm text-primary",
						children: "Open day"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: list.map((l) => {
						const seva = nitya.find((s) => s.id === l.sevaId);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "gu",
								children: seva?.name ?? l.sevaId
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: l.status })]
						}, l.id);
					})
				})]
			}, date)),
			eventHistory.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display mb-2 text-xl",
				children: "Completed vishesh"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: eventHistory.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/event/$id",
					params: { id: e.id },
					className: "glass flex items-center justify-between rounded-2xl p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: e.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: e.status })]
				}) }, e.id))
			})] })
		]
	});
}
function HistoryPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryBoard, {});
}
//#endregion
export { HistoryPage as component };
