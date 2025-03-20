import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import { useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useThree } from "@react-three/fiber";

// const Earth = () => {
//   const earth = useGLTF("/scene.gltf");
//   return (
//     <primitive object={earth.scene} scale={3} position-y={0} rotation-y={0} />
//   );
// };


const Earth = () => {
  const [model, setModel] = useState(null);
  const { scene } = useThree(); // الوصول إلى المشهد الرئيسي

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      "/scene.gltf",
      (gltf) => {
        setModel(gltf.scene); // حفظ المشهد المُحمّل في الـ state
      },
      undefined,
      (error) => {
        console.error("❌ فشل تحميل النموذج:", error);
      }
    );
  }, []);

  if (!model) return null; // لا تعرض أي شيء حتى يتم تحميل النموذج

  return <primitive object={model} scale={3} position={[0, 0, 0]} rotation={[0, 0, 0]} />;
};
const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={null}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
