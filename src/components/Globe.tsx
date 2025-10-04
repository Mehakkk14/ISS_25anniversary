import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Earth sphere component with rotation
const EarthSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Rotate the sphere continuously
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* Earth-sized sphere geometry */}
      <sphereGeometry args={[2, 64, 64]} />
      {/* Blue material representing Earth */}
      <meshStandardMaterial
        color="#1e40af"
        roughness={0.7}
        metalness={0.2}
      />
    </mesh>
  );
};

const Globe = () => {
  return (
    <div id="globe-container" className="w-full h-[400px] md:h-[500px] my-8">
      <Canvas
        camera={{
          position: [0, 0, 6],
          fov: 45,
        }}
      >
        {/* Ambient light for general illumination */}
        <ambientLight intensity={0.3} />
        
        {/* Directional light as main light source */}
        <directionalLight
          position={[5, 3, 5]}
          intensity={1.5}
          castShadow
        />
        
        {/* Point light for additional glow */}
        <pointLight position={[-5, -3, -5]} intensity={0.5} color="#ffffff" />

        {/* Earth sphere */}
        <EarthSphere />

        {/* Orbit controls for mouse interaction */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={4}
          maxDistance={10}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
};

export default Globe;
