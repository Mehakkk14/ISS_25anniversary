import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Clock, 
  Target, 
  Waves,
  Zap,
  Award,
  BookOpen,
  ExternalLink
} from 'lucide-react';

const TrainingSection = () => {
  const nblFeatures = [
    {
      icon: Waves,
      title: "Underwater Training",
      description: "The Neutral Buoyancy Laboratory uses a 6.2 million gallon pool to simulate weightlessness",
      stats: "40 feet deep, 200 feet long"
    },
    {
      icon: Clock,
      title: "Extensive Preparation",
      description: "Astronauts train 7 hours underwater for every 1 hour of spacewalk",
      stats: "Hundreds of training hours"
    },
    {
      icon: Target,
      title: "Mission Rehearsal",
      description: "Full-scale mockups of ISS modules allow astronauts to practice exact procedures",
      stats: "1:1 scale accuracy"
    },
    {
      icon: Users,
      title: "Team Training",
      description: "Safety divers and trainers work together to create realistic scenarios",
      stats: "10+ support crew per session"
    }
  ];

  const experiments = [
    {
      category: "Medical Research",
      icon: "🧬",
      examples: [
        "Protein crystal growth for drug development",
        "Muscle and bone density studies",
        "Cardiovascular health research",
        "Cancer treatment advancements"
      ]
    },
    {
      category: "Climate Science",
      icon: "🌍",
      examples: [
        "Earth observation and monitoring",
        "Atmospheric composition studies",
        "Weather pattern analysis",
        "Climate change tracking"
      ]
    },
    {
      category: "Materials Science",
      icon: "⚗️",
      examples: [
        "Metal alloy formation in microgravity",
        "Advanced manufacturing techniques",
        "Fiber optics development",
        "Semiconductor research"
      ]
    }
  ];

  return (
    <section id="training" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Preparing for Space
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover how astronauts train for the unique challenges of living and working 
            in the weightless environment of the ISS.
          </p>
        </div>

        {/* Neutral Buoyancy Laboratory Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              NASA Sonny Carter Training Facility
            </Badge>
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Neutral Buoyancy Laboratory
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The world's largest indoor pool, where astronauts practice spacewalks and 
              experience conditions similar to weightlessness underwater.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {nblFeatures.map((feature, index) => (
              <Card key={index} className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                <Badge variant="outline" className="text-xs">{feature.stats}</Badge>
              </Card>
            ))}
          </div>

          {/* Training Process */}
          <Card className="p-8 bg-card/50 border-border">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Classroom Learning</h4>
                <p className="text-sm text-muted-foreground">
                  Astronauts study procedures, safety protocols, and mission objectives before entering the pool.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Waves className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Underwater Practice</h4>
                <p className="text-sm text-muted-foreground">
                  Hours of training in the NBL pool practicing specific tasks they'll perform in space.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Mission Ready</h4>
                <p className="text-sm text-muted-foreground">
                  After extensive training, astronauts are prepared for the challenges of spacewalks and ISS operations.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Research Categories */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              25 Years of Scientific Breakthroughs
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The ISS has hosted thousands of experiments across multiple scientific disciplines, 
              leading to discoveries that benefit life on Earth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {experiments.map((category, index) => (
              <Card key={index} className="p-6 bg-card border-border">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h4 className="text-xl font-semibold text-foreground">{category.category}</h4>
                </div>
                <ul className="space-y-2">
                  {category.examples.map((example, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      {example}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="p-8 bg-primary/5 border-primary/20 max-w-2xl mx-auto">
            <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-4">
              The Future of Space Research
            </h3>
            <p className="text-muted-foreground mb-6">
              As we celebrate 25 years of the ISS, we look forward to continued discoveries 
              that will shape the future of human space exploration and benefit all life on Earth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Learn More About ISS Research
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Educational Resources
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TrainingSection;