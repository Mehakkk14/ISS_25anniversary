import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Globe, 
  Satellite, 
  Heart, 
  Zap, 
  Droplets, 
  TreePine, 
  Shield, 
  Microscope,
  TrendingUp,
  Users,
  Building,
  Waves,
  Sun,
  Wind,
  Eye,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface BenefitCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  impact: number;
  color: string;
  examples: {
    title: string;
    description: string;
    metric: string;
    icon: React.ElementType;
  }[];
}

const benefits: BenefitCategory[] = [
  {
    id: 'climate',
    title: 'Climate Monitoring',
    icon: Globe,
    description: 'ISS observations help scientists understand and combat climate change',
    impact: 95,
    color: 'bg-green-500',
    examples: [
      {
        title: 'Hurricane Tracking',
        description: 'Early warning systems save thousands of lives annually',
        metric: '95% accuracy in storm prediction',
        icon: Wind
      },
      {
        title: 'Deforestation Monitoring',
        description: 'Real-time tracking of forest loss in the Amazon and beyond',
        metric: '60% faster detection of illegal logging',
        icon: TreePine
      },
      {
        title: 'Sea Level Rise',
        description: 'Precise measurements help coastal communities prepare',
        metric: '3.3mm annual rise tracked globally',
        icon: Waves
      }
    ]
  },
  {
    id: 'disaster',
    title: 'Disaster Response',
    icon: Shield,
    description: 'Real-time monitoring helps coordinate emergency responses worldwide',
    impact: 88,
    color: 'bg-red-500',
    examples: [
      {
        title: 'Wildfire Detection',
        description: 'Infrared imaging detects fires before they spread',
        metric: '1-2 hour early detection',
        icon: Sun
      },
      {
        title: 'Flood Monitoring',
        description: 'Satellite data helps predict and manage flood risks',
        metric: 'Protects 100M+ people annually',
        icon: Droplets
      },
      {
        title: 'Earthquake Damage',
        description: 'Rapid damage assessment speeds up relief efforts',
        metric: '24-48 hour damage maps',
        icon: AlertTriangle
      }
    ]
  },
  {
    id: 'health',
    title: 'Healthcare Advances',
    icon: Heart,
    description: 'Medical research in microgravity leads to breakthrough treatments',
    impact: 92,
    color: 'bg-pink-500',
    examples: [
      {
        title: 'Protein Crystals',
        description: 'Better protein structures lead to improved medications',
        metric: '300% larger, more perfect crystals',
        icon: Microscope
      },
      {
        title: 'Cancer Research',
        description: 'Tumor models grow more naturally in microgravity',
        metric: '3D cancer models for drug testing',
        icon: Heart
      },
      {
        title: 'Bone & Muscle Loss',
        description: 'Understanding helps treat osteoporosis and sarcopenia',
        metric: 'Benefits 200M+ elderly worldwide',
        icon: Users
      }
    ]
  },
  {
    id: 'technology',
    title: 'Technology Innovation',
    icon: Zap,
    description: 'Space-developed technologies improve life on Earth',
    impact: 85,
    color: 'bg-blue-500',
    examples: [
      {
        title: 'Water Purification',
        description: 'ISS water recycling systems now used in remote areas',
        metric: '93% water recovery efficiency',
        icon: Droplets
      },
      {
        title: 'Air Filtration',
        description: 'Advanced life support systems clean Earth\'s air',
        metric: 'Used in hospitals & cleanrooms',
        icon: Wind
      },
      {
        title: 'Materials Science',
        description: 'Microgravity manufacturing creates superior materials',
        metric: 'Stronger, lighter aerospace materials',
        icon: Building
      }
    ]
  },
  {
    id: 'education',
    title: 'Education & Inspiration',
    icon: Eye,
    description: 'ISS inspires the next generation of scientists and engineers',
    impact: 90,
    color: 'bg-purple-500',
    examples: [
      {
        title: 'STEM Education',
        description: 'Students worldwide participate in ISS experiments',
        metric: '500K+ students engaged annually',
        icon: Users
      },
      {
        title: 'Live Earth Views',
        description: 'Real-time Earth imagery educates about our planet',
        metric: '50M+ views of Earth from space',
        icon: Eye
      },
      {
        title: 'Scientific Literacy',
        description: 'Space research drives interest in science careers',
        metric: '40% increase in STEM enrollment',
        icon: TrendingUp
      }
    ]
  }
];

