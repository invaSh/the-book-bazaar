import { LogoOne } from '../../components/Logo';
import NavMenuItems from './NavMenuItems';
import { SearchButton, CartButton, UserButton } from './NavButtons';

export default function Navbar() {
  return (
    <nav className="bg-richNavy shadow-md border-softTaupe/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <LogoOne />
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <NavMenuItems />
            <div className="ml-6 flex items-center space-x-5 border-l border-creamParchment/20 pl-6 h-10">
              <SearchButton />
              <CartButton />
              <UserButton />
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button className="text-richNavy hover:text-[#8B5E3C]">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}