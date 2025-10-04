import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import InteractiveCupolaMap from '@/components/InteractiveCupolaMap';
import CupolaExperience from '@/components/CupolaExperience';
import NBLTrainingGame from '@/components/NBLTrainingGame';
import WeightlessnessDemo from '@/components/WeightlessnessDemo';
import EnhancedEarthBenefits from '@/components/EnhancedEarthBenefits';
import EarthBenefits from '@/components/EarthBenefits';
import EarthObservation from '@/components/EarthObservation';
import ISSResearchLaboratory from '@/components/ISSResearchLaboratory';
import EVASystems from '@/components/EVASystems';
import ISSTracker from '@/components/ISSTracker';
import MissionControl from '@/components/MissionControl';
import TrainingSection from '@/components/TrainingSection';
import About from '@/components/About';
import Timeline from '@/components/Timeline';
import Gallery from '@/components/Gallery';
import Resources from '@/components/Resources';
import Footer from '@/components/Footer';
import PresentationMode from '@/components/PresentationMode';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <InteractiveCupolaMap />
      <CupolaExperience />
      <NBLTrainingGame />
      <WeightlessnessDemo />
      <EnhancedEarthBenefits />
      <EarthBenefits />
      <EarthObservation />
      <ISSResearchLaboratory />
      <EVASystems />
      <ISSTracker />
      <MissionControl />
      <TrainingSection />
      <About />
      <Timeline />
      <Gallery />
      <Resources />
      <Footer />
      <PresentationMode />
    </div>
  );
};

export default Index;
