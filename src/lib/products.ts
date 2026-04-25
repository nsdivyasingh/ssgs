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
  { id: "floor", name: "Floor Cleaning", icon: "🧹" },
  { id: "washroom", name: "Washroom Cleaning", icon: "🚿" },
  { id: "mops", name: "Mops & Brooms", icon: "🧼" },
  { id: "brushes", name: "Brushes & Scrubbers", icon: "🧽" },
  { id: "soaps", name: "Soaps & Detergents", icon: "🧴" },
  { id: "kitchen", name: "Kitchen & Dining", icon: "🍽️" },
  { id: "bottles", name: "Bottles & Flasks", icon: "🍶" },
  { id: "cups", name: "Cups, Plates & Bowls", icon: "🥤" },
  { id: "containers", name: "Containers & Boxes", icon: "📦" },
  { id: "tissues", name: "Tissues & Paper", icon: "🧻" },
  { id: "gloves", name: "Gloves & Safety", icon: "🧤" },
  { id: "fresheners", name: "Fresheners & Sprays", icon: "🌸" },
  { id: "stationery", name: "Stationery", icon: "📝" },
  { id: "home", name: "Home Essentials", icon: "🏠" },
];

const img = (k: string) => `https://images.unsplash.com/photo-${k}?w=400&h=400&fit=crop`;

