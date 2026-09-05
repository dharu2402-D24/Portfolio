import { Canvas } from "@react-three/fiber";
import {
  Center,
  Float,
  PresentationControls,
  useGLTF,
} from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";

// Pre-warm the GLB so it's cached before the component mounts
useGLTF.preload(`${import.meta.env.BASE_URL}keychain.glb`);

function KeychainModel() {
  const { scene } = useGLTF(`${import.meta.env.BASE_URL}keychain.glb`);

  useEffect(() => {
    scene.traverse((child: any) => {
      if (!child.isMesh) return;

      const material = child.material;

      // Keep the GLB's existing material/maps.
      // Only tweak the properties we actually need.
      if (material) {
        material.roughness = 0.35;
        material.metalness = 0.5;
        material.envMapIntensity = 1;
        material.needsUpdate = true;
      }
    });
  }, [scene]);

  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}

export function InteractiveRenderScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0,
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        className="absolute inset-[-10%] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 60%)",
        }}
      />

      <div
        ref={containerRef}
        className="relative w-full h-full"
      >
        <Canvas
          camera={{ position: [0, 0, 9], fov: 45 }}
          dpr={[1, 1.5]}
          frameloop={visible ? "always" : "never"}
          gl={{ alpha: true }}
        >
          {/* Main light */}
          <ambientLight intensity={2.2} />

          {/* Key light */}
          <directionalLight
            position={[10, 10, 10]}
            intensity={2}
          />

          {/* Soft fill/rim */}
          <hemisphereLight
            args={["#ffffff", "#444444", 1.2]}
          />

          <Suspense fallback={null}>
            <PresentationControls
              global
              config={{ mass: 2, tension: 500 }}
              snap={{ mass: 4, tension: 1500 }}
              rotation={[0.1, -0.15, 0]}
              polar={[-Math.PI / 3, Math.PI / 3]}
              azimuth={[-Math.PI / 1.4, Math.PI / 2]}
            >
              <Float
                speed={2}
                rotationIntensity={0.5}
                floatIntensity={1.5}
              >
                <KeychainModel />
              </Float>
            </PresentationControls>
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}