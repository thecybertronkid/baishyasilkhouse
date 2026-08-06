import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        silk: {
          ivory: "#FDFBF7",
          cream: "#FAF6F0",
          maroon: "#58111A",
          "maroon-dark": "#400A12",
          "maroon-light": "#7A1C2B",
          gold: "#D4AF37",
          "gold-dark": "#997A23",
          "gold-light": "#E5C158",
          emerald: "#0A382C",
          "emerald-dark": "#06241C",
          "emerald-light": "#134E3D",
          black: "#1A1A1A",
          charcoal: "#2B2B2B",
          beige: "#F5EFE6",
          sand: "#E8DFC8",
        },
      },
      fontFamily: {
        serif: ["var(--font-cinzel)", "Georgia", "serif"],
        sans: ["var(--font-outfit)", "Inter", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 20px 40px -15px rgba(212, 175, 55, 0.15)",
        card: "0 10px 30px -10px rgba(0, 0, 0, 0.05)",
        floating: "0 15px 35px rgba(88, 17, 26, 0.12)",
      },
      animation: {
        "shimmer": "shimmer 2.5s infinite linear",
        "pulse-glow": "pulse-glow 3s infinite ease-in-out",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.03)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
