import Link from "next/link";
import {
  Apple,
  Carrot,
  Milk,
  Fish,
  Dice1 as Rice,
  Cookie,
  Coffee,
  Sparkles,
  Home,
} from "lucide-react";

export default function CategoriesGrid() {
  const categories = [
    {
      name: "Fresh Vegetables",
      icon: Carrot,
      color: "bg-green-100 text-green-600",
      count: "150+ items",
    },
    {
      name: "Fresh Fruits",
      icon: Apple,
      color: "bg-red-100 text-red-600",
      count: "80+ items",
    },
    {
      name: "Dairy Products",
      icon: Milk,
      color: "bg-blue-100 text-blue-600",
      count: "45+ items",
    },
    {
      name: "Meat & Fish",
      icon: Fish,
      color: "bg-orange-100 text-orange-600",
      count: "35+ items",
    },
    {
      name: "Rice & Grains",
      icon: Rice,
      color: "bg-yellow-100 text-yellow-600",
      count: "25+ items",
    },
    {
      name: "Snacks & Treats",
      icon: Cookie,
      color: "bg-purple-100 text-purple-600",
      count: "120+ items",
    },
    {
      name: "Beverages",
      icon: Coffee,
      color: "bg-indigo-100 text-indigo-600",
      count: "60+ items",
    },
    {
      name: "Personal Care",
      icon: Sparkles,
      color: "bg-pink-100 text-pink-600",
      count: "90+ items",
    },
    {
      name: "Household",
      icon: Home,
      color: "bg-gray-100 text-gray-600",
      count: "75+ items",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find everything you need from fresh produce to daily essentials, all
            sourced locally
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/shop?category=${category.name
                .toLowerCase()
                .replace(/ /g, "-")}`}
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-200 transform hover:-translate-y-1">
                <div
                  className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <category.icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">{category.count}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Special offers banner */}
        <div className="mt-16 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-2">Special Weekend Offers!</h3>
          <p className="text-emerald-100 mb-4">
            Get up to 20% off on all fresh produce
          </p>
          <Link
            href="/shop?offer=weekend"
            className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Shop Weekend Deals
          </Link>
        </div>
      </div>
    </section>
  );
}
