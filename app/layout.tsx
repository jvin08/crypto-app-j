'use client'
import Head from "next/head";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import { setupStore } from './lib/store'
import { Provider } from 'react-redux'
import { TopNavbar } from "./components/topnavbar/TopNavbar";

const inter = Inter({ subsets: ["latin"] });

const store = setupStore()



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-full bg-cryptoblue-400`}>
        <Provider store={store}>
            <TopNavbar />
            <Navbar />
            {children}
        </Provider>
        </body>
    </html>
  );
}
