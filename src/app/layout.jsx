import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import Providers from "./providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className="mx-4 bg-gray-200 md:mx-48 xl:mx-96">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
