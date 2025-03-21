import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Star {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  size: number;
  color: THREE.Color;
}

const SpaceScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 20;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);
    containerRef.current.appendChild(renderer.domElement);
    
    // Create stars
    const stars: Star[] = [];
    const starCount = 500;
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      size: 1,
      transparent: true,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      vertexColors: true,
    });
    
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);
    
    // Create galaxies
    const createGalaxy = (x: number, y: number, z: number, radius: number, color: THREE.Color) => {
      const particleCount = 500;
      const particles = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);
      const particleColors = new Float32Array(particleCount * 3);
      
      for (let i = 0; i < particleCount; i++) {
        // Spiral galaxy pattern
        const angle = (i / particleCount) * Math.PI * 20;
        const distance = (i / particleCount) * radius;
        
        particlePositions[i * 3] = x + Math.cos(angle) * distance + (Math.random() - 0.5) * 2;
        particlePositions[i * 3 + 1] = y + Math.sin(angle) * distance + (Math.random() - 0.5) * 2;
        particlePositions[i * 3 + 2] = z + (Math.random() - 0.5) * 5;
        
        particleColors[i * 3] = color.r;
        particleColors[i * 3 + 1] = color.g;
        particleColors[i * 3 + 2] = color.b;
      }
      
      particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      particles.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
      
      const particleMaterial = new THREE.PointsMaterial({
        size: 0.2,
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
      });
      
      const galaxy = new THREE.Points(particles, particleMaterial);
      scene.add(galaxy);
      
      return galaxy;
    };
    
    // Initialize stars
    for (let i = 0; i < starCount; i++) {
      // Create star objects with position, velocity, size, and color
      const star: Star = {
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
          -Math.random() * 50
        ),
        velocity: new THREE.Vector3(
          0,
          0,
          Math.random() * 0.5 + 0.1
        ),
        size: Math.random() * 0.7 + 0.1,
        color: new THREE.Color(0xffffff)
      };
      
      stars.push(star);
      
      // Set star positions, colors, and sizes
      positions[i * 3] = star.position.x;
      positions[i * 3 + 1] = star.position.y;
      positions[i * 3 + 2] = star.position.z;
      
      colors[i * 3] = star.color.r;
      colors[i * 3 + 1] = star.color.g;
      colors[i * 3 + 2] = star.color.b;
      
      sizes[i] = star.size;
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const starPoints = new THREE.Points(starGeometry, starMaterial);
    scene.add(starPoints);
    
    // Create nebulas
    const blueNebula = createGalaxy(-15, 10, -30, 8, new THREE.Color(0x3366ff));
    const redNebula = createGalaxy(20, -5, -40, 12, new THREE.Color(0xff3333));
    
    // Create sun (destination)
    const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({
      color: 0xffdd33,
      transparent: true,
      opacity: 0
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(0, 0, -80);
    scene.add(sun);
    
    // Light for the glow effect
    const sunLight = new THREE.PointLight(0xffdd33, 2, 100);
    sunLight.position.set(0, 0, -80);
    sunLight.intensity = 0;
    scene.add(sunLight);
    
    // Animation parameters
    let phase = 0;
    const totalDuration = 3500; // Same as in App.tsx
    const startTime = Date.now();
    
    // Animation loop
    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / totalDuration, 1);
      
      // Camera movement based on progress
      if (progress < 0.6) {
        // First phase: travel through space
        camera.position.z = 20 - progress * 50;
        
        // Update stars
        for (let i = 0; i < stars.length; i++) {
          const star = stars[i];
          star.position.z += star.velocity.z * (1 + progress * 3);
          
          // Loop stars back when they get too close
          if (star.position.z > 10) {
            star.position.z = -50;
            star.position.x = (Math.random() - 0.5) * 100;
            star.position.y = (Math.random() - 0.5) * 100;
          }
          
          // Update positions in buffer
          positions[i * 3] = star.position.x;
          positions[i * 3 + 1] = star.position.y;
          positions[i * 3 + 2] = star.position.z;
        }
        
        starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        // Rotate galaxies
        blueNebula.rotation.z += 0.001;
        redNebula.rotation.z -= 0.001;
      } else if (progress < 0.8) {
        // Second phase: approach the sun
        const sunPhaseProgress = (progress - 0.6) / 0.2;
        
        // Move camera toward sun
        camera.position.z = -30 - sunPhaseProgress * 20;
        camera.lookAt(sun.position);
        
        // Increase sun visibility and light
        sunMaterial.opacity = sunPhaseProgress;
        sunLight.intensity = sunPhaseProgress * 3;
      } else {
        // Final phase: white flash
        const finalPhaseProgress = (progress - 0.8) / 0.2;
        
        // Create a white flash effect
        renderer.setClearColor(new THREE.Color(1, 1, 1).lerp(new THREE.Color(1, 1, 1), finalPhaseProgress), 1);
        sunMaterial.opacity = 1 - finalPhaseProgress;
        sunLight.intensity = 3 * (1 - finalPhaseProgress);
      }
      
      // Render scene
      renderer.render(scene, camera);
      
      // Stop animation when complete
      if (progress >= 1) {
        cancelAnimationFrame(animationId);
      }
    };
    
    // Start animation
    animate();
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);
  
  return <div ref={containerRef} className="absolute inset-0 z-0" />;
};

export default SpaceScene;
