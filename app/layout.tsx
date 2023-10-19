import "./globals.css";
import type { Metadata } from "next";

import ActiveStatus from "./components/ActiveStatus";

import ToasterContext from "./context/ToasterContext";
import AuthContext from "./context/AuthContext";

export const metadata: Metadata = {
  title: "Messenger Clone",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
