import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Presentation, 
  Maximize, 
  Monitor,
  Users,
  Award,
  Target,
  Rocket,
  Globe,
  Zap
} from 'lucide-react';

const PresentationMode = () => {
  const [isPresentationMode, setIsPresentationMode] = useState(false);

  const achievements = [
    {
      icon: Users,
      title: "Global Collaboration",
      value: "15+ Countries",
      description: "International partnership in space"
    },
    {
      icon: Award,
      title: "Scientific Impact",
      value: "3,000+ Experiments",
      description: "Advancing human knowledge"
    },
    {
      icon: Target,
      title: "Mission Success",
      value: "25 Years",
      description: "Continuous human presence"
    },
    {
      icon: Globe,
      title: "Earth Benefits",
      value: "Countless Lives",
      description: "Improved through ISS research"
    }
  ];

  const features = [
    "🌍 Interactive 3D Earth visualization from ISS perspective",
    "🚀 Realistic weightlessness simulation with physics",
    "🔬 Comprehensive Earth benefits across multiple sciences",
    "📡 Live ISS tracking with real orbital data",
    "🏊‍♂️ Detailed astronaut training information (NBL)",
    "👥 Current crew information and mission details",
    "🎯 Educational content for all age groups",
    "💻 Professional, NASA-quality presentation"
  ];

  if (isPresentationMode) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
        <div className="w-full h-full max-w-7xl mx-auto p-8 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Rocket className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  ISS 25th Anniversary Experience
                </h1>
                <p className="text-lg text-muted-foreground">
                  NASA Space Apps Challenge 2025 Submission
                </p>
              </div>
            </div>
            <Button 
              onClick={() => setIsPresentationMode(false)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Monitor className="w-4 h-4" />
              Exit Presentation
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 flex-1">
            {/* Project Overview */}
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Target className="w-7 h-7 text-primary" />
                Challenge Requirements Met
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <h3 className="font-semibold text-green-700 mb-2">✅ ISS Cupola Experience</h3>
                  <p className="text-sm text-green-600">Interactive 3D "window to the world" simulation</p>
                </div>
                
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <h3 className="font-semibold text-blue-700 mb-2">✅ Weightlessness Simulation</h3>
                  <p className="text-sm text-blue-600">Realistic microgravity environment with floating objects</p>
                </div>
                
                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <h3 className="font-semibold text-purple-700 mb-2">✅ Earth Benefits Education</h3>
                  <p className="text-sm text-purple-600">Climate science, water management, and medicine</p>
                </div>
                
                <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                  <h3 className="font-semibold text-orange-700 mb-2">✅ Training Information</h3>
                  <p className="text-sm text-orange-600">Neutral Buoyancy Laboratory and astronaut preparation</p>
                </div>
              </div>
            </Card>

            {/* Key Features */}
            <Card className="p-8 bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Zap className="w-7 h-7 text-blue-600" />
                Interactive Features
              </h2>
              
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-card/50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-foreground">{feature}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Impact Metrics */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-foreground mb-4 text-center">
              Project Impact & Technical Excellence
            </h2>
            <div className="grid grid-cols-4 gap-4">
              {achievements.map((achievement, index) => (
                <Card key={index} className="p-4 text-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                  <achievement.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-xl font-bold text-foreground">{achievement.value}</div>
                  <div className="text-sm font-medium text-foreground">{achievement.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{achievement.description}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Button 
        onClick={() => setIsPresentationMode(true)}
        size="lg"
        className="bg-primary hover:bg-primary/90 text-white shadow-lg flex items-center gap-2"
      >
        <Presentation className="w-5 h-5" />
        NASA Presentation Mode
      </Button>
    </div>
  );
};

export default PresentationMode;