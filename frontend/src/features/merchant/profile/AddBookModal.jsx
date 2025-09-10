import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FaBook,
  FaUser,
  FaDollarSign,
  FaBarcode,
  FaTimes,
  FaUpload,
  FaPlus,
} from 'react-icons/fa';
import Modal from '../../../components/Modal';

const AddBookModal = ({ open, onClose, onSubmit }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      title: '',
      author: '',
      isbn: '',
      condition: 'Good',
      price: '',
      genre: '',
      format: 'Paperback',
      description: '',
      image: null,
    },
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue('image', file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onFormSubmit = (data) => {
    onSubmit(data);
    reset();
    setImagePreview(null);
    onClose();
  };

  const handleClose = () => {
    reset();
    setImagePreview(null);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="w-full max-w-7xl bg-white/95 backdrop-blur-xl rounded-4xl border border-white/30 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20 bg-gradient-to-r from-[var(--color-creamParchment)]/80 to-[var(--color-warmSand)]/80">
          <h2 className="text-2xl font-light text-[var(--color-richNavy)]">
            Add New Book
          </h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-white/50 transition-colors text-[var(--color-richNavy)]"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit(onFormSubmit)} className="p-6">
          {/* Flex container for image + form */}
          <div className="flex flex-col lg:flex-row gap-6 items-stretch">
            {/* Image Upload Section */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1 relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="book-image"
                />
                <label
                  htmlFor="book-image"
                  className="block w-full h-full min-h-[20rem] border-2 border-dashed border-amber-700/20 rounded-3xl cursor-pointer hover:bg-[var(--color-creamParchment)]/50 transition-colors bg-white/50 flex items-center justify-center"
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-3xl"
                    />
                  ) : (
                    <div className="text-center">
                      <FaUpload className="mx-auto text-3xl text-[var(--color-goldFoiling)] mb-2" />
                      <p className="text-[var(--color-richNavy)] font-medium">
                        Upload Cover Image
                      </p>
                      <p className="text-sm text-[var(--color-mutedSlate)]">
                        JPG, PNG up to 5MB
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Form Fields */}
            <div className="flex-[2] flex flex-col space-y-6">
              {/* Title and Author Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider text-[var(--color-mutedSlate)] mb-2">
                    <FaBook className="inline mr-2" />
                    Book Title *
                  </label>
                  <input
                    type="text"
                    {...register('title', { required: 'Title is required' })}
                    className="w-full p-3 rounded-xl border border-white/30 bg-white/70 backdrop-blur-sm 
                       focus:ring-2 focus:ring-[var(--color-goldFoiling)]/50 focus:border-[var(--color-goldFoiling)] 
                       text-[var(--color-richNavy)] placeholder-[var(--color-mutedSlate)]/50"
                    placeholder="Enter book title"
                  />
                  {errors.title && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.title.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider text-[var(--color-mutedSlate)] mb-2">
                    <FaUser className="inline mr-2" />
                    Author *
                  </label>
                  <input
                    type="text"
                    {...register('author', { required: 'Author is required' })}
                    className="w-full p-3 rounded-xl border border-white/30 bg-white/70 backdrop-blur-sm 
                       focus:ring-2 focus:ring-[var(--color-goldFoiling)]/50 focus:border-[var(--color-goldFoiling)] 
                       text-[var(--color-richNavy)] placeholder-[var(--color-mutedSlate)]/50"
                    placeholder="Enter author name"
                  />
                  {errors.author && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.author.message}
                    </span>
                  )}
                </div>
              </div>

              {/* ISBN and Price Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider text-[var(--color-mutedSlate)] mb-2">
                    <FaBarcode className="inline mr-2" />
                    ISBN
                  </label>
                  <input
                    type="text"
                    {...register('isbn')}
                    className="w-full p-3 rounded-xl border border-white/30 bg-white/70 backdrop-blur-sm 
                       focus:ring-2 focus:ring-[var(--color-goldFoiling)]/50 focus:border-[var(--color-goldFoiling)] 
                       text-[var(--color-richNavy)] placeholder-[var(--color-mutedSlate)]/50"
                    placeholder="Enter ISBN"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider text-[var(--color-mutedSlate)] mb-2">
                    <FaDollarSign className="inline mr-2" />
                    Price *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    {...register('price', {
                      required: 'Price is required',
                      min: { value: 0, message: 'Price must be positive' },
                    })}
                    className="w-full p-3 rounded-xl border border-white/30 bg-white/70 backdrop-blur-sm 
                       focus:ring-2 focus:ring-[var(--color-goldFoiling)]/50 focus:border-[var(--color-goldFoiling)] 
                       text-[var(--color-richNavy)] placeholder-[var(--color-mutedSlate)]/50"
                    placeholder="0.00"
                  />
                  {errors.price && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.price.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Condition, Genre, Format Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider text-[var(--color-mutedSlate)] mb-2">
                    Condition *
                  </label>
                  <select
                    {...register('condition', {
                      required: 'Condition is required',
                    })}
                    className="w-full p-3 rounded-xl border border-white/30 bg-white/70 backdrop-blur-sm 
                       focus:ring-2 focus:ring-[var(--color-goldFoiling)]/50 focus:border-[var(--color-goldFoiling)] 
                       text-[var(--color-richNavy)]"
                  >
                    <option value="New">New</option>
                    <option value="Like New">Like New</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider text-[var(--color-mutedSlate)] mb-2">
                    Genre
                  </label>
                  <select
                    {...register('genre')}
                    className="w-full p-3 rounded-xl border border-white/30 bg-white/70 backdrop-blur-sm 
                       focus:ring-2 focus:ring-[var(--color-goldFoiling)]/50 focus:border-[var(--color-goldFoiling)] 
                       text-[var(--color-richNavy)]"
                  >
                    <option value="">Select Genre</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Non-Fiction">Non-Fiction</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Science Fiction">Science Fiction</option>
                    <option value="Romance">Romance</option>
                    <option value="Biography">Biography</option>
                    <option value="History">History</option>
                    <option value="Self-Help">Self-Help</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider text-[var(--color-mutedSlate)] mb-2">
                    Format
                  </label>
                  <select
                    {...register('format')}
                    className="w-full p-3 rounded-xl border border-white/30 bg-white/70 backdrop-blur-sm 
                       focus:ring-2 focus:ring-[var(--color-goldFoiling)]/50 focus:border-[var(--color-goldFoiling)] 
                       text-[var(--color-richNavy)]"
                  >
                    <option value="Paperback">Paperback</option>
                    <option value="Hardcover">Hardcover</option>
                    <option value="eBook">eBook</option>
                    <option value="Audiobook">Audiobook</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold uppercase tracking-wider text-[var(--color-mutedSlate)] mb-2">
                  Description
                </label>
                <textarea
                  {...register('description')}
                  rows="4"
                  className="w-full p-3 rounded-xl border border-white/30 bg-white/70 backdrop-blur-sm 
                     focus:ring-2 focus:ring-[var(--color-goldFoiling)]/50 focus:border-[var(--color-goldFoiling)] 
                     text-[var(--color-richNavy)] placeholder-[var(--color-mutedSlate)]/50 resize-none"
                  placeholder="Optional description of the book condition, notes, etc."
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-white/20">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 rounded-xl bg-white/50 text-[var(--color-richNavy)] font-medium 
                 hover:bg-white/70 transition-colors border border-white/30"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-goldFoiling)] 
                 text-white font-medium hover:bg-[var(--color-goldFoiling)]/90 transition-colors 
                 shadow-lg hover:shadow-xl"
            >
              <FaPlus className="text-sm" />
              Add Book
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddBookModal;
