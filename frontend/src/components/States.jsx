import React from 'react';
import { FaExclamationCircle, FaSearch, FaSpinner } from 'react-icons/fa';

export function LoadingState({ icon = <FaSpinner />, title = "Loading..." }) {
  return (
    <div className="loading-state">
      <div className="animate-spin text-2xl mb-2" style={{ animation: "spin 1s linear infinite" }}>
        {icon}
      </div>
      <p className="text-sm text-gray-600">{title}</p>
      
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export function ErrorState({ title = "Error", error = "Something went wrong" }) {
  return (
    <div className="error-state inline-flex flex-col items-center p-4 rounded-md bg-red-100">
      <div className="flex items-center text-red-600 mb-2">
        <FaExclamationCircle className="mr-2" />
        <span className="font-medium">{title}</span>
      </div>
      <p className="text-sm text-red-600">{error}</p>
    </div>
  );
}

export function EmptyState({ 
  icon = <FaSearch />, 
  title = "No results found", 
  subtitle = "Try adjusting your search or filter" , children
}) {
  return (
    <div className="empty-state flex flex-col items-center">
      <div className="text-gray-400 text-3xl mb-3">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-700 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 text-center">{subtitle}</p>
      {children}
    </div>
  );
}