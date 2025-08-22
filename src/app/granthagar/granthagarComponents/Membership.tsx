import React from 'react';
import { CheckCircle, Clock, Truck, BookOpen, Users, Shield, Star, AlertCircle } from 'lucide-react';

const Membership: React.FC = () => {
  const rules = [
    {
      icon: BookOpen,
      title: "One Book at a Time",
      description: "Members can borrow one book at a time. You must return your current book before requesting another.",
      color: "blue"
    },
    {
      icon: Users,
      title: "Student Priority",
      description: "Students receive priority access to books, especially for academic and educational materials.",
      color: "green"
    },
    {
      icon: Truck,
      title: "30-Minute Delivery",
      description: "Free delivery within 30 minutes for members in Dhaka city. We bring books directly to your doorstep.",
      color: "orange"
    },
    {
      icon: Clock,
      title: "Return Policy",
      description: "Books should be returned within 14 days. Extensions available upon request if no one else is waiting.",
      color: "purple"
    },
    {
      icon: Shield,
      title: "Book Care",
      description: "Handle books with care. Damaged or lost books may require replacement or repair fees.",
      color: "red"
    }
  ];

  const benefits = [
    "Access to 500+ carefully curated books",
    "Free 30-minute delivery service in Dhaka",
    "Priority access to new arrivals",
    "Reading tracker and achievement system",
    "Participation in monthly quiz contests",
    "Community discussion forums",
    "Personalized book recommendations",
    "No late fees for students"
  ];

  const membershipPlans = [
    {
      name: "Student Membership",
      price: "৳100",
      period: "Refundable Deposit",
      description: "Perfect for students with valid student ID",
      features: [
        "One book at a time",
        "30-minute free delivery",
        "14-day borrowing period",
        "Student priority access",
        "Reading tracker access",
        "Monthly quiz participation"
      ],
      color: "from-blue-500 to-blue-600",
      popular: true
    },
    {
      name: "General Membership",
      price: "৳200",
      period: "Refundable Deposit",
      description: "For working professionals and general readers",
      features: [
        "One book at a time",
        "30-minute free delivery",
        "14-day borrowing period",
        "Access to all books",
        "Reading tracker access",
        "Monthly quiz participation"
      ],
      color: "from-green-500 to-green-600",
      popular: false
    }
  ];

  const faq = [
    {
      question: "Is the membership fee refundable?",
      answer: "Yes! The membership deposit is 100% refundable when you cancel your membership. We only keep the deposit to ensure books are returned safely."
    },
    {
      question: "How does the 30-minute delivery work?",
      answer: "Once you request a book, our team will deliver it to your location within 30 minutes during business hours (9 AM - 9 PM). We cover most areas of Dhaka city."
    },
    {
      question: "What if I lose or damage a book?",
      answer: "We understand accidents happen. For minor damage, there's no charge. For significant damage or lost books, we may ask you to replace the book or pay a reasonable replacement fee."
    },
    {
      question: "Can I extend my borrowing period?",
      answer: "Yes, you can extend for another 7 days if no one else is waiting for the book. Just send us a message through the app or call us."
    },
    {
      question: "Do you have digital/e-books?",
      answer: "Currently, we focus on physical books to reduce screen time and encourage focused reading. However, we're exploring digital options for rare or high-demand books."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Join BASAR গ্রন্থাগার
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Become part of our reading community and transform your learning journey. 
            Simple rules, great books, and amazing community support.
          </p>
        </div>

        {/* Membership Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {membershipPlans.map((plan, index) => (
            <div key={index} className={`relative bg-white rounded-2xl shadow-xl overflow-hidden ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}>
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                  Most Popular
                </div>
              )}
              
              <div className={`bg-gradient-to-r ${plan.color} p-8 text-white text-center`}>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-2">{plan.price}</div>
                <div className="text-sm opacity-90">{plan.period}</div>
                <p className="text-sm mt-3 opacity-90">{plan.description}</p>
              </div>
              
              <div className="p-8">
                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button className={`w-full mt-8 bg-gradient-to-r ${plan.color} hover:opacity-90 text-white py-3 px-6 rounded-lg font-semibold transition-all transform hover:scale-105`}>
                  Join Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center space-x-2">
            <Star className="w-6 h-6 text-yellow-500" />
            <span>Membership Benefits</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rules and Policies */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Simple Rules for a Great Experience
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rules.map((rule, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 bg-${rule.color}-100 rounded-full flex items-center justify-center mb-4`}>
                  <rule.icon className={`w-6 h-6 text-${rule.color}-600`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{rule.title}</h3>
                <p className="text-gray-600 text-sm">{rule.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6 mb-16">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-orange-900 mb-2">Important Notice</h3>
              <div className="text-orange-800 space-y-2">
                <p>• Your membership deposit is 100% refundable when you cancel your membership.</p>
                <p>• Student ID verification required for student membership rates.</p>
                <p>• Delivery service available in Dhaka city from 9 AM to 9 PM, 7 days a week.</p>
                <p>• Books must be returned in good condition to maintain membership benefits.</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {faq.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.question}</h3>
                <p className="text-gray-700">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-orange-600 rounded-2xl shadow-xl p-8 mt-16 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your Reading Journey?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
            Join hundreds of students and readers who&asop;ve already transformed their lives through our community library.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg">
              Join as Student (৳100)
            </button>
            <button className="border-2 border-white hover:bg-white hover:text-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all">
              General Membership (৳200)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;