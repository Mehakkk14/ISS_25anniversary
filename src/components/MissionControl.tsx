import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Satellite, 
  Users, 
  Calendar, 
  Clock, 
  Globe, 
  Zap,
  Thermometer,
  Radio,
  Shield,
  Activity,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';

interface SystemStatus {
  name: string;
  status: 'nominal' | 'caution' | 'warning';
  value: string;
  unit: string;
  description: string;
}

interface MissionData {
  missionTime: string;
  altitude: number;
  velocity: number;
  orbitsCompleted: number;
  nextAOS: string; // Acquisition of Signal
  solarArrays: number;
  batteryLevel: number;
  communicationStatus: 'active' | 'inactive';
}

const MissionControl = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [missionData, setMissionData] = useState<MissionData>({
    missionTime: '25 years, 3 months, 15 days',
    altitude: 408.8,
    velocity: 27600,
    orbitsCompleted: 138420,
    nextAOS: '14:32:15',
    solarArrays: 95.2,
    batteryLevel: 87,
    communicationStatus: 'active'
  });

  const systemStatus: SystemStatus[] = [
    {
      name: 'Life Support',
      status: 'nominal',
      value: '21.0',
      unit: '% O₂',
      description: 'Oxygen levels nominal, CO₂ scrubbers functioning'
    },
    {
      name: 'Thermal Control',
      status: 'nominal',
      value: '22.5',
      unit: '°C',
      description: 'Internal temperature maintained within operational range'
    },
    {
      name: 'Power Generation',
      status: 'nominal',
      value: '84.2',
      unit: 'kW',
      description: 'Solar arrays generating sufficient power'
    },
    {
      name: 'Attitude Control',
      status: 'nominal',
      value: '0.02',
      unit: '°/sec',
      description: 'Station orientation stable, CMGs functioning'
    },
    {
      name: 'Communications',
      status: 'nominal',
      value: '99.7',
      unit: '% uptime',
      description: 'Ku-band and S-band systems operational'
    },
    {
      name: 'Experiments',
      status: 'caution',
      value: '23/25',
      unit: 'active',
      description: 'Minor equipment issue in Columbus laboratory'
    }
  ];

  const currentCrew = [
    { name: 'Expedition 70 Commander', role: 'NASA', flag: '🇺🇸', experiments: 12 },
    { name: 'Flight Engineer 1', role: 'Roscosmos', flag: '🇷🇺', experiments: 8 },
    { name: 'Flight Engineer 2', role: 'ESA', flag: '🇪🇺', experiments: 15 },
    { name: 'Flight Engineer 3', role: 'JAXA', flag: '🇯🇵', experiments: 9 },
    { name: 'Flight Engineer 4', role: 'NASA', flag: '🇺🇸', experiments: 11 },
    { name: 'Flight Engineer 5', role: 'Roscosmos', flag: '🇷🇺', experiments: 7 }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // Simulate real-time updates
      setMissionData(prev => ({
        ...prev,
        altitude: 408.8 + Math.sin(Date.now() / 10000) * 2,
        velocity: 27600 + Math.sin(Date.now() / 8000) * 50,
        batteryLevel: 85 + Math.sin(Date.now() / 15000) * 10
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'nominal':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'caution':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'nominal':
        return 'bg-primary/10 text-primary border-primary/30';
      case 'caution':
        return 'bg-orange-500/10 text-orange-700 border-orange-200';
      case 'warning':
        return 'bg-destructive/10 text-destructive border-destructive/30';
      default:
        return 'bg-primary/10 text-primary border-primary/30';
    }
  };

  return (
    <section id="mission-control" className="py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            ISS Mission Control
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto mb-8">
            Real-time mission status and systems monitoring for the International Space Station. 
            Experience the complexity of maintaining humanity's permanent outpost in space.
          </p>
          <div className="flex justify-center items-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Live Mission Time
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {currentTime.toUTCString()}
            </div>
          </div>
        </div>

        {/* Mission Overview */}
        <div className="grid lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 bg-slate-800/50 border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-blue-400" />
              <h3 className="font-semibold text-slate-200">Mission Time</h3>
            </div>
            <div className="text-2xl font-mono text-white mb-2">{missionData.missionTime}</div>
            <p className="text-xs text-slate-400">Continuous human presence since Nov 2000</p>
          </Card>

          <Card className="p-6 bg-slate-800/50 border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-green-400" />
              <h3 className="font-semibold text-slate-200">Altitude</h3>
            </div>
            <div className="text-2xl font-mono text-white mb-2">{missionData.altitude.toFixed(1)} km</div>
            <p className="text-xs text-slate-400">Above Earth's surface</p>
          </Card>

          <Card className="p-6 bg-slate-800/50 border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-yellow-400" />
              <h3 className="font-semibold text-slate-200">Velocity</h3>
            </div>
            <div className="text-2xl font-mono text-white mb-2">{missionData.velocity.toLocaleString()}</div>
            <p className="text-xs text-slate-400">km/h orbital speed</p>
          </Card>

          <Card className="p-6 bg-slate-800/50 border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <Satellite className="w-6 h-6 text-purple-400" />
              <h3 className="font-semibold text-slate-200">Orbits</h3>
            </div>
            <div className="text-2xl font-mono text-white mb-2">{missionData.orbitsCompleted.toLocaleString()}</div>
            <p className="text-xs text-slate-400">Completed since launch</p>
          </Card>
        </div>

        {/* Mission Details */}
        <Tabs defaultValue="systems" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-card">
            <TabsTrigger value="systems" className="text-foreground">System Status</TabsTrigger>
            <TabsTrigger value="crew" className="text-foreground">Current Crew</TabsTrigger>
            <TabsTrigger value="operations" className="text-foreground">Operations</TabsTrigger>
          </TabsList>

          <TabsContent value="systems">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {systemStatus.map((system, index) => (
                <Card key={index} className="p-4 bg-slate-800/50 border-slate-700">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-slate-200">{system.name}</h4>
                    {getStatusIcon(system.status)}
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-xl font-mono text-white">{system.value}</span>
                    <span className="text-sm text-slate-400">{system.unit}</span>
                  </div>
                  <Badge className={`text-xs ${getStatusColor(system.status)}`}>
                    {system.status.toUpperCase()}
                  </Badge>
                  <p className="text-xs text-slate-400 mt-2">{system.description}</p>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="crew">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentCrew.map((member, index) => (
                <Card key={index} className="p-4 bg-slate-800/50 border-slate-700">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{member.flag}</span>
                        <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
                          {member.role}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <h4 className="font-semibold text-slate-200 mb-1">{member.name}</h4>
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>Active Experiments:</span>
                    <span className="font-mono text-white">{member.experiments}</span>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="operations">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="p-6 bg-slate-800/50 border-slate-700">
                <h3 className="text-xl font-semibold text-slate-200 mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  Daily Operations Schedule
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-700">
                    <span className="text-slate-300">Science Operations</span>
                    <span className="font-mono text-green-400">06:00 - 18:00 GMT</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-700">
                    <span className="text-slate-300">Exercise Period</span>
                    <span className="font-mono text-blue-400">18:30 - 20:00 GMT</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-700">
                    <span className="text-slate-300">Ground Communication</span>
                    <span className="font-mono text-yellow-400">Every 90 minutes</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-300">Sleep Period</span>
                    <span className="font-mono text-purple-400">21:30 - 06:00 GMT</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-slate-800/50 border-slate-700">
                <h3 className="text-xl font-semibold text-slate-200 mb-4 flex items-center gap-2">
                  <Radio className="w-5 h-5 text-blue-400" />
                  Communication Windows
                </h3>
                <div className="space-y-4">
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-green-400 font-semibold">Next AOS (Acquisition of Signal)</span>
                      <Badge className="bg-green-500/20 text-green-300">ACTIVE</Badge>
                    </div>
                    <div className="font-mono text-xl text-white">{missionData.nextAOS}</div>
                    <div className="text-xs text-green-400">Houston Mission Control</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-700/50 rounded-lg text-center">
                      <div className="text-lg font-mono text-white">{missionData.solarArrays}%</div>
                      <div className="text-xs text-slate-400">Solar Array Output</div>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg text-center">
                      <div className="text-lg font-mono text-white">{missionData.batteryLevel}%</div>
                      <div className="text-xs text-slate-400">Battery Level</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Mission Control Actions */}
        <div className="mt-12 text-center">
          <Card className="p-8 bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">Mission Control Interface</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              This represents the real-time monitoring capabilities used by NASA's Mission Control Center 
              in Houston to oversee ISS operations 24/7. Every aspect of the station is continuously monitored 
              to ensure crew safety and mission success.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Shield className="w-4 h-4 mr-2" />
                View Safety Protocols
              </Button>
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                <Calendar className="w-4 h-4 mr-2" />
                Mission Timeline
              </Button>
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                <Radio className="w-4 h-4 mr-2" />
                Communication Logs
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MissionControl;