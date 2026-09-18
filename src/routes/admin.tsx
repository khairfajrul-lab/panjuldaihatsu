import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CarFront, ImagePlus, LogOut, Plus, Save, Settings, Trash2 } from "lucide-react";
import { deleteVehicle, getAdminVehicles, getPublicSite, saveSiteSettings, saveVehicle, uploadVehicleImage, type CmsSiteSettings, type CmsVehicle } from "@/lib/cms";
import { supabase, supabaseConfigured } from "@/lib/supabase";

export const Route = createFileRoute("/admin")({ component: AdminDashboard });

const blankVehicle = (): CmsVehicle => ({
  slug: "mobil-baru",
  name: "Nama Mobil",
  category: "Daihatsu",
  description: "Deskripsi mobil.",
  price: "",
  installment: "",
  image: "/uploads/ayla.jpg",
  highlights: [],
  transmissions: ["Manual"],
  colors: [],
  is_active: true,
});

function AdminDashboard() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<CmsVehicle[]>([]);
  const [site, setSite] = useState<CmsSiteSettings | null>(null);
  const [selected, setSelected] = useState<CmsVehicle | null>(null);
  const [tab, setTab] = useState<"mobil" | "website">("mobil");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!supabase) { navigate({ to: "/admin/login" }); return; }
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) { navigate({ to: "/admin/login" }); return; }
      const { data: adminRow, error } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", data.session.user.id)
        .maybeSingle();
      if (error || !adminRow) {
        await supabase.auth.signOut();
        navigate({ to: "/admin/login" });
        return;
      }
      load();
    });
  }, [navigate]);

  async function load() {
    try {
      const [cars, settings] = await Promise.all([getAdminVehicles(), getPublicSite()]);
      setVehicles(cars);
      setSite(settings);
      if (!selected && cars[0]) setSelected(cars[0]);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Gagal memuat data.");
    }
  }

  async function signOut() { await supabase?.auth.signOut(); navigate({ to: "/admin/login" }); }

  async function saveCar() {
    if (!selected) return;
    setBusy(true); setMessage("");
    try {
      const saved = await saveVehicle(selected);
      setVehicles((v) => v.some((x) => x.id === saved.id) ? v.map((x) => x.id === saved.id ? saved : x) : [...v, saved]);
      setSelected(saved);
      setMessage("Mobil berhasil disimpan.");
    } catch (e) { setMessage(e instanceof Error ? e.message : "Gagal menyimpan mobil."); }
    finally { setBusy(false); }
  }

  async function removeCar() {
    if (!selected?.id || !confirm(`Hapus ${selected.name}?`)) return;
    setBusy(true);
    try {
      await deleteVehicle(selected.id);
      const rest = vehicles.filter((v) => v.id !== selected.id);
      setVehicles(rest); setSelected(rest[0] ?? null); setMessage("Mobil dihapus.");
    } catch (e) { setMessage(e instanceof Error ? e.message : "Gagal menghapus mobil."); }
    finally { setBusy(false); }
  }

  async function saveSettings() {
    if (!site) return;
    setBusy(true); setMessage("");
    try { const saved = await saveSiteSettings(site); setSite(saved); setMessage("Pengaturan website berhasil disimpan."); }
    catch (e) { setMessage(e instanceof Error ? e.message : "Gagal menyimpan pengaturan."); }
    finally { setBusy(false); }
  }

  async function uploadImage(file?: File) {
    if (!file || !selected) return;
    setBusy(true); setMessage("");
    try {
      const url = await uploadVehicleImage(file);
      setSelected({ ...selected, image: url });
      setMessage("Foto berhasil diunggah. Klik Simpan Mobil untuk menerapkan.");
    } catch (e) { setMessage(e instanceof Error ? e.message : "Gagal mengunggah foto."); }
    finally { setBusy(false); }
  }

  if (!supabaseConfigured) return <div className="p-8">Supabase belum dikonfigurasi. <Link to="/admin/login">Kembali</Link></div>;

  const update = (patch: Partial<CmsVehicle>) => setSelected((v) => v ? { ...v, ...patch } : v);
  const listText = (v: string[]) => v.join("\n");
  const parseList = (v: string) => v.split("\n").map((x) => x.trim()).filter(Boolean);

  return (
    <div className="min-h-screen bg-secondary">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div><p className="text-xs font-bold uppercase tracking-widest text-primary">Panjul Daihatsu</p><h1 className="text-xl font-extrabold">Dashboard Admin</h1></div>
          <div className="flex gap-2"><Link to="/" className="rounded-xl border border-border px-4 py-2 text-sm font-semibold">Lihat Website</Link><button onClick={signOut} className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-semibold"><LogOut className="h-4 w-4"/> Keluar</button></div>
        </div>
      </header>
      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-3xl border border-border bg-card p-4">
          <button onClick={() => setTab("mobil")} className={`mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold ${tab === "mobil" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}><CarFront className="h-4 w-4"/> Mobil</button>
          <button onClick={() => setTab("website")} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold ${tab === "website" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}><Settings className="h-4 w-4"/> Pengaturan Website</button>
          {tab === "mobil" && <div className="mt-5 space-y-2"><button onClick={() => setSelected(blankVehicle())} className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-primary px-4 py-3 text-sm font-bold text-primary"><Plus className="h-4 w-4"/> Tambah Mobil</button>{vehicles.map((v) => <button key={v.id ?? v.slug} onClick={() => setSelected(v)} className={`w-full rounded-xl px-4 py-3 text-left ${selected?.id === v.id ? "bg-secondary" : "hover:bg-secondary"}`}><div className="font-bold">{v.name}</div><div className="text-xs text-muted-foreground">{v.price}</div></button>)}</div>}
        </aside>
        <section className="rounded-3xl border border-border bg-card p-5 sm:p-7">
          {message && <div className="mb-5 rounded-xl bg-primary/10 p-3 text-sm font-semibold text-foreground">{message}</div>}
          {tab === "website" && site ? (
            <div>
              <h2 className="text-2xl font-extrabold">Pengaturan Website</h2>
              <p className="mt-1 text-sm text-muted-foreground">Edit informasi yang tersimpan di Supabase.</p>
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <label className="block text-sm font-semibold">Nama Sales<input value={site.sales_name} onChange={(e) => setSite({...site,sales_name:e.target.value})} className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 font-normal"/></label>
                <label className="block text-sm font-semibold">Nomor WhatsApp<input value={site.whatsapp_number} onChange={(e) => setSite({...site,whatsapp_number:e.target.value.replace(/\D/g,"")})} className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 font-normal"/></label>
                <label className="block text-sm font-semibold">Nomor Telepon<input value={site.phone ?? ""} onChange={(e) => setSite({...site,phone:e.target.value})} className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 font-normal"/></label>
                <label className="block text-sm font-semibold">Alamat<input value={site.address ?? ""} onChange={(e) => setSite({...site,address:e.target.value})} className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 font-normal"/></label>
                <label className="block text-sm font-semibold md:col-span-2">Judul Hero<input value={site.hero_title} onChange={(e) => setSite({...site,hero_title:e.target.value})} className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 font-normal"/></label>
                <label className="block text-sm font-semibold md:col-span-2">Subjudul Hero<textarea value={site.hero_subtitle} onChange={(e) => setSite({...site,hero_subtitle:e.target.value})} rows={4} className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 font-normal"/></label>
              </div>
              <button onClick={saveSettings} disabled={busy} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground"><Save className="h-4 w-4"/> Simpan Pengaturan</button>
            </div>
          ) : selected ? (
            <div>
              <div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-2xl font-extrabold">{selected.id ? "Edit Mobil" : "Tambah Mobil"}</h2><p className="mt-1 text-sm text-muted-foreground">Data mengikuti kolom Supabase yang sudah ada.</p></div><div className="flex gap-2"><button onClick={removeCar} disabled={!selected.id || busy} className="inline-flex items-center gap-2 rounded-xl border border-destructive/30 px-4 py-2 text-sm font-bold text-destructive"><Trash2 className="h-4 w-4"/> Hapus</button><button onClick={saveCar} disabled={busy} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"><Save className="h-4 w-4"/> Simpan Mobil</button></div></div>
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <label className="text-sm font-semibold">Nama Mobil<input value={selected.name} onChange={(e)=>update({name:e.target.value})} className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 font-normal"/></label>
                <label className="text-sm font-semibold">Slug URL<input value={selected.slug} onChange={(e)=>update({slug:e.target.value.toLowerCase().replace(/\s+/g,'-')})} className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 font-normal"/></label>
                <label className="text-sm font-semibold">Kategori<input value={selected.category} onChange={(e)=>update({category:e.target.value})} className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 font-normal"/></label>
                <label className="text-sm font-semibold">Harga<input value={selected.price} onChange={(e)=>update({price:e.target.value})} className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 font-normal" placeholder="Rp 250.000.000"/></label>
                <label className="text-sm font-semibold">Cicilan / Keterangan Kredit<input value={selected.installment ?? ""} onChange={(e)=>update({installment:e.target.value})} className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 font-normal" placeholder="Mulai Rp ... / bulan"/></label>
                <label className="text-sm font-semibold md:col-span-2">Deskripsi<textarea value={selected.description} onChange={(e)=>update({description:e.target.value})} rows={4} className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 font-normal"/></label>
                <label className="text-sm font-semibold">Keunggulan<textarea value={listText(selected.highlights)} onChange={(e)=>update({highlights:parseList(e.target.value)})} rows={6} className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 font-normal"/><span className="mt-1 block text-xs font-normal text-muted-foreground">Satu keunggulan per baris.</span></label>
                <label className="text-sm font-semibold">Transmisi<textarea value={listText(selected.transmissions)} onChange={(e)=>update({transmissions:parseList(e.target.value)})} rows={6} className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 font-normal"/><span className="mt-1 block text-xs font-normal text-muted-foreground">Satu pilihan per baris.</span></label>
                <label className="text-sm font-semibold">Warna<textarea value={listText(selected.colors)} onChange={(e)=>update({colors:parseList(e.target.value)})} rows={6} className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 font-normal"/><span className="mt-1 block text-xs font-normal text-muted-foreground">Satu warna per baris.</span></label>
                <div className="text-sm font-semibold">Foto Mobil<div className="mt-2 overflow-hidden rounded-2xl border border-border bg-secondary"><img src={selected.image} alt="Preview" className="aspect-[3/2] w-full object-cover"/></div><label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-bold"><ImagePlus className="h-4 w-4"/> Ganti Foto<input type="file" accept="image/*" className="hidden" onChange={(e)=>uploadImage(e.target.files?.[0])}/></label></div>
                <label className="flex items-center gap-3 text-sm font-semibold md:col-span-2"><input type="checkbox" checked={selected.is_active ?? true} onChange={(e)=>update({is_active:e.target.checked})} className="h-4 w-4"/> Tampilkan mobil di website</label>
              </div>
            </div>
          ) : <div className="py-20 text-center"><CarFront className="mx-auto h-10 w-10 text-muted-foreground"/><p className="mt-3 font-semibold">Pilih mobil di sebelah kiri atau tambah mobil baru.</p></div>}
        </section>
      </main>
    </div>
  );
}
