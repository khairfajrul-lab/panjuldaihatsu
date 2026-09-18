import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, MessageCircle } from "lucide-react";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { vehicles, waCarMessage, waLink } from "@/data/vehicles";

export const Route = createFileRoute("/mobil/$slug")({
  loader: ({ params }) => {
    const vehicle = vehicles.find((v) => v.slug === params.slug);
    if (!vehicle) throw notFound();
    return { vehicle };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Unit tidak ditemukan — Panjul Daihatsu" }, { name: "robots", content: "noindex" }],
      };
    }
    const { vehicle } = loaderData;
    const title = `${vehicle.name} — Panjul Daihatsu`;
    return {
      meta: [
        { title },
        { name: "description", content: vehicle.description },
        { property: "og:title", content: title },
        { property: "og:description", content: vehicle.description },
      ],
    };
  },
  component: VehicleDetail,
});

function VehicleDetail() {
  const { vehicle } = Route.useLoaderData();
  const message = waCarMessage(vehicle.name);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-14">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali ke pilihan mobil
        </Link>

        <div className="mt-6 grid gap-10 md:grid-cols-2">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            width={1200}
            height={800}
            className="w-full rounded-3xl border border-border object-cover shadow-sm"
          />

          <div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {vehicle.category}
            </span>
            <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              {vehicle.name}
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">{vehicle.description}</p>

            <h2 className="mt-8 text-sm font-bold text-foreground">Highlight Keunggulan</h2>
            <ul className="mt-3 space-y-2">
              {vehicle.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <h2 className="text-sm font-bold text-foreground">Pilihan Transmisi</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {vehicle.transmissions.map((t) => (
                    <span
                      key={t}
                      className="rounded-xl border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-sm font-bold text-foreground">Pilihan Warna</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {vehicle.colors.map((c) => (
                    <span
                      key={c}
                      className="rounded-xl border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-sm">
              <p className="text-xs text-muted-foreground">Harga</p>
              <p className="mt-1 text-xl font-extrabold text-card-foreground">{vehicle.price}</p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  href={waLink(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center rounded-2xl bg-primary px-5 py-3.5 text-xs font-bold tracking-wide text-primary-foreground transition-opacity hover:opacity-90"
                >
                  TANYA HARGA
                </a>
                <a
                  href={waLink(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-border px-5 py-3.5 text-xs font-bold tracking-wide text-foreground transition-colors hover:bg-secondary"
                >
                  <MessageCircle className="h-4 w-4" /> WHATSAPP
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
      <WhatsAppFloat message={message} />
    </div>
  );
}
