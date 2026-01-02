"use client";
import Header from "@/app/components/Header";
import HeroWaitList from "../../components/waitlist/HeroWaitList";
import Footer from "@/app/components/Footer";
import WaitlistFaq from "@/app/components/waitlist/WaitlistFaq";
// export const dynamic = 'force-dynamic'; // Add this line
// export const revalidate = 0;


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
