import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { LanguageProvider } from "./context/LanguageContext";
import FloatingSocialButtons from "./components/FloatingSocialButtons";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Generate stars for cosmic background
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 150; i++) {
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
        
        {/* Animated cosmic elements */}
        <div className="absolute top-[20%] left-[15%] w-32 h-32 rounded-full bg-primary/5 blur-xl animate-float-slow"></div>
        <div className="absolute bottom-[30%] right-[10%] w-48 h-48 rounded-full bg-gold/5 blur-xl animate-float"></div>
        <div className="absolute top-[40%] right-[25%] w-24 h-24 rounded-full bg-secondary/5 blur-xl animate-float-fast"></div>
      </div>
      
      {/* Wrap main app content in language provider */}
      <LanguageProvider>
        <Router />
        <FloatingSocialButtons />
        <Toaster />
      </LanguageProvider>
    </div>
  );
}

export default App;
