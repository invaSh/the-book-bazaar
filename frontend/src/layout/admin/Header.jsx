import { FiBell, FiSearch } from 'react-icons/fi';
import { HiMenuAlt2, HiMenuAlt3 } from 'react-icons/hi';
import { useAuth } from '../../contexts/authContext';
import UserMenu from './UserMenu';

export const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white text-richNavy shadow-md shadow-gray-300">
      <div className="flex items-center justify-between flex-wrap gap-2 px-4 py-3">
        <div className="flex items-center gap-x-4 flex-1 min-w-0">
          <button
            onClick={toggleSidebar}
            className="p-2 text-richNavy hover:text-richNavy/50 rounded-full transition-all duration-200 transform hover:scale-110 active:scale-95 cursor-pointer shrink-0"
            title={isSidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
          >
            {isSidebarOpen ? <HiMenuAlt3 size={24} /> : <HiMenuAlt2 size={24} />}
          </button>

          <div className="relative w-full max-w-sm">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mutedSlate" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full rounded-lg bg-white border border-mutedSlate focus:outline-none focus:ring-2 focus:ring-paleRose text-richNavy placeholder-mutedSlate"
            />
          </div>
        </div>

        <div className="flex items-center gap-x-4 shrink-0">
          <button className="p-2 rounded-full hover:bg-richNavy/10 relative text-richNavy">
            <FiBell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-paleRose"></span>
          </button>

          <UserMenu user={user} />
        </div>
      </div>
    </header>
  );
};
