import Navbar from "@/components/home/Navbar";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import ExamplesSection from "@/components/home/ExamplesSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <ExamplesSection />
    </main>
  );
}
