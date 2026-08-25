/**
 * funkyoushift.com codes collector.
 * Route: www.funkyoushift.com/codes/api/*
 * Writes pending rows to codes/data/submissions.json in funkyoushift.github.io
 * via the GitHub Contents API. Approve copies into codes/data/community.json.
 */
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-Review-Key",
  "Access-Control-Max-Age": "86400",
};

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...CORS },
  });
}

function trim(value, max) {
  const text = String(value == null ? "" : value).trim();
  return max ? text.slice(0, max) : text;
}

const SERIAL_RE = /^BL3\([A-Za-z0-9+/=\-_]{8,}\)$/;
const TYPES = ["AR", "Pistol", "Shotgun", "SMG", "Sniper", "Heavy", "Grenade", "Shield", "Class Mod", "Artifact", "Other"];
const RARITIES = ["Common", "Uncommon", "Rare", "Epic", "Legendary"];

function validate(payload) {
  const errors = [];
  const name = trim(payload && payload.name, 120);
  const serial = trim(payload && payload.serial).replace(/\s+/g, "");
  const type = trim(payload && payload.type, 40);
  const rarity = trim(payload && payload.rarity, 40);
  const manufacturer = trim(payload && payload.manufacturer, 80);
  const notes = trim(payload && payload.notes, 2000);
  const submitter = trim(payload && payload.submitter, 80);
  const discord = trim(payload && payload.discord, 80);
  const imageUrl = trim(payload && payload.imageUrl, 500);
  if (!name) errors.push({ field: "name", message: "Item name is required." });
  if (!serial) errors.push({ field: "serial", message: "BL3 serial is required." });
  else if (!SERIAL_RE.test(serial)) errors.push({ field: "serial", message: "Serial must look like BL3(...) base64." });
  if (type && !TYPES.includes(type)) errors.push({ field: "type", message: "Unknown item type." });
  if (rarity && !RARITIES.includes(rarity)) errors.push({ field: "rarity", message: "Unknown rarity." });
  if (imageUrl && !/^https?:\/\//i.test(imageUrl)) {
    errors.push({ field: "imageUrl", message: "Image URL must start with http(s)://" });
  }
  return {
    ok: !errors.length,
    errors,
    value: { name, serial, type, rarity, manufacturer, notes, submitter, discord, imageUrl },
  };
}

function categoryFor(item) {
  if (["AR", "SMG", "Pistol", "Shotgun", "Sniper", "Heavy"].includes(item.type)) return "Weapons";
  if (item.type === "Grenade") return "Grenades";
  if (item.type === "Shield") return "Shields";
  if (item.type === "Class Mod") return "Class Mods";
  if (item.type === "Artifact") return "Artifacts";
  return "Other";
}

async function githubFile(env, path) {
  const res = await fetch(
    `https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/contents/${path}`,
    {
      headers: {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "funkyoushift-bl3-codes",
      },
    }
  );
  if (res.status === 404) return { sha: null, data: { ok: true, count: 0, items: [] } };
  if (!res.ok) throw new Error(`GitHub read failed (${res.status})`);
  const meta = await res.json();
  const text = atob(String(meta.content || "").replace(/\n/g, ""));
  return { sha: meta.sha, data: JSON.parse(text || "{}") };
}

async function githubPut(env, path, data, sha, message) {
  data.count = (data.items || []).length;
  data.ok = true;
  const body = {
    message,
    content: btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2) + "\n"))),
    sha: sha || undefined,
  };
  const res = await fetch(
    `https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "funkyoushift-bl3-codes",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub write failed (${res.status}): ${err.slice(0, 200)}`);
  }
}

function reviewOk(req, env) {
  const key = req.headers.get("X-Review-Key") || "";
  return env.REVIEW_KEY && key && key === env.REVIEW_KEY;
}