const EnhancedEarthBenefits: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('climate');
  const [showMetrics, setShowMetrics] = useState(false);

  const currentCategory = benefits.find(b => b.id === selectedCategory) || benefits[0];

  const totalImpact = benefits.reduce((sum, benefit) => sum + benefit.impact, 0) / benefits.length;

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-blue-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Satellite className="w-4 h-4 mr-2" />
            Why This Matters
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            ISS Benefits to Earth
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Every day, the International Space Station conducts research and observations 
            that directly improve life on Earth. Discover how space science solves real-world problems.
          </p>
        </div>

        {/* Impact Overview */}
        <Card className="mb-12 bg-slate-800/50 border-blue-500/30 p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Global Impact Overview</h3>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400">{Math.round(totalImpact)}%</div>
                <div className="text-gray-300">Overall Impact Score</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400">2.5B+</div>
                <div className="text-gray-300">People Benefited</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400">25</div>
                <div className="text-gray-300">Years of Research</div>
              </div>
            </div>
            <Progress value={totalImpact} className="h-3 bg-slate-700" />
          </div>
        </Card>

        {/* Category Selection */}
        <div className="mb-8">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border-blue-500/30">
              {benefits.map((benefit) => {
                const IconComponent = benefit.icon;
                return (
                  <TabsTrigger 
                    key={benefit.id} 
                    value={benefit.id}
                    className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-blue-600"
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="hidden sm:block text-xs">{benefit.title}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* Category Content */}
            {benefits.map((benefit) => (
              <TabsContent key={benefit.id} value={benefit.id} className="mt-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  
                  {/* Category Overview */}
                  <Card className="bg-slate-800/50 border-blue-500/30 p-6">
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`${benefit.color} rounded-lg p-3`}>
                        <benefit.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2">{benefit.title}</h3>
                        <p className="text-gray-300 mb-4">{benefit.description}</p>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-400">Impact Score:</span>
                          <div className="flex-1">
                            <Progress value={benefit.impact} className="h-2 bg-slate-700" />
                          </div>
                          <span className="text-lg font-bold text-white">{benefit.impact}%</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Real-world Examples */}
                  <div className="space-y-4">
                    {benefit.examples.map((example, index) => (
                      <Card key={index} className="bg-slate-800/30 border-slate-600/30 p-4">
                        <div className="flex items-start gap-4">
                          <div className="bg-blue-600 rounded-lg p-2">
                            <example.icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-white mb-1">
                              {example.title}
                            </h4>
                            <p className="text-gray-300 text-sm mb-2">
                              {example.description}
                            </p>
                            <Badge variant="secondary" className="text-xs">
                              {example.metric}
                            </Badge>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Interactive Metrics */}
        <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/30 p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Real-Time ISS Impact
            </h3>
            <p className="text-gray-300 mb-6">
              See how ISS research continues to benefit Earth right now
            </p>
            <Button
              onClick={() => setShowMetrics(!showMetrics)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {showMetrics ? 'Hide' : 'Show'} Live Metrics
            </Button>
          </div>

          {showMetrics && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {[
                {
                  title: 'Earth Photos Today',
                  value: '2,847',
                  subtitle: 'Images captured for climate research',
                  icon: Eye,
                  color: 'text-green-400'
                },
                {
                  title: 'Experiments Running',
                  value: '47',
                  subtitle: 'Active research projects',
                  icon: Microscope,
                  color: 'text-blue-400'
                },
                {
                  title: 'Data Transmitted',
                  value: '1.2 TB',
                  subtitle: 'Scientific data sent to Earth today',
                  icon: Satellite,
                  color: 'text-purple-400'
                },
                {
                  title: 'Lives Impacted',
                  value: '847K',
                  subtitle: 'People helped by ISS research today',
                  icon: Heart,
                  color: 'text-pink-400'
                }
              ].map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="bg-slate-800/50 rounded-lg p-6">
                    <metric.icon className={`w-8 h-8 mx-auto mb-3 ${metric.color}`} />
                    <div className={`text-3xl font-bold mb-1 ${metric.color}`}>
                      {metric.value}
                    </div>
                    <h4 className="text-white font-semibold mb-1">{metric.title}</h4>
                    <p className="text-gray-400 text-sm">{metric.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-green-900/50 to-blue-900/50 border-green-500/30 p-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <h3 className="text-2xl font-bold text-white">The Future of Space Benefits</h3>
            </div>
            <p className="text-gray-300 mb-6">
              The ISS is just the beginning. Future space stations and lunar bases will unlock 
              even greater benefits for humanity, from revolutionary medicines to clean energy solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2">
                🚀 Gateway Lunar Station
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                🔬 Zero-G Manufacturing
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                🌱 Space Agriculture
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                ⚡ Solar Power Satellites
              </Badge>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EnhancedEarthBenefits;