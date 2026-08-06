export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  content: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    slug: "muga-silk-the-golden-treasure-of-assam",
    title: "Muga Silk: Why Assam's Golden Yarns Last Generations",
    excerpt: "Discover the secret behind Muga silk's natural metallic golden luster that grows brighter with every wash and outlasts human lifespans.",
    category: "Heritage & Craft",
    readTime: "6 min read",
    date: "August 2, 2026",
    author: "Biren Baishya",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200",
    content: [
      "In the lush Brahmaputra valley of Assam lives Antheraea assamensis—a wild silkworm that feeds exclusively on Som and Soalu tree leaves. The cocoon it spins produces a yarn unlike any other on Earth: natural, un-dyed metallic gold.",
      "For centuries, Muga silk was strictly reserved for the royalty of the Ahom Kingdom. Royal decree prohibited anyone outside the royal household from wearing full Muga garments during state banquets.",
      "Unlike ordinary mulberry silks that deteriorate over time, genuine Muga silk fibers possess extraordinary tensile strength. In fact, a genuine Muga silk saree often outlasts the person who bought it, passed down through three to four generations as a treasured heirloom.",
    ],
  },
  {
    id: "blog-2",
    slug: "how-to-spot-genuine-silk-mark-certification",
    title: "How to Identify 100% Pure Indian Silk & Avoid Counterfeits",
    excerpt: "A complete guide to performing the burn test, checking Silk Mark hologram labels, and understanding weaving textures.",
    category: "Silk Care & Guide",
    readTime: "5 min read",
    date: "July 24, 2026",
    author: "Dr. Dipali Sarma",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=1200",
    content: [
      "With synthetic polyester imitate silks flooding online marketplaces, knowing how to verify authentic silk is essential before making a luxury investment.",
      "The Silk Mark Organization of India (SMOI), backed by the Ministry of Textiles, issues QR-coded holograms to certified handloom weavers.",
      "The simple burn test: Extract a tiny thread from the fringe. Pure silk burns slowly with a distinct smell of burning hair, leaving a fine crushable black ash. Synthetic fibers melt quickly, smelling of plastic and leaving a hard plastic bead.",
    ],
  },
  {
    id: "blog-3",
    slug: "eri-peace-silk-the-future-of-sustainable-luxury",
    title: "Eri Silk: The Eco-Friendly 'Ahimsa' Silk of Kamrup",
    excerpt: "Why conscious fashion lovers around the globe are embracing non-violent Eri silk for autumn & winter luxury apparel.",
    category: "Sustainability",
    readTime: "4 min read",
    date: "July 10, 2026",
    author: "Pranab Kalita",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=1200",
    content: [
      "Traditional silk extraction involves boiling silkworm cocoons while the pupa is inside. Eri silk, however, follows the principle of Ahimsa (non-violence).",
      "The moth is allowed to naturally cut open its cocoon and fly away before the silk filaments are harvested and hand-spun on traditional spinning wheels.",
      "The resulting fabric has a rich, fleece-like texture with natural thermal insulation properties.",
    ],
  },
];
