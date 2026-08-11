import "./globals.css";

export const metadata = {
  title: "ZOX | Contemporary Clothing",
  description: "Contemporary clothing designed for everyday confidence.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
