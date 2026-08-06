export interface Artisan {
  id: string;
  name: string;
  role: string;
  village: string;
  experienceYears: number;
  specialty: string;
  quote: string;
  image: string;
}

export const ARTISANS: Artisan[] = [
  {
    id: "art-1",
    name: "Master Weaver Biren Baishya",
    role: "Head Master Artisan & Jacquard Specialist",
    village: "Sualkuchi, Kamrup, Assam",
    experienceYears: 38,
    specialty: "Pure 24K Zari Muga Silk Weaving",
    quote: "When I sit at my handloom, each shuttle movement is a prayer to Goddess Kamakhya. Muga silk is not just thread; it is the golden blood of Assam.",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "art-2",
    name: "Prabhati Kalita",
    role: "Senior Pat Silk Motif Designer",
    village: "Bhatipara, Sualkuchi",
    experienceYears: 24,
    specialty: "Traditional Kingkhap & Jaapi Minakari",
    quote: "Every floral motif on a Mekhela Chador tells a secret story of nature, river, and feminine resilience.",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "art-3",
    name: "Tarun Das",
    role: "Eri Ahimsa Silk Spinner & Weaver",
    village: "Rani Reserve Forest Fringe, Assam",
    experienceYears: 19,
    specialty: "Hand-spun Organic Eri Silk",
    quote: "We respect every living creature. Spinning Eri silk after the moth flies free keeps our soil, silkworms, and traditions pure.",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=1200",
  },
];
