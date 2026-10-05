import { i as __toESM } from "../_runtime.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { E as cn, M as todayISO, N as useSdsp, T as bindToast, i as formatMedium, n as combineDateTime } from "./dates-Ca_zgasn.mjs";
import { _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, x as useRouter, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime, d as DialogContent$1, f as DialogDescription$1, h as DialogTitle$1, k as Slot, l as Dialog$1, m as DialogPortal$1, p as DialogOverlay$1, u as DialogClose } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { c as Settings, g as FolderOpen, l as Search, o as Sparkles, p as House, r as TriangleAlert, t as X, w as CalendarDays, y as Command } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { n as Portal, r as Provider, t as Content2 } from "../_libs/radix-ui__react-tooltip.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-D_kLnrs4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var TooltipProvider = Provider;
var TooltipContent = import_react.forwardRef(({ className, sideOffset = 6, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 overflow-hidden rounded-lg bg-foreground px-3 py-1.5 text-xs text-background shadow-sm", className),
	...props
}) }));
TooltipContent.displayName = Content2.displayName;
function Toaster$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		theme: "system",
		className: "toaster group",
		toastOptions: { classNames: { toast: "glass border-border text-foreground" } },
		...props
	});
}
var fired = /* @__PURE__ */ new Set();
function key(kind, id, offset, date) {
	return `${kind}:${id}:${date}:${offset}`;
}
async function ensureNotificationPermission() {
	if (typeof Notification === "undefined") return "unsupported";
	if (Notification.permission === "granted" || Notification.permission === "denied") return Notification.permission;
	try {
		return await Notification.requestPermission();
	} catch {
		return "denied";
	}
}
function showNotice(title, body, url = "/") {
	try {
		if (typeof Notification === "undefined" || Notification.permission !== "granted") return;
		const n = new Notification(title, {
			body,
			icon: "/favicon.svg",
			tag: title,
			data: { url }
		});
		n.onclick = () => {
			window.focus();
			n.close();
		};
	} catch (err) {
		console.error("notification failed", err);
	}
}
function tickReminders(args) {
	if (!args.enabled) return;
	if (typeof Notification === "undefined" || Notification.permission !== "granted") return;
	const now = args.now ?? /* @__PURE__ */ new Date();
	const date = todayISO(now);
	for (const seva of args.nitya.filter((s) => s.enabled)) {
		const start = combineDateTime(date, seva.time);
		for (const offset of seva.reminderOffsets) {
			const fireAt = start.getTime() - offset * 6e4;
			const k = key("seva", seva.id, offset, date);
			if (fired.has(k)) continue;
			if (now.getTime() >= fireAt && now.getTime() < fireAt + 6e4) {
				fired.add(k);
				showNotice(`${seva.name} · ${seva.nameEn}`, `Begins in ${offset} minutes (${seva.time}).`, `/seva/${seva.id}`);
			}
		}
	}
	for (const event of args.events) {
		if (event.date !== date) continue;
		const start = combineDateTime(event.date, event.startTime || "08:00");
		for (const offset of event.reminderOffsets) {
			const fireAt = start.getTime() - offset * 6e4;
			const k = key("event", event.id, offset, date);
			if (fired.has(k)) continue;
			if (now.getTime() >= fireAt && now.getTime() < fireAt + 6e4) {
				fired.add(k);
				showNotice(event.title, `Starts in ${offset} minutes.`, `/event/${event.id}`);
			}
		}
	}
}
function LotusMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 48 48",
		className: cn("text-primary", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "48",
				height: "48",
				rx: "12",
				fill: "currentColor",
				opacity: "0.12"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M24 38c-6-6.5-11-12.2-11-18.2C13 13.6 17.4 10 24 10s11 3.6 11 9.8C35 25.8 30 31.5 24 38Z",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M24 36c-4.8-5.4-8-9.8-8-14.2C16 16.8 19.2 14 24 14s8 2.8 8 7.8C32 26.2 28.8 30.6 24 36Z",
				fill: "var(--sdsp-ivory)",
				opacity: "0.9"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "24",
				cy: "21",
				r: "3.2",
				fill: "currentColor"
			})
		]
	});
}
function Wordmark({ compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LotusMark, { className: "size-10 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 leading-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-display text-2xl font-semibold tracking-tight",
				children: "SDSP"
			}), !compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "gu truncate text-xs tracking-wide text-muted-foreground",
				children: "શ્રી દેવદમનલાલ"
			})]
		})]
	});
}
function applyTheme(theme) {
	const root = document.documentElement;
	const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	const dark = theme === "dark" || theme === "system" && systemDark;
	root.classList.toggle("dark", dark);
}
function AppProviders({ children }) {
	const ready = useSdsp((s) => s.ready);
	const hydrate = useSdsp((s) => s.hydrate);
	const settings = useSdsp((s) => s.settings);
	const setOnline = useSdsp((s) => s.setOnline);
	const nitya = useSdsp((s) => s.nitya);
	const events = useSdsp((s) => s.events);
	const notificationsEnabled = settings.notificationsEnabled;
	(0, import_react.useEffect)(() => {
		bindToast((message, opts) => toast(message, opts));
		hydrate();
	}, [hydrate]);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		applyTheme(settings.theme);
		document.documentElement.dataset.size = settings.fontSize;
		document.documentElement.classList.toggle("reduce-motion", settings.reducedMotion);
	}, [
		ready,
		settings.theme,
		settings.fontSize,
		settings.reducedMotion
	]);
	(0, import_react.useEffect)(() => {
		const on = () => setOnline(true);
		const off = () => setOnline(false);
		window.addEventListener("online", on);
		window.addEventListener("offline", off);
		return () => {
			window.removeEventListener("online", on);
			window.removeEventListener("offline", off);
		};
	}, [setOnline]);
	(0, import_react.useEffect)(() => {
		if (!ready || !notificationsEnabled) return;
		const id = window.setInterval(() => tickReminders({
			enabled: true,
			nitya,
			events
		}), 2e4);
		tickReminders({
			enabled: true,
			nitya,
			events
		});
		return () => window.clearInterval(id);
	}, [
		ready,
		notificationsEnabled,
		nitya,
		events
	]);
	(0, import_react.useEffect)(() => {
		if (!("serviceWorker" in navigator)) return;
		navigator.serviceWorker.register("/sw.js").catch(() => void 0);
	}, []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "temple-wash flex min-h-dvh flex-col items-center justify-center gap-4 bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LotusMark, { className: "size-16" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-3xl",
				children: "SDSP"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "gu text-sm text-muted-foreground",
				children: "શ્રી દેવદમન સેવા પ્લાનર"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipProvider, {
		delayDuration: 200,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, { position: "top-center" })]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-[transform,background-color,color,opacity,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow-sm hover:opacity-90",
			secondary: "bg-secondary text-secondary-foreground hover:opacity-90",
			outline: "border border-border bg-transparent hover:bg-accent",
			ghost: "hover:bg-accent",
			destructive: "bg-destructive text-destructive-foreground hover:opacity-90",
			glass: "glass hover:opacity-95"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-6",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-background/70 backdrop-blur-sm", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed top-1/2 left-1/2 z-50 grid w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-2xl border border-border bg-popover p-6 shadow-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
		className: "absolute top-3 right-3 rounded-lg p-2 text-muted-foreground hover:bg-accent",
		"aria-label": "Close",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5 text-left", className),
		...props
	});
}
function DialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("font-display text-xl font-semibold", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	type,
	className: cn("flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
	ref,
	...props
}));
Input.displayName = "Input";
function hay(...parts) {
	return parts.filter(Boolean).join(" ").toLowerCase();
}
function searchSdsp(state, query, filters = {}) {
	const q = query.trim().toLowerCase();
	const hits = [];
	const allow = (kind) => !filters.kinds?.length || filters.kinds.includes(kind);
	const inRange = (date) => {
		if (!date) return true;
		if (filters.dateFrom && date < filters.dateFrom) return false;
		if (filters.dateTo && date > filters.dateTo) return false;
		return true;
	};
	if (allow("seva")) for (const s of state.nitya) {
		if (q && !hay(s.name, s.nameEn, s.description, s.instructions, s.notes, s.time).includes(q)) continue;
		hits.push({
			id: s.id,
			kind: "seva",
			title: s.name,
			subtitle: `${s.nameEn} · ${s.time}`,
			href: `/seva/${s.id}`,
			tags: ["nitya"]
		});
	}
	if (allow("event")) for (const e of state.events) {
		if (filters.categoryId && e.categoryId !== filters.categoryId) continue;
		if (filters.status && e.status !== filters.status) continue;
		if (filters.favorite && !e.favorite) continue;
		if (!inRange(e.date)) continue;
		if (q && !hay(e.title, e.description, e.procedure, e.notes, e.tithi, e.gujaratiMonth, ...e.tags).includes(q)) continue;
		const cat = state.categories.find((c) => c.id === e.categoryId);
		hits.push({
			id: e.id,
			kind: "event",
			title: e.title,
			subtitle: `${cat?.nameEn ?? "Vishesh"} · ${formatMedium(e.date)}`,
			href: `/event/${e.id}`,
			tags: e.tags,
			date: e.date,
			favorite: e.favorite,
			status: e.status
		});
	}
	if (allow("note")) for (const n of state.notes) {
		if (n.archived) continue;
		if (filters.favorite && !n.favorite) continue;
		if (q && !hay(n.title, n.body, ...n.tags).includes(q)) continue;
		hits.push({
			id: n.id,
			kind: "note",
			title: n.title,
			subtitle: n.private ? "Private note" : "Note",
			href: `/notes?id=${n.id}`,
			tags: n.tags,
			favorite: n.favorite
		});
	}
	if (allow("file")) for (const f of state.files) {
		if (filters.folderId && f.folderId !== filters.folderId) continue;
		if (filters.favorite && !f.favorite) continue;
		if (filters.fileKind && f.kind !== filters.fileKind) continue;
		if (q && !hay(f.name, f.mime, ...f.tags).includes(q)) continue;
		hits.push({
			id: f.id,
			kind: "file",
			title: f.name,
			subtitle: f.kind.toUpperCase(),
			href: `/files?file=${f.id}`,
			tags: f.tags,
			favorite: f.favorite,
			mime: f.mime
		});
	}
	if (allow("folder")) for (const folder of state.folders) {
		if (folder.archived) continue;
		if (q && !hay(folder.name).includes(q)) continue;
		hits.push({
			id: folder.id,
			kind: "folder",
			title: folder.name,
			subtitle: "Folder",
			href: `/files?folder=${folder.id}`,
			tags: []
		});
	}
	if (allow("procedure")) for (const p of state.procedures) {
		if (p.archived) continue;
		if (filters.favorite && !p.bookmarked) continue;
		if (q && !hay(p.title, p.body, p.notes, ...p.tags).includes(q)) continue;
		hits.push({
			id: p.id,
			kind: "procedure",
			title: p.title,
			subtitle: `Pranalika v${p.version}`,
			href: `/pranalika?id=${p.id}`,
			tags: p.tags,
			favorite: p.bookmarked
		});
	}
	if (allow("panchang") && q) for (const p of Object.values(state.panchang)) {
		if (!hay(p.date, String(p.vsYear), p.gujaratiMonth, p.tithi, p.paksha, p.notes).includes(q)) continue;
		if (!inRange(p.date)) continue;
		hits.push({
			id: p.date,
			kind: "panchang",
			title: p.date,
			subtitle: `વિ.સં. ${p.vsYear} · ${p.gujaratiMonth} · ${p.tithi}`,
			href: `/calendar/${p.date}`,
			tags: ["panchang"],
			date: p.date
		});
	}
	if (allow("tag") && q) {
		const tags = /* @__PURE__ */ new Set();
		for (const e of state.events) e.tags.forEach((t) => tags.add(t));
		for (const n of state.notes) n.tags.forEach((t) => tags.add(t));
		for (const f of state.files) f.tags.forEach((t) => tags.add(t));
		for (const p of state.procedures) p.tags.forEach((t) => tags.add(t));
		for (const t of tags) {
			if (!t.toLowerCase().includes(q)) continue;
			hits.push({
				id: `tag_${t}`,
				kind: "tag",
				title: `#${t}`,
				subtitle: "Tag",
				href: `/search?q=${encodeURIComponent(t)}`,
				tags: [t]
			});
		}
	}
	return hits.slice(0, 80);
}
function CommandSearch() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [q, setQ] = (0, import_react.useState)("");
	const router = useRouter();
	const nitya = useSdsp((s) => s.nitya);
	const events = useSdsp((s) => s.events);
	const notes = useSdsp((s) => s.notes);
	const files = useSdsp((s) => s.files);
	const folders = useSdsp((s) => s.folders);
	const procedures = useSdsp((s) => s.procedures);
	const categories = useSdsp((s) => s.categories);
	const panchang = useSdsp((s) => s.panchang);
	const state = (0, import_react.useMemo)(() => ({
		nitya,
		events,
		notes,
		files,
		folders,
		procedures,
		categories,
		panchang
	}), [
		nitya,
		events,
		notes,
		files,
		folders,
		procedures,
		categories,
		panchang
	]);
	const hits = (0, import_react.useMemo)(() => searchSdsp(state, q), [state, q]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setOpen(true);
			}
			const tag = e.target.tagName;
			if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
				e.preventDefault();
				setOpen(true);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		variant: "outline",
		className: "hidden h-10 min-w-48 justify-between text-muted-foreground sm:inline-flex",
		onClick: () => setOpen(true),
		children: ["Search seva, files, dates", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("kbd", {
			className: "rounded-md border border-border px-1.5 text-[10px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Command, { className: "mr-0.5 inline size-3" }), "K"]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "p-0 sm:max-w-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
					className: "px-5 pt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Global search" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						autoFocus: true,
						placeholder: "Seva, utsav, notes, PDFs, tags…",
						value: q,
						onChange: (e) => setQ(e.target.value),
						"aria-label": "Search SDSP"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "max-h-80 overflow-auto px-2 pb-4",
					children: [hits.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "px-3 py-6 text-center text-sm text-muted-foreground",
						children: "No matches."
					}), hits.map((hit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "flex w-full flex-col rounded-xl px-3 py-2 text-left hover:bg-accent",
						onClick: () => {
							setOpen(false);
							router.history.push(hit.href);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium",
							children: hit.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted-foreground",
							children: [
								hit.kind,
								" · ",
								hit.subtitle
							]
						})]
					}) }, `${hit.kind}-${hit.id}`))]
				})
			]
		})
	})] });
}
var NAV = [
	{
		to: "/",
		label: "Home",
		gu: "ઘર",
		icon: House
	},
	{
		to: "/calendar",
		label: "Calendar",
		gu: "કૅલેન્ડર",
		icon: CalendarDays
	},
	{
		to: "/seva",
		label: "Seva",
		gu: "સેવા",
		icon: Sparkles
	},
	{
		to: "/files",
		label: "Files",
		gu: "ફાઇલ",
		icon: FolderOpen
	},
	{
		to: "/settings",
		label: "Settings",
		gu: "સેટિંગ્સ",
		icon: Settings
	}
];
function isActive(pathname, to) {
	if (to === "/") return pathname === "/";
	return pathname === to || pathname.startsWith(`${to}/`);
}
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const online = useSdsp((s) => s.online);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "temple-wash min-h-dvh bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-border bg-background/80 p-5 backdrop-blur-md lg:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "mt-8 flex flex-1 flex-col gap-1",
						"aria-label": "Primary",
						children: NAV.map((item) => {
							const Icon = item.icon;
							const active = isActive(pathname, item.to);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors", active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "gu ml-auto text-xs opacity-80",
										children: item.gu
									})
								]
							}, item.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/pranalika",
								className: "block rounded-lg px-3 py-2 hover:bg-accent hover:text-foreground",
								children: "Seva Pranalika"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/planner",
								className: "block rounded-lg px-3 py-2 hover:bg-accent hover:text-foreground",
								children: "Planner"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/history",
								className: "block rounded-lg px-3 py-2 hover:bg-accent hover:text-foreground",
								children: "History"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/notes",
								className: "block rounded-lg px-3 py-2 hover:bg-accent hover:text-foreground",
								children: "Notes"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:pl-60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-background/80 px-4 py-3 backdrop-blur-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, { compact: true })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex items-center gap-2",
						children: [
							!online && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-skip/15 px-2.5 py-1 text-xs text-skip",
								children: "Offline"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandSearch, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								asChild: true,
								"aria-label": "Search",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/search",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5" })
								})
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					id: "main",
					className: "mx-auto w-full max-w-6xl px-4 py-5 pb-28 lg:pb-10",
					children
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/90 backdrop-blur-md lg:hidden",
				style: { paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" },
				"aria-label": "Mobile",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid grid-cols-5",
					children: NAV.map((item) => {
						const Icon = item.icon;
						const active = isActive(pathname, item.to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px]", active ? "text-primary" : "text-muted-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" }), item.label]
						}) }, item.to);
					})
				})
			})
		]
	});
}
var styles_default = "/assets/styles-CKgO1nz9.css";
var APP_NAME = "SDSP";
var Route$13 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Shri Devdaman Seva Planner — nitya seva, vishesh seva, panchang and pranalika, private on this device."
			},
			{
				name: "theme-color",
				content: "#14110E"
			},
			{
				name: "application-name",
				content: "SDSP"
			},
			{
				name: "apple-mobile-web-app-title",
				content: "SDSP"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "apple-touch-icon",
				href: "/icon-192.png"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/manifest.json"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Noto+Sans+Gujarati:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "antialiased",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppProviders, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter$12 = () => import("./routes-DJqVbZbM.mjs");
var Route$12 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./calendar-CfOaQHu4.mjs");
var Route$11 = createFileRoute("/calendar")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./files-DXiYSBC5.mjs");
var Route$10 = createFileRoute("/files")({
	validateSearch: (search) => {
		const next = {};
		if (typeof search.folder === "string") next.folder = search.folder;
		if (typeof search.file === "string") next.file = search.file;
		return next;
	},
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./history-TwelwSwp.mjs");
var Route$9 = createFileRoute("/history")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./notes-BdFeS-aj.mjs");
var Route$8 = createFileRoute("/notes")({
	validateSearch: (search) => typeof search.id === "string" ? { id: search.id } : {},
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./planner-DlVhDXe_.mjs");
var Route$7 = createFileRoute("/planner")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./pranalika-CCTwyYDn.mjs");
var Route$6 = createFileRoute("/pranalika")({
	validateSearch: (search) => typeof search.id === "string" ? { id: search.id } : {},
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./search--kIAJdKp.mjs");
var Route$5 = createFileRoute("/search")({
	validateSearch: (search) => typeof search.q === "string" ? { q: search.q } : {},
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./settings-CYBNTaLN.mjs");
var Route$4 = createFileRoute("/settings")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./seva-CLqgODqd.mjs");
var Route$3 = createFileRoute("/seva")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./calendar._date-D0PqCtEb.mjs");
var Route$2 = createFileRoute("/calendar/$date")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./event._id-BPP7HYmC.mjs");
var Route$1 = createFileRoute("/event/$id")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./seva._id-zLOOW87J.mjs");
var Route = createFileRoute("/seva/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$12.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$13
});
var CalendarRoute = Route$11.update({
	id: "/calendar",
	path: "/calendar",
	getParentRoute: () => Route$13
});
var FilesRoute = Route$10.update({
	id: "/files",
	path: "/files",
	getParentRoute: () => Route$13
});
var HistoryRoute = Route$9.update({
	id: "/history",
	path: "/history",
	getParentRoute: () => Route$13
});
var NotesRoute = Route$8.update({
	id: "/notes",
	path: "/notes",
	getParentRoute: () => Route$13
});
var PlannerRoute = Route$7.update({
	id: "/planner",
	path: "/planner",
	getParentRoute: () => Route$13
});
var PranalikaRoute = Route$6.update({
	id: "/pranalika",
	path: "/pranalika",
	getParentRoute: () => Route$13
});
var SearchRoute = Route$5.update({
	id: "/search",
	path: "/search",
	getParentRoute: () => Route$13
});
var SettingsRoute = Route$4.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => Route$13
});
var SevaRoute = Route$3.update({
	id: "/seva",
	path: "/seva",
	getParentRoute: () => Route$13
});
var CalendarDateRoute = Route$2.update({
	id: "/$date",
	path: "/$date",
	getParentRoute: () => CalendarRoute
});
var EventIdRoute = Route$1.update({
	id: "/event/$id",
	path: "/event/$id",
	getParentRoute: () => Route$13
});
var SevaIdRoute = Route.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => SevaRoute
});
var CalendarRouteChildren = { CalendarDateRoute };
var CalendarRouteWithChildren = CalendarRoute._addFileChildren(CalendarRouteChildren);
var SevaRouteChildren = { SevaIdRoute };
var rootRouteChildren = {
	IndexRoute,
	CalendarRoute: CalendarRouteWithChildren,
	FilesRoute,
	HistoryRoute,
	NotesRoute,
	PlannerRoute,
	PranalikaRoute,
	SearchRoute,
	SettingsRoute,
	SevaRoute: SevaRoute._addFileChildren(SevaRouteChildren),
	EventIdRoute
};
var routeTree = Route$13._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { buttonVariants as _, Route$5 as a, Route$10 as c, Dialog as d, DialogContent as f, Button as g, DialogTitle as h, Route$2 as i, searchSdsp as l, DialogHeader as m, Route as n, Route$6 as o, DialogFooter as p, Route$1 as r, Route$8 as s, router_exports as t, Input as u, ensureNotificationPermission as v };
