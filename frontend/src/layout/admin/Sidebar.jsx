import { useState } from 'react';
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiPieChart,
  FiCalendar,
  FiFileText,
  FiMail,
  FiLayers,
  FiMenu,
  FiX,
  FiBookOpen,
} from 'react-icons/fi';
import { MenuItem } from './MenuItem';
import { LogoThree, LogoFour } from '../../components/Logo';
import {  HiMenuAlt3 } from 'react-icons/hi';

export const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleSubmenu = (menu) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <aside
      className={`bg-richNavy text-creamParchment fixed md:fixed top-0 left-0 h-full z-40 transition-all duration-300 ease-in-out transform
      ${
        isOpen
          ? 'translate-x-0 w-64'
          : '-translate-x-full md:translate-x-0 md:w-20'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="px-4 border-b border-richNavy/50">
          <div className="flex items-center justify-between min-h-[56px]">
            <div className="flex items-center gap-x-2 w-full overflow-hidden">
              {isOpen ? <LogoThree /> : <LogoFour />}
            </div>
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 ml-2 mt-1.5 bg-richNavy text-goldFoiling hover:text-paleRose rounded-full transition-all duration-200"
              title="Close Sidebar"
            >
              <HiMenuAlt3 size={25} />
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            <MenuItem
              icon={FiHome}
              label="Dashboard"
              to="/dashboard"
              isSidebarOpen={isOpen}
            />

            <MenuItem
              icon={FiUsers}
              label="Menu Example 1"
              to="/example1"
              isSidebarOpen={isOpen}
              onClick={() => toggleSubmenu('example1')}
            >
              {openSubmenus.example1 && isOpen && (
                <ul className="ml-8 mt-1 space-y-1">
                  <MenuItem
                    label="Submenu Item 1"
                    to="/example1/item1"
                    isSidebarOpen={isOpen}
                  />
                  <MenuItem
                    label="Submenu Item 2"
                    to="/example1/item2"
                    isSidebarOpen={isOpen}
                  />
                </ul>
              )}
            </MenuItem>

            <MenuItem
              icon={FiPieChart}
              label="Menu Example 2"
              to="/example2"
              isSidebarOpen={isOpen}
            />
            <MenuItem
              icon={FiCalendar}
              label="Menu Example 3"
              to="/example3"
              isSidebarOpen={isOpen}
            />
            <MenuItem
              icon={FiFileText}
              label="Menu Example 4"
              to="/example4"
              isSidebarOpen={isOpen}
            />
            <MenuItem
              icon={FiMail}
              label="Menu Example 5"
              to="/example5"
              isSidebarOpen={isOpen}
            />
            <MenuItem
              icon={FiLayers}
              label="Menu Example 6"
              to="/example6"
              isSidebarOpen={isOpen}
            />

            <div className="pt-4 mt-4 border-t border-richNavy/50">
              <MenuItem
                icon={FiSettings}
                label="Settings"
                to="/settings"
                isSidebarOpen={isOpen}
              />
            </div>
          </ul>
        </nav>
      </div>
    </aside>
  );
};
