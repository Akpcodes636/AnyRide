import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import CareersHero from "@/app/components/careers/CareersHero";
import OpenRoles from "@/app/components/careers/OpenRoles";
import CareersCTA from "@/app/components/careers/CareersCTA";

export default function CareersPage() {
    return (
        <main>
            <Header />
            <CareersHero />
            <OpenRoles />
            <CareersCTA />
            <Footer />
        </main>
    );
}
