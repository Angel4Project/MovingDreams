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
    scene.background = new THREE.Color(0x16213e);
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(15, 10, 15);
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.right = 15;
    directionalLight.shadow.camera.left = -15;
    directionalLight.shadow.camera.top = 15;
    directionalLight.shadow.camera.bottom = -15;
    scene.add(directionalLight);
    
    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(50, 50);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.8,
      metalness: 0.2,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    
    // Create the truck
    const createTruck = () => {
      const truck = new THREE.Group();
      
      // Cabin
      const cabinGeometry = new THREE.BoxGeometry(3, 3, 4);
      const cabinMaterial = new THREE.MeshStandardMaterial({
        color: 0xE30613, // Red color from the brand
        roughness: 0.5,
        metalness: 0.2,
      });
      const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
      cabin.position.set(0, 2.5, -4);
      cabin.castShadow = true;
      truck.add(cabin);
      
      // Windshield
      const windshieldGeometry = new THREE.BoxGeometry(2.8, 1.5, 0.1);
      const windshieldMaterial = new THREE.MeshStandardMaterial({
        color: 0x88ccff,
        transparent: true,
        opacity: 0.7,
        roughness: 0.1,
        metalness: 0.9,
      });
      const windshield = new THREE.Mesh(windshieldGeometry, windshieldMaterial);
      windshield.position.set(0, 3.3, -2.1);
      windshield.rotation.x = Math.PI / 6;
      truck.add(windshield);
      
      // Cargo container
      const containerGeometry = new THREE.BoxGeometry(3.5, 3.5, 8);
      const containerMaterial = new THREE.MeshStandardMaterial({
        color: 0xdddddd,
        roughness: 0.5,
        metalness: 0.2,
      });
      const cargoContainer = new THREE.Mesh(containerGeometry, containerMaterial);
      cargoContainer.position.set(0, 2.75, 2);
      cargoContainer.castShadow = true;
      truck.add(cargoContainer);
      
      // Wheels
      const wheelGeometry = new THREE.CylinderGeometry(1, 1, 0.8, 32);
      const wheelMaterial = new THREE.MeshStandardMaterial({
        color: 0x111111,
        roughness: 0.9,
        metalness: 0.1,
      });
      
      // Front wheels
      const frontLeftWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      frontLeftWheel.position.set(2, 1, -3);
      frontLeftWheel.rotation.z = Math.PI / 2;
      frontLeftWheel.castShadow = true;
      truck.add(frontLeftWheel);
      
      const frontRightWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      frontRightWheel.position.set(-2, 1, -3);
      frontRightWheel.rotation.z = Math.PI / 2;
      frontRightWheel.castShadow = true;
      truck.add(frontRightWheel);
      
      // Middle wheels
      const middleLeftWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      middleLeftWheel.position.set(2, 1, 0);
      middleLeftWheel.rotation.z = Math.PI / 2;
      middleLeftWheel.castShadow = true;
      truck.add(middleLeftWheel);
      
      const middleRightWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      middleRightWheel.position.set(-2, 1, 0);
      middleRightWheel.rotation.z = Math.PI / 2;
      middleRightWheel.castShadow = true;
      truck.add(middleRightWheel);
      
      // Rear wheels
      const rearLeftWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      rearLeftWheel.position.set(2, 1, 3);
      rearLeftWheel.rotation.z = Math.PI / 2;
      rearLeftWheel.castShadow = true;
      truck.add(rearLeftWheel);
      
      const rearRightWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      rearRightWheel.position.set(-2, 1, 3);
      rearRightWheel.rotation.z = Math.PI / 2;
      rearRightWheel.castShadow = true;
      truck.add(rearRightWheel);
      
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
      const boxSize = 0.8;
      const boxesX = Math.floor(containerWidth / boxSize);
      const boxesY = Math.floor(containerHeight / boxSize);
      const boxesZ = Math.floor(containerDepth / boxSize);
      
      // Calculate total boxes and how many to show based on capacity
      const totalBoxes = boxesX * boxesY * boxesZ;
      const boxesToShow = Math.floor(totalBoxes * (capacityPercent / 100));
      
      // Material for boxes
      const boxMaterials = [
        new THREE.MeshStandardMaterial({ color: 0xE30613, roughness: 0.5 }), // Red
        new THREE.MeshStandardMaterial({ color: 0xF5A623, roughness: 0.5 }), // Orange
        new THREE.MeshStandardMaterial({ color: 0x7ED321, roughness: 0.5 }), // Green
        new THREE.MeshStandardMaterial({ color: 0x50E3C2, roughness: 0.5 }), // Teal
        new THREE.MeshStandardMaterial({ color: 0x4A90E2, roughness: 0.5 }), // Blue
      ];
      
      let boxCount = 0;
      
      // Position boxes in a grid pattern, starting from the bottom
      for (let y = 0; y < boxesY && boxCount < boxesToShow; y++) {
        for (let z = 0; z < boxesZ && boxCount < boxesToShow; z++) {
          for (let x = 0; x < boxesX && boxCount < boxesToShow; x++) {
            const boxGeometry = new THREE.BoxGeometry(boxSize * 0.9, boxSize * 0.9, boxSize * 0.9);
            const boxMaterial = boxMaterials[Math.floor(Math.random() * boxMaterials.length)];
            const box = new THREE.Mesh(boxGeometry, boxMaterial);
            
            // Position relative to container center
            const offsetX = -containerWidth / 2 + boxSize / 2 + x * boxSize;
            const offsetY = -containerHeight / 2 + boxSize / 2 + y * boxSize;
            const offsetZ = -containerDepth / 2 + boxSize / 2 + z * boxSize;
            
            box.position.set(offsetX, offsetY, offsetZ);
            box.castShadow = true;
            
            boxGroup.add(box);
            boxCount++;
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
    controls.maxPolarAngle = Math.PI / 2;
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
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
  
  return <div ref={containerRef} className="w-full h-full" />;
};

export default TruckModel;
