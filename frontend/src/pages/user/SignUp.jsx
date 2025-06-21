import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  BookOpen,
  User,
  AlignCenter,
  CheckCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/authContext';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05,
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const successVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
      delay: 0.1
    }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [status, setStatus] = useState('idle');
  const { login } = useAuth()
  const password = watch('password');

  const onSubmit = async (data) => {
    setStatus('loading');
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/sign-up`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
          credentials: 'include',
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const token = await response.json();
      login(token.accessToken)
      setStatus('success');

      setTimeout(() => {
        navigate('/activity');
      }, 3000);
    } catch (e) {
      console.error(e);
      setStatus('idle');
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
      <AnimatePresence mode="wait">
        {status !== 'success' && (
          <motion.div
            key="form-card"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full max-w-md sm:w-2xl bg-white shadow-md rounded-lg p-6 sm:p-8 relative z-0"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center mb-6"
            >
              <motion.div variants={itemVariants}>
                <BookOpen className="mx-auto text-[#8B5E3C] w-9 h-9 sm:w-12 sm:h-12 mb-3" />
              </motion.div>
              <motion.h1 
                variants={itemVariants}
                className="font-serif text-xl sm:text-2xl text-gray-900 mb-3 leading-tight"
              >
                Begin Your Journey at <br />
                <span className="text-[#8B5E3C]">The Book Bazaar</span>
              </motion.h1>
              <motion.div 
                variants={itemVariants}
                className="w-14 sm:w-16 h-1 bg-lightBlue mx-auto mt-2 rounded-full"
              ></motion.div>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 font-body"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Name */}
              <motion.div variants={itemVariants} className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mutedSlate w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full pl-10 sm:pl-12 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-softTaupe bg-white shadow-sm focus:ring-2 focus:ring-lightBlue/50 focus:border-lightBlue outline-none transition-all"
                  {...register('name', {
                    required: 'Name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters',
                    },
                  })}
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-red-600 mt-1 overflow-hidden"
                    >
                      {errors.name.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Username */}
              <motion.div variants={itemVariants} className="relative">
                <AlignCenter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mutedSlate w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Your Username"
                  className="w-full pl-10 sm:pl-12 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-softTaupe bg-white shadow-sm focus:ring-2 focus:ring-lightBlue/50 focus:border-lightBlue outline-none transition-all"
                  {...register('username', {
                    required: 'Username is required',
                  })}
                />
                <AnimatePresence>
                  {errors.username && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-red-600 mt-1 overflow-hidden"
                    >
                      {errors.username.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVariants} className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mutedSlate w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full pl-10 sm:pl-12 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-softTaupe bg-white shadow-sm focus:ring-2 focus:ring-lightBlue/50 focus:border-lightBlue outline-none transition-all"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-red-600 mt-1 overflow-hidden"
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
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-mutedSlate hover:text-lightBlue transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-red-600 mt-1 overflow-hidden"
                    >
                      {errors.password.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Confirm Password */}
              <motion.div variants={itemVariants} className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mutedSlate w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2 text-xs sm:text-sm rounded-lg border border-softTaupe bg-white shadow-sm focus:ring-2 focus:ring-lightBlue/50 focus:border-lightBlue outline-none transition-all"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value === password || 'Passwords do not match',
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-mutedSlate hover:text-lightBlue transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
                <AnimatePresence>
                  {errors.confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-red-600 mt-1 overflow-hidden"
                    >
                      {errors.confirmPassword.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Submit */}
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled={isSubmitting || status === 'loading'}
                className="w-full bg-gradient-to-r from-[#8B5E3C] to-[#B38B6D] hover:from-[#8B5E3C]/90 hover:to-[#B38B6D]/90 text-white font-medium py-2 text-xs sm:text-sm rounded-lg shadow-subtle hover:shadow-subtle-lg transition-all"
                type="submit"
              >
                {isSubmitting || status === 'loading' ? (
                  <div className="flex justify-center items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Creating account...</span>
                  </div>
                ) : (
                  'Join The Bazaar'
                )}
              </motion.button>
            </motion.form>

            <motion.p 
              variants={itemVariants}
              className="text-center text-mutedSlate mt-5 text-xs sm:text-sm font-body"
            >
              Already part of our story?{' '}
              <a
                href="/sign-in"
                className="text-lightBlue hover:text-richNavy underline hover:no-underline transition-colors"
              >
                Sign in here
              </a>
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            key="success-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center bg-creamParchment p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center"
              variants={successVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-[#8B5E3C]" />
              </motion.div>
              <h3 className="text-2xl font-serif mb-2 text-[#8B5E3C]">
                Welcome to The Book Bazaar!
              </h3>
              <div className="font-poppins">
                <p className="text-gray-600 mb-2">
                  Your account has been created successfully.
                </p>
                <p className="text-sm text-gray-500">
                  Redirecting you shortly...
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

export default SignUpPage;