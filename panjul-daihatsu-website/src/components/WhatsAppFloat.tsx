import { MessageCircle } from "lucide-react";
import { WA_DEFAULT_MESSAGE, waLink } from "@/data/vehicles";

export function WhatsAppFloat({ message }: { message?: string }) {
  return (
    <a
      href={waLink(message ?? WA_DEFAULT_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp"
      className="fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[oklch(0.62_0.19_152)] text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
