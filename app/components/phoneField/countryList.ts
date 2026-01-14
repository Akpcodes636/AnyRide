export interface CountryConfig {
  name: string;
  code: string;
  flag: string;
  dialCode: string;
}

export const countryList: CountryConfig[] = [
  {
    name: "Congo (DRC)",
    code: "+243",
    flag: "🇨🇩",
    dialCode: "243",
  },
  {
    name: "United States",
    code: "+1",
    flag: "🇺🇸",
    dialCode: "1",
  },
  {
    name: "United Kingdom",
    code: "+44",
    flag: "🇬🇧",
    dialCode: "44",
  },
  // Add more countries...
];