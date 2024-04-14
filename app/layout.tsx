"use client";
import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import { setupStore } from "./lib/store";
import { Provider } from "react-redux";
import { TopNavbar } from "./components/topnavbar/TopNavbar";
import clsx from "clsx";
const inter = Inter({ subsets: ["latin"] });
const store = setupStore();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [darkmode, setDarkmode] = React.useState(true);
  const handleDarkmode = (darkMode: boolean) => {
    setDarkmode(darkMode);
  };
  return (
    <html lang="en">
      <head>
        <title>Crypto App</title>            
      </head>
      <Provider store={store}>
        <body className={clsx(`${inter.className} h-full`,{
          "bg-cryptodark-400": darkmode, "bg-cryptoblue-350": !darkmode
        })}> 
          <TopNavbar />
          <Navbar handleDarkMode={handleDarkmode} />
          {children}
        </body>
      </Provider>
    </html>
  );
}
