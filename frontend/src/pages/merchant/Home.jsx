import React, { useEffect, useState } from 'react';
import { getMarketplaces } from '../../actions/marketplaceActions';
import { ErrorState, EmptyState, LoadingState } from '../../components/States';
import { FaSpinner, FaStore } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';

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

  console.log(marketplaces);

  if (loading) {
    return (
      <section className="bg-[var(--color-warmSand)]/30 w-full h-full rounded-2xl flex items-center justify-center">
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

  if (marketplaces.length == 0) {
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
    <section className=" w-full h-full rounded-2xl p-6 space-y-6">
      <motion.h2
        className="text-2xl font-bold text-gray-800 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        👋 Welcome Back! Here are your Marketplaces
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <AnimatePresence>
          {marketplaces.map((marketplace) => (
            <motion.div
              key={marketplace.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {marketplace.name}
              </h3>
              <p className="text-sm text-gray-500">
                {marketplace.description || 'No description available.'}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Home;
