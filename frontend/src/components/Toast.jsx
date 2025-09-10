import { toast, Toaster } from 'react-hot-toast';
import { FiCheck, FiAlertTriangle, FiX, FiLoader } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const toastStyles = {
  success: {
    icon: <FiCheck className="text-[var(--color-goldFoiling)]" />,
    bg: 'bg-[var(--color-goldFoiling)]',
    border: 'border-[var(--color-goldFoiling)]',
    accent: 'bg-[var(--color-goldFoiling)]',
    text: 'text-[var(--color-creamParchment)]',
    shadow: 'shadow-lg shadow-[var(--color-richNavy)]/30',
    iconBg: 'bg-[var(--color-creamParchment)]'
  },
  error: {
    icon: <FiAlertTriangle className="text-[var(--color-deepBurgundy)]" />,
    bg: 'bg-[var(--color-deepBurgundy)]',
    border: 'border-[var(--color-paleRose)]',
    accent: 'bg-[var(--color-paleRose)]',
    text: 'text-[var(--color-creamParchment)]',
    shadow: 'shadow-lg shadow-[var(--color-deepBurgundy)]/30',
    iconBg: 'bg-[var(--color-paleRose)]'
  },
  loading: {
    icon: <FiLoader className="animate-spin text-[var(--color-richNavy)]" />,
    bg: 'bg-[var(--color-richNavy)]/80',
    border: 'border-[var(--color-richNavy)]',
    accent: 'bg-[var(--color-creamParchment)]',
    text: 'text-[var(--color-creamParchment)]',
    shadow: 'shadow-lg shadow-[var(--color-mellowApricot)]/30',
    iconBg: 'bg-[var(--color-creamParchment)]'
  },
};

const AdminToast = ({ t, message, type = 'info' }) => {
  const style = toastStyles[type] || toastStyles.info;

  return (
    <motion.div
      initial={{ opacity: 0, y: -24, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24, scale: 0.9 }}
      transition={{ 
        type: 'spring', 
        damping: 20, 
        stiffness: 350,
        mass: 0.5
      }}
      className={`max-w-md w-full ${style.bg} ${style.shadow} rounded-lg pointer-events-auto
      border-2 ${style.border} overflow-hidden relative font-poppins`}
    >
      <div className="flex items-center p-4">
        <div className={`flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full ${style.iconBg}`}>
          {style.icon}
        </div>
        <div className="ml-3 flex-1">
          <p className={`text-sm font-semibold ${style.text}`}>{message}</p>
        </div>
        <button
          onClick={() => toast.dismiss(t.id)}
          className={`ml-4 flex-shrink-0 ${style.text}/70 hover:${style.text} transition-colors duration-150`}
        >
          <FiX className="h-5 w-5" />
        </button>
      </div>
      <motion.div 
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: t.duration/1000, ease: 'linear' }}
        className={`h-1.5 ${style.accent} absolute bottom-0 left-0 opacity-90`}
      />
    </motion.div>
  );
};

export const AdminKitToaster = () => (
  <Toaster
    position="top-center"
    toastOptions={{
      duration: 5000,
      style: {
        background: 'transparent',
        padding: 0,
        boxShadow: 'none',
        maxWidth: '100%',
      },
      success: { icon: null },
      error: { icon: null },
      loading: { icon: null },
    }}
    containerStyle={{
      top: '2rem',
      left: 0,
      right: 0,
      margin: '0 auto',
      maxWidth: 'calc(100% - 2rem)',
    }}
  >
    {(t) => (
      <AnimatePresence>
        {t.visible && (
          <motion.div
            layout
            transition={{ type: 'spring', damping: 25 }}
            className="my-3"
          >
            <AdminToast t={t} message={t.message} type={t.type} />
          </motion.div>
        )}
      </AnimatePresence>
    )}
  </Toaster>
);

