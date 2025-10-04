import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  CloudRain, 
  Thermometer, 
  Heart, 
  Droplets, 
  Microscope, 
  Satellite,
  TreePine,
  Waves,
  Pill,
  Brain,
  Eye,
  Zap,
  ExternalLink,
  Info
} from 'lucide-react';

const EarthBenefits = () => {
  const [selectedBenefit, setSelectedBenefit] = useState<any>(null);
  const climateScience = [
    {
      icon: Thermometer,
      title: "Climate Monitoring",
      description: "ISS instruments track global temperature changes, greenhouse gas concentrations, and atmospheric composition to understand climate change patterns.",
      impact: "Helps predict and mitigate climate change effects",
      details: {
        instruments: ["SAGE III", "Lightning Imaging Sensor", "ECOSTRESS"],
        achievements: "Provides critical data for IPCC climate reports and global climate models",
        applications: "Used by NASA, NOAA, and international climate organizations"
      }
    },
    {
      icon: CloudRain,
      title: "Weather Prediction",
      description: "Advanced weather monitoring systems on the ISS improve hurricane tracking, storm prediction, and extreme weather forecasting.",
      impact: "Saves lives through better disaster preparedness"
    },
    {
      icon: TreePine,
      title: "Ecosystem Monitoring",
      description: "Earth observation helps track deforestation, urban growth, and ecosystem changes across the globe.",
      impact: "Guides conservation efforts and environmental policy"
    },
    {
      icon: Satellite,
      title: "Atmospheric Research",
      description: "Studying the atmosphere from space provides insights into ozone depletion, air quality, and pollution patterns.",
      impact: "Improves air quality and environmental health"
    }
  ];

  const waterManagement = [
    {
      icon: Droplets,
      title: "Water Cycle Studies",
      description: "ISS research reveals how water moves through Earth's systems, improving our understanding of precipitation and drought patterns.",
      impact: "Better water resource management and flood prediction"
    },
    {
      icon: Waves,
      title: "Ocean Monitoring",
      description: "Tracking ocean currents, temperature, and marine ecosystems helps understand their role in global climate regulation.",
      impact: "Protects marine life and coastal communities"
    },
    {
      icon: Zap,
      title: "Water Purification Technology",
      description: "ISS water recycling systems are adapted for use in remote communities and disaster areas on Earth.",
      impact: "Provides clean water access to underserved populations"
    },
    {
      icon: Eye,
      title: "Flood & Drought Detection",
      description: "Satellite imagery and sensors help identify water stress conditions and flood risks in real-time.",
      impact: "Enables rapid response to water-related disasters"
    }
  ];

  const medicalResearch = [
    {
      icon: Heart,
      title: "Cardiovascular Health",
      description: "Microgravity research reveals how the heart adapts to weightlessness, leading to treatments for heart disease on Earth.",
      impact: "Advances cardiac rehabilitation and treatment"
    },
    {
      icon: Brain,
      title: "Neurological Studies",
      description: "Understanding how the brain functions in space helps develop treatments for neurodegenerative diseases.",
      impact: "New therapies for Alzheimer's and Parkinson's"
    },
    {
      icon: Pill,
      title: "Drug Development",
      description: "Protein crystallization in microgravity creates better drug formulations and more effective medications.",
      impact: "Improved treatments for cancer and other diseases"
    },
    {
      icon: Microscope,
      title: "Tissue Engineering",
      description: "Growing tissues and organs in microgravity provides insights for regenerative medicine and organ transplants.",
      impact: "Revolutionary treatments for organ failure"
    }
  ];

  const BenefitCard = ({ benefit }: { benefit: any }) => (
    <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer group">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
          <benefit.icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-foreground">
              {benefit.title}
            </h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Info className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    {benefit.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-muted-foreground">{benefit.description}</p>
                  
                  {benefit.details && (
                    <>
                      <div>
                        <h4 className="font-semibold mb-2">Key Instruments/Technologies:</h4>
                        <div className="flex flex-wrap gap-2">
                          {benefit.details.instruments?.map((instrument: string, i: number) => (
                            <Badge key={i} variant="outline">{instrument}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Major Achievements:</h4>
                        <p className="text-sm text-muted-foreground">{benefit.details.achievements}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Real-World Applications:</h4>
                        <p className="text-sm text-muted-foreground">{benefit.details.applications}</p>
                      </div>
                    </>
                  )}
                  
                  <div className="pt-4 border-t">
                    <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20">
                      {benefit.impact}
                    </Badge>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <p className="text-muted-foreground mb-3 text-sm">
            {benefit.description}
          </p>
          <Badge variant="secondary" className="text-xs">
            {benefit.impact}
          </Badge>
        </div>
      </div>
    </Card>
  );

  return (
    <section id="earth-benefits" className="py-24 bg-card/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How ISS Research Helps Earth
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            The unique environment of the ISS enables groundbreaking research that directly 
            benefits life on Earth. From climate science to medical breakthroughs, 
            discover how space research improves our world.
          </p>
        </div>

        <Tabs defaultValue="climate" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="climate" className="flex items-center gap-2">
              <Thermometer className="w-4 h-4" />
              Climate Science
            </TabsTrigger>
            <TabsTrigger value="water" className="flex items-center gap-2">
              <Droplets className="w-4 h-4" />
              Water Management
            </TabsTrigger>
            <TabsTrigger value="medicine" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Medicine
            </TabsTrigger>
          </TabsList>

          <TabsContent value="climate" className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Climate Science & Environmental Monitoring
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The ISS serves as a crucial platform for monitoring Earth's climate and 
                environmental changes, providing data essential for understanding and 
                addressing global environmental challenges.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {climateScience.map((benefit, index) => (
                <BenefitCard key={index} benefit={benefit} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="water" className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Water Resources & Ocean Studies
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                ISS research advances our understanding of Earth's water systems and 
                develops technologies that improve water management and access worldwide.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {waterManagement.map((benefit, index) => (
                <BenefitCard key={index} benefit={benefit} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="medicine" className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Medical Research & Healthcare Advances
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The microgravity environment enables unique medical research that leads 
                to breakthrough treatments and technologies benefiting human health on Earth.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {medicalResearch.map((benefit, index) => (
                <BenefitCard key={index} benefit={benefit} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Statistics Section */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          <Card className="p-6 text-center bg-primary/5 border-primary/20">
            <div className="text-3xl font-bold text-primary mb-2">3,000+</div>
            <div className="text-sm text-muted-foreground">Scientific Experiments</div>
          </Card>
          <Card className="p-6 text-center bg-blue-500/5 border-blue-500/20">
            <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
            <div className="text-sm text-muted-foreground">Countries Benefiting</div>
          </Card>
          <Card className="p-6 text-center bg-green-500/5 border-green-500/20">
            <div className="text-3xl font-bold text-green-600 mb-2">25</div>
            <div className="text-sm text-muted-foreground">Years of Continuous Research</div>
          </Card>
          <Card className="p-6 text-center bg-orange-500/5 border-orange-500/20">
            <div className="text-3xl font-bold text-orange-600 mb-2">∞</div>
            <div className="text-sm text-muted-foreground">Future Possibilities</div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EarthBenefits;