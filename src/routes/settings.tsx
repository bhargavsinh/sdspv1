import { createFileRoute } from "@tanstack/react-router";
import { SettingsBoard } from "@/components/settings/settings-board";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

function SettingsPage() {
  return <SettingsBoard />;
}
