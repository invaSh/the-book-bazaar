import { toast, Toaster } from 'react-hot-toast';
import { FiCheck, FiAlertTriangle, FiX, FiLoader } from 'react-icons/fi';

const toastStyles = {
  success: {
    icon: <FiCheck className="text-emerald-500" />,
    bg: 'bg-white',
    border: 'border-emerald-200',
    accent: 'bg-emerald-500',
    text: 'text-gray-800',
  },
  error: {
    icon: <FiAlertTriangle className="text-rose-500" />,
    bg: 'bg-white',
    border: 'border-rose-200',
    accent: 'bg-rose-500',
    text: 'text-gray-800',
  },
  loading: {
    icon: <FiLoader className="animate-spin text-blue-500" />,
    bg: 'bg-white',
    border: 'border-blue-200',
    accent: 'bg-blue-500',
    text: 'text-gray-800',
  },
};

const AdminToast = ({ t, message, type = 'info' }) => {
  const style = toastStyles[type] || toastStyles.info;

  return (
    <div
      className={`${t.visible ? 'animate-fade-in' : 'animate-fade-out'}
      max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto
      border-l-4 ${style.border} overflow-hidden`}
    >
      <div className="flex items-start p-4">
        <div className={`flex-shrink-0 h-5 w-5 mt-0.5 ${style.text}`}>
          {style.icon}
        </div>
        <div className="ml-3 flex-1">
          <p className={`text-sm ${style.text}`}>{message}</p>
        </div>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-500 transition-colors"
        >
          <FiX className="h-4 w-4" />
        </button>
      </div>
      <div className={`h-1 w-full ${style.accent} opacity-80`}></div>
    </div>
  );
};

export const AdminKitToaster = () => (
  <Toaster
    position="top-center"
    toastOptions={{
      duration: 3000,
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
      top: '1.5rem',
      left: 0,
      right: 0,
      margin: '0 auto',
      maxWidth: 'calc(100% - 2rem)',
    }}
  >
    {(t) => <AdminToast t={t} message={t.message} type={t.type} />}
  </Toaster>
);
