import React from 'react';
import {
  FaStore,
  FaLock,
  FaCheckCircle,
  FaChevronRight,
  FaBook,
  FaCalendarAlt,
  FaUnlock,
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const MarketplaceCard = ({ marketplace }) => {
  const createdAt = new Date(marketplace.createdAt);
  const isClosed = marketplace.status === 'Closed';

  return (
    <div
      className={`relative flex flex-col bg-white rounded-2xl shadow-lg p-6 transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl min-h-[340px]`}
    >
      {isClosed && (
        <div className="absolute inset-0 rounded-2xl z-20 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0 bg-white/30"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                rgba(0,0,0,0.1),
                rgba(0,0,0,0.1) 1px,
                transparent 1px,
                transparent 6px
              )`,
              backgroundSize: '8px 8px',
            }}
          />
        </div>
      )}

      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[var(--color-warmSand)]/80 shadow">
          <FaStore className="text-2xl text-[var(--color-richNavy)]" />
        </div>
      </div>

      <h3 className="text-xl font-bold text-[var(--color-richNavy)] truncate mb-2">
        {marketplace.title}
      </h3>

      <p className="text-[var(--color-richNavy)]/70 text-base leading-relaxed mb-6 line-clamp-3">
        {marketplace.description || 'No description available'}
      </p>

      <div className="flex items-center justify-between text-xs text-[var(--color-richNavy)]/50 mb-4 mt-auto">
        <span className="flex items-center gap-1">
          <FaCalendarAlt className="inline-block mr-1" />
          {createdAt.toLocaleDateString()}
        </span>
        <span className="flex items-center gap-1">
          <FaBook className="inline-block mr-1" />
          {marketplace.books?.length || 0} listings
        </span>
      </div>

      <button
        className={`w-full py-2 rounded-lg font-semibold text-sm shadow transition-all duration-150 focus:outline-none focus:ring-2 ${
          isClosed
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed focus:ring-gray-200'
            : 'bg-[var(--color-warmSand)] text-[var(--color-richNavy)] hover:bg-[var(--color-softPeach)] focus:ring-[var(--color-warmSand)]'
        }`}
        disabled={isClosed}
      >
        {isClosed ? 'Marketplace Closed' : 'Open Marketplace'}
      </button>
      {isClosed && (
        <NavLink
          to={`/marketplace/${marketplace.id}`}
          className="flex items-center justify-center gap-1 text-xs px-3 py-2 mt-2 z-25 rounded-lg bg-gray-100 text-gray-600 hover:bg-softPeach transition-colors duration-200 group"
        >
          <span className="opacity-70 group-hover:opacity-100 transition-opacity">
            Open marketplace?
          </span>
          <FaLock className="text-sm opacity-70 group-hover:hidden" />
          <FaUnlock className="text-sm hidden group-hover:block group-hover:text-richNavy" />
        </NavLink>
      )}
    </div>
  );
};

export const ViewAllCard = () => {
  return (
    <NavLink
      to="/merchant/all-marketplaces"
      className="relative flex flex-col items-center justify-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 min-h-[340px]"
    >
      <div className="w-14 h-14 rounded-full bg-[var(--color-richNavy)]/10 flex items-center justify-center mb-4">
        <FaChevronRight className="text-[var(--color-richNavy)] text-2xl" />
      </div>
      <h3 className="text-xl font-bold text-[var(--color-richNavy)] mb-1">
        View All
      </h3>
      <p className="text-base text-[var(--color-richNavy)]/70 text-center">
        Browse all your marketplaces
      </p>
    </NavLink>
  );
};

export default MarketplaceCard;
