import React from 'react';
import { FaPlus } from 'react-icons/fa';

const MarketplaceBanner = () => (
  <div className="lg:col-span-2 border-dashed flex items-center border-amber-700/20 justify-center min-h-[200px] cursor-pointer hover:bg-[var(--color-creamParchment)] transition-colors backdrop-blur-3xl bg-white/50 border rounded-4xl">
    <div className="text-center">
      <FaPlus className="mx-auto text-3xl text-[var(--color-goldFoiling)] mb-2" />
      <p className="text-[var(--color-richNavy)] font-medium">Add Banner Image</p>
      <p className="text-sm text-[var(--color-mutedSlate)]">Recommended size: 1200x400px</p>
    </div>
  </div>
);

export default MarketplaceBanner;