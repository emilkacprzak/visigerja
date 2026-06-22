import Ceremony from "../components/ceremony/Ceremony";
import Countdown from "../components/countdown/Countdown";
import Footer from "../components/footer/Footer";
import Hero from "../components/Hero/Hero";
import Navigation from "../components/navigation/Navigation";
import Photos from "../components/photos/Photos";
import Travel from "../components/travel/Travel";
import WeddingCeremony from "../components/weddingCeremony/WeddingCeremony";

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <Ceremony />
      <Countdown />
      <WeddingCeremony />
      <Travel />
      <Photos />
      <Footer />
    </>
  );
}
