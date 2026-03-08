import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const EnergyParticles = ({ count = 400 }: { count?: number }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, [count]);

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.random();
      if (r < 0.5) {
        // Signal Red particles
        col[i * 3] = 0.85;
        col[i * 3 + 1] = 0.15;
        col[i * 3 + 2] = 0.15;
      } else if (r < 0.8) {
        // Quantum Cyan
        col[i * 3] = 0.0;
        col[i * 3 + 1] = 0.9;
        col[i * 3 + 2] = 1.0;
      } else {
        // Solar Orange
        col[i * 3] = 1.0;
        col[i * 3 + 1] = 0.6;
        col[i * 3 + 2] = 0.1;
      }
    }
    return col;
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.012;
    pointsRef.current.rotation.x = Math.sin(t * 0.006) * 0.15;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

const PulseRing = ({ radius, speed, color }: { radius: number; speed: number; color: string }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.z = t * speed;
    ref.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.2) * 0.3;
    const s = 1 + Math.sin(t * 1.5) * 0.03;
    ref.current.scale.set(s, s, s);
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.012, 16, 120]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={0.25} />
    </mesh>
  );
};

const FusionCore = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const s = 1 + Math.sin(t * 2) * 0.1;
    ref.current.scale.set(s, s, s);
  });

  return (
    <mesh ref={ref} position={[0, 0, -5]}>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshStandardMaterial
        color="#D93636"
        emissive="#D93636"
        emissiveIntensity={1.5}
        transparent
        opacity={0.3}
      />
    </mesh>
  );
};

const SpaceScene = () => {
  return (
    <div className="fixed inset-0" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 18], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} color="#D93636" intensity={0.8} />
        <pointLight position={[-10, -5, 5]} color="#00F0FF" intensity={0.4} />
        <pointLight position={[0, -10, 0]} color="#FF8C00" intensity={0.3} />
        <fog attach="fog" args={["#08080F", 12, 40]} />
        <FusionCore />
        <EnergyParticles count={350} />
        <PulseRing radius={4} speed={0.12} color="#D93636" />
        <PulseRing radius={6} speed={-0.08} color="#00F0FF" />
        <PulseRing radius={8} speed={0.05} color="#FF8C00" />
      </Canvas>
    </div>
  );
};

export default SpaceScene;
