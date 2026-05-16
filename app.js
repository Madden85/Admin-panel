/***********************
 * NUMO ADMIN PANEL V3 - CLEAN WHITE
 * index.html + app.js
 ***********************/

const API_URL = "https://script.google.com/macros/s/AKfycbwqqBJ1A9tqYhPhEJe37Ik3-HGKZOHUUHqdf_jtLJuTv8tqQpt6WqX5jUBQwKPMbM92tw/exec";

const BADGE_PRESETS = ["Promo","Hot Promo","Limited","Best Deal","Mega Sale","Promo Raya","Promo Merdeka","Promo Gaji","Last Call","Custom"];
const BADGE_COLORS = ["Gold","Green","Red","Blue","Purple","Dark"];

const BASE_GROUPS = [
  {key:"NETFLIX PREMIUM||ALL", product:"NETFLIX PREMIUM", section:"ALL", label:"Netflix Premium", icon:"🎬", plans:[
    {duration:"1 Bulan",price:"RM25"},{duration:"2 Bulan",price:"RM45"},{duration:"3 Bulan Promo",price:"RM60"},{duration:"6 Bulan",price:"RM120"},{duration:"12 Bulan",price:"RM230"}]},
  {key:"YOUTUBE PREMIUM||Email Sendiri", product:"YOUTUBE PREMIUM", section:"Email Sendiri", label:"YouTube Premium - Email Sendiri", icon:"▶️", plans:[
    {duration:"1 Bulan",price:"RM16"},{duration:"3 Bulan",price:"RM45"},{duration:"6 Bulan",price:"RM85"},{duration:"12 Bulan",price:"RM144"}]},
  {key:"YOUTUBE PREMIUM||Email Seller", product:"YOUTUBE PREMIUM", section:"Email Seller", label:"YouTube Premium - Email Seller", icon:"▶️", plans:[
    {duration:"1 Bulan",price:"RM10"},{duration:"3 Bulan",price:"RM27"},{duration:"6 Bulan",price:"RM48"},{duration:"12 Bulan",price:"RM84"}]},
  {key:"DISNEY+ HOTSTAR||ALL", product:"DISNEY+ HOTSTAR", section:"ALL", label:"Disney+ Hotstar", icon:"🏰", plans:[
    {duration:"1 Bulan",price:"RM25"},{duration:"2 Bulan",price:"RM45"},{duration:"Promo 3 Bulan",price:"RM60"},{duration:"6 Bulan",price:"RM120"},{duration:"12 Bulan",price:"RM230"}]},
  {key:"SOOKA PREMIUM||ALL", product:"SOOKA PREMIUM", section:"ALL", label:"Sooka Premium", icon:"📡", plans:[
    {duration:"1 Bulan",price:"RM25"},{duration:"2 Bulan",price:"RM46"},{duration:"6 Bulan",price:"RM120"},{duration:"12 Bulan",price:"RM216"}]},
  {key:"VIU PREMIUM||ALL", product:"VIU PREMIUM", section:"ALL", label:"Viu Premium", icon:"📱", plans:[
    {duration:"1 Bulan",price:"RM15"},{duration:"2 Bulan",price:"RM26"},{duration:"6 Bulan",price:"RM66"},{duration:"12 Bulan",price:"RM120"}]},
  {key:"iQIYI PREMIUM||ALL", product:"iQIYI PREMIUM", section:"ALL", label:"iQiyi Premium", icon:"🎥", plans:[
    {duration:"1 Bulan",price:"RM15"},{duration:"2 Bulan",price:"RM26"},{duration:"Promo 3 Bulan",price:"RM33"},{duration:"6 Bulan",price:"RM66"},{duration:"12 Bulan",price:"RM120"}]},
  {key:"SPOTIFY PREMIUM||ALL", product:"SPOTIFY PREMIUM", section:"ALL", label:"Spotify Premium", icon:"🎧", plans:[
    {duration:"1 Bulan",price:"RM15"},{duration:"2 Bulan",price:"RM28"},{duration:"Promo 2 Bulan",price:"RM25"},{duration:"6 Bulan",price:"RM72"},{duration:"12 Bulan",price:"RM120"}]}
];

