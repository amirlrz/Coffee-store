import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "./constance";
import Header from "./components/Header";
import 'bootstrap-icons/font/bootstrap-icons.css';
import NoticePage from "./NoticePage";
import WishPage from "./store/WishPage";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>       
        <NoticePage/>
         <Header/>
        {children}
        <WishPage />
        </StoreProvider>
      </body>
    </html>
  );
}
