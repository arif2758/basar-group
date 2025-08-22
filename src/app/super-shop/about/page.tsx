import { Heart, Users, Truck, Award, Target, Eye } from "lucide-react";
import { CartProvider } from "../contexts/CartContext";

import Image from "next/image";
import FooterShop from "../shopComponents/FooterShop";

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Community First",
      description:
        "Everything we do is centered around strengthening our local community and creating opportunities for our neighbors.",
    },
    {
      icon: Users,
      title: "Youth Empowerment",
      description:
        "We believe in the potential of young people and provide them with meaningful employment and skill development opportunities.",
    },
    {
      icon: Truck,
      title: "Reliable Service",
      description:
        "Fast, fresh, and dependable delivery service that our community can count on, rain or shine.",
    },
    {
      icon: Award,
      title: "Quality Promise",
      description:
        "We source the freshest local products and maintain the highest quality standards in everything we do.",
    },
  ];

  const team = [
    {
      name: "Rashid Ahmed",
      role: "Founder & Community Leader",
      image:
        "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1",
      description: "Local entrepreneur passionate about community development",
    },
    {
      name: "Fatima Khan",
      role: "Operations Manager",
      image:
        "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1",
      description: "Ensuring smooth operations and quality control",
    },
    {
      name: "Mohammad Hassan",
      role: "Youth Program Coordinator",
      image:
        "https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1",
      description: "Training and mentoring our young team members",
    },
    {
      name: "Amina Rahman",
      role: "Customer Experience Lead",
      image:
        "https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1",
      description: "Ensuring every customer has an exceptional experience",
    },
  ];

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
       
        <main>
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-emerald-600 to-emerald-500 py-16 text-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Our Story & Mission
                  </h1>
                  <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
                    BASAR Super Shop is more than a grocery store. We&asop;re a
                    community-powered movement that connects neighbors, empowers
                    youth, and delivers fresh quality products to your doorstep.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold">127</div>
                      <div className="text-emerald-200">Youth Employed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">5,200</div>
                      <div className="text-emerald-200">Families Served</div>
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
          </section>

          {/* Mission & Vision */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-emerald-50 p-8 rounded-2xl">
                  <div className="flex items-center space-x-3 mb-6">
                    <Target className="w-8 h-8 text-emerald-600" />
                    <h2 className="text-2xl font-bold text-gray-800">
                      Our Mission
                    </h2>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    To revolutionize local grocery shopping by creating a
                    digital platform that serves our community&asop;s daily
                    needs while providing meaningful employment and skill
                    development opportunities for local youth. We&asop;re
                    building a sustainable ecosystem where every purchase
                    contributes to community prosperity.
                  </p>
                </div>
                <div className="bg-orange-50 p-8 rounded-2xl">
                  <div className="flex items-center space-x-3 mb-6">
                    <Eye className="w-8 h-8 text-orange-600" />
                    <h2 className="text-2xl font-bold text-gray-800">
                      Our Vision
                    </h2>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    To become the leading community-powered grocery platform in
                    Bangladesh, setting the standard for how local businesses
                    can thrive in the digital age while maintaining strong
                    community roots. We envision a future where technology
                    serves humanity, not the other way around.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Values */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Our Core Values
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  These principles guide everything we do, from how we treat our
                  team members to how we serve our customers
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                      <value.icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* The Story */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <Image
                    src="https://images.pexels.com/photos/4199098/pexels-photo-4199098.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Local Grocery Store"
                    width={600}
                    height={400}
                    className="rounded-2xl shadow-xl"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    How It All Started
                  </h2>
                  <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                    <p>
                      BASAR Super Shop began as a small neighborhood grocery
                      store in 2018. During the pandemic, we realized our
                      community needed a reliable way to get fresh groceries
                      safely delivered to their homes.
                    </p>
                    <p>
                      But we saw an even bigger opportunity. Our neighborhood
                      had many talented young people who needed employment and
                      skills training. We decided to build a business model that
                      would serve both needs.
                    </p>
                    <p>
                      Today, we&asop;re proud to have created over 127 jobs for
                      local youth while serving more than 5,200 families. Every
                      order placed helps a young person earn money, learn
                      skills, and build their future.
                    </p>
                    <p>
                      This isn&asop;t just business – it&asop;s community
                      development through commerce. Together, we&asop;re
                      building something bigger than a grocery store.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Meet Our Leadership Team
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Passionate community leaders working together to create
                  opportunities and serve our neighbors
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.map((member, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={500}
                      height={256}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {member.name}
                      </h3>
                      <p className="text-emerald-600 font-medium mb-3">
                        {member.role}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {member.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Community Impact */}
          <section className="py-16 bg-emerald-600 text-white">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Community Impact
              </h2>
              <p className="text-xl text-emerald-100 mb-12 max-w-3xl mx-auto">
                Every purchase you make contributes to a stronger, more
                prosperous community. Here&asop;s how we&asop;re making a
                difference together.
              </p>

              <div className="grid md:grid-cols-4 gap-8 mb-12">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-4xl font-bold mb-2">৳2.4M</div>
                  <div className="text-emerald-100">
                    Total Income Generated for Youth
                  </div>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-4xl font-bold mb-2">127</div>
                  <div className="text-emerald-100">Young People Employed</div>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-4xl font-bold mb-2">5,200</div>
                  <div className="text-emerald-100">
                    Families Served Monthly
                  </div>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-4xl font-bold mb-2">98%</div>
                  <div className="text-emerald-100">
                    Customer Satisfaction Rate
                  </div>
                </div>
              </div>

              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">Join Our Mission</h3>
                <p className="text-emerald-100 text-lg mb-6">
                  When you choose BASAR Super Shop, you&asop;re not just buying
                  groceries – you&asop;re investing in your community&asop;s
                  future.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-emerald-100">
                    🎯 Create Jobs
                  </span>
                  <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-emerald-100">
                    📚 Skill Development
                  </span>
                  <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-emerald-100">
                    🏪 Support Local
                  </span>
                  <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-emerald-100">
                    🌱 Build Community
                  </span>
                </div>
              </div>
            </div>
          </section>
        </main>
        <FooterShop />
      </div>
    </CartProvider>
  );
}
