import type { Metadata } from "next";
import Head from 'next/head'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { dark,neobrutalism } from '@clerk/themes';
import { ThemeProvider } from "@/components/theme-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Online Dev Compiler",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: neobrutalism,
        userButton:{
          baseTheme:neobrutalism
        },

      }}>
      <html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
        <body className={inter.className}>
         
            <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            storageKey="theme-nextjs"
            disableTransitionOnChange
            enableSystem
          
            >
              <Toaster />
              {children}
            </ThemeProvider>
         
        </body>
      </html>
    </ClerkProvider>
  );
}
