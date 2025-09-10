import React from 'react';
import {
  FaFilter,
  FaDollarSign,
  FaBook,
  FaBookOpen,
  FaStar,
  FaCheckCircle,
  FaSort,
} from 'react-icons/fa';

const BookFilters = () => {
  const filterOptions = [
    {
      icon: FaFilter,
      options: ['All Conditions', 'New', 'Like New', 'Good', 'Fair'],
    },
    {
      icon: FaDollarSign,
      options: [
        'Price Range',
        'Under $10',
        '$10 - $25',
        '$25 - $50',
        'Over $50',
      ],
    },
    {
      icon: FaBook,
      options: [
        'All Genres',
        'Fiction',
        'Non-Fiction',
        'Mystery',
        'Science Fiction',
      ],
    },
    {
      icon: FaBookOpen,
      options: ['All Formats', 'Hardcover', 'Paperback', 'Audiobook', 'eBook'],
    },
    {
      icon: FaStar,
      options: ['All Ratings', '5 Stars', '4+ Stars', '3+ Stars', 'Any Rating'],
    },
    {
      icon: FaCheckCircle,
      options: ['Availability', 'In Stock', 'Pre-Order', 'Out of Stock'],
    },
    {
      icon: FaSort,
      options: [
        'Sort By',
        'Newest',
        'Price: Low to High',
        'Price: High to Low',
        'Best Selling',
      ],
    },
  ];

  return (
    <div className="rounded-xl p-4 mb-6">
      <div className="md:hidden items-center gap-2 text-center mb-5">
        All filters
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="md:flex hidden items-center gap-2">All filters</div>
        {filterOptions.map(({ icon: Icon, options }, index) => (
          <div key={index} className="flex items-center gap-2">
            <Icon className="text-[var(--color-richNavy)] opacity-80" />
            <select className="backdrop-blur-sm bg-white/50 px-3 py-2 rounded-full border border-white/30 focus:ring-2 focus:ring-[var(--color-goldFoiling)] text-[var(--color-richNavy)]">
              {options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};


export default BookFilters;
