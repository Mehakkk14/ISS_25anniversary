import { useState, useEffect } from 'react';
import { Rocket } from 'lucide-react';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/95 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">ISS 25th Anniversary</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {[
              { id: 'cupola', label: 'Cupola' },
              { id: 'weightlessness', label: 'Weightlessness' },
              { id: 'earth-benefits', label: 'Earth Benefits' },
              { id: 'research-laboratory', label: 'Research' },
              { id: 'eva-systems', label: 'EVA Systems' },
              { id: 'iss-tracker', label: 'Live Tracker' },
              { id: 'mission-control', label: 'Mission Control' },
              { id: 'timeline', label: 'Timeline' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
