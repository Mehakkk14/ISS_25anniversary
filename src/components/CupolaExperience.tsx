import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Eye, RotateCcw, Home, Maximize2 } from 'lucide-react';

// Ultra-realistic Earth as seen from ISS
const EarthFromISS = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const [time, setTime] = useState(0);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Ultra-realistic Earth rotation (15.04 degrees per hour)
      meshRef.current.rotation.y += delta * 0.04;
    }
    if (cloudsRef.current) {
      // Independent cloud movement
      cloudsRef.current.rotation.y += delta * 0.06;
    }
    setTime(time + delta);
  });

  // Photo-realistic Earth material
  const earthMaterial = useMemo(() => {
    return new THREE.MeshPhongMaterial({
      color: new THREE.Color(0x004080), // Deep ocean blue from space
      shininess: 200,
      specular: new THREE.Color(0x666666),
      transparent: false,
    });
  }, []);

  // Realistic continental landmasses
  const continentsMaterial = useMemo(() => {
    return new THREE.MeshLambertMaterial({
      color: new THREE.Color(0x1a5d1a), // Dark forest green visible from space
      transparent: true,
      opacity: 0.95,
    });
  }, []);

  // Enhanced atmospheric glow with Rayleigh scattering
  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        glowColor: { value: new THREE.Color(0x4a90e2) },
        viewVector: { value: new THREE.Vector3() },
        c: { value: 0.1 },
        p: { value: 5.0 }
      },
      vertexShader: `
        uniform vec3 viewVector;
        uniform float c;
        uniform float p;
        varying float intensity;
        void main() {
          vec3 vNormal = normalize(normalMatrix * normal);
          vec3 vNormel = normalize(normalMatrix * viewVector);
          intensity = pow(c - dot(vNormal, vNormel), p);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        void main() {
          vec3 glow = glowColor * intensity;
          gl_FragColor = vec4(glow, intensity);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
  }, []);

  // Realistic cloud material with opacity variation
  const cloudMaterial = useMemo(() => {
    return new THREE.MeshLambertMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.4,
      alphaTest: 0.1,
    });
  }, []);

  // City lights for night side
  const cityLightsMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: 0xffaa00,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  return (
    <group>
      {/* Main Earth sphere with photo-realistic oceans */}
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[3, 256, 256]} />
        <primitive object={earthMaterial} />
      </mesh>
      
      {/* Continental landmasses with realistic detail */}
      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[3.001, 128, 128]} />
        <primitive object={continentsMaterial} />
      </mesh>
      
      {/* Dynamic cloud formations */}
      <mesh ref={cloudsRef} position={[0, 0, 0]}>
        <sphereGeometry args={[3.005, 96, 96]} />
        <primitive object={cloudMaterial} />
      </mesh>
      
      {/* City lights on night side */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[3.002, 64, 64]} />
        <primitive object={cityLightsMaterial} />
      </mesh>
      
      {/* Atmospheric glow visible from space */}
      <mesh ref={atmosphereRef} position={[0, 0, 0]}>
        <sphereGeometry args={[3.2, 32, 32]} />
        <primitive object={atmosphereMaterial} />
      </mesh>
    </group>
  );
};

// Realistic ISS equipment floating in microgravity
const FloatingObject = ({ position, scale = 1, color = "#ffffff", type = "tool" }: { 
  position: [number, number, number]; 
  scale?: number; 
  color?: string; 
  type?: 'tool' | 'tablet' | 'camera' | 'sample' | 'notebook';
}) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Complex floating motion with multiple axes
      const t = state.clock.elapsedTime + position[0] * 10;
      
      meshRef.current.position.x = position[0] + Math.sin(t * 0.3) * 0.8;
      meshRef.current.position.y = position[1] + Math.cos(t * 0.4) * 0.6 + Math.sin(t * 0.6) * 0.3;
      meshRef.current.position.z = position[2] + Math.sin(t * 0.2) * 0.5;
      
      // Realistic tumbling motion
      meshRef.current.rotation.x += 0.008;
      meshRef.current.rotation.y += 0.012;
      meshRef.current.rotation.z += 0.005;
    }
  });

  const getRealisticGeometry = () => {
    switch (type) {
      case 'tool':
        return (
          <group>
            <mesh>
              <boxGeometry args={[0.6, 0.15, 0.1]} />
              <meshStandardMaterial color="#c0392b" roughness={0.3} metalness={0.7} />
            </mesh>
            <mesh position={[0.2, 0, 0]}>
              <cylinderGeometry args={[0.03, 0.03, 0.4]} />
              <meshStandardMaterial color="#2c3e50" roughness={0.1} metalness={0.9} />
            </mesh>
          </group>
        );
      case 'tablet':
        return (
          <group>
            <mesh>
              <boxGeometry args={[0.4, 0.25, 0.015]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.1} />
            </mesh>
            <mesh position={[0, 0, 0.008]}>
              <planeGeometry args={[0.35, 0.2]} />
              <meshBasicMaterial color="#0088ff" />
            </mesh>
          </group>
        );
      case 'camera':
        return (
          <group>
            <mesh>
              <boxGeometry args={[0.3, 0.2, 0.15]} />
              <meshStandardMaterial color="#2c3e50" roughness={0.2} metalness={0.3} />
            </mesh>
            <mesh position={[0.1, 0, 0.08]}>
              <cylinderGeometry args={[0.08, 0.08, 0.1]} />
              <meshStandardMaterial color="#34495e" roughness={0.1} metalness={0.8} />
            </mesh>
          </group>
        );
      case 'sample':
        return (
          <mesh>
            <cylinderGeometry args={[0.08, 0.08, 0.2]} />
            <meshStandardMaterial color="#27ae60" roughness={0.4} metalness={0.2} transparent opacity={0.8} />
          </mesh>
        );
      case 'notebook':
        return (
          <mesh>
            <boxGeometry args={[0.3, 0.4, 0.02]} />
            <meshStandardMaterial color="#f39c12" roughness={0.8} metalness={0.0} />
          </mesh>
        );
      default:
        return (
          <mesh>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshStandardMaterial color={color} roughness={0.3} metalness={0.5} />
          </mesh>
        );
    }
  };

  return (
    <group ref={meshRef} position={position} scale={scale}>
      {getRealisticGeometry()}
    </group>
  );
};

const CupolaExperience = () => {
  const [viewMode, setViewMode] = useState<'cupola' | 'orbit'>('cupola');

  return (
    <section id="cupola" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            ISS Cupola Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Experience the breathtaking view from the ISS Cupola - "the window to the world." 
            Witness Earth as astronauts see it, while experiencing the weightlessness of space.
          </p>
          
          <div className="flex justify-center gap-4 mb-8">
            <Button
              onClick={() => setViewMode('cupola')}
              variant={viewMode === 'cupola' ? 'default' : 'outline'}
              className="flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Cupola View
            </Button>
            <Button
              onClick={() => setViewMode('orbit')}
              variant={viewMode === 'orbit' ? 'default' : 'outline'}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Orbital View
            </Button>
          </div>
        </div>

        {/* 3D Scene */}
        <div className="relative w-full h-[600px] rounded-lg overflow-hidden border border-border mb-12">
          {/* Instructions overlay */}
          <div className="absolute top-4 left-4 z-10 bg-card/90 backdrop-blur-sm p-4 rounded-lg border border-border max-w-sm">
            <h4 className="font-semibold text-sm mb-2">ISS Cupola Controls</h4>
            <p className="text-xs text-muted-foreground mb-2">
              • Drag to look around Earth
            </p>
            <p className="text-xs text-muted-foreground mb-2">
              • Scroll to zoom in/out
            </p>
            <p className="text-xs text-muted-foreground">
              • Watch objects float in weightlessness
            </p>
          </div>

          <Canvas
            camera={{
              position: viewMode === 'cupola' ? [0, 2, 6] : [0, 0, 10],
              fov: viewMode === 'cupola' ? 85 : 50,
            }}
            shadows="soft"
            gl={{ 
              antialias: true, 
              alpha: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.0
            }}
          >
            {/* Ultra-realistic space environment */}
            <Stars radius={500} depth={100} count={8000} factor={12} saturation={0.2} />
            <Environment preset="night" />
            
            {/* Professional ISS lighting setup */}
            <ambientLight intensity={0.05} color="#1a237e" />
            
            {/* Sun simulation - intense directional */}
            <directionalLight
              position={[20, 15, 10]}
              intensity={3.5}
              color="#ffffff"
              castShadow
              shadow-mapSize-width={4096}
              shadow-mapSize-height={4096}
              shadow-camera-near={0.1}
              shadow-camera-far={100}
              shadow-camera-left={-15}
              shadow-camera-right={15}
              shadow-camera-top={15}
              shadow-camera-bottom={-15}
              shadow-bias={-0.0001}
            />
            
            {/* Earth albedo - blue planet reflection */}
            <pointLight position={[0, -8, 5]} intensity={1.2} color="#4fc3f7" />
            
            {/* ISS interior ambient lighting */}
            <pointLight position={[3, 3, 3]} intensity={0.7} color="#f5f5f5" />
            <pointLight position={[-3, 2, -2]} intensity={0.4} color="#fff3e0" />
            
            {/* Cupola window frame lighting */}
            <spotLight 
              position={[0, 4, 0]} 
              intensity={0.6} 
              angle={Math.PI / 3} 
              penumbra={0.5}
              color="#ffffff"
              castShadow
            />

            {/* Enhanced atmospheric depth */}
            <fog attach="fog" args={['#000011', 30, 150]} />

            {/* Earth */}
            <EarthFromISS />

            {/* Realistic ISS equipment floating */}
            <FloatingObject position={[2.5, 1.2, 1.8]} type="tool" scale={1} />
            <FloatingObject position={[-2.2, 0.8, 2.1]} type="tablet" scale={1.1} />
            <FloatingObject position={[1.8, -1.1, 0.5]} type="camera" scale={0.9} />
            <FloatingObject position={[-1.5, 2.2, -0.8]} type="sample" scale={0.8} />
            <FloatingObject position={[3.1, -0.3, 1.2]} type="notebook" scale={1.2} />
            <FloatingObject position={[-2.8, 1.8, 0.2]} type="tool" scale={0.7} />
            <FloatingObject position={[0.5, 2.8, 2.5]} type="sample" scale={1} />

            {/* Enhanced ISS Cupola controls for realistic viewing */}
            <OrbitControls
              enableZoom={true}
              enablePan={viewMode === 'cupola'}
              enableDamping={true}
              dampingFactor={0.05}
              rotateSpeed={0.4}
              zoomSpeed={0.8}
              minDistance={viewMode === 'cupola' ? 1.5 : 3}
              maxDistance={viewMode === 'cupola' ? 12 : 25}
              minPolarAngle={viewMode === 'cupola' ? Math.PI / 6 : 0}
              maxPolarAngle={viewMode === 'cupola' ? (5 * Math.PI) / 6 : Math.PI}
              target={[0, 0, 0]}
              autoRotate={viewMode !== 'cupola'}
              autoRotateSpeed={0.3}
            />
          </Canvas>
        </div>

        {/* Educational content */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-card border-border">
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              The Cupola Module
            </h3>
            <p className="text-muted-foreground">
              The Cupola is the ISS's panoramic observation deck with seven windows, 
              providing 360-degree views of Earth and space. It's where astronauts 
              conduct Earth observations and control robotic operations.
            </p>
          </Card>
          
          <Card className="p-6 bg-card border-border">
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              Weightlessness Experience
            </h3>
            <p className="text-muted-foreground">
              In microgravity, objects float freely as shown in the simulation. 
              This environment allows unique scientific experiments impossible 
              on Earth, advancing our understanding of physics, biology, and materials.
            </p>
          </Card>
          
          <Card className="p-6 bg-card border-border">
            <h3 className="text-xl font-semibold mb-4 text-foreground">
              Earth Observation
            </h3>
            <p className="text-muted-foreground">
              From the ISS, astronauts monitor weather patterns, natural disasters, 
              climate change, and urban development. This data helps scientists 
              understand and protect our planet.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CupolaExperience;