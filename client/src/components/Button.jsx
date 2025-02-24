import React from 'react';

function Button({name}) {
  return (
    <button
      type="submit"
       className="flex w-full justify-center rounded-md bg-gradient-to-r from-amber-600 to-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-amber-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 transition-all duration-300 cursor-pointer"
    >
      {name}
    </button>
  );
}

export default Button;
