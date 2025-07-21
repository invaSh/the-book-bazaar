import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FaStore,
  FaLock,
  FaUnlock,
  FaCalendarAlt,
  FaUser,
  FaBook,
  FaEdit,
  FaPlus,
  FaFilter,
  FaSearch,
  FaDollarSign,
  FaBookOpen,
  FaStar,
  FaCheckCircle,
  FaSort,
} from 'react-icons/fa';
import { formatDate } from '../../utils/helpers';
import { FiExternalLink, FiMoreHorizontal } from 'react-icons/fi';

const dummyMarketplace = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  title: 'Campus Book Exchange',
  description: 'Buy and sell textbooks with other students',
  status: 'Active',
  openDate: '2023-09-01T00:00:00',
  closeDate: '2023-12-15T00:00:00',
  createdAt: '2023-08-15T10:30:00',
  updatedAt: '2023-09-20T14:45:00',
  user: {
    id: '123e4567-e89b-12d3-a456-426614174001',
    fullName: 'Alex Johnson',
    userName: 'alexj',
    email: 'alex.johnson@example.edu',
  },
  books: [
    {
      id: '1001',
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      price: 45.0,
      condition: 'Good',
      isbn: '978-0262033848',
    },
    {
      id: '1002',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      price: 30.5,
      condition: 'Like New',
      isbn: '978-0132350884',
    },
  ],
};

