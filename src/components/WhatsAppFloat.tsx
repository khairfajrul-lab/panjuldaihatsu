import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { WA_DEFAULT_MESSAGE, waLink as staticWaLink } from "@/data/vehicles";
import { getPublicSite } from "@/lib/cms";

export function WhatsAppFloat({ message }: { message?: string }) {
  const [number, setNumber] = useState<string | null>(null);
  useEffect(() => { getPublicSite().then((site) => setNumber(site.whatsapp_number)).catch(() => {}); }, []);
  const href = number ? `https://wa.me/${number}?text=${encodeURIComponent(message ?? WA_DEFAULT_MESSAGE)}` : staticWaLink(message ?? WA_DEFAULT_MESSAGE);
  return <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Chat WhatsApp" className="fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[oklch(0.62_0.19_152)] text-white shadow-lg transition-transform hover:scale-105"><MessageCircle className="h-7 w-7" /></a>;
}
