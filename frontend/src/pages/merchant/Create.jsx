import React from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { createMarketplace } from '../../actions/marketplaceActions';
import { Button } from '../../components/Button';
import { toast } from 'react-hot-toast';
import {
  FaStoreAlt,
  FaRegCalendarAlt,
  FaRegEdit,
  FaCheck,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function Create() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    toast.dismiss();
    const loading = toast.loading('Creating marketplace...');
    try {
      const response = await createMarketplace(data);
      if (response.error) {
        toast.error(
          response.error.message?.message || 'Failed to create marketplace',
          { id: loading }
        );
        return;
      }
      toast.success('Marketplace created!', { id: loading });
      reset();
      setTimeout(() => navigate('/merchant'), 1200);
    } catch (e) {
      toast.error('Something went wrong', { id: loading });
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 w-full text-sm sm:text-base md:mt-20">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-6xl mx-auto"
      >
        <div className="flex flex-col lg:flex-row rounded-xl shadow-xl">
          {/* Left: Info Panel */}
          <motion.div
            variants={itemVariants}
            className="lg:w-2/5 bg-[var(--color-warmSand)] md:rounded-tr-none rounded-t-xl md:rounded-bl-xl md:rounded-tl-xl p-6 sm:p-8 md:p-10 text-[var(--color-richNavy)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[var(--color-creamParchment)]/80 rounded-lg">
                <FaStoreAlt className="text-lg sm:text-xl text-[var(--color-richNavy)]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold font-poppins">
                New Marketplace
              </h2>
            </div>

            <h3 className="text-2xl sm:text-3xl font-semibold mb-4 leading-tight font-poppins">
              Curate Your Literary Collection
            </h3>

            <p className="text-sm sm:text-base text-[var(--color-richNavy)]/90 mb-8">
              Establish your unique book marketplace with our elegant platform
              designed for bibliophiles and collectors.
            </p>

            <div className="space-y-4">
              {[
                {
                  title: 'Distinct Branding',
                  desc: 'Showcase your unique style',
                },
                {
                  title: 'Flexible Timeline',
                  desc: "Control your market's availability",
                },
                {
                  title: 'Elegant Presentation',
                  desc: 'Sophisticated interface for collectors',
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-[var(--color-creamParchment)] rounded-full">
                    <FaCheck className="text-xs text-[var(--color-richNavy)]" />
                  </div>
                  <div>
                    <h4 className="font-medium font-poppins">{item.title}</h4>
                    <p className="text-[var(--color-richNavy)]/80 text-xs sm:text-sm">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form Panel */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            variants={itemVariants}
            className="lg:w-3/5 p-6 sm:p-8 md:p-10 bg-white rounded-b-xl md:rounded-tr-xl md:rounded-br-xl"
            autoComplete="off"
          >
            <div className="mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-semibold text-[var(--color-richNavy)] mb-2 font-poppins">
                Marketplace Details
              </h3>
              <p className="text-sm text-[var(--color-mutedSlate)]">
                Define your collection's parameters
              </p>
            </div>

            <div className="space-y-6">
              {/* Title Field */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-xs sm:text-sm font-medium text-[var(--color-richNavy)] mb-1 font-poppins"
                >
                  Marketplace Title
                </label>
                <div className="relative">
                  <input
                    id="title"
                    type="text"
                    placeholder="e.g. Antiquarian Book Fair"
                    {...register('title', { required: 'Title is required' })}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[var(--color-goldFoiling)] focus:border-[var(--color-goldFoiling)] text-[var(--color-richNavy)] placeholder-[var(--color-mutedSlate)] transition-all duration-200 font-poppins ${
                      errors.title
                        ? 'border-[var(--color-paleRose)]'
                        : 'border-[var(--color-warmSand)]'
                    }`}
                  />
                  {errors.title && (
                    <p className="mt-1 text-xs sm:text-sm text-[var(--color-deepBurgundy)] font-poppins">
                      {errors.title.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Description Field */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-xs sm:text-sm font-medium text-[var(--color-richNavy)] mb-1 font-poppins"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  placeholder="Describe your collection's focus and specialties..."
                  {...register('description', {
                    required: 'Description is required',
                  })}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[var(--color-goldFoiling)] focus:border-[var(--color-goldFoiling)] text-[var(--color-richNavy)] placeholder-[var(--color-mutedSlate)] transition-all duration-200 resize-none font-poppins ${
                    errors.description
                      ? 'border-[var(--color-paleRose)]'
                      : 'border-[var(--color-warmSand)]'
                  }`}
                />
                {errors.description && (
                  <p className="mt-1 text-xs sm:text-sm text-[var(--color-deepBurgundy)] font-poppins">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Date Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    id: 'openDate',
                    label: 'Open Date',
                    error: errors.openDate,
                  },
                  {
                    id: 'closeDate',
                    label: 'Close Date',
                    error: errors.closeDate,
                  },
                ].map(({ id, label, error }) => (
                  <div key={id}>
                    <label
                      htmlFor={id}
                      className="block text-xs sm:text-sm font-medium text-[var(--color-richNavy)] mb-1 font-poppins"
                    >
                      {label}
                    </label>
                    <input
                      id={id}
                      type="date"
                      {...register(id, { required: `${label} is required` })}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[var(--color-goldFoiling)] focus:border-[var(--color-goldFoiling)] text-[var(--color-richNavy)] placeholder-[var(--color-mutedSlate)] transition-all duration-200 font-poppins ${
                        error
                          ? 'border-[var(--color-paleRose)]'
                          : 'border-[var(--color-warmSand)]'
                      }`}
                    />
                    {error && (
                      <p className="mt-1 text-xs sm:text-sm text-[var(--color-deepBurgundy)] font-poppins">
                        {error.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  isLoading={isSubmitting}
                  className="w-full text-sm sm:text-base bg-[var(--color-warmSand)] h-11 sm:h-14 rounded-xl cursor-pointer hover:bg-[var(--color-creamParchment)] focus:ring-[var(--color-goldFoiling)] focus:ring-offset-2 text-[var(--color-richNavy)] font-poppins font-medium transition-colors duration-200"
                >
                  Create Marketplace
                </button>
              </div>
            </div>
          </motion.form>
        </div>
      </motion.section>
    </div>
  );
}

export default Create;
