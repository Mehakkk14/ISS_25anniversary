import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Text, Html } from '@react-three/drei';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Shield, 
  Thermometer, 
  Radio, 
  Battery,
  Clock,
  Weight,
  Gauge,
  Zap,
  Users,
  CheckCircle,
  AlertTriangle,
  Settings,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import * as THREE from 'three';
import { evaSystemsData } from '@/data/nasaResources';

interface SpacesuitComponent {
  name: string;
  position: [number, number, number];
  color: string;
  description: string;
  function: string;
  specifications: string[];
}

const SpacesuitModel = ({ selectedComponent, onComponentClick }: { 
  selectedComponent: string | null;
  onComponentClick: (component: string) => void;
}) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  const spacesuitComponents: SpacesuitComponent[] = [
    {
      name: 'Helmet Assembly',
      position: [0, 2.2, 0],
      color: '#E3F2FD',
      description: 'Pressurized helmet with gold-coated visor for radiation protection',
      function: 'Vision, communication, life support integration',
      specifications: [
        'Polycarbonate shell with anti-fogging system',
        'Gold-coated outer visor (EMU thermal protection)',
        'Integrated communication system with noise cancellation',
        'Emergency purge valve for rapid depressurization'
      ]
    },
    {
      name: 'Life Support Backpack',
      position: [0, 1, -0.8],
      color: '#FF5722',
      description: 'Primary Life Support System (PLSS) providing oxygen, power, and cooling',
      function: 'Oxygen supply, CO₂ removal, thermal regulation, power distribution',
      specifications: [
        '8+ hours of life support capability',
        'Oxygen generation and CO₂ scrubbing systems',
        'Cooling water circulation (280 watts heat removal)',
        'Battery power system (16.8V, 30Ah capacity)'
      ]
    },
    {
      name: 'Chest Control Unit',
      position: [0, 1.5, 0.3],
      color: '#4CAF50',
      description: 'Display and Control Module (DCM) for system monitoring',
      function: 'System status display, manual controls, emergency procedures',
      specifications: [
        'Digital display showing suit pressure, oxygen levels',
        'Manual control switches for backup operations',
        'Warning lights and audio alerts',
        'Emergency revert mode activation'
      ]
    },
    {
      name: 'Gloves',
      position: [1.2, 1.2, 0],
      color: '#FFC107',
      description: 'Phase VI gloves with enhanced dexterity and thermal protection',
      function: 'Manipulation, tool operation, tactile feedback',
      specifications: [
        'TMG (Thermal Micrometeoroid Garment) protection',
        'Pressure bladder with comfort liner',
        'Fingertip heaters for thermal protection',
        'Wrist disconnect for emergency removal'
      ]
    },
    {
      name: 'Boots',
      position: [0, -0.5, 0],
      color: '#607D8B',
      description: 'Extravehicular boots with traction and thermal protection',
      function: 'Mobility, traction, foot protection in space environment',
      specifications: [
        'Thermal protection from -250°F to +250°F',
        'Traction cleats for handrail gripping',
        'Comfort liner with moisture management',
        'Ankle flexibility for natural movement'
      ]
    }
  ];

  return (
    <group ref={meshRef}>
      {/* Main Torso */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.6, 0.7, 1.8, 16]} />
        <meshStandardMaterial color="#FFFFFF" transparent opacity={0.9} />
      </mesh>

      {/* Arms */}
      <mesh position={[1, 1.2, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 1.2, 8]} />
        <meshStandardMaterial color="#FFFFFF" transparent opacity={0.9} />
      </mesh>
      <mesh position={[-1, 1.2, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 1.2, 8]} />
        <meshStandardMaterial color="#FFFFFF" transparent opacity={0.9} />
      </mesh>

      {/* Legs */}
      <mesh position={[0.3, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.18, 1.5, 8]} />
        <meshStandardMaterial color="#FFFFFF" transparent opacity={0.9} />
      </mesh>
      <mesh position={[-0.3, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.18, 1.5, 8]} />
        <meshStandardMaterial color="#FFFFFF" transparent opacity={0.9} />
      </mesh>

      {/* Interactive Components */}
      {spacesuitComponents.map((component, index) => (
        <mesh
          key={index}
          position={component.position}
          onClick={() => onComponentClick(component.name)}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'default';
          }}
        >
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial 
            color={component.color} 
            transparent 
            opacity={selectedComponent === component.name ? 1 : 0.7}
            emissive={selectedComponent === component.name ? component.color : '#000000'}
            emissiveIntensity={selectedComponent === component.name ? 0.3 : 0}
          />
          {selectedComponent === component.name && (
            <Html position={[0, 0.3, 0]} center>
              <div className="bg-black/80 text-white text-xs p-2 rounded max-w-xs">
                <div className="font-semibold">{component.name}</div>
                <div className="text-muted-foreground">{component.function}</div>
              </div>
            </Html>
          )}
        </mesh>
      ))}
    </group>
  );
};

