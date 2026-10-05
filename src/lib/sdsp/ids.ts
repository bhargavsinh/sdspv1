export function nid(prefix = "id"): string {
  const rand = Math.random().toString(36).slice(2, 8);
  return `${prefix}_${Date.now().toString(36)}_${rand}`;
}

export function logId(date: string, sevaId: string) {
  return `log_${date}_${sevaId}`;
}