const MarketplaceProfile = () => {
  const [marketplace, setMarketplace] = useState(dummyMarketplace);
  const [isEditingDates, setIsEditingDates] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      openDate: marketplace.openDate?.split('T')[0] || '',
      closeDate: marketplace.closeDate?.split('T')[0] || '',
    },
  });
  const [selectedBook, setSelectedBook] = useState(false);

  const toggleMarketplaceStatus = () => {
    setMarketplace((prev) => ({
      ...prev,
      status: prev.status === 'Active' ? 'Closed' : 'Active',
      updatedAt: new Date().toISOString(),
    }));
  };

  const onSubmitDates = (data) => {
    setMarketplace((prev) => ({
      ...prev,
      openDate: data.openDate ? `${data.openDate}T00:00:00` : null,
      closeDate: data.closeDate ? `${data.closeDate}T00:00:00` : null,
      updatedAt: new Date().toISOString(),
    }));
    setIsEditingDates(false);
  };

  return (
    <div className="max-w-[100rem] mx-auto p-6 h-full">
      <div className="flex flex-col gap-4 lg:flex-row justify-between items-start lg:items-center mb-6">
        <h1 className="text-3xl font-light text-[var(--color-richNavy)] font-poppins">
          {marketplace.title}
        </h1>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={toggleMarketplaceStatus}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium cursor-pointer transition-colors ${
              marketplace.status === 'Active'
                ? ' text-deepBurgundy hover:text-red-900'
                : 'text-[var(--color-goldFoiling)] hover:text-amber-900'
            }`}
          >
            {marketplace.status === 'Active' ? (
              <>
                <FaLock className="text-sm" /> Close Marketplace
              </>
            ) : (
              <>
                <FaUnlock className="text-sm" /> Open Marketplace
              </>
            )}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[var(--color-richNavy)] font-medium hover:bg-gray-100 transition-colors">
            <FaPlus /> Add Book
          </button>
        </div>
      </div>

      {/* Banner and Info Grid Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 border-dashed flex items-center border-amber-700/20 justify-center min-h-[200px] cursor-pointer hover:bg-[var(--color-creamParchment)] transition-colors backdrop-blur-3xl bg-white/50 border rounded-4xl">
          <div className="text-center">
            <FaPlus className="mx-auto text-3xl text-[var(--color-goldFoiling)] mb-2" />
            <p className="text-[var(--color-richNavy)] font-medium">
              Add Banner Image
            </p>
            <p className="text-sm text-[var(--color-mutedSlate)]">
              Recommended size: 1200x400px
            </p>
          </div>
        </div>

        <div className="relative p-5 bg-white/60 backdrop-blur-3xl rounded-3xl border border-white/30">
          <div className="space-y-5">
            <div className="pb-3 border-b border-white/40">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-mutedSlate)] mb-2">
                Description
              </h3>
              <p className="text-sm text-[var(--color-richNavy)] leading-relaxed">
                {marketplace.description}
              </p>
            </div>
            <div className="pb-3 border-b border-white/40">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-mutedSlate)] mb-2">
                Status
              </h3>
              <button
                onClick={toggleMarketplaceStatus}
                className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  marketplace.status === 'Active'
                    ? 'bg-[var(--color-mellowApricot)/80] text-[var(--color-goldFoiling)] shadow-[inset_0_1px_4px_rgba(255,255,255,0.3)]'
                    : 'bg-[var(--color-paleRose)/80] text-[var(--color-deepBurgundy)] shadow-[inset_0_1px_4px_rgba(255,255,255,0.3)]'
                }`}
              >
                {marketplace.status === 'Active' ? (
                  <FaUnlock className="mr-2 text-xs" />
                ) : (
                  <FaLock className="mr-2 text-xs" />
                )}
                {marketplace.status}
              </button>
            </div>

            {isEditingDates ? (
              <form
                onSubmit={handleSubmit(onSubmitDates)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-mutedSlate)] mb-2">
                      Open Date
                    </label>
                    <input
                      type="date"
                      {...register('openDate')}
                      className="w-full p-2 text-xs rounded-lg border border-[var(--color-warmSand)/50] bg-white/70 focus:ring-1 focus:ring-[var(--color-goldFoiling)/30]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-mutedSlate)] mb-2">
                      Close Date
                    </label>
                    <input
                      type="date"
                      {...register('closeDate')}
                      className="w-full p-2 text-xs rounded-lg border border-[var(--color-warmSand)/50] bg-white/70 focus:ring-1 focus:ring-[var(--color-goldFoiling)/30]"
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setIsEditingDates(false)}
                    className="px-3 py-1.5 text-xs font-medium bg-white/50 text-[var(--color-richNavy)] rounded-lg hover:bg-white/70 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 text-xs font-medium bg-[var(--color-goldFoiling)] text-white rounded-lg hover:bg-[var(--color-goldFoiling)/90] transition-colors"
                  >
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-mutedSlate)] mb-1">
                      Open Date
                    </h3>
                    <p className="text-sm text-[var(--color-richNavy)]">
                      {formatDate(marketplace.openDate)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-mutedSlate)] mb-1">
                      Close Date
                    </h3>
                    <p className="text-sm text-[var(--color-richNavy)]">
                      {formatDate(marketplace.closeDate)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditingDates(true)}
                  className="text-xs text-[var(--color-goldFoiling)] hover:text-[var(--color-goldFoiling)/80] transition-colors flex items-center gap-1"
                >
                  <FaEdit className="text-xs" /> Edit dates
                </button>
              </div>
            )}
            <div className="pt-2">
              <p className="text-xs text-[var(--color-mutedSlate)/90]">
                Created {formatDate(marketplace.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="backdrop-blur-md bg-white/50 border border-white/20 rounded-4xl p-6 mb-6">
        <h2 className="text-xl font-light text-[var(--color-richNavy)] mb-4">
          Marketplace Owner
        </h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[var(--color-warmSand)] flex items-center justify-center text-xl font-medium text-[var(--color-richNavy)]">
            {marketplace.user.fullName
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
          <div>
            <h3 className="text-lg font-medium text-[var(--color-richNavy)]">
              {marketplace.user.fullName}
            </h3>
            <p className="text-sm text-[var(--color-mutedSlate)]">
              @{marketplace.user.userName}
            </p>
            <p className="text-sm text-[var(--color-richNavy)] mt-1">
              {marketplace.user.email}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">All filters</div>
          <div className="flex items-center gap-2">
            <FaFilter className="text-[var(--color-richNavy)] opacity-80" />
            <select className="backdrop-blur-sm bg-white/50 px-3 py-2 rounded-full focus:ring-2 focus:ring-[var(--color-goldFoiling)] text-[var(--color-richNavy)]">
              <option>All Conditions</option>
              <option>New</option>
              <option>Like New</option>
              <option>Good</option>
              <option>Fair</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="flex items-center gap-2">
            <FaDollarSign className="text-[var(--color-richNavy)] opacity-80" />
            <select className="backdrop-blur-sm bg-white/50 px-3 py-2 rounded-full border border-white/30 focus:ring-2 focus:ring-[var(--color-goldFoiling)] text-[var(--color-richNavy)]">
              <option>Price Range</option>
              <option>Under $10</option>
              <option>$10 - $25</option>
              <option>$25 - $50</option>
              <option>Over $50</option>
            </select>
          </div>

          {/* Genre Filter */}
          <div className="flex items-center gap-2">
            <FaBook className="text-[var(--color-richNavy)] opacity-80" />
            <select className="backdrop-blur-sm bg-white/50 px-3 py-2 rounded-full border border-white/30 focus:ring-2 focus:ring-[var(--color-goldFoiling)] text-[var(--color-richNavy)]">
              <option>All Genres</option>
              <option>Fiction</option>
              <option>Non-Fiction</option>
              <option>Mystery</option>
              <option>Science Fiction</option>
            </select>
          </div>

          {/* Format Filter */}
          <div className="flex items-center gap-2">
            <FaBookOpen className="text-[var(--color-richNavy)] opacity-80" />
            <select className="backdrop-blur-sm bg-white/50 px-3 py-2 rounded-full border border-white/30 focus:ring-2 focus:ring-[var(--color-goldFoiling)] text-[var(--color-richNavy)]">
              <option>All Formats</option>
              <option>Hardcover</option>
              <option>Paperback</option>
              <option>Audiobook</option>
              <option>eBook</option>
            </select>
          </div>

          {/* Rating Filter */}
          <div className="flex items-center gap-2">
            <FaStar className="text-[var(--color-richNavy)] opacity-80" />
            <select className="backdrop-blur-sm bg-white/50 px-3 py-2 rounded-full border border-white/30 focus:ring-2 focus:ring-[var(--color-goldFoiling)] text-[var(--color-richNavy)]">
              <option>All Ratings</option>
              <option>5 Stars</option>
              <option>4+ Stars</option>
              <option>3+ Stars</option>
              <option>Any Rating</option>
            </select>
          </div>

          {/* Availability Filter */}
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-[var(--color-richNavy)] opacity-80" />
            <select className="backdrop-blur-sm bg-white/50 px-3 py-2 rounded-full border border-white/30 focus:ring-2 focus:ring-[var(--color-goldFoiling)] text-[var(--color-richNavy)]">
              <option>Availability</option>
              <option>In Stock</option>
              <option>Pre-Order</option>
              <option>Out of Stock</option>
            </select>
          </div>

          {/* Sort By Filter */}
          <div className="flex items-center gap-2">
            <FaSort className="text-[var(--color-richNavy)] opacity-80" />
            <select className="backdrop-blur-sm bg-white/50 px-3 py-2 rounded-full border border-white/30 focus:ring-2 focus:ring-[var(--color-goldFoiling)] text-[var(--color-richNavy)]">
              <option>Sort By</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Best Selling</option>
            </select>
          </div>
        </div>
      </div>
      {/* Table Section */}
      <div className="bg-white/50 backdrop-blur-sm rounded-4xl overflow-hidden mb-8 p-4 sm:p-6 lg:p-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3">
            <h2 className="text-xl font-semibold text-[var(--color-richNavy)] mb-6">
              Books in this marketplace
            </h2>
            <div className="w-full flex flex-col gap-2">
              {marketplace.books.map((book) => (
                <div
                  key={book.id}
                  onClick={() => setSelectedBook(book)}
                  className={`flex items-center cursor-pointer rounded-full transition-all duration-200 ease-out ${
                    selectedBook?.id === book.id
                      ? 'bg-[var(--color-goldFoiling)]/20 scale-[1.02]'
                      : 'hover:bg-[var(--color-creamParchment)]/50'
                  }`}
                >
                  <div className="px-4 py-3 w-1/3 text-sm font-medium text-[var(--color-richNavy)] truncate">
                    {book.title}
                  </div>
                  <div className="px-4 py-3 w-1/3 text-sm text-[var(--color-richNavy)] truncate">
                    {book.author}
                  </div>
                  <div className="px-4 py-3 w-1/3 text-sm text-[var(--color-richNavy)] truncate">
                    <span
                      className={`px-2 py-1 rounded-full text-xs inline-block hover:scale-105 transition-transform ${
                        book.condition === 'Like New'
                          ? 'bg-green-100 text-green-800'
                          : book.condition === 'Good'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {book.condition}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-2/3 bg-white/30 backdrop-blur-sm rounded-3xl border border-white/20">
            {selectedBook ? (
              <div className="flex flex-col lg:flex-row gap-6 p-6 bg-[var(--color-warmSand)] rounded-xl shadow-sm min-h-[300px]">
                {/* Book Cover */}
                <div className="w-full lg:w-1/3 min-w-[160px] max-w-[220px] bg-[var(--color-creamParchment)] rounded-lg shadow-book flex items-center justify-center p-4 mx-auto lg:mx-0">
                  <span className="text-[var(--color-richNavy)]/30 text-sm">
                    Book Cover
                  </span>
                </div>

                {/* Details Section */}
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="text-xl font-light text-[var(--color-richNavy)] tracking-wide text-center lg:text-left">
                      Book Details
                    </h3>
                    <div className="flex gap-2">
                      <button className="rounded-full bg-[var(--color-creamParchment)] text-[var(--color-richNavy)] p-2 hover:opacity-80 transition">
                        <FiMoreHorizontal size={18} />
                      </button>
                      <button className="rounded-full bg-[var(--color-creamParchment)] text-[var(--color-richNavy)] p-2 hover:opacity-80 transition">
                        <FiExternalLink size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Title */}
                    <div className="bg-[var(--color-creamParchment)] p-3 rounded-lg">
                      <p className="text-xs font-light text-[var(--color-richNavy)]/60 uppercase tracking-wider mb-1">
                        Title
                      </p>
                      <p className="font-light text-[var(--color-richNavy)]">
                        {selectedBook.title}
                      </p>
                    </div>

                    {/* Author */}
                    <div className="bg-[var(--color-creamParchment)] p-3 rounded-lg">
                      <p className="text-xs font-light text-[var(--color-richNavy)]/60 uppercase tracking-wider mb-1">
                        Author
                      </p>
                      <p className="font-light text-[var(--color-richNavy)]">
                        {selectedBook.author}
                      </p>
                    </div>

                    {/* Condition */}
                    <div className="bg-[var(--color-creamParchment)] p-3 rounded-lg">
                      <p className="text-xs font-light text-[var(--color-richNavy)]/60 uppercase tracking-wider mb-1">
                        Condition
                      </p>
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-light ${
                          selectedBook.condition === 'Like New'
                            ? 'bg-green-50 text-green-700'
                            : selectedBook.condition === 'Good'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-gray-50 text-gray-700'
                        }`}
                      >
                        {selectedBook.condition}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="bg-[var(--color-creamParchment)] p-3 rounded-lg">
                      <p className="text-xs font-light text-[var(--color-richNavy)]/60 uppercase tracking-wider mb-1">
                        Price
                      </p>
                      <p className="font-light text-[var(--color-richNavy)]">
                        ${selectedBook.price.toFixed(2)}
                      </p>
                    </div>

                    {/* ISBN */}
                    <div className="bg-[var(--color-creamParchment)] p-3 rounded-lg col-span-1 sm:col-span-2">
                      <p className="text-xs font-light text-[var(--color-richNavy)]/60 uppercase tracking-wider mb-1">
                        ISBN
                      </p>
                      <p className="font-light text-[var(--color-richNavy)]">
                        {selectedBook.isbn}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full p-6">
                <p className="text-[var(--color-richNavy)]/50">
                  Select a book to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceProfile;
