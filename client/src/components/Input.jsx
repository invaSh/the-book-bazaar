import React from 'react';

function Input({ type, name, placeholder }) {
  return (
    <input
      type={type}
      name={name}
      id={name}
      required
      className="block w-full rounded-md h-10 border-gray-300 shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 px-3 sm:text-sm transition-all duration-300 focus:outline-none bg-gray-50/50"
      placeholder={placeholder}
    />
  );
}

export default Input;
