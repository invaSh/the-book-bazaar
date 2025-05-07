import { FiLogOut, FiX, FiAlertTriangle } from 'react-icons/fi';
import { useAuth } from '../../contexts/authContext';

const SignOutConfirmation = ({ 
  onConfirm,
  onCancel,
  title = "Sign out",
  message = "Are you sure you want to sign out? Any unsaved changes may be lost.",
  confirmText = "Sign out",
  cancelText = "Cancel"
}) => {
  const { logout } = useAuth();

  const handleConfirm = () => {
    logout();
    onConfirm?.();
  };

  return (
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
      <div className="p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
            <FiAlertTriangle className="h-5 w-5 text-red-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <p className="mt-2 text-sm text-gray-500">
              {message}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-4 flex flex-row-reverse gap-3">
        <button
          onClick={handleConfirm}
          className="inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
        >
          <FiLogOut className="mr-2 h-4 w-4" />
          {confirmText}
        </button>
        <button
          onClick={onCancel}
          className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
        >
          <FiX className="mr-2 h-4 w-4" />
          {cancelText}
        </button>
      </div>
    </div>
  );
};

export default SignOutConfirmation;