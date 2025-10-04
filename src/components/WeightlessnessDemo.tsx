import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Pause, RotateCcw } from 'lucide-react';

// Professional ISS equipment with realistic materials
const FloatingTool = ({ position, type }: { position: [number, number, number]; type: 'laptop' | 'multimeter' | 'camera' | 'sample' | 'wrench' | 'tablet' | 'water' }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [time] = useState(Math.random() * 100);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime + time;
      
      // Complex 6DOF motion in microgravity
      meshRef.current.position.x = position[0] + Math.sin(t * 0.2) * 1.2 + Math.cos(t * 0.15) * 0.3;
      meshRef.current.position.y = position[1] + Math.cos(t * 0.25) * 0.8 + Math.sin(t * 0.3) * 0.4;
      meshRef.current.position.z = position[2] + Math.sin(t * 0.18) * 0.6 + Math.cos(t * 0.22) * 0.2;
      
      // Realistic tumbling in all axes
      meshRef.current.rotation.x += 0.006 + Math.sin(t * 0.1) * 0.002;
      meshRef.current.rotation.y += 0.009 + Math.cos(t * 0.12) * 0.003;
      meshRef.current.rotation.z += 0.004 + Math.sin(t * 0.08) * 0.002;
    }
  });

  const getRealisticEquipment = () => {
    switch (type) {
      case 'laptop':
        return (
          <group>
            <mesh position={[0, 0.01, 0]}>
              <boxGeometry args={[0.8, 0.02, 0.6]} />
              <meshStandardMaterial color="#2c3e50" roughness={0.1} metalness={0.3} />
            </mesh>
            <mesh position={[0, 0.03, -0.2]} rotation={[-0.2, 0, 0]}>
              <boxGeometry args={[0.78, 0.01, 0.4]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.05} metalness={0.1} />
            </mesh>
            <mesh position={[0, 0.035, -0.18]} rotation={[-0.2, 0, 0]}>
              <planeGeometry args={[0.7, 0.35]} />
              <meshBasicMaterial color="#0066cc" />
            </mesh>
          </group>
        );
      case 'multimeter':
        return (
          <group>
            <mesh>
              <boxGeometry args={[0.4, 0.6, 0.08]} />
              <meshStandardMaterial color="#f39c12" roughness={0.3} metalness={0.1} />
            </mesh>
            <mesh position={[0, 0.15, 0.045]}>
              <boxGeometry args={[0.25, 0.15, 0.01]} />
              <meshBasicMaterial color="#000000" />
            </mesh>
            <mesh position={[0, -0.1, 0.045]}>
              <cylinderGeometry args={[0.08, 0.08, 0.01]} />
              <meshStandardMaterial color="#34495e" roughness={0.2} metalness={0.8} />
            </mesh>
          </group>
        );
      case 'camera':
        return (
          <group>
            <mesh>
              <boxGeometry args={[0.35, 0.25, 0.2]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.3} />
            </mesh>
            <mesh position={[0.12, 0, 0.12]}>
              <cylinderGeometry args={[0.1, 0.1, 0.15]} />
              <meshStandardMaterial color="#2c3e50" roughness={0.1} metalness={0.8} />
            </mesh>
            <mesh position={[0.12, 0, 0.2]}>
              <cylinderGeometry args={[0.12, 0.12, 0.05]} />
              <meshStandardMaterial color="#000000" roughness={0.05} metalness={0.9} />
            </mesh>
          </group>
        );
      case 'sample':
        return (
          <group>
            <mesh>
              <cylinderGeometry args={[0.08, 0.08, 0.25]} />
              <meshStandardMaterial color="#e74c3c" roughness={0.2} metalness={0.7} />
            </mesh>
            <mesh position={[0, 0.1, 0]}>
              <cylinderGeometry args={[0.09, 0.09, 0.05]} />
              <meshStandardMaterial color="#c0392b" roughness={0.3} metalness={0.8} />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.06, 0.06, 0.26]} />
              <meshStandardMaterial 
                color="#27ae60" 
                transparent 
                opacity={0.7} 
                roughness={0.1} 
                metalness={0.0} 
              />
            </mesh>
          </group>
        );
      case 'wrench':
        return (
          <group>
            <mesh>
              <boxGeometry args={[0.8, 0.12, 0.08]} />
              <meshStandardMaterial color="#95a5a6" roughness={0.2} metalness={0.9} />
            </mesh>
            <mesh position={[0.35, 0, 0]}>
              <boxGeometry args={[0.15, 0.25, 0.08]} />
              <meshStandardMaterial color="#7f8c8d" roughness={0.3} metalness={0.8} />
            </mesh>
          </group>
        );
      case 'tablet':
        return (
          <group>
            <mesh>
              <boxGeometry args={[0.5, 0.35, 0.02]} />
              <meshStandardMaterial color="#2c3e50" roughness={0.1} metalness={0.2} />
            </mesh>
            <mesh position={[0, 0, 0.012]}>
              <planeGeometry args={[0.45, 0.3]} />
              <meshBasicMaterial color="#3498db" />
            </mesh>
          </group>
        );
      case 'water':
        return (
          <group>
            <mesh>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial 
                color="#3498db" 
                transparent 
                opacity={0.8} 
                roughness={0.0} 
                metalness={0.1}
              />
            </mesh>
          </group>
        );
      default:
        return (
          <mesh>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshStandardMaterial color="#95a5a6" roughness={0.3} metalness={0.5} />
          </mesh>
        );
    }
  };

  return (
    <group ref={meshRef} position={position}>
      {getRealisticEquipment()}
    </group>
  );
};

