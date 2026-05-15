/***********************
 * NUMO ADMIN PANEL V2
 * Uses JSONP to avoid CORS issue with Apps Script
 ***********************/

const API_URL = "https://script.google.com/macros/s/AKfycbwqqBJ1A9tqYhPhEJe37Ik3-HGKZOHUUHqdf_jtLJuTv8tqQpt6WqX5jUBQwKPMbM92tw/exec";

const BADGE_PRESETS = [
  "Promo",
  "Hot Promo",
  "Limited",
  "Best Deal",
  "Mega Sale",
  "Promo Raya",
  "Promo Merdeka",
  "Promo Gaji",
  "Last Call",
  "Custom"
];

const BADGE_COLORS = ["Gold", "Green", "Red", "Blue", "Purple", "Dark"];

const BASE_PRODUCTS = [
  {
    name: "NETFLIX PREMIUM",
    section: "ALL",
    plans: [
      { duration: "1 Bulan", price: "RM25" },
      { duration: "2 Bulan", price: "RM45" },
      { duration: "3 Bulan Promo", price: "RM60" },
      { duration: "6 Bulan", price: "RM120" },
      { duration: "12 Bulan", price: "RM230" }
    ]
  },
  {
    name: "YOUTUBE PREMIUM",
    section: "Email Sendiri",
    plans: [
      { duration: "1 Bulan", price: "RM16" },
      { duration: "3 Bulan", price: "RM45" },
      { duration: "6 Bulan", price: "RM85" },
      { duration: "12 Bulan", price: "RM144" }
    ]
  },
  {
    name: "YOUTUBE PREMIUM",
    section: "Email Seller",
    plans: [
      { duration: "1 Bulan", price: "RM10" },
      { duration: "3 Bulan", price: "RM27" },
      { duration: "6 Bulan", price: "RM48" },
      { duration: "12 Bulan", price: "RM84" }
    ]
  },
  {
    name: "DISNEY+ HOTSTAR",
    section: "ALL",
    plans: [
      { duration: "1 Bulan", price: "RM25" },
      { duration: "2 Bulan", price: "RM45" },
      { duration: "Promo 3 Bulan", price: "RM60" },
      { duration: "6 Bulan", price: "RM120" },
      { duration: "12 Bulan", price: "RM230" }
    ]
  },
  {
    name: "SOOKA PREMIUM",
    section: "ALL",
    plans: [
      { duration: "1 Bulan", price: "RM25" },
      { duration: "2 Bulan", price: "RM46" },
      { duration: "6 Bulan", price: "RM120" },
      { duration: "12 Bulan", price: "RM216" }
    ]
  },
  {
    name: "VIU PREMIUM",
    section: "ALL",
    plans: [
      { duration: "1 Bulan", price: "RM15" },
      { duration: "2 Bulan", price: "RM26" },
      { duration: "6 Bulan", price: "RM66" },
      { duration: "12 Bulan", price: "RM120" }
    ]
  },
  {
    name: "iQIYI PREMIUM",
    section: "ALL",
    plans: [
      { duration: "1 Bulan", price: "RM15" },
      { duration: "2 Bulan", price: "RM26" },
      { duration: "Promo 3 Bulan", price: "RM33" },
      { duration: "6 Bulan", price: "RM66" },
      { duration: "12 Bulan", price: "RM120" }
    ]
  },
  {
    name: "SPOTIFY PREMIUM",
    section: "ALL",
    plans: [
      { duration: "1 Bulan", price: "RM15" },
      { duration: "2 Bulan", price: "RM28" },
      { duration: "Promo 2 Bulan", price: "RM25" },
      { duration: "6 Bulan", price: "RM72" },
      { duration: "12 Bulan", price: "RM120" }
    ]
  }
];

let data = { stock: [], promos: [], meta: {} };
let adminPassword = sessionStorage.getItem("numoAdminPasswordV2") || "";
let loggedIn = Boolean(adminPassword);

const els = {};

document.addEventListener("DOMContentLoaded", () => {
  cache();
  bind();
  if (adminPassword) els.password.value = adminPassword;

  if (loggedIn) {
    showPanel();
    loadData();
  }
});

