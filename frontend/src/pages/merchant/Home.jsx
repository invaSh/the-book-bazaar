import React, { useEffect, useState } from 'react';
import { getMarketplaces } from '../../actions/marketplaceActions';
import { ErrorState, EmptyState, LoadingState } from '../../components/States';
import {
  FaSpinner,
  FaStore,
  FaBookOpen,
  FaCalendarAlt,
  FaPlus,
  FaChevronRight,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.07,
      duration: 0.5,
      type: 'spring',
      bounce: 0.18,
    },
  }),
};

function Home() {
  const [marketplaces, setMarketplaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getMarketplaces();
        if (response.error) {
          setError(response.error.message);
        } else {
          setMarketplaces(response.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="bg-[var(--color-warmSand)]/30 w-full h-full rounded-2xl flex items-center justify-center min-h-[40vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        >
          <FaSpinner className="text-4xl text-[var(--color-goldFoiling)] animate-spin" />
        </motion.div>
      </section>
    );
  }

  if (error) {
    return <ErrorState title="Couldn't get marketplaces" error={error} />;
  }

  if (marketplaces.length === 0) {
    return (
      <section className="bg-[var(--color-creamParchment)] w-full max-w-3xl mt-[13%] mx-auto rounded-2xl flex items-center justify-center p-6 shadow-lg h-4/12">
        <EmptyState
          icon={
            <FaStore className="text-5xl text-[var(--color-goldFoiling)] mb-4" />
          }
          title="Welcome to Your Marketplace Hub"
          subtitle="You haven't created any marketplaces yet. Let’s fix that and get you started."
        >
          <NavLink
            to={'/merchant/create'}
            className="mt-4 px-6 py-2 bg-[var(--color-goldFoiling)] text-white font-semibold rounded-full hover:bg-opacity-90 transition-all duration-200"
          >
            Create Your First Marketplace
          </NavLink>
        </EmptyState>
      </section>
    );
  }

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-10">
      <motion.h2
        className="text-3xl font-semibold text-[var(--color-richNavy)] mb-10 font-poppins tracking-tight text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Your Marketplaces
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {marketplaces.slice(0, 5).map((marketplace) => {
          const createdAt = new Date(marketplace.createdAt);
          const isClosed = marketplace.status === 'Closed';
          const canReopen =
            isClosed &&
            (!marketplace.openDate ||
              new Date(marketplace.openDate) > new Date());
          const isPast =
            isClosed &&
            marketplace.openDate &&
            marketplace.closeDate &&
            new Date(marketplace.openDate) < new Date() &&
            new Date(marketplace.closeDate) < new Date();

          return (
            <div
              key={marketplace.id}
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
        })}

        {/* View All Card */}
        {marketplaces.length >= 5 && (
          <NavLink
            to="/merchant/all-marketplaces"
            className="flex flex-col items-center justify-center p-6 rounded-2xl  border-[var(--color-warmSand)] bg-[var(--color-creamParchment)] hover:shadow-2xl transition-all duration-200 group"
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
        )}
      </div>

      {/* Create Button */}
      <div className="flex justify-center">
        <NavLink
          to="/merchant/create"
          className="flex items-center gap-2 px-5 py-3 text-sm font-semibold bg-[var(--color-softPeach)] text-[var(--color-richNavy)] rounded-lg hover:bg-[var(--color-warmSand)] transition-colors"
        >
          <FaPlus />
          Create New Marketplace
        </NavLink>
      </div>
    </section>
  );
}

export default Home;
