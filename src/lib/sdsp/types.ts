export type SevaStatus = "upcoming" | "in-progress" | "completed" | "skipped" | "cancelled";

export type RecurrenceKind = "none" | "daily" | "weekly" | "monthly" | "yearly";

export type ThemeMode = "dark" | "light" | "system";

export type FontSize = "sm" | "md" | "lg";

export type CalendarView = "day" | "week" | "month" | "year" | "agenda";

export type FileKind = "pdf" | "image" | "other";

export interface Recurrence {
  kind: RecurrenceKind;
  weekdays?: number[];
  interval?: number;
}

export interface NityaSeva {
  id: string;
  name: string;
  nameEn: string;
  order: number;
  time: string;
  durationMin: number;
  description: string;
  instructions: string;
  notes: string;
  categoryId: string;
  reminderOffsets: number[];
  recurrence: Recurrence;
  attachmentIds: string[];
  icon: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DailySevaLog {
  id: string;
  date: string;
  sevaId: string;
  status: SevaStatus;
  completedAt?: string;
  note?: string;
  updatedAt: string;
}

export interface SevaCategory {
  id: string;
  name: string;
  nameEn: string;
  kind: "nitya" | "vishesh" | "custom";
  system: boolean;
  order: number;
}

export interface VisheshEvent {
  id: string;
  title: string;
  categoryId: string;
  date: string;
  endDate?: string;
  startTime: string;
  endTime: string;
  vsYear?: number;
  tithi?: string;
  paksha?: string;
  gujaratiMonth?: string;
  description: string;
  procedure: string;
  notes: string;
  photoIds: string[];
  pdfIds: string[];
  attachmentIds: string[];
  reminderOffsets: number[];
  status: SevaStatus;
  tags: string[];
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FolderNode {
  id: string;
  parentId: string | null;
  name: string;
  system: boolean;
  archived: boolean;
  createdAt: string;
}

export interface StoredFileMeta {
  id: string;
  folderId: string;
  name: string;
  mime: string;
  size: number;
  kind: FileKind;
  createdAt: string;
  updatedAt: string;
  favorite: boolean;
  archived: boolean;
  tags: string[];
  sevaId?: string;
  eventId?: string;
  noteId?: string;
}

export interface NoteItem {
  id: string;
  title: string;
  body: string;
  private: boolean;
  sevaId?: string;
  eventId?: string;
  tags: string[];
  favorite: boolean;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProcedureItem {
  id: string;
  title: string;
  body: string;
  version: number;
  versions: { version: number; body: string; createdAt: string }[];
  sevaIds: string[];
  tags: string[];
  bookmarked: boolean;
  fileIds: string[];
  notes: string;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PanchangDay {
  date: string;
  vsYear: number;
  gujaratiMonth: string;
  tithi: string;
  paksha: string;
  notes?: string;
  manual: boolean;
}

export interface RecentEntry {
  id: string;
  kind: "file" | "seva" | "event" | "note" | "procedure";
  refId: string;
  title: string;
  openedAt: string;
}

export interface AppSettings {
  theme: ThemeMode;
  fontSize: FontSize;
  reducedMotion: boolean;
  notificationsEnabled: boolean;
  defaultReminder: number;
  reminderOffsets: number[];
  vsNewYearMd: string;
  calendarDefaultView: CalendarView;
  dashboardCompact: boolean;
  languageHint: "gu-en";
  installedDismissed: boolean;
}

export interface UndoAction {
  id: string;
  label: string;
  apply: () => void;
}

export const DEFAULT_SETTINGS: AppSettings = {
  theme: "dark",
  fontSize: "md",
  reducedMotion: false,
  notificationsEnabled: false,
  defaultReminder: 15,
  reminderOffsets: [5, 10, 15, 30, 60],
  vsNewYearMd: "10-31",
  calendarDefaultView: "month",
  dashboardCompact: false,
  languageHint: "gu-en",
  installedDismissed: false,
};

export const ALLOWED_MIME = new Set([
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export const ALLOWED_EXT = new Set(["pdf", "jpg", "jpeg", "png", "webp", "gif"]);

export const MAX_FILE_BYTES = 25 * 1024 * 1024;
