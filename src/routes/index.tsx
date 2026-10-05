import { createFileRoute } from "@tanstack/react-router";
import { HomeDashboard } from "@/components/dashboard/home-dashboard";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <HomeDashboard />;
}
