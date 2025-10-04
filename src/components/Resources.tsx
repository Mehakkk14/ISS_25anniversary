import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, BookOpen, Video, FileText } from 'lucide-react';

const Resources = () => {
  const resources = [
    {
      icon: BookOpen,
      title: 'Educational Materials',
      description: 'Comprehensive guides and lesson plans for educators and students.',
      link: '#',
    },
    {
      icon: Video,
      title: 'Video Archive',
      description: 'Watch historic moments and daily life aboard the ISS.',
      link: '#',
    },
    {
      icon: FileText,
      title: 'Research Papers',
      description: 'Access scientific publications from ISS experiments.',
      link: '#',
    },
    {
      icon: ExternalLink,
      title: 'Live ISS Tracker',
      description: 'Track the current position of the ISS in real-time.',
      link: '#',
    },
  ];

  return (
    <section id="resources" className="py-24 bg-card/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Resources
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore educational materials, research, and tools to learn more about the ISS.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {resources.map((resource, index) => (
            <Card
              key={index}
              className="bg-card border-border p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <resource.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {resource.description}
                  </p>
                  <Button variant="outline" size="sm" className="group">
                    Learn More
                    <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;
