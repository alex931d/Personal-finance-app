import "@/styles/globals.css";

import { Toaster } from "@/components/ui/sonner";
import { APP_TITLE } from "@/lib/constants";
import { fontPublicSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { TRPCReactProvider } from "@/trpc/react";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: {
    default: APP_TITLE,
    template: `%s | ${APP_TITLE}`,
  },
  description: "",
  icons: [{ rel: "icon", url: "/icon.png" }],
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontPublicSans.variable,
        )}
      >

          <TRPCReactProvider>{children}</TRPCReactProvider>
          <Toaster />

      </body>
    </html>
  );
}
