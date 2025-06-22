import { Link } from 'react-router-dom';
import {
  BookOpen,
  Home,
  Search,
  Bookmark,
  User,
  ShoppingCart,
  Facebook,
  Twitter,
  Instagram,
  Mail,
} from 'lucide-react';
import { LogoThree } from '../../components/Logo';


export default function Footer() {
  const footerLinks = [
    { title: 'Company', links: ['About Us', 'Careers', 'Contact'] },
    { title: 'Help', links: ['FAQs', 'Shipping', 'Returns'] },
    { title: 'Legal', links: ['Terms', 'Privacy', 'Cookies'] },
  ];

  return (
    <footer className="bg-creamParchment text-[#8B5E3C] mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <LogoThree/>
            </div>
            <p className="text-mutedSlate text-sm">
              Your one-stop destination for rare and classic books. Curated
              collections for every reader.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                className="text-[#8B5E3C] hover:text-[#B38B6D] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-[#8B5E3C] hover:text-[#B38B6D] transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-[#8B5E3C] hover:text-[#B38B6D] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-serif text-lg font-medium mb-4 text-[#8B5E3C]">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-mutedSlate hover:text-[#B38B6D] text-sm transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-serif text-lg font-medium mb-4 text-[#8B5E3C]">Newsletter</h3>
            <p className="text-mutedSlate text-sm mb-3">
              Subscribe for updates and special offers
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-white border border-[#8B5E3C]/20 text-[#8B5E3C] placeholder-mutedSlate text-sm rounded-l px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#B38B6D] w-full"
              />
              <button className="bg-[#8B5E3C] hover:bg-[#B38B6D] text-white px-3 py-2 rounded-r transition-colors">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-[#8B5E3C]/10 mt-8 pt-8 text-center text-mutedSlate text-sm">
          © {new Date().getFullYear()} The Book Bazaar. All rights reserved.
        </div>
      </div>
    </footer>
  );
}