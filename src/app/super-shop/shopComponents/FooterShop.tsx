import Link from 'next/link';
import { Facebook, Instagram, Phone, Mail, MapPin, CreditCard } from 'lucide-react';

export default function FooterShop() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-emerald-600 p-2 rounded-lg">
                <div className="w-6 h-6 bg-white rounded"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold">BASAR Super Shop</h3>
                <p className="text-sm text-gray-400">Community Grocery Store</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Your local grocery store, digitally transformed to serve the community better while empowering local youth.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-emerald-400 cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-emerald-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/shop" className="text-gray-300 hover:text-emerald-400 transition-colors">Shop</Link></li>
              <li><Link href="/rewards" className="text-gray-300 hover:text-emerald-400 transition-colors">Rewards Program</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-emerald-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-emerald-400 transition-colors">Contact</Link></li>
              <li><Link href="/help" className="text-gray-300 hover:text-emerald-400 transition-colors">Help & Support</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link href="/return-policy" className="text-gray-300 hover:text-emerald-400 transition-colors">Return Policy</Link></li>
              <li><Link href="/delivery-info" className="text-gray-300 hover:text-emerald-400 transition-colors">Delivery Info</Link></li>
              <li><Link href="/track-order" className="text-gray-300 hover:text-emerald-400 transition-colors">Track Order</Link></li>
              <li><Link href="/faq" className="text-gray-300 hover:text-emerald-400 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span className="text-gray-300 text-sm">+88 01700-000000</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span className="text-gray-300 text-sm">info@basarshop.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5" />
                <span className="text-gray-300 text-sm">123 Main Street<br />Dhaka, Bangladesh</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-2">Payment Methods</h5>
              <div className="flex space-x-2">
                <div className="bg-gray-700 px-2 py-1 rounded text-xs">bKash</div>
                <div className="bg-gray-700 px-2 py-1 rounded text-xs">Nagad</div>
                <div className="bg-gray-700 px-2 py-1 rounded text-xs">Rocket</div>
                <CreditCard className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 BASAR Super Shop. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 text-sm hover:text-emerald-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 text-sm hover:text-emerald-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}