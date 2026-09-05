"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Filter,
  X,
  ShoppingBag,
  Sparkles,
  Search,
  RotateCcw,
  ChevronRight,
  Tag,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import FilterSidebar from "../shopComponents/FilterSidebar";
import ProductGrid, { Product } from "../shopComponents/ProductGrid";

// Full Comprehensive Grocery Catalog
const allProducts: Product[] = [
  // Vegetables
  {
    id: 1,
    name: "Farm Fresh Tomatoes",
    price: 80,
    originalPrice: 100,
    rating: 4.8,
    reviews: 124,
    image:
      "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Vegetables",
    categorySlug: "vegetables",
    unit: "1 kg",
    inStock: true,
    stockLevel: "high",
    badge: "Organic",
  },
  {
    id: 2,
    name: "Diamond Potatoes (Alu)",
    price: 32,
    originalPrice: 48,
    rating: 4.8,
    reviews: 95,
    image:
      "https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Vegetables",
    categorySlug: "vegetables",
    unit: "1 kg",
    inStock: true,
    stockLevel: "high",
    badge: "Best Seller",
  },
  {
    id: 3,
    name: "Crisp Red Onions (Deshi Peyaj)",
    price: 65,
    originalPrice: 85,
    rating: 4.7,
    reviews: 110,
    image:
      "https://images.pexels.com/photos/533342/pexels-photo-533342.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Vegetables",
    categorySlug: "vegetables",
    unit: "1 kg",
    inStock: true,
    stockLevel: "medium",
  },
  {
    id: 4,
    name: "Fresh Green Spinach (Palong Shak)",
    price: 25,
    originalPrice: 40,
    rating: 4.9,
    reviews: 58,
    image:
      "https://images.pexels.com/photos/576831/pexels-photo-576831.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Vegetables",
    categorySlug: "vegetables",
    unit: "1 Bunch",
    inStock: true,
    stockLevel: "medium",
    badge: "Fresh Pick",
  },
  {
    id: 5,
    name: "Fresh Crunchy Carrots (Gajor)",
    price: 50,
    originalPrice: 65,
    rating: 4.6,
    reviews: 82,
    image:
      "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Vegetables",
    categorySlug: "vegetables",
    unit: "1 kg",
    inStock: true,
    stockLevel: "high",
  },
  {
    id: 6,
    name: "Green Chili & Coriander Leaves",
    price: 35,
    originalPrice: 45,
    rating: 4.8,
    reviews: 64,
    image:
      "https://images.pexels.com/photos/1400172/pexels-photo-1400172.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Vegetables",
    categorySlug: "vegetables",
    unit: "1 Combo Pack",
    inStock: true,
    stockLevel: "high",
  },

  // Fruits / Fresh Produce
  {
    id: 7,
    name: "Sweet Local Bananas (Sagor Kola)",
    price: 45,
    originalPrice: 55,
    rating: 4.7,
    reviews: 67,
    image:
      "https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Fresh Produce",
    categorySlug: "fresh-produce",
    unit: "1 Dozen",
    inStock: true,
    stockLevel: "low",
  },
  {
    id: 8,
    name: "Fresh Red Apples (Royal Gala)",
    price: 220,
    originalPrice: 260,
    rating: 4.9,
    reviews: 142,
    image:
      "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Fresh Produce",
    categorySlug: "fresh-produce",
    unit: "1 kg",
    inStock: true,
    stockLevel: "high",
    badge: "Imported",
  },
  {
    id: 9,
    name: "Juicy Sweet Oranges (Komla)",
    price: 180,
    originalPrice: 210,
    rating: 4.7,
    reviews: 89,
    image:
      "https://images.pexels.com/photos/209439/pexels-photo-209439.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Fresh Produce",
    categorySlug: "fresh-produce",
    unit: "1 kg",
    inStock: true,
    stockLevel: "medium",
  },

  // Dairy & Eggs
  {
    id: 10,
    name: "Pure Farm Fresh Cow Milk",
    price: 85,
    originalPrice: 95,
    rating: 4.9,
    reviews: 203,
    image:
      "https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Dairy & Eggs",
    categorySlug: "dairy",
    unit: "1 Liter",
    inStock: true,
    stockLevel: "high",
    badge: "Daily Fresh",
  },
  {
    id: 11,
    name: "Country Brown Eggs (Deshi Dim)",
    price: 155,
    originalPrice: 175,
    rating: 4.9,
    reviews: 178,
    image:
      "https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Dairy & Eggs",
    categorySlug: "dairy",
    unit: "1 Dozen (12 pcs)",
    inStock: true,
    stockLevel: "high",
    badge: "Pure Deshi",
  },

  // Rice & Grains
  {
    id: 12,
    name: "Premium Kalijira Aromatic Rice",
    price: 150,
    originalPrice: 180,
    rating: 4.9,
    reviews: 134,
    image:
      "https://images.pexels.com/photos/4110257/pexels-photo-4110257.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Rice & Grains",
    categorySlug: "grains-&-rice",
    unit: "1 kg",
    inStock: true,
    stockLevel: "medium",
    badge: "Bestseller",
  },
  {
    id: 13,
    name: "Premium Miniket Rice (Shoru Chal)",
    price: 72,
    originalPrice: 85,
    rating: 4.8,
    reviews: 98,
    image:
      "https://images.pexels.com/photos/4110257/pexels-photo-4110257.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Rice & Grains",
    categorySlug: "grains-&-rice",
    unit: "1 kg",
    inStock: true,
    stockLevel: "high",
  },
  {
    id: 14,
    name: "Cold-Pressed Mustard Oil (Sorisha)",
    price: 280,
    originalPrice: 320,
    rating: 4.8,
    reviews: 82,
    image:
      "https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=600",
    category: "Rice & Grains",
    categorySlug: "grains-&-rice",
    unit: "1 Liter",
    inStock: true,
    stockLevel: "medium",
    badge: "Ghānī-Pressed",
  },

  // Seafood & Meat
  {
    id: 15,
    name: "Fresh Broiler Chicken (Dressed)",
    price: 260,
    originalPrice: 290,
    rating: 4.8,
    reviews: 145,
    image:
      "https://images.pexels.com/photos/616838/pexels-photo-616838.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Fish & Seafood",
    categorySlug: "seafood",
    unit: "1 kg",
    inStock: true,
    stockLevel: "medium",
    badge: "Halal",
  },
  {
    id: 16,
    name: "Fresh River Rui Fish (Cleaned)",
    price: 340,
    originalPrice: 390,
    rating: 4.7,
    reviews: 73,
    image:
      "https://images.pexels.com/photos/229789/pexels-photo-229789.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Fish & Seafood",
    categorySlug: "seafood",
    unit: "1 kg",
    inStock: true,
    stockLevel: "low",
  },

  // Snacks & Bakery
  {
    id: 17,
    name: "Crispy Traditional Toast Biscuits",
    price: 65,
    originalPrice: 80,
    rating: 4.6,
    reviews: 55,
    image:
      "https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Snacks & Bakery",
    categorySlug: "snacks",
    unit: "350g Pack",
    inStock: true,
    stockLevel: "high",
  },

  // Beverages
  {
    id: 18,
    name: "Sylhet Organic Premium Black Tea",
    price: 120,
    originalPrice: 140,
    rating: 4.9,
    reviews: 91,
    image:
      "https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Beverages",
    categorySlug: "beverages",
    unit: "200g Pack",
    inStock: true,
    stockLevel: "high",
    badge: "Sylhet Estate",
  },
];

