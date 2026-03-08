import productHeadphones from "@/assets/product-headphones.jpg";
import productSmartwatch from "@/assets/product-smartwatch.jpg";
import productGlasses from "@/assets/product-glasses.jpg";
import productController from "@/assets/product-controller.jpg";
import productDrone from "@/assets/product-drone.jpg";
import productSpeaker from "@/assets/product-speaker.jpg";

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
    name: "NeuroSync Pro X",
    description: "AI-powered adaptive noise cancellation headphones with spatial audio processing and neural response optimization.",
    price: 499,
    image: productHeadphones,
    category: "Audio",
    rating: 4.9,
    inStock: true,
    features: ["Neural ANC", "Spatial Audio", "40hr Battery", "Titanium Frame"],
  },
  {
    id: "2",
    name: "Chrono Vertex",
    description: "Holographic display smartwatch with real-time biometric AI, quantum-encrypted communications, and orbital GPS.",
    price: 899,
    image: productSmartwatch,
    category: "Wearables",
    rating: 4.8,
    inStock: true,
    features: ["Holo Display", "Bio AI", "Quantum Encrypt", "7-day Battery"],
  },
  {
    id: "3",
    name: "Prism AR Ultra",
    description: "Mixed reality AR glasses with 8K retinal projection, real-time translation, and immersive holographic overlays.",
    price: 1299,
    image: productGlasses,
    category: "AR/VR",
    rating: 4.7,
    inStock: true,
    features: ["8K Retinal", "Real-time Translate", "Holo Overlay", "All-day Wear"],
  },
  {
    id: "4",
    name: "Phantom Controller",
    description: "Haptic feedback gaming controller with adaptive triggers, RGB neural sync, and zero-latency wireless.",
    price: 199,
    image: productController,
    category: "Gaming",
    rating: 4.9,
    inStock: true,
    features: ["Haptic Pro", "Zero Latency", "RGB Sync", "Ergonomic"],
  },
  {
    id: "5",
    name: "Skyline Drone X7",
    description: "Autonomous AI drone with 8K cinematic camera, obstacle avoidance, and 90-minute flight time.",
    price: 1599,
    image: productDrone,
    category: "Drones",
    rating: 4.6,
    inStock: false,
    features: ["8K Cinema", "AI Pilot", "90min Flight", "Foldable"],
  },
  {
    id: "6",
    name: "Echo Sphere",
    description: "360° spatial audio speaker with AI room calibration, holographic sound visualization, and multi-room sync.",
    price: 349,
    image: productSpeaker,
    category: "Audio",
    rating: 4.8,
    inStock: true,
    features: ["360° Audio", "AI Calibration", "Holo Viz", "Multi-room"],
  },
];
