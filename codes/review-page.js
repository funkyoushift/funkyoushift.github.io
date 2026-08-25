(() => {
  const localHost = location.hostname === "127.0.0.1" || location.hostname === "localhost";
  const apiBase = localHost
    ? ""
    : ((window.FUNK_CODES && window.FUNK_CODES.apiBase) || "https://www.funkyoushift.com/codes/api");

  const metaEl = document.getElementById("meta");
  const boxEl = document.getElementById("box");
  const noticeEl = document.getElementById("notice");
  const keyEl = document.getElementById("reviewKey");
  const downloadBtn = document.getElementById("downloadStore");

  let mode = "remote";
  let store = { items: [] };
  let dirty = false;
  let sourceLabel = "";

  function headers() {
    const key = keyEl.value.trim();
    const out = { Accept: "application/json" };
    if (key) out["X-Review-Key"] = key;
    return out;
  }

  function reviewUrl() {
    return localHost ? "/api/review" : `${apiBase.replace(/\/+$/, "")}/review`;
  }

  function listUrl() {
    return localHost ? "/api/submissions" : `${apiBase.replace(/\/+$/, "")}/submissions`;
  }

  function siteJsonUrl() {
    return new URL("data/submissions.json", location.href).href;
  }

  function esc(value) {
    return String(value || "").replace(/[&<>"]/g, (ch) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
    }[ch]));
  }

  function showNotice(text, bad = false) {
    noticeEl.hidden = !text;
    noticeEl.textContent = text || "";
    noticeEl.classList.toggle("bad", !!bad);
  }

  function newId() {
    return "sub-local-" + Math.random().toString(16).slice(2, 10) + Date.now().toString(16).slice(-6);
  }

  function normalizeItem(item) {
    if (!item || typeof item !== "object") return null;
    const serial = String(item.serial || "").replace(/\s+/g, "");
    const name = String(item.name || "").trim();
    if (!name && !serial) return null;
    return {
      ...item,
      id: item.id || newId(),
      name: name || "(unnamed)",
      serial,
      type: item.type || "",
      rarity: item.rarity || "",
      submitter: item.submitter || "",
      discord: item.discord || "",
      status: item.status || "pending",
    };
  }

  function parseStore(data) {
    if (!data) throw new Error("Empty JSON.");
    let raw = [];
    if (Array.isArray(data)) raw = data;
    else if (Array.isArray(data.items)) raw = data.items;
    else if (data.item) raw = [data.item];
    else if (data.name || data.serial) raw = [data];
    else throw new Error("Not a submissions file. Use the queue JSON or a downloaded item.");
    const items = raw.map(normalizeItem).filter(Boolean);
    return { ok: true, items };
  }

  async function readResponse(res) {
    const text = await res.text();
    const type = res.headers.get("content-type") || "";
    const looksJson = /json/i.test(type) || /^\s*[{[]/.test(text);
    let data = null;
    if (looksJson) {
      try { data = JSON.parse(text); } catch (err) { data = null; }
    }
    return { res, data, text, type };
  }

  function collectorMissing(parsed) {
    if (parsed.res.status === 405) return true;
    if (parsed.data) return false;
    if (/html/i.test(parsed.type)) return true;
    if (parsed.res.status === 404 || parsed.res.status === 501) return true;
    return false;
  }

  function pendingRows() {
    return (store.items || []).filter((row) => row.status === "pending");
  }

  function render() {
    const pending = pendingRows();
    const total = (store.items || []).length;
    const where = sourceLabel ? ` · ${sourceLabel}` : "";
    metaEl.textContent = `${pending.length} pending · ${total} total${where}`;
    downloadBtn.hidden = !(mode === "local" && dirty);
    if (!total && mode === "local") {
      boxEl.innerHTML = "<p>No submissions in this file yet. Open a downloaded JSON, or wait for the collector Worker.</p>";
      return;
    }
    if (!pending.length) {
      boxEl.innerHTML = "<p>Queue is empty.</p>";
      return;
    }
    boxEl.innerHTML = `<table><thead><tr><th>Item</th><th>Serial</th><th>From</th><th></th></tr></thead><tbody>${
      pending.map((row) => `<tr>
        <td><strong>${esc(row.name)}</strong><br><span class="meta">${esc(row.type || "—")} · ${esc(row.rarity || "—")}</span></td>
        <td class="serial">${esc(row.serial)}</td>
        <td>${esc(row.submitter || "anon")}<br><span class="meta">${esc(row.discord || "")}</span></td>
        <td>
          <button type="button" class="primary" data-act="approve" data-id="${esc(row.id)}">Approve</button>
          <button type="button" data-act="reject" data-id="${esc(row.id)}">Reject</button>
        </td>
      </tr>`).join("")
    }</tbody></table>`;
  }

  function useLocal(data, label, notice) {
    mode = "local";
    store = parseStore(data);
    dirty = false;
    sourceLabel = label;
    showNotice(notice || "Reviewing a local JSON copy. Approve/reject stay on this page until you download the file. The live collector is not writing yet.");
    render();
  }

  function useRemote(data) {
    mode = "remote";
    store = { items: Array.isArray(data.items) ? data.items : [] };
    dirty = false;
    sourceLabel = "live collector";
    showNotice("");
    render();
  }

  async function loadSiteJson() {
    const res = await fetch(siteJsonUrl(), { cache: "no-store" });
    const parsed = await readResponse(res);
    if (!res.ok || !parsed.data) throw new Error("Could not read data/submissions.json.");
    useLocal(parsed.data, "data/submissions.json", "Collector API is not attached. Loaded the public site JSON instead. Open a downloaded submission if this file is empty.");
  }

  async function loadLive() {
    boxEl.textContent = "Loading live queue…";
    const parsed = await readResponse(await fetch(listUrl(), {
      cache: "no-store",
      headers: headers(),
    }));
    if (collectorMissing(parsed)) {
      showNotice("The Cloudflare collector is not deployed yet (GitHub Pages returned " + parsed.res.status + "). Live approve will not write. You can still review data/submissions.json or a downloaded JSON.", true);
      try {
        await loadSiteJson();
      } catch (err) {
        mode = "local";
        store = { items: [] };
        sourceLabel = "";
        metaEl.textContent = "Collector offline";
        boxEl.innerHTML = "<p>Could not reach the live queue. Use <strong>Open downloaded JSON</strong> or <strong>Load site JSON</strong>.</p>";
      }
      return;
    }
    if (!parsed.res.ok) {
      const message = (parsed.data && (parsed.data.error || parsed.data.message)) || `Cannot read the queue (${parsed.res.status}).`;
      showNotice(message, true);
      metaEl.textContent = parsed.res.status === 403
        ? "Paste the REVIEW_KEY, then Load live queue."
        : message;
      boxEl.innerHTML = parsed.res.status === 403
        ? "<p>The collector is up. Paste the review key to see pending rows, or review a local JSON file.</p>"
        : `<p>${esc(message)}</p>`;
      return;
    }
    useRemote(parsed.data || { items: [] });
  }

  function applyLocal(id, action) {
    const item = (store.items || []).find((row) => row.id === id);
    if (!item) {
      boxEl.textContent = "Unknown submission.";
      return;
    }
    item.status = action === "approve" ? "approved" : "rejected";
    item.reviewedAt = new Date().toISOString();
    dirty = true;
    sourceLabel = (sourceLabel || "local JSON") + (sourceLabel.includes("edited") ? "" : " · edited");
    showNotice("Reviewed locally. Download the JSON and drop it on web/data, then run node review.js, or deploy the Worker so live approve can write.");
    render();
  }

  async function act(id, action) {
    if (mode === "local") {
      applyLocal(id, action);
      return;
    }
    const parsed = await readResponse(await fetch(reviewUrl(), {
      method: "POST",
      headers: { ...headers(), "Content-Type": "application/json" },
      body: JSON.stringify({ id, action }),
    }));
    if (collectorMissing(parsed)) {
      showNotice("Live review POST is not available (Pages " + parsed.res.status + "). Applied the decision locally so you can download JSON.", true);
      applyLocal(id, action);
      return;
    }
    if (!parsed.res.ok) {
      const message = (parsed.data && parsed.data.error) || `Review failed (${parsed.res.status}).`;
      showNotice(message, true);
      return;
    }
    await loadLive();
  }

  function downloadStore() {
    const payload = {
      ok: true,
      count: (store.items || []).length,
      items: store.items || [],
    };
    const blob = new Blob([JSON.stringify(payload, null, 2) + "\n"], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "submissions.json";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  boxEl.addEventListener("click", async (event) => {
    const btn = event.target.closest("[data-act]");
    if (!btn) return;
    btn.disabled = true;
    try {
      await act(btn.dataset.id, btn.dataset.act);
    } catch (err) {
      showNotice(err.message || "Review action failed.", true);
    } finally {
      btn.disabled = false;
    }
  });

  document.getElementById("loadLive").addEventListener("click", async () => {
    try { await loadLive(); } catch (err) {
      showNotice(err.message || "Could not load the live queue.", true);
      boxEl.textContent = err.message || "Could not load the live queue.";
    }
  });

  document.getElementById("loadSite").addEventListener("click", async () => {
    try { await loadSiteJson(); } catch (err) {
      showNotice(err.message || "Could not load site JSON.", true);
    }
  });

  document.getElementById("localFile").addEventListener("change", async (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      useLocal(data, file.name, "Loaded " + file.name + ". Approve/reject here, then download the reviewed JSON.");
    } catch (err) {
      showNotice(err.message || "That file is not valid JSON.", true);
    }
    event.target.value = "";
  });

  downloadBtn.addEventListener("click", downloadStore);
  keyEl.addEventListener("change", () => { loadLive().catch(() => {}); });

  (async () => {
    try {
      if (localHost) {
        await loadLive();
        return;
      }
      await loadLive();
    } catch (err) {
      showNotice(err.message || "Review page failed to start.", true);
      boxEl.innerHTML = "<p>The live queue did not load. Use <strong>Load site JSON</strong> or <strong>Open downloaded JSON</strong>.</p>";
    }
  })();
})();
