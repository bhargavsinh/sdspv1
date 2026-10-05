import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as useSdsp } from "./dates-Ca_zgasn.mjs";
import { x as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as Route$5, l as searchSdsp, u as Input } from "./router-D_kLnrs4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search--kIAJdKp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KINDS = [
	{
		id: "seva",
		label: "Seva"
	},
	{
		id: "event",
		label: "Events"
	},
	{
		id: "file",
		label: "Files"
	},
	{
		id: "note",
		label: "Notes"
	},
	{
		id: "folder",
		label: "Folders"
	},
	{
		id: "procedure",
		label: "Pranalika"
	},
	{
		id: "tag",
		label: "Tags"
	}
];
function SearchPage({ initialQuery = "" }) {
	const [q, setQ] = (0, import_react.useState)(initialQuery);
	const [kinds, setKinds] = (0, import_react.useState)([]);
	const [favorite, setFavorite] = (0, import_react.useState)(false);
	const [fileKind, setFileKind] = (0, import_react.useState)("");
	const [from, setFrom] = (0, import_react.useState)("");
	const [to, setTo] = (0, import_react.useState)("");
	const nitya = useSdsp((s) => s.nitya);
	const events = useSdsp((s) => s.events);
	const notes = useSdsp((s) => s.notes);
	const files = useSdsp((s) => s.files);
	const folders = useSdsp((s) => s.folders);
	const procedures = useSdsp((s) => s.procedures);
	const categories = useSdsp((s) => s.categories);
	const panchang = useSdsp((s) => s.panchang);
	const router = useRouter();
	const hits = (0, import_react.useMemo)(() => searchSdsp({
		nitya,
		events,
		notes,
		files,
		folders,
		procedures,
		categories,
		panchang
	}, q, {
		kinds: kinds.length ? kinds : void 0,
		favorite: favorite || void 0,
		fileKind: fileKind || void 0,
		dateFrom: from || void 0,
		dateTo: to || void 0
	}), [
		nitya,
		events,
		notes,
		files,
		folders,
		procedures,
		categories,
		panchang,
		q,
		kinds,
		favorite,
		fileKind,
		from,
		to
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: "Search"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Seva, dates, PDFs, photographs, notes, tags…"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [KINDS.map((k) => {
					const on = kinds.includes(k.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: `h-9 rounded-full px-3 text-xs ${on ? "bg-primary text-primary-foreground" : "bg-secondary"}`,
						onClick: () => setKinds(on ? kinds.filter((x) => x !== k.id) : [...kinds, k.id]),
						children: k.label
					}, k.id);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `h-9 rounded-full px-3 text-xs ${favorite ? "bg-primary text-primary-foreground" : "bg-secondary"}`,
					onClick: () => setFavorite((v) => !v),
					children: "Favorites"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "h-11 rounded-lg border border-input bg-background px-3 text-sm",
						value: fileKind,
						onChange: (e) => setFileKind(e.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Any file type"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "pdf",
								children: "PDF"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "image",
								children: "Image"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						value: from,
						onChange: (e) => setFrom(e.target.value),
						"aria-label": "From",
						className: "max-w-40"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						value: to,
						onChange: (e) => setTo(e.target.value),
						"aria-label": "To",
						className: "max-w-40"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: hits.map((hit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "glass w-full rounded-2xl p-4 text-left",
					onClick: () => router.history.push(hit.href),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: hit.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							hit.kind,
							" · ",
							hit.subtitle
						]
					})]
				}) }, `${hit.kind}-${hit.id}`))
			}),
			hits.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "No matching seva, files or notes."
			})
		]
	});
}
function SearchRoute() {
	const { q } = Route$5.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchPage, { initialQuery: q });
}
//#endregion
export { SearchRoute as component };
