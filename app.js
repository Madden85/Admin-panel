/***********************
 * NUMO ADMIN PANEL - APP.JS
 * FUNCTION / LOGIC SAHAJA
 *
 * index.html  = mainpage/layout admin
 * index2.html = edit ayat besar
 * app2.js     = edit text button/label
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

let uiText = {
  refresh: "Refresh",
  logout: "Logout",
  login: "Login",
  checking: "Checking...",
  loading: "Loading...",
  saving: "Saving...",
  passwordLabel: "Admin Password",
  passwordPlaceholder: "Masukkan password admin",
  tabDashboard: "Dashboard",
  tabStock: "Stock",
  tabPromo: "Promo",
  tabHotSelling: "Hot Selling",
  tabReseller: "Reseller",
  tabLead: "Lead",
  stockOnLabel: "Stock ON",
  stockOffLabel: "Stock OFF",
  promoOnLabel: "Promo Aktif",
  editLabel: "Edit",
  noStockOff: "Tiada produk/device yang OFF.",
  noPromoActive: "Tiada promo aktif.",
  textWhenOff: "Text bila OFF",
  statusLabel: "Status",
  onLabel: "ON",
  offLabel: "OFF",
  save: "Save",
  setupNeeded: "SETUP NEEDED",
  stockOffTextDefault: "Habis Stok",
  promoSearchPlaceholder: "Cari produk atau plan",
  filterAll: "Semua plan",
  filterOn: "Promo ON sahaja",
  filterOff: "Promo OFF sahaja",
  promoActive: "Promo Active",
  promoPrice: "Promo Price",
  badgePreset: "Badge Preset",
  badgeColor: "Badge Color",
  customBadgeText: "Custom Badge Text",
  promoNote: "Promo Note",
  promoOnButton: "Promo ON",
  promoOffButton: "Promo OFF",
  clearButton: "Clear",
  savePromo: "Save Promo",
  preview: "Preview:",
  normalPrice: "Harga asal",
  promoOnStatus: "PROMO ON",
  promoOffStatus: "PROMO OFF",
  noPlanFound: "Tiada plan dijumpai.",
  enterPassword: "Masukkan password dulu.",
  loginSuccess: "Login berjaya. Loading data...",
  loginFailed: "Login gagal: ",
  logoutSuccess: "Logout berjaya.",
  loadData: "Loading data dari Google Sheet...",
  syncSuccess: "Data berjaya sync.",
  loadFailed: "Gagal load data: ",
  saveStockSuccess: "Stock berjaya disimpan.",
  saveStockFailed: "Gagal save stock: ",
  savePromoSuccess: "Promo berjaya disimpan.",
  savePromoFailed: "Gagal save promo: ",
  promoPriceRequired: "Isi Promo Price dulu kalau Promo Active = ON.",
  customBadgeRequired: "Isi Custom Badge Text dulu kalau pilih Custom.",
  hotSellingVisibleLabel: "Hot Selling Visible",
  resellerActiveLabel: "Reseller Aktif",
  totalLeadLabel: "Total Lead",
  noHotSelling: "Tiada item Hot Selling dijumpai.",
  hotSellingStatus: "Status Hot Selling",
  positionLabel: "Position",
  hotBadgeLabel: "Badge Hot Selling",
  hiddenLabel: "Disorok",
  visibleLabel: "VISIBLE",
  saveHotSelling: "Save Hot Selling",
  saveHotSellingSuccess: "Hot Selling berjaya disimpan.",
  saveHotSellingFailed: "Gagal save Hot Selling: ",
  resellerSearchPlaceholder: "Cari nama atau Telegram reseller",
  noReseller: "Tiada reseller dijumpai.",
  telegramUsernameLabel: "Telegram Username",
  resellerNameLabel: "Nama Reseller",
  leadCountLabel: "Lead Count",
  lastAssignedLabel: "Last Assigned",
  saveReseller: "Save Reseller",
  saveResellerSuccess: "Reseller berjaya disimpan.",
  saveResellerFailed: "Gagal save reseller: ",
  leadTotalLabel: "Jumlah Lead",
  leadAssignedLabel: "Assigned",
  leadReassignedLabel: "Reassigned",
  leadDistributionTitle: "Agihan Lead Mengikut Reseller",
  noLead: "Belum ada lead direkodkan.",
  hotSellingRuleText: "Harga Hot Selling ikut Promo Control. Item hanya keluar di website apabila promo aktif dan ada harga promo.",
  hotSellingLimitTitle: "Hot Selling Aktif",
  hotSellingMaxText: "Maximum 3 pakej sahaja boleh diaktifkan pada satu masa.",
  hotSellingSearchPlaceholder: "Cari produk atau pakej",
  hotFilterAll: "Semua pakej",
  hotFilterOn: "Hot Selling ON",
  hotFilterPromo: "Promo Aktif",
  hotFilterVisible: "Visible di Website",
  hotLimitError: "Maximum 3 Hot Selling sahaja dibenarkan. Tutup salah satu Hot Selling yang sedang aktif dahulu.",
  promoNotReady: "Promo belum aktif / tiada harga promo"
};

let editableContent = {
  brandName: "NUMO Admin Panel",
  brandSubtitle: "Clean Stock & Promo Control",
  heroBadge: "ADMIN CONTROL",
  heroTitle: "Kawal stock dan promo dengan lebih mudah.",
  heroText: "Layout simple untuk edit stock, promo price, promo badge dan Sooka device.",
  dashboardTitle: "Dashboard",
  dashboardText: "Ringkasan status website customer daripada Google Sheet.",
  stockOffDetailTitle: "Produk / Device Stock OFF",
  stockOffDetailText: "Tekan untuk lihat item yang habis stok",
  promoActiveDetailTitle: "Plan Promo Aktif",
  promoActiveDetailText: "Tekan untuk lihat promo yang sedang ON",
  stockTitle: "Stock Control",
  stockText: "Set ON/OFF untuk produk, YouTube type dan Sooka device.",
  promoTitle: "Promo Control",
  promoText: "Buka produk yang nak edit sahaja supaya panel kekal kemas.",
  hotSellingTitle: "Hot Selling Control",
  hotSellingText: "Pilih highlight untuk website. Harga akan ikut promo yang aktif dalam Promo Control.",
  resellerTitle: "Reseller Control",
  resellerText: "ON/OFF reseller dan semak jumlah lead yang telah diterima.",
  leadTitle: "Lead Summary",
  leadText: "Ringkasan agihan lead customer kepada reseller."
};

const PRODUCT_GROUPS = [
  {
    product: "NETFLIX PREMIUM",
    section: "ALL",
    label: "Netflix Premium",
    icon: "🎬",
    plans: [
      { duration: "1 Bulan", price: "RM25" },
      { duration: "2 Bulan", price: "RM50" },
      { duration: "3 Bulan Promo", label: "3 Bulan", price: "RM75" },
      { duration: "6 Bulan", price: "RM150" },
      { duration: "12 Bulan", price: "RM300" }
    ]
  },
  {
    product: "YOUTUBE PREMIUM",
    section: "Email Sendiri",
    label: "YouTube Premium - Email Sendiri",
    icon: "▶️",
    plans: [
      { duration: "1 Bulan", price: "RM16" },
      { duration: "3 Bulan", price: "RM45" },
      { duration: "6 Bulan", price: "RM85" },
      { duration: "12 Bulan", price: "RM144" }
    ]
  },
  {
    product: "YOUTUBE PREMIUM",
    section: "Email Seller",
    label: "YouTube Premium - Email Seller",
    icon: "▶️",
    plans: [
      { duration: "1 Bulan", price: "RM10" },
      { duration: "3 Bulan", price: "RM27" },
      { duration: "6 Bulan", price: "RM48" },
      { duration: "12 Bulan", price: "RM84" }
    ]
  },
  {
    product: "DISNEY+ HOTSTAR",
    section: "ALL",
    label: "Disney+ Hotstar",
    icon: "🏰",
    plans: [
      { duration: "1 Bulan", price: "RM25" },
      { duration: "2 Bulan", price: "RM45" },
      { duration: "Promo 3 Bulan", label: "3 Bulan", price: "RM60" },
      { duration: "6 Bulan", price: "RM120" },
      { duration: "12 Bulan", price: "RM230" }
    ]
  },
  {
    product: "SOOKA PREMIUM",
    section: "ALL",
    label: "Sooka Premium",
    icon: "📡",
    plans: [
      { duration: "1 Bulan", price: "RM25" },
      { duration: "2 Bulan", price: "RM46" },
      { duration: "6 Bulan", price: "RM120" },
      { duration: "12 Bulan", price: "RM216" }
    ]
  },
  {
    product: "VIU PREMIUM",
    section: "ALL",
    label: "Viu Premium",
    icon: "📱",
    plans: [
      { duration: "1 Bulan", price: "RM15" },
      { duration: "2 Bulan", price: "RM26" },
      { duration: "6 Bulan", price: "RM66" },
      { duration: "12 Bulan", price: "RM120" }
    ]
  },
  {
    product: "iQIYI PREMIUM",
    section: "ALL",
    label: "iQiyi Premium",
    icon: "🎥",
    plans: [
      { duration: "1 Bulan", price: "RM15" },
      { duration: "2 Bulan", price: "RM26" },
      { duration: "Promo 3 Bulan", label: "3 Bulan", price: "RM33" },
      { duration: "6 Bulan", price: "RM66" },
      { duration: "12 Bulan", price: "RM120" }
    ]
  },
  {
    product: "SPOTIFY PREMIUM",
    section: "ALL",
    label: "Spotify Premium",
    icon: "🎧",
    plans: [
      { duration: "1 Bulan", price: "RM15" },
      { duration: "2 Bulan", price: "RM28" },
      { duration: "Promo 2 Bulan", label: "2 Bulan Promo", price: "RM25" },
      { duration: "6 Bulan", price: "RM72" },
      { duration: "12 Bulan", price: "RM120" }
    ]
  }
];

const STOCK_GROUPS = [
  {
    title: "Produk Biasa",
    subtitle: "Satu toggle untuk semua plan produk tersebut",
    rows: [
      { product: "NETFLIX PREMIUM", section: "ALL", label: "Netflix Premium", note: "Semua plan Netflix" },
      { product: "DISNEY+ HOTSTAR", section: "ALL", label: "Disney+ Hotstar", note: "Semua plan Disney" },
      { product: "VIU PREMIUM", section: "ALL", label: "Viu Premium", note: "Semua plan Viu" },
      { product: "iQIYI PREMIUM", section: "ALL", label: "iQiyi Premium", note: "Semua plan iQiyi" },
      { product: "SPOTIFY PREMIUM", section: "ALL", label: "Spotify Premium", note: "Semua plan Spotify" }
    ]
  },
  {
    title: "YouTube Premium",
    subtitle: "Control asing untuk Own Email dan Seller Email",
    rows: [
      { product: "YOUTUBE PREMIUM", section: "Email Sendiri", label: "Email Sendiri", note: "YouTube Own Email" },
      { product: "YOUTUBE PREMIUM", section: "Email Seller", label: "Email Seller", note: "YouTube Seller Email" }
    ]
  },
  {
    title: "Sooka Device",
    subtitle: "Pilih device mana yang available",
    full: true,
    rows: [
      { product: "SOOKA PREMIUM", section: "TV", label: "TV", note: "Sooka untuk TV" },
      { product: "SOOKA PREMIUM", section: "PHONE", label: "Phone", note: "Sooka untuk phone" },
      { product: "SOOKA PREMIUM", section: "TABLET", label: "Tablet", note: "Sooka untuk tablet" }
    ]
  }
];


const STOCK_DISPLAY_GROUPS = [
  {
    id: "netflix",
    title: "Netflix Premium",
    icon: "🎬",
    rows: [
      { product: "NETFLIX PREMIUM", section: "ALL", label: "Netflix Premium", note: "Semua plan Netflix" }
    ]
  },
  {
    id: "youtube-own",
    title: "YouTube Premium - Email Sendiri",
    icon: "▶️",
    rows: [
      { product: "YOUTUBE PREMIUM", section: "Email Sendiri", label: "Email Sendiri", note: "YouTube Own Email" }
    ]
  },
  {
    id: "youtube-seller",
    title: "YouTube Premium - Email Seller",
    icon: "▶️",
    rows: [
      { product: "YOUTUBE PREMIUM", section: "Email Seller", label: "Email Seller", note: "YouTube Seller Email" }
    ]
  },
  {
    id: "disney",
    title: "Disney+ Hotstar",
    icon: "🏰",
    rows: [
      { product: "DISNEY+ HOTSTAR", section: "ALL", label: "Disney+ Hotstar", note: "Semua plan Disney" }
    ]
  },
  {
    id: "sooka",
    title: "Sooka Premium",
    icon: "📡",
    rows: [
      { product: "SOOKA PREMIUM", section: "TV", label: "TV", note: "Sooka untuk TV" },
      { product: "SOOKA PREMIUM", section: "PHONE", label: "Phone", note: "Sooka untuk phone" },
      { product: "SOOKA PREMIUM", section: "TABLET", label: "Tablet", note: "Sooka untuk tablet" }
    ]
  },
  {
    id: "viu",
    title: "Viu Premium",
    icon: "📱",
    rows: [
      { product: "VIU PREMIUM", section: "ALL", label: "Viu Premium", note: "Semua plan Viu" }
    ]
  },
  {
    id: "iqiyi",
    title: "iQiyi Premium",
    icon: "🎥",
    rows: [
      { product: "iQIYI PREMIUM", section: "ALL", label: "iQiyi Premium", note: "Semua plan iQiyi" }
    ]
  },
  {
    id: "spotify",
    title: "Spotify Premium",
    icon: "🎧",
    rows: [
      { product: "SPOTIFY PREMIUM", section: "ALL", label: "Spotify Premium", note: "Semua plan Spotify" }
    ]
  }
];

let data = {
  stock: [],
  promos: [],
  visibleHotSelling: [],
  hotSellingControl: [],
  hotSellingOptions: [],
  resellers: [],
  leadSummary: {},
  meta: {}
};
let adminPassword = sessionStorage.getItem("numoAdminPasswordPanelV40") || "";
let loggedIn = Boolean(adminPassword);

const els = {};

document.addEventListener("DOMContentLoaded", async () => {
  cacheElements();

  await loadButtonText();
  await loadEditableText();

  applyButtonText();
  applyEditableText();
  bindEvents();

  if (adminPassword) {
    els.passwordInput.value = adminPassword;
    showPanel();
    loadData();
  }
});

function cacheElements() {
  [
    "refreshBtn","logoutBtn","loginCard","panel","passwordInput","loginBtn","loginMsg","globalMsg",
    "stockOnCount","stockOffCount","promoOnCount","stockOffDetailCount","promoActiveDetailCount",
    "stockOffList","promoActiveList","stockGrid","promoSearch","promoFilter","promoGroups",
    "hotSellingVisibleCount","resellerActiveCount","totalLeadCount","hotSellingList",
    "hotSellingSearch","hotSellingFilter","hotSellingActiveCount","hotSellingMaxCount","hotSellingLimitTitle","hotSellingMaxText",
    "resellerSearch","resellerList","leadTotalCount","leadAssignedCount","leadReassignedCount","leadByReseller"
  ].forEach(id => els[id] = document.getElementById(id));
}

async function loadButtonText() {
  await new Promise(resolve => {
    const script = document.createElement("script");
    script.src = `app2.js?_=${Date.now()}`;

    script.onload = () => {
      if (window.NUMO_ADMIN_TEXT && typeof window.NUMO_ADMIN_TEXT === "object") {
        uiText = { ...uiText, ...window.NUMO_ADMIN_TEXT };
      }
      resolve();
    };

    script.onerror = () => resolve();

    document.head.appendChild(script);
  });
}

async function loadEditableText() {
  try {
    const response = await fetch(`index2.html?_=${Date.now()}`);
    if (!response.ok) throw new Error("index2.html not found");

    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const root = doc.querySelector("#editable-content");
    if (!root) throw new Error("editable-content not found");

    root.querySelectorAll("[data-key]").forEach(item => {
      editableContent[item.dataset.key] = item.textContent.trim();
    });
  } catch (error) {
    console.warn("Using default index2 text:", error.message);
  }
}

function applyButtonText() {
  setText("refreshBtn", uiText.refresh);
  setText("logoutBtn", uiText.logout);
  setText("loginBtn", uiText.login);
  setText("passwordLabel", uiText.passwordLabel);
  setText("tabDashboard", uiText.tabDashboard);
  setText("tabStock", uiText.tabStock);
  setText("tabPromo", uiText.tabPromo);
  setText("tabHotSelling", uiText.tabHotSelling);
  setText("tabReseller", uiText.tabReseller);
  setText("tabLead", uiText.tabLead);
  setText("stockOnLabel", uiText.stockOnLabel);
  setText("stockOffLabel", uiText.stockOffLabel);
  setText("promoOnLabel", uiText.promoOnLabel);
  setText("hotSellingVisibleLabel", uiText.hotSellingVisibleLabel);
  setText("resellerActiveLabel", uiText.resellerActiveLabel);
  setText("totalLeadLabel", uiText.totalLeadLabel);
  setText("hotSellingRuleText", uiText.hotSellingRuleText);
  setText("hotSellingLimitTitle", uiText.hotSellingLimitTitle);
  setText("hotSellingMaxText", uiText.hotSellingMaxText);
  setText("leadTotalLabel", uiText.leadTotalLabel);
  setText("leadAssignedLabel", uiText.leadAssignedLabel);
  setText("leadReassignedLabel", uiText.leadReassignedLabel);
  setText("leadDistributionTitle", uiText.leadDistributionTitle);

  if (els.passwordInput) els.passwordInput.placeholder = uiText.passwordPlaceholder;
  if (els.promoSearch) els.promoSearch.placeholder = uiText.promoSearchPlaceholder;
  if (els.resellerSearch) els.resellerSearch.placeholder = uiText.resellerSearchPlaceholder;
  if (els.hotSellingSearch) els.hotSellingSearch.placeholder = uiText.hotSellingSearchPlaceholder;

  if (els.hotSellingFilter) {
    els.hotSellingFilter.innerHTML = `
      <option value="ALL">${safeText(uiText.hotFilterAll)}</option>
      <option value="ON">${safeText(uiText.hotFilterOn)}</option>
      <option value="PROMO">${safeText(uiText.hotFilterPromo)}</option>
      <option value="VISIBLE">${safeText(uiText.hotFilterVisible)}</option>
    `;
  }

  if (els.promoFilter) {
    els.promoFilter.innerHTML = `
      <option value="ALL">${safeText(uiText.filterAll)}</option>
      <option value="ON">${safeText(uiText.filterOn)}</option>
      <option value="OFF">${safeText(uiText.filterOff)}</option>
    `;
  }
}

function applyEditableText() {
  Object.keys(editableContent).forEach(key => setText(key, editableContent[key]));
}

function bindEvents() {
  els.loginBtn.addEventListener("click", login);

  els.passwordInput.addEventListener("keydown", event => {
    if (event.key === "Enter") login();
  });

  els.logoutBtn.addEventListener("click", logout);

  els.refreshBtn.addEventListener("click", () => {
    if (!loggedIn) {
      showMessage(els.loginMsg, uiText.enterPassword, "info");
      return;
    }
    loadData();
  });

  document.querySelectorAll(".tab").forEach(button => {
    button.addEventListener("click", () => switchTab(button.dataset.tab));
  });

  document.querySelectorAll(".detail-trigger").forEach(button => {
    button.addEventListener("click", () => {
      const card = document.getElementById(button.dataset.detail);
      if (card) card.classList.toggle("open");
    });
  });

  els.promoSearch.addEventListener("input", renderPromos);
  els.promoFilter.addEventListener("change", renderPromos);
  els.resellerSearch?.addEventListener("input", renderResellers);
  els.hotSellingSearch?.addEventListener("input", renderHotSelling);
  els.hotSellingFilter?.addEventListener("change", renderHotSelling);
}

async function login() {
  const password = els.passwordInput.value.trim();

  if (!password) {
    showMessage(els.loginMsg, uiText.enterPassword, "error");
    return;
  }

  setLoading(els.loginBtn, true, uiText.checking);

  try {
    const result = await jsonp({
      mode: "verifyAdmin",
      password
    });

    if (!result.ok) throw new Error(result.error || "Password salah atau API error.");

    adminPassword = password;
    loggedIn = true;
    sessionStorage.setItem("numoAdminPasswordPanelV40", password);

    showPanel();
    showMessage(els.globalMsg, uiText.loginSuccess, "success");

    await loadData();
  } catch (error) {
    showMessage(els.loginMsg, uiText.loginFailed + error.message, "error");
  } finally {
    setLoading(els.loginBtn, false, uiText.login);
  }
}

function logout() {
  adminPassword = "";
  loggedIn = false;
  sessionStorage.removeItem("numoAdminPasswordPanelV40");

  els.panel.classList.remove("active");
  els.loginCard.style.display = "block";
  els.logoutBtn.classList.add("hidden");
  els.passwordInput.value = "";

  showMessage(els.loginMsg, uiText.logoutSuccess, "info");
}

function showPanel() {
  els.loginCard.style.display = "none";
  els.panel.classList.add("active");
  els.logoutBtn.classList.remove("hidden");
}

async function loadData() {
  showMessage(els.globalMsg, uiText.loadData, "info");
  setLoading(els.refreshBtn, true, uiText.loading);

  try {
    const result = await jsonp({
      mode: "getAdminControl",
      password: adminPassword,
      _: Date.now()
    });

    if (!result.ok) throw new Error(result.error || "Gagal baca data.");

    data = result.data || {
      stock: [], promos: [], visibleHotSelling: [], hotSellingControl: [], hotSellingOptions: [],
      resellers: [], leadSummary: {}, meta: {}
    };

    renderDashboard();
    renderStock();
    renderPromos();
    renderHotSelling();
    renderResellers();
    renderLead();

    showMessage(els.globalMsg, uiText.syncSuccess, "success");
  } catch (error) {
    showMessage(els.globalMsg, uiText.loadFailed + error.message, "error");
  } finally {
    setLoading(els.refreshBtn, false, uiText.refresh);
  }
}

function renderDashboard() {
  const stockOffItems = getStockOffItems();
  const promoItems = getActivePromoItems();

  els.stockOnCount.textContent = data.stock.filter(item => normalize(item.status) === "ON").length;
  els.stockOffCount.textContent = stockOffItems.length;
  els.promoOnCount.textContent = promoItems.length;
  els.stockOffDetailCount.textContent = stockOffItems.length;
  els.promoActiveDetailCount.textContent = promoItems.length;
  if (els.hotSellingVisibleCount) els.hotSellingVisibleCount.textContent = (data.visibleHotSelling || []).length;
  if (els.resellerActiveCount) els.resellerActiveCount.textContent =
    (data.resellers || []).filter(item => normalize(item.status) === "ON").length;
  if (els.totalLeadCount) els.totalLeadCount.textContent = data.leadSummary?.totalLeads || 0;

  renderStockOffList(stockOffItems);
  renderPromoActiveList(promoItems);
}

function getStockOffItems() {
  const items = [];

  STOCK_GROUPS.forEach(group => {
    group.rows.forEach(row => {
      const stock = findStock(row.product, row.section);

      if (stock && normalize(stock.status) === "OFF") {
        items.push({ ...row, groupTitle: group.title, stockText: stock.stockText || uiText.stockOffTextDefault });
      }
    });
  });

  return items;
}

function getActivePromoItems() {
  const items = [];

  PRODUCT_GROUPS.forEach(group => {
    group.plans.forEach(plan => {
      const promo = findPromo(group.product, group.section, plan.duration);

      if (promo && isPromoOn(promo)) {
        items.push({ ...group, ...plan, promo });
      }
    });
  });

  return items;
}

function renderStockOffList(items) {
  if (!items.length) {
    els.stockOffList.innerHTML = `<div class="empty">${safeText(uiText.noStockOff)}</div>`;
    return;
  }

  els.stockOffList.innerHTML = items.map(item => `
    <button class="jump-item" type="button" data-product="${safeAttr(item.product)}" data-section="${safeAttr(item.section)}">
      <div>
        <strong>${safeText(item.label)}</strong>
        <span>${safeText(item.groupTitle)} • ${safeText(item.section)} • ${safeText(item.stockText)}</span>
      </div>
      <strong>${safeText(uiText.editLabel)} ›</strong>
    </button>
  `).join("");

  els.stockOffList.querySelectorAll(".jump-item").forEach(button => {
    button.addEventListener("click", () => jumpToStock(button.dataset.product, button.dataset.section));
  });
}

function renderPromoActiveList(items) {
  if (!items.length) {
    els.promoActiveList.innerHTML = `<div class="empty">${safeText(uiText.noPromoActive)}</div>`;
    return;
  }

  els.promoActiveList.innerHTML = items.map(item => {
    const badgeText = getBadgeText(item.promo);
    const displayName = item.label ? `${item.label} • ${item.label || item.duration}` : item.duration;

    return `
      <button class="jump-item" type="button"
        data-product="${safeAttr(item.product)}"
        data-section="${safeAttr(item.section)}"
        data-duration="${safeAttr(item.duration)}">
        <div>
          <strong>${safeText(item.product)} • ${safeText(item.label || item.duration)}</strong>
          <span>${safeText(item.price)} → ${safeText(item.promo.promoPrice || "-")} • ${safeText(badgeText)}</span>
        </div>
        <strong>${safeText(uiText.editLabel)} ›</strong>
      </button>
    `;
  }).join("");

  els.promoActiveList.querySelectorAll(".jump-item").forEach(button => {
    button.addEventListener("click", () => jumpToPromo(button.dataset.product, button.dataset.section, button.dataset.duration));
  });
}

function renderStock() {
  els.stockGrid.innerHTML = STOCK_DISPLAY_GROUPS.map(group => renderStockGroup(group)).join("");

  els.stockGrid.querySelectorAll(".stock-edit-row").forEach(row => {
    const onBtn = row.querySelector(".toggle-on");
    const offBtn = row.querySelector(".toggle-off");
    const saveBtn = row.querySelector(".stock-save");
    const stockText = row.querySelector(".stock-text");

    const setStatus = status => {
      row.dataset.status = status;
      updateStockVisual(row);
      updateStockGroupSummary(row.closest(".stock-product-card"));
    };

    onBtn?.addEventListener("click", () => setStatus("ON"));
    offBtn?.addEventListener("click", () => setStatus("OFF"));

    saveBtn?.addEventListener("click", () => saveStock(row, stockText.value.trim() || uiText.stockOffTextDefault));

    updateStockVisual(row);
  });

  els.stockGrid.querySelectorAll(".stock-product-card").forEach(card => updateStockGroupSummary(card));
}

function renderStockGroup(group) {
  return `
    <details id="stock-group-${safeAttr(group.id)}" class="stock-product-card">
      <summary>
        <span class="stock-product-title">
          <strong>${safeText(group.icon + " " + group.title)}</strong>
          <span class="stock-group-subtitle" data-group-subtitle></span>
        </span>
        <span class="stock-arrow">›</span>
      </summary>

      <div class="stock-product-body">
        ${group.rows.map(row => renderStockRow(row)).join("")}
      </div>
    </details>
  `;
}

function renderStockRow(row) {
  const stock = findStock(row.product, row.section);
  const exists = Boolean(stock);
  const status = exists ? (normalize(stock.status) === "OFF" ? "OFF" : "ON") : "MISSING";
  const stockText = exists ? (stock.stockText || uiText.stockOffTextDefault) : uiText.stockOffTextDefault;

  return `
    <div id="${stockDomId(row.product, row.section)}"
      class="stock-edit-row"
      data-product="${safeAttr(row.product)}"
      data-section="${safeAttr(row.section)}"
      data-status="${safeAttr(status)}">

      <div class="stock-edit-head">
        <div>
          <div class="stock-edit-name">${safeText(row.label)}</div>
          <div class="stock-edit-sub">${safeText(row.note)} • Section: ${safeText(row.section)}</div>
        </div>
        <span class="status-pill"></span>
      </div>

      <div class="stock-controls">
        <div>
          <label class="field-label">${safeText(uiText.textWhenOff)}</label>
          <input class="input stock-text" type="text" value="${safeAttr(stockText)}" ${exists ? "" : "disabled"}>
        </div>

        <div>
          <label class="field-label">${safeText(uiText.statusLabel)}</label>
          <div class="toggle-pair">
            <button class="toggle-btn toggle-on" type="button" ${exists ? "" : "disabled"}>${safeText(uiText.onLabel)}</button>
            <button class="toggle-btn toggle-off" type="button" ${exists ? "" : "disabled"}>${safeText(uiText.offLabel)}</button>
          </div>
        </div>

        <button class="btn stock-save" type="button" ${exists ? "" : "disabled"}>${safeText(uiText.save)}</button>
      </div>
    </div>
  `;
}

function updateStockVisual(row) {
  const status = row.dataset.status;
  const pill = row.querySelector(".status-pill");
  const onBtn = row.querySelector(".toggle-on");
  const offBtn = row.querySelector(".toggle-off");

  onBtn?.classList.toggle("active-on", status === "ON");
  offBtn?.classList.toggle("active-off", status === "OFF");

  if (!pill) return;

  if (status === "MISSING") {
    pill.className = "status-pill gray";
    pill.textContent = uiText.setupNeeded;
    return;
  }

  pill.className = "status-pill " + (status === "OFF" ? "off" : "");
  pill.textContent = status === "OFF" ? uiText.offLabel : uiText.onLabel;
}

function updateStockGroupSummary(card) {
  if (!card) return;

  const rows = [...card.querySelectorAll(".stock-edit-row")];
  const subtitle = card.querySelector("[data-group-subtitle]");

  const total = rows.length;
  const onCount = rows.filter(row => row.dataset.status === "ON").length;
  const offCount = rows.filter(row => row.dataset.status === "OFF").length;
  const missingCount = rows.filter(row => row.dataset.status === "MISSING").length;

  let text = "";

  if (total === 1) {
    if (missingCount) {
      text = uiText.setupNeeded;
    } else {
      text = onCount ? uiText.onLabel : uiText.offLabel;
    }
  } else {
    text = `${total} control • ${onCount} ${uiText.onLabel}`;

    if (offCount) text += ` • ${offCount} ${uiText.offLabel}`;
    if (missingCount) text += ` • ${missingCount} ${uiText.setupNeeded}`;
  }

  if (subtitle) subtitle.textContent = text;
}

async function saveStock(row, stockText) {
  const button = row.querySelector(".stock-save");
  setLoading(button, true, uiText.saving);

  try {
    const result = await jsonp({
      mode: "saveStock",
      password: adminPassword,
      product: row.dataset.product,
      section: row.dataset.section,
      status: row.dataset.status,
      stockText
    });

    if (!result.ok) throw new Error(result.error || "Gagal save stock.");

    showMessage(els.globalMsg, uiText.saveStockSuccess, "success");
    await loadData();
  } catch (error) {
    showMessage(els.globalMsg, uiText.saveStockFailed + error.message, "error");
  } finally {
    setLoading(button, false, uiText.save);
  }
}

function renderPromos() {
  const query = normalize(els.promoSearch.value);
  const filter = els.promoFilter.value;

  const groups = PRODUCT_GROUPS.map(group => {
    const plans = group.plans.map(plan => {
      const promo = findPromo(group.product, group.section, plan.duration) || {};

      return {
        ...group,
        ...plan,
        promoActive: promo.promoActive || "NO",
        promoPrice: promo.promoPrice || "",
        badgePreset: promo.badgePreset || "Promo",
        badgeCustomText: promo.badgeCustomText || "",
        badgeColor: promo.badgeColor || "Gold",
        note: promo.note || ""
      };
    }).filter(item => {
      const haystack = normalize(`${item.product} ${item.section} ${item.label || item.duration} ${item.price} ${item.promoPrice}`);

      if (query && !haystack.includes(query)) return false;
      if (filter === "ON" && !isPromoOn(item)) return false;
      if (filter === "OFF" && isPromoOn(item)) return false;
      return true;
    });

    return { ...group, plans };
  }).filter(group => group.plans.length);

  if (!groups.length) {
    els.promoGroups.innerHTML = `<div class="empty">${safeText(uiText.noPlanFound)}</div>`;
    return;
  }

  els.promoGroups.innerHTML = groups.map((group, index) => {
    const activeCount = group.plans.filter(isPromoOn).length;

    return `
      <details id="${promoGroupDomId(group.product, group.section)}" class="promo-group" ${index === 0 ? "open" : ""}>
        <summary>
          <div>
            <strong>${safeText(group.icon + " " + group.label)}</strong>
            <span>${group.plans.length} plan • ${activeCount} promo ON</span>
          </div>
          <strong>›</strong>
        </summary>

        <div class="promo-list">
          ${group.plans.map(plan => renderPromoCard(plan)).join("")}
        </div>
      </details>
    `;
  }).join("");

  bindPromoCards();
}

function renderPromoCard(item) {
  const active = isPromoOn(item) ? "YES" : "NO";
  const displayDuration = item.label || item.duration;
  const badgeText = item.badgePreset === "Custom" ? (item.badgeCustomText || "Promo") : item.badgePreset;
  const previewPrice = item.promoPrice || item.price;

  return `
    <article id="${promoDomId(item.product, item.section, item.duration)}"
      class="promo-card"
      data-product="${safeAttr(item.product)}"
      data-section="${safeAttr(item.section)}"
      data-duration="${safeAttr(item.duration)}"
      data-group-label="${safeAttr(item.label)}"
      data-price="${safeAttr(item.price)}">

      <div class="promo-card-top">
        <div>
          <div class="promo-title">${safeText(displayDuration)}</div>
          <div class="promo-sub">${safeText(item.section === "ALL" ? uiText.normalPrice : item.section)} • ${safeText(uiText.normalPrice)} ${safeText(item.price)}</div>
        </div>
        <span class="status-pill ${active === "YES" ? "" : "gray"}">${safeText(active === "YES" ? uiText.promoOnStatus : uiText.promoOffStatus)}</span>
      </div>

      <div class="promo-body">
        <div class="preview">
          <span>${safeText(uiText.preview)}</span>
          <span class="preview-old">${safeText(item.price)}</span>
          <span class="preview-price">${safeText(previewPrice)}</span>
          <span class="badge-preview ${badgeClass(item.badgeColor)}">${safeText(badgeText)}</span>
        </div>

        <div class="form-grid">
          <div>
            <label class="field-label">${safeText(uiText.promoActive)}</label>
            <select class="select promo-active">
              <option value="NO" ${active === "NO" ? "selected" : ""}>OFF</option>
              <option value="YES" ${active === "YES" ? "selected" : ""}>ON</option>
            </select>
          </div>

          <div>
            <label class="field-label">${safeText(uiText.promoPrice)}</label>
            <input class="input promo-price" type="text" value="${safeAttr(item.promoPrice)}" placeholder="Contoh: RM20">
          </div>
        </div>

        <div class="form-grid">
          <div>
            <label class="field-label">${safeText(uiText.badgePreset)}</label>
            <select class="select badge-preset">
              ${BADGE_PRESETS.map(option => `<option value="${safeAttr(option)}" ${option === item.badgePreset ? "selected" : ""}>${safeText(option)}</option>`).join("")}
            </select>
          </div>

          <div>
            <label class="field-label">${safeText(uiText.badgeColor)}</label>
            <select class="select badge-color">
              ${BADGE_COLORS.map(option => `<option value="${safeAttr(option)}" ${option === item.badgeColor ? "selected" : ""}>${safeText(option)}</option>`).join("")}
            </select>
          </div>
        </div>

        <div class="custom-badge-wrap ${item.badgePreset === "Custom" ? "" : "hidden"}">
          <label class="field-label">${safeText(uiText.customBadgeText)}</label>
          <input class="input badge-custom" type="text" value="${safeAttr(item.badgeCustomText)}" placeholder="Contoh: Promo Weekend">
        </div>

        <div>
          <label class="field-label">${safeText(uiText.promoNote)}</label>
          <textarea class="textarea promo-note" placeholder="Nota promo">${safeText(item.note)}</textarea>
        </div>

        <div class="quick-actions">
          <button class="btn green promo-on" type="button">${safeText(uiText.promoOnButton)}</button>
          <button class="btn soft promo-off" type="button">${safeText(uiText.promoOffButton)}</button>
          <button class="btn red promo-clear" type="button">${safeText(uiText.clearButton)}</button>
        </div>

        <button class="btn promo-save" type="button">${safeText(uiText.savePromo)}</button>
      </div>
    </article>
  `;
}

function bindPromoCards() {
  els.promoGroups.querySelectorAll(".promo-card").forEach(card => {
    const active = card.querySelector(".promo-active");
    const price = card.querySelector(".promo-price");
    const preset = card.querySelector(".badge-preset");
    const color = card.querySelector(".badge-color");
    const customWrap = card.querySelector(".custom-badge-wrap");
    const custom = card.querySelector(".badge-custom");
    const note = card.querySelector(".promo-note");
    const previewPrice = card.querySelector(".preview-price");
    const previewBadge = card.querySelector(".badge-preview");

    const updatePreview = () => {
      const badgeText = preset.value === "Custom" ? (custom.value.trim() || "Promo") : preset.value;

      customWrap.classList.toggle("hidden", preset.value !== "Custom");
      previewPrice.textContent = price.value.trim() || card.dataset.price;
      previewBadge.textContent = badgeText;
      previewBadge.className = "badge-preview " + badgeClass(color.value);
    };

    [active, price, preset, color, custom, note].forEach(input => {
      input.addEventListener("input", updatePreview);
      input.addEventListener("change", updatePreview);
    });

    card.querySelector(".promo-on").addEventListener("click", () => {
      active.value = "YES";
      if (!price.value.trim()) price.value = card.dataset.price;
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
      color.value = "Gold";
      custom.value = "";
      note.value = "";
      updatePreview();
    });

    card.querySelector(".promo-save").addEventListener("click", () => savePromo(card));

    updatePreview();
  });
}

async function savePromo(card) {
  const button = card.querySelector(".promo-save");

  const payload = {
    mode: "savePromo",
    password: adminPassword,
    product: card.dataset.product,
    section: card.dataset.section,
    duration: card.dataset.duration,
    promoActive: card.querySelector(".promo-active").value,
    promoPrice: card.querySelector(".promo-price").value.trim(),
    badgePreset: card.querySelector(".badge-preset").value,
    badgeCustomText: card.querySelector(".badge-custom").value.trim(),
    badgeColor: card.querySelector(".badge-color").value,
    note: card.querySelector(".promo-note").value.trim()
  };

  if (payload.promoActive === "YES" && !payload.promoPrice) {
    showMessage(els.globalMsg, uiText.promoPriceRequired, "error");
    return;
  }

  if (payload.badgePreset === "Custom" && !payload.badgeCustomText) {
    showMessage(els.globalMsg, uiText.customBadgeRequired, "error");
    return;
  }

  setLoading(button, true, uiText.saving);

  try {
    const result = await jsonp(payload);
    if (!result.ok) throw new Error(result.error || "Gagal save promo.");

    showMessage(els.globalMsg, uiText.savePromoSuccess, "success");
    await loadData();
  } catch (error) {
    showMessage(els.globalMsg, uiText.savePromoFailed + error.message, "error");
  } finally {
    setLoading(button, false, uiText.savePromo);
  }
}


function renderHotSelling() {
  if (!els.hotSellingList) return;

  const allItems = [...(data.hotSellingOptions || data.hotSellingControl || [])];
  const maxActive = Number(data.meta?.maxHotSelling || 3);
  const activeCount = allItems.filter(item => normalize(item.status) === "ON").length;

  if (els.hotSellingActiveCount) els.hotSellingActiveCount.textContent = activeCount;
  if (els.hotSellingMaxCount) els.hotSellingMaxCount.textContent = maxActive;

  const limitCard = els.hotSellingActiveCount?.closest(".hot-limit-card");
  limitCard?.classList.toggle("full", activeCount >= maxActive);

  const keyword = normalize(els.hotSellingSearch?.value || "");
  const filter = els.hotSellingFilter?.value || "ALL";

  const items = allItems
    .filter(item => {
      const promoReady = isHotPromoReady(item);
      const visible = Boolean(item.visible) || Boolean(findVisibleHotSelling(item.product, item.section || "ALL", item.duration));
      const statusOn = normalize(item.status) === "ON";
      const haystack = normalize(`${item.product} ${item.section || "ALL"} ${item.duration} ${item.promoPrice || ""} ${item.badge || ""}`);

      if (keyword && !haystack.includes(keyword)) return false;
      if (filter === "ON" && !statusOn) return false;
      if (filter === "PROMO" && !promoReady) return false;
      if (filter === "VISIBLE" && !visible) return false;

      return true;
    })
    .sort((a, b) => {
      const productSort = String(a.product || "").localeCompare(String(b.product || ""));
      if (productSort !== 0) return productSort;

      const sectionSort = String(a.section || "").localeCompare(String(b.section || ""));
      if (sectionSort !== 0) return sectionSort;

      return Number(a.position || 999) - Number(b.position || 999);
    });

  if (!items.length) {
    els.hotSellingList.innerHTML = `<div class="empty">${safeText(uiText.noHotSelling)}</div>`;
    return;
  }

  const groups = [];

  items.forEach(item => {
    const key = `${item.product}||${item.section || "ALL"}`;
    let group = groups.find(entry => entry.key === key);

    if (!group) {
      const labelInfo = getHotGroupLabel(item.product, item.section || "ALL");
      group = {
        key,
        title: labelInfo.title,
        icon: labelInfo.icon,
        items: []
      };
      groups.push(group);
    }

    group.items.push(item);
  });

  els.hotSellingList.innerHTML = groups.map((group, index) => {
    const groupOn = group.items.filter(item => normalize(item.status) === "ON").length;
    return `
      <details class="hot-group" ${index === 0 ? "open" : ""}>
        <summary>
          <div class="manage-title">
            <strong>${safeText(group.icon + " " + group.title)}</strong>
            <span>${group.items.length} pakej • ${groupOn} Hot Selling ON</span>
          </div>
          <span class="stock-arrow">›</span>
        </summary>
        <div class="hot-plan-list">
          ${group.items.map(item => renderHotSellingCard(item)).join("")}
        </div>
      </details>
    `;
  }).join("");

  els.hotSellingList.querySelectorAll(".hot-selling-card").forEach(card => {
    card.querySelector(".save-hot-selling")?.addEventListener("click", () => saveHotSelling(card));
  });
}

function getHotGroupLabel(product, section) {
  const group = PRODUCT_GROUPS.find(item =>
    normalize(item.product) === normalize(product) &&
    normalize(item.section || "ALL") === normalize(section || "ALL")
  );

  if (group) {
    return { title: group.label, icon: group.icon };
  }

  return { title: product + (section !== "ALL" ? " - " + section : ""), icon: "🔥" };
}

function isHotPromoReady(item) {
  return isPromoOn(item) && Boolean(item.promoPrice);
}

function renderHotSellingCard(item) {
  const visibleItem = findVisibleHotSelling(item.product, item.section || "ALL", item.duration);
  const visible = Boolean(item.visible) || Boolean(visibleItem);
  const promoReady = isHotPromoReady(item);
  const statusOn = normalize(item.status) === "ON";
  const maxActive = Number(data.meta?.maxHotSelling || 3);

  return `
    <details class="hot-plan-card hot-selling-card"
      data-product="${safeAttr(item.product)}"
      data-section="${safeAttr(item.section || "ALL")}"
      data-duration="${safeAttr(item.duration)}"
      data-saved-status="${safeAttr(statusOn ? "ON" : "OFF")}">
      <summary>
        <div class="manage-title">
          <strong>${safeText(item.duration)}</strong>
          <div class="hot-plan-meta">
            <span class="mini-status ${statusOn ? "on" : ""}">${safeText(statusOn ? "HOT ON" : "HOT OFF")}</span>
            <span class="mini-status ${promoReady ? "promo" : ""}">${safeText(promoReady ? "PROMO " + item.promoPrice : "PROMO OFF")}</span>
          </div>
        </div>
        <span class="status-pill ${visible ? "" : "gray"}">${safeText(visible ? uiText.visibleLabel : uiText.hiddenLabel)}</span>
      </summary>

      <div class="hot-plan-body">
        <div class="helper-box ${visible ? "success-box" : "warning-box"}">
          ${visible
            ? `✅ Dipaparkan di website • Harga promo: <strong>${safeText(item.promoPrice)}</strong>`
            : statusOn
              ? `Disorok daripada website. ${safeText(uiText.promoNotReady)}.`
              : `Status Hot Selling masih OFF. Promo semasa: <strong>${safeText(promoReady ? item.promoPrice : "OFF")}</strong>.`
          }
        </div>

        <div class="form-grid">
          <div>
            <label class="field-label">${safeText(uiText.hotSellingStatus)}</label>
            <select class="select hot-status">
              <option value="OFF" ${!statusOn ? "selected" : ""}>OFF</option>
              <option value="ON" ${statusOn ? "selected" : ""}>ON</option>
            </select>
          </div>
          <div>
            <label class="field-label">${safeText(uiText.positionLabel)}</label>
            <select class="select hot-position">
              ${[1,2,3].map(position => `<option value="${position}" ${Number(item.position) === position ? "selected" : ""}>${position}</option>`).join("")}
            </select>
          </div>
        </div>

        <div>
          <label class="field-label">${safeText(uiText.hotBadgeLabel)}</label>
          <input class="input hot-badge" type="text" value="${safeAttr(item.badge || "Hot Selling")}" placeholder="Contoh: Must buy">
        </div>

        <div class="read-info">
          <span>Promo Control</span>
          <strong>${safeText(promoReady ? "ON • " + item.promoPrice : "OFF / Tiada Harga Promo")}</strong>
        </div>

        <button class="btn save-hot-selling" type="button">${safeText(uiText.saveHotSelling)}</button>
      </div>
    </details>
  `;
}

function findVisibleHotSelling(product, section, duration) {
  return (data.visibleHotSelling || []).find(item =>
    normalize(item.product) === normalize(product) &&
    normalize(item.section || "ALL") === normalize(section || "ALL") &&
    normalize(item.duration) === normalize(duration)
  );
}

async function saveHotSelling(card) {
  const button = card.querySelector(".save-hot-selling");
  const requestedStatus = card.querySelector(".hot-status").value;
  const savedStatus = card.dataset.savedStatus || "OFF";
  const activeCount = (data.hotSellingOptions || data.hotSellingControl || [])
    .filter(item => normalize(item.status) === "ON").length;
  const maxActive = Number(data.meta?.maxHotSelling || 3);

  if (requestedStatus === "ON" && savedStatus !== "ON" && activeCount >= maxActive) {
    showMessage(els.globalMsg, uiText.hotLimitError, "error");
    return;
  }

  setLoading(button, true, uiText.saving);

  try {
    const result = await jsonp({
      mode: "saveHotSelling",
      password: adminPassword,
      product: card.dataset.product,
      section: card.dataset.section || "ALL",
      duration: card.dataset.duration,
      status: requestedStatus,
      position: card.querySelector(".hot-position").value,
      badge: card.querySelector(".hot-badge").value.trim() || "Hot Selling"
    });

    if (!result.ok) throw new Error(result.error || "Gagal save Hot Selling.");

    showMessage(els.globalMsg, uiText.saveHotSellingSuccess, "success");
    await loadData();
  } catch (error) {
    showMessage(els.globalMsg, uiText.saveHotSellingFailed + error.message, "error");
  } finally {
    setLoading(button, false, uiText.saveHotSelling);
  }
}

function renderResellers() {
  if (!els.resellerList) return;

  const keyword = normalize(els.resellerSearch?.value || "");
  const items = [...(data.resellers || [])]
    .sort((a, b) => Number(a.position || 999) - Number(b.position || 999))
    .filter(item => !keyword || normalize(`${item.code} ${item.name} ${item.telegramUsername}`).includes(keyword));

  if (!items.length) {
    els.resellerList.innerHTML = `<div class="empty">${safeText(uiText.noReseller)}</div>`;
    return;
  }

  els.resellerList.innerHTML = items.map(item => {
    const active = normalize(item.status) === "ON";

    return `
      <details class="manage-card reseller-card" data-code="${safeAttr(item.code)}">
        <summary>
          <div class="manage-title">
            <strong>${safeText(item.code)} • ${safeText(item.name)}</strong>
            <span>@${safeText(item.telegramUsername)} • ${safeText(item.leadCount || 0)} lead</span>
          </div>
          <div class="manage-summary-right">
            <span class="status-pill ${active ? "" : "off"}">${safeText(active ? uiText.onLabel : uiText.offLabel)}</span>
            <span class="stock-arrow">›</span>
          </div>
        </summary>

        <div class="manage-body">
          <div class="form-grid">
            <div>
              <label class="field-label">${safeText(uiText.resellerNameLabel)}</label>
              <input class="input reseller-name" type="text" value="${safeAttr(item.name)}">
            </div>
            <div>
              <label class="field-label">${safeText(uiText.telegramUsernameLabel)}</label>
              <input class="input reseller-telegram" type="text" value="${safeAttr(item.telegramUsername)}" placeholder="Tanpa @">
            </div>
          </div>

          <div class="form-grid">
            <div>
              <label class="field-label">${safeText(uiText.statusLabel)}</label>
              <select class="select reseller-status">
                <option value="ON" ${active ? "selected" : ""}>ON</option>
                <option value="OFF" ${!active ? "selected" : ""}>OFF</option>
              </select>
            </div>
            <div>
              <label class="field-label">${safeText(uiText.positionLabel)}</label>
              <input class="input reseller-position" type="number" min="1" value="${safeAttr(item.position || "")}">
            </div>
          </div>

          <div class="meta-info-grid">
            <div class="read-info">
              <span>${safeText(uiText.leadCountLabel)}</span>
              <strong>${safeText(item.leadCount || 0)}</strong>
            </div>
            <div class="read-info">
              <span>${safeText(uiText.lastAssignedLabel)}</span>
              <strong>${safeText(item.lastAssigned || "-")}</strong>
            </div>
          </div>

          <button class="btn save-reseller" type="button">${safeText(uiText.saveReseller)}</button>
        </div>
      </details>
    `;
  }).join("");

  els.resellerList.querySelectorAll(".reseller-card").forEach(card => {
    card.querySelector(".save-reseller")?.addEventListener("click", () => saveReseller(card));
  });
}

async function saveReseller(card) {
  const button = card.querySelector(".save-reseller");
  setLoading(button, true, uiText.saving);

  try {
    const result = await jsonp({
      mode: "saveReseller",
      password: adminPassword,
      code: card.dataset.code,
      name: card.querySelector(".reseller-name").value.trim(),
      telegramUsername: card.querySelector(".reseller-telegram").value.trim(),
      status: card.querySelector(".reseller-status").value,
      position: card.querySelector(".reseller-position").value.trim()
    });

    if (!result.ok) throw new Error(result.error || "Gagal save reseller.");

    showMessage(els.globalMsg, uiText.saveResellerSuccess, "success");
    await loadData();
  } catch (error) {
    showMessage(els.globalMsg, uiText.saveResellerFailed + error.message, "error");
  } finally {
    setLoading(button, false, uiText.saveReseller);
  }
}

function renderLead() {
  if (!els.leadByReseller) return;

  const summary = data.leadSummary || {};
  if (els.leadTotalCount) els.leadTotalCount.textContent = summary.totalLeads || 0;
  if (els.leadAssignedCount) els.leadAssignedCount.textContent = summary.assigned || 0;
  if (els.leadReassignedCount) els.leadReassignedCount.textContent = summary.reassigned || 0;

  const items = [...(summary.byReseller || [])].sort((a, b) => Number(b.leads || 0) - Number(a.leads || 0));

  if (!items.length) {
    els.leadByReseller.innerHTML = `<div class="empty">${safeText(uiText.noLead)}</div>`;
    return;
  }

  els.leadByReseller.innerHTML = items.map((item, index) => `
    <article class="lead-row">
      <div class="rank">${index + 1}</div>
      <div class="lead-name">
        <strong>${safeText(item.name)}</strong>
        <span>${safeText(item.code)}</span>
      </div>
      <div class="lead-total">${safeText(item.leads)} lead</div>
    </article>
  `).join("");
}

function jumpToStock(product, section) {
  switchTab("stock");

  setTimeout(() => {
    const target = document.getElementById(stockDomId(product, section));
    if (target) {
      const parent = target.closest(".stock-product-card");
      if (parent) parent.open = true;
    }
    highlightAndScroll(target);
  }, 120);
}

function jumpToPromo(product, section, duration) {
  switchTab("promo");

  els.promoSearch.value = "";
  els.promoFilter.value = "ALL";
  renderPromos();

  setTimeout(() => {
    const group = document.getElementById(promoGroupDomId(product, section));
    if (group) group.open = true;

    const target = document.getElementById(promoDomId(product, section, duration));
    highlightAndScroll(target);
  }, 150);
}

function highlightAndScroll(target) {
  if (!target) return;

  target.scrollIntoView({ behavior: "smooth", block: "center" });
  target.classList.add("highlight");

  setTimeout(() => target.classList.remove("highlight"), 2500);
}

function switchTab(tabId) {
  document.querySelectorAll(".tab").forEach(tab => tab.classList.toggle("active", tab.dataset.tab === tabId));
  document.querySelectorAll(".section").forEach(section => section.classList.toggle("active", section.id === tabId));
}

function findStock(product, section) {
  return data.stock.find(item =>
    normalize(item.product) === normalize(product) &&
    normalize(item.section || "ALL") === normalize(section || "ALL")
  );
}

function findPromo(product, section, duration) {
  return data.promos.find(item =>
    normalize(item.product) === normalize(product) &&
    normalize(item.section || "ALL") === normalize(section || "ALL") &&
    normalize(item.duration) === normalize(duration)
  );
}

function isPromoOn(item) {
  return normalize(item.promoActive) === "YES" || normalize(item.promoActive) === "ON";
}

function getBadgeText(promo) {
  if (!promo) return "Promo";
  const preset = promo.badgePreset || "Promo";
  return preset === "Custom" ? (promo.badgeCustomText || "Promo") : (promo.badgeText || preset || "Promo");
}

function badgeClass(color) {
  const value = normalize(color);

  if (value === "GREEN") return "green";
  if (value === "RED") return "red";
  if (value === "BLUE") return "blue";
  if (value === "PURPLE" || value === "PINK") return "purple";
  if (value === "DARK" || value === "BLACK") return "dark";

  return "";
}

function stockDomId(product, section) {
  return "stock-" + slug(`${product}-${section}`);
}

function promoGroupDomId(product, section) {
  return "promo-group-" + slug(`${product}-${section}`);
}

function promoDomId(product, section, duration) {
  return "promo-" + slug(`${product}-${section}-${duration}`);
}

function slug(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function setLoading(button, loading, text) {
  if (!button) return;

  if (loading) {
    button.dataset.oldText = button.textContent;
    button.textContent = text || uiText.loading;
    button.disabled = true;
  } else {
    button.textContent = text || button.dataset.oldText || button.textContent;
    button.disabled = false;
  }
}

function showMessage(element, message, type = "info") {
  if (!element) return;

  element.textContent = message;
  element.className = "message show " + type;

  if (type === "success") {
    clearTimeout(element._timer);
    element._timer = setTimeout(() => element.classList.remove("show"), 4500);
  }
}

function setText(id, text) {
  const element = document.getElementById(id);
  if (element) element.textContent = text || "";
}

function safeText(value = "") {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function safeAttr(value = "") {
  return safeText(value);
}

function normalize(value = "") {
  return String(value || "").trim().toUpperCase();
}

function jsonp(params) {
  return new Promise((resolve, reject) => {
    const callbackName = "numoAdminCb_" + Date.now() + "_" + Math.floor(Math.random() * 100000);
    const query = new URLSearchParams({ ...params, callback: callbackName });
    const script = document.createElement("script");

    const timer = setTimeout(() => {
      cleanup();
      reject(new Error("Request timeout"));
    }, 20000);

    window[callbackName] = result => {
      cleanup();
      resolve(result);
    };

    function cleanup() {
      clearTimeout(timer);
      delete window[callbackName];

      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    }

    script.onerror = () => {
      cleanup();
      reject(new Error("Network/API error"));
    };

    script.src = API_URL + "?" + query.toString();
    document.body.appendChild(script);
  });
}
