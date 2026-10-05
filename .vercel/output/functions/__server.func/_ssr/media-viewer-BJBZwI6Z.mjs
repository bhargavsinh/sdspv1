import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as useSdsp } from "./dates-Ca_zgasn.mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { d as Dialog, f as DialogContent, h as DialogTitle, m as DialogHeader } from "./router-D_kLnrs4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/media-viewer-BJBZwI6Z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MediaViewer({ file, onClose }) {
	const readBlob = useSdsp((s) => s.readBlob);
	const touch = useSdsp((s) => s.touchRecent);
	const [url, setUrl] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let objectUrl = null;
		let cancelled = false;
		if (!file) {
			setUrl(null);
			return;
		}
		(async () => {
			try {
				const rec = await readBlob(file.id);
				if (!rec) {
					if (!cancelled) setError("This file is not available offline.");
					return;
				}
				objectUrl = URL.createObjectURL(rec.blob);
				if (!cancelled) {
					setError(null);
					setUrl(objectUrl);
					touch({
						kind: "file",
						refId: file.id,
						title: file.name
					});
				}
			} catch {
				if (!cancelled) setError("Could not open this file.");
			}
		})();
		return () => {
			cancelled = true;
			if (objectUrl) URL.revokeObjectURL(objectUrl);
		};
	}, [
		file,
		readBlob,
		touch
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: Boolean(file),
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-4xl p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
				className: "p-5 pb-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "truncate pr-8",
					children: file?.name
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5 pt-3",
				children: [
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-destructive",
						children: error
					}),
					url && file?.kind === "pdf" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
						title: file.name,
						src: url,
						className: "h-[70vh] w-full rounded-xl bg-secondary"
					}),
					url && file?.kind === "image" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: url,
						alt: file.name,
						className: "max-h-[70vh] w-full rounded-xl object-contain outline outline-1 -outline-offset-1 outline-foreground/10"
					})
				]
			})]
		})
	});
}
//#endregion
export { MediaViewer as t };
