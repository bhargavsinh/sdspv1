import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as putBlob, D as formatBytes, N as useSdsp, O as getBlob } from "./dates-Ca_zgasn.mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as Button, u as Input, v as ensureNotificationPermission } from "./router-D_kLnrs4.mjs";
import { a as SelectTrigger, i as SelectItem, n as Select, o as SelectValue, r as SelectContent, t as Label } from "./select-B0Sipgqh.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-SG6HfCEu.mjs";
import { t as Switch } from "./switch-D0IS70IA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-CYBNTaLN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function blobToBase64(blob) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			const result = String(reader.result ?? "");
			const comma = result.indexOf(",");
			resolve(comma >= 0 ? result.slice(comma + 1) : result);
		};
		reader.onerror = () => reject(reader.error ?? /* @__PURE__ */ new Error("Could not read file."));
		reader.readAsDataURL(blob);
	});
}
function base64ToBlob(data, mime) {
	const bin = atob(data);
	const bytes = new Uint8Array(bin.length);
	for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
	return new Blob([bytes], { type: mime || "application/octet-stream" });
}
async function exportBackup(includeFiles) {
	const s = useSdsp.getState();
	const backup = {
		app: "SDSP",
		version: 1,
		exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
		includeFiles,
		settings: s.settings,
		nitya: s.nitya,
		logs: Object.values(s.logs),
		events: s.events,
		categories: s.categories,
		folders: s.folders,
		files: s.files,
		notes: s.notes,
		procedures: s.procedures,
		panchang: Object.values(s.panchang),
		recents: s.recents
	};
	if (includeFiles) {
		backup.blobs = [];
		for (const file of s.files) {
			const rec = await getBlob(file.id);
			if (!rec) continue;
			backup.blobs.push({
				id: rec.id,
				mime: rec.mime,
				name: rec.name,
				data: await blobToBase64(rec.blob)
			});
		}
	}
	return backup;
}
function downloadBackup(backup) {
	const blob = new Blob([JSON.stringify(backup)], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `sdsp-backup-${backup.exportedAt.slice(0, 10)}.json`;
	a.click();
	URL.revokeObjectURL(url);
}
function parseBackup(raw) {
	if (!raw || typeof raw !== "object") throw new Error("Backup file is empty or unreadable.");
	const data = raw;
	if (data.app !== "SDSP") throw new Error("This file is not an SDSP backup.");
	if (data.version !== 1) throw new Error("Unsupported backup version.");
	if (!data.settings || !Array.isArray(data.nitya)) throw new Error("Backup is missing required seva data.");
	return data;
}
async function restoreBackup(backup) {
	const logs = {};
	for (const log of backup.logs ?? []) logs[log.id] = log;
	const panchang = {};
	for (const p of backup.panchang ?? []) panchang[p.date] = p;
	await useSdsp.getState().replaceAll({
		settings: backup.settings,
		nitya: backup.nitya ?? [],
		logs,
		events: backup.events ?? [],
		categories: backup.categories ?? [],
		folders: backup.folders ?? [],
		files: backup.files ?? [],
		notes: backup.notes ?? [],
		procedures: backup.procedures ?? [],
		panchang,
		recents: backup.recents ?? []
	});
	if (backup.includeFiles && backup.blobs?.length) for (const b of backup.blobs) try {
		await putBlob({
			id: b.id,
			mime: b.mime,
			name: b.name,
			blob: base64ToBlob(b.data, b.mime)
		});
	} catch (err) {
		console.error("blob restore failed", err);
	}
}
function SettingsBoard() {
	const settings = useSdsp((s) => s.settings);
	const patch = useSdsp((s) => s.patchSettings);
	const reset = useSdsp((s) => s.resetNityaDefaults);
	const wipe = useSdsp((s) => s.wipeAll);
	const usage = useSdsp((s) => s.usage);
	const quota = useSdsp((s) => s.quota);
	const addFolder = useSdsp((s) => s.addFolder);
	const [confirm, setConfirm] = (0, import_react.useState)(null);
	const [pendingBackup, setPendingBackup] = (0, import_react.useState)(null);
	const [installEvt, setInstallEvt] = (0, import_react.useState)(null);
	const [perm, setPerm] = (0, import_react.useState)("default");
	const [folderName, setFolderName] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const onInstall = (e) => {
			e.preventDefault();
			setInstallEvt(e);
		};
		window.addEventListener("beforeinstallprompt", onInstall);
		if (typeof Notification !== "undefined") setPerm(Notification.permission);
		return () => window.removeEventListener("beforeinstallprompt", onInstall);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: "Settings"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Private, local, and fully under your control."
			})] }),
			message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl bg-secondary px-4 py-3 text-sm",
				children: message
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass space-y-4 rounded-2xl p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: "Appearance"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Theme" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: settings.theme,
							onValueChange: (v) => void patch({ theme: v }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "dark",
									children: "Dark"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "light",
									children: "Light"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "system",
									children: "System"
								})
							] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Font size" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: settings.fontSize,
							onValueChange: (v) => void patch({ fontSize: v }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "sm",
									children: "Small"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "md",
									children: "Medium"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "lg",
									children: "Large"
								})
							] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm",
							children: "Reduce motion"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: settings.reducedMotion,
							onCheckedChange: (v) => void patch({ reducedMotion: v })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm",
							children: "Compact dashboard"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: settings.dashboardCompact,
							onCheckedChange: (v) => void patch({ dashboardCompact: v })
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass space-y-4 rounded-2xl p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: "Calendar & panchang"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Default calendar view" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: settings.calendarDefaultView,
							onValueChange: (v) => void patch({ calendarDefaultView: v }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
								"day",
								"week",
								"month",
								"year",
								"agenda"
							].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: v,
								children: v
							}, v)) })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "ny",
								children: "Gujarati new year (MM-DD)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "ny",
								value: settings.vsNewYearMd,
								onChange: (e) => void patch({ vsNewYearMd: e.target.value })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Used only to estimate Vikram Samvat and month. Override any day from the dashboard."
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass space-y-4 rounded-2xl p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: "Reminders"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm",
							children: "Enable browser notifications"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: settings.notificationsEnabled,
							onCheckedChange: async (v) => {
								if (v) {
									const p = await ensureNotificationPermission();
									setPerm(p);
									if (p !== "granted") {
										setMessage("Notifications were not allowed. You can enable them in the browser site settings.");
										await patch({ notificationsEnabled: false });
										return;
									}
								}
								await patch({ notificationsEnabled: v });
							}
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"Permission: ",
							perm,
							". Reminders fire while SDSP is open."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "defrem",
							children: "Default reminder (minutes before)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "defrem",
							type: "number",
							min: 1,
							value: settings.defaultReminder,
							onChange: (e) => void patch({ defaultReminder: Math.max(1, Number(e.target.value) || 15) })
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass space-y-4 rounded-2xl p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: "Install"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "SDSP is an installable app. On Android, use the browser menu to Add to Home screen."
					}),
					installEvt && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: async () => {
							await installEvt.prompt();
							setInstallEvt(null);
						},
						children: "Install SDSP"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass space-y-4 rounded-2xl p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl",
					children: "Folders"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "New folder under SDSP",
						value: folderName,
						onChange: (e) => setFolderName(e.target.value)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => {
							if (!folderName.trim()) return;
							addFolder("folder_root", folderName.trim());
							setFolderName("");
						},
						children: "Create"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass space-y-4 rounded-2xl p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: "Backup SDSP"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [quota ? `Using ${formatBytes(usage)} of ${formatBytes(quota)}.` : "Storage estimate unavailable.", " Everything stays on this device."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: async () => {
									downloadBackup(await exportBackup(true));
								},
								children: "Backup SDSP"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: async () => {
									downloadBackup(await exportBackup(false));
								},
								children: "Export without files"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "inline-flex h-11 cursor-pointer items-center rounded-lg border border-border px-4 text-sm",
								children: ["Restore SDSP", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "file",
									accept: "application/json",
									className: "sr-only",
									onChange: async (e) => {
										const file = e.target.files?.[0];
										e.target.value = "";
										if (!file) return;
										try {
											const raw = JSON.parse(await file.text());
											setPendingBackup(parseBackup(raw));
											setConfirm("restore");
										} catch (err) {
											setMessage(err instanceof Error ? err.message : "Could not read that backup.");
										}
									}
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass space-y-4 rounded-2xl p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: "Seva structure"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => setConfirm("reset"),
						children: "Reset to default seva structure"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "destructive",
						onClick: () => setConfirm("wipe"),
						children: "Clear all data"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-foreground text-xl",
					children: "Privacy"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2",
					children: "No account, no analytics, no ads, no cloud. Photographs and PDFs live in this browser’s IndexedDB."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: Boolean(confirm),
				onOpenChange: (o) => !o && setConfirm(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogTitle, { children: [
					confirm === "reset" && "Reset nitya seva?",
					confirm === "wipe" && "Clear all SDSP data?",
					confirm === "restore" && "Restore this backup?"
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogDescription, { children: [
					confirm === "reset" && "The seven default nitya seva return. History logs are kept.",
					confirm === "wipe" && "Seva, files, notes and panchang on this device will be replaced with defaults.",
					confirm === "restore" && "Current data on this device will be replaced by the backup."
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: async () => {
						if (confirm === "reset") await reset();
						if (confirm === "wipe") await wipe();
						if (confirm === "restore" && pendingBackup) try {
							await restoreBackup(pendingBackup);
							setMessage("Backup restored.");
						} catch (err) {
							setMessage(err instanceof Error ? err.message : "Restore failed.");
						}
						setPendingBackup(null);
						setConfirm(null);
					},
					children: "Confirm"
				})] })] })
			})
		]
	});
}
function SettingsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsBoard, {});
}
//#endregion
export { SettingsPage as component };
