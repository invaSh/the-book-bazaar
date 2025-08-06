import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiPackage,
  FiBarChart2,
  FiMessageCircle,
  FiSettings,
  FiMenu,
  FiX,
  FiUser,
  FiShoppingBag,
  FiTrendingUp,
  FiPercent,
  FiStar,
  FiHelpCircle,
  FiSearch,
  FiBell,
  FiSun,
  FiMoon,
} from 'react-icons/fi';
import { LogoThree } from '../../components/Logo';
import { BookOpen } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { UserButton } from '../user/NavButtons';

const merchantMenus = [
  { label: 'Dashboard', icon: FiBarChart2, to: '/merchant/dashboard' },
  { label: 'Orders', icon: FiShoppingBag, to: '/merchant/orders' },
  { label: 'Products', icon: FiPackage, to: '/merchant/products' },
  { label: 'Analytics', icon: FiTrendingUp, to: '/merchant/analytics' },
  { label: 'Promotions', icon: FiPercent, to: '/merchant/promotions' },
  { label: 'Reviews', icon: FiStar, to: '/merchant/reviews' },
  { label: 'Messages', icon: FiMessageCircle, to: '/merchant/messages' },
  { label: 'Support', icon: FiHelpCircle, to: '/merchant/support' },
  { label: 'Settings', icon: FiSettings, to: '/merchant/settings' },
];

