import LottieOne from '../lottie/LottieOne';

export default function HeroSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 space-y-8 mb-12 md:mb-0">
          <h1 className="font-comic-heading text-5xl md:text-6xl lg:text-8xl md:text-left text-deepBlue leading-tight text-center">
            WELCOME TO
            <br />
            <span className="text-vibrantOrange">THE BOOK BAZAAR</span>!
          </h1>
          <p className="text-lg md:text-xl text-darkGray">
            Dive into a world of stories! Discover rare finds, bestsellers, and
            timeless classics. Your literary journey begins here, where every
            page holds a new adventure.
          </p>
          <div className="flex flex-col lg:flex-row gap-4 font-comic-heading">
            <button className="bg-softOrange text-darkGray text-2xl px-6 sm:px-8 py-3 rounded-full border-2 border-darkGray shadow-comic hover:shadow-comic-lg transform hover:-translate-y-1 transition-all">
              BROWSE BOOKS
            </button>
            <button className="bg-lightBlue text-darkGray text-2xl px-6 sm:px-8 py-3 rounded-full border-2 border-darkGray shadow-comic hover:shadow-comic-lg transform hover:-translate-y-1 transition-all">
              EXPLORE COLLECTIONS
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 h-full flex items-center justify-center">
          <div className="w-full max-w-xs sm:max-w-md lg:max-w-2xl hidden md:block">
            <LottieOne />
          </div>
        </div>
      </div>
    </section>
  );
}
