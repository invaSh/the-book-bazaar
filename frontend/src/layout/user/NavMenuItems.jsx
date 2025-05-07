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


export default function NavMenuItems() {
  const menuItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Browse', icon: BookOpen, path: '/browse' },
    { name: 'Wishlist', icon: Bookmark, path: '/wishlist' },
  ];

  return (
    <div className="flex space-x-8">
      {menuItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className="group flex items-center text-creamParchment hover:text-goldFoiling transition-colors duration-200 relative"
        >
          <item.icon className="w-5 h-5 mr-2 text-goldFoiling/80 group-hover:text-goldFoiling" />
          <span className="font-medium">{item.name}</span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-goldFoiling group-hover:w-full transition-all duration-300"></span>
        </Link>
      ))}
    </div>
  );
}