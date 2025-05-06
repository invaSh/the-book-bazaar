import { NavLink } from 'react-router-dom';

export const MenuItem = ({ icon, label, to, children, isSidebarOpen, onClick }) => {
  const Icon = icon;

  return (
    <li>
      <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
          `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200
          ${isActive
            ? 'bg-paleRose/20 text-paleRose'
            : 'text-creamParchment/80 hover:bg-richNavy/50 hover:text-creamParchment'}`
        }
      >
        {Icon && <Icon className="flex-shrink-0 h-5 w-5" />}
        <span className={`ml-3 flex-1 truncate transition-all duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
          {label}
        </span>
        {children && isSidebarOpen && (
          <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </NavLink>
      {children}
    </li>
  );
};
