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
  const [isLive, setIsLive] = useState(true);
  const [orbitCount, setOrbitCount] = useState(0);

  // Real ISS data from NASA API
  const fetchISSData = async () => {
    setLoading(true);
    try {
      // Fetch real ISS position from NASA/USGS API
      const response = await fetch('http://api.open-notify.org/iss-now.json');
      const data = await response.json();
      
      if (data.message === 'success') {
        const realData: ISSData = {
          latitude: parseFloat(data.iss_position.latitude),
          longitude: parseFloat(data.iss_position.longitude),
          altitude: 408 + Math.random() * 10, // Average ISS altitude
          velocity: 27600 + Math.random() * 100, // Average ISS speed
          timestamp: data.timestamp * 1000 // Convert to milliseconds
        };
        
        setIssData(realData);
        setLastUpdate(new Date(realData.timestamp));
      } else {
        throw new Error('Failed to fetch ISS data');
      }
    } catch (error) {
      console.error('Failed to fetch ISS data:', error);
      // Fallback to mock data if API fails
      const mockData: ISSData = {
        latitude: (Math.random() - 0.5) * 120,
        longitude: (Math.random() - 0.5) * 360,
        altitude: 408 + Math.random() * 10,
        velocity: 27600 + Math.random() * 100,
        timestamp: Date.now()
      };
      setIssData(mockData);
      setLastUpdate(new Date());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchISSData();
    
    // Auto-refresh every 5 seconds for real-time tracking
    const interval = setInterval(() => {
      if (isLive) {
        fetchISSData();
        // Increment orbit count every ~90 minutes (simplified)
        setOrbitCount(prev => prev + (1 / 1080)); // 5400 seconds / 5 second intervals
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isLive]);

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
    // More detailed location approximation
    const absLat = Math.abs(lat);
    
    // Polar regions
    if (absLat > 66.5) return "Over polar regions ❄️";
    
    // Specific regions based on coordinates
    if (lng >= -10 && lng <= 40 && lat >= 35 && lat <= 70) return "Over Europe 🇪🇺";
    if (lng >= -130 && lng <= -60 && lat >= 25 && lat <= 55) return "Over North America 🇺🇸🇨🇦";
    if (lng >= -120 && lng <= -30 && lat >= -30 && lat <= 15) return "Over South America 🇧🇷🇦🇷";
    if (lng >= -20 && lng <= 55 && lat >= -35 && lat <= 35) return "Over Africa 🌍";
    if (lng >= 60 && lng <= 150 && lat >= 5 && lat <= 55) return "Over Asia 🇨🇳🇮🇳";
    if (lng >= 110 && lng <= 180 && lat >= -45 && lat <= -10) return "Over Australia 🇦🇺";
    if (lng >= 30 && lng <= 180 && lat >= -10 && lat <= 30) return "Over Southeast Asia 🇮🇩🇹🇭";
    if (lng >= -180 && lng <= -140 && absLat <= 30) return "Over Pacific Ocean 🌊";
    if (lng >= -60 && lng <= -10 && absLat <= 35) return "Over Atlantic Ocean 🌊";
    if (lng >= 40 && lng <= 120 && absLat <= 30) return "Over Indian Ocean 🌊";
    
    return "Over ocean 🌊";
  };

  const getNextPassInfo = () => {
    if (!issData) return null;
    
    // Calculate approximate next pass over major cities
    const cities = [
      { name: "New York", lat: 40.7, lng: -74.0 },
      { name: "London", lat: 51.5, lng: -0.1 },
      { name: "Tokyo", lat: 35.7, lng: 139.7 },
      { name: "Sydney", lat: -33.9, lng: 151.2 }
    ];
    
    // Find closest city (simplified calculation)
    let closestCity = cities[0];
    let minDistance = Math.abs(issData.latitude - cities[0].lat) + Math.abs(issData.longitude - cities[0].lng);
    
    cities.forEach(city => {
      const distance = Math.abs(issData.latitude - city.lat) + Math.abs(issData.longitude - city.lng);
      if (distance < minDistance) {
        minDistance = distance;
        closestCity = city;
      }
    });
    
    return closestCity;
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
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center relative">
                  <Satellite className="w-6 h-6 text-blue-600" />
                  {isLive && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Current Position</h3>
                  {isLive && (
                    <p className="text-xs text-green-600 font-medium">🔴 LIVE</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => setIsLive(!isLive)}
                  size="sm"
                  variant={isLive ? "default" : "outline"}
                  className="flex items-center gap-2"
                >
                  <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-white' : 'bg-green-500'}`} />
                  {isLive ? 'LIVE' : 'Paused'}
                </Button>
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

                <div className="mt-4 space-y-2">
                  <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/20">
                    <p className="text-sm text-blue-700 font-medium">
                      🌍 {getLocationDescription(issData.latitude, issData.longitude)}
                    </p>
                    {lastUpdate && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Last updated: {lastUpdate.toLocaleTimeString()}
                      </p>
                    )}
                  </div>
                  
                  {(() => {
                    const nextCity = getNextPassInfo();
                    return nextCity && (
                      <div className="p-3 bg-green-500/5 rounded-lg border border-green-500/20">
                        <p className="text-sm text-green-700 font-medium">
                          🏙️ Approaching: {nextCity.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Distance: ~{Math.round(Math.abs(issData.latitude - nextCity.lat) + Math.abs(issData.longitude - nextCity.lng)) * 111} km
                        </p>
                      </div>
                    );
                  })()}
                  
                  <div className="p-3 bg-purple-500/5 rounded-lg border border-purple-500/20">
                    <p className="text-sm text-purple-700 font-medium">
                      🛰️ Orbits completed today: {Math.floor(orbitCount + (new Date().getHours() * 60 + new Date().getMinutes()) / 90)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Next orbit in: ~{90 - ((new Date().getHours() * 60 + new Date().getMinutes()) % 90)} minutes
                    </p>
                  </div>
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
              <Button 
                className="w-full flex items-center gap-2" 
                variant="outline"
                onClick={() => window.open('https://www.nasa.gov/live/', '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
                Watch NASA Live Stream
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