import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Camera, 
  Thermometer, 
  CloudRain,
  TreePine,
  Waves,
  Mountain,
  Building,
  Flame,
  Snowflake,
  ExternalLink
} from 'lucide-react';

interface EarthLocation {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
  type: 'climate' | 'disaster' | 'ecosystem' | 'urban';
  icon: any;
  nasaImageUrl: string;
  description: string;
  scientificData: {
    phenomenon: string;
    impact: string;
    issContribution: string;
  };
}

const EarthObservation = () => {
  const [selectedLocation, setSelectedLocation] = useState<EarthLocation | null>(null);

  const earthLocations: EarthLocation[] = [
    {
      id: 'amazon',
      name: 'Amazon Rainforest',
      coordinates: { lat: -3.4653, lng: -62.2159 },
      type: 'ecosystem',
      icon: TreePine,
      nasaImageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      description: 'The Amazon rainforest as seen from the ISS, showing deforestation patterns and ecosystem changes.',
      scientificData: {
        phenomenon: 'Deforestation monitoring and carbon cycle studies',
        impact: 'Guides conservation efforts and climate policy',
        issContribution: 'High-resolution imagery tracks illegal logging and forest health over time'
      }
    },
    {
      id: 'sahara',
      name: 'Sahara Desert Dust',
      coordinates: { lat: 23.8859, lng: 0.0 },
      type: 'climate',
      icon: CloudRain,
      nasaImageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=600&fit=crop',
      description: 'Massive dust storms from the Sahara that travel across the Atlantic, affecting weather and ocean nutrients.',
      scientificData: {
        phenomenon: 'Atmospheric dust transport and nutrient distribution',
        impact: 'Affects hurricane formation and Amazon rainforest fertilization',
        issContribution: 'Tracks dust plume movement and intensity for weather prediction models'
      }
    },
    {
      id: 'california_fires',
      name: 'California Wildfires',
      coordinates: { lat: 36.7783, lng: -119.4179 },
      type: 'disaster',
      icon: Flame,
      nasaImageUrl: 'https://images.unsplash.com/photo-1574482620881-1e9c4f98a591?w=800&h=600&fit=crop',
      description: 'Wildfire monitoring from space provides critical data for firefighting and evacuation planning.',
      scientificData: {
        phenomenon: 'Wildfire detection and smoke plume tracking',
        impact: 'Enables rapid response and saves lives through early detection',
        issContribution: 'Provides georeferenced photography for hazard teams on the ground'
      }
    },
    {
      id: 'hurricane',
      name: 'Hurricane Systems',
      coordinates: { lat: 25.7617, lng: -80.1918 },
      type: 'disaster',
      icon: CloudRain,
      nasaImageUrl: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=800&h=600&fit=crop',
      description: 'Hurricane tracking and intensity analysis from the unique vantage point of the ISS.',
      scientificData: {
        phenomenon: 'Hurricane formation, intensification, and storm tracking',
        impact: 'Improves weather prediction and disaster preparedness',
        issContribution: 'Manual crew observations complement automated weather satellites'
      }
    },
    {
      id: 'arctic_ice',
      name: 'Arctic Sea Ice',
      coordinates: { lat: 85.0, lng: 0.0 },
      type: 'climate',
      icon: Snowflake,
      nasaImageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      description: 'Monitoring Arctic sea ice extent and thickness changes as indicators of climate change.',
      scientificData: {
        phenomenon: 'Sea ice retreat and polar region warming',
        impact: 'Critical data for climate change models and predictions',
        issContribution: 'Long-term monitoring of ice edge movements and melt patterns'
      }
    },
    {
      id: 'nile_delta',
      name: 'Nile River Delta',
      coordinates: { lat: 31.0, lng: 31.2 },
      type: 'urban',
      icon: Waves,
      nasaImageUrl: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73b0e?w=800&h=600&fit=crop',
      description: 'Urban growth and agricultural changes in one of the most populated river deltas in the world.',
      scientificData: {
        phenomenon: 'Urban expansion and agricultural land use changes',
        impact: 'Informs sustainable development and water management',
        issContribution: 'Monitors population growth impacts on the Nile River system'
      }
    },
    {
      id: 'great_barrier_reef',
      name: 'Great Barrier Reef',
      coordinates: { lat: -18.2871, lng: 147.6992 },
      type: 'ecosystem',
      icon: Waves,
      nasaImageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=600&fit=crop',
      description: 'Coral reef health monitoring and bleaching event documentation from space.',
      scientificData: {
        phenomenon: 'Coral bleaching and marine ecosystem health',
        impact: 'Guides marine conservation and tourism management',
        issContribution: 'Tracks reef degradation and recovery over multiple years'
      }
    },
    {
      id: 'himalayas',
      name: 'Himalayan Glaciers',
      coordinates: { lat: 28.0, lng: 84.0 },
      type: 'climate',
      icon: Mountain,
      nasaImageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      description: 'Glacier retreat monitoring in the world\'s highest mountain range, affecting water security for billions.',
      scientificData: {
        phenomenon: 'Glacial retreat and snowpack changes',
        impact: 'Critical for water security of 2+ billion people',
        issContribution: 'Long-term documentation of glacier mass changes and lake formation'
      }
    }
  ];

  const getLocationsByType = (type: string) => {
    return earthLocations.filter(location => location.type === type);
  };

  const LocationCard = ({ location }: { location: EarthLocation }) => (
    <Card 
      className="p-4 cursor-pointer hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
      onClick={() => setSelectedLocation(location)}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <location.icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-1">{location.name}</h3>
          <p className="text-xs text-muted-foreground mb-2">
            {location.coordinates.lat.toFixed(2)}°, {location.coordinates.lng.toFixed(2)}°
          </p>
          <p className="text-sm text-muted-foreground">
            {location.description.substring(0, 80)}...
          </p>
        </div>
      </div>
    </Card>
  );

  return (
    <section id="earth-observation" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Earth Observation from the ISS
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Explore how astronauts use the ISS cupola to monitor Earth's climate, natural disasters, 
            and environmental changes. The ISS orbital path covers 90% of Earth's populated areas, 
            providing unique perspectives on our changing planet.
          </p>
          <div className="flex justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Real NASA-inspired imagery
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              16 orbits daily coverage
            </div>
          </div>
        </div>

        {/* Location Categories */}
        <Tabs defaultValue="climate" className="mb-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="climate" className="flex items-center gap-2">
              <Thermometer className="w-4 h-4" />
              Climate
            </TabsTrigger>
            <TabsTrigger value="disaster" className="flex items-center gap-2">
              <Flame className="w-4 h-4" />
              Disasters
            </TabsTrigger>
            <TabsTrigger value="ecosystem" className="flex items-center gap-2">
              <TreePine className="w-4 h-4" />
              Ecosystems
            </TabsTrigger>
            <TabsTrigger value="urban" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Urban
            </TabsTrigger>
          </TabsList>

          <TabsContent value="climate" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getLocationsByType('climate').map((location) => (
                <LocationCard key={location.id} location={location} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="disaster" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getLocationsByType('disaster').map((location) => (
                <LocationCard key={location.id} location={location} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ecosystem" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getLocationsByType('ecosystem').map((location) => (
                <LocationCard key={location.id} location={location} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="urban" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getLocationsByType('urban').map((location) => (
                <LocationCard key={location.id} location={location} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Selected Location Detail */}
        {selectedLocation && (
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <selectedLocation.icon className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{selectedLocation.name}</h3>
                    <p className="text-muted-foreground">
                      {selectedLocation.coordinates.lat.toFixed(4)}°, {selectedLocation.coordinates.lng.toFixed(4)}°
                    </p>
                  </div>
                  <Badge variant="outline" className="ml-auto">
                    {selectedLocation.type}
                  </Badge>
                </div>
                
                <img 
                  src={selectedLocation.nasaImageUrl}
                  alt={selectedLocation.name}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                
                <p className="text-muted-foreground mb-6">
                  {selectedLocation.description}
                </p>
                
                <Button className="flex items-center gap-2" variant="outline">
                  <ExternalLink className="w-4 h-4" />
                  View NASA Earth Observatory
                </Button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Scientific Phenomenon</h4>
                  <p className="text-muted-foreground">
                    {selectedLocation.scientificData.phenomenon}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Earth Impact</h4>
                  <p className="text-muted-foreground">
                    {selectedLocation.scientificData.impact}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-3">ISS Contribution</h4>
                  <p className="text-muted-foreground">
                    {selectedLocation.scientificData.issContribution}
                  </p>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-semibold text-foreground mb-3">Orbital Coverage</h4>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">16x</div>
                      <div className="text-xs text-blue-700">Daily Passes</div>
                    </div>
                    <div className="p-3 bg-green-500/10 rounded-lg">
                      <div className="text-lg font-bold text-green-600">408km</div>
                      <div className="text-xs text-green-700">Altitude</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <Button 
                onClick={() => setSelectedLocation(null)}
                variant="ghost"
                className="w-full"
              >
                ← Back to Earth Locations
              </Button>
            </div>
          </Card>
        )}
      </div>
    </section>
  );
};

export default EarthObservation;