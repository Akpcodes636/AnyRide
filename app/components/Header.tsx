"use client";

import MobileNav from "./nav/MobileNav";
import Navbar from "./nav/Navbar";


const Header = () => {
    return (
        <header className="bg-white h-[90px] w-full fixed left-0 right-0 top-0 z-50 shadow-xs">
            <div className="">
                <MobileNav />
                <Navbar />
            </div>
        </header>
    )
}

export default Header;