const STOCK_GROUPS = [
  {title:"Produk Biasa", subtitle:"Satu toggle untuk semua plan produk tersebut", icon:"📦", className:"", rows:[
    {product:"NETFLIX PREMIUM",section:"ALL",label:"Netflix Premium",note:"Semua plan Netflix"},
    {product:"DISNEY+ HOTSTAR",section:"ALL",label:"Disney+ Hotstar",note:"Semua plan Disney"},
    {product:"VIU PREMIUM",section:"ALL",label:"Viu Premium",note:"Semua plan Viu"},
    {product:"iQIYI PREMIUM",section:"ALL",label:"iQiyi Premium",note:"Semua plan iQiyi"},
    {product:"SPOTIFY PREMIUM",section:"ALL",label:"Spotify Premium",note:"Semua plan Spotify"}]},
  {title:"YouTube Premium", subtitle:"Control asing untuk Own Email dan Seller Email", icon:"▶️", className:"", rows:[
    {product:"YOUTUBE PREMIUM",section:"Email Sendiri",label:"Email Sendiri",note:"YouTube Own Email"},
    {product:"YOUTUBE PREMIUM",section:"Email Seller",label:"Email Seller",note:"YouTube Seller Email"}]},
  {title:"Sooka Device", subtitle:"Pilih device mana yang masih available", icon:"📡", className:"full", rows:[
    {product:"SOOKA PREMIUM",section:"TV",label:"TV",note:"Sooka untuk TV"},
    {product:"SOOKA PREMIUM",section:"PHONE",label:"Phone",note:"Sooka untuk phone"},
    {product:"SOOKA PREMIUM",section:"TABLET",label:"Tablet",note:"Sooka untuk tablet"}]}
];

let data = {stock:[], promos:[], meta:{}};
let adminPassword = sessionStorage.getItem("numoAdminPasswordV3") || "";
let loggedIn = Boolean(adminPassword);
const els = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  bindEvents();
  if (adminPassword) els.password.value = adminPassword;
  if (loggedIn) { showPanel(); loadData(); }
});

function cacheElements(){
  ["loginCard","panel","password","loginBtn","loginMsg","globalMsg","logoutBtn","refreshBtn","stockOn","stockOff","promoOn","syncText","stockLayout","sookaSetupWarning","promoGroups","search","promoFilter"].forEach(id => els[id] = document.getElementById(id));
}

function bindEvents(){
  els.loginBtn.addEventListener("click", login);
  els.password.addEventListener("keydown", e => { if(e.key === "Enter") login(); });
  els.logoutBtn.addEventListener("click", logout);
  els.refreshBtn.addEventListener("click", () => loggedIn ? loadData() : showMessage(els.loginMsg, "Login dulu.", "info"));
  document.querySelectorAll(".tab").forEach(btn => btn.addEventListener("click", () => switchTab(btn.dataset.tab)));
  els.search.addEventListener("input", renderPromos);
  els.promoFilter.addEventListener("change", renderPromos);
}

async function login(){
  const password = els.password.value.trim();
  if(!password) return showMessage(els.loginMsg, "Masukkan password dulu.", "error");
  setLoading(els.loginBtn, true, "Checking...");
  try{
    const result = await jsonp({mode:"verifyAdmin", password});
    if(!result.ok) throw new Error(result.error || "Password salah atau API error.");
    adminPassword = password;
    loggedIn = true;
    sessionStorage.setItem("numoAdminPasswordV3", password);
    showPanel();
    showMessage(els.globalMsg, "Login berjaya. Loading data...", "success");
    await loadData();
  }catch(error){ showMessage(els.loginMsg, "Login gagal: " + error.message, "error"); }
  finally{ setLoading(els.loginBtn, false, "Login Admin"); }
}

