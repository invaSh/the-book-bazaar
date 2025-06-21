import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Store, BookOpen } from 'lucide-react';
import { useAuth } from '../../contexts/authContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const Activity = () => {
  const navigate = useNavigate();
  const { user } = useAuth()
  const handleSelection = (activity) => {
    console.log(`Selected activity: ${activity}`);
    // You can navigate to different routes based on selection
    // For example: navigate(activity === 'buyer' ? '/buyer-dashboard' : '/merchant-dashboard');
    navigate('/'); 
  };

  console.log(user);
  
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={containerVariants}
      className="min-h-screen flex flex-col items-center justify-center bg-creamParchment p-6"
    >
        <motion.div
          variants={itemVariants}
          className="text-center mb-12"
        >
          <BookOpen className="mx-auto text-[#8B5E3C] w-16 h-16 mb-4" />
          <h1 className="font-serif text-4xl text-gray-900 mb-2">
            Welcome to <span className="text-[#8B5E3C]">The Book Bazaar</span>!
          </h1>
          <p className="text-mutedSlate text-lg">
            Select your activity
          </p>
          <div className="w-24 h-1 bg-lightBlue mx-auto mt-4 rounded-full"></div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-10 w-full max-w-2xl"
        >
          {/* Buyer Box */}
          <motion.div
            onClick={() => handleSelection('buyer')}
            whileHover={{ scale: 1.05, y: -5, boxShadow: '0px 20px 40px -15px rgba(0, 0, 0, 0.15)' }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 p-10 shadow-lg rounded-xl text-center cursor-pointer bg-white/80 backdrop-blur-sm transition-all duration-300"
          >
            <User className="mx-auto text-lightBlue w-16 h-16 mb-4" />
            <h2 className="font-serif text-3xl text-gray-800">Buyer</h2>
            <p className="text-mutedSlate text-base mt-2">Explore and purchase books.</p>
          </motion.div>

          {/* Merchant Box */}
          <motion.div
            onClick={() => handleSelection('merchant')}
            whileHover={{ scale: 1.05, y: -5, boxShadow: '0px 20px 40px -15px rgba(0, 0, 0, 0.15)' }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 p-10 shadow-lg rounded-xl text-center cursor-pointer bg-white/80 backdrop-blur-sm transition-all duration-300"
          >
            <Store className="mx-auto text-lightBlue w-16 h-16 mb-4" />
            <h2 className="font-serif text-3xl text-gray-800">Merchant</h2>
            <p className="text-mutedSlate text-base mt-2">Sell your books and manage your store.</p>
          </motion.div>
        </motion.div>
    </motion.section>
  );
};

export default Activity;
