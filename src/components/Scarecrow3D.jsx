import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";

function StationaryScarecrow() {
  const headRef = useRef();

  // This only tracks the mouse to rotate the head
  useFrame((state) => {
    // Calculate where the head should look based on mouse pointer
    const target = new THREE.Vector3(
      state.pointer.x * 5, 
      state.pointer.y * 5 + 1.5, 
      5 
    );
    // Smoothly rotate the head to look at the target
    headRef.current.lookAt(target);
  });

  return (
    // Scaled up slightly and positioned to fit perfectly inside the box
    <group position={[0, -1.8, 0]} scale={1.3}>
      {/* WOODEN POLE (Body) */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 3]} />
        <meshStandardMaterial color="#78350f" />
      </mesh>

      {/* ARMS */}
      <mesh position={[0, 0.8, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 2.5]} />
        <meshStandardMaterial color="#78350f" />
      </mesh>

      {/* SHIRT */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[1, 1.2, 0.6]} />
        <meshStandardMaterial color="#ea580c" />
      </mesh>

      {/* MOVING HEAD GROUP */}
      <group ref={headRef} position={[0, 1.6, 0]}>
        {/* Head */}
        <mesh>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial color="#fcd34d" roughness={0.8} />
        </mesh>
        {/* Left Eye */}
        <mesh position={[-0.2, 0.1, 0.55]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        {/* Right Eye */}
        <mesh position={[0.2, 0.1, 0.55]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        {/* Cheeks */}
        <mesh position={[-0.3, -0.1, 0.52]}>
          <circleGeometry args={[0.08, 16]} />
          <meshBasicMaterial color="#f87171" />
        </mesh>
        <mesh position={[0.3, -0.1, 0.52]}>
          <circleGeometry args={[0.08, 16]} />
          <meshBasicMaterial color="#f87171" />
        </mesh>
        {/* Straw Hat */}
        <mesh position={[0, 0.7, 0]} rotation={[-0.1, 0, 0]}>
          <coneGeometry args={[1, 0.8, 32]} />
          <meshStandardMaterial color="#b45309" roughness={1} />
        </mesh>
        {/* Hat Brim */}
        <mesh position={[0, 0.3, 0]} rotation={[-0.1, 0, 0]}>
          <cylinderGeometry args={[1, 1, 0.05, 32]} />
          <meshStandardMaterial color="#b45309" roughness={1} />
        </mesh>
      </group>
    </group>
  );
}

export default function ScarecrowCanvas() {
  const [rootElement, setRootElement] = useState(null);

  useEffect(() => {
    // Tracks the mouse across the whole webpage, not just the small 3D box
    setRootElement(document.getElementById("root"));
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {rootElement && (
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }} eventSource={rootElement}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          
          {/* Subtle float to make it look alive, but staying in place */}
          <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
            <StationaryScarecrow />
          </Float>
          
          <Environment preset="city" />
        </Canvas>
      )}
    </div>
  );
}