import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface TruckModelProps {
  capacity: number; // 0-100 percentage of truck capacity
}

const TruckModel = ({ capacity = 35 }: TruckModelProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050A1A); // Cosmic black background
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(15, 10, 15);
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace; // Better color rendering
    containerRef.current.appendChild(renderer.domElement);
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0x3366ff, 0.2); // Bluish ambient light
    scene.add(ambientLight);
    
    // Main directional light (sun-like)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.right = 15;
    directionalLight.shadow.camera.left = -15;
    directionalLight.shadow.camera.top = 15;
    directionalLight.shadow.camera.bottom = -15;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);
    
    // Add blue point light for cosmic effect
    const blueLight = new THREE.PointLight(0x2563EB, 3, 15);
    blueLight.position.set(-5, 2, -5);
    scene.add(blueLight);
    
    // Add green point light for cosmic effect
    const greenLight = new THREE.PointLight(0x15803D, 3, 15);
    greenLight.position.set(5, 2, 5);
    scene.add(greenLight);
    
    // Add gold point light for cosmic effect
    const goldLight = new THREE.PointLight(0xEAB308, 3, 15);
    goldLight.position.set(0, 10, 0);
    scene.add(goldLight);
    
    // Ground plane with galaxy texture
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    
    // Cosmic ground material
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x050A1A,
      roughness: 0.3,
      metalness: 0.8,
      emissive: 0x0A0E1A,
      emissiveIntensity: 0.05,
    });
    
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    
    // Add stars to the scene
    const createStars = () => {
      const starsGeometry = new THREE.BufferGeometry();
      const starsMaterial = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 0.1,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
      });
      
      const starsVertices = [];
      for (let i = 0; i < 2000; i++) {
        const x = (Math.random() - 0.5) * 200;
        const y = (Math.random() - 0.5) * 200;
        const z = (Math.random() - 0.5) * 200;
        starsVertices.push(x, y, z);
      }
      
      starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
      const stars = new THREE.Points(starsGeometry, starsMaterial);
      return stars;
    };
    
    const stars = createStars();
    scene.add(stars);
    
    // Create the truck
    const createTruck = () => {
      const truck = new THREE.Group();
      
      // Cabin with blue metallic color
      const cabinGeometry = new THREE.BoxGeometry(3, 3, 4);
      const cabinMaterial = new THREE.MeshStandardMaterial({
        color: 0x2563EB, // Blue color
        roughness: 0.2,
        metalness: 0.8,
        emissive: 0x0A0E1A,
        emissiveIntensity: 0.1
      });
      const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
      cabin.position.set(0, 2.5, -4);
      cabin.castShadow = true;
      truck.add(cabin);
      
      // Windshield with cosmic glow
      const windshieldGeometry = new THREE.BoxGeometry(2.8, 1.5, 0.1);
      const windshieldMaterial = new THREE.MeshStandardMaterial({
        color: 0x88ccff,
        transparent: true,
        opacity: 0.5,
        roughness: 0.1,
        metalness: 0.9,
        emissive: 0x88ccff,
        emissiveIntensity: 0.3
      });
      const windshield = new THREE.Mesh(windshieldGeometry, windshieldMaterial);
      windshield.position.set(0, 3.3, -2.1);
      windshield.rotation.x = Math.PI / 6;
      truck.add(windshield);
      
      // Cargo container with glass-like material
      const containerGeometry = new THREE.BoxGeometry(3.5, 3.5, 8);
      const containerMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x111827,
        roughness: 0.1,
        metalness: 0.9,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        reflectivity: 1.0,
        transmission: 0.3, // Make it slightly see-through
        thickness: 0.5
      });
      const cargoContainer = new THREE.Mesh(containerGeometry, containerMaterial);
      cargoContainer.position.set(0, 2.75, 2);
      cargoContainer.castShadow = true;
      truck.add(cargoContainer);
      
      // Create logo for the truck
      const logoGeometry = new THREE.CircleGeometry(0.8, 32);
      const logoMaterial = new THREE.MeshStandardMaterial({
        color: 0xEAB308, // Gold
        roughness: 0.1,
        metalness: 0.9,
        emissive: 0xEAB308,
        emissiveIntensity: 0.5
      });
      const logo = new THREE.Mesh(logoGeometry, logoMaterial);
      logo.position.set(0, 3, -6);
      logo.rotation.y = Math.PI;
      logo.castShadow = true;
      truck.add(logo);
      
      // Wheels with better detail
      const wheelGeometry = new THREE.CylinderGeometry(1, 1, 0.8, 32);
      const wheelMaterial = new THREE.MeshStandardMaterial({
        color: 0x111111,
        roughness: 0.4,
        metalness: 0.6,
      });
      
      const wheelHubGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.82, 16);
      const wheelHubMaterial = new THREE.MeshStandardMaterial({
        color: 0x444444,
        roughness: 0.2,
        metalness: 0.8,
      });
      
      // Function to create a wheel with hub
      const createWheel = (x: number, z: number) => {
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel.position.set(x, 1, z);
        wheel.rotation.z = Math.PI / 2;
        wheel.castShadow = true;
        
        const hub = new THREE.Mesh(wheelHubGeometry, wheelHubMaterial);
        hub.position.set(0, 0, 0);
        wheel.add(hub);
        
        return wheel;
      };
      
      // Front wheels
      truck.add(createWheel(2, -3));
      truck.add(createWheel(-2, -3));
      
      // Middle wheels
      truck.add(createWheel(2, 0));
      truck.add(createWheel(-2, 0));
      
      // Rear wheels
      truck.add(createWheel(2, 3));
      truck.add(createWheel(-2, 3));
      
      // Add lights to the truck
      const headlightGeometry = new THREE.SphereGeometry(0.3, 16, 16);
      const headlightMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        emissive: 0xFFFFFF,
        emissiveIntensity: 1
      });
      
      // Headlights
      const leftHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
      leftHeadlight.position.set(-1, 1.8, -5.8);
      truck.add(leftHeadlight);
      
      const rightHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
      rightHeadlight.position.set(1, 1.8, -5.8);
      truck.add(rightHeadlight);
      
      // Headlight beams
      const headlightLight1 = new THREE.SpotLight(0xFFFFFF, 5, 100, Math.PI / 6, 0.5, 2);
      headlightLight1.position.copy(leftHeadlight.position);
      headlightLight1.target.position.set(-5, 0, -20);
      truck.add(headlightLight1);
      truck.add(headlightLight1.target);
      
      const headlightLight2 = new THREE.SpotLight(0xFFFFFF, 5, 100, Math.PI / 6, 0.5, 2);
      headlightLight2.position.copy(rightHeadlight.position);
      headlightLight2.target.position.set(5, 0, -20);
      truck.add(headlightLight2);
      truck.add(headlightLight2.target);
      
      return { truck, cargoContainer };
    };
    
    // Create boxes to fill the truck based on capacity
    const createBoxes = (parentContainer: THREE.Mesh, capacityPercent: number) => {
      const boxGroup = new THREE.Group();
      
      // Container dimensions (adjust based on your container size)
      const containerWidth = 3.5;
      const containerHeight = 3.5;
      const containerDepth = 8;
      
      // Calculate how many boxes can fit in each dimension
      const boxSize = 0.6; // Smaller boxes for more detail
      const boxesX = Math.floor(containerWidth / boxSize);
      const boxesY = Math.floor(containerHeight / boxSize);
      const boxesZ = Math.floor(containerDepth / boxSize);
      
      // Calculate total boxes and how many to show based on capacity
      const totalBoxes = boxesX * boxesY * boxesZ;
      const boxesToShow = Math.floor(totalBoxes * (capacityPercent / 100));
      
      // Material for boxes with cosmic theme
      const boxMaterials = [
        new THREE.MeshPhysicalMaterial({ 
          color: 0x2563EB, // Blue
          roughness: 0.2, 
          metalness: 0.8,
          emissive: 0x0A1128,
          emissiveIntensity: 0.2
        }),
        new THREE.MeshPhysicalMaterial({ 
          color: 0x15803D, // Green
          roughness: 0.2, 
          metalness: 0.8,
          emissive: 0x0A1128,
          emissiveIntensity: 0.2
        }),
        new THREE.MeshPhysicalMaterial({ 
          color: 0xEAB308, // Gold
          roughness: 0.1, 
          metalness: 0.9,
          emissive: 0x0A1128,
          emissiveIntensity: 0.2
        }),
        new THREE.MeshPhysicalMaterial({ 
          color: 0x7E22CE, // Purple
          roughness: 0.2, 
          metalness: 0.8,
          emissive: 0x0A1128,
          emissiveIntensity: 0.2
        }),
        new THREE.MeshPhysicalMaterial({ 
          color: 0xF97316, // Orange
          roughness: 0.2, 
          metalness: 0.8,
          emissive: 0x0A1128,
          emissiveIntensity: 0.2
        }),
      ];
      
      // Create different box geometries for variety
      const boxGeometries = [
        new THREE.BoxGeometry(boxSize * 0.9, boxSize * 0.9, boxSize * 0.9),
        new THREE.SphereGeometry(boxSize * 0.5, 16, 16),
        new THREE.CylinderGeometry(boxSize * 0.4, boxSize * 0.4, boxSize * 0.9, 16),
        new THREE.TorusGeometry(boxSize * 0.3, boxSize * 0.1, 16, 16),
        new THREE.TetrahedronGeometry(boxSize * 0.5, 0),
      ];
      
      let boxCount = 0;
      
      // Position boxes in a more organic pattern
      for (let y = 0; y < boxesY && boxCount < boxesToShow; y++) {
        for (let z = 0; z < boxesZ && boxCount < boxesToShow; z++) {
          for (let x = 0; x < boxesX && boxCount < boxesToShow; x++) {
            // Add some randomness to positions for a more natural look
            const offsetX = -containerWidth / 2 + boxSize / 2 + x * boxSize + (Math.random() * 0.2 - 0.1);
            const offsetY = -containerHeight / 2 + boxSize / 2 + y * boxSize + (Math.random() * 0.2 - 0.1);
            const offsetZ = -containerDepth / 2 + boxSize / 2 + z * boxSize + (Math.random() * 0.2 - 0.1);
            
            // Only place some boxes to create a more natural look
            if (Math.random() > 0.3 || y === 0) { // Make sure bottom layer is filled
              // Pick random geometry and material
              const geomIndex = Math.floor(Math.random() * boxGeometries.length);
              const matIndex = Math.floor(Math.random() * boxMaterials.length);
              
              const boxGeometry = boxGeometries[geomIndex];
              const boxMaterial = boxMaterials[matIndex];
              const box = new THREE.Mesh(boxGeometry, boxMaterial);
              
              box.position.set(offsetX, offsetY, offsetZ);
              
              // Random rotation for more natural look
              box.rotation.x = Math.random() * Math.PI;
              box.rotation.y = Math.random() * Math.PI;
              box.rotation.z = Math.random() * Math.PI;
              
              box.castShadow = true;
              box.receiveShadow = true;
              
              boxGroup.add(box);
              boxCount++;
            }
          }
        }
      }
      
      // Position the box group at the same position as the container
      boxGroup.position.copy(parentContainer.position);
      
      return boxGroup;
    };
    
    // Create the truck and cargo
    const { truck, cargoContainer } = createTruck();
    scene.add(truck);
    
    // Create boxes based on capacity
    const boxes = createBoxes(cargoContainer, capacity);
    scene.add(boxes);
    
    // Add orbit controls for interactivity
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 10;
    controls.maxDistance = 30;
    controls.maxPolarAngle = Math.PI - Math.PI / 3;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    
    // Clock for animations
    const clock = new THREE.Clock();
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      const delta = clock.getDelta();
      
      // Animate stars slowly
      stars.rotation.y += delta * 0.02;
      
      // Make lights pulse slightly for cosmic effect
      const time = clock.getElapsedTime();
      blueLight.intensity = 3 + Math.sin(time * 1.5) * 0.5;
      greenLight.intensity = 3 + Math.sin(time * 1.2 + 1) * 0.5;
      goldLight.intensity = 3 + Math.sin(time * 1.0 + 2) * 0.5;
      
      // Animate boxes slightly
      if (boxes.children.length > 0) {
        boxes.children.forEach((box, i) => {
          box.position.y += Math.sin(time * 1 + i * 0.1) * 0.0005;
          box.rotation.y += delta * 0.1;
        });
      }
      
      // Make the truck hover slightly
      truck.position.y = Math.sin(time * 0.5) * 0.1;
      
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Clean up Three.js resources
      renderer.dispose();
      controls.dispose();
    };
  }, [capacity]);
  
  return <div ref={containerRef} className="w-full h-full bg-cosmic rounded-lg" />;
};

export default TruckModel;
