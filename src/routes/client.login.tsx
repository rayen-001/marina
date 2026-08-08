import { createFileRoute, redirect } from "@tanstack/react-router";

type ClientLoginSearch = {
  redirect?: string;
};

export const Route = createFileRoute("/client/login")({
  validateSearch: (search: Record<string, unknown>): ClientLoginSearch => ({
    redirect:
      typeof search.redirect === "string" && search.redirect.startsWith("/client")
        ? search.redirect
        : undefined,
  }),
  beforeLoad: ({ search }) => {
    throw redirect({ to: "/login", search: { redirect: search.redirect ?? "/client" } });
  },
  head: () => ({
    meta: [{ title: "Connexion client - Marina Cap Monastir" }],
  }),
  component: () => null,
});