// Realistic astronaut floating simulation
const FloatingAstronaut = () => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      
      // Complex floating motion with realistic physics
      meshRef.current.position.y = Math.sin(t * 0.15) * 0.4 + Math.cos(t * 0.23) * 0.2;
      meshRef.current.position.x = Math.cos(t * 0.12) * 0.3;
      meshRef.current.position.z = Math.sin(t * 0.18) * 0.2;
      
      // Realistic body orientation changes in microgravity
      meshRef.current.rotation.z = Math.sin(t * 0.2) * 0.15;
      meshRef.current.rotation.x = Math.cos(t * 0.18) * 0.1;
      meshRef.current.rotation.y = Math.sin(t * 0.1) * 0.05;
    }
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Realistic EMU spacesuit representation */}
      
      {/* Torso - Primary Life Support System (PLSS) */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.8, 1.2, 0.4]} />
        <meshStandardMaterial color="#f8f9fa" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Chest control panel */}
      <mesh position={[0, 0.2, 0.21]}>
        <boxGeometry args={[0.3, 0.2, 0.02]} />
        <meshStandardMaterial color="#2c3e50" roughness={0.1} metalness={0.8} />
      </mesh>
      
      {/* Helmet with reflective visor */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial 
          color="#f8f9fa" 
          roughness={0.1} 
          metalness={0.1}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Gold visor */}
      <mesh position={[0, 0.95, 0.32]}>
        <sphereGeometry args={[0.25, 16, 8]} />
        <meshStandardMaterial 
          color="#ffd700" 
          roughness={0.05} 
          metalness={0.9}
          transparent
          opacity={0.7}
        />
      </mesh>
      
      {/* Arms in natural floating position */}
      <mesh position={[-0.6, 0.2, 0]} rotation={[0, 0, Math.PI / 6]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.8, 8]} />
        <meshStandardMaterial color="#f8f9fa" roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[0.6, 0.2, 0]} rotation={[0, 0, -Math.PI / 6]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.8, 8]} />
        <meshStandardMaterial color="#f8f9fa" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Gloves */}
      <mesh position={[-0.9, 0.5, 0]} castShadow>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#e8e8e8" roughness={0.4} metalness={0.2} />
      </mesh>
      <mesh position={[0.9, 0.5, 0]} castShadow>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#e8e8e8" roughness={0.4} metalness={0.2} />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.2, -0.8, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.8, 8]} />
        <meshStandardMaterial color="#f8f9fa" roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[0.2, -0.8, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.8, 8]} />
        <meshStandardMaterial color="#f8f9fa" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Boots */}
      <mesh position={[-0.2, -1.3, 0.1]} castShadow>
        <boxGeometry args={[0.2, 0.15, 0.4]} />
        <meshStandardMaterial color="#2c3e50" roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0.2, -1.3, 0.1]} castShadow>
        <boxGeometry args={[0.2, 0.15, 0.4]} />
        <meshStandardMaterial color="#2c3e50" roughness={0.4} metalness={0.3} />
      </mesh>
      
      {/* Life support backpack */}
      <mesh position={[0, 0, -0.3]} castShadow>
        <boxGeometry args={[0.6, 1.0, 0.2]} />
        <meshStandardMaterial color="#34495e" roughness={0.2} metalness={0.7} />
      </mesh>
    </group>
  );
};

