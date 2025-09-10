import React from 'react';

const MarketplaceOwner = ({ user }) => (
  <div className="backdrop-blur-md flex bg-white/50 border border-white/20 rounded-4xl flex-col md:items-start items-center text-center md:text-left p-6 mb-6">
    <h2 className="md:text-3xl font-light text-[var(--color-richNavy)] mb-4">
      Marketplace Owner
    </h2>
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="w-16 h-16 rounded-full bg-[var(--color-warmSand)] flex items-center justify-center text-xl font-medium text-[var(--color-richNavy)]">
        {user.fullName
          .split(' ')
          .map((n) => n[0])
          .join('')}
      </div>
      <div>
        <h3 className="md:text-lg font-medium text-[var(--color-richNavy)]">
          {user.fullName}
        </h3>
        <p className="text-xs md:text-sm text-[var(--color-mutedSlate)]">
          @{user.userName}
        </p>
        <p className="text-xs md:text-sm text-[var(--color-richNavy)] mt-1">
          {user.email}
        </p>
      </div>
    </div>
  </div>
);


export default MarketplaceOwner;