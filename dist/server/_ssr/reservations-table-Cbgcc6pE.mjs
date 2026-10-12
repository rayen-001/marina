import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useI18n, at as reservations, au as rooms, I as localizeRoomName, av as calculatePaidAmount, aw as calculateRemainingAmount, J as getReservationStatusLabels, K as getPaymentStatusLabels, a5 as getChannelLabels, ax as listRoomUnits, ay as setReservationStatus, az as assignRoomUnit, aA as setPaymentStatus, aB as generateInvoicePreview, aC as createConversationForAdminReservation } from "./router-CgbkQim6.mjs";
import { S as StatusBadge } from "./status-badge-Cw5SwgC6.mjs";
import { f as Search, aB as Ellipsis, F as FileText, M as MessageCircle } from "../_libs/lucide-react.mjs";
function ReservationsTable({ compact = false }) {
  const navigate = useNavigate();
  const { t, locale, formatCurrency } = useI18n();
  const reservationStatusLabels = getReservationStatusLabels(locale);
  const paymentStatusLabels = getPaymentStatusLabels(locale);
  const channelLabels = getChannelLabels(locale);
  const [dateFrom, setDateFrom] = reactExports.useState("");
  const [dateTo, setDateTo] = reactExports.useState("");
  const [roomId, setRoomId] = reactExports.useState("all");
  const [status, setStatus] = reactExports.useState("all");
  const [paymentStatus, setPaymentStatus$1] = reactExports.useState("all");
  const [source, setSource] = reactExports.useState("all");
  const [guestSearch, setGuestSearch] = reactExports.useState("");
  const [version, setVersion] = reactExports.useState(0);
  const [openActionId, setOpenActionId] = reactExports.useState(null);
  const [openingMessageId, setOpeningMessageId] = reactExports.useState(null);
  const [assigningId, setAssigningId] = reactExports.useState(null);
  const [unitsByRoom, setUnitsByRoom] = reactExports.useState({});
  const [unitsLoadingRoomId, setUnitsLoadingRoomId] = reactExports.useState(null);
  const needle = guestSearch.trim().toLowerCase();
  const rows = reservations.filter((reservation) => {
    if (dateFrom && reservation.checkOut < dateFrom) return false;
    if (dateTo && reservation.checkIn > dateTo) return false;
    if (roomId !== "all" && reservation.roomId !== roomId) return false;
    if (status !== "all" && reservation.status !== status) return false;
    if (paymentStatus !== "all" && reservation.paymentStatus !== paymentStatus) return false;
    if (source !== "all" && reservation.source !== source) return false;
    if (needle && !`${reservation.reservationNumber} ${reservation.guest.fullName} ${reservation.guest.email} ${reservation.guest.phone} ${reservation.guest.identityNumber}`.toLowerCase().includes(needle)) {
      return false;
    }
    return true;
  }).slice(0, compact ? 6 : void 0);
  const setReservation = (reservationId, nextStatus) => {
    setReservationStatus(reservationId, nextStatus).then(() => {
      setVersion((value) => value + 1);
      toast.success(t("Statut de la réservation mis à jour.", "Booking status updated."));
    }).catch((error) => {
      toast.error(
        error instanceof Error ? error.message : t("Mise à jour du statut impossible.", "Status update failed.")
      );
    });
  };
  const setPayment = (reservationId, nextStatus) => {
    setPaymentStatus(reservationId, nextStatus).then(() => {
      setVersion((value) => value + 1);
      toast.success(t("Statut de paiement mis à jour.", "Payment status updated."));
    }).catch((error) => {
      toast.error(
        error instanceof Error ? error.message : t("Mise à jour du paiement impossible.", "Payment update failed.")
      );
    });
  };
  const toggleActionMenu = (reservation) => {
    setOpenActionId((current) => current === reservation.id ? null : reservation.id);
    if (!unitsByRoom[reservation.roomId]) {
      setUnitsLoadingRoomId(reservation.roomId);
      void listRoomUnits(reservation.roomId).then((units) => setUnitsByRoom((current) => ({ ...current, [reservation.roomId]: units }))).catch(
        (error) => toast.error(
          error instanceof Error ? error.message : t("Unités indisponibles.", "Units unavailable.")
        )
      ).finally(() => setUnitsLoadingRoomId(null));
    }
  };
  const assignUnit = async (reservationId, roomUnitId) => {
    setAssigningId(reservationId);
    try {
      await assignRoomUnit(reservationId, roomUnitId || null);
      toast.success(
        roomUnitId ? t("Appartement assigné.", "Apartment assigned.") : t("Assignation retirée.", "Assignment removed.")
      );
      setOpenActionId(null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t("Assignation impossible.", "Assignment failed.")
      );
    } finally {
      setAssigningId(null);
    }
  };
  const createInvoice = async (reservationId) => {
    try {
      await generateInvoicePreview(reservationId);
      toast.success(t("Facture générée.", "Invoice generated."));
      setOpenActionId(null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t("Génération de facture impossible.", "Invoice generation failed.")
      );
    }
  };
  const messageClient = async (reservation) => {
    setOpeningMessageId(reservation.id);
    try {
      const result = await createConversationForAdminReservation(reservation);
      if (!result.linkedClientProfile) {
        toast.info(t("Compte client pas encore lié.", "Guest account not linked yet."));
      }
      setOpenActionId(null);
      navigate({ to: "/admin/messages", search: { conversation: result.conversation.id } });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t("Conversation impossible.", "The conversation could not be opened.")
      );
    } finally {
      setOpeningMessageId(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-soft)]", children: [
    !compact && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 border-b border-border bg-card p-4 md:grid-cols-3 xl:grid-cols-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "relative md:col-span-3 xl:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: guestSearch,
            onChange: (event) => setGuestSearch(event.target.value),
            placeholder: t(
              "Client, téléphone, email, CIN, réservation...",
              "Guest, phone, email, ID, booking..."
            ),
            className: "admin-input pl-9"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "date",
          value: dateFrom,
          onChange: (event) => setDateFrom(event.target.value),
          className: "admin-input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "date",
          value: dateTo,
          onChange: (event) => setDateTo(event.target.value),
          className: "admin-input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: roomId,
          onChange: (event) => setRoomId(event.target.value),
          className: "admin-input",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: t("Toutes les chambres", "All rooms") }),
            rooms.map((room) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: room.id, children: localizeRoomName(room, locale) }, room.id))
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: status,
          onChange: (event) => setStatus(event.target.value),
          className: "admin-input",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: t("Tous statuts", "All statuses") }),
            Object.entries(reservationStatusLabels).map(([value, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value, children: label }, value))
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: paymentStatus,
          onChange: (event) => setPaymentStatus$1(event.target.value),
          className: "admin-input",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: t("Tous paiements", "All payments") }),
            Object.entries(paymentStatusLabels).map(([value, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value, children: label }, value))
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: source,
          onChange: (event) => setSource(event.target.value),
          className: "admin-input",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: t("Toutes sources", "All sources") }),
            Object.entries(channelLabels).map(([value, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value, children: label }, value))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[1500px] text-left text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary/70 text-xs uppercase tracking-[0.12em] text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Réservation", "Booking") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Client", "Guest") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Contact", "Contact") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Pays / ID", "Country / ID") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Chambre", "Room") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Dates", "Dates") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Nuits", "Nights") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Voyageurs", "Guests") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Source", "Source") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Statut", "Status") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Paiement", "Payment") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Total", "Total") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Payé", "Paid") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Restant", "Remaining") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Demandes", "Requests") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: t("Actions", "Actions") })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        rows.map((reservation) => {
          const room = rooms.find((item) => item.id === reservation.roomId);
          const paid = calculatePaidAmount(reservation.id);
          const remaining = calculateRemainingAmount(reservation.id);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "border-t border-border align-top",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-semibold text-primary", children: reservation.reservationNumber }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium", children: reservation.guest.fullName }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: reservation.guest.phone }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs", children: reservation.guest.email })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: reservation.guest.country }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs", children: reservation.guest.identityNumber })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: room ? localizeRoomName(room, locale) : reservation.roomId }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-muted-foreground", children: [
                  reservation.checkIn,
                  " ",
                  t("au", "to"),
                  " ",
                  reservation.checkOut
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: reservation.nights }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
                  reservation.adults,
                  " ",
                  t("ad.", "ad."),
                  " · ",
                  reservation.children,
                  " ",
                  t("enf.", "ch.")
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { kind: "source", value: reservation.source }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { kind: "reservation", value: reservation.status }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { kind: "payment", value: reservation.paymentStatus }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-semibold", children: formatCurrency(reservation.total) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: formatCurrency(paid) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: formatCurrency(remaining) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "max-w-[220px] px-4 py-3 text-muted-foreground", children: reservation.specialRequests ?? "-" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => toggleActionMenu(reservation),
                      className: "admin-action h-9 px-3",
                      "aria-expanded": openActionId === reservation.id,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "size-4" }),
                        t("Actions", "Actions")
                      ]
                    }
                  ),
                  openActionId === reservation.id && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-0 top-10 z-20 grid w-56 gap-1 rounded-xl border border-border bg-card p-2 shadow-[var(--shadow-lift)]", children: [
                    reservation.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ActionMenuButton,
                      {
                        label: t("Rejeter", "Reject"),
                        danger: true,
                        onClick: () => setReservation(reservation.id, "cancelled")
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ActionMenuButton,
                      {
                        label: t("Confirmer", "Confirm"),
                        onClick: () => setReservation(reservation.id, "confirmed")
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ActionMenuButton,
                      {
                        label: t("Check-in", "Check-in"),
                        onClick: () => setReservation(reservation.id, "checked_in")
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ActionMenuButton,
                      {
                        label: t("Check-out", "Check-out"),
                        onClick: () => setReservation(reservation.id, "checked_out")
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ActionMenuButton,
                      {
                        label: t("Annuler", "Cancel"),
                        danger: true,
                        onClick: () => setReservation(reservation.id, "cancelled")
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 border-t border-border pt-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block px-2 pb-1 text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground", children: t("Assigner un appartement", "Assign an apartment") }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "select",
                        {
                          defaultValue: "",
                          disabled: assigningId === reservation.id || unitsLoadingRoomId === reservation.roomId,
                          onChange: (event) => void assignUnit(reservation.id, event.target.value),
                          className: "admin-input h-9 w-full disabled:cursor-not-allowed disabled:opacity-60",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: unitsLoadingRoomId === reservation.roomId ? t("Chargement...", "Loading...") : t("Choisir une unité", "Choose a unit") }),
                            (unitsByRoom[reservation.roomId] ?? []).map((unit) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: unit.id, children: [
                              t("Unité", "Unit"),
                              " ",
                              unit.unitNumber
                            ] }, unit.id))
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ActionMenuButton,
                      {
                        label: t("Acompte", "Deposit"),
                        onClick: () => setPayment(reservation.id, "deposit_paid")
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ActionMenuButton,
                      {
                        label: t("Marquer payé", "Mark as paid"),
                        onClick: () => setPayment(reservation.id, "paid")
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ActionMenuButton,
                      {
                        label: t("Générer facture", "Generate invoice"),
                        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-3.5" }),
                        onClick: () => void createInvoice(reservation.id)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ActionMenuButton,
                      {
                        label: openingMessageId === reservation.id ? t("Ouverture...", "Opening...") : t("Message client", "Message guest"),
                        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "size-3.5" }),
                        onClick: () => void messageClient(reservation)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/invoices", className: "admin-action justify-start", children: t("Voir facture", "View invoice") })
                  ] })
                ] }) })
              ]
            },
            `${reservation.id}-${version}`
          );
        }),
        rows.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 16, className: "px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state mx-auto max-w-xl py-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "mx-auto mb-3 size-8 text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-black text-primary", children: t("Aucune réservation", "No bookings") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: t(
            "Aucune réservation ne correspond aux filtres sélectionnés.",
            "No bookings match the selected filters."
          ) })
        ] }) }) })
      ] })
    ] }) })
  ] });
}
function ActionMenuButton({
  label,
  icon,
  danger = false,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: `admin-action justify-start ${danger ? "text-destructive hover:border-destructive/40 hover:bg-destructive/10" : ""}`,
      children: [
        icon,
        label
      ]
    }
  );
}
export {
  ReservationsTable as R
};
