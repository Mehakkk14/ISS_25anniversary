import { Rocket } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">ISS 25th Anniversary</span>
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            Celebrating 25 years of groundbreaking research and international collaboration in space.
          </p>
          <p className="text-muted-foreground text-xs">
            © 2023 ISS 25th Anniversary. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