function logout(){
  adminPassword = "";
  loggedIn = false;
  sessionStorage.removeItem("numoAdminPasswordV3");
  els.panel.classList.remove("active");
  els.loginCard.style.display = "block";
  els.logoutBtn.classList.add("hidden");
  els.password.value = "";
  showMessage(els.loginMsg, "Logout berjaya.", "info");
}

function showPanel(){
  els.loginCard.style.display = "none";
  els.panel.classList.add("active");
  els.logoutBtn.classList.remove("hidden");
}

async function loadData(){
  showMessage(els.globalMsg, "Loading data dari Google Sheet...", "info");
  setLoading(els.refreshBtn, true, "Loading");
  try{
    const result = await jsonp({mode:"getWebsiteControl", _ : Date.now()});
    if(!result.ok) throw new Error(result.error || "Gagal baca data.");
    data = result.data || {stock:[], promos:[], meta:{}};
    renderDashboard();
    renderStock();
    renderPromos();
    showMessage(els.globalMsg, "Data berjaya sync.", "success");
  }catch(error){ showMessage(els.globalMsg, "Gagal load data: " + error.message, "error"); }
  finally{ setLoading(els.refreshBtn, false, "Refresh"); }
}

function renderDashboard(){
  els.stockOn.textContent = data.stock.filter(x => normalize(x.status) === "ON").length;
  els.stockOff.textContent = data.stock.filter(x => normalize(x.status) === "OFF").length;
  els.promoOn.textContent = data.promos.filter(isPromoOn).length;
  els.syncText.textContent = new Date().toLocaleString("ms-MY");
}

function renderStock(){
  const missingSooka = ["TV","PHONE","TABLET"].filter(section => !findStock("SOOKA PREMIUM", section));
  els.sookaSetupWarning.classList.toggle("hidden", missingSooka.length === 0);
  els.stockLayout.innerHTML = STOCK_GROUPS.map(group => `
    <article class="stock-group ${group.className || ""}">
      <div class="group-head">
        <div class="group-title"><div class="group-icon">${group.icon}</div><div><strong>${safe(group.title)}</strong><span>${safe(group.subtitle)}</span></div></div>
        <span class="pill blue">${group.rows.length} control</span>
      </div>
      <div class="stock-list">${group.rows.map(row => renderStockRow(row)).join("")}</div>
    </article>
  `).join("");

  els.stockLayout.querySelectorAll(".stock-row").forEach(card => {
    const product = card.dataset.product;
    const section = card.dataset.section;
    const onBtn = card.querySelector(".toggle-on");
    const offBtn = card.querySelector(".toggle-off");
    const saveBtn = card.querySelector(".stock-save");
    const stockTextInput = card.querySelector(".stock-text");
    const setStatus = status => { card.dataset.status = status; updateToggleVisual(card); };
    onBtn.addEventListener("click", () => setStatus("ON"));
    offBtn.addEventListener("click", () => setStatus("OFF"));
    saveBtn.addEventListener("click", () => saveStock({card, product, section, status: card.dataset.status, stockText: stockTextInput.value.trim() || "Habis Stok"}));
    updateToggleVisual(card);
  });
}

