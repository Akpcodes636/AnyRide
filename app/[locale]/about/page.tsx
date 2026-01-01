"use client";
import AboutHero from "@/app/components/about/AboutHero";
import WhatWeDo from "@/app/components/about/WhatWeDo";
import Header from "@/app/components/Header";
import Vision from "../../components/about/Vision";
import Why from "../../components/about/Why";
import WhereWeOperate from "../../components/about/WhereWeOperate";
import ForEveryone from "../../components/about/ForEveryone";
import Trust from "../../components/about/Trust";
import OurValues from "../../components/about/OurValues";
import Rider from "../../components/about/Rider";
import OurPromise from "../../components/about/OurPromise";
import Footer from "../../components/Footer";
// import Vision from "../../components/about/Vision";
// import Why from "../../components/about/Why";
// import WhereWeOperate from "../../components/about/WhereWeOperate";
// import ForEveryone from "../../components/about/ForEveryone";
// import Trust from "../../components/about/Trust";
// import OurValues from "../../components/about/OurValues";
// import Rider from "../../components/about/Rider";
// import OurPromise from "../../components/about/OurPromise";
// import Footer from "../../components/Footer";

export default function About() {
  return (
    <>
      <Header />
      <AboutHero />
      <WhatWeDo />
      <Vision />
      <Why />
      <WhereWeOperate />
      <ForEveryone />
      <Trust />
      <OurValues />
      <Rider />
      <OurPromise />
      <Footer />
    </>
  );
}
