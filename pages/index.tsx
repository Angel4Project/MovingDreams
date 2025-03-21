import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Header from "../components/Header";
import Footer from "../components/Footer";
import gsap from "gsap";

export default function Home() {
  useEffect(() => {
    gsap.fromTo(
      ".hero-text",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5 }
    );
  }, []);

  return (
    <div>
      <Header />
      <main className="min-h-screen">
        <section className="relative h-screen bg-black text-white">
          <Canvas>
            <Stars />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} />
            <OrbitControls />
          </Canvas>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="hero-text text-4xl font-bold">האור שלכם בסוף ההובלה</h1>
            <p className="hero-text mt-4 text-lg">
              הובלות מקצועיות, אמינות ומהירות לכל מטרה
            </p>
            <button className="hero-text mt-6">קבל הצעת מחיר</button>
          </div>
        </section>
        <section className="py-12 bg-white">
          <h2 className="text-3xl font-bold text-center">השירותים שלנו</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* Services Cards */}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}