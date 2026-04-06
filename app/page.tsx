import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import ProductSection from "@/components/ProductSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden selection:bg-primary selection:text-white">
      <Navbar />
      <Hero />
      <FeaturesSection />
      <ProductSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
