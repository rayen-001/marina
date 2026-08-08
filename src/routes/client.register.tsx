import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/client/register")({
  beforeLoad: () => {
    throw redirect({ to: "/register" });
  },
  head: () => ({
    meta: [{ title: "Inscription client - Marina Cap Monastir" }],
  }),
  component: () => null,
});
