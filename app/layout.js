import { Inter } from "next/font/google";
import "./css/card.scss";
import "./css/globals.scss";
import ClientWrapper from "./ClientWrapper";
import { MusicPermissionProvider } from "./context/MusicPermissionContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Strike's Portfolio",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  description: "A developer portfolio showcasing my skills, projects, and experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MusicPermissionProvider>
        <ClientWrapper>{children}</ClientWrapper>
        </MusicPermissionProvider>
      </body>
    </html>
  );
}
