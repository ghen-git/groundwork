import { Canvas, useFrame } from '@react-three/fiber';
import * as NavigationBar from 'expo-navigation-bar';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import TouchControl, { getCameraOffset, resetCameraUpdate, shouldUpdateCamera } from './TouchControl';
import { Matrix4, Quaternion, Vector3 } from 'three';
import { ReactNode } from 'react';
import { animated } from '@react-spring/three';


export default function App() {
  NavigationBar.setBackgroundColorAsync("black");

  return <SafeAreaView style={{width: '100%', height: '100%', backgroundColor: '#111111'}}>
      <StatusBar
          animated={true}
          backgroundColor="black"
        />
      <Canvas camera={{ position: [0, 0, 5], fov: 70, near: 1, far: 20 }}>
          <ambientLight />
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="cyan" />
          </mesh> 
          <mesh position={[-5, 0, 0]}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="cyan" />
          </mesh> 
          <mesh position={[5, 0, 0]}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="cyan" />
          </mesh> 
          <mesh position={[0, 0, -5]}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="cyan" />
          </mesh> 
          <mesh position={[-5, 0, -5]}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="cyan" />
          </mesh> 
          <mesh position={[5, 0, -5]}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="cyan" />
          </mesh> 
          <mesh position={[0,1,1]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh> 
          <CameraRig/>
      </Canvas>
      <TouchControl/>
  </SafeAreaView>;
}

function CameraRig(): ReactNode {
  useFrame((state, delta) => {
    if(shouldUpdateCamera())
    {
      const displacement = getCameraOffset();
      state.camera.position.setX(state.camera.position.x - displacement.x);
      state.camera.position.setY(state.camera.position.y + displacement.y);
      resetCameraUpdate();
    }
  })

  return;
}