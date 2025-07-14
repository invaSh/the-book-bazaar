import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { Mail, Lock, Eye, EyeOff, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

// Optimized animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05, // Reduced stagger time
      duration: 0.4, // Slightly faster
      ease: "easeOut"
    }
  }
};

const itemVariants = {
  hidden: { y: 10, opacity: 0 }, // Reduced initial y movement
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4, // Faster duration
      ease: [0.16, 1, 0.3, 1] // More performant easing
    }
  }
};

const imageVariants = {
  hidden: { x: '30%', opacity: 0 }, // Reduced initial x movement
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6, // Faster duration
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/sign-in`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      login(result.accessToken);
      toast.success('Successfully logged in!');
      navigate('/');
    } catch (e) {
      console.error(e);
      toast.error('Login failed!');
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen flex items-center justify-center bg-creamParchment p-4 sm:p-8 overflow-hidden"
    >
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-lg lg:max-w-4xl bg-white shadow-md rounded-lg overflow-hidden flex flex-col lg:flex-row"
      >
        {/* Form Section */}
        <motion.div 
          variants={containerVariants}
          className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col justify-center"
        >
          <motion.div 
            variants={itemVariants}
            className="text-center mb-6"
          >
            <BookOpen className="mx-auto text-[#8B5E3C] w-9 h-9 sm:w-12 sm:h-12 mb-3" />
            <h1 className="font-serif text-xl sm:text-2xl text-gray-900 mb-3 leading-tight">
              Welcome Back to <br />
              <span className="text-[#8B5E3C]">The Book Bazaar</span>
            </h1>
            <div className="w-14 sm:w-16 h-1 bg-lightBlue mx-auto mt-2 rounded-full"></div>
          </motion.div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 font-body"
          >
            {/* Email */}
            <motion.div variants={itemVariants} className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mutedSlate w-4 h-4 sm:w-5 sm:h-5" />
              <input
                // type="email"
                placeholder="Your Email"
                className="w-full pl-10 sm:pl-12 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-softTaupe bg-white shadow-sm focus:ring-2 focus:ring-lightBlue/50 focus:border-lightBlue outline-none transition-all"
                {...register('identifier')}
              />
              <AnimatePresence>
                {errors.email && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs sm:text-sm text-red-600 mt-1 overflow-hidden"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants} className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mutedSlate w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Your Password"
                className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2 text-xs sm:text-sm rounded-lg border border-softTaupe bg-white shadow-sm focus:ring-2 focus:ring-lightBlue/50 focus:border-lightBlue outline-none transition-all"
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-mutedSlate hover:text-lightBlue transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
              <AnimatePresence>
                {errors.password && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs sm:text-sm text-red-600 mt-1 overflow-hidden"
                  >
                    {errors.password.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Submit */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.01 }} // Reduced hover scale
              whileTap={{ scale: 0.99 }} // Reduced tap scale
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#8B5E3C] to-[#B38B6D] hover:from-[#8B5E3C]/90 hover:to-[#B38B6D]/90 text-white font-medium py-2 text-xs sm:text-sm rounded-lg shadow-subtle hover:shadow-subtle-lg transition-all"
              type="submit"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </motion.button>
          </form>

          <motion.p 
            variants={itemVariants} 
            className="text-center text-mutedSlate mt-5 text-xs sm:text-sm font-body"
          >
            New here?{' '}
            <a
              href="/sign-up"
              className="text-lightBlue hover:text-richNavy underline hover:no-underline transition-colors"
            >
              Create an account
            </a>
          </motion.p>
        </motion.div>

        {/* Image Section */}
        <motion.div 
          variants={imageVariants}
          className="hidden lg:block lg:w-1/2 relative min-h-[40vh] lg:min-h-[70vh] overflow-hidden"
        >
          <img
            src="https://img.freepik.com/free-photo/stack-books-with-hardcovers_23-2147846040.jpg"
            alt="Stacked books"
            className="object-cover w-full h-full"
            loading="lazy" // Add lazy loading
          />
          <div className="absolute inset-0 bg-gradient-to-t from-richNavy/30 to-transparent"></div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default SignInPage;