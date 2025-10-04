import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MapPin, Camera, Satellite, Eye, X } from 'lucide-react';

interface EarthRegion {
  id: string;
  name: string;
  coordinates: { x: number; y: number };
  description: string;
  issPhoto: string;
  facts: string[];
  type: 'climate' | 'disaster' | 'research' | 'city';
  color: string;
}

const earthRegions: EarthRegion[] = [
  {
    id: 'amazon',
    name: 'Amazon Rainforest',
    coordinates: { x: 30, y: 55 },
    description: 'The lungs of our planet, monitoring deforestation and climate change.',
    issPhoto: '/api/placeholder/600/400',
    facts: [
      'ISS monitors deforestation at 60% accuracy',
      'Helps track illegal logging activities',
      'Observes carbon cycle changes',
      'Monitors biodiversity hotspots'
    ],
    type: 'climate',
    color: 'bg-green-500'
  },
  {
    id: 'himalayas',
    name: 'Himalayan Glaciers',
    coordinates: { x: 70, y: 35 },
    description: 'Tracking glacier retreat and water resource changes.',
    issPhoto: '/api/placeholder/600/400',
    facts: [
      'Monitors 15,000+ glaciers from space',
      'Tracks water availability for 2 billion people',
      'Measures ice thickness changes',
      'Predicts flood and drought patterns'
    ],
    type: 'climate',
    color: 'bg-blue-500'
  },
  {
    id: 'sahara',
    name: 'Sahara Desert',
    coordinates: { x: 50, y: 40 },
    description: 'Studying dust storms and their global climate impact.',
    issPhoto: '/api/placeholder/600/400',
    facts: [
      'Tracks 180 million tons of dust annually',
      'Monitors dust reaching Amazon rainforest',
      'Studies impact on Atlantic hurricanes',
      'Observes desertification patterns'
    ],
    type: 'climate',
    color: 'bg-yellow-500'
  },
  {
    id: 'australia-fires',
    name: 'Australian Bushfires',
    coordinates: { x: 85, y: 75 },
    description: 'Real-time wildfire monitoring and smoke tracking.',
    issPhoto: '/api/placeholder/600/400',
    facts: [
      'Detects fires within 1-2 hours',
      'Tracks smoke plumes across continents',
      'Helps coordinate firefighting efforts',
      'Monitors post-fire recovery'
    ],
    type: 'disaster',
    color: 'bg-red-500'
  },
  {
    id: 'hurricane',
    name: 'Atlantic Hurricanes',
    coordinates: { x: 25, y: 30 },
    description: 'Tracking storm formation and intensification.',
    issPhoto: '/api/placeholder/600/400',
    facts: [
      'Provides 95% accurate storm tracking',
      'Helps predict hurricane intensity',
      'Monitors eye wall replacement cycles',
      'Assists in evacuation planning'
    ],
    type: 'disaster',
    color: 'bg-purple-500'
  },
  {
    id: 'great-barrier-reef',
    name: 'Great Barrier Reef',
    coordinates: { x: 82, y: 70 },
    description: 'Monitoring coral bleaching and marine ecosystem health.',
    issPhoto: '/api/placeholder/600/400',
    facts: [
      'Maps coral bleaching events',
      'Tracks water temperature changes',
      'Monitors marine biodiversity',
      'Assists in conservation efforts'
    ],
    type: 'research',
    color: 'bg-cyan-500'
  }
];

