import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat Ai",
  description: "Chatbot Ai for financial services",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>
            <Toaster position="top-center" />
            {children}
        </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
