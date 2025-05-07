import { useState } from 'react';
import {
  FiUser,
  FiSettings,
  FiLogOut,
  FiChevronDown,
  FiActivity,
  FiBookmark,
} from 'react-icons/fi';
import Modal from '../../components/Modal';
import SignOutConfirmation from './SignOutDialog';
export default function UserMenu({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center gap-3 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white">
          {user.avatar ? (
            <img src={user.avatar} alt="User" className="rounded-full" />
          ) : (
            <FiUser size={16} />
          )}
        </div>

        <div className="hidden md:flex flex-col text-left max-w-[160px]">
          <span className="text-sm font-medium text-gray-800 truncate">
            {user.fullName}
          </span>
          <span className="text-xs text-gray-500 truncate">
            {user.username}
          </span>
        </div>

        <FiChevronDown
          className={`hidden sm:inline-block text-gray-500 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50">
          <div className="sm:hidden flex items-center gap-3 px-4 py-3 border-b border-gray-100">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white">
              {user.avatar ? (
                <img src={user.avatar} alt="User" className="rounded-full" />
              ) : (
                <FiUser size={16} />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-800 truncate">
                {user.fullName}
              </span>
              <span className="text-xs text-gray-500 truncate">
                {user.username}
              </span>
            </div>
          </div>

          <div className="py-1">
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <FiActivity className="mr-3 text-gray-400" /> Dashboard
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <FiBookmark className="mr-3 text-gray-400" /> Saved Items
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <FiSettings className="mr-3 text-gray-400" /> Settings
            </a>
          </div>
          <div className="py-1 border-t border-gray-100 w-full">
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <FiLogOut className="mr-3 text-gray-400" /> Sign out
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
          <SignOutConfirmation
            onCancel={() => setModalOpen(false)}
            onConfirm={() => {
              setModalOpen(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
}
