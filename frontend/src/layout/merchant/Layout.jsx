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

const SIDEBAR_WIDTH = 80;

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

function Sidebar({ isOpen, activePath, toggleSidebar }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed z-40 top-0 left-0 h-full w-20 bg-[var(--color-warmSand)] flex flex-col items-center py-6 md:relative md:translate-x-0 md:opacity-100 md:w-20 border-r border-[var(--color-creamParchment)]"
        >
          <div className="flex flex-1 flex-col items-center justify-center gap-2 w-full">
            <nav className="flex flex-col gap-2 items-center w-full mb-24">
              {merchantMenus.map((menu) => (
                <SidebarIcon
                  key={menu.label}
                  icon={menu.icon}
                  label={menu.label}
                  to={menu.to}
                  active={activePath === menu.to}
                />
              ))}
            </nav>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function DesktopSidebar({ activePath }) {
  return (
    <aside className="hidden md:flex flex-col items-center w-20 h-screen bg-[var(--color-warmSand)] border-r border-[var(--color-creamParchment)] py-6 z-30">
      <div className="flex-1 flex flex-col items-center mt-20">
        <nav className="flex flex-col gap-2 items-center w-full">
          {merchantMenus.map((menu) => (
            <SidebarIcon
              key={menu.label}
              icon={menu.icon}
              label={menu.label}
              to={menu.to}
              active={activePath === menu.to}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
}

function SidebarIcon({ icon: Icon, label, to, active }) {
  return (
    <div className="group relative flex items-center w-full justify-center">
      <a
        href={to}
        className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-200 text-[var(--color-richNavy)] ${
          active
            ? 'bg-white shadow-lg text-[var(--color-goldFoiling)] scale-105 border-l-4 border-[var(--color-goldFoiling)]'
            : 'hover:bg-white/80 hover:scale-105 hover:text-[var(--color-goldFoiling)]'
        }`}
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        <Icon size={26} />
      </a>
      <span className="absolute left-14 z-50 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 pointer-events-none bg-white text-[var(--color-richNavy)] text-xs font-semibold px-3 py-1 rounded shadow transition-all duration-200 whitespace-nowrap border border-[var(--color-creamParchment)]">
        {label}
      </span>
    </div>
  );
}

function Header({ toggleSidebar }) {
  const merchantName = 'Alex';
  const [showSearch, setShowSearch] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white">
      <div className="md:hidden">
        <div className="flex items-center justify-between p-3">
          <button
            className="p-2 rounded-full hover:bg-[var(--color-creamParchment)] transition"
            onClick={toggleSidebar}
            aria-label="Open sidebar"
          >
            <FiMenu size={24} className="text-[var(--color-richNavy)]" />
          </button>

          <div className="flex-1 flex justify-center">
            <div className="flex-shrink-0 flex items-center">
              <NavLink to="/" className="flex items-center group space-x-2">
                <BookOpen className="text-goldFoiling w-6 h-6 mt-1" />
                <span className="text-xl text-[#8B5E3C]">The Book Bazaar</span>
              </NavLink>
            </div>{' '}
          </div>

          <div className="flex items-center gap-1">
            <button
              className={`p-1.5 rounded-full bg-white border border-[#8B5E3C]/20 text-[#8B5E3C] hover:text-goldFoiling hover:bg-goldFoiling/10 transition-colors duration-200 flex items-center`}
              onClick={() => setShowSearch((s) => !s)}
              aria-label="Search"
            >
              <FiSearch size={22} />
            </button>
            <button
              className={`p-1.5 rounded-full bg-white border border-[#8B5E3C]/20 text-[#8B5E3C] hover:text-goldFoiling hover:bg-goldFoiling/10 transition-colors duration-200 flex items-center`}
            >
              <FiBell size={22} />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[var(--color-goldFoiling)] animate-pulse"></span>
            </button>
            <button
              className={`p-1.5 rounded-full bg-white border border-[#8B5E3C]/20 text-[#8B5E3C] hover:text-goldFoiling hover:bg-goldFoiling/10 transition-colors duration-200 flex items-center`}
              onClick={() => setDarkMode((d) => !d)}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FiSun size={22} /> : <FiMoon size={22} />}
            </button>
            <UserButton />
          </div>
        </div>

        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-3">
                <div className="relative w-full">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-mutedSlate)]" />
                  <input
                    type="text"
                    placeholder="Search products, orders..."
                    className="pl-10 pr-4 py-2 w-full rounded-lg bg-[var(--color-creamParchment)] border border-[var(--color-creamParchment)] focus:outline-none focus:ring-2 focus:ring-[var(--color-goldFoiling)] text-[var(--color-richNavy)] placeholder-[var(--color-mutedSlate)] font-poppins"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="hidden md:flex items-center justify-between h-20 px-6">
        <div className="flex-shrink-0">
          <div className="flex-shrink-0 flex items-center">
            <NavLink to="/" className="flex items-center group space-x-2">
              <BookOpen className="text-goldFoiling w-6 h-6 mt-1.5" />
              <span className="text-xl text-[#8B5E3C]">The Book Bazaar</span>
            </NavLink>
          </div>{' '}
        </div>

        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-mutedSlate)]" />
            <input
              type="text"
              placeholder="Search products, orders..."
              className="pl-10 pr-4 py-2 w-full rounded-lg bg-[var(--color-creamParchment)] border border-[var(--color-creamParchment)] focus:outline-none focus:ring-2 focus:ring-[var(--color-goldFoiling)] text-[var(--color-richNavy)] placeholder-[var(--color-mutedSlate)] font-poppins"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            className={`p-1.5 rounded-full bg-white border border-[#8B5E3C]/20 text-[#8B5E3C] hover:text-goldFoiling hover:bg-goldFoiling/10 transition-colors duration-200 flex items-center`}
            onClick={() => setDarkMode((d) => !d)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          <button
            className={`p-1.5 rounded-full bg-white border border-[#8B5E3C]/20 text-[#8B5E3C] hover:text-goldFoiling hover:bg-goldFoiling/10 transition-colors duration-200 flex items-center`}
          >
            <FiBell size={20} />
            {/* <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[var(--color-goldFoiling)] animate-pulse"></span> */}
          </button>

          <UserButton />
        </div>
      </div>
    </header>
  );
}

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const activePath = window.location.pathname;
  const toggleSidebar = () => setSidebarOpen((open) => !open);

  return (
    <div className="min-h-screen flex bg-[#fafbfc] font-poppins relative">
      <div 
        // className="fixed inset-0 z-0 opacity-30"
        // style={{
        //   backgroundImage: "url('https://images.unsplash.com/photo-1699544084159-19ab53017724?q=80&w=3000&auto=format&fit=crop')",
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        //   backgroundAttachment: "fixed",
        // }}
      />

      {/* Content Layer */}
      <div className="relative z-10 flex w-full">
        <DesktopSidebar activePath={activePath} />
        <Sidebar
          isOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          activePath={activePath}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <Header toggleSidebar={toggleSidebar} />
          <main className="flex-1 p-2 md:p-8 transition-all duration-300 pt-24 md:pt-24 bg-[var(--color-warmSand)]/20">
            <div 
              className="w-full h-full p-4 md:p-8 min-h-[60vh]"
            >
              <Outlet/>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;
