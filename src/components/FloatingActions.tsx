"use client";

import { PhoneCall, MessageCircle } from "lucide-react";

import { cn } from "@/lib/utils";

const phone = "+201011822931";
const whatsapp = "+201011822931";

export function FloatingActions() {
  return (
    <div className="fixed inset-x-0 bottom-6 z-[70] pointer-events-none">
      <div className="mx-auto flex w-full max-w-6xl items-end justify-between px-4 sm:px-6 lg:px-8">
        <Action
          href={`tel:${phone}`}
          label="Call"
          className="pointer-events-auto"
          tone="blue"
          icon={<PhoneCall className="h-5 w-5" />}
        />

        <Action
          href={`https://wa.me/${whatsapp.replace("+", "")}`}
          label="WhatsApp"
          className="pointer-events-auto"
          tone="green"
          icon={<MessageCircle className="h-5 w-5" />}
        />
      </div>
    </div>
  );
}

function Action({
  href,
  label,
  icon,
  tone,
  className,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  tone: "blue" | "green";
  className?: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={cn(
        "group inline-flex items-center gap-2 rounded-2xl px-3 py-2.5 text-white shadow-xl backdrop-blur-md transition hover:-translate-y-0.5 focus-visible:outline-none",

        tone === "blue" &&
          "bg-blue-700 hover:bg-blue-800",

        tone === "green" &&
          "bg-emerald-600 hover:bg-emerald-700",

        className
      )}
      aria-label={label}
    >
      <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/15 ring-1 ring-white/20 transition group-hover:bg-white/20">
        {icon}
      </span>

      <span className="hidden sm:inline text-sm font-medium">
        {label}
      </span>
    </a>
  );
}