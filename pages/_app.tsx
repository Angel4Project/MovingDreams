import React, { useEffect, useState } from "react";
import "../styles/globals.css";

export default function App({ Component, pageProps }: any) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <video
          src="/or4moving.mp4"
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />
        <img src="/logo.png" alt="Logo" className="relative z-10 w-32" />
      </div>
    );
  }

  return <Component {...pageProps} />;
}
