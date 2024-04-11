import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import './HomePage.css';

function HomePage() {
  const mountRef = useRef(null);
  const frameIdRef = useRef(null);
  const portalRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    const mount = mountRef.current;
    mount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    camera.add(pointLight);
    scene.add(camera);

    const loader = new GLTFLoader();
    loader.load('./assets/models/home/portal.glb', (gltf) => {
      gltf.scene.scale.set(0.15, 0.15, 0.15);
      gltf.scene.position.set(-0.7, 0.9, 0.8);
      portalRef.current = gltf.scene;
      scene.add(gltf.scene);
    });

    loader.load('./assets/models/home/scene.gltf', (gltf) => {
      scene.add(gltf.scene);
    });

    camera.position.set(1, 1.2, 1);
    camera.lookAt(new THREE.Vector3(-2, 1.2, -2));

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    renderer.domElement.addEventListener('mousemove', onMouseMove);

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(portalRef.current, true);
      if (intersects.length > 0) {
        animateCameraToLookAt( {x: -0.7, y: 1.15, z: 0.8} , 1000, () => {
          animateCameraToPosition({ x: -0.7, y: 1.15, z: 0.8 }, 1000, () => {
            console.log('Changement de page');
            window.location.href = 'https://google.com';
          });
        });
      }
    };
    renderer.domElement.addEventListener('click', onClick);

    const animateCameraToLookAt = (targetPosition, duration, onComplete) => {
      let startTime = Date.now();
      const initialQuaternion = camera.quaternion.clone();
      const targetQuaternion = new THREE.Quaternion().setFromRotationMatrix(
        new THREE.Matrix4().lookAt(camera.position, targetPosition, new THREE.Vector3(0, 1, 0))
      );
    
      const animate = () => {
        let elapsedTime = Date.now() - startTime;
        let fraction = elapsedTime / duration;
        if (fraction < 1) {
          camera.quaternion.slerpQuaternions(initialQuaternion, targetQuaternion, fraction);
          requestAnimationFrame(animate);
        } else {
          camera.quaternion.copy(targetQuaternion);
          if (onComplete) onComplete();
        }
        renderer.render(scene, camera);
      };
      animate();
    };
    
    const animateCameraToPosition = (targetPosition, duration, onComplete) => {
      let startTime = Date.now();
      const startPosition = camera.position.clone();

      const animate = () => {
        let elapsedTime = Date.now() - startTime;
        let fraction = elapsedTime / duration;

        if (fraction < 1) {
          const newPosition = new THREE.Vector3().lerpVectors(startPosition, targetPosition, fraction);
          camera.position.set(newPosition.x, newPosition.y, newPosition.z);
          requestAnimationFrame(animate);
        } else {
          camera.position.set(targetPosition.x, targetPosition.y, targetPosition.z);
          if (onComplete) onComplete();
        }
        renderer.render(scene, camera);
      };
      animate();
    };

    const renderLoop = () => {
      frameIdRef.current = requestAnimationFrame(renderLoop);
      renderer.render(scene, camera);
    };
    renderLoop();

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
  
    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      cancelAnimationFrame(frameIdRef.current);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('click', onClick);
      if (mount && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <section id='home' ref={mountRef}></section>;
}

export default HomePage;