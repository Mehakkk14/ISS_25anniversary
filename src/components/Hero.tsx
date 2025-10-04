import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import heroImage from '@/assets/iss-hero.jpg';
import Globe from './Globe';

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="International Space Station in orbit"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center pt-20">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 animate-fade-in">
          ISS: 25 Years of Discovery
        </h1>
        
        {/* Globe container below title */}
        <Globe />
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in-delay">
          Experience the breathtaking views from the ISS Cupola, feel the wonder of weightlessness, 
          and discover how 25 years of space research benefits life on Earth.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button
            onClick={() => scrollToSection('cupola')}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Experience the Cupola
          </Button>
          <Button
            onClick={() => scrollToSection('weightlessness')}
            size="lg"
            variant="outline"
            className="font-semibold px-8 py-6 text-lg hover:bg-primary/10 transition-all"
          >
            Feel Weightlessness
          </Button>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
