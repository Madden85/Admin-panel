/***********************
 * NUMO ADMIN PANEL - APP2.JS
 * TEMPAT EDIT TEXT BUTTON / LABEL SAHAJA
 *
 * Cara edit:
 * - Tukar text sebelah kanan sahaja
 * - Jangan ubah nama key sebelah kiri
 ***********************/

window.NUMO_ADMIN_TEXT = {
  // Top buttons
  refresh: "Refresh",
  logout: "Logout",
  login: "Login",
  checking: "Checking...",
  loading: "Loading...",
  saving: "Saving...",

  // Login
  passwordLabel: "Admin Password",
  passwordPlaceholder: "Masukkan password admin",

  // Tabs
  tabDashboard: "Dashboard",
  tabStock: "Stock",
  tabPromo: "Promo",

  // Dashboard labels
  stockOnLabel: "Stock ON",
  stockOffLabel: "Stock OFF",
  promoOnLabel: "Promo Aktif",
  editLabel: "Edit",
  noStockOff: "Tiada produk/device yang OFF.",
  noPromoActive: "Tiada promo aktif.",

  // Stock labels
  textWhenOff: "Text bila OFF",
  statusLabel: "Status",
  onLabel: "ON",
  offLabel: "OFF",
  save: "Save",
  setupNeeded: "SETUP NEEDED",
  stockOffTextDefault: "Habis Stok",
  liveStockLabel: "Live Database Stock",
  customerViewLabel: "Paparan Customer",
  manualControlLabel: "Manual Control",
  slotAvailableLabel: "slot available",
  readyCustomerLabel: "READY",
  habisCustomerLabel: "HABIS STOK",
  closedManualLabel: "DITUTUP MANUAL",
  databaseNotFoundLabel: "Data live tidak dijumpai",
  databaseSourceLabel: "Sumber live",

  // Promo labels
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

  // Messages
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

  // New tabs
  tabHotSelling: "Hot Selling",
  tabReseller: "Reseller",
  tabLead: "Lead",

  // New dashboard counters
  hotSellingVisibleLabel: "Hot Selling Visible",
  resellerActiveLabel: "Reseller Aktif",
  totalLeadLabel: "Total Lead",

  // Hot Selling
  noHotSelling: "Tiada item Hot Selling dijumpai.",
  hotSellingStatus: "Status Hot Selling",
  positionLabel: "Position",
  hotBadgeLabel: "Badge Hot Selling",
  hiddenLabel: "Disorok",
  visibleLabel: "VISIBLE",
  saveHotSelling: "Save Hot Selling",
  saveHotSellingSuccess: "Hot Selling berjaya disimpan.",
  saveHotSellingFailed: "Gagal save Hot Selling: ",
  hotSellingRuleText: "Harga Hot Selling ikut Promo Control. Item hanya keluar di website apabila promo aktif dan ada harga promo.",
  hotSellingLimitTitle: "Hot Selling Aktif",
  hotSellingMaxText: "Maximum 3 pakej sahaja boleh diaktifkan pada satu masa.",
  hotSellingSearchPlaceholder: "Cari produk atau pakej",
  hotFilterAll: "Semua pakej",
  hotFilterOn: "Hot Selling ON",
  hotFilterPromo: "Promo Aktif",
  hotFilterVisible: "Visible di Website",
  hotLimitError: "Maximum 3 Hot Selling sahaja dibenarkan. Tutup salah satu Hot Selling yang sedang aktif dahulu.",
  promoNotReady: "Promo belum aktif / tiada harga promo",

  // Reseller
  resellerSearchPlaceholder: "Cari nama atau Telegram reseller",
  noReseller: "Tiada reseller dijumpai.",
  telegramUsernameLabel: "Telegram Username",
  resellerNameLabel: "Nama Reseller",
  leadCountLabel: "Lead Count",
  lastAssignedLabel: "Last Assigned",
  saveReseller: "Save Reseller",
  saveResellerSuccess: "Reseller berjaya disimpan.",
  saveResellerFailed: "Gagal save reseller: ",

  // Lead
  leadTotalLabel: "Jumlah Lead",
  leadAssignedLabel: "Assigned",
  leadReassignedLabel: "Reassigned",
  leadDistributionTitle: "Agihan Lead Mengikut Reseller",
  noLead: "Belum ada lead direkodkan."
};