function renderStockRow(row){
  const stock = findStock(row.product, row.section);
  const exists = Boolean(stock);
  const status = exists ? (normalize(stock.status) === "OFF" ? "OFF" : "ON") : "MISSING";
  const stockText = exists ? (stock.stockText || "Habis Stok") : "Habis Stok";
  const pillClass = status === "ON" ? "on" : status === "OFF" ? "off" : "gray";
  const pillText = status === "MISSING" ? "SETUP NEEDED" : status === "ON" ? "ON" : "HABIS STOK";
  const disabled = exists ? "" : "disabled";
  return `
    <div class="stock-row" data-product="${safeAttr(row.product)}" data-section="${safeAttr(row.section)}" data-status="${status}">
      <div class="stock-main">
        <div><div class="stock-name">${safe(row.label)}</div><div class="stock-sub">${safe(row.note)} • Section: ${safe(row.section)}</div></div>
        <span class="pill ${pillClass}">${pillText}</span>
      </div>
      <div class="stock-actions">
        <div><label class="field-label">Text bila OFF</label><input class="input stock-text" type="text" value="${safeAttr(stockText)}" ${disabled}></div>
        <div><label class="field-label">Status</label><div class="toggle-wrap"><button class="toggle-btn toggle-on" type="button" ${disabled}>ON</button><button class="toggle-btn toggle-off" type="button" ${disabled}>OFF</button></div></div>
        <button class="btn stock-save" type="button" ${disabled}>Save</button>
      </div>
    </div>`;
}

function updateToggleVisual(card){
  const status = card.dataset.status;
  const onBtn = card.querySelector(".toggle-on");
  const offBtn = card.querySelector(".toggle-off");
  const pill = card.querySelector(".pill");
  onBtn.classList.toggle("active-on", status === "ON");
  offBtn.classList.toggle("active-off", status === "OFF");
  if(status === "MISSING") return;
  pill.className = "pill " + (status === "ON" ? "on" : "off");
  pill.textContent = status === "ON" ? "ON" : "HABIS STOK";
}

async function saveStock({card, product, section, status, stockText}){
  const button = card.querySelector(".stock-save");
  setLoading(button, true, "Saving...");
  try{
    const result = await jsonp({mode:"saveStock", password:adminPassword, product, section, status, stockText});
    if(!result.ok) throw new Error(result.error || "Gagal save stock.");
    showMessage(els.globalMsg, `Stock ${product} / ${section} berjaya disimpan.`, "success");
    await loadData();
  }catch(error){ showMessage(els.globalMsg, "Gagal save stock: " + error.message, "error"); }
  finally{ setLoading(button, false, "Save"); }
}

function renderPromos(){
  const query = normalize(els.search.value);
  const filter = els.promoFilter.value;
  const groups = BASE_GROUPS.map(group => {
    const plans = group.plans.map(plan => {
      const promo = findPromo(group.product, group.section, plan.duration) || {};
      return {product:group.product, section:group.section, groupLabel:group.label, icon:group.icon, duration:plan.duration, price:plan.price, promoActive:promo.promoActive || "NO", promoPrice:promo.promoPrice || "", badgePreset:promo.badgePreset || "Promo", badgeCustomText:promo.badgeCustomText || "", badgeColor:promo.badgeColor || "Gold", note:promo.note || ""};
    }).filter(item => {
      const haystack = normalize(`${item.product} ${item.section} ${item.duration} ${item.price} ${item.promoPrice}`);
      if(query && !haystack.includes(query)) return false;
      if(filter === "ON" && !isPromoOn(item)) return false;
      if(filter === "OFF" && isPromoOn(item)) return false;
      return true;
    });
    return {...group, plans};
  }).filter(group => group.plans.length);

  if(!groups.length){
    els.promoGroups.innerHTML = `<div class="empty">Tiada plan dijumpai.</div>`;
    return;
  }

  els.promoGroups.innerHTML = groups.map((group, i) => {
    const activeCount = group.plans.filter(isPromoOn).length;
    const openAttr = i === 0 ? "open" : "";
    return `<details class="promo-group" ${openAttr}>
      <summary><div class="summary-title"><strong>${group.icon} ${safe(group.label)}</strong><span>${group.plans.length} plan dipaparkan • ${activeCount} promo aktif</span></div><span class="chevron">›</span></summary>
      <div class="promo-list">${group.plans.map(plan => renderPromoCard(plan)).join("")}</div>
    </details>`;
  }).join("");

  els.promoGroups.querySelectorAll(".promo-card").forEach(card => {
    const item = JSON.parse(card.dataset.item);
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

    [active, price, preset, custom, color, note].forEach(el => {
      el.addEventListener("input", updatePreview);
      el.addEventListener("change", updatePreview);
    });

    card.querySelector(".promo-on").addEventListener("click", () => { active.value = "YES"; if(!price.value.trim()) price.value = item.price; updatePreview(); });
    card.querySelector(".promo-off").addEventListener("click", () => { active.value = "NO"; updatePreview(); });
    card.querySelector(".promo-clear").addEventListener("click", () => { active.value="NO"; price.value=""; preset.value="Promo"; custom.value=""; color.value="Gold"; note.value=""; updatePreview(); });
    card.querySelector(".promo-save").addEventListener("click", () => savePromo(card, item));
    updatePreview();
  });
}

