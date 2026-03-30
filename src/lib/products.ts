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
  { id: "mops", name: "Mops & Squeegees", icon: "🧼" },
  { id: "brushes", name: "Brushes & Scrubbers", icon: "🧽" },
  { id: "soaps", name: "Soaps & Detergents", icon: "🧴" },
  { id: "kitchen", name: "Kitchen Essentials", icon: "🍽️" },
  { id: "stationery", name: "Stationery", icon: "📝" },
  { id: "bulk", name: "Bulk Liquids (5L)", icon: "🫶" },
  { id: "home", name: "Home Essentials", icon: "🏠" },
];

export const products: Product[] = [
  // Floor Cleaning Products
  { id: "f1", name: "Floor Cleaning Liquid (1L)", price: 189, description: "Powerful floor cleaner with lemon fragrance. Leaves floors sparkling clean and disinfected.", category: "floor", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a5?w=400&h=400&fit=crop" },
  { id: "f2", name: "Tile Floor Cleaner (1L) - pH Neutral", price: 229, description: "Safe for all types of floor tiles. Won't leave residue or streaks.", category: "floor", image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&h=400&fit=crop", badge: "Popular" },
  { id: "f3", name: "Disinfectant Floor Cleaner (1L)", price: 259, description: "Kills 99.9% germs and bacteria. Ideal for homes and offices.", category: "floor", image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop", badge: "Best Seller" },
  { id: "f4", name: "Floor Cleaning Liquid Bulk (5L)", price: 899, description: "Industrial-grade floor cleaner. Perfect for large spaces and regular use.", category: "bulk", image: "https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?w=400&h=400&fit=crop" },

  // Washroom Cleaning Products
  { id: "w1", name: "Toilet Cleaner Gel (500ml)", price: 99, description: "Thick gel formula cuts through tough stains and odors instantly.", category: "washroom", image: "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=400&h=400&fit=crop" },
  { id: "w2", name: "Bathroom Tile Cleaner (1L)", price: 179, description: "Specialized formula for bathroom tiles. Anti-mold and anti-mildew.", category: "washroom", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop" },
  { id: "w3", name: "Washroom Cleaner Liquid (5L)", price: 699, description: "Professional-grade washroom cleaner. Disinfects and deodorizes.", category: "bulk", image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop", badge: "Bulk" },
  { id: "w4", name: "Glass & Mirror Cleaner (500ml)", price: 129, description: "Streak-free cleaning for bathrooms and kitchens. Crystal clear shine.", category: "washroom", image: "https://images.unsplash.com/photo-1602243383222-b4b6b6e5eac3?w=400&h=400&fit=crop" },
  { id: "w5", name: "Bathroom Air Freshener (250ml)", price: 79, description: "Long-lasting fragrance spray for bathrooms. Eliminates odors.", category: "washroom", image: "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=400&h=400&fit=crop", badge: "New" },

  // Mops & Related Products
  { id: "m1", name: "Standard Floor Mop", price: 249, description: "Classic cotton mop for traditional floor cleaning. Highly absorbent.", category: "mops", image: "https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?w=400&h=400&fit=crop" },
  { id: "m2", name: "Microfiber Mop", price: 349, description: "Advanced microfiber technology captures dirt effectively. Lasts longer.", category: "mops", image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&h=400&fit=crop", badge: "Best Seller" },
  { id: "m3", name: "Magic Mop (Self-Wringing)", price: 499, description: "Press handle to wring! No bending required. Ergonomic design.", category: "mops", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop", badge: "Popular" },
  { id: "m4", name: "Kitchen Mop", price: 199, description: "Specially designed for kitchen floors. Tough on grease and stains.", category: "mops", image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop" },
  { id: "m5", name: "Spin Mop with Bucket", price: 899, description: "360° spin technology. Self-wringing bucket. Commercial quality.", category: "mops", image: "https://images.unsplash.com/photo-1602243383222-b4b6b6e5eac3?w=400&h=400&fit=crop" },

  // Brushes & Scrubbers
  { id: "b1", name: "Tile Scrubber Brush", price: 149, description: "Hard-bristled brush for tiles and grout. Removes tough stains.", category: "brushes", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop" },
  { id: "b2", name: "Washroom Cleaning Brush Set (3-piece)", price: 249, description: "Three different brushes for various bathroom cleaning tasks.", category: "brushes", image: "https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?w=400&h=400&fit=crop", badge: "Bundle" },
  { id: "b3", name: "Toilet Brush with Stand", price: 129, description: "Stiff bristles for thorough cleaning. Includes hygienic stand.", category: "brushes", image: "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=400&h=400&fit=crop" },
  { id: "b4", name: "Floor Scrubbing Brush", price: 179, description: "Long handle brush for hard-to-reach floor areas. Heavy-duty.", category: "brushes", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop" },
  { id: "b5", name: "Hand Scrub Brush", price: 89, description: "Compact brush for quick cleanups. Ideal for daily use.", category: "brushes", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop" },
  { id: "b6", name: "Microfiber Towels (Pack of 5)", price: 249, description: "Ultra-absorbent microfiber. Streak-free and reusable.", category: "brushes", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop", badge: "Value Pack" },

  // Soaps & Detergents
  { id: "s1", name: "Laundry Detergent Powder (1kg)", price: 189, description: "All-purpose detergent for machine and hand wash. Triple action formula.", category: "soaps", image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop" },
  { id: "s2", name: "Liquid Laundry Detergent (1L)", price: 259, description: "Liquid formula for superior stain removal. Works in cold water.", category: "soaps", image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&h=400&fit=crop", badge: "Best Seller" },
  { id: "s3", name: "Dishwashing Liquid (500ml)", price: 99, description: "Powerful degreaser for kitchen. Gentle on hands, tough on grease.", category: "soaps", image: "https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?w=400&h=400&fit=crop" },
  { id: "s4", name: "Dishwashing Liquid Bulk (1L)", price: 179, description: "Economical bulk size. Perfect for kitchens and restaurants.", category: "soaps", image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&h=400&fit=crop" },
  { id: "s5", name: "Body Soap Bar (Pack of 4)", price: 129, description: "Mild and gentle. Moisturizing formula. Long-lasting bars.", category: "soaps", image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400&h=400&fit=crop" },
  { id: "s6", name: "Laundry Soap Bar (Pack of 5)", price: 149, description: "Strong stain removal. Ideal for hand washing. Economic pack.", category: "soaps", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop" },

  // Kitchen Essentials
  { id: "k1", name: "Table Cleaning Oil (500ml)", price: 169, description: "Polishes wooden and glass tables. Brings shine and protection.", category: "kitchen", image: "https://images.unsplash.com/photo-1602243383222-b4b6b6e5eac3?w=400&h=400&fit=crop" },
  { id: "k2", name: "Kitchen Degreaser Spray (500ml)", price: 149, description: "Removes tough kitchen grease. Safe for cooking surfaces.", category: "kitchen", image: "https://images.unsplash.com/photo-1586775206919-3819e5cad92c?w=400&h=400&fit=crop" },
  { id: "k3", name: "Stainless Steel Cleaner (500ml)", price: 199, description: "Makes stainless steel appliances gleam. Streak-free finish.", category: "kitchen", image: "https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?w=400&h=400&fit=crop" },

  // Stationery Products
  { id: "st1", name: "Notebook (100 pages) - A4", price: 79, description: "Quality ruled notebook. Perfect for notes and study. Pack of 2.", category: "stationery", image: "https://images.unsplash.com/photo-1605214174585-fe31582dc5d0?w=400&h=400&fit=crop" },
  { id: "st2", name: "Ball Point Pens (Pack of 10)", price: 89, description: "Smooth writing blue ink pens. Comfortable grip. Affordable.", category: "stationery", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&fit=crop" },
  { id: "st3", name: "Pencil Set (12-piece)", price: 129, description: "Graphite pencils with erasers. HB grade. Quality wood.", category: "stationery", image: "https://images.unsplash.com/photo-1533516122957-1881eb2b38b5?w=400&h=400&fit=crop" },
  { id: "st4", name: "Gel Pens (Pack of 8) - Assorted Colors", price: 119, description: "Smooth gel ink. 8 vibrant colors. Perfect for writing.", category: "stationery", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&fit=crop", badge: "New" },
  { id: "st5", name: "Envelopes (Pack of 50) - White", price: 69, description: "Standard white envelopes. 50 pieces. Professional quality.", category: "stationery", image: "https://images.unsplash.com/photo-1577720643272-265f434e898f?w=400&h=400&fit=crop" },

  // Home Essentials
  { id: "h1", name: "Door Mat (Rubber) - Small", price: 299, description: "Anti-slip rubber door mat. Traps dirt and moisture. Welcome design.", category: "home", image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&h=400&fit=crop" },
  { id: "h2", name: "Door Mat (Rubber) - Large", price: 499, description: "Extra-large door mat for main entrances. Heavy-duty rubber.", category: "home", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop", badge: "Popular" },
  { id: "h3", name: "Hand Wash Liquid (500ml)", price: 139, description: "Antibacterial hand wash. Moisturizing formula. Long-lasting suds.", category: "home", image: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=400&h=400&fit=crop" },
  { id: "h4", name: "Hand Wash Liquid Bulk (1L)", price: 249, description: "Economy pack. Perfect for families and offices.", category: "home", image: "https://images.unsplash.com/photo-1586775206919-3819e5cad92c?w=400&h=400&fit=crop", badge: "Best Seller" },
  { id: "h5", name: "Tissue Paper (Pack of 6 Rolls)", price: 189, description: "Soft 2-ply tissue. 200 sheets per roll. Gentle and strong.", category: "home", image: "https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?w=400&h=400&fit=crop" },
];

export const comboDeals = [
  { id: "combo1", name: "Complete Floor Care Bundle", products: ["f1", "m2", "b1"], originalPrice: 787, dealPrice: 649, description: "Everything for sparkling clean floors - cleaner, mop, and scrubber" },
  { id: "combo2", name: "Premium Washroom Cleaning Kit", products: ["w1", "w3", "b2"], originalPrice: 578, dealPrice: 449, description: "Professional bathroom cleaning with brushes and specialized cleaners" },
  { id: "combo3", name: "Home Essentials Pack", products: ["h3", "h4", "s5"], originalPrice: 538, dealPrice: 399, description: "Hand wash, door mat, and soap bar for families" },
  { id: "combo4", name: "Kitchen Care Master Kit", products: ["k1", "k2", "s3"], originalPrice: 418, dealPrice: 299, description: "Keep your kitchen spotless and shining" },
  { id: "combo5", name: "Professional Cleaner's Bundle", products: ["m5", "b3", "b6"], originalPrice: 1277, dealPrice: 999, description: "Professional-grade mop bucket with brushes and microfiber towels" },
  { id: "combo6", name: "Budget Cleaning Starter", products: ["f2", "m1", "s6"], originalPrice: 598, dealPrice: 449, description: "Perfect starter pack for households - mop, cleaner, and detergent soap" },
];
