export interface FAQItem {
  id: string;
  category: "Shipping" | "Returns" | "Silk Care" | "Customization" | "Authenticity" | "Payment";
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    category: "Authenticity",
    question: "Are all products from Baishya Silk House 100% Silk Mark certified?",
    answer:
      "Yes! Every single saree, Mekhela Chador, stole, and fabric from Baishya Silk House comes with an official Silk Mark Organization of India (SMOI) hologram tag and certificate of authenticity with a unique serial code.",
  },
  {
    id: "faq-2",
    category: "Silk Care",
    question: "How should I wash and store my Muga & Pat Silk sarees?",
    answer:
      "We recommend professional dry cleaning for all gold zari and heavy silk items. Store your sarees wrapped in a soft white muslin cotton cloth in a dark wardrobe. Avoid hanging heavy sarees on metal hangers as it may stretch the silk yarns.",
  },
  {
    id: "faq-3",
    category: "Customization",
    question: "Do you offer custom blouse stitching and custom lengths?",
    answer:
      "Yes, we provide custom tailored blouse stitching according to your measurement profile. You can select 'Custom Tailored Blouse' on the product page and provide your measurements during checkout.",
  },
  {
    id: "faq-4",
    category: "Shipping",
    question: "What are your shipping timelines and charges?",
    answer:
      "We offer FREE express shipping across India on orders above ₹5,000. Express delivery takes 2-4 business days for North East & metros, and 4-6 business days for other regions. Worldwide DHL express shipping is available.",
  },
  {
    id: "faq-5",
    category: "Returns",
    question: "What is your return & exchange policy?",
    answer:
      "We offer a 7-day hassle-free return or exchange window for unused items with original tags and Silk Mark certificate intact. Custom stitched items are non-refundable but eligible for complimentary alterations.",
  },
  {
    id: "faq-6",
    category: "Payment",
    question: "Which payment options do you support?",
    answer:
      "We support all major payment methods including Credit/Debit Cards (Visa, Mastercard, Amex), UPI (Google Pay, PhonePe, Paytm), Net Banking, EMI, Razorpay, Stripe, and Cash on Delivery (COD up to ₹25,000).",
  },
];
