import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as useSdsp, i as formatMedium, o as formatTime } from "./dates-Ca_zgasn.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as Trash2, u as Plus, v as Copy } from "../_libs/lucide-react.mjs";
import { g as Button, u as Input } from "./router-D_kLnrs4.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BpbCcKDq.mjs";
import { t as SevaIcon } from "./seva-icons-BP2CteLE.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-SG6HfCEu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seva-CLqgODqd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SevaWorkspace() {
	const nitya = useSdsp((s) => [...s.nitya].sort((a, b) => a.order - b.order));
	const events = useSdsp((s) => [...s.events].sort((a, b) => a.date.localeCompare(b.date)));
	const categories = useSdsp((s) => s.categories);
	const addNitya = useSdsp((s) => s.addNitya);
	const duplicateNitya = useSdsp((s) => s.duplicateNitya);
	const removeNitya = useSdsp((s) => s.removeNitya);
	const reorderNitya = useSdsp((s) => s.reorderNitya);
	const addEvent = useSdsp((s) => s.addEvent);
	const addCategory = useSdsp((s) => s.addCategory);
	const [pending, setPending] = (0, import_react.useState)(null);
	const [tab, setTab] = (0, import_react.useState)("nitya");
	const [catName, setCatName] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-semibold",
					children: "Seva"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "gu text-muted-foreground",
					children: "નિત્ય અને વિશેષ સેવા"
				})] }), tab === "nitya" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => void addNitya(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Add nitya seva"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => void addEvent(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Add vishesh"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				value: tab,
				onValueChange: setTab,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "nitya",
							children: "Nitya Seva"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "vishesh",
							children: "Vishesh Seva"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "categories",
							children: "Categories"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "nitya",
						className: "space-y-3",
						children: nitya.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass flex items-center gap-3 rounded-2xl p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SevaIcon, {
									name: s.icon,
									className: "size-12"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/seva/$id",
									params: { id: s.id },
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "gu font-display text-lg",
										children: s.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: [
											s.nameEn,
											" · ",
											formatTime(s.time),
											" · ",
											s.durationMin,
											"m"
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon",
											"aria-label": "Move up",
											disabled: i === 0,
											onClick: () => {
												const ids = nitya.map((x) => x.id);
												[ids[i - 1], ids[i]] = [ids[i], ids[i - 1]];
												reorderNitya(ids);
											},
											children: "↑"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon",
											"aria-label": "Duplicate",
											onClick: () => void duplicateNitya(s.id),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon",
											"aria-label": "Remove",
											onClick: () => setPending(s.id),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
										})
									]
								})
							]
						}, s.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "vishesh",
						className: "space-y-3",
						children: events.map((e) => {
							const cat = categories.find((c) => c.id === e.categoryId);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/event/$id",
								params: { id: e.id },
								className: "glass block rounded-2xl p-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: e.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "gu text-xs text-muted-foreground",
										children: [
											cat?.name ?? "Vishesh",
											" · ",
											formatMedium(e.date)
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground",
										children: e.status
									})]
								})
							}, e.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "categories",
						className: "space-y-3",
						children: [categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass flex items-center justify-between rounded-2xl p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "gu font-medium",
								children: c.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: c.nameEn
							})] }), c.system ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: "System"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs",
								children: "Custom"
							})]
						}, c.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "New vishesh category",
								value: catName,
								onChange: (e) => setCatName(e.target.value)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => {
									if (!catName.trim()) return;
									addCategory(catName.trim());
									setCatName("");
								},
								children: "Add"
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: Boolean(pending),
				onOpenChange: (o) => !o && setPending(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Remove this seva?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "You can undo from the toast immediately after." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: () => {
						if (pending) removeNitya(pending);
						setPending(null);
					},
					children: "Remove"
				})] })] })
			})
		]
	});
}
function SevaPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SevaWorkspace, {});
}
//#endregion
export { SevaPage as component };