export default {
  async fetch(req, env) {
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
    const url = new URL(req.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";
    try {
      if (req.method === "GET" && path.endsWith("/api/schema")) {
        return json(200, {
          $id: "funkyou.bl3.item-code-submission",
          version: 1,
          endpoint: "https://www.funkyoushift.com/codes/api/submit",
        });
      }
      if (req.method === "GET" && path.endsWith("/api/submissions")) {
        if (!reviewOk(req, env)) return json(403, { ok: false, error: "Review key required." });
        const file = await githubFile(env, env.SUBMISSIONS_PATH);
        return json(200, file.data);
      }
      if (req.method === "POST" && path.endsWith("/api/submit")) {
        const payload = await req.json();
        const checked = validate(payload);
        if (!checked.ok) return json(400, { ok: false, errors: checked.errors });
        const file = await githubFile(env, env.SUBMISSIONS_PATH);
        const store = file.data.items ? file.data : { items: [] };
        const id = "sub-" + crypto.randomUUID().replace(/-/g, "").slice(0, 16);
        const item = {
          id,
          ...checked.value,
          category: categoryFor(checked.value),
          source: "community",
          status: "pending",
          submittedAt: new Date().toISOString(),
        };
        store.items = store.items || [];
        store.items.push(item);
        await githubPut(env, env.SUBMISSIONS_PATH, store, file.sha, `codes: queue ${item.name}`);
        return json(200, {
          ok: true,
          id,
          pending: store.items.filter((row) => row.status === "pending").length,
        });
      }
      if (req.method === "POST" && path.endsWith("/api/review")) {
        if (!reviewOk(req, env)) return json(403, { ok: false, error: "Review key required." });
        const body = await req.json();
        const id = trim(body && body.id);
        const action = trim(body && body.action);
        const pending = await githubFile(env, env.SUBMISSIONS_PATH);
        const item = (pending.data.items || []).find((row) => row.id === id);
        if (!item) return json(404, { ok: false, error: "Unknown submission." });
        if (action === "reject") {
          item.status = "rejected";
          item.reviewedAt = new Date().toISOString();
          await githubPut(env, env.SUBMISSIONS_PATH, pending.data, pending.sha, `codes: reject ${item.name}`);
          return json(200, { ok: true, item });
        }
        if (action !== "approve") return json(400, { ok: false, error: "action must be approve or reject." });
        const live = await githubFile(env, env.COMMUNITY_PATH);
        const published = {
          id: item.id,
          name: item.name,
          serial: item.serial,
          type: item.type,
          category: item.category || categoryFor(item),
          rarity: item.rarity,
          manufacturer: item.manufacturer,
          notes: item.notes,
          submitter: item.submitter,
          discord: "",
          imageUrl: item.imageUrl || "",
          content: "",
          source: "community",
          url: "",
        };
        live.data.items = live.data.items || [];
        const idx = live.data.items.findIndex((row) => row.id === published.id || row.serial === published.serial);
        if (idx >= 0) live.data.items[idx] = { ...live.data.items[idx], ...published };
        else live.data.items.push(published);
        live.data.items.sort((a, b) => a.name.localeCompare(b.name));
        await githubPut(env, env.COMMUNITY_PATH, live.data, live.sha, `codes: approve ${item.name}`);
        item.status = "approved";
        item.reviewedAt = new Date().toISOString();
        const again = await githubFile(env, env.SUBMISSIONS_PATH);
        const row = (again.data.items || []).find((entry) => entry.id === id);
        if (row) {
          row.status = "approved";
          row.reviewedAt = item.reviewedAt;
        }
        await githubPut(env, env.SUBMISSIONS_PATH, again.data, again.sha, `codes: mark approved ${item.name}`);
        return json(200, { ok: true, item, catalogCount: live.data.items.length });
      }
      return json(404, { ok: false, error: "Unknown API route." });
    } catch (err) {
      return json(500, { ok: false, error: err.message || "Collector error" });
    }
  },
};
