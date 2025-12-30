"use client";
import MobileNav from "./NavBar/MobileNav";
import Navbar from "./NavBar/Navbar";


const Header = () => {
    return (
        <header className="bg-white fixed left-0 right-0 top-0 z-50 shadow-xs">
            <div className="py-5.25">
                <MobileNav />
                <Navbar />
            </div>
        </header>
    )
}

export default Header;