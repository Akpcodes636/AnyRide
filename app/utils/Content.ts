export const navLinks = [
  {
    title: "Home",
    router: "/",
  },
  {
    title: "About",
    router: "/about",
  },
  {
    title: "Services",
    router: "/services",
    hasDropdown: true,
  },
  {
    title: "Partners",
    router: "/partners",
  },
  {
    title: "Contact us",
    router: "/contact",
  },
];




export const AnyRideFeatures = [
    {
        number:"01",
        title:"Fast Pickups",
        text:"No long waits. Get connected to a nearby driver in seconds, wherever you are."
    },
    {
        number:"02",
        title:"Safe Trips",
        text:"Every driver and vehicle is verified. Plus, you can share your trip or reach support anytime."
    },
    {
        number:"03",
        title:"Transparent Pricing",
        text:"Know your fare before you ride. No hidden charges, no surprises — just fair pricing."
    },
    {
        number:"04",
        title:"24/7 Support",
        text:"Got a question or issue? Our team is here around the clock to help, day or night."
    }
]

export const SafetyFeatures = [
    {
        number:"01",
        title:"Verified Drivers",
        text:"Every driver and vehicle is thoroughly screened before going live. We verify identity documents, driving licenses, and background checks to ensure you’re riding with someone reliable and professional. You’ll always see your driver’s name, photo, and car details before the trip begins."
    },
    {
        number:"02",
        title:"Live Tracking",
        text:"From pickup to drop-off, you can track your ride in real time and share your trip link with friends or family for extra peace of mind. You’ll always know exactly where you are, who’s driving, and how long until you arrive — no guesswork, no worries."
    },
    {
        number:"03",
        title:"SOS & 24/7 Support",
        text:"Safety doesn’t stop once the ride starts. If anything feels off, our in-app SOS button instantly connects you to emergency support. And whether it’s day or night, our team is always available to assist you, resolve issues, and make sure every ride ends well."
    }
]

export const FaqContent = [
    {
        question:"How do I become an AnyRide driver?",
        answer:"UI Wiki is a platform that provides a collection of UI templates and resources, allowing users to purchase, customize, and integrate designs into their own projects with ease."
    },
    {
        question:"What documents do I need to register?",
        answer:"UI Wiki is a platform that provides a collection of UI templates and resources, allowing users to purchase, customize, and integrate designs into their own projects with ease."
    },
    {
        question:"How are earnings calculated?",
        answer:"UI Wiki is a platform that provides a collection of UI templates and resources, allowing users to purchase, customize, and integrate designs into their own projects with ease."
    },
    {
        question:"Can I register more than one vehicle?",
        answer:"UI Wiki is a platform that provides a collection of UI templates and resources, allowing users to purchase, customize, and integrate designs into their own projects with ease."
    }
]

export const aboutContent = [
{
    img:"/images/box.png",
    title:"Car rides",
    text:"Comfort & capacity",
    color:"#F9EEEE"
},
{
    img:"/images/box-1.png",
    title:"Motorcycles",
    text:"Speed & flexibility",
    color:"#F2F7FE"
},
{
    img:"/images/box-2.png",
    title:"Safety-first",
    text:"Verified drivers",
    color:"#F0FBF4"
}
]


export const WhyContent = [
  {
    title: "Car rides",
    text: "Best for comfort",
    points: [
      "More luggage / more space",
      "Ideal for longer trips",
    ],
  },
  {
    title: "Motorcycles",
    text: "Best for speed",
    points: [
      "Navigate traffic faster",
      "Great for short trips",
    ],
  },
];


export interface ForEveryoneItem {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
}

export const forEveryoneData: ForEveryoneItem[] = [
  {
    icon: "/icons/individual.svg",
    title: "Riders",
    subtitle: "Fast, fair, and reliable.",
    description:
      "Easy booking, clear pricing, and a safety-focused experience for everyday movement.",
  },
  {
    icon: "/icons/drivers.svg",
    title: "Drivers",
    subtitle: "Opportunity with clarity.",
    description:
      "Transparent performance, flexible earnings, and support for both car and motorcycle drivers.",
  },
  {
    icon: "/icons/partners.svg",
    title: "Partners",
    subtitle: "Scale with fleets.",
    description:
      "Fleet management and business integrations designed for companies that manage multiple vehicles.",
  },
];

export const aboutValues =[
  {
    number:"01",
    title:"Trust",
    description:"Every driver and trip is verified, ensuring peace of mind for all."
  },
  {
    number:"02",
    title:"Speed",
    description:"Quick matching, smooth rides, and instant payments — no unnecessary delays."
  },
  {
    number:"03",
    title:"Fairness",
    description:"Transparent pricing for riders, fair earnings for drivers."
  },
  {
    number:"04",
    title:"Safety",
    description:"Transparent pricing for riders, fair earnings for drivers."
  }
]