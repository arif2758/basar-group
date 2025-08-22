import { Users, TrendingUp, Heart, Award } from "lucide-react";
import Image from "next/image";

export default function CommunityImpact() {
  const stats = [
    {
      icon: Users,
      number: "127",
      label: "Youth Employed",
      description: "Local young people earning through our platform",
    },
    {
      icon: TrendingUp,
      number: "৳2.4M",
      label: "Income Generated",
      description: "Total earnings by local youth this year",
    },
    {
      icon: Heart,
      number: "5,200",
      label: "Families Served",
      description: "Community members using our service",
    },
    {
      icon: Award,
      number: "98%",
      label: "Satisfaction Rate",
      description: "Customer satisfaction with our service",
    },
  ];

  return (
    <section className="py-16 bg-emerald-600">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center text-white mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Community Impact
          </h2>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            Every purchase you make supports local youth employment and
            community development. Together, we&asop;re building a stronger,
            more prosperous community.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 hover:bg-opacity-30 transition-all duration-300">
                <stat.icon className="w-12 h-12 text-white mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-emerald-100 mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-emerald-200">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Empowering Local Youth
              </h3>
              <p className="text-emerald-100 mb-6 text-lg leading-relaxed">
                Our mission goes beyond grocery delivery. We provide meaningful
                employment, skills training, and career development
                opportunities for young people in our community. Every order
                creates jobs and builds futures.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-emerald-100">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Product Photography & Content Creation</span>
                </div>
                <div className="flex items-center space-x-3 text-emerald-100">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Order Packing & Quality Control</span>
                </div>
                <div className="flex items-center space-x-3 text-emerald-100">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Fast Local Delivery Service</span>
                </div>
                <div className="flex items-center space-x-3 text-emerald-100">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Customer Support & Social Media</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Image
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Community Impact"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
