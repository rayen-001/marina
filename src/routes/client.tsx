import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { ClientLayout } from "@/components/client/ClientLayout";
import { requireClientSession } from "@/lib/auth/clientAuth";

const publicClientRoutes = new Set(["/client/login", "/client/register"]);

export const Route = createFileRoute("/client")({
  beforeLoad: async ({ location }) => {
    if (publicClientRoutes.has(location.pathname)) return;
    await requireClientSession(location.pathname);
  },
  head: () => ({
    meta: [{ title: "Portail client - Marina Cap Monastir" }],
  }),
  component: ClientRoute,
});

function ClientRoute() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  if (publicClientRoutes.has(pathname)) return <Outlet />;

  return (
    <ClientLayout>
      <Outlet />
    </ClientLayout>
  );
}