const WeightlessnessDemo = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <section id="weightlessness" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Experience Weightlessness
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            In the microgravity environment of the ISS, everything floats! Experience what 
            it's like for astronauts living and working in weightlessness.
          </p>
          
          <div className="flex justify-center gap-4 mb-8">
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pause' : 'Play'} Simulation
            </Button>
            <Button
              onClick={() => setShowExplanation(!showExplanation)}
              variant="outline"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* 3D Weightlessness Simulation */}
        <div className="relative w-full h-[500px] rounded-lg overflow-hidden border border-border mb-12 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
          <div className="absolute top-4 right-4 z-10 bg-card/90 backdrop-blur-sm p-3 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground">
              🚀 ISS Laboratory Module - Microgravity Environment
            </p>
          </div>

          <Canvas
            camera={{
              position: [0, 2, 8],
              fov: 50,
            }}
            shadows
            gl={{ antialias: true, alpha: true }}
          >
            {/* Professional lighting setup */}
            <ambientLight intensity={0.3} color="#f0f8ff" />
            <directionalLight 
              position={[8, 8, 5]} 
              intensity={1.2} 
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <pointLight position={[-5, 3, -3]} intensity={0.4} color="#87ceeb" />
            <pointLight position={[5, -2, 4]} intensity={0.3} color="#ffffff" />

            {/* ISS Module interior walls with realistic materials */}
            <mesh position={[0, 0, -6]} receiveShadow>
              <planeGeometry args={[25, 12]} />
              <meshStandardMaterial 
                color="#2c3e50" 
                roughness={0.8} 
                metalness={0.2}
              />
            </mesh>
            
            <mesh position={[0, 6, 0]} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
              <planeGeometry args={[25, 12]} />
              <meshStandardMaterial 
                color="#34495e" 
                roughness={0.7} 
                metalness={0.3}
              />
            </mesh>
            
            <mesh position={[0, -6, 0]} rotation={[Math.PI/2, 0, 0]} receiveShadow>
              <planeGeometry args={[25, 12]} />
              <meshStandardMaterial 
                color="#34495e" 
                roughness={0.7} 
                metalness={0.3}
              />
            </mesh>

            {/* Floating Astronaut */}
            <FloatingAstronaut />

            {/* Floating Objects */}
            {isPlaying && (
              <>
                <FloatingTool position={[2, 1, 1]} type="wrench" />
                <FloatingTool position={[-2, 0, 2]} type="laptop" />
                <FloatingTool position={[1, -1, 0]} type="tablet" />
                <FloatingTool position={[-1, 2, -1]} type="water" />
                <FloatingTool position={[3, -0.5, 1]} type="sample" />
                <FloatingTool position={[-3, 1.5, 0]} type="multimeter" />
                <FloatingTool position={[0, 2.5, 2]} type="camera" />
              </>
            )}

            {/* Enhanced Controls */}
            <OrbitControls
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              enableDamping={true}
              dampingFactor={0.03}
              minDistance={3}
              maxDistance={18}
              maxPolarAngle={Math.PI * 0.8}
              minPolarAngle={Math.PI * 0.2}
            />
          </Canvas>
        </div>

        {/* Explanation Section */}
        {showExplanation && (
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-6 bg-card border-border">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                What is Microgravity?
              </h3>
              <p className="text-muted-foreground mb-4">
                The ISS is in a constant state of free fall, creating a microgravity environment 
                where gravity's effects are nearly eliminated. This isn't because there's no gravity 
                at that altitude, but because the station is falling toward Earth at the same 
                rate it's moving forward.
              </p>
              <p className="text-muted-foreground">
                This unique environment allows scientists to study how materials, plants, animals, 
                and humans behave without the influence of gravity.
              </p>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Daily Life in Weightlessness
              </h3>
              <p className="text-muted-foreground mb-4">
                Astronauts must adapt to a world where everything floats. They use velcro, 
                magnets, and straps to secure objects. Even sleeping requires being strapped 
                into a sleeping bag attached to the wall!
              </p>
              <p className="text-muted-foreground">
                Simple tasks like eating, drinking, and moving around require new techniques. 
                Water forms perfect spheres, and liquids must be contained carefully.
              </p>
            </Card>
          </div>
        )}

        {/* Training Information */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-card border-border text-center">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="text-2xl">🏊‍♂️</div>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Neutral Buoyancy Lab
            </h3>
            <p className="text-muted-foreground text-sm">
              Astronauts train underwater in NASA's Neutral Buoyancy Laboratory in Houston, 
              which simulates the weightless conditions of space.
            </p>
          </Card>

          <Card className="p-6 bg-card border-border text-center">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="text-2xl">🔬</div>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Scientific Benefits
            </h3>
            <p className="text-muted-foreground text-sm">
              Microgravity research leads to advances in medicine, materials science, 
              and our understanding of fundamental physics.
            </p>
          </Card>

          <Card className="p-6 bg-card border-border text-center">
            <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="text-2xl">🌍</div>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Earth Applications
            </h3>
            <p className="text-muted-foreground text-sm">
              Technologies developed for weightless environments often find applications 
              on Earth, improving life for everyone.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WeightlessnessDemo;