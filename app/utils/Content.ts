
export const navLinks = [
  { key: "about", router: "/about" },
  { key: "rider", router: "/services/rider" },
  { key: "fleet", router: "/fleet" },
  { key: "driver", router: "/services/driver" },
  { key: "partners", router: "/partners" },
  { key: "contactUs", router: "/contact" }
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
    question:"Who can join the waitlist?",
    answer: "Anyone interested in using AnyRide can join the waitlist. It’s open to riders, drivers, and partners.",
  },
  {
    question:"Is joining free?",
    answer: "Yes! Joining the waitlist is completely free.",
  },
  {
    question: "How will I be contacted?",
    answer: "We’ll contact you via the email address you provided when signing up for the waitlist.",
  },
];


export const rider =[
  { 
    img:"/images/rider.png",
    title:"Step 1: Set your trip",
    description:"Enter your pickup and destination, choose a car or motorcycle, and see your price upfront."
  },
  {
    img:"/images/rider-1.png",
    title:"Step 2: Get matched",
    description:"We connect you with a nearby verified driver. See their name, vehicle, and arrival time instantly."
  },
  {
    img:"/images/rider-2.png",
    title:"Step 3: Ride & pay",
    description:"Track your trip live, confirm pickup with a code, and pay with cash or wallet."
  }
]

export const pricingClarity = [
  { key: "baseFare", img: "/icons/wallet-1.webp" },
  { key: "perKm", img: "/icons/cars.webp" },
  { key: "perMinutes", img: "/icons/partner.webp" }
];

export const benefits = [
  { number: "01", key: "upfrontPricing", color: "#F8EAEA" },
  { number: "02", key: "carsMotorcycles", color: "#EFF5FE" },
  { number: "03", key: "verifiedDrivers", color: "#EDFAF1" },
  { number: "04", key: "localFirst", color: "#E6E6EB" }
];


export const benefitsDriver = [
  {
    number:"01",
    title:"Flexible work",
    description:"Go online anytime. No fixed shifts.",
    color:"#F8EAEA"
  },
  {
    number:"02",
    title:"Fair earnings",
    description:"Transparent fares and clear breakdowns.",
    color:"#EFF5FE"
  },
  {
    number:"03",
    title:"Multiple vehicles",
    description:"Register more than one car or bike and switch anytime.",
    color:"#EDFAF1"
  },
  {
    number:"04",
    title:"Local support",
    description:"Real people, real help when you need it.",
    color:"#E6E6EB"
  }
]


export const driverContent =[
  { 
    img:"/images/Driver-1.png",
    title:"Step 1: Sign up",
    description:"Create your driver account in minutes."
  },
  {
    img:"/images/Driver-2.png",
    title:"Step 2: Upload documents",
    description:"Submit your ID, license, and vehicle details for review."
  },
  {
    img:"/images/Driver-3.png",
    title:"Step 3: Get verified",
    description:"Our team reviews and approves your profile."
  },
  {
    img:"/images/Driver-4.png",
    title:"Step 4: Go online & earn",
    description:"Select your vehicle, go online, and start receiving trips."
  }
]

 export const featureContent = [
    "Daily and weekly earnings summary",
    "Completed trips overview",
    "Wallet balance and payout history"
 ];



 export const eligibleFleetOwners = [
  {
    title: "Owners of multiple taxis",
    description:
      "Operate and manage several taxis under a single, centralized platform.",
    icon: "/images/icons.png",
  },
  {
    title: "Transport companies",
    description:
      "Run structured transport operations with coordinated vehicles and drivers.",
    icon: "/images/icons.png",
  },
  {
    title: "Ride service operators",
    description:
      "Scale ride services with better dispatch, monitoring, and payouts.",
    icon: "/images/icons.png",
  },
  {
    title: "Corporate shuttle providers",
    description:
      "Manage employee or organizational transport with scheduled, reliable operations.",
    icon: "/images/icons.png",
  },
  {
    title: "Vehicle leasing businesses",
    description:
      "Deploy leased vehicles efficiently with tracked usage and performance.",
    icon: "/images/icons.png",
  },
  {
    title: "Entrepreneurs managing hired drivers",
    description:
      "Operate driver-led vehicles as a structured, income-generating business.",
    icon: "/images/icons.png",
  },
];


export const values = [
  {
    number: "01",
    title: "Centralized Fleet Dashboard",
    description:
      "Monitor all vehicles, drivers, and operations from a single management interface.",
  },
  {
    number: "02",
    title: "Driver Performance Tracking",
    description:
      "Track individual driver metrics, ratings, and activity across your fleet.",
  },
  {
    number: "03",
    title: "Automated Payouts & Reporting",
    description:
      "Receive consolidated financial reports and automated payout processing.",
  },
  {
    number: "04",
    title: "Higher Vehicle Utilization",
    description:
      "Maximize vehicle usage and earning potential through efficient driver assignment.",
  },
  {
    number: "05",
    title: "Scalable Operations",
    description:
      "Grow your fleet efficiently with tools designed for multi-vehicle management.",
  },
  {
    number: "06",
    title: "Reduced Manual Coordination",
    description:
      "Minimize administrative overhead with platform-managed scheduling and dispatch.",
  },
];