export const products: Product[] = [
  // Home Essentials
  { id: "p1", name: "Door Mat", price: 180, originalPrice: 250, description: "Durable rubber door mat. Anti-slip and weather resistant.", category: "home", image: img("1585421514738-01798e348b17"), badge: "Popular" },
  { id: "p2", name: "Hand Gloves", price: 125, originalPrice: 175, description: "Reusable rubber hand gloves for cleaning.", category: "gloves", image: img("1584483766114-2cea6facdf57") },
  { id: "p3", name: "Dry Mop", price: 500, originalPrice: 650, description: "High quality dry mop for dust-free floors.", category: "mops", image: img("1584813470613-5b1c1cad3d69"), badge: "Best Seller" },
  { id: "p4", name: "Green Scrubber (Set of 5)", price: 25, originalPrice: 40, description: "Heavy duty green scrubber pads. Pack of 5.", category: "brushes", image: img("1583947215259-38e31be8751f") },
  { id: "p5", name: "Green Scrubber", price: 12, originalPrice: 20, description: "Single green scrubber pad for tough cleaning.", category: "brushes", image: img("1583947215259-38e31be8751f") },
  { id: "p6", name: "Wiper", price: 185, originalPrice: 250, description: "Floor wiper with sturdy handle.", category: "mops", image: img("1558618666-fcd25c85f82e") },
  { id: "p7", name: "Wiper (Large)", price: 200, originalPrice: 280, description: "Large size floor wiper for big areas.", category: "mops", image: img("1558618666-fcd25c85f82e") },
  { id: "p8", name: "Wiper S", price: 35, originalPrice: 50, description: "Small wiper for window and glass cleaning.", category: "mops", image: img("1558618666-fcd25c85f82e") },
  { id: "p9", name: "Mug", price: 35, originalPrice: 55, description: "Durable plastic mug for bathroom use.", category: "home", image: img("1556228578-0d85b1a4d571") },
  { id: "p10", name: "Glass Cleaner (Colin)", price: 99, originalPrice: 135, description: "Colin glass cleaner for streak-free shine.", category: "washroom", image: img("1602243383222-b4b6b6e5eac3"), badge: "Popular" },
  { id: "p11", name: "Dust Bin", price: 65, originalPrice: 95, description: "Medium size dustbin for home and office.", category: "home", image: img("1563453392212-326f5e854473") },
  { id: "p12", name: "Dust Bin (Small)", price: 60, originalPrice: 85, description: "Compact dustbin for desk or bathroom.", category: "home", image: img("1563453392212-326f5e854473") },
  { id: "p13", name: "Dish Wash Bottle 250ml", price: 40, originalPrice: 60, description: "Concentrated dish wash liquid. Cuts through grease.", category: "kitchen", image: img("1584813470613-5b1c1cad3d69") },
  { id: "p14", name: "Scientific 2000ml", price: 326, originalPrice: 420, description: "Scientific floor cleaner 2L bottle.", category: "floor", image: img("1573496359142-b8d87734a5a5") },
  { id: "p15", name: "Plastic Thread", price: 185, originalPrice: 250, description: "Strong plastic thread for heavy duty use.", category: "home", image: img("1586775206919-3819e5cad92c") },
  { id: "p16", name: "Comfort Room Spray", price: 185, originalPrice: 240, description: "Long-lasting comfort room spray.", category: "fresheners", image: img("1607006344380-b6775a0824a7") },
  { id: "p17", name: "Air Freshener", price: 185, originalPrice: 240, description: "Premium air freshener for home and office.", category: "fresheners", image: img("1607006344380-b6775a0824a7"), badge: "New" },
  { id: "p18", name: "Spray Bottle", price: 275, originalPrice: 350, description: "Multi-purpose spray bottle for cleaning.", category: "home", image: img("1586775206919-3819e5cad92c") },
  { id: "p19", name: "Soap (Set of 5)", price: 250, originalPrice: 320, description: "Premium bath soap pack of 5 bars.", category: "soaps", image: img("1600857544200-b2f666a9a2ec"), badge: "Value Pack" },
  { id: "p20", name: "Broom Liquid Detergent", price: 199, originalPrice: 260, description: "Liquid detergent for deep cleaning.", category: "soaps", image: img("1610557892470-55d9e80c0bce") },
  { id: "p21", name: "Hydrochloric Acid (HCL)", price: 190, originalPrice: 250, description: "Industrial cleaning acid for tough stains.", category: "washroom", image: img("1563453392212-326f5e854473") },
  { id: "p22", name: "Hydrochloric Acid (HCL) 5L", price: 500, originalPrice: 650, description: "Bulk 5L HCL for industrial cleaning.", category: "washroom", image: img("1563453392212-326f5e854473") },
  { id: "p23", name: "Phenyle", price: 99, originalPrice: 140, description: "Disinfectant phenyle for floor cleaning.", category: "floor", image: img("1573496359142-b8d87734a5a5") },
  { id: "p24", name: "Plastic Brooms", price: 99, originalPrice: 140, description: "Durable plastic broom for everyday sweeping.", category: "mops", image: img("1584813470613-5b1c1cad3d69") },
  { id: "p25", name: "Hand Wash", price: 99, originalPrice: 135, description: "Antibacterial hand wash liquid.", category: "soaps", image: img("1584483766114-2cea6facdf57") },
  { id: "p26", name: "Soap Oil", price: 90, originalPrice: 125, description: "Premium quality soap oil for cleaning.", category: "soaps", image: img("1582735689369-4fe89db7114c") },
  { id: "p27", name: "Toilet Cleaner TC Harpic", price: 550, originalPrice: 699, description: "Harpic toilet cleaner for sparkling toilets.", category: "washroom", image: img("1585421514284-efb74c2b69ba"), badge: "Best Seller" },
  { id: "p28", name: "Plastic Cover", price: 28, originalPrice: 40, description: "Plastic cover sheets for protection.", category: "home", image: img("1577720643272-265f434e898f") },
  { id: "p29", name: "Disinfecting Powder", price: 55, originalPrice: 80, description: "Antibacterial disinfecting powder.", category: "washroom", image: img("1563453392212-326f5e854473") },
  { id: "p30", name: "Urinal Cake", price: 41, originalPrice: 60, description: "Long lasting urinal deodorizer cake.", category: "washroom", image: img("1556228578-0d85b1a4d571") },
  { id: "p31", name: "Hard Broom", price: 120, originalPrice: 170, description: "Stiff bristle broom for outdoor sweeping.", category: "mops", image: img("1584813470613-5b1c1cad3d69") },
  // Bottles
  { id: "p32", name: "Milton Water Bottle Swirl Flip", price: 145, originalPrice: 199, description: "Milton Swirl Flip water bottle.", category: "bottles", image: img("1602243383222-b4b6b6e5eac3") },
  { id: "p33", name: "Milton Water Bottle (1.5Ltr)", price: 195, originalPrice: 260, description: "Milton 1.5L water bottle.", category: "bottles", image: img("1602243383222-b4b6b6e5eac3") },
  { id: "p34", name: "Milton Mike Bottle (1Ltr)", price: 195, originalPrice: 260, description: "Milton Mike 1L water bottle.", category: "bottles", image: img("1602243383222-b4b6b6e5eac3") },
  { id: "p35", name: "Milton Prize 500ML Bottle", price: 145, originalPrice: 199, description: "Milton Prize 500ml compact bottle.", category: "bottles", image: img("1602243383222-b4b6b6e5eac3") },
  { id: "p36", name: "Milton ACE Flip 500ML Bottle", price: 165, originalPrice: 220, description: "Milton ACE flip-top 500ml bottle.", category: "bottles", image: img("1602243383222-b4b6b6e5eac3") },
  { id: "p37", name: "Milton Maven (1Ltr) Bottle", price: 650, originalPrice: 850, description: "Milton Maven premium 1L bottle.", category: "bottles", image: img("1602243383222-b4b6b6e5eac3"), badge: "Premium" },
  { id: "p38", name: "Milton Pacific (Set of 6) 1Ltr", price: 850, originalPrice: 1100, description: "Milton Pacific set of 6 bottles.", category: "bottles", image: img("1602243383222-b4b6b6e5eac3"), badge: "Value Pack" },
  { id: "p39", name: "Milton Wide Mouth Pet Bottle Set", price: 270, originalPrice: 360, description: "Milton wide mouth pet bottle set.", category: "bottles", image: img("1602243383222-b4b6b6e5eac3") },
  { id: "p40", name: "Milton Tetra (Set of 1Ltr)", price: 265, originalPrice: 350, description: "Milton Tetra 1L bottle set.", category: "bottles", image: img("1602243383222-b4b6b6e5eac3") },
  { id: "p41", name: "Milton Duplex Bucket (18Ltr)", price: 615, originalPrice: 799, description: "Milton heavy-duty 18L bucket.", category: "home", image: img("1556228578-0d85b1a4d571"), badge: "Popular" },
  { id: "p42", name: "Milton Infuser Bottle (1Ltr)", price: 225, originalPrice: 299, description: "Milton infuser bottle with filter.", category: "bottles", image: img("1602243383222-b4b6b6e5eac3") },
  // Cups, Plates & Bowls
  { id: "p43", name: "Paper Cup (Tea Cup 55ml)", price: 55, originalPrice: 75, description: "Disposable paper tea cups 55ml.", category: "cups", image: img("1577720643272-265f434e898f") },
  { id: "p44", name: "Paper Cups (TeaCups) 100ml", price: 85, originalPrice: 110, description: "Disposable paper cups 100ml pack.", category: "cups", image: img("1577720643272-265f434e898f") },
  { id: "p45", name: "Paper Cups (TeaCups) 115ml", price: 90, originalPrice: 120, description: "Paper tea cups 115ml pack.", category: "cups", image: img("1577720643272-265f434e898f") },
  { id: "p46", name: "Paper Cups WaterGlass 250ml", price: 120, originalPrice: 160, description: "Paper water glass cups 250ml.", category: "cups", image: img("1577720643272-265f434e898f") },
  { id: "p47", name: "Paper Cups WaterGlass 200ml", price: 100, originalPrice: 140, description: "Paper water glass cups 200ml.", category: "cups", image: img("1577720643272-265f434e898f") },
  { id: "p48", name: "Paper Plates 11 Inch (Set of 25)", price: 199, originalPrice: 260, description: "Disposable paper plates 11 inch.", category: "cups", image: img("1577720643272-265f434e898f") },
  { id: "p49", name: "Paper Plates 9 Inch (Set of 25)", price: 150, originalPrice: 199, description: "Disposable paper plates 9 inch.", category: "cups", image: img("1577720643272-265f434e898f") },
  { id: "p50", name: "Bowls 180ML (Set of 50 Piece)", price: 199, originalPrice: 260, description: "Disposable bowls 180ml set of 50.", category: "cups", image: img("1577720643272-265f434e898f"), badge: "Bulk" },
  // FineWare Kitchen
  { id: "p51", name: "FineWare Water Mug", price: 85, originalPrice: 120, description: "FineWare premium water mug.", category: "kitchen", image: img("1556228578-0d85b1a4d571") },
  { id: "p52", name: "FineWare Coffee Mug", price: 99, originalPrice: 140, description: "FineWare premium coffee mug.", category: "kitchen", image: img("1556228578-0d85b1a4d571") },
  { id: "p53", name: "Milton Star MFG Mug", price: 89, originalPrice: 125, description: "Milton Star MFG premium mug.", category: "kitchen", image: img("1556228578-0d85b1a4d571") },
  { id: "p54", name: "Milton Solo Orbit MUG", price: 95, originalPrice: 130, description: "Milton Solo Orbit ergonomic mug.", category: "kitchen", image: img("1556228578-0d85b1a4d571") },
  { id: "p55", name: "FineWare Oriental Plate 11inch", price: 246, originalPrice: 320, description: "Premium oriental design plate.", category: "kitchen", image: img("1586775206919-3819e5cad92c"), badge: "Premium" },
  { id: "p56", name: "FineWare Oriental Bowl 6 inch", price: 101, originalPrice: 140, description: "FineWare oriental bowl 6 inch.", category: "kitchen", image: img("1586775206919-3819e5cad92c") },
  { id: "p57", name: "FineWare Oriental Bowl 4.5 inch", price: 75, originalPrice: 105, description: "FineWare oriental bowl 4.5 inch.", category: "kitchen", image: img("1586775206919-3819e5cad92c") },
  { id: "p58", name: "FineWare Oriental Bowl 8 inch", price: 155, originalPrice: 210, description: "FineWare oriental bowl 8 inch.", category: "kitchen", image: img("1586775206919-3819e5cad92c") },
  { id: "p59", name: "FineWare Full Plate 10.5 inch", price: 199, originalPrice: 270, description: "FineWare full plate 10.5 inch.", category: "kitchen", image: img("1586775206919-3819e5cad92c") },
  { id: "p60", name: "FineWare Full Plate Round 10.5", price: 221, originalPrice: 290, description: "FineWare round full plate.", category: "kitchen", image: img("1586775206919-3819e5cad92c") },
  { id: "p61", name: "FineWare Ten Spoon (Set of 6)", price: 204, originalPrice: 270, description: "FineWare spoon set of 6.", category: "kitchen", image: img("1586775206919-3819e5cad92c") },
  { id: "p62", name: "FineWare Ladle Small", price: 65, originalPrice: 90, description: "FineWare small cooking ladle.", category: "kitchen", image: img("1586775206919-3819e5cad92c") },
  { id: "p63", name: "FineWare Round Bowl 3 inch", price: 45, originalPrice: 65, description: "FineWare round bowl 3 inch.", category: "kitchen", image: img("1586775206919-3819e5cad92c") },
  { id: "p64", name: "FineWare RiceCutter FERN", price: 80, originalPrice: 110, description: "FineWare rice cutter fern.", category: "kitchen", image: img("1586775206919-3819e5cad92c") },
  { id: "p65", name: "FineWare Square Bowl 5 inch", price: 98, originalPrice: 135, description: "FineWare square bowl 5 inch.", category: "kitchen", image: img("1586775206919-3819e5cad92c") },
  { id: "p66", name: "FineWare Bowl HMR 7 inch", price: 203, originalPrice: 270, description: "FineWare HMR bowl 7 inch.", category: "kitchen", image: img("1586775206919-3819e5cad92c") },
  { id: "p67", name: "FineWare Square Plate 6.5 inch", price: 115, originalPrice: 155, description: "FineWare square plate 6.5 inch.", category: "kitchen", image: img("1586775206919-3819e5cad92c") },
  // Containers
  { id: "p68", name: "Tiffin Box (Food Container)", price: 199, originalPrice: 260, description: "Durable food container tiffin box.", category: "containers", image: img("1563453392212-326f5e854473") },
  { id: "p69", name: "NTN Dust Pan Rubber", price: 75, originalPrice: 105, description: "Rubber dust pan for easy sweeping.", category: "home", image: img("1584813470613-5b1c1cad3d69") },
  { id: "p70", name: "NKD Round Bucket LTR 60", price: 1500, originalPrice: 1900, description: "Large 60L round bucket for heavy use.", category: "home", image: img("1556228578-0d85b1a4d571") },
  { id: "p71", name: "Foil Container (Food)", price: 350, originalPrice: 450, description: "Aluminium foil food containers.", category: "containers", image: img("1563453392212-326f5e854473") },
  // Tissues
  { id: "p72", name: "Pressure Tissue Paper", price: 100, originalPrice: 135, description: "Pressure tissue paper rolls.", category: "tissues", image: img("1584813470613-5b1c1cad3d69") },
  { id: "p73", name: "Tissue Paper Normal", price: 75, originalPrice: 100, description: "Normal tissue paper pack.", category: "tissues", image: img("1584813470613-5b1c1cad3d69") },
  { id: "p74", name: "Riti Tissue", price: 65, originalPrice: 90, description: "Riti brand soft tissue paper.", category: "tissues", image: img("1584813470613-5b1c1cad3d69") },
  { id: "p75", name: "Supreme Extra Soft Tissue", price: 85, originalPrice: 115, description: "Supreme extra soft tissue paper.", category: "tissues", image: img("1584813470613-5b1c1cad3d69"), badge: "Popular" },
  { id: "p76", name: "M-Fold Tissue Paper", price: 660, originalPrice: 850, description: "M-Fold tissue paper bulk pack.", category: "tissues", image: img("1584813470613-5b1c1cad3d69"), badge: "Bulk" },
  { id: "p77", name: "Royal Toilet Tissue (Round)", price: 45, originalPrice: 65, description: "Royal round toilet tissue rolls.", category: "tissues", image: img("1584813470613-5b1c1cad3d69") },
  { id: "p78", name: "Riti Napkins (Tissue)", price: 35, originalPrice: 50, description: "Riti soft napkin tissues.", category: "tissues", image: img("1584813470613-5b1c1cad3d69") },
  // Gloves
  { id: "p79", name: "Mice Latex Hand Gloves", price: 130, originalPrice: 180, description: "Mice brand latex hand gloves.", category: "gloves", image: img("1584483766114-2cea6facdf57") },
  { id: "p80", name: "Max Latex Hand Gloves", price: 135, originalPrice: 185, description: "Max brand heavy-duty latex gloves.", category: "gloves", image: img("1584483766114-2cea6facdf57"), badge: "Best Seller" },
  // Stationery & Pouches
  { id: "p81", name: "Notebook LongSize (200 Pages)", price: 80, originalPrice: 110, description: "Long size notebook 200 pages.", category: "stationery", image: img("1605214174585-fe31582dc5d0") },
  { id: "p82", name: "Notebook LongSize (100 Pages)", price: 50, originalPrice: 70, description: "Long size notebook 100 pages.", category: "stationery", image: img("1605214174585-fe31582dc5d0") },
  { id: "p83", name: "Silver Pouch 7x9", price: 150, originalPrice: 200, description: "Silver pouch 7x9 size pack.", category: "containers", image: img("1577720643272-265f434e898f") },
  { id: "p84", name: "Silver Pouch 4x6", price: 100, originalPrice: 140, description: "Silver pouch 4x6 size pack.", category: "containers", image: img("1577720643272-265f434e898f") },
  { id: "p85", name: "Paper Cover 1KG", price: 85, originalPrice: 115, description: "Paper cover 1KG pack.", category: "containers", image: img("1577720643272-265f434e898f") },
  { id: "p86", name: "Paper Cover 2KG", price: 120, originalPrice: 160, description: "Paper cover 2KG pack.", category: "containers", image: img("1577720643272-265f434e898f") },
  // Fresheners
  { id: "p87", name: "Odonil Room Freshener", price: 75, originalPrice: 99, description: "Odonil room freshener block.", category: "fresheners", image: img("1607006344380-b6775a0824a7") },
  { id: "p88", name: "Godrej Air Packet", price: 45, originalPrice: 65, description: "Godrej air freshener packet.", category: "fresheners", image: img("1607006344380-b6775a0824a7") },
  // Mops
  { id: "p89", name: "Dry Mop Set Normal", price: 400, originalPrice: 550, description: "Standard dry mop set complete.", category: "mops", image: img("1584813470613-5b1c1cad3d69") },
  { id: "p90", name: "Dry Mop Refill", price: 150, originalPrice: 210, description: "Replacement refill for dry mop.", category: "mops", image: img("1584813470613-5b1c1cad3d69") },
  // Cleaning Liquids
  { id: "p91", name: "Kumkulake Timer (1Ltr)", price: 120, originalPrice: 160, description: "Kumkulake cleaning timer 1L.", category: "floor", image: img("1573496359142-b8d87734a5a5") },
  { id: "p92", name: "Ceramic Cleaning Liquid (900ML)", price: 250, originalPrice: 330, description: "Specialized ceramic cleaning liquid.", category: "floor", image: img("1573496359142-b8d87734a5a5"), badge: "New" },
];

