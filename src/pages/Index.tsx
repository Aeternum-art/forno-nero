import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import MenuPreview from "@/components/MenuPreview";
import Experience from "@/components/Experience";
import Reservation from "@/components/Reservation";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <Philosophy />
          <MenuPreview />
          <Experience />
          <Reservation />
          <Location />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;