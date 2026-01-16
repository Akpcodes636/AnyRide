import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import CookiesHero from "@/app/components/cookies/CookiesHero";
import CookiesContent from "@/app/components/cookies/CookiesContent";

export default function CookiesPage() {
    return (
        <main>
            <Header />
            <CookiesHero />
            <CookiesContent />
            <Footer />
        </main>
    );
}
