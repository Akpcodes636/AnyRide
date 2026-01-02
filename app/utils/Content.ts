// export const navLinks = [
//   {
//     title: "About",
//     router: "/about",
//   },
//   {
//     title: "Rider",
//     router: "/services/rider",
//   },
//   {
//     title: "Driver",
//     router: "/services/driver"
//   },
//   {
//     title: "Partners",
//     router: "/partners",
//   },
//   {
//     title: "Contact us",
//     router: "/contact",
//   },
// ];


export const navLinks = [
  { key: "about", router: "/about" },
  { key: "rider", router: "/services/rider" },
  { key: "driver", router: "/services/driver" },
  { key: "partners", router: "/partners" },
  { key: "contactUs", router: "/contact" },
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


export const FaqContents = [
  {
    "question": "Who qualifies as a partner?",
    "answer": "Partners are individuals or businesses who own vehicles and wish to provide rides through the AnyRide platform. They must meet our vehicle and driver eligibility requirements."
  },
  {
    "question": "Can I register motorcycles only?",
    "answer": "Yes, we allow motorcycles as well as cars, but the vehicle type must meet local safety and licensing regulations."
  },
  {
    "question": "How do payouts work?",
    "answer": "Payouts are processed weekly and are transferred directly to your bank account. You can also view your earnings and transaction history in the app."
  },
  {
    "question": "Can I manage multiple drivers?",
    "answer": "Yes, fleet owners can manage multiple drivers under a single account. Each driver will have a separate profile, and you can monitor their activity and earnings."
  },
  {
    "question": "Is there a minimum fleet size?",
    "answer": "There is no strict minimum fleet size for individual drivers, but for business partners managing fleets, having multiple vehicles may unlock additional features and incentives."
  }
]

export const waitlistFAQ = [
  {
    question: "When will the platform launch?",
    answer: "We’re preparing for our MVP launch very soon. Everyone on the waitlist will be notified first.",
  },
  {
    question: "Who can join the waitlist?",
    answer: "Anyone interested in using AnyRide can join the waitlist. It’s open to riders, drivers, and partners.",
  },
  {
    question: "Is joining free?",
    answer: "Yes! Joining the waitlist is completely free.",
  },
  {
    question: "How will I be contacted?",
    answer: "We’ll contact you via the email address you provided when signing up for the waitlist.",
  },
];
