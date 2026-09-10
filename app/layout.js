import "./globals.css";

export const metadata = {
  title: "Stone Systems",
  description: "Website Design & Marketing Systems For Contractors",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}