import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

type ReservationPayload = {
  lastName?: string;
  firstName?: string;
  dateOfBirth?: string;
  nationality?: string;
  phone?: string;
  email?: string;
  confirmEmail?: string;
  boatName?: string;
  flag?: string;
  length?: number | string;
  width?: number | string;
  draught?: number | string;
  boatType?: string;
  checkIn?: string;
  checkOut?: string;
  depositAmount?: number | string;
  depositCurrency?: string;
  specialRequirements?: string | null;
  newsletter?: boolean;
  submittedAt?: string;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  try {
    const payload = (await req.json()) as ReservationPayload;
    const validationError = validate(payload);
    if (validationError) {
      return json({ error: validationError }, 400);
    }

    const to = Deno.env.get("CAPITAINERIE_EMAIL") || "capitainerie@marinamonastir.tn";
    const from =
      Deno.env.get("EMAIL_FROM") || "Marina Cap Monastir <reservations@marinamonastir.tn>";
    const replyTo = payload.email?.trim();
    const reservationNumber = `PORT-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`;
    const subject = `Demande reservation capitainerie - ${payload.boatName} - ${payload.checkIn}`;
    const text = buildTextEmail(payload, reservationNumber);
    const html = buildHtmlEmail(payload, reservationNumber);

    const apiKey = Deno.env.get("EMAIL_PROVIDER_API_KEY") || Deno.env.get("RESEND_API_KEY");
    if (apiKey) {
      const emailResult = await sendWithResend({
        apiKey,
        from,
        to,
        replyTo,
        subject,
        text,
        html,
      });

      if (!emailResult.ok) {
        console.error("[CapitainerieEmail] Provider error", emailResult.status, emailResult.body);
        return json(
          {
            error: "Email provider rejected the request.",
            setupRequired: false,
            providerStatus: emailResult.status,
          },
          502,
        );
      }

      return json({ emailSent: true, reservationNumber, to });
    }

    console.warn(
      "[CapitainerieEmail] Missing EMAIL_PROVIDER_API_KEY/RESEND_API_KEY. Falling back in frontend to database reservation.",
    );
    return json(
      {
        emailSent: false,
        setupRequired: true,
        reservationNumber,
        to,
        instructions:
          "Set EMAIL_PROVIDER_API_KEY or RESEND_API_KEY, EMAIL_FROM, and CAPITAINERIE_EMAIL in Supabase Edge Function secrets.",
      },
      200,
    );
  } catch (error) {
    console.error("[CapitainerieEmail] Unexpected error", error);
    return json({ error: "Unexpected email function error." }, 500);
  }
});

function validate(payload: ReservationPayload) {
  const required: Array<keyof ReservationPayload> = [
    "lastName",
    "firstName",
    "phone",
    "email",
    "boatName",
    "flag",
    "length",
    "width",
    "draught",
    "boatType",
    "checkIn",
    "checkOut",
    "depositAmount",
    "depositCurrency",
  ];

  for (const field of required) {
    const value = payload[field];
    if (value === null || value === undefined || String(value).trim() === "") {
      return `Missing field: ${field}`;
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(payload.email))) {
    return "Invalid email";
  }

  if (String(payload.checkOut) <= String(payload.checkIn)) {
    return "Invalid stay dates";
  }

  return null;
}

async function sendWithResend({
  apiKey,
  from,
  to,
  replyTo,
  subject,
  text,
  html,
}: {
  apiKey: string;
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
}) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: replyTo ? [replyTo] : undefined,
      subject,
      text,
      html,
    }),
  });

  return {
    ok: response.ok,
    status: response.status,
    body: await response.text(),
  };
}

function buildTextEmail(payload: ReservationPayload, reservationNumber: string) {
  return [
    `Reference: ${reservationNumber}`,
    "",
    "Client",
    `Nom: ${payload.lastName} ${payload.firstName}`,
    `Naissance: ${payload.dateOfBirth || "-"}`,
    `Nationalite: ${payload.nationality || "-"}`,
    `Telephone: ${payload.phone}`,
    `Email: ${payload.email}`,
    `Confirmation email: ${payload.confirmEmail || "-"}`,
    "",
    "Bateau",
    `Nom du bateau: ${payload.boatName}`,
    `Pavillon: ${payload.flag}`,
    `Type: ${payload.boatType}`,
    `Longueur: ${payload.length} m`,
    `Largeur: ${payload.width} m`,
    `Tirant d'eau: ${payload.draught} m`,
    "",
    "Sejour",
    `Arrivee: ${payload.checkIn}`,
    `Depart: ${payload.checkOut}`,
    `Acompte: ${payload.depositAmount} ${payload.depositCurrency}`,
    `Newsletter: ${payload.newsletter ? "Oui" : "Non"}`,
    `Date de soumission: ${payload.submittedAt || new Date().toISOString()}`,
    "",
    "Besoins speciaux",
    payload.specialRequirements || "-",
  ].join("\n");
}

function buildHtmlEmail(payload: ReservationPayload, reservationNumber: string) {
  const rows = [
    ["Reference", reservationNumber],
    ["Nom", `${payload.lastName} ${payload.firstName}`],
    ["Naissance", payload.dateOfBirth || "-"],
    ["Nationalite", payload.nationality || "-"],
    ["Telephone", payload.phone],
    ["Email", payload.email],
    ["Confirmation email", payload.confirmEmail || "-"],
    ["Nom du bateau", payload.boatName],
    ["Pavillon", payload.flag],
    ["Type", payload.boatType],
    ["Longueur", `${payload.length} m`],
    ["Largeur", `${payload.width} m`],
    ["Tirant d'eau", `${payload.draught} m`],
    ["Arrivee", payload.checkIn],
    ["Depart", payload.checkOut],
    ["Acompte", `${payload.depositAmount} ${payload.depositCurrency}`],
    ["Newsletter", payload.newsletter ? "Oui" : "Non"],
    ["Date de soumission", payload.submittedAt || new Date().toISOString()],
    ["Besoins speciaux", payload.specialRequirements || "-"],
  ];

  return `
    <div style="font-family:Arial,sans-serif;color:#0f172a">
      <h2>Nouvelle demande de reservation capitainerie</h2>
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:720px">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <th align="left" style="border:1px solid #dbe4ea;background:#f8fafc;width:180px">${escapeHtml(label || "")}</th>
                <td style="border:1px solid #dbe4ea">${escapeHtml(String(value ?? ""))}</td>
              </tr>
            `,
          )
          .join("")}
      </table>
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}
