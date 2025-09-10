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
import MarketplaceCard, { ViewAllCard } from '../../components/marketplaces/Card';

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
        {marketplaces.slice(0, 5).map((marketplace) => (
          <MarketplaceCard key={marketplace.id} marketplace={marketplace} />
        ))}

        {/* View All Card */}
        {marketplaces.length >= 5 && <ViewAllCard />}
      </div>

      {/* Create Button */}
      <div className="flex justify-center">
        <NavLink
          to="/merchant/create"
          className="flex items-center gap-2 px-5 py-3 text-sm font-medium bg-[var(--color-softPeach)] text-[var(--color-richNavy)] rounded-lg hover:bg-[var(--color-warmSand)] transition-colors"
        >
          <FaPlus />
          Create New Marketplace
        </NavLink>
      </div>
    </section>
  );
}

export default Home;
