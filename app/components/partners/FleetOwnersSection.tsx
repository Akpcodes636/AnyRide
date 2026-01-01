import React from 'react';
import { Car, DollarSign, TrendingUp, Wrench } from 'lucide-react';
import SubTitle from '../ui/Subtitle';
import Button from '../ui/Button';
import { useRouter } from "next/navigation";

export default function FleetOwnersSection() {
  
  const router = useRouter();
        const gotoWaitlist = () => {
        router.push("/waitlist");
  };

  const features = [
    {
      icon: Car,
      title: "Vehicle Utilization",
      description: "Maximize your fleet's earning potential with organized driver assignments.",
      color: "text-red-500",
      bgColor: "bg-red-50"
    },
    {
      icon: DollarSign,
      title: "Revenue Sharing",
      description: "We connect you with a nearby verified driver. See their name, rating, and photo.",
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      icon: TrendingUp,
      title: "Scalable Growth",
      description: "Grow your vehicle pickup with a scale, and pay with cash or wallet.",
      color: "text-green-500",
      bgColor: "bg-green-50"
    },
    {
      icon: Wrench,
      title: "Maintenance Support",
      description: "Track your vehicles outlined pickup with a scale, and pay with cash or wallet.",
      color: "text-gray-700",
      bgColor: "bg-gray-50"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container  py-8 lg:py-16">
        <div className='flex items-center justify-center flex-col'>
            <div className='mb-[8px]'>
            <SubTitle text="STARTING NOW" />
            </div>
            <h2 className='text-center'> Fleet Owners &<br />Vehicle Partners</h2>
            <p className='text-[#545454] text-center text-[16px] md:text-[18px] leading-[160%] tracking-[-2%] max-w-[676px] mx-auto mb-[80px]'>We&apos;re beginning with the foundation of our platform - partnering with fleet owners who provide vehicles and motorcycles for our driver network. This is where you can join us immediately and grow with AnyRide from day one.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Image */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/en/fleet-1.png"
                alt="Busy street with vehicles and motorcycles"
                className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover"
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="order-1 lg:order-2">
            {/* Features List */}
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex gap-4 items-start">
                    <div className={`${feature.bgColor} p-3 rounded-lg flex-shrink-0`}>
                      <Icon className={`w-[99px] h-[80px] ${feature.color}`} />
                    </div>
                    <div>
                      <h3 className="text-[32px] font-bold text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-[16px] leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        <div className='flex items-center justify-center mt-[20px]'>
            {/* CTA Button */}
            <Button style='danger' type='button'  fn={gotoWaitlist}>
              Join Our Fleet Network
            </Button>
        </div>
      </div>
    </div>
  );
}