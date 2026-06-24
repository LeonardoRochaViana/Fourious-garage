import BookingForm from "@/components/BookingForm";
import Contact from "@/components/Contact";
import Differentials from "@/components/Differentials";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Packages from "@/components/Packages";
import Products from "@/components/Products";
import Services from "@/components/Services";

export default function Home() {
  return (
    <main className="min-h-screen bg-garage-black text-white">
      <Header />
      <Hero />
      <Services />
      <Packages />
      <BookingForm />
      <Products />
      <Differentials />
      <Contact />
      <Footer />
    </main>
  );
}
