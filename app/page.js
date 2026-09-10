import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Systems from "@/components/Systems";
import Trades from "@/components/Trades";
import Process from "@/components/Process";
import WhyStone from "@/components/WhyStone";
import Press from "@/components/Press";
import Partners from "@/components/Partners";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full overflow-hidden">
      <Header />
      <Hero />
      <Systems />
      <Trades />
      <Process />
      <WhyStone />
      <Press />
      <Partners />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}