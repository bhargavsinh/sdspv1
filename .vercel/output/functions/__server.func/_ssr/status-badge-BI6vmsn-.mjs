import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { C as STATUS_LABEL, E as cn } from "./dates-Ca_zgasn.mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/status-badge-BI6vmsn-.js
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium tracking-wide", {
	variants: { variant: {
		default: "bg-primary text-primary-foreground",
		secondary: "bg-secondary text-secondary-foreground",
		outline: "border border-border text-foreground",
		complete: "bg-complete/15 text-complete",
		skip: "bg-skip/15 text-skip",
		progress: "bg-progress/15 text-progress",
		muted: "bg-muted text-muted-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var variant = {
	upcoming: "muted",
	"in-progress": "progress",
	completed: "complete",
	skipped: "skip",
	cancelled: "outline"
};
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
		variant: variant[status],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "gu",
			children: STATUS_LABEL[status].gu
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "ml-1 opacity-70",
			children: STATUS_LABEL[status].en
		})]
	});
}
//#endregion
export { StatusBadge as n, Badge as t };
