"use client";
import Faq from "@/app/components/driver/Faq";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import AnyRide from "@/app/components/home/AnyRide";
import HeroRider from "@/app/components/rider/HeroRider";


const Rider = () => {
    return (
        <section>
            <div>
                <Header />
                <HeroRider />
                <Faq />
                <AnyRide />
                <Footer />
            </div>
        </section>
)
}

export default Rider;