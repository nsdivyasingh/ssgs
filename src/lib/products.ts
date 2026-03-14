export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  badge?: string;
}

export const categories = [
  { id: "floor", name: "Floor Cleaning", icon: "🧹" },
  { id: "washroom", name: "Washroom Cleaning", icon: "🚿" },
  { id: "laundry", name: "Laundry Products", icon: "👕" },
  { id: "tools", name: "Cleaning Tools", icon: "🧽" },
  { id: "hygiene", name: "Hygiene Products", icon: "🧻" },
];

export const products: Product[] = [
  // Floor Cleaning
  { id: "f1", name: "Premium Floor Mop", price: 349, description: "Heavy-duty microfiber mop with adjustable handle for all floor types.", category: "floor", image: "https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?w=400&h=400&fit=crop", badge: "Bestseller" },
  { id: "f2", name: "Lemon Floor Cleaner (1L)", price: 189, description: "Powerful lemon-scented floor cleaner that leaves floors sparkling.", category: "floor", image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&h=400&fit=crop" },
  { id: "f3", name: "Disinfectant Floor Liquid (2L)", price: 299, description: "Kills 99.9% germs. Suitable for marble, tile, and granite floors.", category: "floor", image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop" },
  { id: "f4", name: "Spin Mop with Bucket", price: 899, description: "360° spin mop with self-wringing bucket. Easy and efficient cleaning.", category: "floor", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop", badge: "Popular" },

  // Washroom Cleaning
  { id: "w1", name: "Toilet Cleaner (500ml)", price: 99, description: "Thick gel formula for deep toilet bowl cleaning and freshness.", category: "washroom", image: "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=400&h=400&fit=crop" },
  { id: "w2", name: "Bathroom Scrub Brush", price: 149, description: "Ergonomic brush with stiff bristles for tile grout and surfaces.", category: "washroom", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop" },
  { id: "w3", name: "Glass Cleaner Spray (500ml)", price: 129, description: "Streak-free glass and mirror cleaner for a crystal-clear shine.", category: "washroom", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop" },
  { id: "w4", name: "Bathroom Freshener Gel", price: 79, description: "Long-lasting freshness for bathrooms. Lasts up to 30 days.", category: "washroom", image: "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=400&h=400&fit=crop", badge: "New" },

  // Laundry Products
  { id: "l1", name: "Liquid Detergent (1L)", price: 259, description: "Tough on stains, gentle on fabric. Works in all washing machines.", category: "laundry", image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop", badge: "Bestseller" },
  { id: "l2", name: "Washing Soap Bar (Pack of 4)", price: 120, description: "Traditional washing soap for hand-wash garments. Extra lather.", category: "laundry", image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400&h=400&fit=crop" },
  { id: "l3", name: "Fabric Softener (500ml)", price: 199, description: "Keeps clothes soft, fresh, and wrinkle-free after every wash.", category: "laundry", image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&h=400&fit=crop" },

  // Cleaning Tools
  { id: "t1", name: "Microfiber Towels (Pack of 5)", price: 249, description: "Ultra-absorbent microfiber towels for streak-free cleaning.", category: "tools", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop", badge: "Value Pack" },
  { id: "t2", name: "Grass Broom", price: 129, description: "Natural grass broom for indoor sweeping. Durable and eco-friendly.", category: "tools", image: "https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?w=400&h=400&fit=crop" },
  { id: "t3", name: "Dustpan & Brush Set", price: 179, description: "Compact dustpan with rubber edge and stiff hand brush.", category: "tools", image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop" },
  { id: "t4", name: "Squeegee Window Cleaner", price: 199, description: "Professional-grade squeegee for windows and glass surfaces.", category: "tools", image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&h=400&fit=crop" },

  // Hygiene Products
  { id: "h1", name: "Tissue Paper Roll (Pack of 6)", price: 199, description: "Soft 2-ply tissue paper rolls. 200 sheets per roll.", category: "hygiene", image: "https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?w=400&h=400&fit=crop" },
  { id: "h2", name: "Rubber Floor Mat", price: 499, description: "Anti-slip rubber mat for entrance areas. Traps dirt and moisture.", category: "hygiene", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop" },
  { id: "h3", name: "Hand Sanitizer (500ml)", price: 149, description: "70% alcohol-based sanitizer. Kills 99.9% germs instantly.", category: "hygiene", image: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=400&h=400&fit=crop", badge: "Essential" },
];

export const comboDeals = [
  { id: "combo1", name: "Complete Floor Care Kit", products: ["f1", "f2", "f3"], originalPrice: 837, dealPrice: 699, description: "Everything you need for sparkling floors" },
  { id: "combo2", name: "Bathroom Starter Pack", products: ["w1", "w2", "w3", "w4"], originalPrice: 456, dealPrice: 349, description: "Complete bathroom cleaning solution" },
  { id: "combo3", name: "Laundry Essentials Bundle", products: ["l1", "l2", "l3"], originalPrice: 578, dealPrice: 449, description: "All your laundry needs in one pack" },
];
