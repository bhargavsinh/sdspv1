import { N as useSdsp, c as isValidISODate, j as sevaStatusFor, r as formatLong } from "./dates-Ca_zgasn.mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as Route$2 } from "./router-D_kLnrs4.mjs";
import { n as DayAgenda } from "./calendar-board-Dq6bONQQ.mjs";
import { n as SevaCard, t as PanchangStrip } from "./seva-card-a7GmPhvG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/calendar._date-D0PqCtEb.js
var import_jsx_runtime = require_jsx_runtime();
function DayPage() {
	const { date } = Route$2.useParams();
	const valid = isValidISODate(date);
	const nitya = useSdsp((s) => s.nitya.filter((x) => x.enabled).sort((a, b) => a.order - b.order));
	const logs = useSdsp((s) => s.logs);
	const setStatus = useSdsp((s) => s.setSevaStatus);
	const clearStatus = useSdsp((s) => s.clearSevaStatus);
	if (!valid) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-destructive",
		children: "That date is not valid."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-widest text-muted-foreground uppercase",
				children: "Seva dashboard"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: formatLong(date)
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanchangStrip, { date }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "grid gap-3 md:grid-cols-2",
				children: nitya.map((seva) => {
					const status = sevaStatusFor(logs, date, seva.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SevaCard, {
						seva,
						status,
						date,
						onComplete: () => {
							if (status === "completed") clearStatus(date, seva.id);
							else setStatus(date, seva.id, "completed");
						},
						onSkip: () => void setStatus(date, seva.id, "skipped")
					}, seva.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display mb-3 text-2xl",
				children: "Timeline"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayAgenda, { date })] })
		]
	});
}
//#endregion
export { DayPage as component };