const InteractiveCupolaMap: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<EarthRegion | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'day' | 'night'>('day');

  const handleRegionClick = (region: EarthRegion) => {
    setSelectedRegion(region);
  };

  const getRegionIcon = (type: string) => {
    switch (type) {
      case 'climate': return '🌍';
      case 'disaster': return '🔥';
      case 'research': return '🔬';
      case 'city': return '🏙️';
      default: return '📍';
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-blue-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Satellite className="w-4 h-4 mr-2" />
            Interactive Cupola Experience
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Earth Through the Cupola Window
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Experience what astronauts see through the ISS Cupola. Click on regions to discover 
            how the ISS helps monitor Earth's climate, disasters, and environmental changes.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-black/30 rounded-lg p-1 flex">
            <Button
              variant={viewMode === 'day' ? 'default' : 'ghost'}
              onClick={() => setViewMode('day')}
              className="text-white"
            >
              ☀️ Day View
            </Button>
            <Button
              variant={viewMode === 'night' ? 'default' : 'ghost'}
              onClick={() => setViewMode('night')}
              className="text-white"
            >
              🌙 Night View
            </Button>
          </div>
        </div>

        {/* Interactive Earth Map */}
        <Card className="relative max-w-4xl mx-auto overflow-hidden bg-black/50 border-blue-500/30">
          <div className="relative">
            {/* Earth Background */}
            <div 
              className={`relative w-full h-96 bg-gradient-to-b ${
                viewMode === 'day' 
                  ? 'from-blue-400 via-green-300 to-blue-600' 
                  : 'from-slate-800 via-slate-900 to-black'
              } rounded-lg overflow-hidden`}
            >
              {/* Cupola Frame Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-transparent to-gray-800 opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-transparent to-gray-800 opacity-20" />
              
              {/* Interactive Regions */}
              {earthRegions.map((region) => (
                <div
                  key={region.id}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${region.coordinates.x}%`,
                    top: `${region.coordinates.y}%`,
                  }}
                  onClick={() => handleRegionClick(region)}
                  onMouseEnter={() => setHoveredRegion(region.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                >
                  {/* Pulsing Marker */}
                  <div className={`relative ${region.color} rounded-full p-2 shadow-lg animate-pulse`}>
                    <MapPin className="w-4 h-4 text-white" />
                    {hoveredRegion === region.id && (
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap z-10">
                        {getRegionIcon(region.type)} {region.name}
                      </div>
                    )}
                  </div>
                  
                  {/* Expanding Ring Animation */}
                  <div className={`absolute inset-0 ${region.color} rounded-full animate-ping opacity-20`} />
                </div>
              ))}

              {/* Cupola Window Reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Info Panel */}
            <div className="p-6 bg-black/30 text-white">
              <div className="flex items-center gap-4 mb-4">
                <Eye className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-semibold">ISS Cupola - Earth Observation Window</h3>
              </div>
              <p className="text-gray-300 mb-4">
                The Cupola provides astronauts with a 360-degree view of Earth and space. 
                Click on the markers to see real ISS observations and learn how space-based 
                monitoring helps protect our planet.
              </p>
              <div className="flex flex-wrap gap-2">
                {['🌍 Climate', '🔥 Disasters', '🔬 Research', '🏙️ Cities'].map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Region Detail Modal */}
        <Dialog open={!!selectedRegion} onOpenChange={() => setSelectedRegion(null)}>
          <DialogContent className="max-w-2xl bg-slate-900 text-white border-blue-500/30">
            {selectedRegion && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3 text-2xl">
                    <span className="text-2xl">{getRegionIcon(selectedRegion.type)}</span>
                    {selectedRegion.name}
                    <Badge variant="secondary" className="ml-auto">
                      View from ISS
                    </Badge>
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* ISS Photo */}
                  <div className="relative rounded-lg overflow-hidden bg-slate-800 h-64">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Camera className="w-16 h-16 text-blue-400" />
                      <span className="ml-4 text-lg">ISS Photograph</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {selectedRegion.description}
                  </p>

                  {/* Key Facts */}
                  <div>
                    <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Satellite className="w-5 h-5 text-blue-400" />
                      ISS Monitoring Capabilities
                    </h4>
                    <ul className="space-y-2">
                      {selectedRegion.facts.map((fact, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-300">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Earth Benefits */}
                  <div className="bg-blue-900/30 rounded-lg p-4">
                    <h4 className="text-lg font-semibold mb-2 text-blue-300">
                      How This Helps Earth
                    </h4>
                    <p className="text-gray-300">
                      ISS observations of {selectedRegion.name} contribute to climate research, 
                      disaster preparedness, and environmental protection efforts worldwide.
                    </p>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default InteractiveCupolaMap;