"use client";
import Header from "@/app/components/Header";
import HeroWaitList from "../../components/waitlist/HeroWaitList";
import WaitForm from "@/app/components/waitlist/WaitForm";
import Footer from "@/app/components/Footer";
import WaitlistFaq from "@/app/components/waitlist/WaitlistFaq";



export default function Page(){
    return (
        <>
        <Header />
        <HeroWaitList />
        <WaitlistFaq />
        <Footer />
        </>
    )
}
