
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Cylinder, Stars, Environment, Line } from '@react-three/drei';
import * as THREE from 'three';

// Represents a node in the global trade network
const DataNode = ({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t + position[0]) * 0.1;
    }
  });

  return (
    <Sphere ref={ref} args={[0.5, 32, 32]} position={position} scale={scale}>
      <meshStandardMaterial
        color={color}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
};

const NetworkRing = () => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
       const t = state.clock.getElapsedTime();
       ref.current.rotation.z = t * 0.05;
       ref.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.1) * 0.1;
    }
  });

  return (
    <Torus ref={ref} args={[4, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial color="#334155" emissive="#334155" emissiveIntensity={0.2} transparent opacity={0.4} />
    </Torus>
  );
}

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#C5A059" />
        
        {/* Abstract representation of nodes (US/Mexico) connected */}
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
          <DataNode position={[-2, 1, 0]} color="#1e3a8a" scale={1.5} /> {/* US - Blue */}
          <DataNode position={[2, -1, 0]} color="#C5A059" scale={1.2} /> {/* Mexico - Gold */}
          
          {/* Connection Line */}
           <mesh position={[0,0,0]} rotation={[0,0, -0.4]}>
                <cylinderGeometry args={[0.02, 0.02, 5, 8]} />
                <meshStandardMaterial color="#94a3b8" transparent opacity={0.5} />
           </mesh>

           <NetworkRing />
        </Float>
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export const NetworkScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={1} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={1} />
        <Environment preset="studio" />
        
        <Float rotationIntensity={0.2} floatIntensity={0.1} speed={0.5}>
           <group>
                {/* Central Hub */}
                <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
                    <meshStandardMaterial color="#e5e7eb" wireframe />
                </Sphere>
                
                {/* Satellites */}
                <DataNode position={[2, 1, 0]} color="#C5A059" scale={0.4} />
                <DataNode position={[-2, -1, 1]} color="#1e3a8a" scale={0.4} />
                <DataNode position={[0, 2, -1]} color="#475569" scale={0.3} />
                
                {/* Lines */}
                <Line points={[[0,0,0], [2,1,0]]} color="gray" lineWidth={1} transparent opacity={0.2} />
                <Line points={[[0,0,0], [-2,-1,1]]} color="gray" lineWidth={1} transparent opacity={0.2} />
                <Line points={[[0,0,0], [0,2,-1]]} color="gray" lineWidth={1} transparent opacity={0.2} />
           </group>
        </Float>
      </Canvas>
    </div>
  );
}
