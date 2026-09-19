import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Image from "next/image";
import PublicHome from "@/components/PublicHome";

export default function Home() {
  return <div className="w-full min-h-screen bg-white">
    <Nav />
    <PublicHome />
    <Footer />
  </div>;
}