function renderPromoCard(item){
  const active = isPromoOn(item) ? "YES" : "NO";
  const badgeText = item.badgePreset === "Custom" ? (item.badgeCustomText || "Promo") : (item.badgePreset || "Promo");
  const sectionText = item.section === "ALL" ? "Semua plan" : item.section;
  return `<article class="promo-card" data-item="${safeAttr(JSON.stringify(item))}">
    <div class="promo-top"><div><div class="promo-title">${safe(item.duration)}</div><div class="promo-sub">${safe(sectionText)} • Harga asal ${safe(item.price)}</div></div><span class="pill ${active==="YES" ? "promo" : "gray"}">${active==="YES" ? "PROMO ON" : "PROMO OFF"}</span></div>
    <div class="promo-form">
      <div class="preview"><span>Preview:</span><span class="old-price">${safe(item.price)}</span><span class="new-price price-preview">${safe(item.promoPrice || item.price)}</span><span class="badge badge-preview ${badgeClass(item.badgeColor)}">${safe(badgeText)}</span></div>
      <div class="form-row"><div><label class="field-label">Promo Active</label><select class="select promo-active"><option value="NO" ${active==="NO" ? "selected" : ""}>OFF</option><option value="YES" ${active==="YES" ? "selected" : ""}>ON</option></select></div><div><label class="field-label">Promo Price</label><input class="input promo-price" type="text" placeholder="Contoh: RM20" value="${safeAttr(item.promoPrice || "")}"></div></div>
      <div class="form-row"><div><label class="field-label">Badge Preset</label><select class="select badge-preset">${BADGE_PRESETS.map(o => `<option value="${safeAttr(o)}" ${o===item.badgePreset ? "selected" : ""}>${safe(o)}</option>`).join("")}</select></div><div><label class="field-label">Badge Color</label><select class="select badge-color">${BADGE_COLORS.map(o => `<option value="${safeAttr(o)}" ${o===item.badgeColor ? "selected" : ""}>${safe(o)}</option>`).join("")}</select></div></div>
      <div class="custom-wrap ${item.badgePreset === "Custom" ? "" : "hidden"}"><label class="field-label">Custom Badge Text</label><input class="input badge-custom" type="text" placeholder="Contoh: Promo Weekend" value="${safeAttr(item.badgeCustomText || "")}"></div>
      <div><label class="field-label">Promo Note</label><textarea class="textarea promo-note" placeholder="Contoh: Promo bulan ini sementara slot masih ada">${safe(item.note || "")}</textarea></div>
      <div class="quick-actions"><button class="btn green promo-on" type="button">Promo ON</button><button class="btn soft promo-off" type="button">Promo OFF</button><button class="btn red promo-clear" type="button">Clear</button></div>
      <button class="btn promo-save" type="button">Save Promo</button>
    </div>
  </article>`;
}

