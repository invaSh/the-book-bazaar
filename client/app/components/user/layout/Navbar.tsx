"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Home, 
  BookOpen, 
  LayoutGrid, 
  Info, 
  Mail, 
  Menu, 
  X,
  LogIn
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 mx-auto z-50 transition-all duration-300 ${scrolled ? 'bg-deepBlue shadow-lg' : 'bg-deepBlue/95 backdrop-blur-sm'} md:mt-4 md:max-w-[95%] lg:max-w-[92%] xl:max-w-[85%] 2xl:max-w-[75%] 3xl:max-w-fit md:rounded-full`}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 lg:h-24 xl:h-28">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center group">
              <span className="text-2xl md:text-2xl lg:text-3xl font-bold text-lightBeige transition-colors duration-300">
                <span className="italic font-light tracking-tight">The</span>
                <span className="font-bold tracking-wider ml-1 text-transparent bg-clip-text bg-gradient-to-r from-lightBeige to-softOrange">
                  Book
                </span>
                <span className="font-extrabold tracking-wider ml-1 text-transparent bg-clip-text bg-gradient-to-r from-softOrange to-vibrantOrange">
                  Bazaar
                </span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center">
            <div className="ml-4 lg:ml-6 xl:ml-10 flex items-center space-x-2 lg:space-x-3 xl:space-x-4 2xl:space-x-6">
              <Link 
                href="/" 
                className="relative text-lightBeige hover:text-softOrange px-2 py-2 lg:px-2 xl:px-3 text-sm lg:text-sm xl:text-base font-medium transition-all duration-300 group"
              >
                <span className="relative z-10 flex items-center">
                  <Home className="w-4 h-4 lg:w-5 lg:h-5 mr-1 lg:mr-1 xl:mr-2 text-lightBlue group-hover:text-vibrantOrange transition-colors" />
                  <span className="hidden xl:inline">Home</span>
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-lightBlue to-vibrantOrange opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
              
              <Link 
                href="/books" 
                className="relative text-lightBeige hover:text-softOrange px-2 py-2 lg:px-2 xl:px-3 text-sm lg:text-sm xl:text-base font-medium transition-all duration-300 group"
              >
                <span className="relative z-10 flex items-center">
                  <BookOpen className="w-4 h-4 lg:w-5 lg:h-5 mr-1 lg:mr-1 xl:mr-2 text-lightBlue group-hover:text-vibrantOrange transition-colors" />
                  <span className="hidden xl:inline">Books</span>
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-lightBlue to-vibrantOrange opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
              
              <Link 
                href="/categories" 
                className="relative text-lightBeige hover:text-softOrange px-2 py-2 lg:px-2 xl:px-3 text-sm lg:text-sm xl:text-base font-medium transition-all duration-300 group"
              >
                <span className="relative z-10 flex items-center">
                  <LayoutGrid className="w-4 h-4 lg:w-5 lg:h-5 mr-1 lg:mr-1 xl:mr-2 text-lightBlue group-hover:text-vibrantOrange transition-colors" />
                  <span className="hidden xl:inline">Categories</span>
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-lightBlue to-vibrantOrange opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
              
              <Link 
                href="/about" 
                className="relative text-lightBeige hover:text-softOrange px-2 py-2 lg:px-2 xl:px-3 text-sm lg:text-sm xl:text-base font-medium transition-all duration-300 group"
              >
                <span className="relative z-10 flex items-center">
                  <Info className="w-4 h-4 lg:w-5 lg:h-5 mr-1 lg:mr-1 xl:mr-2 text-lightBlue group-hover:text-vibrantOrange transition-colors" />
                  <span className="hidden xl:inline">About</span>
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-lightBlue to-vibrantOrange opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
              
              <Link 
                href="/contact" 
                className="relative text-lightBeige hover:text-softOrange px-2 py-2 lg:px-2 xl:px-3 text-sm lg:text-sm xl:text-base font-medium transition-all duration-300 group"
              >
                <span className="relative z-10 flex items-center">
                  <Mail className="w-4 h-4 lg:w-5 lg:h-5 mr-1 lg:mr-1 xl:mr-2 text-lightBlue group-hover:text-vibrantOrange transition-colors" />
                  <span className="hidden xl:inline">Contact</span>
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-lightBlue to-vibrantOrange opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>

              <Link
                href="/sign-in"
                className={`flex items-center bg-softOrange px-2 py-1 lg:px-3 lg:py-1.5 xl:px-4 xl:py-2 rounded-md text-sm lg:text-sm xl:text-base font-medium border-2 border-vibrantOrange/50 shadow-md hover:shadow-lg transition-all hover:bg-vibrantOrange hover:scale-105`}
              >
                <LogIn className="w-4 h-4 lg:w-5 lg:h-5 mr-1" />
                <span className="hidden xl:inline">Sign in</span>
              </Link>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-vibrantOrange hover:text-lightBeige focus:outline-none transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <Menu className="block h-6 w-6" />
              ) : (
                <X className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-deepBlue">
          <Link 
            href="/" 
            className="flex items-center px-3 py-3 rounded-md text-base font-medium text-lightBeige hover:bg-lightBlue/10 transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            <Home className="w-5 h-5 mr-2 text-lightBlue" />
            Home
          </Link>
          
          <Link 
            href="/books" 
            className="flex items-center px-3 py-3 rounded-md text-base font-medium text-lightBeige hover:bg-lightBlue/10 transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            <BookOpen className="w-5 h-5 mr-2 text-lightBlue" />
            Books
          </Link>
          
          <Link 
            href="/categories" 
            className="flex items-center px-3 py-3 rounded-md text-base font-medium text-lightBeige hover:bg-lightBlue/10 transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            <LayoutGrid className="w-5 h-5 mr-2 text-lightBlue" />
            Categories
          </Link>
          
          <Link 
            href="/about" 
            className="flex items-center px-3 py-3 rounded-md text-base font-medium text-lightBeige hover:bg-lightBlue/10 transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            <Info className="w-5 h-5 mr-2 text-lightBlue" />
            About
          </Link>
          
          <Link 
            href="/contact" 
            className="flex items-center px-3 py-3 rounded-md text-base font-medium text-lightBeige hover:bg-lightBlue/10 transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            <Mail className="w-5 h-5 mr-2 text-lightBlue" />
            Contact
          </Link>
          
          <Link
            href="/sign-in"
            className="w-full flex items-center justify-center mt-2 bg-vibrantOrange hover:bg-softOrange text-white px-4 py-2 rounded-md text-base font-medium transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <LogIn className="w-5 h-5 mr-1" />
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;