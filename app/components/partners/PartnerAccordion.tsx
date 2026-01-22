import { useState } from 'react';
import { ChevronUp, ChevronDown, Fuel, Shield, Users, Truck, Building2, Banknote, Smartphone, Map, AlertCircle } from 'lucide-react';

export default function PartnerAccordion() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    fuel: true,
    compliance: false,
    driver: false,
    vehicle: false,
    government: false,
    finance: false,
    hardware: false,
    mapping: false,
    emergency: false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const partners = [
    {
      id: 'fuel',
      title: 'Fuel & Energy Partners',
      subtitle: 'Maximise your fleet\'s earning potential with guaranteed driver placements.',
      icon: Fuel,
      bgColor: 'bg-red-700',
      includes: [
        'Fuel station networks',
        'Petroleum and energy companies',
        'Fuel card providers',
        'Energy distribution companies'
      ],
      matters: [
        'Fuel affordability for drivers',
        'Operational cost stability',
        'Driver retention and satisfaction'
      ]
    },
    {
      id: 'compliance',
      title: 'Compliance, Insurance & Risk Partners',
      subtitle: 'Ensure regulatory compliance and comprehensive coverage for your fleet operations.',
      icon: Shield,
      bgColor: 'bg-blue-700',
      includes: [
        'Insurance providers and brokers',
        'Risk management consultants',
        'Compliance software platforms',
        'Legal advisory services',
        'Safety audit firms'
      ],
      matters: [
        'Regulatory compliance assurance',
        'Financial risk mitigation',
        'Driver and passenger protection',
        'Legal liability coverage'
      ]
    },
    {
      id: 'driver',
      title: 'Driver Associations & Transport Organizations',
      subtitle: 'Connect with driver networks and transport industry bodies.',
      icon: Users,
      bgColor: 'bg-green-700',
      includes: [
        'Driver unions and associations',
        'Transport worker organizations',
        'Industry advocacy groups',
        'Professional driver networks',
        'Trade associations'
      ],
      matters: [
        'Driver welfare and rights protection',
        'Industry representation and advocacy',
        'Professional development opportunities',
        'Fair working conditions'
      ]
    },
    {
      id: 'vehicle',
      title: 'Vehicle Suppliers & Dealerships',
      subtitle: 'Access quality vehicles and maintenance services for your fleet expansion.',
      icon: Truck,
      bgColor: 'bg-purple-700',
      includes: [
        'Authorized vehicle dealerships',
        'Fleet vehicle suppliers',
        'Leasing and financing companies',
        'Maintenance and repair centers',
        'Spare parts distributors'
      ],
      matters: [
        'Vehicle quality and reliability',
        'Competitive pricing and financing',
        'After-sales support and warranty',
        'Fleet expansion capabilities'
      ]
    },
    {
      id: 'government',
      title: 'Government & Regulatory Bodies',
      subtitle: 'Navigate regulatory requirements with official government partnerships.',
      icon: Building2,
      bgColor: 'bg-indigo-700',
      includes: [
        'Transport regulatory authorities',
        'Licensing and permit offices',
        'Road safety agencies',
        'Environmental compliance bodies',
        'Tax and revenue services'
      ],
      matters: [
        'Legal operating permissions',
        'Regulatory compliance standards',
        'Policy advocacy and influence',
        'Industry development support'
      ]
    },
    {
      id: 'finance',
      title: 'Banks & Financial Institutions',
      subtitle: 'Secure financial solutions and payment infrastructure for seamless operations.',
      icon: Banknote,
      bgColor: 'bg-teal-700',
      includes: [
        'Commercial banks',
        'Payment processing companies',
        'Microfinance institutions',
        'Digital wallet providers',
        'Credit and loan facilities'
      ],
      matters: [
        'Secure payment processing',
        'Driver financial inclusion',
        'Fleet financing options',
        'Transaction fee optimization'
      ]
    },
    {
      id: 'hardware',
      title: 'Smartphone & Hardware Partners',
      subtitle: 'Provide drivers with reliable technology and hardware solutions.',
      icon: Smartphone,
      bgColor: 'bg-orange-700',
      includes: [
        'Smartphone manufacturers',
        'Device distributors and retailers',
        'Accessories and peripherals suppliers',
        'Telematics hardware providers',
        'Mobile network operators'
      ],
      matters: [
        'Driver app performance and reliability',
        'Affordable device access',
        'Technical support availability',
        'Connectivity and network coverage'
      ]
    },
    {
      id: 'mapping',
      title: 'Mapping, Navigation & Local Data Partners',
      subtitle: 'Deliver accurate routing and location services with local expertise.',
      icon: Map,
      bgColor: 'bg-cyan-700',
      includes: [
        'Mapping and GPS providers',
        'Traffic data analytics companies',
        'Local points of interest databases',
        'Geographic information systems',
        'Real-time traffic monitoring services'
      ],
      matters: [
        'Accurate and efficient routing',
        'Reduced fuel consumption',
        'Improved customer experience',
        'Local market knowledge'
      ]
    },
    {
      id: 'emergency',
      title: 'Emergency & Safety Partners',
      subtitle: 'Ensure driver and passenger safety with emergency response capabilities.',
      icon: AlertCircle,
      bgColor: 'bg-rose-700',
      includes: [
        'Emergency response services',
        'Medical assistance providers',
        'Roadside assistance companies',
        'Security and monitoring services',
        'Crisis management teams'
      ],
      matters: [
        'Rapid emergency response',
        'Driver and passenger safety',
        'Incident management support',
        'Trust and platform credibility'
      ]
    }
  ];

  return (
    <div className="max-w-full mx-auto p-6  min-h-screen">
     
      <div className="space-y-3">
        {partners.map((partner) => (
          <div 
            key={partner.id}
            className="bg-[#F6E6E680] border border-gray-200 rounded-lg overflow-hidden"
          >
            {/* Header */}
            <button
              onClick={() => toggleSection(partner.id)}
              className="w-full px-6 py-4 flex items-start justify-between transition-colors"
            >
              <div className="text-left flex-1">
                {/* <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {partner.title}
                </h3> */}
                {!openSections[partner.id as keyof typeof openSections] && (
                  <p className="text-sm text-gray-600">
                    {partner.subtitle}
                  </p>
                )}
              </div>
              {openSections[partner.id as keyof typeof openSections] ? (
                <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
              )}
            </button>

            {/* Expanded Content */}
            {openSections[partner.id as keyof typeof openSections] && (
              <div className="px-6 pb-6 pt-2">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`${partner.bgColor} p-3 rounded-lg flex-shrink-0`}>
                    <partner.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className='flex flex-col'>
                   <div>
                   <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {partner.title}
                </h3>
                  <p className="text-sm text-gray-600 pt-2">
                    {partner.subtitle}
                  </p>
                   </div>
                   

                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Who this includes */}
                  <div className=" bg-white p-5 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Who this includes:
                    </h4>
                    <ul className="space-y-3">
                      {partner.includes.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                              <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2"/>
                              <path d="M8 12l3 3 5-5" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span className="text-sm text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Why they matter */}
                  <div className="bg-white p-5 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Why they matter:
                    </h4>
                    <ul className="space-y-3">
                      {partner.matters.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                              <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2"/>
                              <path d="M8 12l3 3 5-5" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span className="text-sm text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}