function cache() {
  els.loginCard = document.getElementById("loginCard");
  els.panel = document.getElementById("panel");
  els.password = document.getElementById("password");
  els.loginBtn = document.getElementById("loginBtn");
  els.loginMsg = document.getElementById("loginMsg");
  els.globalMsg = document.getElementById("globalMsg");
  els.logoutBtn = document.getElementById("logoutBtn");
  els.refreshBtn = document.getElementById("refreshBtn");
  els.stockOn = document.getElementById("stockOn");
  els.stockOff = document.getElementById("stockOff");
  els.promoOn = document.getElementById("promoOn");
  els.syncText = document.getElementById("syncText");
  els.stockGrid = document.getElementById("stockGrid");
  els.promoGrid = document.getElementById("promoGrid");
  els.search = document.getElementById("search");
  els.clearSearch = document.getElementById("clearSearch");
}

function bind() {
  els.loginBtn.addEventListener("click", login);
  els.password.addEventListener("keydown", e => {
    if (e.key === "Enter") login();
  });

  els.logoutBtn.addEventListener("click", logout);
  els.refreshBtn.addEventListener("click", () => {
    if (!loggedIn) {
      msg(els.loginMsg, "Login dulu.", "info");
      return;
    }
    loadData();
  });

  document.querySelectorAll(".tab").forEach(btn => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });

  els.search.addEventListener("input", renderPromos);
  els.clearSearch.addEventListener("click", () => {
    els.search.value = "";
    renderPromos();
  });
}

async function login() {
  const password = els.password.value.trim();
  if (!password) {
    msg(els.loginMsg, "Masukkan password dulu.", "error");
    return;
  }

  setLoading(els.loginBtn, true, "Checking...");

  try {
    const result = await jsonp({
      mode: "verifyAdmin",
      password
    });

    if (!result.ok) throw new Error(result.error || "Password salah.");

    adminPassword = password;
    loggedIn = true;
    sessionStorage.setItem("numoAdminPasswordV2", password);
    showPanel();
    await loadData();
  } catch (error) {
    msg(els.loginMsg, "Login gagal: " + error.message, "error");
  } finally {
    setLoading(els.loginBtn, false, "Login Admin");
  }
}

function logout() {
  adminPassword = "";
  loggedIn = false;
  sessionStorage.removeItem("numoAdminPasswordV2");
  els.panel.classList.remove("active");
  els.loginCard.style.display = "block";
  els.logoutBtn.classList.add("hidden");
  msg(els.loginMsg, "Logout berjaya.", "info");
}

function showPanel() {
  els.loginCard.style.display = "none";
  els.panel.classList.add("active");
  els.logoutBtn.classList.remove("hidden");
}

async function loadData() {
  msg(els.globalMsg, "Loading data...", "info");
  setLoading(els.refreshBtn, true, "Loading");

  try {
    const result = await jsonp({
      mode: "getWebsiteControl",
      _: Date.now()
    });

    if (!result.ok) throw new Error(result.error || "Gagal baca data.");

    data = result.data || { stock: [], promos: [], meta: {} };
    renderDashboard();
    renderStock();
    renderPromos();
    msg(els.globalMsg, "Data berjaya sync.", "success");
  } catch (error) {
    msg(els.globalMsg, "Gagal load data: " + error.message, "error");
  } finally {
    setLoading(els.refreshBtn, false, "Refresh");
  }
}

function renderDashboard() {
  els.stockOn.textContent = data.stock.filter(x => norm(x.status) === "ON").length;
  els.stockOff.textContent = data.stock.filter(x => norm(x.status) === "OFF").length;
  els.promoOn.textContent = data.promos.filter(isPromoOn).length;
  els.syncText.textContent = "Last sync: " + new Date().toLocaleString("ms-MY");
}