export const steps = [
  {
    number: "01",
    title: "Register as Fleet Owner",
    description:
      "Submit your owner application with business and vehicle information.",
  },
  {
    number: "02",
    title: "Add Vehicles & Drivers",
    description:
      "Register your vehicles and assign qualified drivers to each vehicle.",
  },
  {
    number: "03",
    title: "Track Performance",
    description:
      "Monitor rides, earnings, driver performance, and vehicle utilization in real time.",
  },
  {
    number: "04",
    title: "Receive Payouts",
    description:
      "Get consolidated earnings reports and automated payouts for all fleet activity.",
  },
];


export const fleetFeatures = [
  {
    title: "Fleet Overview Dashboard",
    description: "Real-time view of all vehicles, active drivers, and current operations across your fleet.",
    img: "/images/icons.webp",
  },
  {
    title: "Vehicle Management",
    description: "Add, remove, and manage vehicle profiles with registration and compliance tracking.",
    img: "/images/icons.webp",
  },
  {
    title: "Driver Assignment",
    description: "Assign and reassign drivers to vehicles with flexible scheduling capabilities.",
    img: "/images/icons.webp",
  },
  {
    title: "Earnings & Payout Reports",
    description: "Consolidated financial reporting showing earnings by vehicle, driver, and time period.",
    img: "/images/icons.webp",
  },
  {
    title: "Performance Analytics",
    description: "Track key metrics including utilization rates, driver ratings, and fleet efficiency.",
    img: "/images/icons.webp",
  },
  {
    title: "Support Access",
    description: "Direct access to fleet owner support team for operational assistance.",
    img: "/images/icons.webp",
  },
];

 
export const partnerFeatures = [
  {
    img: "/images/Icon.png",
    title: "Expand into structured, high growth transportation ecosystems",
    description: "Expand into structured, high growth transportation ecosystems",
  },
  {
    img: "/images/Bulb.png",
    title: "Technology Driven Transport Operations",
    description: "Operate with modern, data-enabled mobility infrastructure",
  },
  {
    img: "/images/Aim.png",
    title: "Compliance First Platform Design",
    description: "Built to align with regulation, safety, and risk requirements",
  },
  {
    img: "/images/partner.png",
    title: "Scalable Partnership Models",
    description: "Flexible structures that grow with operational needs",
  },
];



export const partnershipSteps = [
  {
    step: 1,
    title: "Submit partnership interest",
    description:
      "Provide basic information about their organization, partnership category, and proposed area of collaboration through the inquiry form.",
  },
  {
    step: 2,
    title: "AnyRide reviews and engages",
    description:
      "The AnyRide team reviews the submission, assesses strategic and operational alignment, and engages relevant partners for further discussions where applicable.",
  },
  {
    step: 3,
    title: "Partnership structure and rollout",
    description:
      "Approved partnerships are structured with clear roles, responsibilities, and timelines, followed by coordinated rollout and operational integration.",
  },
];


export const partnerTrustCards = [
  {
    title: "Compliance First Operations",
    description:
      "Our platform prioritizes legal compliance, documentation, and structured operations to support government, financial, and institutional partners.",
    icon: "/images/icons.png",
  },
  {
    title: "Safety Focused Partnerships",
    description:
      "We work with partners who strengthen safety standards, risk management, and emergency response across the transportation ecosystem.",
    icon: "/images/icons.png",
  },
  {
    title: "Built for Emerging Markets",
    description:
      "AnyRide is purpose-built for African transport environments, balancing innovation with infrastructure, policy, and operational constraints.",
    icon: "/images/icons.png",
  },
];


export const ourMission = [
  {
    img:"/images/icons-2.png",
    title:"Modernizing transportation",
    text:"We are building modern transportation systems that replace fragmented and informal operations with structured, technology‑enabled mobility solutions."
  },
  {
    img:"/images/lock-icons.png",
    title:"Creating structured, compliant systems",
    text:"AnyRide is designed around compliance, accountability, and operational discipline—supporting transportation models that align with regulation and long‑term sustainability."
  },
  {
    img:"/images/partners-icons.png",
    title:"Supporting drivers, operators,and cities",
    text:"Our platform serves the entire ecosystem, enabling drivers and operators to work more efficiently while helping cities improve access to reliable mobility."
  },
  {
   img:"/images/cars.png",
   title:"Building reliable mobility infrastructure",
   text:"We focus on creating dependable transportation infrastructure that institutions, businesses, and communities can trust and scale over time."
  }
]

export const items = [
  "Building systems that matter",
  "Working across technology and operations",
  "Solving real transportation challenges",
  "Growing with the company as it scales",
];

export const items2 = [
  "Early team members shape systems",
  "Opportunity to grow into leadership roles",
  "Long-term impact over short-term hype",
  "Real responsibility, real ownership"
]


export const weekData = [
  { label: "10km", value: 800 },
  { label: "20km", value: 1400 },
  { label: "30km", value: 2586 },
  { label: "40km", value: 2200 },
  { label: "50km", value: 3000 },
];

