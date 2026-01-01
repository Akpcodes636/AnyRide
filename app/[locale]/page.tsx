"use client";
import Footer from "../components/Footer";
import Header from "../components/Header";
import About from "../components/home/About";
import AnyRide from "../components/home/AnyRide";
import Blog from "../components/home/Blog";
import Hero from "../components/home/hero/Hero";
import Pricing from "../components/home/Pricing/Pricing";
import Safety from "../components/home/Safety";
import Values from "../components/home/Values";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <AnyRide />
      <Values />
      <Pricing />
      <Safety />
      <Blog />
      <Footer />
    </>
  );
}
