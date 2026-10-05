import { b as PAKSHA, k as parseISODate, v as GUJARATI_MONTHS, w as TITHIS, y as GUJARATI_WEEKDAYS } from "./dates-Ca_zgasn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/panchang-CPGzWG-D.js
/** Mean synodic month. Used only as a labelled estimate — never forced. */
var SYNODIC = 29.530588;
/** Approximate amavasya near Diwali 2026 (UTC noon). */
var KNOWN_AMA_MS = Date.UTC(2026, 9, 29, 6, 0, 0);
function startOfDay(d) {
	return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function vsYearFor(date, vsNewYearMd = "10-31") {
	const [mm, dd] = vsNewYearMd.split("-").map(Number);
	const month = Number.isFinite(mm) ? mm : 10;
	const day = Number.isFinite(dd) ? dd : 31;
	const y = date.getFullYear();
	return date >= startOfDay(new Date(y, month - 1, day)) ? y + 57 : y + 56;
}
function estimatedLunar(date) {
	const cycle = ((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 6, 0, 0) - KNOWN_AMA_MS) / 864e5 % SYNODIC + SYNODIC) % SYNODIC;
	const idx = Math.min(29, Math.floor(cycle));
	const paksha = idx < 15 ? "shukla" : "krishna";
	const tithiIndex = idx % 15;
	let tithi;
	if (idx === 14) tithi = "પૂનમ";
	else if (idx === 29) tithi = "અમાસ";
	else tithi = TITHIS[tithiIndex] ?? "પડવો";
	return {
		tithi,
		paksha,
		pakshaLabel: PAKSHA[paksha].gu,
		dayInCycle: idx
	};
}
function estimatedGujaratiMonth(date, vsNewYearMd = "10-31") {
	const [mm, dd] = vsNewYearMd.split("-").map(Number);
	const month = Number.isFinite(mm) ? mm : 10;
	const day = Number.isFinite(dd) ? dd : 31;
	const y = date.getFullYear();
	let newYear = new Date(y, month - 1, day);
	if (date < startOfDay(newYear)) newYear = new Date(y - 1, month - 1, day);
	const days = Math.floor((startOfDay(date).getTime() - startOfDay(newYear).getTime()) / 864e5);
	const idx = Math.min(11, Math.max(0, Math.floor(days / 30.44)));
	return GUJARATI_MONTHS[idx] ?? GUJARATI_MONTHS[0];
}
function estimatePanchang(iso, vsNewYearMd = "10-31") {
	const date = parseISODate(iso);
	const lunar = estimatedLunar(date);
	return {
		date: iso,
		vsYear: vsYearFor(date, vsNewYearMd),
		gujaratiMonth: estimatedGujaratiMonth(date, vsNewYearMd),
		tithi: lunar.tithi,
		paksha: lunar.pakshaLabel,
		manual: false
	};
}
function resolvePanchang(iso, overrides, vsNewYearMd = "10-31") {
	const override = overrides[iso];
	if (override) return override;
	return estimatePanchang(iso, vsNewYearMd);
}
function weekdayGu(iso) {
	return GUJARATI_WEEKDAYS[parseISODate(iso).getDay()] ?? "";
}
function formatVs(year) {
	return `વિ.સં. ${year}`;
}
//#endregion
export { resolvePanchang as n, weekdayGu as r, formatVs as t };
