import { useState, useRef, useEffect } from 'react';
import {
  Search,
  User,
  ShoppingCart,
  LogOut,
  Settings,
  Bookmark,
  HelpCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';
import { SignOutDialog } from './SignOutDialog';
import { useAuth } from '../../contexts/authContext';

export function SearchButton() {
  return (
    <button className="p-1.5 rounded-full bg-white border border-[#8B5E3C]/20 text-[#8B5E3C] hover:text-goldFoiling hover:bg-goldFoiling/10 transition-colors">
      <Search className="w-5 h-5" />
    </button>
  );
}

export function CartButton() {
  return (
    <button className="p-1.5 rounded-full bg-white border border-[#8B5E3C]/20 text-[#8B5E3C] hover:text-goldFoiling hover:bg-goldFoiling/10 transition-colors relative">
      <ShoppingCart className="w-5 h-5" />
      <span className="absolute -top-1 -right-1 bg-goldFoiling text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        3
      </span>
    </button>
  );
}

export function UserButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useAuth();
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  let menuItems;

  if (user.role_id == 2) {
    menuItems = [];
  } else {
    menuItems = [
      { icon: Settings, label: 'Settings', path: '/settings' },
      { icon: HelpCircle, label: 'Help', path: '/help' },
    ];
  }

  const handleSignOutClick = () => {
    setIsOpen(false);
    setShowSignOutDialog(true);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-1.5 rounded-full bg-white border border-[#8B5E3C]/20 text-[#8B5E3C] hover:text-goldFoiling hover:bg-goldFoiling/10 transition-colors duration-200 flex items-center`}
      >
        <User className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-creamParchment border border-goldFoiling/20 rounded-lg shadow-lg overflow-hidden z-50">
          <div className="py-1">
            <div className="px-4 py-2 text-sm text-richNavy/80">
              {user.username}
            </div>
            <div className="px-4 py-2 text-sm text-richNavy/80 border-b border-goldFoiling/10">
              {user.email}
            </div>
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="flex items-center px-4 py-2 text-sm text-richNavy/80 hover:bg-goldFoiling/10 hover:text-goldFoiling transition-colors duration-150"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.label}
              </Link>
            ))}
            <div className="border-t border-goldFoiling/10"></div>
            <button
              onClick={handleSignOutClick}
              className="flex items-center w-full px-4 py-2 text-sm text-richNavy/80 hover:bg-goldFoiling/10 hover:text-goldFoiling transition-colors duration-150"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      )}

      <SignOutDialog
        isOpen={showSignOutDialog}
        onClose={() => setShowSignOutDialog(false)}
        onConfirm={() => setShowSignOutDialog(false)}
      />
    </div>
  );
}
