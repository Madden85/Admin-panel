NUMO VENTURES - STEP 4 ADMIN PANEL V2

PENTING:
Admin Panel V2 perlukan Apps Script V3 JSONP.
Sebab admin panel versi lama mungkin tak jadi disebabkan browser/CORS bila call Apps Script dari hosting luar.

FAIL DALAM ZIP:
1. APPS_SCRIPT_V3.txt
2. admin.html
3. admin.js

LINK APPS SCRIPT DALAM admin.js:
https://script.google.com/macros/s/AKfycbwqqBJ1A9tqYhPhEJe37Ik3-HGKZOHUUHqdf_jtLJuTv8tqQpt6WqX5jUBQwKPMbM92tw/exec

CARA PASANG:

STEP A - UPDATE APPS SCRIPT
1. Buka Apps Script website control kau.
2. Buka Code.gs.
3. Select all dan delete semua code lama.
4. Copy semua code dalam APPS_SCRIPT_V3.txt.
5. Paste ke Code.gs.
6. Save.
7. Deploy > Manage deployments.
8. Tekan icon pensel/edit pada Web App yang sedia ada.
9. Version pilih New version.
10. Tekan Deploy.
11. Test link:
   https://script.google.com/macros/s/AKfycbwqqBJ1A9tqYhPhEJe37Ik3-HGKZOHUUHqdf_jtLJuTv8tqQpt6WqX5jUBQwKPMbM92tw/exec?mode=ping

Kalau betul, version akan jadi:
SIMPLE-V3-JSONP

STEP B - UPLOAD ADMIN PANEL
1. Upload admin.html dan admin.js ke folder website hosting yang sama.
2. Buka admin.html.
3. Login guna password Apps Script.
   Default password dalam code:
   numo12345

TEST WAJIB:
1. Login admin panel.
2. Pergi Stok Produk.
3. Set VIU PREMIUM kepada OFF.
4. Tekan Save Stock.
5. Check Google Sheet STOCK_CONTROL, row VIU PREMIUM patut jadi OFF.
6. Refresh website customer, semua plan Viu patut jadi Habis Stok.
7. Set balik VIU PREMIUM kepada ON.
8. Test Promo Plan:
   - Netflix 1 Bulan
   - Promo Active ON
   - Promo Price RM20
   - Badge Preset Hot Promo
   - Badge Color Red
   - Save Promo
9. Check Google Sheet PROMO_CONTROL.

NOTA:
- Google Sheet tetap database sahaja.
- Kau control semua dari admin panel.
- Jangan share admin.html/password kepada orang lain.
