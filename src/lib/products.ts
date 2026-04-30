export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  category: string;
  image: string;
  badge?: string;
}

export const categories = [
  { id: "cleaning-essentials", name: "Cleaning Essentials", icon: "🧹" },
  { id: "cleaning-chemicals", name: "Cleaning Chemicals & Liquids", icon: "🧼" },
  { id: "washroom-hygiene", name: "Washroom & Hygiene", icon: "🚿" },
  { id: "air-fragrance", name: "Air & Fragrance", icon: "🌸" },
  { id: "kitchen-food-use", name: "Kitchen & Food Use", icon: "🍽️" },
  { id: "bottles-hydration", name: "Bottles & Hydration", icon: "🥤" },
  { id: "disposable-tableware", name: "Disposable Tableware", icon: "🥤" },
  { id: "packaging-utility", name: "Packaging & Utility", icon: "📦" },
];

const img = (k: string) => `https://images.unsplash.com/photo-${k}?w=400&h=400&fit=crop`;

export const products: Product[] = [
  // Cleaning Essentials
  { id: "p1", name: "Door Mat", price: 180, originalPrice: 250, description: "Durable anti-slip door mat for daily use.", category: "cleaning-essentials", image: img("1585421514738-01798e348b17"), badge: "Popular" },
  { id: "p3", name: "Dry Mop", price: 500, originalPrice: 650, description: "High quality dry mop for dust-free floors.", category: "cleaning-essentials", image: img("1584813470613-5b1c1cad3d69"), badge: "Best Seller" },
  { id: "p4", name: "Green Scrubber (Set of 5)", price: 25, originalPrice: 40, description: "Heavy duty green scrubber pads. Pack of 5.", category: "cleaning-essentials", image: img("1583947215259-38e31be8751f") },
  { id: "p5", name: "Green Scrubber", price: 12, originalPrice: 20, description: "Single green scrubber pad for tough cleaning.", category: "cleaning-essentials", image: img("1583947215259-38e31be8751f") },
  { id: "p6", name: "Wiper", price: 185, originalPrice: 250, description: "Floor wiper with sturdy handle.", category: "cleaning-essentials", image: img("1558618666-fcd25c85f82e") },
  { id: "p7", name: "Wiper (Large)", price: 200, originalPrice: 280, description: "Large size floor wiper for big areas.", category: "cleaning-essentials", image: img("1558618666-fcd25c85f82e") },
  { id: "p8", name: "Wiper (Small)", price: 35, originalPrice: 50, description: "Small wiper for compact cleaning tasks.", category: "cleaning-essentials", image: img("1558618666-fcd25c85f82e") },
  { id: "p11", name: "Dust Bin", price: 65, originalPrice: 95, description: "Medium size dustbin for home and office.", category: "cleaning-essentials", image: img("1563453392212-326f5e854473") },
  { id: "p12", name: "Dust Bin (Small)", price: 60, originalPrice: 85, description: "Compact dustbin for desk or bathroom.", category: "cleaning-essentials", image: img("1563453392212-326f5e854473") },
  { id: "p24", name: "Plastic Brooms", price: 99, originalPrice: 140, description: "Durable plastic broom for everyday sweeping.", category: "cleaning-essentials", image: img("1584813470613-5b1c1cad3d69") },
  { id: "p31", name: "Hard Broom", price: 120, originalPrice: 170, description: "Stiff bristle broom for outdoor sweeping.", category: "cleaning-essentials", image: img("1584813470613-5b1c1cad3d69") },
  { id: "p69", name: "Brushes & Scrub Tools (Dust Pan)", price: 75, originalPrice: 105, description: "Rubber dust pan and scrub tool for easy sweeping.", category: "cleaning-essentials", image: img("1584813470613-5b1c1cad3d69") },

  // Cleaning Chemicals & Liquids
  { id: "p10", name: "Glass Cleaner (Colin)", price: 99, originalPrice: 135, description: "Colin glass cleaner for streak-free shine.", category: "cleaning-chemicals", image: img("1602243383222-b4b6b6e5eac3"), badge: "Popular" },
  { id: "p13", name: "Dish Wash Liquid", price: 40, originalPrice: 60, description: "Concentrated dish wash liquid for grease removal.", category: "cleaning-chemicals", image: img("1584813470613-5b1c1cad3d69") },
  { id: "p20", name: "Liquid Detergent (Bloom)", price: 199, originalPrice: 260, description: "Bloom liquid detergent for deep and effective wash.", category: "cleaning-chemicals", image: img("1610557892470-55d9e80c0bce") },
  { id: "p21", name: "Hydrochloric Acid (HCL)", price: 190, originalPrice: 250, description: "Industrial cleaning acid for tough stains.", category: "cleaning-chemicals", image: img("1563453392212-326f5e854473") },
  { id: "p22", name: "Hydrochloric Acid (HCL) 5L", price: 500, originalPrice: 650, description: "Bulk 5L HCL for industrial cleaning.", category: "cleaning-chemicals", image: img("1563453392212-326f5e854473") },
  { id: "p23", name: "Phenyle", price: 99, originalPrice: 140, description: "Disinfectant phenyle for floor cleaning.", category: "cleaning-chemicals", image: img("1573496359142-b8d87734a5a5") },
  { id: "p27", name: "Toilet Cleaner (Harpic)", price: 550, originalPrice: 699, description: "Harpic toilet cleaner for sparkling toilets.", category: "cleaning-chemicals", image: img("1585421514284-efb74c2b69ba"), badge: "Best Seller" },
  { id: "p29", name: "Bleaching Powder", price: 55, originalPrice: 80, description: "Bleaching powder for stain removal and sanitation.", category: "cleaning-chemicals", image: img("1563453392212-326f5e854473") },

  // Washroom & Hygiene
  { id: "p2", name: "Hand Gloves", price: 125, originalPrice: 175, description: "Reusable rubber hand gloves for cleaning and hygiene.", category: "washroom-hygiene", image: img("1584483766114-2cea6facdf57") },
  { id: "p19", name: "Soap (Set of 5)", price: 250, originalPrice: 320, description: "Bath soap pack of 5 bars.", category: "washroom-hygiene", image: img("1600857544200-b2f666a9a2ec"), badge: "Value Pack" },
  { id: "p25", name: "Hand Wash", price: 99, originalPrice: 135, description: "Antibacterial hand wash liquid.", category: "washroom-hygiene", image: img("1584483766114-2cea6facdf57") },
  { id: "p26", name: "Soap", price: 90, originalPrice: 125, description: "Everyday hygiene soap option.", category: "washroom-hygiene", image: img("1582735689369-4fe89db7114c") },
  { id: "p30", name: "Urinal Cake", price: 41, originalPrice: 60, description: "Long lasting urinal deodorizer cake.", category: "washroom-hygiene", image: img("1556228578-0d85b1a4d571") },
  { id: "p79", name: "Latex Hand Gloves", price: 130, originalPrice: 180, description: "Latex hand gloves for safe handling.", category: "washroom-hygiene", image: img("1584483766114-2cea6facdf57") },
  { id: "p80", name: "Latex Hand Gloves (Heavy Duty)", price: 135, originalPrice: 185, description: "Heavy-duty latex gloves for intensive cleaning.", category: "washroom-hygiene", image: img("1584483766114-2cea6facdf57"), badge: "Best Seller" },

  // Air & Fragrance
  { id: "p16", name: "Comfort Room Spray", price: 185, originalPrice: 240, description: "Long-lasting comfort room spray.", category: "air-fragrance", image: img("1607006344380-b6775a0824a7") },
  { id: "p17", name: "Air Freshener", price: 185, originalPrice: 240, description: "Premium air freshener for home and office.", category: "air-fragrance", image: img("1607006344380-b6775a0824a7"), badge: "New" },
  { id: "p18", name: "Spray (General)", price: 275, originalPrice: 350, description: "General purpose spray for household use.", category: "air-fragrance", image: img("1586775206919-3819e5cad92c") },

  // Kitchen & Food Use
  { id: "p9", name: "Mug", price: 35, originalPrice: 55, description: "Durable plastic mug for household use.", category: "kitchen-food-use", image: img("1556228578-0d85b1a4d571") },
  { id: "p51", name: "FineWare Water Mug", price: 85, originalPrice: 120, description: "FineWare premium water mug.", category: "kitchen-food-use", image: img("1556228578-0d85b1a4d571") },
  { id: "p52", name: "FineWare Coffee Mug", price: 99, originalPrice: 140, description: "FineWare premium coffee mug.", category: "kitchen-food-use", image: img("1556228578-0d85b1a4d571") },
  { id: "p53", name: "Milton Star MFG Mug", price: 89, originalPrice: 125, description: "Milton premium mug.", category: "kitchen-food-use", image: img("1556228578-0d85b1a4d571") },
  { id: "p54", name: "Milton Solo Orbit MUG", price: 95, originalPrice: 130, description: "Milton ergonomic mug.", category: "kitchen-food-use", image: img("1556228578-0d85b1a4d571") },
  { id: "p56", name: "FineWare Bowl 6 inch", price: 101, originalPrice: 140, description: "FineWare bowl 6 inch.", category: "kitchen-food-use", image: img("1586775206919-3819e5cad92c") },
  { id: "p57", name: "FineWare Bowl 4.5 inch", price: 75, originalPrice: 105, description: "FineWare bowl 4.5 inch.", category: "kitchen-food-use", image: img("1586775206919-3819e5cad92c") },
  { id: "p58", name: "FineWare Bowl 8 inch", price: 155, originalPrice: 210, description: "FineWare bowl 8 inch.", category: "kitchen-food-use", image: img("1586775206919-3819e5cad92c") },
  { id: "p63", name: "FineWare Round Bowl 3 inch", price: 45, originalPrice: 65, description: "FineWare round bowl 3 inch.", category: "kitchen-food-use", image: img("1586775206919-3819e5cad92c") },
  { id: "p65", name: "FineWare Square Bowl 5 inch", price: 98, originalPrice: 135, description: "FineWare square bowl 5 inch.", category: "kitchen-food-use", image: img("1586775206919-3819e5cad92c") },
  { id: "p66", name: "FineWare Bowl HMR 7 inch", price: 203, originalPrice: 270, description: "FineWare HMR bowl 7 inch.", category: "kitchen-food-use", image: img("1586775206919-3819e5cad92c") },
  { id: "p68", name: "Tiffin Box", price: 199, originalPrice: 260, description: "Durable tiffin box for food use.", category: "kitchen-food-use", image: img("1563453392212-326f5e854473") },

  // Bottles & Hydration
  { id: "p32", name: "Milton Water Bottle Swirl Flip", price: 145, originalPrice: 199, description: "Milton Swirl Flip water bottle.", category: "bottles-hydration", image: img("1602243383222-b4b6b6e5eac3") },
  { id: "p33", name: "Milton Water Bottle (1.5Ltr)", price: 195, originalPrice: 260, description: "Milton 1.5L water bottle.", category: "bottles-hydration", image: img("1602243383222-b4b6b6e5eac3") },
  { id: "p34", name: "Milton Mike Bottle (1Ltr)", price: 195, originalPrice: 260, description: "Milton Mike 1L water bottle.", category: "bottles-hydration", image: img("1602243383222-b4b6b6e5eac3") },
  { id: "p35", name: "Milton Prize 500ML Bottle", price: 145, originalPrice: 199, description: "Milton Prize 500ml compact bottle.", category: "bottles-hydration", image: img("1602243383222-b4b6b6e5eac3") },
  { id: "p36", name: "Milton ACE Flip 500ML Bottle", price: 165, originalPrice: 220, description: "Milton ACE flip-top 500ml bottle.", category: "bottles-hydration", image: img("1602243383222-b4b6b6e5eac3") },
  { id: "p37", name: "Milton Maven (1Ltr) Bottle", price: 650, originalPrice: 850, description: "Milton Maven premium 1L bottle.", category: "bottles-hydration", image: img("1602243383222-b4b6b6e5eac3"), badge: "Premium" },
  { id: "p38", name: "Milton Pacific (Set of 6) 1Ltr", price: 850, originalPrice: 1100, description: "Milton Pacific set of 6 bottles.", category: "bottles-hydration", image: img("1602243383222-b4b6b6e5eac3"), badge: "Value Pack" },
  { id: "p39", name: "Milton Wide Mouth Pet Bottle Set", price: 270, originalPrice: 360, description: "Milton wide mouth pet bottle set.", category: "bottles-hydration", image: img("1602243383222-b4b6b6e5eac3") },
  { id: "p40", name: "Milton Tetra (Set of 1Ltr)", price: 265, originalPrice: 350, description: "Milton Tetra 1L bottle set.", category: "bottles-hydration", image: img("1602243383222-b4b6b6e5eac3") },
  { id: "p42", name: "Milton Infuser Bottle (1Ltr)", price: 225, originalPrice: 299, description: "Milton infuser bottle with filter.", category: "bottles-hydration", image: img("1602243383222-b4b6b6e5eac3") },

  // Disposable Tableware
  { id: "p43", name: "Paper Cup (Tea Cup 55ml)", price: 55, originalPrice: 75, description: "Disposable paper tea cups 55ml.", category: "disposable-tableware", image: img("1577720643272-265f434e898f") },
  { id: "p44", name: "Paper Cups (TeaCups) 100ml", price: 85, originalPrice: 110, description: "Disposable paper cups 100ml pack.", category: "disposable-tableware", image: img("1577720643272-265f434e898f") },
  { id: "p45", name: "Paper Cups (TeaCups) 115ml", price: 90, originalPrice: 120, description: "Paper tea cups 115ml pack.", category: "disposable-tableware", image: img("1577720643272-265f434e898f") },
  { id: "p46", name: "Paper Cups WaterGlass 250ml", price: 120, originalPrice: 160, description: "Paper water glass cups 250ml.", category: "disposable-tableware", image: img("1577720643272-265f434e898f") },
  { id: "p47", name: "Paper Cups WaterGlass 200ml", price: 100, originalPrice: 140, description: "Paper water glass cups 200ml.", category: "disposable-tableware", image: img("1577720643272-265f434e898f") },
  { id: "p48", name: "Paper Plates 11 Inch (Set of 25)", price: 199, originalPrice: 260, description: "Disposable paper plates 11 inch.", category: "disposable-tableware", image: img("1577720643272-265f434e898f") },
  { id: "p49", name: "Paper Plates 9 Inch (Set of 25)", price: 150, originalPrice: 199, description: "Disposable paper plates 9 inch.", category: "disposable-tableware", image: img("1577720643272-265f434e898f") },
  { id: "p50", name: "Disposable Bowls 180ML (Set of 50)", price: 199, originalPrice: 260, description: "Disposable bowls 180ml set of 50.", category: "disposable-tableware", image: img("1577720643272-265f434e898f"), badge: "Bulk" },

  // Packaging & Utility
  { id: "p15", name: "Plastic Thread", price: 185, originalPrice: 250, description: "Strong plastic thread for packaging utility.", category: "packaging-utility", image: img("1586775206919-3819e5cad92c") },
  { id: "p28", name: "Plastic Cover", price: 28, originalPrice: 40, description: "Plastic cover sheets for packaging and protection.", category: "packaging-utility", image: img("1577720643272-265f434e898f") },
  { id: "p71", name: "Food Containers", price: 350, originalPrice: 450, description: "Utility food containers for packing and storage.", category: "packaging-utility", image: img("1563453392212-326f5e854473") },
];

export const comboDeals = [
  { id: "combo1", name: "Cleaning Essentials Starter", products: ["p3", "p6", "p24"], originalPrice: 839, dealPrice: 649, description: "Dry mop, wiper, and plastic broom for daily cleaning" },
  { id: "combo2", name: "Chemical Cleaning Pack", products: ["p27", "p10", "p23"], originalPrice: 884, dealPrice: 699, description: "Harpic, Colin, and phenyle for deep cleaning" },
  { id: "combo3", name: "Hydration Value Combo", products: ["p34", "p37", "p42"], originalPrice: 1070, dealPrice: 899, description: "Milton bottle combo with infuser option" },
  { id: "combo4", name: "Disposable Serving Pack", products: ["p44", "p48", "p50"], originalPrice: 544, dealPrice: 429, description: "Paper cups, plates, and disposable bowls" },
  { id: "combo5", name: "Washroom Hygiene Kit", products: ["p25", "p30", "p80"], originalPrice: 379, dealPrice: 299, description: "Hand wash, urinal cake, and hand gloves" },
  { id: "combo6", name: "Kitchen Use Combo", products: ["p51", "p56", "p68"], originalPrice: 460, dealPrice: 369, description: "Mug, bowl, and tiffin box for kitchen use" },
];
