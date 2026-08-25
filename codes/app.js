(() => {
  const F = window.FunkCodeFields;
  const CFG = window.FUNK_CODES || {};
  const $ = (id) => document.getElementById(id);
  const grid = $("grid");
  const toastEl = $("toast");
  const picked = new Map();
  let catalog = [];
  const localHost = location.hostname === "127.0.0.1" || location.hostname === "localhost";

  function apiUrl(path) {
    if (localHost) return path;
    const base = String(CFG.apiBase || "https://www.funkyoushift.com/codes/api").replace(/\/+$/, "");
    return base + path.replace(/^\/api/, "");
  }

  function toast(message, ok = true) {
    toastEl.hidden = false;
    toastEl.textContent = message;
    toastEl.classList.toggle("bad", !ok);
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(() => { toastEl.hidden = true; }, 2200);
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function rarityColor(rarity) {
    return ({
      Common: "#c5c0b4",
      Uncommon: "#5dcc6a",
      Rare: "#4aa3ff",
      Epic: "#c56bff",
      Legendary: "#f0c14b",
    })[rarity] || "#9b8d73";
  }

  function placeholder(item) {
    const label = (item.type || item.category || "BL3").slice(0, 10);
    const fill = rarityColor(item.rarity);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180">
      <rect width="320" height="180" fill="#0e0c09"/>
      <rect x="18" y="18" width="284" height="144" rx="12" fill="none" stroke="${fill}" stroke-width="3"/>
      <text x="160" y="98" text-anchor="middle" fill="${fill}" font-family="Segoe UI,sans-serif" font-size="28" font-weight="700">${esc(label)}</text>
    </svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }

  function fillSelect(id, values, labels) {
    const el = $(id);
    const current = el.value;
    const extras = [...el.querySelectorAll("option")].slice(0, 1);
    el.innerHTML = "";
    extras.forEach((opt) => el.appendChild(opt));
    values.filter(Boolean).forEach((value) => {
      const opt = document.createElement("option");
      opt.value = value;
      opt.textContent = (labels && labels[value]) || value;
      el.appendChild(opt);
    });
    if ([...el.options].some((opt) => opt.value === current)) el.value = current;
  }

  function unique(values) {
    return [...new Set(values.filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b)));
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      const area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      area.remove();
      return ok;
    }
  }

  function matches(item) {
    const q = $("q").value.trim().toLowerCase();
    const category = $("fCategory").value;
    const type = $("fType").value;
    const rarity = $("fRarity").value;
    const mfg = $("fMfg").value;
    const source = $("fSource").value;
    if (category && (item.category || F.categoryFor(item)) !== category) return false;
    if (type && item.type !== type) return false;
    if (rarity && item.rarity !== rarity) return false;
    if (mfg && item.manufacturer !== mfg) return false;
    if (source && item.source !== source) return false;
    if (!q) return true;
    const hay = [item.name, item.type, item.manufacturer, item.category, item.serial, item.submitter, item.notes, item.source]
      .join(" ")
      .toLowerCase();
    return q.split(/\s+/).every((term) => hay.includes(term));
  }

  function render() {
    const items = catalog.filter(matches);
    $("resultCount").textContent = `${items.length} code${items.length === 1 ? "" : "s"}`;
    $("pickedMeta").textContent = picked.size
      ? `${picked.size} in list. Copy list pastes one serial per line.`
      : "Nothing in your list yet. Use Add on a card, then copy the serials in one paste.";
    if (!items.length) {
      grid.innerHTML = `<div class="empty">No codes match those filters.</div>`;
      return;
    }
    grid.innerHTML = items.map((item) => {
      const img = item.imageUrl || placeholder(item);
      const source = item.source === "lootlemon" ? "Lootlemon" : item.source === "gzo" ? "GZO" : item.submitter || "Community";
      const more = item.url ? `<a class="more" href="${esc(item.url)}" target="_blank" rel="noopener">Lootlemon page</a>` : "";
      return `<article class="card${picked.has(item.id) ? " picked" : ""}" data-id="${esc(item.id)}">
        <div class="thumb">
          <span class="badge ${esc(item.rarity || "")}">${esc(item.rarity || "Unknown")}</span>
          <img alt="" src="${esc(img)}" onerror="this.onerror=null;this.src='${placeholder({ type: item.type })}';" />
        </div>
        <div class="card-body">
          <h3>${esc(item.name)}</h3>
          <p class="meta">${esc(item.manufacturer || "—")} · ${esc(item.type || item.category || "Item")} · ${esc(source)}</p>
          <div class="card-actions">
            <button type="button" class="primary" data-copy="${esc(item.id)}">Copy serial</button>
            <button type="button" data-add="${esc(item.id)}">${picked.has(item.id) ? "In list" : "Add"}</button>
          </div>
          ${more}
        </div>
      </article>`;
    }).join("");
  }

  function byId(id) {
    return catalog.find((item) => item.id === id);
  }

  grid.addEventListener("click", async (event) => {
    const copyId = event.target.closest("[data-copy]");
    const addId = event.target.closest("[data-add]");
    if (copyId) {
      const item = byId(copyId.getAttribute("data-copy"));
      if (!item) return;
      const ok = await copyText(item.serial);
      toast(ok ? `Copied ${item.name}` : "Could not copy", ok);
    }
    if (addId) {
      const id = addId.getAttribute("data-add");
      const item = byId(id);
      if (!item) return;
      if (picked.has(id)) picked.delete(id);
      else picked.set(id, item);
      render();
    }
  });

  $("copyList").onclick = async () => {
    const serials = [...picked.values()].map((item) => item.serial).join("\n");
    if (!serials) return toast("Add a card to the list first", false);
    const ok = await copyText(serials);
    toast(ok ? `Copied ${picked.size} serials` : "Could not copy", ok);
  };
  $("clearList").onclick = () => { picked.clear(); render(); };
  $("clearFilters").onclick = () => {
    $("q").value = "";
    ["fCategory", "fType", "fRarity", "fMfg", "fSource"].forEach((id) => { $(id).value = ""; });
    render();
  };

  ["q", "fCategory", "fType", "fRarity", "fMfg", "fSource"].forEach((id) => {
    $(id).addEventListener("input", render);
    $(id).addEventListener("change", render);
  });

  document.querySelectorAll("[data-jump]").forEach((link) => {
    link.addEventListener("click", () => {
      document.querySelectorAll(".nav-link").forEach((el) => el.classList.remove("active"));
      link.classList.add("active");
    });
  });

  F.TYPES.forEach((type) => {
    const opt = document.createElement("option");
    opt.value = type;
    opt.textContent = type;
    $("type").appendChild(opt);
  });
  F.RARITIES.forEach((rarity) => {
    const opt = document.createElement("option");
    opt.value = rarity;
    opt.textContent = rarity;
    $("rarity").appendChild(opt);
  });

  function formPayload() {
    return {
      name: $("name").value,
      serial: $("serial").value,
      type: $("type").value,
      rarity: $("rarity").value,
      manufacturer: $("manufacturer").value,
      notes: $("notes").value,
      submitter: $("submitter").value,
      discord: $("discord").value,
      imageUrl: $("imageUrl").value,
    };
  }

  function showErrors(errors) {
    document.querySelectorAll("[data-err]").forEach((el) => { el.textContent = ""; });
    document.querySelectorAll("label.invalid").forEach((el) => el.classList.remove("invalid"));
    (errors || []).forEach((err) => {
      const slot = document.querySelector(`[data-err="${err.field}"]`);
      if (slot) slot.textContent = err.message;
      const field = document.getElementById(err.field);
      if (field && field.closest("label")) field.closest("label").classList.add("invalid");
    });
  }

  function readImage() {
    const file = $("imageFile").files[0];
    if (!file) return Promise.resolve("");
    if (file.size > 1.5 * 1024 * 1024) {
      return Promise.reject(new Error("Image is too large (1.5 MB max)."));
    }
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Could not read that image."));
      reader.readAsDataURL(file);
    });
  }

  $("submitForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = formPayload();
    const checked = F.validate(payload);
    showErrors(checked.errors);
    if (!checked.ok) {
      toast(checked.errors[0].message, false);
      return;
    }
    $("submitBtn").disabled = true;
    $("formStatus").textContent = "Sending…";
    try {
      payload.imageData = await readImage();
      const res = await fetch(apiUrl("/api/submit"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        showErrors(data.errors || []);
        throw new Error((data.errors && data.errors[0] && data.errors[0].message) || data.error || "Submit failed");
      }
      showErrors([]);
      $("submitForm").reset();
      $("formStatus").textContent = `Queued as ${data.id}. ${data.pending} pending for FunkYouSHiFT.`;
      toast("Submitted to the review queue");
    } catch (err) {
      $("formStatus").textContent = `${err.message} You can still download JSON and send that.`;
      toast(err.message, false);
    } finally {
      $("submitBtn").disabled = false;
    }
  });

  $("exportJson").onclick = async () => {
    const payload = formPayload();
    const checked = F.validate(payload);
    showErrors(checked.errors);
    if (!checked.ok) return toast(checked.errors[0].message, false);
    try {
      checked.value.imageData = await readImage();
    } catch (err) {
      return toast(err.message, false);
    }
    const blob = new Blob([JSON.stringify({ schema: "funkyou.bl3.item-code-submission", version: F.VERSION, item: checked.value }, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${checked.value.name.replace(/[^\w]+/g, "-") || "bl3-code"}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    toast("Downloaded JSON — send it to FunkYouSHiFT");
  };

  $("serial").addEventListener("input", () => {
    const serial = F.normalizeSerial($("serial").value);
    const err = document.querySelector('[data-err="serial"]');
    if (!$("serial").value.trim()) {
      err.textContent = "";
      $("serial").closest("label").classList.remove("invalid");
      return;
    }
    if (!F.looksLikeSerial(serial)) {
      err.textContent = "Serial must look like BL3(...).";
      $("serial").closest("label").classList.add("invalid");
    } else {
      err.textContent = "";
      $("serial").closest("label").classList.remove("invalid");
    }
  });

  async function loadJson(url) {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("bad status");
    return res.json();
  }

  async function loadCatalog() {
    catalog = [];
    if (localHost) {
      try {
        const data = await loadJson("/api/codes");
        catalog = data.items || [];
      } catch (err) {
        catalog = [];
      }
    }
    if (!catalog.length) {
      const [seed, community] = await Promise.allSettled([
        loadJson("data/codes.json"),
        loadJson("data/community.json"),
      ]);
      const seedItems = seed.status === "fulfilled" ? seed.value.items || [] : [];
      const liveItems = community.status === "fulfilled" ? community.value.items || [] : [];
      catalog = [...seedItems, ...liveItems];
    }
    fillSelect("fCategory", unique(catalog.map((item) => item.category || F.categoryFor(item))));
    fillSelect("fType", unique(catalog.map((item) => item.type)));
    fillSelect("fRarity", F.RARITIES.filter((rarity) => catalog.some((item) => item.rarity === rarity)));
    fillSelect("fMfg", unique(catalog.map((item) => item.manufacturer)));
    const loot = catalog.filter((item) => item.source === "lootlemon").length;
    const community = catalog.filter((item) => item.source === "community").length;
    $("catalogMeta").textContent = catalog.length
      ? `${catalog.length} live codes (${loot} Lootlemon seed, ${community} community). Search, filter, copy.`
      : "Catalog is empty. Run node seed.js, then restart the server.";
    render();
  }

  async function wireDownload() {
    const link = $("downloadLink");
    if (!link) return;
    const repo = CFG.downloadRepo || "https://github.com/funkyoushift/FunkYouBoostingTools";
    const releases = CFG.downloadReleases || `${repo}/releases`;
    link.href = repo;
    try {
      const res = await fetch("https://api.github.com/repos/funkyoushift/FunkYouBoostingTools/releases/latest");
      if (res.ok) link.href = releases;
    } catch (err) {
      link.href = repo;
    }
  }

  wireDownload();
  loadCatalog();
})();
