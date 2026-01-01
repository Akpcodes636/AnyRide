"use client";
import ContactForm from "@/app/components/contact/ContactForm";
import ContactHero from "../../components/contact/ContactHero";
// import ContactHero from "@/app/components/contact/ContactHero";
// import ContactHero from "@/app/components/contact/ContactHero";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

export default function Page(){
    return (
       <>
       <Header />
       <ContactHero />
        <ContactForm />
        <Footer />
       </>
    )
}