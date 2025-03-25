import Navbar from './components/user/layout/Navbar';
import HeroSection from './components/user/Hero';

export default function Home() {
  return (
    <div className="min-h-screen bg-pastelYellow/50 font-comic-body">
      <main className='bg-lightBeige flex justify-center'>
        <Navbar />
      </main>
      <main className="pt-20 md:pt-28 bg-lightBeige ">
        <HeroSection />
      </main>
    </div>
  );
}
