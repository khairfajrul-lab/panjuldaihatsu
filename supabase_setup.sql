-- PANJUL DAIHATSU - Admin CMS
-- Jalankan seluruh file ini di Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id integer primary key default 1 check (id = 1),
  sales_name text not null default 'Panjul',
  whatsapp_number text not null default '6281341297198',
  hero_title text not null default 'Temukan Mobil Daihatsu yang Cocok untuk Kamu',
  hero_subtitle text not null default 'Konsultasi langsung dengan Panjul untuk mendapatkan pilihan unit, promo, dan simulasi kredit sesuai kebutuhan.',
  instagram_url text default '',
  tiktok_url text default '',
  facebook_url text default ''
);

create table if not exists public.cars (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text not null default 'Daihatsu',
  description text not null default '',
  price text not null default '',
  image text not null default '',
  highlights jsonb not null default '[]'::jsonb,
  transmissions jsonb not null default '[]'::jsonb,
  colors jsonb not null default '[]'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Admin allow-list: only users listed in admin_users may manage CMS data.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admin_users
    where user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

alter table public.admin_users enable row level security;

drop policy if exists "Users can view own admin record" on public.admin_users;
create policy "Users can view own admin record" on public.admin_users
  for select to authenticated using (user_id = auth.uid());

alter table public.site_settings enable row level security;
alter table public.cars enable row level security;

drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings" on public.site_settings
  for select using (true);

drop policy if exists "Authenticated can manage site settings" on public.site_settings;
drop policy if exists "Admins can manage site settings" on public.site_settings;
create policy "Admins can manage site settings" on public.site_settings
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public can read active cars" on public.cars;
create policy "Public can read active cars" on public.cars
  for select using (is_active = true);

drop policy if exists "Authenticated can manage cars" on public.cars;
drop policy if exists "Admins can manage cars" on public.cars;
create policy "Admins can manage cars" on public.cars
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

insert into public.site_settings (id) values (1) on conflict (id) do nothing;

insert into public.cars (slug,name,category,description,price,image,highlights,transmissions,colors)
values
('all-new-ayla','ALL NEW AYLA','Hatchback','Mobil compact yang praktis untuk aktivitas harian.','Mulai dari Rp XX.XXX.XXX','/uploads/ayla.jpg','["Desain compact dan modern","Irit untuk penggunaan harian","Nyaman untuk perkotaan"]','["Manual","Automatic"]','["Putih","Hitam","Merah"]'),
('new-sigra','NEW SIGRA','MPV','MPV 7 penumpang yang praktis untuk keluarga.','Mulai dari Rp XX.XXX.XXX','/uploads/sigra.jpg','["Kapasitas 7 penumpang","Praktis untuk keluarga","Perawatan mudah"]','["Manual","Automatic"]','["Putih","Silver","Hitam"]'),
('all-new-terios','ALL NEW TERIOS','SUV','SUV tangguh untuk keluarga dan perjalanan sehari-hari.','Mulai dari Rp XX.XXX.XXX','/uploads/terios.jpg','["Ground clearance tinggi","Kabinnya lega","Cocok untuk perjalanan jauh"]','["Manual","Automatic"]','["Putih","Silver","Hitam"]'),
('all-new-xenia','ALL NEW XENIA','MPV','MPV keluarga dengan kabin lega dan tampilan modern.','Mulai dari Rp XX.XXX.XXX','/uploads/xenia.jpg','["Kabin lega","Desain modern","Nyaman untuk keluarga"]','["Manual","CVT"]','["Putih","Silver","Hitam"]'),
('grand-max-pick-up','GRAND MAX PICK UP','Commercial','Partner usaha untuk berbagai kebutuhan angkut.','Mulai dari Rp XX.XXX.XXX','/uploads/granmax.jpg','["Bak luas","Tangguh untuk usaha","Biaya operasional efisien"]','["Manual"]','["Putih"]'),
('new-rocky','NEW ROCKY','SUV','SUV compact dengan tampilan sporty dan modern, cocok untuk pengguna yang menginginkan kendaraan stylish untuk aktivitas sehari-hari.','Mulai dari Rp XX.XXX.XXX','/uploads/rocky.jpg','["Desain sporty dengan pilihan two-tone","Mesin turbo yang responsif","Fitur keselamatan canggih","Compact tapi tetap nyaman di dalam"]','["Manual","Automatic (CVT)"]','["Merah Two-Tone","Hitam","Putih","Kuning"]')
on conflict (slug) do nothing;

update public.cars set updated_at = now();

insert into storage.buckets (id, name, public) values ('vehicle-images','vehicle-images',true) on conflict (id) do nothing;

drop policy if exists "Public can view vehicle images" on storage.objects;
create policy "Public can view vehicle images" on storage.objects for select using (bucket_id = 'vehicle-images');

drop policy if exists "Authenticated can upload vehicle images" on storage.objects;
create policy "Admins can upload vehicle images" on storage.objects for insert to authenticated with check (bucket_id = 'vehicle-images' and public.is_admin());

drop policy if exists "Authenticated can update vehicle images" on storage.objects;
create policy "Admins can update vehicle images" on storage.objects for update to authenticated using (bucket_id = 'vehicle-images' and public.is_admin()) with check (bucket_id = 'vehicle-images' and public.is_admin());

drop policy if exists "Authenticated can delete vehicle images" on storage.objects;
create policy "Admins can delete vehicle images" on storage.objects for delete to authenticated using (bucket_id = 'vehicle-images' and public.is_admin());