function MobileNavigation({ isOpen, activePath, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-creamParchment/10 backdrop-blur-xs bg-opacity-50 z-40"
            onClick={onClose}
          />

          {/* Navigation Menu */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50 mx-2 rounded-lg"
          >
            <div className="grid grid-cols-3 gap-2 p-4">
              {merchantMenus.map((menu) => (
                <NavLink
                  key={menu.label}
                  to={menu.to}
                  onClick={onClose}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 ${
                    activePath === menu.to
                      ? 'bg-[var(--color-goldFoiling)]/10 text-[var(--color-goldFoiling)]'
                      : 'text-[var(--color-richNavy)] hover:bg-[var(--color-creamParchment)]'
                  }`}
                >
                  <menu.icon size={20} />
                  <span className="text-xs mt-1 font-medium">{menu.label}</span>
                </NavLink>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Header() {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const activePath = window.location.pathname;

  const toggleMobileNav = () => setShowMobileNav((prev) => !prev);
  const closeMobileNav = () => setShowMobileNav(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-100">
        {/* Mobile Header */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between px-3 py-2 sm:p-3">
            {/* Left: Menu Button */}
            <button
              className="p-1.5 sm:p-2 rounded-full hover:bg-[var(--color-creamParchment)] transition flex-shrink-0"
              onClick={toggleMobileNav}
              aria-label="Open navigation menu"
            >
              {showMobileNav ? (
                <FiX
                  size={20}
                  className="text-[var(--color-richNavy)] sm:w-6 sm:h-6"
                />
              ) : (
                <FiMenu
                  size={20}
                  className="text-[var(--color-richNavy)] sm:w-6 sm:h-6"
                />
              )}
            </button>

            {/* Center: Logo - Responsive sizing */}
            <div className="flex-1 flex justify-center px-2">
              <NavLink
                to="/"
                className="flex items-center group space-x-1.5 sm:space-x-2"
              >
                <BookOpen className="text-goldFoiling w-5 h-5 sm:w-6 sm:h-6 mt-0.5 sm:mt-1 flex-shrink-0" />
                <span className="text-base sm:text-lg lg:text-xl text-[#8B5E3C] truncate">
                  <span className="hidden xs:inline">The Book Bazaar</span>
                  <span className="xs:hidden">Book Bazaar</span>
                </span>
              </NavLink>
            </div>

            {/* Right: Action Buttons - Responsive */}
            <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
              {/* Search - Always visible */}
              <button
                className="p-1.5 rounded-full bg-white border border-[#8B5E3C]/20 text-[#8B5E3C] hover:text-goldFoiling hover:bg-goldFoiling/10 transition-colors duration-200 flex-shrink-0"
                onClick={() => setShowSearch((s) => !s)}
                aria-label="Search"
              >
                <FiSearch size={18} className="sm:w-5 sm:h-5" />
              </button>

              {/* Notifications - Hidden on very small screens */}
              <button className="hidden xs:flex p-1.5 rounded-full bg-white border border-[#8B5E3C]/20 text-[#8B5E3C] hover:text-goldFoiling hover:bg-goldFoiling/10 transition-colors duration-200 relative flex-shrink-0">
                <FiBell size={18} className="sm:w-5 sm:h-5" />
                <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[var(--color-goldFoiling)] animate-pulse"></span>
              </button>

              {/* Dark mode - Hidden on small screens */}
              <button
                className="hidden sm:flex p-1.5 rounded-full bg-white border border-[#8B5E3C]/20 text-[#8B5E3C] hover:text-goldFoiling hover:bg-goldFoiling/10 transition-colors duration-200 flex-shrink-0"
                onClick={() => setDarkMode((d) => !d)}
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <FiSun size={18} className="sm:w-5 sm:h-5" />
                ) : (
                  <FiMoon size={18} className="sm:w-5 sm:h-5" />
                )}
              </button>

              {/* User Button */}
              <div className="flex-shrink-0">
                <UserButton />
              </div>
            </div>
          </div>

          {/* Mobile Search */}
          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="px-3 pb-3 sm:px-4">
                  <div className="relative w-full">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-mutedSlate)]" />
                    <input
                      type="text"
                      placeholder="Search products, orders..."
                      className="pl-10 pr-4 py-2.5 sm:py-2 w-full rounded-lg bg-[var(--color-creamParchment)] border border-[var(--color-creamParchment)] focus:outline-none focus:ring-2 focus:ring-[var(--color-goldFoiling)] text-[var(--color-richNavy)] placeholder-[var(--color-mutedSlate)] font-poppins text-sm sm:text-base"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between h-20 px-6">
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center group space-x-2">
              <BookOpen className="text-goldFoiling w-6 h-6 mt-1.5" />
              <span className="text-xl text-[#8B5E3C]">The Book Bazaar</span>
            </NavLink>
          </div>

          {/* Desktop Navigation Icons */}
          <div className="flex items-center space-x-1">
            {merchantMenus.map((menu) => (
              <NavLink
                key={menu.label}
                to={menu.to}
                className={`group relative flex items-center justify-center p-2 rounded-xl transition-all duration-200 ${
                  activePath === menu.to
                    ? 'bg-[var(--color-goldFoiling)]/10 text-[var(--color-goldFoiling)]'
                    : 'text-[var(--color-richNavy)] hover:bg-[var(--color-creamParchment)] hover:text-[var(--color-goldFoiling)]'
                }`}
              >
                <menu.icon size={20} />
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 bg-white text-[var(--color-richNavy)] text-xs font-semibold px-2 py-1 rounded shadow transition-all duration-200 whitespace-nowrap border border-[var(--color-creamParchment)] pointer-events-none">
                  {menu.label}
                </span>
              </NavLink>
            ))}
          </div>

          {/* Desktop Search and Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-mutedSlate)]" />
              <input
                type="text"
                placeholder="Search products, orders..."
                className="pl-10 pr-4 py-2 w-64 rounded-lg bg-[var(--color-creamParchment)] border border-[var(--color-creamParchment)] focus:outline-none focus:ring-2 focus:ring-[var(--color-goldFoiling)] text-[var(--color-richNavy)] placeholder-[var(--color-mutedSlate)] font-poppins"
              />
            </div>

            <button
              className="p-1.5 rounded-full bg-white border border-[#8B5E3C]/20 text-[#8B5E3C] hover:text-goldFoiling hover:bg-goldFoiling/10 transition-colors duration-200"
              onClick={() => setDarkMode((d) => !d)}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            <button className="p-1.5 rounded-full bg-white border border-[#8B5E3C]/20 text-[#8B5E3C] hover:text-goldFoiling hover:bg-goldFoiling/10 transition-colors duration-200 relative">
              <FiBell size={20} />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[var(--color-goldFoiling)] animate-pulse"></span>
            </button>

            <UserButton />
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <MobileNavigation
        isOpen={showMobileNav}
        activePath={activePath}
        onClose={closeMobileNav}
      />
    </>
  );
}

function Layout({ children }) {
  return (
    <div className="min-h-screen flex font-poppins">
      <div className="flex w-full flex-col">
        <Header />
        <main className="flex-1 p-2 md:p-8 transition-all duration-300 pt-15 md:pt-28 relative">
          {/* Fixed Gradient Background */}
          <div
            className="fixed inset-0 -z-10 bg-creamParchment"
            style={{
              backgroundAttachment: 'fixed',
              backgroundSize: 'cover',
            }}
          />
          {/* Scrollable Content */}
          <div className="relative z-10 w-full h-full min-h-[60vh]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
