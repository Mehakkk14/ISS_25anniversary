import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { 
  Microscope, 
  Dna, 
  Beaker, 
  Zap,
  Users,
  Globe,
  TrendingUp,
  BookOpen,
  Award,
  Timer,
  Target,
  Heart,
  Leaf,
  Atom,
  FlaskConical,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { issResearchData } from '@/data/nasaResources';

interface ResearchExperiment {
  name: string;
  description: string;
  principalInvestigator: string;
  expectedResults: string;
  duration: string;
  category: string;
  progress?: number;
  earthApplications?: string[];
  methodology?: string[];
}

const ISS_Research_Laboratory = () => {
  const [selectedExperiment, setSelectedExperiment] = useState<ResearchExperiment | null>(null);
  const [researchStats, setResearchStats] = useState(issResearchData);
  const [activeCategory, setActiveCategory] = useState('all');

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'biomedical':
        return <Heart className="w-5 h-5" />;
      case 'life sciences':
        return <Leaf className="w-5 h-5" />;
      case 'physical sciences':
        return <Atom className="w-5 h-5" />;
      case 'technology':
        return <Zap className="w-5 h-5" />;
      default:
        return <FlaskConical className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'biomedical':
        return 'bg-red-500/10 text-red-700 border-red-200';
      case 'life sciences':
        return 'bg-primary/10 text-primary border-primary/30';
      case 'physical sciences':
        return 'bg-primary/10 text-primary border-primary/30';
      case 'technology':
        return 'bg-primary/10 text-primary border-primary/30';
      default:
        return 'bg-primary/10 text-primary border-primary/30';
    }
  };

  const enhancedExperiments: ResearchExperiment[] = issResearchData.currentInvestigations.map((exp, index) => ({
    ...exp,
    progress: [85, 62, 78, 91][index],
    earthApplications: [
      ['Drug development', 'Disease treatment', 'Organ transplant research'],
      ['Heart disease therapy', 'Cardiac regeneration', 'Cardiovascular health'],
      ['Sustainable agriculture', 'Food security', 'Nutrition enhancement'],
      ['Industrial processes', 'Fuel efficiency', 'Manufacturing optimization']
    ][index],
    methodology: [
      ['Microgravity cell culture', '3D tissue modeling', 'Drug efficacy testing'],
      ['Engineered heart tissue', 'Contractility analysis', 'Disease simulation'],
      ['Controlled growth environment', 'Nutritional analysis', 'Genetic expression'],
      ['Fluid dynamics observation', 'Surface tension studies', 'Flow visualization']
    ][index]
  }));

  const filteredExperiments = activeCategory === 'all' 
    ? enhancedExperiments 
    : enhancedExperiments.filter(exp => exp.category.toLowerCase() === activeCategory);

  const categories = ['all', 'biomedical', 'life sciences', 'physical sciences', 'technology'];

  return (
    <section id="research-laboratory" className="py-24 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            ISS Research Laboratory
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Explore cutting-edge scientific research conducted aboard the International Space Station. 
            Over 25 years of discoveries that are transforming medicine, technology, and our understanding of life.
          </p>
          <div className="flex justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Microscope className="w-4 h-4" />
              Real NASA experiments
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              {researchStats.beneficiaryCountries} countries benefiting
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              {researchStats.publicationsGenerated.toLocaleString()} publications
            </div>
          </div>
        </div>

        {/* Research Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <FlaskConical className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Active Experiments</h3>
                <p className="text-sm text-muted-foreground">Currently running</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {researchStats.activeExperiments.toLocaleString()}
            </div>
            <Progress value={85} className="h-2" />
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Total Experiments</h3>
                <p className="text-sm text-muted-foreground">Since ISS operations</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {researchStats.totalExperiments.toLocaleString()}
            </div>
            <Progress value={92} className="h-2" />
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Timer className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Research Hours</h3>
                <p className="text-sm text-muted-foreground">Scientific investigation time</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {(researchStats.researchHours / 1000).toFixed(0)}K
            </div>
            <Progress value={78} className="h-2" />
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Global Impact</h3>
                <p className="text-sm text-muted-foreground">Countries benefiting</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {researchStats.beneficiaryCountries}
            </div>
            <Progress value={88} className="h-2" />
          </Card>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="grid w-full grid-cols-5">
              {categories.map(category => (
                <TabsTrigger key={category} value={category} className="capitalize">
                  {category === 'all' ? 'All Research' : category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Current Experiments */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {filteredExperiments.map((experiment, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-primary/50"
              onClick={() => setSelectedExperiment(experiment)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getCategoryIcon(experiment.category)}
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">{experiment.name}</h3>
                    <Badge className={`text-xs mt-1 ${getCategoryColor(experiment.category)}`}>
                      {experiment.category}
                    </Badge>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
              
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                {experiment.description}
              </p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold text-foreground">{experiment.progress}%</span>
                </div>
                <Progress value={experiment.progress} className="h-2" />
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-semibold text-foreground">{experiment.duration}</span>
                </div>
                
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    <strong>Principal Investigator:</strong> {experiment.principalInvestigator}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Research Impact */}
        <Card className="p-8 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 border-blue-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">25 Years of Research Impact</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From revolutionary medical breakthroughs to advanced materials science, 
              ISS research continues to benefit humanity in countless ways.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-500" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Medical Breakthroughs</h4>
              <p className="text-sm text-muted-foreground">
                Cancer treatments, organ-on-chip technology, and drug development accelerated by microgravity research
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-green-500" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Food Security</h4>
              <p className="text-sm text-muted-foreground">
                Advanced plant growth techniques and nutrition studies improving agriculture on Earth
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Atom className="w-8 h-8 text-blue-500" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Materials Science</h4>
              <p className="text-sm text-muted-foreground">
                New alloys, crystal growth, and manufacturing processes revolutionizing industry
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <ExternalLink className="w-4 h-4 mr-2" />
              Explore NASA Station Research & Technology
            </Button>
          </div>
        </Card>

        {/* Experiment Detail Modal */}
        {selectedExperiment && (
          <Dialog open={!!selectedExperiment} onOpenChange={() => setSelectedExperiment(null)}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                  {getCategoryIcon(selectedExperiment.category)}
                  {selectedExperiment.name}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                <div>
                  <Badge className={`${getCategoryColor(selectedExperiment.category)}`}>
                    {selectedExperiment.category}
                  </Badge>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Research Description</h4>
                  <p className="text-muted-foreground">{selectedExperiment.description}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Expected Results</h4>
                    <p className="text-muted-foreground text-sm">{selectedExperiment.expectedResults}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Principal Investigator</h4>
                    <p className="text-muted-foreground text-sm">{selectedExperiment.principalInvestigator}</p>
                    <p className="text-muted-foreground text-sm mt-2">
                      <strong>Duration:</strong> {selectedExperiment.duration}
                    </p>
                  </div>
                </div>
                
                {selectedExperiment.earthApplications && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Earth Applications</h4>
                    <div className="grid md:grid-cols-3 gap-2">
                      {selectedExperiment.earthApplications.map((app, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {app}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedExperiment.methodology && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Research Methodology</h4>
                    <div className="space-y-2">
                      {selectedExperiment.methodology.map((method, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Target className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground">{method}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Research Progress</h4>
                  <div className="flex items-center gap-4">
                    <Progress value={selectedExperiment.progress} className="h-3 flex-1" />
                    <span className="font-semibold text-foreground">{selectedExperiment.progress}%</span>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
};

export default ISS_Research_Laboratory;