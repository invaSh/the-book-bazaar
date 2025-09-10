import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
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
import {
  changeStatus,
  getMarketplaceProfile,
} from '../../actions/marketplaceActions';
import { useParams } from 'react-router-dom';
import Preloader from '../../components/Preloader';
import Header from '../../features/merchant/profile/MarketplaceHeader';
import Banner from '../../features/merchant/profile/MarketplaceBanner';
import Info from '../../features/merchant/profile/MarketplaceInfo';
import Owner from '../../features/merchant/profile/MarketplaceOwner';
import BookFilters from '../../features/merchant/profile/BookFilters';
import AddBookModal from '../../features/merchant/profile/AddBookModal';
import { toast } from 'react-toastify';

const MarketplaceProfile = () => {
  const { id } = useParams();
  const [marketplace, setMarketplace] = useState(null);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      openDate: marketplace?.openDate?.split('T')[0] || '',
      closeDate: marketplace?.closeDate?.split('T')[0] || '',
    },
  });
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [isEditingDates, setIsEditingDates] = useState(false);
  const [selectedBook, setSelectedBook] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    const fetchMarketplace = async () => {
      const response = await getMarketplaceProfile(id);
      if (response.error) {
        console.log(response.error);
      } else {
        setMarketplace(response.data);
      }
      setLoading(false);
    };
    fetchMarketplace();
  }, []);

  const changeMarketplaceStatus = async () => {
    setIsChanging(true);
    
    const response = await changeStatus(id);
    if(response.error){
      toast.error(response.error.message.error || response.error.message);
    }else{
      console.log(response.data);
    }
    setIsChanging(false);
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

  const handleAddBook = (bookData) => {
    console.log('New book data:', bookData);
  };

  return (
    <div className="max-w-[100rem] mx-auto p-6 h-full">
      {loading && <Preloader isLoading={loading} />}
      {isChanging && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30">
          <div className="w-16 h-16 border-4 border-white/40 border-t-[var(--color-goldFoiling)] rounded-full animate-spin"></div>
        </div>
      )}
      {marketplace && !loading && (
        <>
          <Header
            onToggleStatus={changeMarketplaceStatus}
            marketplace={marketplace}
            onAddBook={() => setOpen(true)}
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Banner />
            <Info marketplace={marketplace} onUpdateDates={onSubmitDates} />
          </div>

          <Owner user={marketplace.user} />
          <BookFilters />

          <div className="bg-white/50 backdrop-blur-sm rounded-4xl overflow-hidden mb-8 p-4 sm:p-6 lg:p-10">
            {marketplace.books.length > 0 ? (
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
            ) : (
              <div className="text-center">
                This marketplace has no books. Click on "Add Book" to get
                started.
              </div>
            )}
          </div>
        </>
      )}

      <AddBookModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleAddBook}
      />
    </div>
  );
};

export default MarketplaceProfile;
