import React from 'react';
import { FaStore, FaLock, FaCheckCircle, FaChevronRight } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const MarketplaceCard = ({ marketplace }) => {
  const createdAt = new Date(marketplace.createdAt);
  const isClosed = marketplace.status === 'Closed';

  const canReopen =
    isClosed &&
    (!marketplace.openDate || new Date(marketplace.openDate) > new Date());

  const isPast =
    isClosed &&
    marketplace.openDate &&
    marketplace.closeDate &&
    new Date(marketplace.openDate) < new Date() &&
    new Date(marketplace.closeDate) < new Date();

  return (
    <div
      className={`relative flex flex-col rounded-2xl overflow-hidden shadow-sm transition-all duration-200
        ${
          isPast
            ? 'border-[var(--color-warmSand)]/30 bg-[var(--color-creamParchment)]/30'
            : 'border-[var(--color-warmSand)] bg-[var(--color-warmSand)] hover:shadow-2xl'
        }`}
    >
      {/* Header */}
      <div className="bg-[var(--color-creamParchment)] px-4 py-3 flex items-center text-[var(--color-richNavy)] font-medium">
        <FaStore className="mr-2 text-lg" />
        <h3 className="truncate">{marketplace.title}</h3>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <p className="text-sm text-[var(--color-richNavy)] line-clamp-3 leading-relaxed">
          {marketplace.description || 'No description available'}
        </p>
        <p className="text-xs text-[var(--color-richNavy)]/60 mt-auto">
          Created {createdAt.toLocaleDateString()}
        </p>

        {/* Status */}
        {isPast ? (
          <div className="text-center py-2 text-sm text-[var(--color-richNavy)]/70">
            <FaLock className="inline mr-1" />
            Marketplace closed
          </div>
        ) : canReopen ? (
          <button className="mt-2 w-full py-2 text-sm rounded-lg cursor-pointer bg-[var(--color-creamParchment)] text-[var(--color-richNavy)] hover:bg-[var(--color-softPeach)]">
            Open Marketplace
          </button>
        ) : (
          <div className="mt-2 flex items-center justify-between text-sm text-[var(--color-richNavy)]">
            <span>
              <FaCheckCircle className="inline mr-1 text-green-600" />
              Active
            </span>
            <span className="text-xs text-[var(--color-richNavy)]/60">
              {marketplace.books?.length || 0} listings
            </span>
          </div>
        )}
      </div>

      {/* Overlay */}
      {isPast && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-md flex items-center justify-center">
          <div className="text-center p-4 bg-[var(--color-creamParchment)] rounded-xl border border-[var(--color-warmSand)] shadow">
            <FaLock className="text-xl text-[var(--color-richNavy)] mb-2 mx-auto" />
            <p className="text-sm text-[var(--color-richNavy)]">
              This marketplace has ended
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export const ViewAllCard = () => {
  return (
    <NavLink
      to="/merchant/all-marketplaces"
      className="relative flex flex-col items-center justify-center p-6 rounded-2xl border-[var(--color-warmSand)] bg-[var(--color-creamParchment)] hover:shadow-2xl transition-all duration-200 group"
    >
      <div className="w-12 h-12 rounded-full bg-[var(--color-richNavy)]/10 group-hover:bg-[var(--color-richNavy)]/20 flex items-center justify-center mb-4 transition-colors">
        <FaChevronRight className="text-[var(--color-richNavy)] text-xl" />
      </div>
      <h3 className="text-lg font-medium text-[var(--color-richNavy)] mb-1">
        View All
      </h3>
      <p className="text-sm text-[var(--color-richNavy)]/70 text-center">
        Browse all your marketplaces
      </p>
    </NavLink>
  );
};

export default MarketplaceCard;
