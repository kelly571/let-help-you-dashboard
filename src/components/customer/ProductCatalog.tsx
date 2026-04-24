import React, { useState, useMemo } from "react";
import { Search, ShoppingCart, Info, Plus, Minus, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface ProductOption {
  label: string;
  price: number;
}

interface Product {
  id: string;
  name: string;
  brand: string;
  category: "Whiskies" | "Vodka" | "Gin" | "Rum" | "Brandy" | "Liqueurs" | "Wines & Ciders" | "Beer" | "Cigarettes" | "Ratish";
  image: string;
  options: ProductOption[];
  description?: string;
}

const PRODUCTS: Product[] = [
  // Whiskies - Blended Scotch
  {
    id: "jw-red",
    name: "Johnnie Walker Red Label",
    brand: "Johnnie Walker",
    category: "Whiskies",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/whiskies-52be5a66-1777024124838.webp",
    options: [{ label: "750ml", price: 2200 }, { label: "1 Litre", price: 2800 }],
    description: "The pioneer blend, a versatile and universal appeal."
  },
  {
    id: "jw-black",
    name: "Johnnie Walker Black Label",
    brand: "Johnnie Walker",
    category: "Whiskies",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/whiskies-52be5a66-1777024124838.webp",
    options: [{ label: "750ml", price: 4800 }, { label: "1 Litre", price: 6200 }],
  },
  {
    id: "jw-gold",
    name: "Johnnie Walker Gold Label",
    brand: "Johnnie Walker",
    category: "Whiskies",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/whiskies-52be5a66-1777024124838.webp",
    options: [{ label: "750ml", price: 6500 }],
  },
  {
    id: "jw-blue",
    name: "Johnnie Walker Blue Label",
    brand: "Johnnie Walker",
    category: "Whiskies",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/whiskies-52be5a66-1777024124838.webp",
    options: [{ label: "750ml", price: 28000 }],
  },
  {
    id: "chivas-12",
    name: "Chivas Regal 12 Year Old",
    brand: "Chivas Regal",
    category: "Whiskies",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/whiskies-52be5a66-1777024124838.webp",
    options: [{ label: "750ml", price: 4500 }],
  },
  {
    id: "ballantines",
    name: "Ballantine's Finest",
    brand: "Ballantine's",
    category: "Whiskies",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/whiskies-52be5a66-1777024124838.webp",
    options: [{ label: "750ml", price: 2000 }],
  },
  {
    id: "fam-grouse",
    name: "Famous Grouse",
    brand: "Famous Grouse",
    category: "Whiskies",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/whiskies-52be5a66-1777024124838.webp",
    options: [{ label: "750ml", price: 2200 }],
  },
  // Single Malts
  {
    id: "glenfiddich-12",
    name: "Glenfiddich 12 Year Old",
    brand: "Glenfiddich",
    category: "Whiskies",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/whiskies-52be5a66-1777024124838.webp",
    options: [{ label: "750ml", price: 6500 }],
  },
  {
    id: "glenlivet-12",
    name: "Glenlivet 12 Year Old",
    brand: "Glenlivet",
    category: "Whiskies",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/whiskies-52be5a66-1777024124838.webp",
    options: [{ label: "750ml", price: 6000 }],
  },
  {
    id: "singleton-12",
    name: "Singleton 12 Year Old",
    brand: "Singleton",
    category: "Whiskies",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/whiskies-52be5a66-1777024124838.webp",
    options: [{ label: "750ml", price: 5500 }],
  },
  // Irish
  {
    id: "jameson-std",
    name: "Jameson Irish Whiskey",
    brand: "Jameson",
    category: "Whiskies",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/whiskies-52be5a66-1777024124838.webp",
    options: [{ label: "750ml", price: 3200 }, { label: "1 Litre", price: 4200 }],
  },
  {
    id: "jameson-black",
    name: "Jameson Black Barrel",
    brand: "Jameson",
    category: "Whiskies",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/whiskies-52be5a66-1777024124838.webp",
    options: [{ label: "750ml", price: 4800 }],
  },
  // Bourbon
  {
    id: "jd-no7",
    name: "Jack Daniel's Old No. 7",
    brand: "Jack Daniel's",
    category: "Whiskies",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/whiskies-52be5a66-1777024124838.webp",
    options: [{ label: "750ml", price: 3800 }, { label: "1 Litre", price: 4900 }],
  },
  {
    id: "jim-beam",
    name: "Jim Beam White Label",
    brand: "Jim Beam",
    category: "Whiskies",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/whiskies-52be5a66-1777024124838.webp",
    options: [{ label: "750ml", price: 2800 }],
  },

  // Vodka
  {
    id: "smirnoff-vodka",
    name: "Smirnoff Red Vodka",
    brand: "Smirnoff",
    category: "Vodka",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/vodka-b08ed799-1777024125601.webp",
    options: [{ label: "250ml", price: 520 }, { label: "750ml", price: 1550 }],
  },
  {
    id: "absolut-vodka",
    name: "Absolut Blue Vodka",
    brand: "Absolut",
    category: "Vodka",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/vodka-b08ed799-1777024125601.webp",
    options: [{ label: "750ml", price: 2800 }],
  },
  {
    id: "grey-goose",
    name: "Grey Goose Vodka",
    brand: "Grey Goose",
    category: "Vodka",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/vodka-b08ed799-1777024125601.webp",
    options: [{ label: "750ml", price: 6500 }],
  },
  {
    id: "ciroc-vodka",
    name: "Ciroc Snap Frost",
    brand: "Ciroc",
    category: "Vodka",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/vodka-b08ed799-1777024125601.webp",
    options: [{ label: "750ml", price: 6000 }],
  },
  {
    id: "blue-ice-v",
    name: "Blue Ice Vodka",
    brand: "Blue Ice",
    category: "Vodka",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/vodka-b08ed799-1777024125601.webp",
    options: [{ label: "250ml", price: 200 }, { label: "750ml", price: 720 }],
  },

  // Gin
  {
    id: "gilbeys-gin",
    name: "Gilbey's Special Dry Gin",
    brand: "Gilbey's",
    category: "Gin",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/gin-82974703-1777024125205.webp",
    options: [{ label: "250ml", price: 500 }, { label: "750ml", price: 1450 }],
  },
  {
    id: "tanqueray-gin",
    name: "Tanqueray London Dry",
    brand: "Tanqueray",
    category: "Gin",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/gin-82974703-1777024125205.webp",
    options: [{ label: "750ml", price: 3500 }],
  },
  {
    id: "gordons-gin",
    name: "Gordon's London Dry Gin",
    brand: "Gordon's",
    category: "Gin",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/gin-82974703-1777024125205.webp",
    options: [{ label: "250ml", price: 720 }, { label: "750ml", price: 2100 }],
  },
  {
    id: "hendricks-gin",
    name: "Hendrick's Gin",
    brand: "Hendrick's",
    category: "Gin",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/gin-82974703-1777024125205.webp",
    options: [{ label: "750ml", price: 6500 }],
  },

  // Rum
  {
    id: "kc-coconut",
    name: "Kenya Cane Coconut",
    brand: "Kenya Cane",
    category: "Rum",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/rum-2dadcb03-1777024125696.webp",
    options: [{ label: "750ml", price: 850 }],
  },
  {
    id: "kc-smooth",
    name: "Kenya Cane Smooth",
    brand: "Kenya Cane",
    category: "Rum",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/rum-2dadcb03-1777024125696.webp",
    options: [{ label: "250ml", price: 280 }, { label: "750ml", price: 820 }],
  },
  {
    id: "cap-morgan-gold",
    name: "Captain Morgan Gold",
    brand: "Captain Morgan",
    category: "Rum",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/rum-2dadcb03-1777024125696.webp",
    options: [{ label: "250ml", price: 480 }, { label: "750ml", price: 1350 }],
  },

  // Brandy
  {
    id: "viceroy-brandy",
    name: "Viceroy 5 Year Old",
    brand: "Viceroy",
    category: "Brandy",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/brandy-97d7958f-1777024125196.webp",
    options: [{ label: "750ml", price: 1800 }],
  },
  {
    id: "richot-brandy",
    name: "Richot Brandy",
    brand: "Richot",
    category: "Brandy",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/brandy-97d7958f-1777024125196.webp",
    options: [{ label: "750ml", price: 1600 }],
  },

  // Liqueurs
  {
    id: "baileys-irish",
    name: "Baileys Irish Cream",
    brand: "Baileys",
    category: "Liqueurs",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/liqueurs-6c348d3b-1777024124839.webp",
    options: [{ label: "750ml", price: 3000 }],
  },
  {
    id: "amarula-cream",
    name: "Amarula Fruit Cream",
    brand: "Amarula",
    category: "Liqueurs",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/liqueurs-6c348d3b-1777024124839.webp",
    options: [{ label: "750ml", price: 2800 }],
  },
  {
    id: "jager-std",
    name: "Jagermeister",
    brand: "Jagermeister",
    category: "Liqueurs",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/liqueurs-6c348d3b-1777024124839.webp",
    options: [{ label: "700ml", price: 3200 }],
  },

  // Wines & Ciders
  {
    id: "4th-street-red",
    name: "4th Street Sweet Red",
    brand: "4th Street",
    category: "Wines & Ciders",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/wines-1b036d3e-1777024125519.webp",
    options: [{ label: "750ml", price: 1200 }],
  },
  {
    id: "savanna-dry",
    name: "Savanna Dry Cider",
    brand: "Savanna",
    category: "Wines & Ciders",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/ciders-f56aad9d-1777024128250.webp",
    options: [{ label: "500ml Can", price: 250 }],
  },

  // Beer
  {
    id: "tusker-lager",
    name: "Tusker Lager",
    brand: "EABL",
    category: "Beer",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/local-beer-bottle-a9b0887b-1777021812934.webp",
    options: [{ label: "500ml Bottle/Can", price: 210 }],
  },
  {
    id: "whitecap-std",
    name: "White Cap Lager",
    brand: "EABL",
    category: "Beer",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/local-beer-bottle-a9b0887b-1777021812934.webp",
    options: [{ label: "500ml Bottle/Can", price: 225 }],
  },
  {
    id: "heineken-std",
    name: "Heineken Lager",
    brand: "Heineken",
    category: "Beer",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/local-beer-bottle-a9b0887b-1777021812934.webp",
    options: [{ label: "500ml Can", price: 280 }],
  },

  // Ratish
  {
    id: "ratish-spec",
    name: "Ratish Special",
    brand: "Local",
    category: "Ratish",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/kenyan-cane-67035fc1-1777021813037.webp",
    options: [{ label: "250ml", price: 200 }, { label: "750ml", price: 500 }],
  },

  // Cigarettes
  {
    id: "embassy-kings",
    name: "Embassy Kings",
    brand: "BAT",
    category: "Cigarettes",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/single-cigarette-fe86a854-1777021812662.webp",
    options: [{ label: "Single Stick", price: 25 }, { label: "Full Pack (20)", price: 500 }],
  },
  {
    id: "sportsman-std",
    name: "Sportsman",
    brand: "BAT",
    category: "Cigarettes",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/98300605-3271-41ac-9585-201cdb695d5a/single-cigarette-fe86a854-1777021812662.webp",
    options: [{ label: "Single Stick", price: 20 }, { label: "Full Pack (20)", price: 400 }],
  },
];

const ProductCard = ({ product, showCategoryTag }: { product: Product; showCategoryTag?: boolean }) => {
  const [selectedOptionIdx, setSelectedOptionIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const selectedOption = product.options[selectedOptionIdx];

  const handleAddToCart = () => {
    toast.success(`Added ${quantity}x ${product.name} (${selectedOption.label}) to cart!`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden flex flex-col h-full group transition-all hover:shadow-md border-slate-200">
        <div className="aspect-square relative overflow-hidden bg-slate-100">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-tight">
              {product.brand}
            </Badge>
            {showCategoryTag && (
              <Badge className="bg-emerald-600 text-white border-0 text-[10px] font-bold uppercase">
                {product.category}
              </Badge>
            )}
          </div>
        </div>
        <CardHeader className="p-3 space-y-1">
          <div className="flex justify-between items-start gap-1">
            <CardTitle className="text-sm font-bold leading-tight">{product.name}</CardTitle>
            <Info className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
          </div>
        </CardHeader>
        <CardContent className="p-3 pt-0 space-y-3 flex-1">
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground">Size / Type</p>
            <Select
              value={selectedOptionIdx.toString()}
              onValueChange={(val) => setSelectedOptionIdx(parseInt(val))}
            >
              <SelectTrigger className="h-8 text-xs font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {product.options.map((opt, idx) => (
                  <SelectItem key={idx} value={idx.toString()} className="text-xs font-medium">
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Price</span>
              <span className="text-sm font-black text-emerald-600 tracking-tight">
                Ksh {selectedOption.price.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-md hover:bg-white"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="text-xs font-bold w-4 text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-md hover:bg-white"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-3 pt-0">
          <Button
            onClick={handleAddToCart}
            className="w-full h-9 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm active:scale-95 transition-transform"
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const ProductCatalog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Product["category"]>("Whiskies");

  const isSearching = searchQuery.trim().length > 0;

  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (isSearching) {
      return PRODUCTS.filter((p) => {
        return (
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query)
        );
      });
    }
    return PRODUCTS.filter((p) => p.category === activeCategory);
  }, [searchQuery, activeCategory, isSearching]);

  const categories: Product["category"][] = [
    "Whiskies", "Vodka", "Gin", "Rum", "Brandy", "Liqueurs", "Wines & Ciders", "Beer", "Cigarettes", "Ratish"
  ];

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-5 bg-emerald-600 text-white">
        <div className="flex items-center justify-between mb-5">
          <div className="flex flex-col">
            <h2 className="text-xl font-black tracking-tighter">Dala Marketplace</h2>
            <p className="text-[10px] text-emerald-100 font-bold uppercase tracking-widest">Premium Liquor & More</p>
          </div>
          <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 text-white border-0">
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
            <Search className="h-4 w-4 text-emerald-100" />
          </div>
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="search"
            placeholder="Search anything... (e.g. Walker, Jameson, Savanna)"
            className="pl-11 pr-11 bg-white/15 border-white/20 text-white placeholder:text-emerald-100/70 h-12 rounded-2xl focus-visible:ring-emerald-400 focus-visible:bg-white/20 transition-all"
          />
          <AnimatePresence>
            {isSearching && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="h-4 w-4 text-white" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="w-full">
        <div className="px-4 py-3 border-b bg-slate-50/50 sticky top-[68px] z-10 backdrop-blur-sm overflow-x-auto no-scrollbar">
          <div className="flex gap-2 min-w-max pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2 text-[11px] font-black uppercase tracking-tight transition-all border ${ 
                  activeCategory === cat 
                    ? "bg-emerald-600 text-white shadow-md border-emerald-600" 
                    : "bg-white text-slate-500 border-slate-200 hover:border-emerald-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 min-h-[400px]">
          {isSearching && (
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-black px-3 py-1 text-[10px] uppercase">
                  Global Search Result
                </Badge>
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                  {filteredProducts.length} items found
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 text-[10px] font-black uppercase text-slate-400 hover:text-emerald-600"
                onClick={handleClearSearch}
              >
                Reset View
              </Button>
            </div>
          )}

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    showCategoryTag={isSearching} 
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-20 text-center flex flex-col items-center justify-center"
            >
              <div className="h-20 w-20 rounded-3xl bg-slate-100 flex items-center justify-center mb-6">
                <Search className="h-8 w-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight mb-2">Oops! No matches found</h3>
              <p className="text-sm text-slate-500 max-w-[240px] mx-auto leading-relaxed">
                We couldn't find "<span className="font-bold text-slate-800">{searchQuery}</span>" in our catalog.
              </p>
              <Button 
                variant="outline" 
                className="mt-8 rounded-2xl font-black uppercase text-[10px] border-2 h-11 px-8 hover:bg-slate-50"
                onClick={handleClearSearch}
              >
                View All Products <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;