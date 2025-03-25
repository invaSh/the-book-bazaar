"use client"
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const LottieOne = () => {
  const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

  const animationData = useMemo(() => {
    try {
      return require('./raw/book-animation-1.json');
    } catch (error) {
      console.error('Error loading Lottie animation:', error);
      return null;
    }
  }, []);

  if (!animationData) {
    return <div className="bg-pastelBlue p-8 border-comic border-darkOutline shadow-comic">
      <p className={`font-comic-body text-darkOutline`}>Loading animation...</p>
    </div>;
  }

  return (
    <div className="w-full h-full">
      <Lottie 
        animationData={animationData} 
        loop={true}
        autoplay={true}
      />
    </div>
  );
};

export default LottieOne;