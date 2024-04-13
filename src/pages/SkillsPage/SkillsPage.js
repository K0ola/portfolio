import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import './SkillsPage.css';

function SkillsPage() {
  const sceneRef = useRef(null);
  const orbitDataRef = useRef([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef(0);

  useEffect(() => {
    const orbitData = orbitDataRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const domElement = sceneRef.current;
    domElement.appendChild(renderer.domElement);

    const light = new THREE.PointLight(0xFF0000, 1, 100);
    light.position.set(0, 8, 5);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xFF0000, 0.08);
    scene.add(ambientLight);


    const PointLight = new THREE.PointLight(0xFF0000, 1, 100);
    PointLight.position.set(0, 8, 0);
    scene.add(PointLight);

    // const modelLoader = new GLTFLoader();
    // modelLoader.load('assets/models/skills/cross-legged.glb', (gltf) => {
    //   gltf.scene.scale.set(0.1, 0.1, 0.1);
    //   scene.add(gltf.scene);
    // });

    camera.position.z = 4;
    camera.position.y = 1.5;

    const radius = 5;
    const fontLoader = new FontLoader();
    fontLoader.load('assets/fonts/helvetiker_regular.typeface.json', (font) => {
      const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'SCSS', 'SQL', 'Python', 'THREEJS', 'Blender', 'Photoshop', 'Illustrator', 'UI/UX', 'PHP'];
      skills.forEach((skill, index) => {
        const angle = (Math.PI * 2 / skills.length) * index;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const lighted = new THREE.DirectionalLight(0x0000FF, 0.075);
        lighted.position.set(x, 1, z);
        lighted.lookAt(x, 0, z)
        scene.add(lighted);
        const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(x, 1, z);
        scene.add(sphere);
    
        const textGeometry = new TextGeometry(skill, { font, size: 0.2, height: 0.01 });
        textGeometry.center();
        const textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff , transparent: true , opacity: 1});
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(x, 1.8, z);
        textMesh.lookAt(camera.position);
        scene.add(textMesh);
        orbitDataRef.current.push({ sphere, textMesh, lighted, angle });
      });
    });

    const onMouseMove = (event) => {
      mousePositionRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePositionRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    domElement.addEventListener('mousemove', onMouseMove, false);

    const animate = () => {
      requestAnimationFrame(animate);

      rotationRef.current += 0.0005;

      orbitDataRef.current.forEach(({ sphere, textMesh, lighted, angle }) => {
        const newAngle = angle + rotationRef.current;
        const x = Math.cos(newAngle) * radius;
        const z = Math.sin(newAngle) * radius;
      
        sphere.position.set(x, 1, z);
        textMesh.position.set(x, 1.8, z);
        lighted.position.set(x, 1, z);
      
        const mouseX = mousePositionRef.current.x;
        const mouseY = mousePositionRef.current.y;
        sphere.rotation.y = mouseX * 2 * Math.PI;
        textMesh.lookAt(camera.position.x + mouseX * 5, camera.position.y, camera.position.z + mouseY * 5);
      });

      renderer.render(scene, camera);
    };

    animate();

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      domElement.removeEventListener('mousemove', onMouseMove, false);
      renderer.dispose();

      orbitData.forEach(({ sphere, textMesh, lighted }) => {
        if (sphere.geometry) sphere.geometry.dispose();
        if (sphere.material) sphere.material.dispose();
        if (textMesh.geometry) textMesh.geometry.dispose();
        if (textMesh.material) textMesh.material.dispose();
        lighted.dispose();
        scene.remove(sphere);
        scene.remove(textMesh);
      });

      scene.children.forEach(child => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });

      domElement.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section id="skills">
      <header>
        <h1>My Skills</h1>
        <div id="3D_scene" ref={sceneRef} />
      </header>
      <div className="wrapper">
            <div className="competences-element">
                <h2>Front-End</h2>
                <p>React</p>
                <p>HTML</p>
                <p>CSS / SCSS</p>
                <p>JavaScript</p>
                <p>Bootstrap</p>


            </div>
            <div className="competences-element">
                <h2>Back-End</h2>
                <p>PHP</p>
                <p>JavaScript</p>
                <p>Git</p>
                <p>Python</p>
                <p>Node.js</p>


            </div>
            <div className="competences-element">
                <h2>Gestion de données</h2>

                <p>MySQL</p>
                <p>MCD | MLD</p>
                <p>SQL</p>



            </div>
            <div className="competences-element">
                <h2>Design</h2>

                <p>UI / UX</p>
                <p>Adobe PhotoShop</p>
                <p>Adobe Illustrator</p>
                <p>Figma</p>
                <p>Design thinking</p>

            </div>

            <div className="competences-element">
                <h2>Communication</h2>

                <p>SEO</p>
                <p>Production audio-visuelle</p>
                <p>Adobe Premiere Pro</p>
                <p>Adobe Audition</p>

            </div>

            <div className="competences-element">
                <h2>Softs Skills</h2>

                <p>Esprit d'équipe</p>
                <p>Communication</p>
                <p>Gestion du stress</p>
                <p>Curiosité</p>
                <p>Force de proposition</p>

            </div>
        </div>
    </section>
  );
}

export default SkillsPage;