export const monthData = [
  { label: "10km", value: 1200 },
  { label: "20km", value: 2100 },
  { label: "30km", value: 1800 },
  { label: "40km", value: 2700 },
  { label: "50km", value: 3200 },
];

export const yearData = [
  { label: "10km", value: 2000 },
  { label: "20km", value: 2800 },
  { label: "30km", value: 2400 },
  { label: "40km", value: 3100 },
  { label: "50km", value: 2900 },
];


export const Africanpayment =[
  {
    img:"/images/anypay.png",
  },
  {
    img:"/images/airtel.png",
  },
  {
    img:"/images/pesapal.png",
  },
  {
    img:"/images/equitel-logo.png"
  },
  {
    img:"/images/IntaSend.png"
  },
  {
    img:"/images/Mpesa.png"
  },
  {
    img:"/images/momo.png"
  },
  {
    img:"/images/opay.png"
  },
  {
    img:"/images/orange.png"
  },
]

export const Americanpayments = [
  {
    img:"/images/payoner.png"
  },
  {
    img:"/images/gpay.png"
  },
  {
    img:"/images/paypal.png"
  },
  {
    img:"/images/zelle.png"
  },
  {
    img:"/images/cash.png"
  },
  {
    img:"/images/group.png"
  },
  {
    img:"/images/Skrill.png"
  },
  {
    img:"/images/wordpay.png"
  },
  {
    img:"/images/wise-1.png"
  }
]

export const cardPayment = [
  {
    img:"/images/masterCard.png"
  },
  {
    img:"/images/visa.png"
  },
  {
    img:"/images/verve.png"
  }
]

export const SECURITY_ITEMS = [
  {
    id: "password",
    title: "Set/Change Password",
    description: "Create a strong password to secure your account and personal information.",
    type: "link",
    route: "/account/login/set-password",
  },
  {
    id: "pin",
    title: "Set/Change PIN",
    description: "Set a quick 4-digit PIN to log in and confirm key actions instantly.",
    type: "link",
    route: "/account/login/reset-password",
  },
  {
    id: "biometric",
    title: "Allow Biometric",
    description: "Set a quick 4-digit PIN to log in and confirm key actions instantly.",
    type: "toggle",
    route: null,
  },
];

export const rides = [
  {
    id: 1,
    label: "Today",
    status: "Completed",
    statusColor: "text-green-600 bg-green-50 border border-green-200",
    pickup: "4827 Willowbrook Lane, OH 44126",
    destination: "123 Main St, Springfield, IL 62704",
  },
  {
    id: 2,
    label: "Yesterday",
    status: "Completed",
    statusColor: "text-green-600 bg-green-50 border border-green-200",
    pickup: "4827 Willowbrook Lane, OH 44126",
    destination: "123 Main St, Springfield, IL 62704",
  },
  {
    id: 3,
    label: "Sun, 25 Sept • 22:06",
    status: "Cancelled",
    statusColor: "text-red-500 bg-red-50 border border-red-200",
    pickup: "4827 Willowbrook Lane, OH 44126",
    destination: "123 Main St, Springfield, IL 62704",
  },
];

export const signupContent = [
  {
    img:"/images/globe.png",
    text:"Choose when you’re online"
  },
  {
    img:"/images/bike.png",
    text:"Drive with your car or motorcycle"
  },
  {
    img:"/images/wallet-1.png",
    text:"Get paid per trip, transparently"
  }
]

export const stepOne = [
  {
    id: 1,
    label: "Personal Information",
    route: "/drivers/driver-requirements/getting-started/personal-information",
    badge: { text: "Verified", color: "bg-[#E9F9EE] text-[8px] leading-[120%] border border-[#22C553] text-green-600" },
  },
  {
    id: 2,
    label: "Valid ID & driver's license",
    route: "/drivers/verifications/drivers-license",
    badge: { text: "Verified", color: "bg-[#E9F9EE] text-[8px] leading-[120%] border border-[#22C553] text-green-600" },
  },
  {
    id: 3,
    label: "Vehicle details (you can add more than one)",
    route: "/drivers/my-vehicles",
    badge: { text: "Verification required", color: "bg-[#FEF5E7] border border-[#F59E0B] text-[8px] text-[#F59E0B] leading-[120%]" },
  },
  {
    id: 4,
    label: "Clear photos for verification",
    route: "/drivers/verifications/profile-photo",
    badge: { text: "Verification required", color: "bg-[#FEF5E7] border border-[#F59E0B] text-[8px] text-[#F59E0B] leading-[120%]" },
  },
];


export const requests = [
    {
      id: 1,
      name: "Mike Brown",
      code: "CF 1084",
      pickup: "4827 Willowbrook Lane, OH 45056",
      dropoff: "123 Main St, Springfield, IL 62701",
    },
    {
      id: 2,
      name: "Mike Brown",
      code: "CF 1084",
      pickup: "4827 Willowbrook Lane, OH 45056",
      dropoff: "123 Main St, Springfield, IL 62701",
    },
  ];