function renderStock() {
  if (!data.stock.length) {
    els.stockGrid.innerHTML = `<div class="empty">Tiada data stock.</div>`;
    return;
  }

  const stockOrder = [
    "NETFLIX PREMIUM||ALL",
    "YOUTUBE PREMIUM||Email Sendiri",
    "YOUTUBE PREMIUM||Email Seller",
    "DISNEY+ HOTSTAR||ALL",
    "SOOKA PREMIUM||ALL",
    "VIU PREMIUM||ALL",
    "iQIYI PREMIUM||ALL",
    "SPOTIFY PREMIUM||ALL"
  ];

  const items = [...data.stock].sort((a, b) => {
    const ai = stockOrder.indexOf(`${a.product}||${a.section}`);
    const bi = stockOrder.indexOf(`${b.product}||${b.section}`);
    return (ai < 0 ? 999 : ai) - (bi < 0 ? 999 : bi);
  });

  els.stockGrid.innerHTML = items.map((item, i) => {
    const status = norm(item.status) === "OFF" ? "OFF" : "ON";
    const section = item.section === "ALL" ? "Semua plan" : item.section;

    return `
      <article class="item" data-i="${i}">
        <div class="item-top">
          <div>
            <div class="title">${safe(item.product)}</div>
            <div class="subtitle">${safe(section)}</div>
          </div>
          <span class="pill ${status === "ON" ? "on" : "off"}">${status === "ON" ? "ON" : "HABIS STOK"}</span>
        </div>

        <div class="form">
          <div class="row">
            <div>
              <label class="field-label">Status Produk</label>
              <select class="select stock-status">
                <option value="ON" ${status === "ON" ? "selected" : ""}>ON - Boleh Order</option>
                <option value="OFF" ${status === "OFF" ? "selected" : ""}>OFF - Habis Stok</option>
              </select>
            </div>
            <div>
              <label class="field-label">Text Habis Stok</label>
              <input class="input stock-text" type="text" value="${safeAttr(item.stockText || "Habis Stok")}">
            </div>
          </div>

          <div class="quick">
            <button class="btn green stock-on" type="button">Ada Stok</button>
            <button class="btn red stock-off" type="button">Habis Stok</button>
            <button class="btn gold stock-save" type="button">Save Stock</button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  els.stockGrid.querySelectorAll(".item").forEach((card, i) => {
    const item = items[i];

    card.querySelector(".stock-on").addEventListener("click", () => {
      card.querySelector(".stock-status").value = "ON";
      card.querySelector(".stock-text").value = "Habis Stok";
    });

    card.querySelector(".stock-off").addEventListener("click", () => {
      card.querySelector(".stock-status").value = "OFF";
      card.querySelector(".stock-text").value = "Habis Stok";
    });

    card.querySelector(".stock-save").addEventListener("click", () => saveStock(card, item));
  });
}

async function saveStock(card, item) {
  const btn = card.querySelector(".stock-save");
  const status = card.querySelector(".stock-status").value;
  const stockText = card.querySelector(".stock-text").value.trim() || "Habis Stok";

  setLoading(btn, true, "Saving...");

  try {
    const result = await jsonp({
      mode: "saveStock",
      password: adminPassword,
      product: item.product,
      section: item.section || "ALL",
      status,
      stockText
    });

    if (!result.ok) throw new Error(result.error || "Gagal save stock.");

    msg(els.globalMsg, `Stock ${item.product} berjaya disimpan.`, "success");
    await loadData();
  } catch (error) {
    msg(els.globalMsg, "Gagal save stock: " + error.message, "error");
  } finally {
    setLoading(btn, false, "Save Stock");
  }
}

function renderPromos() {
  const query = norm(els.search.value);
  const allPlans = flattenPlans();

  const items = allPlans.map(plan => {
    const promo = findPromo(plan.product, plan.section, plan.duration) || {};
    return {
      ...plan,
      promoActive: promo.promoActive || "NO",
      promoPrice: promo.promoPrice || "",
      badgePreset: promo.badgePreset || "Promo",
      badgeCustomText: promo.badgeCustomText || "",
      badgeColor: promo.badgeColor || "Gold",
      note: promo.note || ""
    };
  }).filter(item => {
    if (!query) return true;
    return norm(`${item.product} ${item.section} ${item.duration} ${item.price}`).includes(query);
  });

  if (!items.length) {
    els.promoGrid.innerHTML = `<div class="empty">Tiada plan dijumpai.</div>`;
    return;
  }

  els.promoGrid.innerHTML = items.map((item, i) => promoCard(item, i)).join("");

  els.promoGrid.querySelectorAll(".item").forEach((card, i) => {
    const item = items[i];

    const active = card.querySelector(".promo-active");
    const price = card.querySelector(".promo-price");
    const preset = card.querySelector(".badge-preset");
    const customWrap = card.querySelector(".custom-wrap");
    const custom = card.querySelector(".badge-custom");
    const color = card.querySelector(".badge-color");
    const note = card.querySelector(".promo-note");
    const badgePreview = card.querySelector(".badge-preview");
    const pricePreview = card.querySelector(".price-preview");

    const updatePreview = () => {
      const badgeText = preset.value === "Custom" ? (custom.value.trim() || "Promo") : preset.value;
      customWrap.classList.toggle("hidden", preset.value !== "Custom");
      badgePreview.textContent = badgeText;
      badgePreview.className = "badge badge-preview " + badgeClass(color.value);
      pricePreview.textContent = price.value.trim() || item.price;
    };

    [active, price, preset, custom, color, note].forEach(el => el.addEventListener("input", updatePreview));
    preset.addEventListener("change", updatePreview);
    color.addEventListener("change", updatePreview);

    card.querySelector(".promo-on").addEventListener("click", () => {
      active.value = "YES";
      if (!price.value.trim()) price.value = item.price;
      updatePreview();
    });

    card.querySelector(".promo-off").addEventListener("click", () => {
      active.value = "NO";
      updatePreview();
    });

    card.querySelector(".promo-clear").addEventListener("click", () => {
      active.value = "NO";
      price.value = "";
      preset.value = "Promo";
      custom.value = "";
      color.value = "Gold";
      note.value = "";
      updatePreview();
    });

    card.querySelector(".promo-save").addEventListener("click", () => savePromo(card, item));

    updatePreview();
  });
}

function promoCard(item, i) {
  const active = isPromoOn(item) ? "YES" : "NO";
  const badgeText = item.badgePreset === "Custom" ? (item.badgeCustomText || "Promo") : (item.badgePreset || "Promo");
  const section = item.section === "ALL" ? "Semua plan" : item.section;

  return `
    <article class="item" data-i="${i}">
      <div class="item-top">
        <div>
          <div class="title">${safe(item.product)} • ${safe(item.duration)}</div>
          <div class="subtitle">${safe(section)} • Harga asal ${safe(item.price)}</div>
        </div>
        <span class="pill ${active === "YES" ? "promo" : "off"}">${active === "YES" ? "PROMO ON" : "PROMO OFF"}</span>
      </div>

      <div class="form">
        <div class="preview">
          <span>Preview:</span>
          <span class="old">${safe(item.price)}</span>
          <span class="new price-preview">${safe(item.promoPrice || item.price)}</span>
          <span class="badge badge-preview ${badgeClass(item.badgeColor)}">${safe(badgeText)}</span>
        </div>

        <div class="row">
          <div>
            <label class="field-label">Promo Active</label>
            <select class="select promo-active">
              <option value="NO" ${active === "NO" ? "selected" : ""}>OFF</option>
              <option value="YES" ${active === "YES" ? "selected" : ""}>ON</option>
            </select>
          </div>
          <div>
            <label class="field-label">Promo Price</label>
            <input class="input promo-price" type="text" placeholder="Contoh: RM20" value="${safeAttr(item.promoPrice || "")}">
          </div>
        </div>

        <div class="row">
          <div>
            <label class="field-label">Badge Preset</label>
            <select class="select badge-preset">
              ${BADGE_PRESETS.map(x => `<option value="${safeAttr(x)}" ${x === item.badgePreset ? "selected" : ""}>${safe(x)}</option>`).join("")}
            </select>
          </div>
          <div>
            <label class="field-label">Badge Color</label>
            <select class="select badge-color">
              ${BADGE_COLORS.map(x => `<option value="${safeAttr(x)}" ${x === item.badgeColor ? "selected" : ""}>${safe(x)}</option>`).join("")}
            </select>
          </div>
        </div>

        <div class="custom-wrap ${item.badgePreset === "Custom" ? "" : "hidden"}">
          <label class="field-label">Custom Badge Text</label>
          <input class="input badge-custom" type="text" placeholder="Contoh: Promo Weekend" value="${safeAttr(item.badgeCustomText || "")}">
        </div>

        <div>
          <label class="field-label">Promo Note</label>
          <textarea class="textarea promo-note" placeholder="Contoh: Promo bulan ini sementara slot masih ada">${safe(item.note || "")}</textarea>
        </div>

        <div class="quick">
          <button class="btn green promo-on" type="button">Promo ON</button>
          <button class="btn soft promo-off" type="button">Promo OFF</button>
          <button class="btn red promo-clear" type="button">Clear</button>
        </div>

        <button class="btn gold promo-save" type="button">Save Promo</button>
      </div>
    </article>
  `;
}

async function savePromo(card, item) {
  const btn = card.querySelector(".promo-save");
  const promoActive = card.querySelector(".promo-active").value;
  const promoPrice = card.querySelector(".promo-price").value.trim();
  const badgePreset = card.querySelector(".badge-preset").value;
  const badgeCustomText = card.querySelector(".badge-custom").value.trim();
  const badgeColor = card.querySelector(".badge-color").value;
  const note = card.querySelector(".promo-note").value.trim();

  if (promoActive === "YES" && !promoPrice) {
    msg(els.globalMsg, "Isi Promo Price dulu kalau Promo Active = ON.", "error");
    return;
  }

  if (badgePreset === "Custom" && !badgeCustomText) {
    msg(els.globalMsg, "Isi Custom Badge Text dulu kalau pilih Custom.", "error");
    return;
  }

  setLoading(btn, true, "Saving...");

  try {
    const result = await jsonp({
      mode: "savePromo",
      password: adminPassword,
      product: item.product,
      section: item.section || "ALL",
      duration: item.duration,
      promoActive,
      promoPrice,
      badgePreset,
      badgeCustomText,
      badgeColor,
      note
    });

    if (!result.ok) throw new Error(result.error || "Gagal save promo.");

    msg(els.globalMsg, `Promo ${item.product} ${item.duration} berjaya disimpan.`, "success");
    await loadData();
  } catch (error) {
    msg(els.globalMsg, "Gagal save promo: " + error.message, "error");
  } finally {
    setLoading(btn, false, "Save Promo");
  }
}

function jsonp(params) {
  return new Promise((resolve, reject) => {
    const callbackName = "numoCb_" + Date.now() + "_" + Math.floor(Math.random() * 100000);
    const query = new URLSearchParams({
      ...params,
      callback: callbackName
    });

    const script = document.createElement("script");
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error("Request timeout. Check Apps Script deployment."));
    }, 20000);

    window[callbackName] = result => {
      cleanup();
      resolve(result);
    };

    function cleanup() {
      clearTimeout(timer);
      delete window[callbackName];
      if (script.parentNode) script.parentNode.removeChild(script);
    }

    script.onerror = () => {
      cleanup();
      reject(new Error("Network/API error. Check Web App URL."));
    };

    script.src = API_URL + "?" + query.toString();
    document.body.appendChild(script);
  });
}

function switchTab(tab) {
  document.querySelectorAll(".tab").forEach(btn => btn.classList.toggle("active", btn.dataset.tab === tab));
  document.querySelectorAll(".section").forEach(section => section.classList.toggle("active", section.id === tab));
}

function flattenPlans() {
  const list = [];
  BASE_PRODUCTS.forEach(product => {
    product.plans.forEach(plan => {
      list.push({
        product: product.name,
        section: product.section,
        duration: plan.duration,
        price: plan.price
      });
    });
  });
  return list;
}

function findPromo(product, section, duration) {
  return data.promos.find(item =>
    norm(item.product) === norm(product) &&
    norm(item.section || "ALL") === norm(section || "ALL") &&
    norm(item.duration) === norm(duration)
  );
}

function isPromoOn(item) {
  return norm(item.promoActive) === "YES" || norm(item.promoActive) === "ON";
}

function badgeClass(color) {
  const c = norm(color);
  if (c === "GREEN") return "badge-green";
  if (c === "RED") return "badge-red";
  if (c === "BLUE") return "badge-blue";
  if (c === "PURPLE" || c === "PINK") return "badge-purple";
  if (c === "DARK" || c === "BLACK") return "badge-dark";
  return "badge-gold";
}

function setLoading(btn, loading, text) {
  if (!btn) return;
  if (loading) {
    btn.dataset.oldText = btn.textContent;
    btn.textContent = text || "Loading...";
    btn.disabled = true;
  } else {
    btn.textContent = btn.dataset.oldText || btn.textContent;
    btn.disabled = false;
  }
}

function msg(el, message, type = "info") {
  if (!el) return;
  el.textContent = message;
  el.className = "message show " + type;
  if (type === "success") {
    clearTimeout(el._timer);
    el._timer = setTimeout(() => el.classList.remove("show"), 4500);
  }
}

function norm(v = "") {
  return String(v || "").trim().toUpperCase();
}

function safe(v = "") {
  return String(v ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function safeAttr(v = "") {
  return safe(v);
}