// Available Categories List
const categoriesConfig = [
  { name: "Vegetables", slug: "vegetables" },
  { name: "Fresh Produce", slug: "fresh-produce" },
  { name: "Dairy & Eggs", slug: "dairy" },
  { name: "Rice & Grains", slug: "grains-&-rice" },
  { name: "Fish & Seafood", slug: "seafood" },
  { name: "Snacks & Bakery", slug: "snacks" },
  { name: "Beverages", slug: "beverages" },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL state
  const categoryParam = searchParams.get("category") || "all";
  const queryParam = searchParams.get("q") || "";

  // Local filter states
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync with URL params on change
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    setSearchQuery(queryParam);
  }, [queryParam]);

  // Compute category counts
  const categoriesWithCounts = useMemo(() => {
    return categoriesConfig.map((cat) => {
      const count = allProducts.filter(
        (p) => p.categorySlug.toLowerCase() === cat.slug.toLowerCase()
      ).length;
      return { ...cat, count };
    });
  }, []);

  // Update Category in URL
  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
    const params = new URLSearchParams(searchParams.toString());
    if (slug === "all") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    router.push(`/super-shop/shop?${params.toString()}`, { scroll: false });
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSelectedPriceRange("all");
    setInStockOnly(false);
    setMinRating(0);
    setSortBy("featured");
    router.push("/super-shop/shop", { scroll: false });
  };

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((product) => {
        // Category Filter
        if (
          selectedCategory &&
          selectedCategory !== "all" &&
          product.categorySlug.toLowerCase() !== selectedCategory.toLowerCase()
        ) {
          // If fresh-produce selected, also match fruits or produce
          if (
            selectedCategory.toLowerCase() === "fresh-produce" &&
            (product.categorySlug === "fresh-produce" || product.categorySlug === "vegetables")
          ) {
            // match
          } else {
            return false;
          }
        }

        // Search Query Filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = product.name.toLowerCase().includes(q);
          const matchCat = product.category.toLowerCase().includes(q);
          if (!matchName && !matchCat) return false;
        }

        // Price Range Filter
        if (selectedPriceRange === "under-50" && product.price >= 50) return false;
        if (
          selectedPriceRange === "50-100" &&
          (product.price < 50 || product.price > 100)
        )
          return false;
        if (
          selectedPriceRange === "100-250" &&
          (product.price < 100 || product.price > 250)
        )
          return false;
        if (selectedPriceRange === "over-250" && product.price <= 250) return false;

        // In Stock Filter
        if (inStockOnly && !product.inStock) return false;

        // Rating Filter
        if (minRating > 0 && product.rating < minRating) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "discount") {
          const discountA = (a.originalPrice - a.price) / a.originalPrice;
          const discountB = (b.originalPrice - b.price) / b.originalPrice;
          return discountB - discountA;
        }
        return 0; // featured default
      });
  }, [
    selectedCategory,
    searchQuery,
    selectedPriceRange,
    inStockOnly,
    minRating,
    sortBy,
  ]);

  const isFiltered =
    selectedCategory !== "all" ||
    searchQuery.trim() !== "" ||
    selectedPriceRange !== "all" ||
    inStockOnly ||
    minRating > 0;

  // Active Category Name
  const currentCategoryObj = categoriesConfig.find(
    (c) => c.slug.toLowerCase() === selectedCategory.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-[#070b14] text-slate-900 dark:text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
          <Link
            href="/super-shop"
            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            Super Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            href="/super-shop/shop"
            className={`hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ${
              selectedCategory === "all" ? "font-bold text-slate-900 dark:text-white" : ""
            }`}
          >
            Shop Catalog
          </Link>
          {currentCategoryObj && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {currentCategoryObj.name}
              </span>
            </>
          )}
        </nav>

        {/* Dynamic Header Banner */}
        <div className="bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#303030] rounded-3xl p-6 sm:p-10 shadow-sm mb-8 transition-colors">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-3">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>
                {currentCategoryObj
                  ? `Department: ${currentCategoryObj.name}`
                  : "All Grocery Departments"}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-3">
              {currentCategoryObj
                ? `Fresh ${currentCategoryObj.name}`
                : searchQuery
                ? `Search: "${searchQuery}"`
                : "Explore All Fresh Groceries"}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl font-normal mb-6">
              {currentCategoryObj
                ? `Browse our top-quality selection of ${currentCategoryObj.name.toLowerCase()} sourced directly from verified local growers.`
                : "Order 100% chemical-free vegetables, seasonal fruits, organic grains, and dairy essentials with guaranteed 2-hour delivery."}
            </p>

            {/* Interactive Search Bar */}
            <div className="relative max-w-xl">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name or category (e.g. rice, milk, tomato)..."
                className="w-full pl-12 pr-10 py-3 sm:py-3.5 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] text-slate-900 dark:text-white placeholder-slate-400 text-sm outline-none focus:border-emerald-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Active Filter Chips */}
            {isFiltered && (
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Active filters:
                </span>
                {currentCategoryObj && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                    Category: {currentCategoryObj.name}
                    <button
                      onClick={() => handleCategorySelect("all")}
                      className="hover:text-emerald-900 dark:hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 text-blue-700 dark:text-blue-300 text-xs font-semibold">
                    Search: &ldquo;{searchQuery}&rdquo;
                    <button
                      onClick={() => setSearchQuery("")}
                      className="hover:text-blue-900 dark:hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
                {selectedPriceRange !== "all" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 text-xs font-semibold">
                    Price: {selectedPriceRange}
                    <button
                      onClick={() => setSelectedPriceRange("all")}
                      className="hover:text-amber-900 dark:hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
                {inStockOnly && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/15 text-teal-700 dark:text-teal-300 text-xs font-semibold">
                    In Stock Only
                    <button
                      onClick={() => setInStockOnly(false)}
                      className="hover:text-teal-900 dark:hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-rose-500 hover:text-rose-600 dark:text-rose-400 font-semibold underline ml-1"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-24">
            <FilterSidebar
              categories={categoriesWithCounts}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
              selectedPriceRange={selectedPriceRange}
              onSelectPriceRange={setSelectedPriceRange}
              inStockOnly={inStockOnly}
              onToggleInStock={() => setInStockOnly((prev) => !prev)}
              minRating={minRating}
              onSelectRating={setMinRating}
              onResetFilters={handleResetFilters}
              isFiltered={isFiltered}
            />
          </aside>

          {/* Mobile Filter Toggle Button */}
          <div className="lg:hidden w-full flex items-center justify-between gap-4 mb-2">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="flex-1 py-3 px-4 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#303030] text-slate-800 dark:text-slate-200 text-sm font-bold flex items-center justify-center gap-2 shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Filters & Categories</span>
              {isFiltered && (
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              )}
            </button>
          </div>

          {/* Mobile Filter Drawer / Modal */}
          {isMobileFilterOpen && (
            <div className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end">
              <div className="w-full max-w-xs sm:max-w-sm bg-white dark:bg-[#141414] h-full overflow-y-auto p-5 shadow-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#262626] mb-4">
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">
                      Filters & Categories
                    </h3>
                    <button
                      onClick={() => setIsMobileFilterOpen(false)}
                      className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1f1f1f] text-slate-400"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <FilterSidebar
                    categories={categoriesWithCounts}
                    selectedCategory={selectedCategory}
                    onSelectCategory={(slug) => {
                      handleCategorySelect(slug);
                      setIsMobileFilterOpen(false);
                    }}
                    selectedPriceRange={selectedPriceRange}
                    onSelectPriceRange={setSelectedPriceRange}
                    inStockOnly={inStockOnly}
                    onToggleInStock={() => setInStockOnly((prev) => !prev)}
                    minRating={minRating}
                    onSelectRating={setMinRating}
                    onResetFilters={handleResetFilters}
                    isFiltered={isFiltered}
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-[#262626] mt-6">
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md"
                  >
                    View Results ({filteredProducts.length})
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Product Grid Area */}
          <main className="flex-1 w-full">
            <ProductGrid
              products={filteredProducts}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onResetFilters={handleResetFilters}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] flex items-center justify-center p-8">
          <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
