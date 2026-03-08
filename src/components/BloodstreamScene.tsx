import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BloodCells = ({ count = 60 }: { count?: number }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
      ] as [number, number, number],
      speed: Math.random() * 0.3 + 0.1,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      scale: Math.random() * 0.3 + 0.15,
      phase: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    particles.forEach((p, i) => {
      dummy.position.set(
        p.position[0] + Math.sin(t * p.speed + p.phase) * 2,
        p.position[1] + Math.cos(t * p.speed * 0.7 + p.phase) * 1.5,
        p.position[2] + Math.sin(t * p.speed * 0.5) * 1
      );
      dummy.rotation.x = t * p.rotSpeed;
      dummy.rotation.z = t * p.rotSpeed * 0.5;
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <torusGeometry args={[1, 0.4, 12, 24]} />
      <meshStandardMaterial
        color="#FF2E63"
        emissive="#FF2E63"
        emissiveIntensity={0.3}
        roughness={0.3}
        metalness={0.1}
        transparent
        opacity={0.7}
      />
    </instancedMesh>
  );
};

const FloatingParticles = ({ count = 200 }: { count?: number }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.02;
    pointsRef.current.rotation.x = Math.sin(t * 0.01) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#FF2E63"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const BloodstreamScene = () => {
  return (
    <div className="fixed inset-0" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} color="#FF2E63" intensity={1} />
        <pointLight position={[-10, -5, 5]} color="#00F0FF" intensity={0.5} />
        <pointLight position={[0, -10, 0]} color="#FF2E63" intensity={0.3} />
        <fog attach="fog" args={["#0A0A12", 8, 30]} />
        <BloodCells count={40} />
        <FloatingParticles count={150} />
      </Canvas>
    </div>
  );
};

export default BloodstreamScene;
