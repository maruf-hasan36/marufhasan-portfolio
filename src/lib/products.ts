import fitDumbbells from "@/assets/fit-dumbbells.jpg";
import fitSmartwatch from "@/assets/fit-smartwatch.jpg";
import fitSupplement from "@/assets/fit-supplement.jpg";
import fitBands from "@/assets/fit-bands.jpg";
import fitJumprope from "@/assets/fit-jumprope.jpg";
import fitYogamat from "@/assets/fit-yogamat.jpg";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  inStock: boolean;
  features: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "NeuroDumb Pro X",
    description: "AI-powered smart dumbbells with real-time rep counting, form analysis, and adaptive resistance feedback via integrated LED display.",
    price: 349,
    image: fitDumbbells,
    category: "Equipment",
    rating: 4.9,
    inStock: true,
    features: ["AI Rep Counter", "Form Analysis", "LED Display", "Auto Resistance"],
  },
  {
    id: "2",
    name: "PulseForge HRV Watch",
    description: "Holographic biometric smartwatch with real-time HRV, VO2max estimation, sleep staging, and AI-driven recovery optimization.",
    price: 599,
    image: fitSmartwatch,
    category: "Wearables",
    rating: 4.8,
    inStock: true,
    features: ["Holo Display", "HRV Tracking", "VO2max AI", "7-day Battery"],
  },
  {
    id: "3",
    name: "Apex Whey Isolate",
    description: "Precision-engineered whey isolate with 30g protein per serving, zero sugar, enzyme-optimized absorption, and lab-verified purity.",
    price: 79,
    image: fitSupplement,
    category: "Nutrition",
    rating: 4.7,
    inStock: true,
    features: ["30g Protein", "Zero Sugar", "Lab Verified", "Fast Absorb"],
  },
  {
    id: "4",
    name: "FlexForce Band Set",
    description: "5-tier progressive resistance band system with anti-snap technology, ergonomic handles, and guided workout QR codes.",
    price: 89,
    image: fitBands,
    category: "Equipment",
    rating: 4.9,
    inStock: true,
    features: ["5 Levels", "Anti-Snap", "QR Workouts", "Travel Kit"],
  },
  {
    id: "5",
    name: "SkipSync Pro",
    description: "Smart jump rope with LED rep counter, calorie tracking, Bluetooth sync, and adjustable weighted handles for HIIT cardio.",
    price: 129,
    image: fitJumprope,
    category: "Cardio",
    rating: 4.8,
    inStock: true,
    features: ["LED Counter", "Bluetooth", "Weighted", "HIIT Mode"],
  },
  {
    id: "6",
    name: "ZenBase Mat",
    description: "Premium 6mm alignment yoga mat with antimicrobial surface, laser-etched guide lines, and ultra-grip texture for hot yoga.",
    price: 119,
    image: fitYogamat,
    category: "Recovery",
    rating: 4.6,
    inStock: true,
    features: ["6mm Thick", "Antimicrobial", "Alignment Lines", "Ultra Grip"],
  },
];
