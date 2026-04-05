"use client";

import { useEffect, useRef } from "react";

interface CalEmbedProps {
  calLink: string;
  className?: string;
}

declare global {
  interface Window {
    Cal?: {
      (action: string, ...args: unknown[]): void;
      q?: unknown[][];
      ns?: Record<string, unknown>;
      loaded?: boolean;
    };
  }
}

export function CalEmbed({ calLink, className = "" }: CalEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Load Cal.com embed script
    const script = document.createElement("script");
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;
    script.onload = () => {
      if (window.Cal) {
        window.Cal("init", { origin: "https://app.cal.com" });
        window.Cal("inline", {
          elementOrSelector: containerRef.current!,
          calLink,
          config: {
            theme: "dark",
            hideEventTypeDetails: false,
          },
        });
        window.Cal("ui", {
          theme: "dark",
          cssVarsPerTheme: {
            dark: {
              "cal-brand": "#C9A84C",
              "cal-text": "#F5F0E8",
              "cal-text-emphasis": "#F5F0E8",
              "cal-border-default": "#2A3C5B",
              "cal-bg": "#0A1628",
              "cal-bg-emphasis": "#132035",
            },
          },
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      script.remove();
    };
  }, [calLink]);

  return (
    <div
      ref={containerRef}
      className={`min-h-[400px] overflow-hidden rounded-sm ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
