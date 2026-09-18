# EDIT WEBSITE PANJUL DAIHATSU TANPA KODE

Website sekarang memakai folder `content/` sebagai sumber data. Jangan edit `src/data/vehicles.ts` langsung karena file tersebut dibuat otomatis.

## Yang bisa diedit dari dashboard
- Info utama: nama sales, WhatsApp, judul/subjudul hero, Instagram, TikTok, Facebook.
- Mobil: nama, kategori, harga, deskripsi, foto, keunggulan, transmisi, warna.

## Dashboard
Setelah deploy ke Netlify dan Git Gateway diaktifkan, buka `/admin/`. Decap CMS akan menyimpan perubahan ke repository. Netlify kemudian membangun ulang website.

## Lokal
`npm install` lalu `npm run dev`. Script generate-content otomatis mengubah YAML menjadi data React.
