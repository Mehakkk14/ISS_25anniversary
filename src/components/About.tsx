import { Card } from '@/components/ui/card';
import { Atom, Globe, Users } from 'lucide-react';

const About = () => {
  const benefits = [
    {
      icon: Atom,
      title: 'Scientific Research',
      description: 'A unique microgravity lab for advancements in medicine, materials, and our understanding of the universe.',
    },
    {
      icon: Globe,
      title: 'Technological Development',
      description: 'Driving innovations from life support systems to robotics, with applications benefiting life on Earth.',
    },
    {
      icon: Users,
      title: 'International Collaboration',
      description: 'A testament to global cooperation, uniting nations to achieve common goals in space exploration.',
    },
  ];

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Benefits to Earth
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The ISS is more than a station; it's a beacon of progress.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="bg-card border-border p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <benefit.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
