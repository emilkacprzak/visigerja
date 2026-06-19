import Ceremony from "../components/ceremony/Ceremony";
import Countdown from "../components/countdown/Countdown";
import Footer from "../components/footer/Footer";
import Hero from "../components/Hero/Hero";
import Photos from "../components/photos/Photos";
import Travel from "../components/travel/Travel";

export default function Home() {
  return (
    <>
      <Hero />
      <Ceremony />
      <Countdown />
      <Travel />
      <Photos />
      <Footer />
    </>
  );
}
