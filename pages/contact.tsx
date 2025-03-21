import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import emailjs from "emailjs-com";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill out all fields.");
      return;
    }
    emailjs
      .send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        formData,
        "YOUR_USER_ID"
      )
      .then(() => {
        window.location.href = "https://wa.me/0543806524?text=הודעה%20נשלחה%20בהצלחה!";
      })
      .catch((err: Error) => {
        console.error(err);
        setError("Failed to send the message. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Canvas>
        <ambientLight intensity={0.5} />
        <OrbitControls />
      </Canvas>
      <div className="absolute inset-0 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white text-black p-8 rounded shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4">צור קשר</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <input
            type="text"
            placeholder="שם"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          />
          <input
            type="email"
            placeholder="אימייל"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          />
          <textarea
            placeholder="הודעה"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="w-full mb-4 p-2 border rounded"
          />
          <button type="submit" className="bg-primary text-white py-2 px-4 rounded">
            שלח
          </button>
        </form>
      </div>
    </div>
  );
}
