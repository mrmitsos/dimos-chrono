import InitalLoadActiveUsers from "@/components/InitalLoadActiveUsers";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GoogleAnalytics gaId="G-1NL3SEY1V5" />
      <InitalLoadActiveUsers />
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
