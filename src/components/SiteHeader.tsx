import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Menu, Music2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SITE_CONFIG } from "@/data/vehicles";
import { getPublicSite, type CmsSiteSettings } from "@/lib/cms";

const menu = [
  { label: "Home", href: "/" },
  { label: "Pilihan Mobil", href: "/#mobil" },
  { label: "Tentang Panjul", href: "/#tentang" },
  { label: "Hubungi Saya", href: "/#kontak" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [site, setSite] = useState<CmsSiteSettings>(SITE_CONFIG as CmsSiteSettings);
  useEffect(() => { getPublicSite().then(setSite).catch(() => {}); }, []);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="shrink-0 text-lg font-extrabold tracking-tight text-foreground">PANJUL <span className="text-primary">DAIHATSU</span></Link>
        <nav className="hidden items-center gap-6 md:flex">{menu.map((m) => <a key={m.label} href={m.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">{m.label}</a>)}</nav>
        <div className="hidden items-center gap-3 md:flex">
          <a href={site.facebook_url || "#"} aria-label="Facebook" className="text-muted-foreground transition-colors hover:text-primary"><Facebook className="h-4 w-4" /></a>
          <a href={site.tiktok_url || "#"} aria-label="TikTok" className="text-muted-foreground transition-colors hover:text-primary"><Music2 className="h-4 w-4" /></a>
          <a href={site.instagram_url || "#"} aria-label="Instagram" className="text-muted-foreground transition-colors hover:text-primary"><Instagram className="h-4 w-4" /></a>
        </div>
        <button className="text-foreground md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
      </div>
      {open && <nav className="border-t border-border bg-background px-4 py-4 md:hidden">
        {menu.map((m) => <a key={m.label} href={m.href} onClick={() => setOpen(false)} className="block py-2 text-sm font-medium text-foreground">{m.label}</a>)}
        <div className="mt-3 flex items-center gap-4 border-t border-border pt-3">
          <a href={site.facebook_url || "#"} aria-label="Facebook" className="text-muted-foreground"><Facebook className="h-5 w-5" /></a>
          <a href={site.tiktok_url || "#"} aria-label="TikTok" className="text-muted-foreground"><Music2 className="h-5 w-5" /></a>
          <a href={site.instagram_url || "#"} aria-label="Instagram" className="text-muted-foreground"><Instagram className="h-5 w-5" /></a>
        </div>
      </nav>}
    </header>
  );
}
