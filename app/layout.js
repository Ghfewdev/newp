import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Home",
  description: "home",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className="bg-[#f0fdf0] font-mono">
        <Navbar />
        <div className="mt-[100px]">
          {children}
        </div>
        <Footer />
      </body>

    </html>
  );
}
