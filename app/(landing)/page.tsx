

import dynamic from "next/dynamic";
import ButtonGradient from "@/public/assets/svg/ButtonGradient";

const Header = dynamic(() => import("./components/Header"));
const Hero = dynamic(() => import("./components/Hero"));
const Benefits = dynamic(() => import("./components/Benefits"));
const Collaboration = dynamic(() => import("./components/Collaboration"));
const Services = dynamic(() => import("./components/Services"));
const Pricing = dynamic(() => import("./components/Pricing"));
const Roadmap = dynamic(() => import("./components/Roadmap"));
const Footer = dynamic(() => import("./components/Footer"));

const LandingPage = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Hero />
        <Benefits />
        <Collaboration />
        <Services />
        <Pricing />
        <Roadmap />
        <Footer />
      </div>
      <ButtonGradient />
    </>
  );
};

export default LandingPage;
