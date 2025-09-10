import React from 'react';
import { FaLock, FaUnlock, FaPlus } from 'react-icons/fa';

const MarketplaceHeader = ({ marketplace, onToggleStatus, onAddBook }) => (
  <div className="flex flex-col gap-4 lg:flex-row justify-center lg:justify-between items-center lg:items-center mb-6">
    <h1 className="text-2xl font-light text-[var(--color-richNavy)] font-poppins md:text-center md:text-3xl lg:text-left">
      {marketplace.title}
    </h1>
    <div className="flex flex-wrap gap-3">
      <button
        onClick={onToggleStatus}
        className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium cursor-pointer transition-colors md:text-base text-sm ${
          marketplace.status === 'Active'
            ? 'text-deepBurgundy hover:text-red-900'
            : 'text-[var(--color-goldFoiling)] hover:text-amber-900'
        }`}
      >
        {marketplace.status === 'Active' ? (
          <>
            <FaLock className="md:text-base text-sm" /> Close Marketplace
          </>
        ) : (
          <>
            <FaUnlock className="md:text-base text-sm" /> Open Marketplace
          </>
        )}
      </button>
      <button
        onClick={onAddBook}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[var(--color-richNavy)] font-medium hover:bg-gray-100 transition-colors md:text-base text-sm"
      >
        <FaPlus /> Add Book
      </button>
    </div>
  </div>
);

export default MarketplaceHeader;