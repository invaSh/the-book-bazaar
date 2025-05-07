import { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../contexts/authContext';
import Modal from '../../components/Modal';
export function SignOutDialog({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  const { logout } = useAuth()

  const handleConfirm = () => {
    logout();
    onConfirm?.();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="bg-creamParchment p-6 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <AlertTriangle className="w-6 h-6 text-deepBurgundy mr-3" />
            <h3 className="text-xl font-serif text-richNavy">Sign Out</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-softTaupe hover:text-richNavy transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-richNavy/90 mb-6">
          Are you sure you want to sign out of The Book Bazaar? You'll need to sign in again to access your wishlist and saved preferences.
        </p>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-richNavy hover:text-[#8B5E3C] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-[#8B5E3C] to-[#B38B6D] text-creamParchment rounded-md shadow-subtle hover:shadow-subtle-lg transition-all"
          >
            Sign Out
          </button>
        </div>
      </div>
    </Modal>
  );
}