import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { useEffect, useState } from "react";
import CosmicLoader from "@/components/CosmicLoader";
import { LanguageProvider } from "./context/LanguageContext";
import FloatingSocialButtons from "./components/FloatingSocialButtons";
import AccessibilityWidget from "./components/AccessibilityWidget";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for the cosmic journey animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Generate stars for cosmic background
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 100; i++) {
      const size = Math.random() * 2;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const duration = 3 + Math.random() * 7;
      
      stars.push(
        <div
          key={i}
          className="star absolute z-0"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${top}%`,
            animation: `twinkle ${duration}s linear infinite`
          }}
        ></div>
      );
    }
    return stars;
  };

  return (
    <div className="relative overflow-hidden">
      {/* Cosmic background with stars */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {generateStars()}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cosmic via-cosmic to-slate-900 opacity-80"></div>
      </div>
      
      {loading ? (
        // Don't use language context in loader to prevent circular dependency
        <CosmicLoader />
      ) : (
        // Wrap main app content in language provider
        <LanguageProvider>
          <Router />
          <FloatingSocialButtons />
          <AccessibilityWidget />
          <Toaster />
        </LanguageProvider>
      )}
    </div>
  );
}

export default App;
