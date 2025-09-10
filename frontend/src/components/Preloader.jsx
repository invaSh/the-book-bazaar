import React from 'react';
import { FaStore } from 'react-icons/fa';

const ComicBookPreloader = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center w-screen h-screen bg-white backdrop-blur-sm">
      <div className="relative flex flex-col items-center justify-center gap-6">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div className="z-10 flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-warmSand)]/80 shadow-md">
            <FaStore className="text-2xl text-[var(--color-richNavy)]" />
          </div>

          <div className="absolute inset-0 border-4 border-transparent border-t-[var(--color-richNavy)] border-r-[var(--color-richNavy)] rounded-full animate-spin opacity-70"></div>
          <div className="absolute inset-[10%] border-4 border-transparent border-t-[var(--color-richNavy)] border-r-[var(--color-richNavy)] rounded-full animate-spin opacity-50 animation-delay-100"></div>
          <div className="absolute inset-[20%] border-4 border-transparent border-t-[var(--color-richNavy)] border-r-[var(--color-richNavy)] rounded-full animate-spin opacity-30 animation-delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default ComicBookPreloader;
