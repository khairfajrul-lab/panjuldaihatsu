# Setup Admin Panjul Daihatsu

Fitur admin menggunakan Supabase agar data mobil tersimpan online dan dapat diedit tanpa mengubah kode website.

## 1. Buat project Supabase
1. Buka https://supabase.com/ dan buat project baru.
2. Setelah project siap, buka **SQL Editor**.
3. Buka file `supabase_setup.sql` di project ini.
4. Copy semua isinya ke SQL Editor lalu klik **Run**.

## 2. Buat akun admin
1. Di Supabase buka **Authentication → Users**.
2. Pilih **Add user**.
3. Masukkan email dan password admin.
4. Jangan aktifkan pendaftaran publik jika tidak diperlukan. Cukup buat akun admin dari dashboard Supabase.

Akun login saja belum otomatis menjadi admin. UID akun harus dimasukkan ke tabel `admin_users` seperti pada langkah 3.

## 3. Hubungkan akun ke admin_users
Salin UUID user dari **Authentication → Users**, lalu jalankan SQL berikut di SQL Editor:
```sql
insert into public.admin_users (user_id)
values ('UUID-USER-ANDA')
on conflict (user_id) do nothing;
```
Hanya user yang terdaftar di `admin_users` yang boleh mengubah mobil, harga, pengaturan website, dan foto.

## 4. Ambil URL dan Anon Key
Buka **Project Settings → API** lalu ambil:
- Project URL
- Publishable/anon key (key client yang aman untuk frontend)

Simpan sebagai environment variables di Vercel **sekali saja**:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Setelah itu Anda tidak perlu mengedit sintaks untuk URL/key setiap kali mengubah data mobil. Data mobil, harga, foto, dan pengaturan website diedit dari Dashboard Admin.

Jangan pernah memasukkan `service_role` key ke website atau ke file frontend.

## 5. Deploy ulang
Setelah environment variables disimpan di Vercel, lakukan redeploy. Setelah itu buka:
`/admin/login`

Login menggunakan akun admin yang dibuat di Supabase.

## 6. Cara pakai
Di dashboard admin kamu bisa:
- tambah mobil
- ubah nama dan harga
- ubah deskripsi
- ubah keunggulan, transmisi, dan warna
- ganti foto
- sembunyikan/tampilkan mobil
- mengubah nomor WhatsApp dan informasi hero

Website publik membaca data aktif dari Supabase. Jika Supabase belum dikonfigurasi, website tetap menggunakan data bawaan project sehingga versi lama tidak langsung rusak.
