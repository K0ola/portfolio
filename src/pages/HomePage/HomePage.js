import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { WebGLRenderer } from 'three';
import './HomePage.css';

function HomePage() {
  const mountRef = useRef(null);
  const frameIdRef = useRef(null);
  const portalRef = useRef(null);
  const cameraRef = useRef(null);
  const [isUIHidden, setIsUIHidden] = useState(false);
  const [tooltip, setTooltip] = useState({ show: false, text: '', x: 0, y: 0 });

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current = camera;
    scene.add(camera);

    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const mount = mountRef.current;
    mount.appendChild(renderer.domElement);

    
    
    //LIGHTS -----------------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.05);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xFFFFFF, 0.05);
    directionalLight2.position.set(1, 1, 0);
    scene.add(directionalLight2);

    const pointLight = new THREE.PointLight(0xFF00FF, 0.5);
    pointLight.position.set(1, 3, 1);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x00FFFF, 0.5);
    pointLight2.position.set(-1, 3, 1);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xFFFF00, 0.5);
    pointLight3.position.set(1, 3, -1);
    scene.add(pointLight3);

    const pointLight4 = new THREE.PointLight(0x00FF00, 0.5);
    pointLight4.position.set(5, 3, 5);
    scene.add(pointLight4);


// -------------------------------------------------------------------------------

    
    
    
    
    const loader = new GLTFLoader();
    loader.load('./assets/models/home/portal.glb', (gltf) => {
      gltf.scene.scale.set(0.15, 0.15, 0.15);
      gltf.scene.position.set(-0.8, 0.9, 0.8);
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

    function onMouseMove(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(portalRef.current, true);
      if (intersects.length > 0) {
        renderer.domElement.style.cursor = 'pointer';
        setTooltip({ show: true, text: 'Cliquez pour découvrir mon Portfolio 3D', x: event.clientX, y: event.clientY });
      } else {
        renderer.domElement.style.cursor = 'auto';
        setTooltip(prevTooltip => ({ ...prevTooltip, show: false }));
      }
    }
    window.addEventListener('mousemove', onMouseMove);
    
    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(portalRef.current, true);
      if (intersects.length > 0) {
        setTooltip({ show: false, text: '', x: 0, y: 0 });
        renderer.domElement.style.cursor = 'auto';
        setIsUIHidden(true);
        animateCameraToLookAt( {x: -0.75, y: 1.1, z: 0.8} , 1000, () => {
          animateCameraToPosition({ x: -0.75, y: 1.1, z: 0.8 }, 1000, () => {
            console.log('Changement de page');
            window.location.href = 'https://my-world.arthur-zachary.dev';
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
  }, [setTooltip]);


  return (
    <section id='home' ref={mountRef}>
      <div id='me' className={isUIHidden ? 'hidden' : ''}>
        <h2>Arthur Zachary</h2>
        <h3>Créatif Web Developpeur</h3>
      </div>
      {tooltip.show && (
        <div className="tooltip"  style={{ top: `${tooltip.y}px`, left: `${tooltip.x}px` }}>
          {tooltip.text}
        </div>
      )}
    </section>
  );
}

export default HomePage;