import { Facebook, Instagram, Music2 } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-xl font-extrabold tracking-tight">
              PANJUL <span className="text-primary-foreground/80">DAIHATSU</span>
            </p>
            <p className="mt-2 max-w-sm text-sm text-background/70 italic">
              "Jual mobil itu biasa, bantu orang punya mobil itu saya."
            </p>
            <p className="mt-3 text-sm text-background/70">Astra Daihatsu Makassar Alauddin</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Facebook" className="rounded-full border border-background/20 p-2 transition-colors hover:border-background/60">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" aria-label="TikTok" className="rounded-full border border-background/20 p-2 transition-colors hover:border-background/60">
              <Music2 className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Instagram" className="rounded-full border border-background/20 p-2 transition-colors hover:border-background/60">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="mt-10 border-t border-background/15 pt-6 text-center text-xs text-background/60">
          © 2026 Panjul Daihatsu. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
