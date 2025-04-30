
import { ListingProps } from "@/types/listing";

// Mock data for listings
const mockListings: ListingProps[] = [
  {
    id: "1",
    title: "Vintage Wooden Desk",
    price: 12000,
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop",
    location: "Mumbai, India",
    type: "sell",
    featured: true,
    seller: {
      name: "John D.",
      id: "user1"
    },
    createdAt: new Date("2023-04-15"),
    description: "Beautiful vintage wooden desk with solid oak construction. Features three spacious drawers and a warm finish. Perfect for a home office or study. Dimensions: 120cm x 70cm x 78cm. Condition: Excellent, minor signs of use.",
    keywords: ["desk", "wooden", "vintage", "office"],
    coordinates: {
      lat: 19.0760,
      lng: 72.8777
    },
    impactMetrics: {
      carbonSaved: 15,
      wasteDiverted: 8
    }
  },
  {
    id: "2",
    title: "Mountain Bike - Weekly Rental",
    price: 3500,
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop",
    location: "Delhi, India",
    type: "rent",
    featured: true,
    seller: {
      name: "Sarah M.",
      id: "user2"
    },
    createdAt: new Date("2023-04-20"),
    description: "High-quality mountain bike available for rent. Perfect for weekend adventures or exploring the city. Well-maintained with recent service. Includes helmet and basic repair kit.",
    keywords: ["bike", "bicycle", "mountain", "rental", "outdoor"],
    coordinates: {
      lat: 28.7041,
      lng: 77.1025
    },
    impactMetrics: {
      carbonSaved: 8,
      wasteDiverted: 0
    }
  },
  {
    id: "3",
    title: "Professional Camera Kit",
    price: 49900,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop",
    location: "Bangalore, India",
    type: "sell",
    featured: true,
    seller: {
      name: "Michael R.",
      id: "user3"
    },
    createdAt: new Date("2023-04-18"),
    description: "Professional DSLR camera with two lenses (18-55mm and 70-300mm), camera bag, tripod, and additional battery. Perfect for photography enthusiasts or professionals. Excellent condition with all original packaging.",
    keywords: ["camera", "dslr", "photography", "professional"],
    coordinates: {
      lat: 12.9716,
      lng: 77.5946
    }
  },
  {
    id: "4",
    title: "Camping Equipment - Weekend Rental",
    price: 7500,
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop",
    location: "Chennai, India",
    type: "rent",
    seller: {
      name: "Emily K.",
      id: "user4"
    },
    createdAt: new Date("2023-04-22"),
    description: "Complete camping set for weekend getaways. Includes 4-person tent, sleeping bags, portable stove, and lantern. Everything you need for an outdoor adventure.",
    keywords: ["camping", "outdoor", "tent", "weekend", "adventure"],
    coordinates: {
      lat: 13.0827,
      lng: 80.2707
    }
  },
  {
    id: "5",
    title: "Leather Office Chair",
    price: 8500,
    image: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=800&auto=format&fit=crop",
    location: "Mumbai, India",
    type: "sell",
    seller: {
      name: "Robert L.",
      id: "user5"
    },
    createdAt: new Date("2023-04-21"),
    description: "Ergonomic leather office chair with adjustable height and armrests. Very comfortable for long working hours. In excellent condition with minor wear.",
    keywords: ["chair", "office", "leather", "ergonomic"],
    coordinates: {
      lat: 19.0825,
      lng: 72.8900
    }
  },
  {
    id: "6",
    title: "Electric Scooter - Monthly Rental",
    price: 15000,
    image: "https://images.unsplash.com/photo-1591370569489-a3aaec66df63?w=800&auto=format&fit=crop",
    location: "Delhi, India",
    type: "rent",
    seller: {
      name: "Jessica T.",
      id: "user6"
    },
    createdAt: new Date("2023-04-23"),
    description: "Eco-friendly electric scooter available for monthly rental. Ideal for daily commutes in the city. Includes charger and helmet. Range of approximately 50km on a single charge.",
    keywords: ["scooter", "electric", "commute", "eco-friendly"],
    coordinates: {
      lat: 28.7200,
      lng: 77.1100
    }
  },
  {
    id: "8",
    title: "Designer Sofa",
    price: 25000,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop",
    location: "Delhi, India",
    type: "sell",
    featured: true,
    seller: {
      name: "Priya K.",
      id: "user8"
    },
    createdAt: new Date("2023-04-25"),
    description: "Modern designer sofa in excellent condition. Three-seater with premium fabric upholstery. Perfect for contemporary living rooms. Barely used, still looks new.",
    keywords: ["sofa", "furniture", "designer", "modern"],
    coordinates: {
      lat: 28.7100,
      lng: 77.1200
    }
  },
  {
    id: "9",
    title: "Drone - Weekend Rental",
    price: 2500,
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&auto=format&fit=crop",
    location: "Bangalore, India",
    type: "rent",
    seller: {
      name: "Ravi M.",
      id: "user9"
    },
    createdAt: new Date("2023-04-26"),
    description: "High-quality drone with 4K camera available for weekend rental. Perfect for events, photoshoots, or exploring. Includes extra batteries and carrying case.",
    keywords: ["drone", "camera", "aerial", "photography"],
    coordinates: {
      lat: 12.9800,
      lng: 77.6000
    }
  },
  {
    id: "10",
    title: "Musical Keyboard",
    price: 18000,
    image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&auto=format&fit=crop",
    location: "Pune, India",
    type: "sell",
    seller: {
      name: "Anjali D.",
      id: "user10"
    },
    createdAt: new Date("2023-04-27"),
    description: "61-key digital piano with stand, bench, and headphones. Various instrument sounds and recording function. Great for beginners and intermediate players.",
    keywords: ["keyboard", "piano", "music", "instrument"],
    coordinates: {
      lat: 18.5204,
      lng: 73.8567
    }
  },
  // New featured listings with real-life product images
  {
    id: "11",
    title: "Handcrafted Ceramic Pottery Set",
    price: 4500,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&auto=format&fit=crop",
    location: "Jaipur, India",
    type: "sell",
    featured: true,
    seller: {
      name: "Meera S.",
      id: "user11"
    },
    createdAt: new Date("2023-05-02"),
    description: "Beautiful handmade ceramic pottery set including 4 plates, 4 bowls, and 4 mugs. Each piece is unique with a natural glaze finish. Perfect for everyday use or special occasions.",
    keywords: ["pottery", "ceramic", "handmade", "kitchenware"],
    coordinates: {
      lat: 26.9124,
      lng: 75.7873
    },
    impactMetrics: {
      carbonSaved: 5,
      wasteDiverted: 3
    }
  },
  {
    id: "12",
    title: "Vintage Record Player",
    price: 9800,
    image: "https://images.unsplash.com/photo-1593078166039-c9878df5c520?w=800&auto=format&fit=crop",
    location: "Kolkata, India",
    type: "sell",
    featured: true,
    seller: {
      name: "Vikram J.",
      id: "user12"
    },
    createdAt: new Date("2023-05-05"),
    description: "Fully restored vintage record player from the 1970s. Beautiful wooden case with new belt drive and stylus. Delivers warm, authentic sound quality. Includes a collection of 10 classic vinyl records.",
    keywords: ["record player", "vinyl", "vintage", "music"],
    coordinates: {
      lat: 22.5726,
      lng: 88.3639
    },
    impactMetrics: {
      carbonSaved: 22,
      wasteDiverted: 6
    }
  },
  {
    id: "13",
    title: "Professional Art Supplies Kit",
    price: 5500,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop",
    location: "Chennai, India",
    type: "sell",
    featured: true,
    seller: {
      name: "Karthik N.",
      id: "user13"
    },
    createdAt: new Date("2023-05-08"),
    description: "Complete professional art supplies kit including acrylic paints, oil paints, watercolors, brushes, canvases, and sketch pads. Perfect for artists of all levels. All items are in excellent condition with minimal use.",
    keywords: ["art", "supplies", "painting", "creative"],
    coordinates: {
      lat: 13.0827,
      lng: 80.2707
    }
  },
  {
    id: "14",
    title: "E-Bike - Monthly Rental",
    price: 8500,
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&auto=format&fit=crop",
    location: "Pune, India",
    type: "rent",
    featured: true,
    seller: {
      name: "Neha R.",
      id: "user14"
    },
    createdAt: new Date("2023-05-10"),
    description: "Premium electric bike available for monthly rental. Perfect for commuting and exploring. Features a powerful motor with 80km range, LCD display, and 7-speed Shimano gears. Includes helmet and security lock.",
    keywords: ["e-bike", "electric", "bicycle", "commute"],
    coordinates: {
      lat: 18.5204,
      lng: 73.8567
    },
    impactMetrics: {
      carbonSaved: 35,
      wasteDiverted: 0
    }
  },
  {
    id: "15",
    title: "Handwoven Sustainable Rug",
    price: 7200,
    image: "https://images.unsplash.com/photo-1584184924103-e310d9dc82fc?w=800&auto=format&fit=crop",
    location: "Ahmedabad, India",
    type: "sell",
    featured: true,
    seller: {
      name: "Divya P.",
      id: "user15"
    },
    createdAt: new Date("2023-05-12"),
    description: "Beautiful handwoven rug made from 100% sustainable materials by local artisans. Features a traditional pattern with contemporary colors. Size: 150cm x 210cm. Perfect for living rooms or bedrooms.",
    keywords: ["rug", "carpet", "handwoven", "sustainable"],
    coordinates: {
      lat: 23.0225,
      lng: 72.5714
    },
    impactMetrics: {
      carbonSaved: 12,
      wasteDiverted: 8
    }
  },
  {
    id: "16",
    title: "Professional DJ Equipment - Weekend Rental",
    price: 12000,
    image: "https://images.unsplash.com/photo-1461784180009-21121b2f204c?w=800&auto=format&fit=crop",
    location: "Mumbai, India",
    type: "rent",
    featured: true,
    seller: {
      name: "Rahul S.",
      id: "user16"
    },
    createdAt: new Date("2023-05-15"),
    description: "Complete DJ setup available for weekend rental. Includes Pioneer CDJ-2000NXS2 players, DJM-900NXS2 mixer, studio monitors, headphones, and all necessary cables. Perfect for parties and events.",
    keywords: ["dj", "equipment", "music", "party", "event"],
    coordinates: {
      lat: 19.0760,
      lng: 72.8777
    }
  },
  {
    id: "17",
    title: "Antique Brass Telescope",
    price: 15500,
    image: "https://images.unsplash.com/photo-1501686637-b7aa9c48a882?w=800&auto=format&fit=crop",
    location: "Delhi, India",
    type: "sell",
    featured: true,
    seller: {
      name: "Arun K.",
      id: "user17"
    },
    createdAt: new Date("2023-05-18"),
    description: "Beautiful antique brass telescope with wooden tripod. Dating from the early 1900s, fully functional and in excellent condition. Perfect for collectors or as a decorative piece. Comes with original leather case.",
    keywords: ["telescope", "antique", "brass", "collectible"],
    coordinates: {
      lat: 28.7041,
      lng: 77.1025
    },
    impactMetrics: {
      carbonSaved: 18,
      wasteDiverted: 5
    }
  },
  {
    id: "18",
    title: "Gaming Console Bundle",
    price: 32000,
    image: "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=800&auto=format&fit=crop",
    location: "Bangalore, India",
    type: "sell",
    featured: true,
    seller: {
      name: "Suresh M.",
      id: "user18"
    },
    createdAt: new Date("2023-05-20"),
    description: "Complete gaming console bundle including console, 2 controllers, 10 popular games, charging dock, and headset. All items in excellent condition with original packaging. Perfect for gaming enthusiasts.",
    keywords: ["gaming", "console", "video games", "entertainment"],
    coordinates: {
      lat: 12.9716,
      lng: 77.5946
    }
  }
];

// Helper function to get listing by ID
export const getListingById = (id: string): ListingProps | null => {
  return mockListings.find(listing => listing.id === id) || null;
};

// Helper function to get listings by type
export const getListingsByType = (type: "sell" | "rent" | "recycle" | "donate"): ListingProps[] => {
  return mockListings.filter(listing => listing.type === type);
};

// Helper function to get featured listings
export const getFeaturedListings = (limit: number = 6): ListingProps[] => {
  // First get featured listings
  const featured = mockListings.filter(listing => listing.featured);
  // If we don't have enough featured listings, add non-featured
  if (featured.length < limit) {
    const nonFeatured = mockListings
      .filter(listing => !listing.featured)
      .slice(0, limit - featured.length);
    return [...featured, ...nonFeatured];
  }
  return featured.slice(0, limit);
};

export default mockListings;
