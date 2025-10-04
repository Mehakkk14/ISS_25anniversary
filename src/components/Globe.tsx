import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Enhanced Earth sphere component with realistic appearance
const EarthSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  // Rotate the sphere continuously
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.08;
    }
  });

  // Create realistic Earth materials with enhanced properties
  const earthMaterial = useMemo(() => {
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color(0x0077be), // Deep ocean blue
      shininess: 150,
      specular: new THREE.Color(0x555555),
      transparent: false,
    });
    return material;
  }, []);

  // Enhanced continental landmasses with better colors
  const continentsMaterial = useMemo(() => {
    const material = new THREE.MeshLambertMaterial({
      color: new THREE.Color(0x1a4d1a), // Deep forest green
      transparent: true,
      opacity: 0.95,
    });
    return material;
  }, []);

  // More realistic cloud layer
  const cloudMaterial = useMemo(() => {
    const material = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.3,
      alphaTest: 0.05,
    });
    return material;
  }, []);

  // Enhanced atmospheric glow with improved shader
  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { value: new THREE.Color(0x3b82f6) }, // Blue atmosphere
        viewVector: { value: new THREE.Vector3() },
        c: { value: 0.15 },
        p: { value: 4.0 }
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
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
  }, []);

  // City lights material for night side
  const cityLightsMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: 0xffaa00,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  return (
    <group>
      {/* Earth surface with realistic oceans */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[2, 128, 128]} />
        <primitive object={earthMaterial} />
      </mesh>
      
      {/* Continental landmasses with better detail */}
      <mesh castShadow>
        <sphereGeometry args={[2.001, 96, 96]} />
        <primitive object={continentsMaterial} />
      </mesh>
      
      {/* Dynamic cloud layer with realistic movement */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[2.005, 64, 64]} />
        <primitive object={cloudMaterial} />
      </mesh>
      
      {/* City lights (subtle night glow) */}
      <mesh>
        <sphereGeometry args={[2.002, 64, 64]} />
        <primitive object={cityLightsMaterial} />
      </mesh>
      
      {/* Enhanced atmospheric glow */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[2.15, 32, 32]} />
        <primitive object={atmosphereMaterial} />
      </mesh>
    </group>
  );
};

const Globe = () => {
  const [viewMode, setViewMode] = useState<'earth' | 'iss'>('earth');

  return (
    <div id="globe-container" className="w-full h-[400px] md:h-[500px] my-8 relative">
      {/* Instructions overlay */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-border">
        <p className="text-xs text-muted-foreground">
          {viewMode === 'earth' ? 'Earth as seen from ISS' : 'ISS orbital view'} • Click and drag to rotate • Scroll to zoom
        </p>
      </div>
      <Canvas
        camera={{
          position: [0, 0, 5.5],
          fov: 50,
        }}
        shadows="soft"
        gl={{ 
          antialias: true, 
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
      >
        {/* Enhanced space environment */}
        <Stars radius={300} depth={60} count={5000} factor={8} saturation={0.3} />
        <Environment preset="night" />
        
        {/* Realistic lighting setup */}
        <ambientLight intensity={0.08} color="#1e3a8a" />
        
        {/* Sun simulation - stronger directional light */}
        <directionalLight
          position={[15, 8, 10]}
          intensity={2.5}
          castShadow
          color="#ffffff"
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.1}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        {/* Earth albedo - realistic blue reflection */}
        <pointLight position={[-10, -6, -10]} intensity={0.6} color="#2563eb" />
        
        {/* Atmospheric scattering simulation */}
        <pointLight position={[0, 12, 8]} intensity={0.3} color="#dbeafe" />
        
        {/* Rim lighting for depth */}
        <pointLight position={[0, 0, -12]} intensity={0.4} color="#1e40af" />

        {/* Earth sphere */}
        <EarthSphere />

        {/* Enhanced orbit controls for realistic viewing */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableDamping={true}
          dampingFactor={0.05}
          rotateSpeed={0.3}
          zoomSpeed={0.8}
          minDistance={3}
          maxDistance={20}
          autoRotate={true}
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={(5 * Math.PI) / 6}
        />
      </Canvas>
    </div>
  );
};

export default Globe;
