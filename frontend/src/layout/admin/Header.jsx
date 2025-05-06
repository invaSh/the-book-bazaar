import { FiBell, FiSearch, FiUser } from 'react-icons/fi';
import { HiMenuAlt2, HiMenuAlt3 } from 'react-icons/hi';
import { useAuth } from '../../contexts/authContext';

export const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const { user } = useAuth();
  console.log(user);

  return (
    <header className="bg-white text-richNavy shadow-md shadow-gray-300">
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 gap-y-2 sm:gap-y-0">
        <div className="flex items-center justify-between w-full sm:w-auto sm:justify-start gap-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 text-richNavy hover:text-richNavy/50 rounded-full transition-all duration-200 transform hover:scale-110 active:scale-95 cursor-pointer"
            title={isSidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
          >
            {isSidebarOpen ? (
              <HiMenuAlt3 size={24} />
            ) : (
              <HiMenuAlt2 size={24} />
            )}
          </button>

          <div className="sm:hidden relative flex-1 max-w-xs">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mutedSlate" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full rounded-lg bg-white border border-mutedSlate focus:outline-none focus:ring-2 focus:ring-paleRose text-richNavy placeholder-mutedSlate"
            />
          </div>

          <div className="flex sm:hidden items-center gap-x-2">
            <button className="p-2 rounded-full hover:bg-richNavy/10 relative text-richNavy">
              <FiBell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-paleRose"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-paleRose flex items-center justify-center text-richNavy">
              <FiUser size={16} />
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-x-4 w-full sm:w-auto justify-end text-richNavy">
          <div className="relative w-full max-w-xs">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mutedSlate" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full rounded-lg bg-white border border-mutedSlate focus:outline-none focus:ring-2 focus:ring-paleRose text-richNavy placeholder-mutedSlate"
            />
          </div>

          <button className="p-2 rounded-full hover:bg-richNavy/10 relative text-richNavy">
            <FiBell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-paleRose"></span>
          </button>

          <div className="flex items-center gap-x-2">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-richNavy">
              <FiUser size={16} />
            </div>
            <div className="hidden md:flex flex-col text-xs max-w-[160px] whitespace-nowrap overflow-hidden">
              <span className="truncate text-richNavy">{user.fullName}</span>
              <span className="truncate text-mutedSlate">{user.username}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
