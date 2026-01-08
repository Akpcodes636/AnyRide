"use client";
import HeroSearchDesktop from "./HeroSearchDesktop";
import HeroSearchMobile from "./HeroSearchMobile";


const HeroSearch = () => {
  return (
    <div>
      <div className="block md:hidden lg:hidden">
        <HeroSearchMobile />
      </div>

      <div className="hidden md:block lg:block">
        <HeroSearchDesktop />
      </div>
    </div>
  );
};

export default HeroSearch;