export const comboDeals = [
  { id: "combo1", name: "Complete Floor Care Bundle", products: ["p3", "p6", "p23"], originalPrice: 890, dealPrice: 649, description: "Dry mop, wiper, and phenyle for sparkling floors" },
  { id: "combo2", name: "Premium Washroom Kit", products: ["p27", "p10", "p30"], originalPrice: 808, dealPrice: 599, description: "Harpic, Colin glass cleaner, and urinal cakes" },
  { id: "combo3", name: "Kitchen Essentials Pack", products: ["p55", "p56", "p61"], originalPrice: 730, dealPrice: 499, description: "FineWare oriental plate, bowl, and spoon set" },
  { id: "combo4", name: "Milton Bottle Combo", products: ["p34", "p37", "p42"], originalPrice: 1409, dealPrice: 999, description: "Mike bottle, Maven bottle, and Infuser bottle" },
  { id: "combo5", name: "Tissue & Hygiene Pack", products: ["p76", "p75", "p80"], originalPrice: 1065, dealPrice: 799, description: "M-Fold tissue, Supreme tissue, and latex gloves" },
  { id: "combo6", name: "Budget Cleaning Starter", products: ["p4", "p24", "p25"], originalPrice: 174, dealPrice: 119, description: "Scrubber set, broom, and hand wash to get started" },
];
