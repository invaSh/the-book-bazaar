import { NavLink } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export const LogoOne = () => {
  return (
    <div className="flex-shrink-0 flex items-center">
      <NavLink to="/" className="flex items-center group">
        <span className="text-2xl md:text-2xl lg:text-3xl font-bold text-creamParchment transition-colors duration-300">
          <span className="italic font-light tracking-tight">The</span>
          <span className="font-bold tracking-wider ml-1 text-transparent bg-clip-text bg-gradient-to-r from-creamParchment to-goldFoiling">
            Book
          </span>
          <span className="font-extrabold tracking-wider ml-1 text-transparent bg-clip-text bg-gradient-to-r from-goldFoiling to-deepBurgundy">
            Bazaar
          </span>
        </span>
      </NavLink>
    </div>
  );
};

export const LogoTwo = () => {
  return (
    <div className="flex flex-col justify-center">
      <NavLink to="/admin" className="flex items-center group">
        <span className="text-xl font-bold text-richNavy transition-colors duration-300">
          <span className="italic font-light text-richNavy/80 tracking-tight">
            The
          </span>
          <span className="font-bold tracking-wider ml-1 text-transparent bg-clip-text bg-gradient-to-r from-richNavy to-mutedSlate">
            Book
          </span>
          <span className="font-extrabold tracking-wider ml-1 text-transparent bg-clip-text bg-gradient-to-r from-mutedSlate to-richNavy/80">
            Bazaar
          </span>
        </span>
      </NavLink>
    </div>
  );
};

export const LogoThree = () => {
  return (
    <div className="flex-shrink-0 flex items-center">
      <NavLink to="/" className="flex items-center group space-x-2">
        <BookOpen className="text-goldFoiling w-6 h-6" />
        <span className="text-xl font-serif font-thin text-[#8B5E3C]">
          The Book Bazaar
        </span>
      </NavLink>
    </div>
  );
};

export const LogoFour = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <NavLink
        to="/"
        className="text-2xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-goldFoiling to-creamParchment"
      >
        TBB
      </NavLink>
    </div>
  );
};
