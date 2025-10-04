import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Satellite, 
  MapPin, 
  Clock, 
  Users, 
  Orbit,
  RefreshCw,
  ExternalLink,
  Compass
} from 'lucide-react';

interface ISSData {
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  timestamp: number;
}

interface CrewMember {
  name: string;
  country: string;
  launchDate: string;
  role: string;
}

const ISSTracker = () => {
  const [issData, setIssData] = useState<ISSData | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  // Mock ISS data (in real implementation, this would fetch from ISS API)
  const fetchISSData = async () => {
    setLoading(true);
    try {
      // Simulated API call with realistic ISS orbital data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData: ISSData = {
        latitude: (Math.random() - 0.5) * 120, // Random lat between -60 and 60
        longitude: (Math.random() - 0.5) * 360, // Random lng between -180 and 180
        altitude: 408 + Math.random() * 10, // ISS altitude ~408km
        velocity: 27600 + Math.random() * 100, // ISS speed ~27,600 km/h
        timestamp: Date.now()
      };
      
      setIssData(mockData);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Failed to fetch ISS data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchISSData();
    // Auto-refresh every 10 seconds (real ISS position updates)
    const interval = setInterval(fetchISSData, 10000);
    return () => clearInterval(interval);
  }, []);

  // Current ISS crew (mock data - would be fetched from NASA API)
  const currentCrew: CrewMember[] = [
    {
      name: "Sergey Prokopyev",
      country: "Russia",
      launchDate: "September 2024",
      role: "Commander"
    },
    {
      name: "Tracy C. Dyson", 
      country: "USA",
      launchDate: "March 2024",
      role: "Flight Engineer"
    },
    {
      name: "Mike Barratt",
      country: "USA", 
      launchDate: "March 2024",
      role: "Flight Engineer"
    },
    {
      name: "Jeanette Epps",
      country: "USA",
      launchDate: "March 2024", 
      role: "Mission Specialist"
    },
    {
      name: "Alexander Grebenkin",
      country: "Russia",
      launchDate: "March 2024",
      role: "Flight Engineer"
    },
    {
      name: "Butch Wilmore",
      country: "USA",
      launchDate: "June 2024",
      role: "Test Pilot"
    },
    {
      name: "Sunita Williams",
      country: "USA", 
      launchDate: "June 2024",
      role: "Test Pilot"
    }
  ];

  const formatCoordinate = (value: number, type: 'lat' | 'lng') => {
    const abs = Math.abs(value);
    const direction = type === 'lat' 
      ? (value >= 0 ? 'N' : 'S')
      : (value >= 0 ? 'E' : 'W');
    return `${abs.toFixed(2)}° ${direction}`;
  };

  const getLocationDescription = (lat: number, lng: number) => {
    // Simplified location approximation
    if (Math.abs(lat) > 60) return "Over polar regions";
    if (Math.abs(lng) < 30 && Math.abs(lat) < 40) return "Over Europe/Africa";
    if (lng > 30 && lng < 150 && Math.abs(lat) < 40) return "Over Asia";
    if (lng < -60 && lng > -180 && Math.abs(lat) < 50) return "Over Americas";
    if (lng > 100 && lng < 180 && lat < 0) return "Over Australia/Oceania";
    return "Over ocean";
  };

  return (
    <section id="iss-tracker" className="py-24 bg-card/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Live ISS Tracking
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Follow the International Space Station in real-time as it orbits Earth every 
            90 minutes at an altitude of approximately 408 kilometers.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Live Position Data */}
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Satellite className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Current Position</h3>
              </div>
              <Button 
                onClick={fetchISSData} 
                disabled={loading}
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>

            {issData ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      Latitude
                    </div>
                    <div className="text-2xl font-mono font-semibold text-foreground">
                      {formatCoordinate(issData.latitude, 'lat')}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Compass className="w-4 h-4" />
                      Longitude
                    </div>
                    <div className="text-2xl font-mono font-semibold text-foreground">
                      {formatCoordinate(issData.longitude, 'lng')}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Orbit className="w-4 h-4" />
                      Altitude
                    </div>
                    <div className="text-lg font-semibold text-foreground">
                      {issData.altitude.toFixed(1)} km
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      Speed
                    </div>
                    <div className="text-lg font-semibold text-foreground">
                      {issData.velocity.toFixed(0)} km/h
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-500/5 rounded-lg border border-blue-500/20">
                  <p className="text-sm text-blue-700 font-medium">
                    🌍 {getLocationDescription(issData.latitude, issData.longitude)}
                  </p>
                  {lastUpdate && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Last updated: {lastUpdate.toLocaleTimeString()}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-40">
                <div className="text-center">
                  <RefreshCw className="w-8 h-8 text-muted-foreground animate-spin mx-auto mb-2" />
                  <p className="text-muted-foreground">Loading ISS position...</p>
                </div>
              </div>
            )}
          </Card>

          {/* Current Crew */}
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Current Crew</h3>
              <Badge variant="outline" className="ml-auto">
                {currentCrew.length} Astronauts
              </Badge>
            </div>

            <div className="space-y-3">
              {currentCrew.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <div className="font-semibold text-foreground">{member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.role}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{member.country}</div>
                    <div className="text-xs text-muted-foreground">{member.launchDate}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t">
              <Button className="w-full flex items-center gap-2" variant="outline">
                <ExternalLink className="w-4 h-4" />
                View ISS Live Stream
              </Button>
            </div>
          </Card>
        </div>

        {/* Quick Facts */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="p-4 text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
            <div className="text-2xl font-bold text-blue-600 mb-1">408 km</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">Average Altitude</div>
          </Card>
          <Card className="p-4 text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
            <div className="text-2xl font-bold text-green-600 mb-1">~90 min</div>
            <div className="text-sm text-green-700 dark:text-green-300">Orbital Period</div>
          </Card>
          <Card className="p-4 text-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
            <div className="text-2xl font-bold text-purple-600 mb-1">27,600</div>
            <div className="text-sm text-purple-700 dark:text-purple-300">km/h Speed</div>
          </Card>
          <Card className="p-4 text-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800">
            <div className="text-2xl font-bold text-orange-600 mb-1">16</div>
            <div className="text-sm text-orange-700 dark:text-orange-300">Orbits per Day</div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ISSTracker;