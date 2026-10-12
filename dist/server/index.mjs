globalThis.__nitro_main__ = import.meta.url;
import { N as NodeResponse, s as serve } from "./_libs/srvx.mjs";
import { H as HTTPError, d as defineHandler, t as toEventHandler, a as defineLazyEventHandler, b as H3Core } from "./_libs/h3.mjs";
import { d as decodePath, w as withLeadingSlash, a as withoutTrailingSlash, j as joinURL } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import "node:http";
import "node:stream";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "./_libs/rou3.mjs";
function lazyService(loader) {
  let promise, mod;
  return {
    fetch(req) {
      if (mod) {
        return mod.fetch(req);
      }
      if (!promise) {
        promise = loader().then((_mod) => mod = _mod.default || _mod);
      }
      return promise.then((mod2) => mod2.fetch(req));
    }
  };
}
const services = {
  ["ssr"]: lazyService(() => import("./_ssr/index.mjs"))
};
globalThis.__nitro_vite_envs__ = services;
const errorHandler$1 = (error, event) => {
  const res = defaultHandler(error, event);
  return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
  const unhandled = error.unhandled ?? !HTTPError.isError(error);
  const { status = 500, statusText = "" } = unhandled ? {} : error;
  if (status === 404) {
    const url = event.url || new URL(event.req.url);
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      return {
        status: 302,
        headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
      };
    }
  }
  const headers2 = new Headers(unhandled ? {} : error.headers);
  headers2.set("content-type", "application/json; charset=utf-8");
  const jsonBody = unhandled ? {
    status,
    unhandled: true
  } : typeof error.toJSON === "function" ? error.toJSON() : {
    status,
    statusText,
    message: error.message
  };
  return {
    status,
    statusText,
    headers: headers2,
    body: {
      error: true,
      ...jsonBody
    }
  };
}
const errorHandlers = [errorHandler$1];
async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      const response = await handler(error, event, { defaultHandler });
      if (response) {
        return response;
      }
    } catch (error2) {
      console.error(error2);
    }
  }
}
const headers = ((m) => function headersRouteRule(event) {
  for (const [key2, value] of Object.entries(m.options || {})) {
    event.res.headers.set(key2, value);
  }
});
const assets = {
  "/manifest.webmanifest": {
    "type": "application/manifest+json",
    "etag": '"2ad-kyReRauIGnQ+Y3htIVIybgFsw1g"',
    "mtime": "2026-08-08T23:31:34.890Z",
    "size": 685,
    "path": "../client/manifest.webmanifest"
  },
  "/assets/activities-D5SYQfqG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d0a-USvsjT+gPXp6ygemVYSGmqn+POw"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 3338,
    "path": "../client/assets/activities-D5SYQfqG.js"
  },
  "/icons/icon-512.png": {
    "type": "image/png",
    "etag": '"19866-DVaOWEnDzYk7V/yibuey5JdVyck"',
    "mtime": "2026-08-08T23:31:34.904Z",
    "size": 104550,
    "path": "../client/icons/icon-512.png"
  },
  "/icons/icon-192.png": {
    "type": "image/png",
    "etag": '"19866-DVaOWEnDzYk7V/yibuey5JdVyck"',
    "mtime": "2026-08-08T23:31:34.899Z",
    "size": 104550,
    "path": "../client/icons/icon-192.png"
  },
  "/assets/admin-1NY0aBHM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3857-ecQWRkn1pqyI20Fghrbp5RDNqDU"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 14423,
    "path": "../client/assets/admin-1NY0aBHM.js"
  },
  "/assets/admin.calendar-ByVwyPaQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6469-dxe9SWHZFD9fgNAB/f32xNIvZEk"',
    "mtime": "2026-10-12T01:58:10.969Z",
    "size": 25705,
    "path": "../client/assets/admin.calendar-ByVwyPaQ.js"
  },
  "/assets/actualites-iZzzz7qW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e81-i2jkusxMmyrKoMOqlsMdAGwAKMs"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 3713,
    "path": "../client/assets/actualites-iZzzz7qW.js"
  },
  "/assets/activites-C7TnqHB0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1147-2wLqQQZRrmdEfkF0J0JYHZQtU/4"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 4423,
    "path": "../client/assets/activites-C7TnqHB0.js"
  },
  "/assets/admin.channels-Bicq5vOr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"17ca-nH2Jguo+jlj8L2MQaX8Twn+cFG4"',
    "mtime": "2026-10-12T01:58:10.969Z",
    "size": 6090,
    "path": "../client/assets/admin.channels-Bicq5vOr.js"
  },
  "/assets/admin.direction-K5_H72Kn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"24dd-uwVEW+e3OeSePOsjMjiiTDqz8jc"',
    "mtime": "2026-10-12T01:58:10.969Z",
    "size": 9437,
    "path": "../client/assets/admin.direction-K5_H72Kn.js"
  },
  "/assets/admin.login-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-10-12T01:58:10.969Z",
    "size": 41,
    "path": "../client/assets/admin.login-DtqBFgK5.js"
  },
  "/assets/admin.reservations-BORv5TZl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5bd-0/CHLJv4wGj4IirPAxKZtVo5zYA"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 1469,
    "path": "../client/assets/admin.reservations-BORv5TZl.js"
  },
  "/assets/admin.messages-NCzbBggU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2706-Wm+ZTDlqYehQPhR271hWMuPUPZU"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 9990,
    "path": "../client/assets/admin.messages-NCzbBggU.js"
  },
  "/assets/admin.rooms-BTUHkEI0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"365a-Ph99Uc+06kPOZnIgZeK8ZheEGr8"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 13914,
    "path": "../client/assets/admin.rooms-BTUHkEI0.js"
  },
  "/assets/admin.invoices-5VztKhyM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"16b4-a2Bbb59Di6BJe/sjtUmdS3PGRjw"',
    "mtime": "2026-10-12T01:58:10.969Z",
    "size": 5812,
    "path": "../client/assets/admin.invoices-5VztKhyM.js"
  },
  "/assets/admin.payments-DPZTSAGg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"147e-IoIRwdcdAOxXhU+qUp9pXhegktU"',
    "mtime": "2026-10-12T01:58:10.969Z",
    "size": 5246,
    "path": "../client/assets/admin.payments-DPZTSAGg.js"
  },
  "/assets/admin.port-tarifs-CQ39zK47.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1fc4-OSSyG5uWnAb8cVdygcYtvvNxyjs"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 8132,
    "path": "../client/assets/admin.port-tarifs-CQ39zK47.js"
  },
  "/assets/admin.settings-DVn9ZmHS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"15f2-IWiBj7UtcIxfM7pfT0nhwmbpnk8"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 5618,
    "path": "../client/assets/admin.settings-DVn9ZmHS.js"
  },
  "/assets/admin.statistics-BHS2rlZ6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1155-Zms6dxaOgr4iXvEVvbOq1xnqenY"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 4437,
    "path": "../client/assets/admin.statistics-BHS2rlZ6.js"
  },
  "/assets/AdminActionBar-rJYQBcB0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"191-41Rlyw4PRrG4ldRwRAIWTryNxTM"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 401,
    "path": "../client/assets/AdminActionBar-rJYQBcB0.js"
  },
  "/assets/arrow-left-BGe4lXfm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-nLssk9Dokd86lf6+/2CMjIh/Vmk"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 166,
    "path": "../client/assets/arrow-left-BGe4lXfm.js"
  },
  "/assets/book._id-D8hVU0dV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"282-8F2GtRmgx2tWTrJyAAypBuNYMKQ"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 642,
    "path": "../client/assets/book._id-D8hVU0dV.js"
  },
  "/assets/admin.clients-L7MmpPK3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"11c9-U+MIRiKFUG384t0dzxR/rCnZFdY"',
    "mtime": "2026-10-12T01:58:10.969Z",
    "size": 4553,
    "path": "../client/assets/admin.clients-L7MmpPK3.js"
  },
  "/images/plan-port-marina-cap-monastir.png": {
    "type": "image/png",
    "etag": '"1b98ea-Fnqi38p/GaXFSOmA2BpQqudfmgQ"',
    "mtime": "2026-08-08T23:31:34.920Z",
    "size": 1808618,
    "path": "../client/images/plan-port-marina-cap-monastir.png"
  },
  "/ChatGPT Image Jun 9, 2026, 02_35_12 AM.png": {
    "type": "image/png",
    "etag": '"1b98ea-Fnqi38p/GaXFSOmA2BpQqudfmgQ"',
    "mtime": "2026-08-08T23:31:34.888Z",
    "size": 1808618,
    "path": "../client/ChatGPT Image Jun 9, 2026, 02_35_12 AM.png"
  },
  "/assets/book._id-K4vbMg1t.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"22f6-XgaQs3r42rMYkFtkT7pZKBeV+DQ"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 8950,
    "path": "../client/assets/book._id-K4vbMg1t.js"
  },
  "/assets/booking-summary-BgU-ALjY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10cc-w8Tt4e4oQzAvrGN5j983SIWlkbE"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 4300,
    "path": "../client/assets/booking-summary-BgU-ALjY.js"
  },
  "/assets/building-2-Cb2J-n8F.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"180-Zttst2y2gtJNTpPxU2Y1tB311MI"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 384,
    "path": "../client/assets/building-2-Cb2J-n8F.js"
  },
  "/assets/chevron-left-CLw7JhRu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-vt8KAGJ8ki3kS6HAlvCNeZ3+FBM"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 131,
    "path": "../client/assets/chevron-left-CLw7JhRu.js"
  },
  "/assets/chevron-right-BT1LwEjH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-1F0PKGJrevphRUvnkOZTGI4GUUY"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 131,
    "path": "../client/assets/chevron-right-BT1LwEjH.js"
  },
  "/assets/chart-column-BwGIGRPa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"fc-YOy6Xf+3bwIwTa/dWCfH007prZc"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 252,
    "path": "../client/assets/chart-column-BwGIGRPa.js"
  },
  "/assets/circle-check-DDm3134O.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ae-t7cJPHhxpBFIRQzktzNH4p42u1Q"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 174,
    "path": "../client/assets/circle-check-DDm3134O.js"
  },
  "/assets/client.messages-DyKA0S5f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2383-wwMSDZfJ12KHHbr5nUM2Zv8mT48"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 9091,
    "path": "../client/assets/client.messages-DyKA0S5f.js"
  },
  "/assets/calendar-check-BWFzPcw3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"132-XjvuzYE5t42VB4FTwVrh0t0pI8I"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 306,
    "path": "../client/assets/calendar-check-BWFzPcw3.js"
  },
  "/assets/client.login-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 41,
    "path": "../client/assets/client.login-DtqBFgK5.js"
  },
  "/assets/client.dashboard-DcBf79aZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"262f-PnV0ExdBW6BeRArSvMntmC/xFAw"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 9775,
    "path": "../client/assets/client.dashboard-DcBf79aZ.js"
  },
  "/assets/client.profile-DoZ3sNxx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"98c-T0IEidj2sD9Nf/vn9vwO5lJtlnM"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 2444,
    "path": "../client/assets/client.profile-DoZ3sNxx.js"
  },
  "/assets/client-D6arvY8e.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"206f-HgQ1BOMNW/3BM4xMvHPUSzFP1L8"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 8303,
    "path": "../client/assets/client-D6arvY8e.js"
  },
  "/assets/client.register-DtqBFgK5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29-crG9x4dYeQi7xsfEfaRvCOejUcg"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 41,
    "path": "../client/assets/client.register-DtqBFgK5.js"
  },
  "/assets/concierge-bell-COZ2WZ2I.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"137-wzHsLpMyPucpXbK1fXhf1iOrP1Q"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 311,
    "path": "../client/assets/concierge-bell-COZ2WZ2I.js"
  },
  "/assets/client.reservations-D2syHS4I.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12e3-R0RfQrls4QGkw9uSU4MqTfxPsDY"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 4835,
    "path": "../client/assets/client.reservations-D2syHS4I.js"
  },
  "/assets/confirmation-C9_h0_DM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3510-sfrnL/wE+J98bTubgk2YgFvKMEk"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 13584,
    "path": "../client/assets/confirmation-C9_h0_DM.js"
  },
  "/assets/client-MkaFHkeB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"32cd2-43Q+LBsVK7S1IfsNZPdljb2elNA"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 208082,
    "path": "../client/assets/client-MkaFHkeB.js"
  },
  "/assets/CreateClientAccountButton-DHjfv4r_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1f55-/lmUTKVUZ33Ke0lrsJQ4+uTOkms"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 8021,
    "path": "../client/assets/CreateClientAccountButton-DHjfv4r_.js"
  },
  "/assets/contact-B3GmiSnK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2cee-hwy1YgxKB27pNNnbEvBqGIbBT2k"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 11502,
    "path": "../client/assets/contact-B3GmiSnK.js"
  },
  "/assets/download-NsFsWeGy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e9-pwDJxBsvvAbmfI8WE/UeYuvelA8"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 233,
    "path": "../client/assets/download-NsFsWeGy.js"
  },
  "/assets/highlights-CkeOVeIg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"bbc-MO06GQqGzjB+HAdHepIM4QHHRGU"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 3004,
    "path": "../client/assets/highlights-CkeOVeIg.js"
  },
  "/assets/hero-marina-DVZLo2ag.jpg": {
    "type": "image/jpeg",
    "etag": '"4e727-JL7FKdjHTe0/c20tvmg+bZk3Nz0"',
    "mtime": "2026-10-12T01:58:10.942Z",
    "size": 321319,
    "path": "../client/assets/hero-marina-DVZLo2ag.jpg"
  },
  "/assets/index-CsMAsKW9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"6029-t/lu7fWYNz+NV6quEQSiXHvce9k"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 24617,
    "path": "../client/assets/index-CsMAsKW9.js"
  },
  "/assets/map-lndPkLLr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1aa-TmaKuc59npHPcsoYKCdMTJ/Lafg"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 426,
    "path": "../client/assets/map-lndPkLLr.js"
  },
  "/assets/log-in-BcVGVqr-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e8-XteWRdHsestYRJ7aNfi+CgRH9Hs"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 232,
    "path": "../client/assets/log-in-BcVGVqr-.js"
  },
  "/assets/mail-S4wTk9Lb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d6-XQ0lk4PuNmFyWONIgQR4SGdJg/Y"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 214,
    "path": "../client/assets/mail-S4wTk9Lb.js"
  },
  "/assets/info-Cgt_YcZn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c8-+x+d8HXGt9W5aWM7gCwK2fks+h0"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 200,
    "path": "../client/assets/info-Cgt_YcZn.js"
  },
  "/assets/login-Z_HAv5Cc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"14bf-j4Uv9HxXqGctFH23VKKUqujGy0M"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 5311,
    "path": "../client/assets/login-Z_HAv5Cc.js"
  },
  "/assets/map-pin-BG1G-o-T.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ff-hdV7vZzlZz2qKI/IJbGOa2GWS4o"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 255,
    "path": "../client/assets/map-pin-BG1G-o-T.js"
  },
  "/assets/marina-logo-D-ZM3_eE.png": {
    "type": "image/png",
    "etag": '"1462-M4wI/TR76ihSeB59WSxPDi5UKR0"',
    "mtime": "2026-10-12T01:58:10.966Z",
    "size": 5218,
    "path": "../client/assets/marina-logo-D-ZM3_eE.png"
  },
  "/assets/newspaper-DRqbCd8J.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"159-YkkS2T4opE9sjedW7ZVT4ZGYqiw"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 345,
    "path": "../client/assets/newspaper-DRqbCd8J.js"
  },
  "/assets/marina-logo.png": {
    "type": "image/png",
    "etag": '"4397-c7q9DOOjQBtBXkGSRa4KaPXTw9s"',
    "mtime": "2026-08-08T00:52:29.342Z",
    "size": 17303,
    "path": "../client/assets/marina-logo.png"
  },
  "/assets/percent-DboTqYbq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ee-h2PKCfzs3LSJJ7mq/skyHztdvnY"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 238,
    "path": "../client/assets/percent-DboTqYbq.js"
  },
  "/assets/port-de-plaisance.plan-DB0PmN8r.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"29ee-IcCY0ksXyYoE9qlaTH1qo6D5syQ"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 10734,
    "path": "../client/assets/port-de-plaisance.plan-DB0PmN8r.js"
  },
  "/assets/port-de-plaisance.formalites-Dvffcfg9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"33cf-k96FhlHgzpSBumni4o3ovHw2S3w"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 13263,
    "path": "../client/assets/port-de-plaisance.formalites-Dvffcfg9.js"
  },
  "/assets/port-de-plaisance-BSddxi2Q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"13a2-JpDPitxJVwjSok6XVFxf5bUYdXM"',
    "mtime": "2026-10-12T01:58:10.966Z",
    "size": 5026,
    "path": "../client/assets/port-de-plaisance-BSddxi2Q.js"
  },
  "/assets/phone-BFXv9Ca6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"143-2I8P5Krqg6OaTb9BARKwxl0DG0Q"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 323,
    "path": "../client/assets/phone-BFXv9Ca6.js"
  },
  "/assets/port-de-plaisance.reservation-NqtOU8Wj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"70c2-tdlVGoRrDHMYTGQpzaVfaIaboL4"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 28866,
    "path": "../client/assets/port-de-plaisance.reservation-NqtOU8Wj.js"
  },
  "/assets/plus-DVDpgnUJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9a-59bD1mopAIKyjJGyAIcgz5Kyjp8"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 154,
    "path": "../client/assets/plus-DVDpgnUJ.js"
  },
  "/assets/property._id-CpSYidgJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2fa-M81FhZ4UcFdJS6txj5jTUtv/woQ"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 762,
    "path": "../client/assets/property._id-CpSYidgJ.js"
  },
  "/assets/port-de-plaisance.tarifs-B-5ofkO6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1cca-40603o/M4ty2O89fDYBHMcXCIZs"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 7370,
    "path": "../client/assets/port-de-plaisance.tarifs-B-5ofkO6.js"
  },
  "/assets/presentation-C4hwhgqt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5dd3-qX1UY7uGV9f0ou3fw9pa3FPdBIc"',
    "mtime": "2026-10-12T01:58:10.966Z",
    "size": 24019,
    "path": "../client/assets/presentation-C4hwhgqt.js"
  },
  "/assets/printer-THMHqNjN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"140-o4fsQpmt6YKVQCaR+Hh8UlDarOk"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 320,
    "path": "../client/assets/printer-THMHqNjN.js"
  },
  "/assets/property._id-CV4WKRxO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"345-hM9Mi6bzvNT+HQ1G//o6jE8My18"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 837,
    "path": "../client/assets/property._id-CV4WKRxO.js"
  },
  "/assets/receipt-text-CRnHHHvu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"298-Nf+dWD/DYPVyJzzYnbpqQPMMNV0"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 664,
    "path": "../client/assets/receipt-text-CRnHHHvu.js"
  },
  "/assets/refresh-cw-CxBs3Ihf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"142-EkFQumzFR1C9e+ogGk74ixnOi30"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 322,
    "path": "../client/assets/refresh-cw-CxBs3Ihf.js"
  },
  "/assets/index-DwiJz739.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"959cf-KKBpdqvcUvGBk3by61eClbYKZHE"',
    "mtime": "2026-10-12T01:58:10.969Z",
    "size": 612815,
    "path": "../client/assets/index-DwiJz739.js"
  },
  "/assets/register-B0DST8sK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"16d4-Z/yFKDNZ24RTITAAyIFkAz81VJo"',
    "mtime": "2026-10-12T01:58:10.966Z",
    "size": 5844,
    "path": "../client/assets/register-B0DST8sK.js"
  },
  "/assets/room-card-BYrCbWeD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1164-jWZkGObuev60jMp1XF7/vZqjB0k"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 4452,
    "path": "../client/assets/room-card-BYrCbWeD.js"
  },
  "/assets/reservations-table-DmfA3bSd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"27ef-CP7lOUOYGFLeY6dAemoT9GyOujU"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 10223,
    "path": "../client/assets/reservations-table-DmfA3bSd.js"
  },
  "/assets/room-detail-page-B7B096hy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"51a7-I3gCo5AErYc7MDjt9yferUUk0e0"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 20903,
    "path": "../client/assets/room-detail-page-B7B096hy.js"
  },
  "/assets/room._id-C5Yjtebv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"38e-L6lRzuUQGd2nZtlqxg+fMFLUH9Y"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 910,
    "path": "../client/assets/room._id-C5Yjtebv.js"
  },
  "/assets/room._id-B86e8v_b.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"30a-8H6sX0Zevzjw40S2aI/zP8TbsIQ"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 778,
    "path": "../client/assets/room._id-B86e8v_b.js"
  },
  "/assets/sailboat-BLOF7_9V.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1bc-LOm4chTkfhIPGzLRfGMOoZr+Xho"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 444,
    "path": "../client/assets/sailboat-BLOF7_9V.js"
  },
  "/assets/send-DmPYU-Uz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"123-tXCORD78n4yBl/gyLGcA5DuMFK8"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 291,
    "path": "../client/assets/send-DmPYU-Uz.js"
  },
  "/assets/rotate-ccw-D6M_tDlV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c9-Jm3oD9TgXLO7pPx3rhLiQrj3LHk"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 201,
    "path": "../client/assets/rotate-ccw-D6M_tDlV.js"
  },
  "/assets/search-pMVcBXw4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3016-YWQ27s08oYZT/lsEH+jK6C8Uic0"',
    "mtime": "2026-10-12T01:58:10.966Z",
    "size": 12310,
    "path": "../client/assets/search-pMVcBXw4.js"
  },
  "/assets/shield-check-IIVjesOM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"13c-6kaNyDIe4vkAs8PeCW1UysFuUXY"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 316,
    "path": "../client/assets/shield-check-IIVjesOM.js"
  },
  "/assets/ship-vi_Po17y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e0-Xo7UsXqRPNx90DFjToAgdb2rydA"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 480,
    "path": "../client/assets/ship-vi_Po17y.js"
  },
  "/assets/ship-wheel-NkBgR-K9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"208-FfM45u/itCNAzzJ5FUNLXlMUcxM"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 520,
    "path": "../client/assets/ship-wheel-NkBgR-K9.js"
  },
  "/assets/star-1XUthVDl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1d9-H7je1Xx4ulCJiqAZcaqmQQa8XOU"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 473,
    "path": "../client/assets/star-1XUthVDl.js"
  },
  "/assets/site-header-Cnx0FBFd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1022f-YnG9IMVzTMtztvifO+DMyJz8ZkI"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 66095,
    "path": "../client/assets/site-header-Cnx0FBFd.js"
  },
  "/assets/status-badge-BiXpQmsa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"698-zVlU6Igo4Ni0ru9ujYDnhcSmmfw"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 1688,
    "path": "../client/assets/status-badge-BiXpQmsa.js"
  },
  "/assets/triangle-alert-CtbsdlkM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10a-LOEldU5waNZz0JO4tNvBTr7TtAQ"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 266,
    "path": "../client/assets/triangle-alert-CtbsdlkM.js"
  },
  "/assets/user-plus-Dr2b01YE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"137-C1M+a2WS+1twTTHma5EXSyfeVVg"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 311,
    "path": "../client/assets/user-plus-Dr2b01YE.js"
  },
  "/assets/styles-CqcSRqoq.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"245fe-vAoYtkxuRHMVWK+dOCGyZ1M/lnE"',
    "mtime": "2026-10-12T01:58:10.966Z",
    "size": 148990,
    "path": "../client/assets/styles-CqcSRqoq.css"
  },
  "/assets/waves-Cy_wZ4zu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a8-mfm/+YtWT4J9iPXCUtH/jRFZr4A"',
    "mtime": "2026-10-12T01:58:10.967Z",
    "size": 424,
    "path": "../client/assets/waves-Cy_wZ4zu.js"
  },
  "/images/home/feature-barbaros.png": {
    "type": "image/png",
    "etag": '"1aaa5-2jdjHkGUhEXJ8PChEAmvLUZg1uU"',
    "mtime": "2026-08-08T23:31:34.928Z",
    "size": 109221,
    "path": "../client/images/home/feature-barbaros.png"
  },
  "/images/home/feature-commerces.png": {
    "type": "image/png",
    "etag": '"12fee-BjhyQ75G93AryT9kZBhiQP6eW3c"',
    "mtime": "2026-08-08T23:31:34.932Z",
    "size": 77806,
    "path": "../client/images/home/feature-commerces.png"
  },
  "/images/home/feature-vues.png": {
    "type": "image/png",
    "etag": '"11a5c-6OgX4t5uChktmwznMQyiRari8S4"',
    "mtime": "2026-08-08T23:31:34.953Z",
    "size": 72284,
    "path": "../client/images/home/feature-vues.png"
  },
  "/images/home/feature-reservation.png": {
    "type": "image/png",
    "etag": '"1c8bf-kJk2X8U9R3OvyoDM2OgqzkxR3O4"',
    "mtime": "2026-08-08T23:31:34.948Z",
    "size": 116927,
    "path": "../client/images/home/feature-reservation.png"
  },
  "/images/home/feature-presentation.png": {
    "type": "image/png",
    "etag": '"97cda-srk4hbl5N+K3Sv8ptOw1bi3HZD4"',
    "mtime": "2026-08-08T23:31:34.942Z",
    "size": 621786,
    "path": "../client/images/home/feature-presentation.png"
  },
  "/images/port/certification-iso14001.png": {
    "type": "image/png",
    "etag": '"5ba4-UUJamCBtpUl+QA0kN9VdrfahaQ8"',
    "mtime": "2026-08-08T23:31:35.045Z",
    "size": 23460,
    "path": "../client/images/port/certification-iso14001.png"
  },
  "/images/home/logo-marina.png": {
    "type": "image/png",
    "etag": '"1462-M4wI/TR76ihSeB59WSxPDi5UKR0"',
    "mtime": "2026-08-08T23:31:34.964Z",
    "size": 5218,
    "path": "../client/images/home/logo-marina.png"
  },
  "/images/home/hero-marina.jpg": {
    "type": "image/jpeg",
    "etag": '"4e727-JL7FKdjHTe0/c20tvmg+bZk3Nz0"',
    "mtime": "2026-08-08T23:31:34.960Z",
    "size": 321319,
    "path": "../client/images/home/hero-marina.jpg"
  },
  "/images/port/label-pavillon-bleu.jpg": {
    "type": "image/jpeg",
    "etag": '"2352-vhbHWtwTIXcaYXa+FKiUEpZihYk"',
    "mtime": "2026-08-08T23:31:35.050Z",
    "size": 9042,
    "path": "../client/images/port/label-pavillon-bleu.jpg"
  },
  "/images/home/reserver-port.png": {
    "type": "image/png",
    "etag": '"1153b-n9NWJskSqUPFPSQGgp0C990SqbA"',
    "mtime": "2026-08-08T23:31:34.973Z",
    "size": 70971,
    "path": "../client/images/home/reserver-port.png"
  },
  "/images/news/cours-guitare-2017.jpg": {
    "type": "image/jpeg",
    "etag": '"d06e-2BQEti9jgM8Fn6B3nz/EAWBm11s"',
    "mtime": "2026-08-08T23:31:34.984Z",
    "size": 53358,
    "path": "../client/images/news/cours-guitare-2017.jpg"
  },
  "/images/home/reserver-appart.png": {
    "type": "image/png",
    "etag": '"a62c-3VPPjyTtF2K2AIf/wX0gQxYEjC4"',
    "mtime": "2026-08-08T23:31:34.969Z",
    "size": 42540,
    "path": "../client/images/home/reserver-appart.png"
  },
  "/images/news/inauguration-yachting-club-2017.jpg": {
    "type": "image/jpeg",
    "etag": '"12896-cwf9RA2r+SDPx+O0BlfNlCr2eSA"',
    "mtime": "2026-08-08T23:31:34.989Z",
    "size": 75926,
    "path": "../client/images/news/inauguration-yachting-club-2017.jpg"
  },
  "/images/news/marina-cap-monastir-2017-05.jpg": {
    "type": "image/jpeg",
    "etag": '"b357-thOPV8duOSGmH4yaWJ+8xnQ3gjE"',
    "mtime": "2026-08-08T23:31:34.994Z",
    "size": 45911,
    "path": "../client/images/news/marina-cap-monastir-2017-05.jpg"
  },
  "/images/news/marina-cap-monastir-2017-05-08.jpg": {
    "type": "image/jpeg",
    "etag": '"12351-OLxz5GKkDLRo1bDs0dbsZoOiljU"',
    "mtime": "2026-08-08T23:31:34.998Z",
    "size": 74577,
    "path": "../client/images/news/marina-cap-monastir-2017-05-08.jpg"
  },
  "/images/news/marina-monastir-2017-11-11.jpg": {
    "type": "image/jpeg",
    "etag": '"daa7-CGgRLzTr7eRh2f/S9MVhYuMJtN8"',
    "mtime": "2026-08-08T23:31:35.003Z",
    "size": 55975,
    "path": "../client/images/news/marina-monastir-2017-11-11.jpg"
  },
  "/images/news/marina-monastir-2017-11-16.jpg": {
    "type": "image/jpeg",
    "etag": '"c41e-M1BRfpDtb4hcAao5n9GZvBZbURI"',
    "mtime": "2026-08-08T23:31:35.008Z",
    "size": 50206,
    "path": "../client/images/news/marina-monastir-2017-11-16.jpg"
  },
  "/images/news/nettoyage-fond-port-2017-11-19.jpg": {
    "type": "image/jpeg",
    "etag": '"9a29-3MO2BrRASXJYCgtrmkQ1BBwR3J0"',
    "mtime": "2026-08-08T23:31:35.017Z",
    "size": 39465,
    "path": "../client/images/news/nettoyage-fond-port-2017-11-19.jpg"
  },
  "/images/news/monastir-marina-cap-2017-05-07.jpg": {
    "type": "image/jpeg",
    "etag": '"c012-+sLDjoqGOKFj38QTvMOudTiCDZ4"',
    "mtime": "2026-08-08T23:31:35.011Z",
    "size": 49170,
    "path": "../client/images/news/monastir-marina-cap-2017-05-07.jpg"
  },
  "/images/news/nettoyage-fond-port-2017-11-26.jpg": {
    "type": "image/jpeg",
    "etag": '"ef24-ofE0UjyOAvds99RZvjk+W0aRVvw"',
    "mtime": "2026-08-08T23:31:35.022Z",
    "size": 61220,
    "path": "../client/images/news/nettoyage-fond-port-2017-11-26.jpg"
  },
  "/images/news/nettoyage-fond-port-2018-01.jpg": {
    "type": "image/jpeg",
    "etag": '"9662-Nf5UjVL2/sFUG49VjrYZFRvnRtA"',
    "mtime": "2026-08-08T23:31:35.032Z",
    "size": 38498,
    "path": "../client/images/news/nettoyage-fond-port-2018-01.jpg"
  },
  "/images/news/operation-blanche-incendie-2018.jpg": {
    "type": "image/jpeg",
    "etag": '"8e6b-vjwe0hMrB4JIHWvCa0Q2GsEkoZc"',
    "mtime": "2026-08-08T23:31:35.037Z",
    "size": 36459,
    "path": "../client/images/news/operation-blanche-incendie-2018.jpg"
  },
  "/images/rooms/appartement-s2.jpg": {
    "type": "image/jpeg",
    "etag": '"e530-flWr5qis6C5dNV2cZZ6aIvAGYfk"',
    "mtime": "2026-08-08T23:31:35.068Z",
    "size": 58672,
    "path": "../client/images/rooms/appartement-s2.jpg"
  },
  "/images/news/nettoyage-fond-port-2018.jpg": {
    "type": "image/jpeg",
    "etag": '"30d6a-SPzwHVJ/wKIa+F5bYqBT82kfp0A"',
    "mtime": "2026-08-08T23:31:35.028Z",
    "size": 200042,
    "path": "../client/images/news/nettoyage-fond-port-2018.jpg"
  },
  "/images/rooms/terrasse.png": {
    "type": "image/png",
    "etag": '"5cb-Gu9r78hBO5KpicyZK/E0i4sRVeE"',
    "mtime": "2026-08-08T23:31:35.084Z",
    "size": 1483,
    "path": "../client/images/rooms/terrasse.png"
  },
  "/images/rooms/studio.jpg": {
    "type": "image/jpeg",
    "etag": '"ecd3-gLQ2ixR8YT553i34YLnlmrHeQaY"',
    "mtime": "2026-08-08T23:31:35.080Z",
    "size": 60627,
    "path": "../client/images/rooms/studio.jpg"
  },
  "/images/rooms/appartement-economique-s1.jpg": {
    "type": "image/jpeg",
    "etag": '"e77df-Fw3VRA6lR5dzbI4Gyin2BEduWj4"',
    "mtime": "2026-08-08T23:31:35.064Z",
    "size": 948191,
    "path": "../client/images/rooms/appartement-economique-s1.jpg"
  },
  "/images/rooms/appartement-standard-s1.jpg": {
    "type": "image/jpeg",
    "etag": '"8abbc-Qa7Wp3i+p8AttcF5wbjQcONYvRw"',
    "mtime": "2026-08-08T23:31:35.076Z",
    "size": 568252,
    "path": "../client/images/rooms/appartement-standard-s1.jpg"
  }
};
function readAsset(id) {
  const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
  return promises.readFile(resolve(serverDir, assets[id].path));
}
const publicAssetBases = {};
function isPublicAssetURL(id = "") {
  if (assets[id]) {
    return true;
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) {
      return true;
    }
  }
  return false;
}
function getAsset(id) {
  return assets[id];
}
const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = {
  gzip: ".gz",
  br: ".br",
  zstd: ".zst"
};
const _0g_6NS = defineHandler((event) => {
  if (event.req.method && !METHODS.has(event.req.method)) {
    return;
  }
  let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
  let asset;
  const encodingHeader = event.req.headers.get("accept-encoding") || "";
  const encodings = [...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.res.headers.delete("Cache-Control");
      throw new HTTPError({ status: 404 });
    }
    return;
  }
  if (encodings.length > 1) {
    event.res.headers.append("Vary", "Accept-Encoding");
  }
  const ifNotMatch = event.req.headers.get("if-none-match") === asset.etag;
  if (ifNotMatch) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  const ifModifiedSinceH = event.req.headers.get("if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  if (asset.type) {
    event.res.headers.set("Content-Type", asset.type);
  }
  if (asset.etag && !event.res.headers.has("ETag")) {
    event.res.headers.set("ETag", asset.etag);
  }
  if (asset.mtime && !event.res.headers.has("Last-Modified")) {
    event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.res.headers.has("Content-Encoding")) {
    event.res.headers.set("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.res.headers.has("Content-Length")) {
    event.res.headers.set("Content-Length", asset.size.toString());
  }
  return readAsset(id);
});
const findRouteRules = /* @__PURE__ */ (() => {
  const $0 = [{ name: "headers", route: "/assets/**", handler: headers, options: { "cache-control": "public, max-age=31536000, immutable" } }];
  return (m, p) => {
    let r = [];
    if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
    let s = p.split("/"), l = s.length;
    if (l > 1) {
      if (s[1] === "assets") {
        r.unshift({ data: $0, params: { "_": s.slice(2).join("/") } });
      }
    }
    return r;
  };
})();
const _lazy_ZBHtxD = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
const findRoute = /* @__PURE__ */ (() => {
  const data = { route: "/**", handler: _lazy_ZBHtxD };
  return ((_m, p) => {
    return { data, params: { "_": p.slice(1) } };
  });
})();
const globalMiddleware = [
  toEventHandler(_0g_6NS)
].filter(Boolean);
const APP_ID = "default";
function useNitroApp() {
  let instance = useNitroApp._instance;
  if (instance) {
    return instance;
  }
  instance = useNitroApp._instance = createNitroApp();
  globalThis.__nitro__ = globalThis.__nitro__ || {};
  globalThis.__nitro__[APP_ID] = instance;
  return instance;
}
function createNitroApp() {
  const hooks = void 0;
  const captureError = (error, errorCtx) => {
    if (errorCtx?.event) {
      const errors = errorCtx.event.req.context?.nitro?.errors;
      if (errors) {
        errors.push({
          error,
          context: errorCtx
        });
      }
    }
  };
  const h3App = createH3App({ onError(error, event) {
    return errorHandler(error, event);
  } });
  let appHandler = (req) => {
    req.context ||= {};
    req.context.nitro = req.context.nitro || { errors: [] };
    return h3App.fetch(req);
  };
  const app = {
    fetch: appHandler,
    h3: h3App,
    hooks,
    captureError
  };
  return app;
}
function createH3App(config) {
  const h3App = new H3Core(config);
  h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
  h3App["~middleware"].push(...globalMiddleware);
  {
    h3App["~getMiddleware"] = (event, route) => {
      const pathname = event.url.pathname;
      const method = event.req.method;
      const middleware = [];
      {
        const routeRules = getRouteRules(method, pathname);
        event.context.routeRules = routeRules?.routeRules;
        if (routeRules?.routeRuleMiddleware.length) {
          middleware.push(...routeRules.routeRuleMiddleware);
        }
      }
      middleware.push(...h3App["~middleware"]);
      if (route?.data?.middleware?.length) {
        middleware.push(...route.data.middleware);
      }
      return middleware;
    };
  }
  return h3App;
}
function getRouteRules(method, pathname) {
  const m = findRouteRules(method, pathname);
  if (!m?.length) {
    return { routeRuleMiddleware: [] };
  }
  const routeRules = {};
  for (const layer of m) {
    for (const rule of layer.data) {
      const currentRule = routeRules[rule.name];
      if (currentRule) {
        if (rule.options === false) {
          delete routeRules[rule.name];
          continue;
        }
        if (typeof currentRule.options === "object" && typeof rule.options === "object") {
          currentRule.options = {
            ...currentRule.options,
            ...rule.options
          };
        } else {
          currentRule.options = rule.options;
        }
        currentRule.route = rule.route;
        currentRule.params = {
          ...currentRule.params,
          ...layer.params
        };
      } else if (rule.options !== false) {
        routeRules[rule.name] = {
          ...rule,
          params: layer.params
        };
      }
    }
  }
  const middleware = [];
  const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
  for (const rule of orderedRules) {
    if (rule.options === false || !rule.handler) {
      continue;
    }
    middleware.push(rule.handler(rule));
  }
  return {
    routeRules,
    routeRuleMiddleware: middleware
  };
}
function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
  process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
  process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
const tracingSrvxPlugins = [];
const _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
const port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
const host = process.env.NITRO_HOST || process.env.HOST;
const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
serve({
  port,
  hostname: host,
  tls: cert && key ? {
    cert,
    key
  } : void 0,
  fetch: nitroApp.fetch,
  plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
const nodeServer = {};
export {
  nodeServer as default
};
