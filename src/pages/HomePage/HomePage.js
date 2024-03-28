import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import './HomePage.css';

function HomePage() {
  const mountRef = useRef(null);
  const frameIdRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    const currentMount = mountRef.current;
    currentMount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    camera.add(pointLight);
    scene.add(camera);

    scene.background = new THREE.TextureLoader().load('./assets/imgs/jw.jpg');

    const loader = new GLTFLoader();
    loader.load('./assets/models/home/scene.gltf', (gltf) => {
      scene.add(gltf.scene);
    }, undefined, (error) => {
      console.error(error);
    });

    const bloc_texture = new THREE.TextureLoader().load('./assets/imgs/jw.jpg', function (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.offset.set(0, 0);
      texture.repeat.set(1, 1);
    });

    const bloc_material = new THREE.MeshBasicMaterial({ map: bloc_texture });
    const bloc_geometry = new THREE.BoxGeometry(2, 2, 1);
    const bloc = new THREE.Mesh(bloc_geometry, bloc_material);
    bloc.position.set(0.5, 1.5, -2);

    scene.add(bloc);
    camera.position.set(1, 1.2, 1);

    camera.lookAt(new THREE.Vector3(-2, 1.2, -2));


    const lamp = new THREE.PointLight(0xff0000, 1, 100);
    lamp.position.set(0, 2, 0);
    scene.add(lamp);

    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    const handleWindowResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    const debounceResize = (function () {
      let timeout;
      return function () {
        clearTimeout(timeout);
        timeout = setTimeout(handleWindowResize, 100);
      };
    })();

    window.addEventListener('resize', debounceResize);

    return () => {
      cancelAnimationFrame(frameIdRef.current);
      window.removeEventListener('resize', debounceResize);

      scene.traverse(function (object) {
        if (object.isMesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => disposeMaterial(material));
          } else {
            disposeMaterial(object.material);
          }
        }
      });

      renderer.dispose();

      function disposeMaterial(material) {
        Object.keys(material).forEach((prop) => {
          const value = material[prop];
          if (value && typeof value.dispose === 'function') {
            value.dispose();
          }
        });
        material.dispose();
      }
    };
  }, []);

  return <section id='home' ref={mountRef} />;
}

export default HomePage;
