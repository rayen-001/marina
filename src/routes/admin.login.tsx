import { createFileRoute, redirect } from "@tanstack/react-router";

type LoginSearch = {
  redirect?: string;
};

export const Route = createFileRoute("/admin/login")({
  validateSearch: (search: Record<string, unknown>): LoginSearch => ({
    redirect:
      typeof search.redirect === "string" && search.redirect.startsWith("/admin")
        ? search.redirect
        : undefined,
  }),
  beforeLoad: ({ search }) => {
    throw redirect({ to: "/login", search: { redirect: search.redirect ?? "/admin" } });
  },
  head: () => ({
    meta: [{ title: "Connexion admin - Marina Cap Monastir" }],
  }),
  component: () => null,
});
