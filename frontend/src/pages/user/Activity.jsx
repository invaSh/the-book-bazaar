import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Store,
  BookOpen,
  CheckCircle,
  Search,
  Heart,
  ShoppingCart,
  PlusCircle,
  Settings,
  BarChart2,
  DollarSign,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../../contexts/authContext';
import { toast } from 'react-hot-toast';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const Activity = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success'
console.log(accessToken);

  const handleSelection = async (activity) => {
    setSelectedActivity(activity);
    setStatus('loading');

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/select-activity/${activity}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json();
      setStatus('success');
    } catch (e) {
      console.error(e);
      setStatus('idle');
      toast.error('Failed to select activity!');
    }
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={containerVariants}
      className="min-h-screen flex flex-col items-center justify-center bg-creamParchment p-6"
    >
      <AnimatePresence mode="wait">
        {status !== 'success' ? (
          <>
            <motion.div variants={itemVariants} className="text-center mb-12">
              <BookOpen className="mx-auto text-[#8B5E3C] w-16 h-16 mb-4" />
              <h1 className="font-serif text-4xl text-gray-900 mb-2">
                Welcome to{' '}
                <span className="text-[#8B5E3C]">The Book Bazaar</span>!
              </h1>
              <p className="text-mutedSlate text-lg">Select your activity</p>
              <div className="w-24 h-1 bg-lightBlue mx-auto mt-4 rounded-full"></div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-10 w-full max-w-2xl"
            >
              {/* Buyer Box */}
              <motion.div
                onClick={() => handleSelection(5)}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: '0px 20px 40px -15px rgba(0, 0, 0, 0.15)',
                }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 p-10 shadow-lg rounded-xl text-center cursor-pointer bg-white/80 backdrop-blur-sm transition-all duration-300"
              >
                <User className="mx-auto text-lightBlue w-16 h-16 mb-4" />
                <h2 className="font-serif text-3xl text-gray-800">Buyer</h2>
                <p className="text-mutedSlate text-base mt-2">
                  Explore and purchase books.
                </p>
              </motion.div>

              {/* Merchant Box */}
              <motion.div
                onClick={() => handleSelection(4)}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: '0px 20px 40px -15px rgba(0, 0, 0, 0.15)',
                }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 p-10 shadow-lg rounded-xl text-center cursor-pointer bg-white/80 backdrop-blur-sm transition-all duration-300"
              >
                <Store className="mx-auto text-lightBlue w-16 h-16 mb-4" />
                <h2 className="font-serif text-3xl text-gray-800">Merchant</h2>
                <p className="text-mutedSlate text-base mt-2">
                  Sell your books and manage your store.
                </p>
              </motion.div>
            </motion.div>
          </>
        ) : (
          <motion.div
            key="welcome-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-4xl"
          >
            {selectedActivity === 5 ? (
              // Buyer Welcome Screen
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="text-center p-6 sm:p-8 bg-white rounded-xl shadow-lg"
              >
                <motion.div variants={itemVariants}>
                  <BookOpen className="mx-auto text-[#8B5E3C] w-16 h-16 mb-6" />
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className="font-serif text-3xl text-gray-900 mb-4"
                >
                  Welcome, Book Explorer!
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-mutedSlate text-lg mb-8"
                >
                  Discover hidden literary gems in our vast bazaar of stories.
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="w-24 h-1 bg-lightBlue mx-auto mb-8 rounded-full"
                ></motion.div>

                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
                >
                  {[
                    {
                      icon: <Search className="w-8 h-8 mx-auto" />,
                      text: 'Browse thousands of titles',
                    },
                    {
                      icon: <Heart className="w-8 h-8 mx-auto" />,
                      text: 'Save your favorites',
                    },
                    {
                      icon: <ShoppingCart className="w-8 h-8 mx-auto" />,
                      text: 'Easy checkout',
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -5 }}
                      className="p-4 bg-white rounded-lg shadow-sm border border-softTaupe/20"
                    >
                      <div className="text-lightBlue mb-3">{item.icon}</div>
                      <p className="text-sm text-gray-600">{item.text}</p>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex justify-center gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 bg-gradient-to-r from-[#8B5E3C] to-[#B38B6D] text-white px-6 py-3 rounded-lg shadow-md"
                  >
                    Start Browsing <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              </motion.div>
            ) : (
              // Merchant Welcome Screen
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="text-center p-6 sm:p-8 bg-white rounded-xl shadow-lg max-w-2xl mx-auto"
              >
                <motion.div variants={itemVariants}>
                  <Store className="mx-auto text-[#8B5E3C] w-16 h-16 mb-6" />
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className="font-serif text-3xl text-gray-900 mb-4"
                >
                  Welcome to Your Bookstore Dashboard
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-mutedSlate text-lg mb-8"
                >
                  Set up your virtual bookstore and start sharing stories with
                  readers worldwide.
                </motion.p>
                <motion.div
                  variants={itemVariants}
                  className="flex justify-center gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/merchant')}
                  >
                    <NavLink
                    to={'/merchant'}
                    className="flex items-center gap-2 bg-gradient-to-r from-[#8B5E3C] to-[#B38B6D] text-white px-6 py-3 rounded-lg shadow-md"
                    >
                    Go to Dashboard <ArrowRight className="w-4 h-4" />

                    </NavLink>
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Overlay */}
      <AnimatePresence>
        {status === 'loading' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-4 border-[#8B5E3C] border-t-transparent rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Activity;