async function savePromo(card, item){
  const button = card.querySelector(".promo-save");
  const promoActive = card.querySelector(".promo-active").value;
  const promoPrice = card.querySelector(".promo-price").value.trim();
  const badgePreset = card.querySelector(".badge-preset").value;
  const badgeCustomText = card.querySelector(".badge-custom").value.trim();
  const badgeColor = card.querySelector(".badge-color").value;
  const note = card.querySelector(".promo-note").value.trim();

  if(promoActive === "YES" && !promoPrice) return showMessage(els.globalMsg, "Isi Promo Price dulu kalau Promo Active = ON.", "error");
  if(badgePreset === "Custom" && !badgeCustomText) return showMessage(els.globalMsg, "Isi Custom Badge Text dulu kalau pilih Custom.", "error");

  setLoading(button, true, "Saving...");
  try{
    const result = await jsonp({mode:"savePromo", password:adminPassword, product:item.product, section:item.section || "ALL", duration:item.duration, promoActive, promoPrice, badgePreset, badgeCustomText, badgeColor, note});
    if(!result.ok) throw new Error(result.error || "Gagal save promo.");
    showMessage(els.globalMsg, `Promo ${item.groupLabel} ${item.duration} berjaya disimpan.`, "success");
    await loadData();
  }catch(error){ showMessage(els.globalMsg, "Gagal save promo: " + error.message, "error"); }
  finally{ setLoading(button, false, "Save Promo"); }
}

function findStock(product, section){
  return data.stock.find(item => normalize(item.product) === normalize(product) && normalize(item.section || "ALL") === normalize(section || "ALL"));
}

function findPromo(product, section, duration){
  return data.promos.find(item => normalize(item.product) === normalize(product) && normalize(item.section || "ALL") === normalize(section || "ALL") && normalize(item.duration) === normalize(duration));
}

function isPromoOn(item){ return normalize(item.promoActive) === "YES" || normalize(item.promoActive) === "ON"; }

function jsonp(params){
  return new Promise((resolve, reject) => {
    const callbackName = "numoCb_" + Date.now() + "_" + Math.floor(Math.random()*100000);
    const query = new URLSearchParams({...params, callback: callbackName});
    const script = document.createElement("script");
    const timer = setTimeout(() => { cleanup(); reject(new Error("Request timeout. Check Apps Script deployment.")); }, 20000);

    window[callbackName] = result => { cleanup(); resolve(result); };

    function cleanup(){
      clearTimeout(timer);
      delete window[callbackName];
      if(script.parentNode) script.parentNode.removeChild(script);
    }

    script.onerror = () => { cleanup(); reject(new Error("Network/API error. Check Web App URL.")); };
    script.src = API_URL + "?" + query.toString();
    document.body.appendChild(script);
  });
}

function switchTab(tab){
  document.querySelectorAll(".tab").forEach(btn => btn.classList.toggle("active", btn.dataset.tab === tab));
  document.querySelectorAll(".section").forEach(sec => sec.classList.toggle("active", sec.id === tab));
}

function badgeClass(color){
  const v = normalize(color);
  if(v === "GREEN") return "badge-green";
  if(v === "RED") return "badge-red";
  if(v === "BLUE") return "badge-blue";
  if(v === "PURPLE" || v === "PINK") return "badge-purple";
  if(v === "DARK" || v === "BLACK") return "badge-dark";
  return "badge-gold";
}

function setLoading(button, loading, text){
  if(!button) return;
  if(loading){ button.dataset.oldText = button.textContent; button.textContent = text || "Loading..."; button.disabled = true; }
  else{ button.textContent = button.dataset.oldText || button.textContent; button.disabled = false; }
}

function showMessage(element, message, type="info"){
  if(!element) return;
  element.textContent = message;
  element.className = "message show " + type;
  if(type === "success"){
    clearTimeout(element._timer);
    element._timer = setTimeout(() => element.classList.remove("show"), 4500);
  }
}

function normalize(value=""){ return String(value || "").trim().toUpperCase(); }
function safe(value=""){ return String(value ?? "").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"); }
function safeAttr(value=""){ return safe(value); }
