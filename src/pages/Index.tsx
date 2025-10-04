import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Timeline from '@/components/Timeline';
import Gallery from '@/components/Gallery';
import Resources from '@/components/Resources';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <Timeline />
      <Gallery />
      <Resources />
      <Footer />
    </div>
  );
};

export default Index;
