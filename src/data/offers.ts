export const specialOffers = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800&h=800",
    title: "Summer Glow Up",
    shortDescription: "Book any facial and get 50% off",
    description: "Revitalize your skin this summer with our premium facial treatments.",
    discount: "50% OFF",
    code: "GLOW50",
    gradient: "bg-gradient-to-br from-purple-500 to-indigo-800",
    includedServices: ["O3+ Facial", "Prime Facial", "Clean Up", "Natures De-tan"]
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&q=80&w=800&h=800",
    title: "Bridal Package",
    shortDescription: "Complete styling & makeup",
    description: "Complete bridal styling, premium makeup, and pre-wedding skin prep.",
    discount: "FLAT ₹2000 OFF",
    code: "BRIDE2K",
    gradient: "bg-gradient-to-br from-rose-500 to-pink-700",
    includedServices: ["Bridal Makeup", "Hair Styling", "Premium Facial", "De-tan & Clean-up"]
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800&h=800",
    title: "Gentlemen's Cut",
    shortDescription: "Haircut & Beard styling combo",
    description: "The ultimate grooming experience including precision haircut and beard styling.",
    discount: "20% OFF",
    code: "MENS20",
    gradient: "bg-gradient-to-br from-slate-600 to-gray-800",
    includedServices: ["Hair Cut", "Beard Styling", "Beard Shave", "Head Massage"]
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800&h=800",
    title: "Weekend Reset",
    shortDescription: "Relaxing head massage & spa",
    description: "Unwind and relax with our signature hair spa and scalp massage therapies.",
    discount: "FLAT 15% OFF",
    code: "RELAX15",
    gradient: "bg-gradient-to-br from-emerald-500 to-teal-800",
    includedServices: ["L'Oreal Hair Spa", "Anti Dandruff Hair Spa", "Head Massage"]
  }
];

export const getOfferById = (id: number) => {
  return specialOffers.find((offer) => offer.id === id);
};
