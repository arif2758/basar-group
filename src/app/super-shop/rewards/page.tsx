"use client";

import { Star, Gift, Trophy, Users, Crown } from "lucide-react";
import { CartProvider } from "../contexts/CartContext";

import FooterShop from "../shopComponents/FooterShop";

export default function RewardsPage() {
  const userPoints = 1250;
  const pointsToNextLevel = 750;
  const currentLevel = "Silver";

  const rewardTiers = [
    { name: "Bronze", minPoints: 0, color: "bg-amber-600", icon: "🥉" },
    { name: "Silver", minPoints: 1000, color: "bg-gray-400", icon: "🥈" },
    { name: "Gold", minPoints: 2000, color: "bg-yellow-500", icon: "🥇" },
    { name: "Platinum", minPoints: 5000, color: "bg-purple-600", icon: "👑" },
  ];

  const availableRewards = [
    {
      id: 1,
      title: "৳50 Off Next Order",
      points: 500,
      description: "Get ৳50 discount on orders over ৳300",
      type: "discount",
      icon: "💰",
    },
    {
      id: 2,
      title: "Free Delivery (3 orders)",
      points: 300,
      description: "Free delivery on your next 3 orders",
      type: "delivery",
      icon: "🚚",
    },
    {
      id: 3,
      title: "৳100 Off Premium Products",
      points: 800,
      description: "Special discount on premium product range",
      type: "discount",
      icon: "⭐",
    },
    {
      id: 4,
      title: "Double Points Weekend",
      points: 1000,
      description: "Earn 2x points on all purchases for a weekend",
      type: "bonus",
      icon: "🎯",
    },
  ];

  const recentActivity = [
    {
      date: "2025-01-15",
      action: "Purchase",
      points: 150,
      description: "Order #1234 - Fresh Vegetables",
    },
    {
      date: "2025-01-12",
      action: "Purchase",
      points: 80,
      description: "Order #1233 - Dairy Products",
    },
    {
      date: "2025-01-10",
      action: "Bonus",
      points: 100,
      description: "First order of the month bonus",
    },
    {
      date: "2025-01-08",
      action: "Purchase",
      points: 120,
      description: "Order #1232 - Weekly Groceries",
    },
    {
      date: "2025-01-05",
      action: "Redeemed",
      points: -500,
      description: "Redeemed ৳50 discount coupon",
    },
  ];

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
      
        <main className="max-w-7xl mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Rewards Program
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Earn points with every purchase and unlock exclusive rewards. The
              more you shop, the more you save!
            </p>
          </div>

          {/* Points Overview */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-2xl p-8 text-white mb-8">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                  <Crown className="w-8 h-8 text-yellow-300" />
                  <span className="text-2xl font-bold">
                    {currentLevel} Member
                  </span>
                </div>
                <div className="text-4xl font-bold mb-2">
                  {userPoints.toLocaleString()}
                </div>
                <div className="text-emerald-100">Total Points</div>
              </div>

              <div className="text-center">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-2xl font-bold mb-2">
                    {pointsToNextLevel}
                  </div>
                  <div className="text-emerald-100 mb-3">
                    Points to Gold Level
                  </div>
                  <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
                    <div
                      className="bg-yellow-400 h-3 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          ((userPoints - 1000) / (2000 - 1000)) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="text-center md:text-right">
                <div className="text-lg font-semibold mb-2">
                  Next Tier Benefits
                </div>
                <ul className="text-sm text-emerald-100 space-y-1">
                  <li>🎁 15% bonus points</li>
                  <li>🚚 Priority delivery</li>
                  <li>💝 Exclusive offers</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Reward Tiers */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Membership Tiers
                </h2>
                <div className="space-y-4">
                  {rewardTiers.map((tier, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        tier.name === currentLevel
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{tier.icon}</span>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800">
                            {tier.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {tier.minPoints}+ points
                          </div>
                        </div>
                        {tier.name === currentLevel && (
                          <div className="text-emerald-600 font-semibold text-sm">
                            Current
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Points Activity */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-gray-800 text-sm">
                          {activity.description}
                        </div>
                        <div className="text-xs text-gray-500">
                          {activity.date}
                        </div>
                      </div>
                      <div
                        className={`font-semibold ${
                          activity.points > 0
                            ? "text-emerald-600"
                            : "text-red-500"
                        }`}
                      >
                        {activity.points > 0 ? "+" : ""}
                        {activity.points}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Available Rewards */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Available Rewards
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {availableRewards.map((reward) => (
                  <div
                    key={reward.id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="text-3xl">{reward.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {reward.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4">
                            {reward.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Star className="w-5 h-5 text-yellow-400 fill-current" />
                              <span className="font-bold text-emerald-600">
                                {reward.points} points
                              </span>
                            </div>
                            <button
                              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                                userPoints >= reward.points
                                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                              }`}
                              disabled={userPoints < reward.points}
                            >
                              {userPoints >= reward.points
                                ? "Redeem"
                                : "Need More Points"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* How to Earn Points */}
              <div className="bg-white rounded-2xl shadow-md p-6 mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  How to Earn Points
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Gift className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Shop & Earn
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Get 1 point for every ৳10 spent
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-orange-600" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Refer Friends
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Earn 200 bonus points for each referral
                    </p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Trophy className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Special Events
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Double points during special promotions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <FooterShop />
      </div>
    </CartProvider>
  );
}
