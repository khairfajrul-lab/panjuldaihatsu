import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, HandHeart, MessageCircle, Sparkles, Wallet } from "lucide-react";

import heroCar from "@/assets/hero-car.jpg";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { vehicles, waLink, WA_DEFAULT_MESSAGE } from "@/data/vehicles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Panjul Daihatsu — Temukan Mobil Daihatsu yang Cocok untuk Kamu" },
      {
        name: "description",
        content:
          "Pilihan mobil Daihatsu terbaru: Gran Max, Ayla, Sigra, Terios, Xenia, Rocky. Konsultasi gratis via WhatsApp bersama Panjul.",
      },
      { property: "og:title", content: "Panjul Daihatsu — Temukan Mobil Daihatsu yang Cocok untuk Kamu" },
      {
        property: "og:description",
        content: "Proses pembelian mudah dan cepat, dibantu langsung oleh Panjul Daihatsu.",
      },
    ],
  }),
  component: Index,
});

const reasons = [
  {
    icon: MessageCircle,
    title: "Konsultasi langsung dengan sales",
    text: "Ngobrol langsung sama saya, bukan chatbot. Tanya apa saja, santai aja.",
  },
  {
    icon: Sparkles,
    title: "Dibantu pilih unit sesuai kebutuhan",
    text: "Cerita dulu kebutuhannya, nanti saya bantu carikan yang paling pas.",
  },
  {
    icon: Wallet,
    title: "Bisa konsultasi cash maupun kredit",
    text: "Mau cash atau kredit, saya bantu hitungkan simulasi yang masuk akal.",
  },
  {
    icon: HandHeart,
    title: "Dibantu sampai serah terima",
    text: "Dari pilih unit, urus berkas, sampai mobilnya sampai di tangan kamu.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden bg-foreground text-background">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div>
            <h1 className="text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              Temukan Mobil Daihatsu yang{" "}
              <span className="text-primary">Cocok untuk Kamu</span>
            </h1>
            <p className="mt-5 max-w-lg text-base text-background/75">
              Pilihan mobil Daihatsu terbaru dengan proses pembelian yang mudah, cepat,
              dan dibantu langsung oleh Panjul Daihatsu.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#mobil"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-bold tracking-wide text-primary-foreground shadow-lg transition-transform hover:scale-[1.02]"
              >
                LIHAT PILIHAN MOBIL <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={waLink(WA_DEFAULT_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-background/30 px-6 py-3.5 text-sm font-bold tracking-wide text-background transition-colors hover:bg-background/10"
              >
                KONSULTASI GRATIS
              </a>
            </div>
            <p className="mt-6 text-xs text-background/60">
              Melayani pembelian Sulsel • Sulbar • Sultra • Sulteng
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-0 rounded-full bg-primary/25 blur-3xl" />
            <img
              src={heroCar}
              alt="Mobil Daihatsu terbaru"
              width={1600}
              height={1000}
              className="relative w-full rounded-3xl object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* PILIHAN MOBIL */}
      <section id="mobil" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 md:py-24">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Pilihan Mobil Daihatsu
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">Pilih mobil sesuai kebutuhanmu.</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((v) => (
            <article
              key={v.slug}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="overflow-hidden bg-secondary">
                <img
                  src={v.image}
                  alt={v.name}
                  loading="lazy"
                  width={1200}
                  height={800}
                  className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {v.category}
                </span>
                <h3 className="mt-3 text-lg font-extrabold tracking-tight text-card-foreground">
                  {v.name}
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">
                  {v.description}
                </p>
                <p className="mt-4 text-sm font-bold text-foreground">{v.price}</p>
                <Link
                  to="/mobil/$slug"
                  params={{ slug: v.slug }}
                  className="mt-4 inline-flex items-center justify-center rounded-2xl bg-primary px-4 py-3 text-xs font-bold tracking-wide text-primary-foreground transition-opacity hover:opacity-90"
                >
                  LIHAT DETAIL
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* KENAPA PANJUL */}
      <section id="tentang" className="scroll-mt-20 bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Kenapa Konsultasi dengan Panjul?
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {reasons.map((r) => (
              <div
                key={r.title}
                className="flex gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <r.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-card-foreground">{r.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{r.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="kontak" className="scroll-mt-20 bg-primary py-16 text-primary-foreground md:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-4xl">
            Masih Bingung Pilih Mobil?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-primary-foreground/85 sm:text-base">
            Ceritakan kebutuhanmu. Panjul bantu carikan pilihan Daihatsu yang paling sesuai.
          </p>
          <a
            href={waLink(WA_DEFAULT_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-background px-8 py-4 text-sm font-bold tracking-wide text-foreground shadow-lg transition-transform hover:scale-[1.02]"
          >
            <CheckCircle2 className="h-4 w-4" /> KONSULTASI SEKARANG
          </a>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
