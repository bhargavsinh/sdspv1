import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-M0FDeTFD.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatBytes(bytes) {
	if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
	const units = [
		"B",
		"KB",
		"MB",
		"GB"
	];
	const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
	const value = bytes / 1024 ** i;
	return `${value < 10 && i > 0 ? value.toFixed(1) : Math.round(value)} ${units[i]}`;
}
function todayISO(date = /* @__PURE__ */ new Date()) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function parseISODate(iso) {
	const [y, m, d] = iso.split("-").map(Number);
	return new Date(y || 1970, (m || 1) - 1, d || 1);
}
var APP_FULL = "Shri Devdaman Seva Planner";
var APP_GU = "શ્રી દેવદમનલાલ";
var STATUS_LABEL = {
	upcoming: {
		en: "Upcoming",
		gu: "આગામી"
	},
	"in-progress": {
		en: "In Progress",
		gu: "ચાલુ"
	},
	completed: {
		en: "Completed",
		gu: "પૂર્ણ"
	},
	skipped: {
		en: "Skipped",
		gu: "છૂટેલ"
	},
	cancelled: {
		en: "Cancelled",
		gu: "રદ"
	}
};
var GUJARATI_WEEKDAYS = [
	"રવિવાર",
	"સોમવાર",
	"મંગળવાર",
	"બુધવાર",
	"ગુરુવાર",
	"શુક્રવાર",
	"શનિવાર"
];
var EN_WEEKDAYS = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];
var GUJARATI_MONTHS = [
	"કારતક",
	"માગશર",
	"પોષ",
	"મહા",
	"ફાગણ",
	"ચૈત્ર",
	"વૈશાખ",
	"જેઠ",
	"અષાઢ",
	"શ્રાવણ",
	"ભાદરવો",
	"આસો"
];
var TITHIS = [
	"પડવો",
	"બીજ",
	"ત્રીજ",
	"ચોથ",
	"પંચમી",
	"છઠ",
	"સાતમ",
	"આઠમ",
	"નોમ",
	"દશમ",
	"એકાદશી",
	"બારસ",
	"તેરસ",
	"ચૌદશ"
];
var PAKSHA = {
	shukla: {
		gu: "શુક્લ પક્ષ",
		en: "Shukla Paksha",
		short: "સુદ"
	},
	krishna: {
		gu: "કૃષ્ણ પક્ષ",
		en: "Krishna Paksha",
		short: "વદ"
	}
};
var REMINDER_PRESETS = [
	5,
	10,
	15,
	30,
	60
];
function stamp(iso) {
	return {
		createdAt: iso,
		updatedAt: iso
	};
}
var SEED_AT = "2026-01-01T00:00:00.000Z";
var DEFAULT_CATEGORIES = [
	{
		id: "cat_nitya",
		name: "નિત્ય સેવા",
		nameEn: "Nitya Seva",
		kind: "nitya",
		system: true,
		order: 0
	},
	{
		id: "cat_utsav",
		name: "ઉત્સવ",
		nameEn: "Utsav",
		kind: "vishesh",
		system: true,
		order: 1
	},
	{
		id: "cat_manorath",
		name: "મનોરથ",
		nameEn: "Manorath",
		kind: "vishesh",
		system: true,
		order: 2
	},
	{
		id: "cat_festival",
		name: "તહેવાર",
		nameEn: "Festivals",
		kind: "vishesh",
		system: true,
		order: 3
	}
];
var DEFAULT_NITYA = [
	{
		id: "seva_shankhnad",
		name: "શંખનાદ",
		nameEn: "Shankhnad",
		order: 0,
		time: "04:45",
		durationMin: 15,
		description: "પ્રભુ જાગરણ પહેલાં શંખનાદ. The conch call that opens the day of seva.",
		instructions: "Clean space, light the lamp if customary, sound the shankh facing the seva.",
		notes: "",
		categoryId: "cat_nitya",
		reminderOffsets: [15],
		recurrence: { kind: "daily" },
		attachmentIds: [],
		icon: "shankh",
		enabled: true,
		...stamp(SEED_AT)
	},
	{
		id: "seva_mangala",
		name: "મંગલા",
		nameEn: "Mangala",
		order: 1,
		time: "05:30",
		durationMin: 45,
		description: "પ્રાતઃકાલીન મંગળા સેવા. First darshan of the day.",
		instructions: "Wake Sevya Prabhu with mangala aarti, offering, and morning stuti.",
		notes: "",
		categoryId: "cat_nitya",
		reminderOffsets: [15],
		recurrence: { kind: "daily" },
		attachmentIds: [],
		icon: "mangala",
		enabled: true,
		...stamp(SEED_AT)
	},
	{
		id: "seva_shringar",
		name: "શૃંગાર",
		nameEn: "Shringar",
		order: 2,
		time: "07:30",
		durationMin: 45,
		description: "વસ્ત્ર, આભૂષણ અને શૃંગાર. Adornment of Sevya Prabhu.",
		instructions: "Prepare vastra and shringar as per season and utsav; photograph only if permitted.",
		notes: "",
		categoryId: "cat_nitya",
		reminderOffsets: [15],
		recurrence: { kind: "daily" },
		attachmentIds: [],
		icon: "shringar",
		enabled: true,
		...stamp(SEED_AT)
	},
	{
		id: "seva_rajbhog",
		name: "રાજભોગ",
		nameEn: "Rajbhog",
		order: 3,
		time: "11:00",
		durationMin: 60,
		description: "મધ્યાહ્ન રાજભોગ ભોગ. Principal offering of the day.",
		instructions: "Prepare bhog with purity, offer, and observe rest period after rajbhog.",
		notes: "",
		categoryId: "cat_nitya",
		reminderOffsets: [30, 15],
		recurrence: { kind: "daily" },
		attachmentIds: [],
		icon: "rajbhog",
		enabled: true,
		...stamp(SEED_AT)
	},
	{
		id: "seva_utthapan",
		name: "ઉત્થાપન",
		nameEn: "Utthapan",
		order: 4,
		time: "16:15",
		durationMin: 30,
		description: "અપરાહ્ન ઉત્થાપન. Afternoon awakening after rest.",
		instructions: "Wake Sevya Prabhu gently; refresh shringar if needed.",
		notes: "",
		categoryId: "cat_nitya",
		reminderOffsets: [15],
		recurrence: { kind: "daily" },
		attachmentIds: [],
		icon: "utthapan",
		enabled: true,
		...stamp(SEED_AT)
	},
	{
		id: "seva_sandhya",
		name: "સંધ્યા",
		nameEn: "Sandhya",
		order: 5,
		time: "18:00",
		durationMin: 45,
		description: "સાંજની સંધ્યા આરતી. Evening aarti and seva.",
		instructions: "Light lamps, perform sandhya aarti, and offer evening bhog.",
		notes: "",
		categoryId: "cat_nitya",
		reminderOffsets: [15],
		recurrence: { kind: "daily" },
		attachmentIds: [],
		icon: "sandhya",
		enabled: true,
		...stamp(SEED_AT)
	},
	{
		id: "seva_shayan",
		name: "શયન",
		nameEn: "Shayan",
		order: 6,
		time: "20:45",
		durationMin: 40,
		description: "રાત્રિ શયન સેવા. Rest for Sevya Prabhu.",
		instructions: "Final aarti, prepare shayan, and close the day's seva with pranam.",
		notes: "",
		categoryId: "cat_nitya",
		reminderOffsets: [15],
		recurrence: { kind: "daily" },
		attachmentIds: [],
		icon: "shayan",
		enabled: true,
		...stamp(SEED_AT)
	}
];
var DEFAULT_FOLDERS = [
	{
		id: "folder_root",
		parentId: null,
		name: "SDSP",
		system: true,
		archived: false,
		createdAt: SEED_AT
	},
	{
		id: "folder_nitya",
		parentId: "folder_root",
		name: "Nitya Seva",
		system: true,
		archived: false,
		createdAt: SEED_AT
	},
	{
		id: "folder_shankhnad",
		parentId: "folder_nitya",
		name: "Shankhnad",
		system: true,
		archived: false,
		createdAt: SEED_AT
	},
	{
		id: "folder_mangala",
		parentId: "folder_nitya",
		name: "Mangala",
		system: true,
		archived: false,
		createdAt: SEED_AT
	},
	{
		id: "folder_shringar",
		parentId: "folder_nitya",
		name: "Shringar",
		system: true,
		archived: false,
		createdAt: SEED_AT
	},
	{
		id: "folder_rajbhog",
		parentId: "folder_nitya",
		name: "Rajbhog",
		system: true,
		archived: false,
		createdAt: SEED_AT
	},
	{
		id: "folder_utthapan",
		parentId: "folder_nitya",
		name: "Utthapan",
		system: true,
		archived: false,
		createdAt: SEED_AT
	},
	{
		id: "folder_sandhya",
		parentId: "folder_nitya",
		name: "Sandhya",
		system: true,
		archived: false,
		createdAt: SEED_AT
	},
	{
		id: "folder_shayan",
		parentId: "folder_nitya",
		name: "Shayan",
		system: true,
		archived: false,
		createdAt: SEED_AT
	},
	{
		id: "folder_vishesh",
		parentId: "folder_root",
		name: "Vishesh Seva",
		system: true,
		archived: false,
		createdAt: SEED_AT
	},
	{
		id: "folder_utsav",
		parentId: "folder_vishesh",
		name: "Utsav",
		system: true,
		archived: false,
		createdAt: SEED_AT
	},
	{
		id: "folder_manorath",
		parentId: "folder_vishesh",
		name: "Manorath",
		system: true,
		archived: false,
		createdAt: SEED_AT
	},
	{
		id: "folder_pranalika",
		parentId: "folder_root",
		name: "Seva Pranalika",
		system: true,
		archived: false,
		createdAt: SEED_AT
	},
	{
		id: "folder_festivals",
		parentId: "folder_root",
		name: "Festivals",
		system: true,
		archived: false,
		createdAt: SEED_AT
	},
	{
		id: "folder_panchang",
		parentId: "folder_root",
		name: "Panchang",
		system: true,
		archived: false,
		createdAt: SEED_AT
	},
	{
		id: "folder_photos",
		parentId: "folder_root",
		name: "Photos",
		system: true,
		archived: false,
		createdAt: SEED_AT
	},
	{
		id: "folder_pdfs",
		parentId: "folder_root",
		name: "PDFs",
		system: true,
		archived: false,
		createdAt: SEED_AT
	},
	{
		id: "folder_notes",
		parentId: "folder_root",
		name: "Notes",
		system: true,
		archived: false,
		createdAt: SEED_AT
	},
	{
		id: "folder_archive",
		parentId: "folder_root",
		name: "Archive",
		system: true,
		archived: false,
		createdAt: SEED_AT
	}
];
var SEVA_FOLDER = {
	seva_shankhnad: "folder_shankhnad",
	seva_mangala: "folder_mangala",
	seva_shringar: "folder_shringar",
	seva_rajbhog: "folder_rajbhog",
	seva_utthapan: "folder_utthapan",
	seva_sandhya: "folder_sandhya",
	seva_shayan: "folder_shayan"
};
var DEFAULT_EVENTS = [
	{
		id: "evt_diwali_2026",
		title: "દિવાળી — આનંદોત્સવ",
		categoryId: "cat_utsav",
		date: "2026-10-29",
		startTime: "18:00",
		endTime: "21:30",
		vsYear: 2082,
		tithi: "અમાસ",
		paksha: "કૃષ્ણ પક્ષ",
		gujaratiMonth: "આસો",
		description: "Deepavali utsav. Confirm tithi locally; this date is a planner placeholder.",
		procedure: "Sandhya deep, vishesh shringar, and evening bhog as per your pranalika.",
		notes: "",
		photoIds: [],
		pdfIds: [],
		attachmentIds: [],
		reminderOffsets: [60, 15],
		status: "upcoming",
		tags: ["utsav", "diwali"],
		favorite: true,
		...stamp(SEED_AT)
	},
	{
		id: "evt_bestu_2026",
		title: "નૂતન વર્ષ — બેસતું વર્ષ",
		categoryId: "cat_festival",
		date: "2026-10-31",
		startTime: "06:00",
		endTime: "12:00",
		vsYear: 2083,
		tithi: "પડવો",
		paksha: "શુક્લ પક્ષ",
		gujaratiMonth: "કારતક",
		description: "Gujarati New Year (Kartak Sud 1). Override if your panchang differs.",
		procedure: "Mangala and vishesh darshan for the new Vikram Samvat year.",
		notes: "",
		photoIds: [],
		pdfIds: [],
		attachmentIds: [],
		reminderOffsets: [60],
		status: "upcoming",
		tags: ["new-year", "kartak"],
		favorite: true,
		...stamp(SEED_AT)
	},
	{
		id: "evt_manorath_annakut",
		title: "અન્નકૂટ મનોરથ",
		categoryId: "cat_manorath",
		date: "2026-10-30",
		startTime: "10:30",
		endTime: "13:00",
		vsYear: 2082,
		tithi: "પડવો",
		paksha: "શુક્લ પક્ષ",
		gujaratiMonth: "કારતક",
		description: "Annakut manorath offering. Adjust bhog list in notes.",
		procedure: "Prepare annakut thaal, offer at rajbhog, and record photographs in Vishesh Seva / Manorath.",
		notes: "",
		photoIds: [],
		pdfIds: [],
		attachmentIds: [],
		reminderOffsets: [30],
		status: "upcoming",
		tags: ["manorath", "annakut"],
		favorite: false,
		...stamp(SEED_AT)
	}
];
var SAMPLE_NOTE_ID = "note_welcome";
function nid(prefix = "id") {
	const rand = Math.random().toString(36).slice(2, 8);
	return `${prefix}_${Date.now().toString(36)}_${rand}`;
}
function logId(date, sevaId) {
	return `log_${date}_${sevaId}`;
}
var DEFAULT_SETTINGS = {
	theme: "dark",
	fontSize: "md",
	reducedMotion: false,
	notificationsEnabled: false,
	defaultReminder: 15,
	reminderOffsets: [
		5,
		10,
		15,
		30,
		60
	],
	vsNewYearMd: "10-31",
	calendarDefaultView: "month",
	dashboardCompact: false,
	languageHint: "gu-en",
	installedDismissed: false
};
var ALLOWED_MIME = /* @__PURE__ */ new Set([
	"application/pdf",
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
	"image/gif"
]);
var ALLOWED_EXT = /* @__PURE__ */ new Set([
	"pdf",
	"jpg",
	"jpeg",
	"png",
	"webp",
	"gif"
]);
var DB_NAME = "sdsp-db";
var DB_VERSION = 1;
var STORES = [
	"kv",
	"nitya",
	"logs",
	"events",
	"categories",
	"folders",
	"files",
	"blobs",
	"notes",
	"panchang",
	"procedures",
	"recents"
];
var dbPromise = null;
function available() {
	return typeof indexedDB !== "undefined";
}
function openDb() {
	if (!available()) return Promise.reject(/* @__PURE__ */ new Error("IndexedDB is not available in this environment."));
	if (dbPromise) return dbPromise;
	dbPromise = new Promise((resolve, reject) => {
		const req = indexedDB.open(DB_NAME, DB_VERSION);
		req.onupgradeneeded = () => {
			const db = req.result;
			for (const name of STORES) if (!db.objectStoreNames.contains(name)) db.createObjectStore(name, { keyPath: "id" });
		};
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => {
			dbPromise = null;
			reject(req.error ?? /* @__PURE__ */ new Error("Failed to open SDSP storage."));
		};
	});
	return dbPromise;
}
function txDone(tx) {
	return new Promise((resolve, reject) => {
		tx.oncomplete = () => resolve();
		tx.onerror = () => reject(tx.error ?? /* @__PURE__ */ new Error("Storage transaction failed."));
		tx.onabort = () => reject(tx.error ?? /* @__PURE__ */ new Error("Storage transaction aborted."));
	});
}
async function getAll(store) {
	const db = await openDb();
	return new Promise((resolve, reject) => {
		const req = db.transaction(store, "readonly").objectStore(store).getAll();
		req.onsuccess = () => resolve(req.result ?? []);
		req.onerror = () => reject(req.error);
	});
}
async function getById(store, id) {
	const db = await openDb();
	return new Promise((resolve, reject) => {
		const req = db.transaction(store, "readonly").objectStore(store).get(id);
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error);
	});
}
async function putOne(store, value) {
	const tx = (await openDb()).transaction(store, "readwrite");
	tx.objectStore(store).put(value);
	await txDone(tx);
}
async function putMany(store, values) {
	if (!values.length) return;
	const tx = (await openDb()).transaction(store, "readwrite");
	const os = tx.objectStore(store);
	for (const v of values) os.put(v);
	await txDone(tx);
}
async function deleteOne(store, id) {
	const tx = (await openDb()).transaction(store, "readwrite");
	tx.objectStore(store).delete(id);
	await txDone(tx);
}
async function clearAllStores() {
	const tx = (await openDb()).transaction([...STORES], "readwrite");
	for (const name of STORES) tx.objectStore(name).clear();
	await txDone(tx);
}
async function putBlob(record) {
	await putOne("blobs", record);
}
async function getBlob(id) {
	return getById("blobs", id);
}
async function estimateStorage() {
	try {
		if (navigator.storage?.estimate) {
			const est = await navigator.storage.estimate();
			return {
				usage: est.usage ?? 0,
				quota: est.quota ?? 0
			};
		}
	} catch {}
	return {
		usage: 0,
		quota: 0
	};
}
function isQuotaError(err) {
	if (!err || typeof err !== "object") return false;
	const e = err;
	return e.name === "QuotaExceededError" || /quota/i.test(e.message ?? "");
}
var toastFn = () => {};
function bindToast(fn) {
	toastFn = fn;
}
function nowIso() {
	return (/* @__PURE__ */ new Date()).toISOString();
}
function fileKind(mime, name) {
	if (mime === "application/pdf" || name.toLowerCase().endsWith(".pdf")) return "pdf";
	if (mime.startsWith("image/")) return "image";
	return "other";
}
function extOf(name) {
	return name.split(".").pop()?.toLowerCase() ?? "";
}
function validateFile(file) {
	const ext = extOf(file.name);
	if (file.size > 26214400) return `"${file.name}" is larger than 25 MB.`;
	if (!ALLOWED_MIME.has(file.type) && !ALLOWED_EXT.has(ext)) return `"${file.name}" is not a supported format. Use PDF, JPG, PNG, WEBP or GIF.`;
	return null;
}
var sampleNote = {
	id: SAMPLE_NOTE_ID,
	title: "Seva intention",
	body: "This planner stays on this device. Add your own pranalika, photographs, and panchang overrides. Religious documents are stored as uploaded — SDSP never rewrites them.",
	private: true,
	tags: ["personal"],
	favorite: true,
	archived: false,
	createdAt: nowIso(),
	updatedAt: nowIso()
};
async function persistCollection(store, items) {
	await putMany(store, items);
}
var useSdsp = create((set, get) => ({
	ready: false,
	error: null,
	online: typeof navigator === "undefined" ? true : navigator.onLine,
	settings: DEFAULT_SETTINGS,
	nitya: DEFAULT_NITYA,
	logs: {},
	events: DEFAULT_EVENTS,
	categories: DEFAULT_CATEGORIES,
	folders: DEFAULT_FOLDERS,
	files: [],
	notes: [sampleNote],
	procedures: [],
	panchang: {},
	recents: [],
	usage: 0,
	quota: 0,
	hydrate: async () => {
		if (typeof indexedDB === "undefined") {
			set({
				ready: true,
				error: "Local storage is unavailable. Changes will not persist."
			});
			return;
		}
		try {
			const [kv, nitya, logs, events, categories, folders, files, notes, procedures, panchang, recents] = await Promise.all([
				getAll("kv"),
				getAll("nitya"),
				getAll("logs"),
				getAll("events"),
				getAll("categories"),
				getAll("folders"),
				getAll("files"),
				getAll("notes"),
				getAll("procedures"),
				getAll("panchang"),
				getAll("recents")
			]);
			const settingsRow = kv.find((k) => k.id === "settings");
			const seeded = kv.find((k) => k.id === "seeded");
			const settings = {
				...DEFAULT_SETTINGS,
				...settingsRow?.value ?? {}
			};
			if (!seeded) {
				await persistCollection("nitya", DEFAULT_NITYA);
				await persistCollection("events", DEFAULT_EVENTS);
				await persistCollection("categories", DEFAULT_CATEGORIES);
				await persistCollection("folders", DEFAULT_FOLDERS);
				await persistCollection("notes", [sampleNote]);
				await putOne("kv", {
					id: "seeded",
					value: true
				});
				await putOne("kv", {
					id: "settings",
					value: settings
				});
				set({
					ready: true,
					settings,
					nitya: DEFAULT_NITYA,
					events: DEFAULT_EVENTS,
					categories: DEFAULT_CATEGORIES,
					folders: DEFAULT_FOLDERS,
					notes: [sampleNote],
					logs: {},
					files: [],
					procedures: [],
					panchang: {},
					recents: [],
					error: null
				});
			} else {
				const logMap = {};
				for (const log of logs) logMap[log.id] = log;
				const panMap = {};
				for (const p of panchang) panMap[p.date] = p;
				set({
					ready: true,
					settings,
					nitya: nitya.length ? nitya.sort((a, b) => a.order - b.order) : DEFAULT_NITYA,
					logs: logMap,
					events: events.length ? events : DEFAULT_EVENTS,
					categories: categories.length ? categories : DEFAULT_CATEGORIES,
					folders: folders.length ? folders : DEFAULT_FOLDERS,
					files,
					notes,
					procedures,
					panchang: panMap,
					recents: recents.sort((a, b) => b.openedAt.localeCompare(a.openedAt)).slice(0, 40),
					error: null
				});
			}
			await get().refreshQuota();
		} catch (err) {
			console.error(err);
			set({
				ready: true,
				error: err instanceof Error ? err.message : "Could not load local data."
			});
		}
	},
	persistKv: async () => {
		try {
			await putOne("kv", {
				id: "settings",
				value: get().settings
			});
		} catch (err) {
			toastFn(isQuotaError(err) ? "Storage is full. Export a backup and free space." : "Could not save settings.");
		}
	},
	setOnline: (v) => set({ online: v }),
	patchSettings: async (patch) => {
		set({ settings: {
			...get().settings,
			...patch
		} });
		await get().persistKv();
	},
	upsertNitya: async (seva) => {
		set({ nitya: (get().nitya.some((s) => s.id === seva.id) ? get().nitya.map((s) => s.id === seva.id ? seva : s) : [...get().nitya, seva]).sort((a, b) => a.order - b.order) });
		await putOne("nitya", seva);
	},
	addNitya: async (partial = {}) => {
		const order = get().nitya.reduce((m, s) => Math.max(m, s.order), -1) + 1;
		const seva = {
			id: nid("seva"),
			name: "નવી સેવા",
			nameEn: "New Seva",
			order,
			time: "08:00",
			durationMin: 30,
			description: "",
			instructions: "",
			notes: "",
			categoryId: "cat_nitya",
			reminderOffsets: [get().settings.defaultReminder],
			recurrence: { kind: "daily" },
			attachmentIds: [],
			icon: "custom",
			enabled: true,
			createdAt: nowIso(),
			updatedAt: nowIso(),
			...partial
		};
		await get().upsertNitya(seva);
		return seva;
	},
	duplicateNitya: async (id) => {
		const src = get().nitya.find((s) => s.id === id);
		if (!src) return null;
		return get().addNitya({
			...src,
			id: nid("seva"),
			name: `${src.name} (copy)`,
			nameEn: `${src.nameEn} (copy)`,
			order: src.order + .5,
			createdAt: nowIso(),
			updatedAt: nowIso()
		});
	},
	removeNitya: async (id) => {
		const prev = get().nitya;
		set({ nitya: prev.filter((s) => s.id !== id) });
		await deleteOne("nitya", id);
		toastFn("Seva removed", { action: {
			label: "Undo",
			onClick: () => {
				const found = prev.find((s) => s.id === id);
				if (found) get().upsertNitya(found);
			}
		} });
	},
	reorderNitya: async (orderedIds) => {
		const map = new Map(get().nitya.map((s) => [s.id, s]));
		const next = orderedIds.map((id, i) => {
			const s = map.get(id);
			return s ? {
				...s,
				order: i,
				updatedAt: nowIso()
			} : null;
		}).filter((s) => Boolean(s));
		set({ nitya: next });
		await persistCollection("nitya", next);
	},
	resetNityaDefaults: async () => {
		set({ nitya: DEFAULT_NITYA });
		await persistCollection("nitya", DEFAULT_NITYA);
	},
	setSevaStatus: async (date, sevaId, status, note) => {
		const id = logId(date, sevaId);
		const prev = get().logs[id];
		const log = {
			id,
			date,
			sevaId,
			status,
			note,
			completedAt: status === "completed" ? nowIso() : prev?.completedAt,
			updatedAt: nowIso()
		};
		set({ logs: {
			...get().logs,
			[id]: log
		} });
		await putOne("logs", log);
	},
	clearSevaStatus: async (date, sevaId) => {
		const id = logId(date, sevaId);
		const copy = { ...get().logs };
		delete copy[id];
		set({ logs: copy });
		await deleteOne("logs", id);
	},
	upsertEvent: async (event) => {
		set({ events: get().events.some((e) => e.id === event.id) ? get().events.map((e) => e.id === event.id ? event : e) : [...get().events, event] });
		await putOne("events", event);
	},
	addEvent: async (partial = {}) => {
		const event = {
			id: nid("evt"),
			title: "નવો વિશેષ સેવા",
			categoryId: "cat_utsav",
			date: todayISO(),
			startTime: "08:00",
			endTime: "10:00",
			description: "",
			procedure: "",
			notes: "",
			photoIds: [],
			pdfIds: [],
			attachmentIds: [],
			reminderOffsets: [get().settings.defaultReminder],
			status: "upcoming",
			tags: [],
			favorite: false,
			createdAt: nowIso(),
			updatedAt: nowIso(),
			...partial
		};
		await get().upsertEvent(event);
		return event;
	},
	duplicateEvent: async (id) => {
		const src = get().events.find((e) => e.id === id);
		if (!src) return null;
		return get().addEvent({
			...src,
			id: nid("evt"),
			title: `${src.title} (copy)`,
			createdAt: nowIso(),
			updatedAt: nowIso()
		});
	},
	removeEvent: async (id) => {
		const prev = get().events.find((e) => e.id === id);
		set({ events: get().events.filter((e) => e.id !== id) });
		await deleteOne("events", id);
		if (prev) toastFn("Event removed", { action: {
			label: "Undo",
			onClick: () => void get().upsertEvent(prev)
		} });
	},
	addCategory: async (name, nameEn) => {
		const cat = {
			id: nid("cat"),
			name,
			nameEn: nameEn || name,
			kind: "custom",
			system: false,
			order: get().categories.length
		};
		set({ categories: [...get().categories, cat] });
		await putOne("categories", cat);
		return cat;
	},
	updateCategory: async (id, patch) => {
		const categories = get().categories.map((c) => c.id === id ? {
			...c,
			...patch
		} : c);
		set({ categories });
		const found = categories.find((c) => c.id === id);
		if (found) await putOne("categories", found);
	},
	removeCategory: async (id) => {
		const cat = get().categories.find((c) => c.id === id);
		if (!cat || cat.system) return;
		set({ categories: get().categories.filter((c) => c.id !== id) });
		await deleteOne("categories", id);
	},
	addFolder: async (parentId, name) => {
		const folder = {
			id: nid("folder"),
			parentId,
			name: name.trim() || "New folder",
			system: false,
			archived: false,
			createdAt: nowIso()
		};
		set({ folders: [...get().folders, folder] });
		await putOne("folders", folder);
		return folder;
	},
	renameFolder: async (id, name) => {
		const folders = get().folders.map((f) => f.id === id ? {
			...f,
			name
		} : f);
		set({ folders });
		const found = folders.find((f) => f.id === id);
		if (found) await putOne("folders", found);
	},
	moveFolder: async (id, parentId) => {
		if (id === parentId) return;
		const folders = get().folders.map((f) => f.id === id ? {
			...f,
			parentId
		} : f);
		set({ folders });
		const found = folders.find((f) => f.id === id);
		if (found) await putOne("folders", found);
	},
	archiveFolder: async (id, archived) => {
		const folders = get().folders.map((f) => f.id === id ? {
			...f,
			archived
		} : f);
		set({ folders });
		const found = folders.find((f) => f.id === id);
		if (found) await putOne("folders", found);
	},
	removeFolder: async (id) => {
		const folder = get().folders.find((f) => f.id === id);
		if (!folder || folder.system) {
			toastFn("System folders cannot be deleted. Archive instead.");
			return;
		}
		const hasChildren = get().folders.some((f) => f.parentId === id);
		const hasFiles = get().files.some((f) => f.folderId === id);
		if (hasChildren || hasFiles) {
			toastFn("Move or delete contents before removing this folder.");
			return;
		}
		set({ folders: get().folders.filter((f) => f.id !== id) });
		await deleteOne("folders", id);
	},
	ingestFiles: async (list, folderId, extra = {}) => {
		const created = [];
		for (const file of list) {
			const err = validateFile(file);
			if (err) {
				toastFn(err);
				continue;
			}
			const id = nid("file");
			const meta = {
				id,
				folderId,
				name: file.name,
				mime: file.type || (extOf(file.name) === "pdf" ? "application/pdf" : "application/octet-stream"),
				size: file.size,
				kind: fileKind(file.type, file.name),
				createdAt: nowIso(),
				updatedAt: nowIso(),
				favorite: false,
				archived: false,
				tags: [],
				...extra
			};
			try {
				await putBlob({
					id,
					blob: file,
					mime: meta.mime,
					name: meta.name
				});
				await putOne("files", meta);
				created.push(meta);
			} catch (e) {
				toastFn(isQuotaError(e) ? "Storage limit reached. Remove files or export a backup." : "Could not save that file.");
			}
		}
		if (created.length) set({ files: [...get().files, ...created] });
		await get().refreshQuota();
		return created;
	},
	renameFile: async (id, name) => {
		const files = get().files.map((f) => f.id === id ? {
			...f,
			name,
			updatedAt: nowIso()
		} : f);
		set({ files });
		const found = files.find((f) => f.id === id);
		if (found) await putOne("files", found);
	},
	moveFile: async (id, folderId) => {
		const files = get().files.map((f) => f.id === id ? {
			...f,
			folderId,
			updatedAt: nowIso()
		} : f);
		set({ files });
		const found = files.find((f) => f.id === id);
		if (found) await putOne("files", found);
	},
	copyFile: async (id, folderId) => {
		const src = get().files.find((f) => f.id === id);
		const blob = await getBlob(id);
		if (!src || !blob) return null;
		const copyId = nid("file");
		const meta = {
			...src,
			id: copyId,
			folderId: folderId ?? src.folderId,
			name: src.name.replace(/(\.[^.]+)?$/, (m) => ` copy${m}`),
			createdAt: nowIso(),
			updatedAt: nowIso()
		};
		try {
			await putBlob({
				id: copyId,
				blob: blob.blob,
				mime: src.mime,
				name: meta.name
			});
			await putOne("files", meta);
			set({ files: [...get().files, meta] });
			return meta;
		} catch (e) {
			toastFn(isQuotaError(e) ? "Storage limit reached." : "Could not copy file.");
			return null;
		}
	},
	archiveFile: async (id, archived) => {
		const archiveId = "folder_archive";
		const files = get().files.map((f) => f.id === id ? {
			...f,
			archived,
			folderId: archived ? archiveId : f.folderId === archiveId ? "folder_root" : f.folderId,
			updatedAt: nowIso()
		} : f);
		set({ files });
		const found = files.find((f) => f.id === id);
		if (found) await putOne("files", found);
	},
	toggleFavoriteFile: async (id) => {
		const files = get().files.map((f) => f.id === id ? {
			...f,
			favorite: !f.favorite,
			updatedAt: nowIso()
		} : f);
		set({ files });
		const found = files.find((f) => f.id === id);
		if (found) await putOne("files", found);
	},
	removeFile: async (id) => {
		get().files.find((f) => f.id === id);
		set({ files: get().files.filter((f) => f.id !== id) });
		await deleteOne("files", id);
		await deleteOne("blobs", id);
		await get().refreshQuota();
		toastFn("File deleted", { action: {
			label: "Cannot undo binary",
			onClick: () => void 0
		} });
	},
	readBlob: async (id) => getBlob(id),
	upsertNote: async (note) => {
		set({ notes: get().notes.some((n) => n.id === note.id) ? get().notes.map((n) => n.id === note.id ? note : n) : [...get().notes, note] });
		await putOne("notes", note);
	},
	addNote: async (partial = {}) => {
		const note = {
			id: nid("note"),
			title: "નોંધ",
			body: "",
			private: true,
			tags: [],
			favorite: false,
			archived: false,
			createdAt: nowIso(),
			updatedAt: nowIso(),
			...partial
		};
		await get().upsertNote(note);
		return note;
	},
	removeNote: async (id) => {
		const prev = get().notes.find((n) => n.id === id);
		set({ notes: get().notes.filter((n) => n.id !== id) });
		await deleteOne("notes", id);
		if (prev) toastFn("Note removed", { action: {
			label: "Undo",
			onClick: () => void get().upsertNote(prev)
		} });
	},
	upsertProcedure: async (item) => {
		set({ procedures: get().procedures.some((p) => p.id === item.id) ? get().procedures.map((p) => p.id === item.id ? item : p) : [...get().procedures, item] });
		await putOne("procedures", item);
	},
	addProcedure: async (partial = {}) => {
		const item = {
			id: nid("proc"),
			title: "સેવા પ્રણાલિકા",
			body: "",
			version: 1,
			versions: [{
				version: 1,
				body: "",
				createdAt: nowIso()
			}],
			sevaIds: [],
			tags: [],
			bookmarked: false,
			fileIds: [],
			notes: "",
			archived: false,
			createdAt: nowIso(),
			updatedAt: nowIso(),
			...partial
		};
		await get().upsertProcedure(item);
		return item;
	},
	saveProcedureVersion: async (id, body) => {
		const src = get().procedures.find((p) => p.id === id);
		if (!src) return;
		const version = src.version + 1;
		const next = {
			...src,
			body,
			version,
			versions: [...src.versions, {
				version,
				body,
				createdAt: nowIso()
			}],
			updatedAt: nowIso()
		};
		await get().upsertProcedure(next);
	},
	removeProcedure: async (id) => {
		const prev = get().procedures.find((p) => p.id === id);
		set({ procedures: get().procedures.filter((p) => p.id !== id) });
		await deleteOne("procedures", id);
		if (prev) toastFn("Procedure removed", { action: {
			label: "Undo",
			onClick: () => void get().upsertProcedure(prev)
		} });
	},
	upsertPanchang: async (day) => {
		set({ panchang: {
			...get().panchang,
			[day.date]: day
		} });
		await putOne("panchang", {
			...day,
			id: day.date
		});
	},
	clearPanchang: async (date) => {
		const copy = { ...get().panchang };
		delete copy[date];
		set({ panchang: copy });
		await deleteOne("panchang", date);
	},
	touchRecent: async (entry) => {
		const rec = {
			...entry,
			id: nid("recent"),
			openedAt: nowIso()
		};
		set({ recents: [rec, ...get().recents.filter((r) => !(r.kind === entry.kind && r.refId === entry.refId))].slice(0, 40) });
		await putOne("recents", rec);
	},
	replaceAll: async (payload) => {
		if (payload.settings) set({ settings: payload.settings });
		if (payload.nitya) set({ nitya: payload.nitya });
		if (payload.logs) set({ logs: payload.logs });
		if (payload.events) set({ events: payload.events });
		if (payload.categories) set({ categories: payload.categories });
		if (payload.folders) set({ folders: payload.folders });
		if (payload.files) set({ files: payload.files });
		if (payload.notes) set({ notes: payload.notes });
		if (payload.procedures) set({ procedures: payload.procedures });
		if (payload.panchang) set({ panchang: payload.panchang });
		if (payload.recents) set({ recents: payload.recents });
		const s = get();
		await persistCollection("nitya", s.nitya);
		await persistCollection("events", s.events);
		await persistCollection("categories", s.categories);
		await persistCollection("folders", s.folders);
		await persistCollection("files", s.files);
		await persistCollection("notes", s.notes);
		await persistCollection("procedures", s.procedures);
		await persistCollection("recents", s.recents);
		await persistCollection("panchang", Object.values(s.panchang).map((p) => ({
			...p,
			id: p.date
		})));
		await persistCollection("logs", Object.values(s.logs));
		await putOne("kv", {
			id: "settings",
			value: s.settings
		});
		await putOne("kv", {
			id: "seeded",
			value: true
		});
	},
	wipeAll: async () => {
		await clearAllStores();
		set({
			settings: DEFAULT_SETTINGS,
			nitya: DEFAULT_NITYA,
			logs: {},
			events: DEFAULT_EVENTS,
			categories: DEFAULT_CATEGORIES,
			folders: DEFAULT_FOLDERS,
			files: [],
			notes: [sampleNote],
			procedures: [],
			panchang: {},
			recents: []
		});
		await persistCollection("nitya", DEFAULT_NITYA);
		await persistCollection("events", DEFAULT_EVENTS);
		await persistCollection("categories", DEFAULT_CATEGORIES);
		await persistCollection("folders", DEFAULT_FOLDERS);
		await persistCollection("notes", [sampleNote]);
		await putOne("kv", {
			id: "seeded",
			value: true
		});
		await putOne("kv", {
			id: "settings",
			value: DEFAULT_SETTINGS
		});
	},
	refreshQuota: async () => {
		const { usage, quota } = await estimateStorage();
		set({
			usage,
			quota
		});
	}
}));
function sevaStatusFor(logs, date, sevaId) {
	return logs[logId(date, sevaId)]?.status ?? "upcoming";
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/dates-Ca_zgasn.js
function addDays(iso, days) {
	const d = parseISODate(iso);
	d.setDate(d.getDate() + days);
	return todayISO(d);
}
function startOfWeek(iso, weekStartsOn = 1) {
	const d = parseISODate(iso);
	const diff = (d.getDay() - weekStartsOn + 7) % 7;
	d.setDate(d.getDate() - diff);
	return todayISO(d);
}
function startOfMonth(iso) {
	const d = parseISODate(iso);
	return todayISO(new Date(d.getFullYear(), d.getMonth(), 1));
}
function monthGrid(iso, weekStartsOn = 1) {
	const start = startOfWeek(startOfMonth(iso), weekStartsOn);
	const cells = [];
	for (let i = 0; i < 42; i++) cells.push(addDays(start, i));
	return cells;
}
function weekDays(iso, weekStartsOn = 1) {
	const start = startOfWeek(iso, weekStartsOn);
	return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}
function yearMonths(year) {
	return Array.from({ length: 12 }, (_, i) => todayISO(new Date(year, i, 1)));
}
function sameMonth(a, b) {
	return a.slice(0, 7) === b.slice(0, 7);
}
function formatLong(iso) {
	return parseISODate(iso).toLocaleDateString("en-IN", {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	});
}
function formatMedium(iso) {
	return parseISODate(iso).toLocaleDateString("en-IN", {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
}
function formatMonthYear(iso) {
	return parseISODate(iso).toLocaleDateString("en-IN", {
		month: "long",
		year: "numeric"
	});
}
function formatTime(hhmm) {
	const [hStr, mStr] = hhmm.split(":");
	const h = Number(hStr);
	const m = Number(mStr);
	if (!Number.isFinite(h)) return hhmm;
	const ampm = h >= 12 ? "PM" : "AM";
	return `${h % 12 || 12}:${String(m || 0).padStart(2, "0")} ${ampm}`;
}
function combineDateTime(iso, hhmm) {
	const d = parseISODate(iso);
	const [h, m] = hhmm.split(":").map(Number);
	d.setHours(h || 0, m || 0, 0, 0);
	return d;
}
function isValidISODate(value) {
	if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
	return todayISO(parseISODate(value)) === value;
}
function isValidHHMM(value) {
	if (!/^\d{2}:\d{2}$/.test(value)) return false;
	const [h, m] = value.split(":").map(Number);
	return h >= 0 && h <= 23 && m >= 0 && m <= 59;
}
//#endregion
export { putBlob as A, STATUS_LABEL as C, formatBytes as D, cn as E, todayISO as M, useSdsp as N, getBlob as O, SEVA_FOLDER as S, bindToast as T, EN_WEEKDAYS as _, formatMonthYear as a, PAKSHA as b, isValidISODate as c, startOfMonth as d, startOfWeek as f, APP_GU as g, APP_FULL as h, formatMedium as i, sevaStatusFor as j, parseISODate as k, monthGrid as l, yearMonths as m, combineDateTime as n, formatTime as o, weekDays as p, formatLong as r, isValidHHMM as s, addDays as t, sameMonth as u, GUJARATI_MONTHS as v, TITHIS as w, REMINDER_PRESETS as x, GUJARATI_WEEKDAYS as y };