const EVASystems = () => {
  const [selectedSuit, setSelectedSuit] = useState(evaSystemsData[0]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const spacesuitComponents: SpacesuitComponent[] = [
    {
      name: 'Helmet Assembly',
      position: [0, 2.2, 0],
      color: '#E3F2FD',
      description: 'Pressurized helmet with gold-coated visor for radiation protection',
      function: 'Vision, communication, life support integration',
      specifications: [
        'Polycarbonate shell with anti-fogging system',
        'Gold-coated outer visor (EMU thermal protection)',
        'Integrated communication system with noise cancellation',
        'Emergency purge valve for rapid depressurization'
      ]
    },
    {
      name: 'Life Support Backpack',
      position: [0, 1, -0.8],
      color: '#FF5722',
      description: 'Primary Life Support System (PLSS) providing oxygen, power, and cooling',
      function: 'Oxygen supply, CO₂ removal, thermal regulation, power distribution',
      specifications: [
        '8+ hours of life support capability',
        'Oxygen generation and CO₂ scrubbing systems',
        'Cooling water circulation (280 watts heat removal)',
        'Battery power system (16.8V, 30Ah capacity)'
      ]
    },
    {
      name: 'Chest Control Unit',
      position: [0, 1.5, 0.3],
      color: '#4CAF50',
      description: 'Display and Control Module (DCM) for system monitoring',
      function: 'System status display, manual controls, emergency procedures',
      specifications: [
        'Digital display showing suit pressure, oxygen levels',
        'Manual control switches for backup operations',
        'Warning lights and audio alerts',
        'Emergency revert mode activation'
      ]
    },
    {
      name: 'Gloves',
      position: [1.2, 1.2, 0],
      color: '#FFC107',
      description: 'Phase VI gloves with enhanced dexterity and thermal protection',
      function: 'Manipulation, tool operation, tactile feedback',
      specifications: [
        'TMG (Thermal Micrometeoroid Garment) protection',
        'Pressure bladder with comfort liner',
        'Fingertip heaters for thermal protection',
        'Wrist disconnect for emergency removal'
      ]
    },
    {
      name: 'Boots',
      position: [0, -0.5, 0],
      color: '#607D8B',
      description: 'Extravehicular boots with traction and thermal protection',
      function: 'Mobility, traction, foot protection in space environment',
      specifications: [
        'Thermal protection from -250°F to +250°F',
        'Traction cleats for handrail gripping',
        'Comfort liner with moisture management',
        'Ankle flexibility for natural movement'
      ]
    }
  ];

  const getComponentDetails = (componentName: string) => {
    return spacesuitComponents.find(comp => comp.name === componentName);
  };

  return (
    <section id="eva-systems" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            EVA Systems & Spacesuit Technology
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Explore NASA's advanced Extravehicular Activity systems that protect astronauts 
            during spacewalks. From the current EMU to the next-generation xEMU for lunar missions.
          </p>
          <div className="flex justify-center items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Life protection systems
            </div>
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Advanced engineering
            </div>
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              NASA JSC EVA Systems
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* 3D Spacesuit Model */}
          <Card className="p-6 bg-card border-border">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              Interactive Spacesuit Model
            </h3>
            <div className="h-96 bg-card rounded-lg overflow-hidden">
              <Canvas camera={{ position: [3, 2, 5], fov: 50 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-10, -10, -5]} intensity={0.5} />
                <SpacesuitModel 
                  selectedComponent={selectedComponent}
                  onComponentClick={setSelectedComponent}
                />
                <OrbitControls enableZoom={true} enablePan={false} />
                <Environment preset="night" />
              </Canvas>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Click on highlighted components to learn about spacesuit systems
            </p>
          </Card>

          {/* Component Details */}
          <Card className="p-6 bg-card border-border">
            <h3 className="text-xl font-semibold mb-4">
              {selectedComponent ? getComponentDetails(selectedComponent)?.name : 'Spacesuit Components'}
            </h3>
            {selectedComponent ? (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Function</h4>
                  <p className="text-muted-foreground text-sm">
                    {getComponentDetails(selectedComponent)?.function}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Description</h4>
                  <p className="text-muted-foreground text-sm">
                    {getComponentDetails(selectedComponent)?.description}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Specifications</h4>
                  <ul className="space-y-1">
                    {getComponentDetails(selectedComponent)?.specifications.map((spec, index) => (
                      <li key={index} className="text-muted-foreground text-sm flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {spacesuitComponents.map((component, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start text-left h-auto p-3"
                    onClick={() => setSelectedComponent(component.name)}
                  >
                    <div>
                      <div className="font-semibold text-sm">{component.name}</div>
                      <div className="text-xs text-muted-foreground">{component.function}</div>
                    </div>
                  </Button>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Spacesuit Comparison */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">NASA Spacesuit Systems</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {evaSystemsData.map((suit, index) => (
              <Card 
                key={index}
                className={`p-6 cursor-pointer transition-all duration-300 ${
                  selectedSuit.name === suit.name 
                    ? 'bg-primary/10 border-primary' 
                    : 'bg-card border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedSuit(suit)}
              >
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-xl font-semibold">{suit.name}</h4>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground mb-4">{suit.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Weight className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{suit.specifications.weight}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{suit.specifications.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{suit.specifications.pressure}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{suit.specifications.temperature}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="font-semibold">Applications:</h5>
                  <div className="flex flex-wrap gap-1">
                    {suit.applications.slice(0, 3).map((app, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {app}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Selected Suit Details */}
        <Card className="p-8 bg-card border-border">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">{selectedSuit.name}</h3>
            <p className="text-muted-foreground">{selectedSuit.description}</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="safety">Safety Features</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-4">Technical Specifications</h4>
                  <div className="space-y-3">
                    {Object.entries(selectedSuit.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="font-mono text-sm">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Performance Metrics</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-muted-foreground">Mobility Rating</span>
                        <span>95%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-muted-foreground">Protection Level</span>
                        <span>98%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '98%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-muted-foreground">Life Support Efficiency</span>
                        <span>92%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="applications" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {selectedSuit.applications.map((application, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold mb-1">{application}</h5>
                      <p className="text-muted-foreground text-sm">
                        Advanced capability for {application.toLowerCase()} operations
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="safety" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {selectedSuit.safetyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold mb-1">{feature}</h5>
                      <p className="text-muted-foreground text-sm">
                        Critical safety system ensuring astronaut protection
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 text-center">
            <Button className="bg-primary hover:bg-primary/90">
              <ExternalLink className="w-4 h-4 mr-2" />
              Learn More at NASA JSC EVA Systems
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default EVASystems;