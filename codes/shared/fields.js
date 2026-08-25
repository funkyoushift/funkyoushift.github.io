/**
 * Shared BL3 code submission schema for the community site and later
 * FunkYouBoostingTools Items/Spawn UI. Keep field names stable.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.FunkCodeFields = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const VERSION = 1;

  const TYPES = [
    "AR",
    "Pistol",
    "Shotgun",
    "SMG",
    "Sniper",
    "Heavy",
    "Grenade",
    "Shield",
    "Class Mod",
    "Artifact",
    "Other",
  ];

  const RARITIES = ["Common", "Uncommon", "Rare", "Epic", "Legendary"];

  const CATEGORIES = ["Weapons", "Shields", "Grenades", "Class Mods", "Artifacts", "Other"];

  const GUN_TYPES = new Set(["AR", "SMG", "Pistol", "Shotgun", "Sniper", "Heavy"]);

  const SERIAL_RE = /^BL3\([A-Za-z0-9+/=\-_]{8,}\)$/;

  const FIELD_NAMES = [
    "name",
    "serial",
    "type",
    "rarity",
    "manufacturer",
    "notes",
    "submitter",
    "discord",
    "imageUrl",
  ];

  function trim(value, max) {
    const text = String(value == null ? "" : value).trim();
    return max ? text.slice(0, max) : text;
  }

  function looksLikeSerial(value) {
    return SERIAL_RE.test(trim(value).replace(/\s+/g, ""));
  }

  function normalizeSerial(value) {
    return trim(value).replace(/\s+/g, "");
  }

  function categoryFor(item) {
    if (item.category && CATEGORIES.includes(item.category)) return item.category;
    if (GUN_TYPES.has(item.type)) return "Weapons";
    if (item.type === "Grenade") return "Grenades";
    if (item.type === "Shield") return "Shields";
    if (item.type === "Class Mod" || item.type === "COM") return "Class Mods";
    if (item.type === "Artifact") return "Artifacts";
    return item.category || "Other";
  }

  function normalizeType(raw) {
    const type = trim(raw && raw.type);
    if (TYPES.includes(type)) return type;
    const category = raw && raw.category;
    if (category === "Grenades") return "Grenade";
    if (category === "Shields") return "Shield";
    if (category === "Class Mods") return "Class Mod";
    if (category === "Artifacts") return "Artifact";
    if (GUN_TYPES.has(type)) return type;
    return type || "Other";
  }

  function validate(payload) {
    const errors = [];
    const name = trim(payload && payload.name, 120);
    const serial = normalizeSerial(payload && payload.serial);
    const type = trim(payload && payload.type, 40);
    const rarity = trim(payload && payload.rarity, 40);
    const manufacturer = trim(payload && payload.manufacturer, 80);
    const notes = trim(payload && payload.notes, 2000);
    const submitter = trim(payload && payload.submitter, 80);
    const discord = trim(payload && payload.discord, 80);
    const imageUrl = trim(payload && payload.imageUrl, 500);

    if (!name) errors.push({ field: "name", message: "Item name is required." });
    if (!serial) errors.push({ field: "serial", message: "BL3 serial is required." });
    else if (!looksLikeSerial(serial)) {
      errors.push({ field: "serial", message: "Serial must look like BL3(...) base64." });
    }
    if (type && !TYPES.includes(type)) errors.push({ field: "type", message: "Unknown item type." });
    if (rarity && !RARITIES.includes(rarity)) errors.push({ field: "rarity", message: "Unknown rarity." });
    if (imageUrl && !/^https?:\/\//i.test(imageUrl) && !imageUrl.startsWith("/uploads/")) {
      errors.push({ field: "imageUrl", message: "Image URL must start with http(s)://" });
    }

    const value = {
      name,
      serial,
      type,
      rarity,
      manufacturer,
      notes,
      submitter,
      discord,
      imageUrl,
    };

    return { ok: errors.length === 0, errors, value };
  }

  return {
    VERSION,
    TYPES,
    RARITIES,
    CATEGORIES,
    GUN_TYPES,
    SERIAL_RE,
    FIELD_NAMES,
    looksLikeSerial,
    normalizeSerial,
    normalizeType,
    categoryFor,
    validate,
    trim,
  };
});
