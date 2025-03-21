import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { useEffect, useState } from "react";
import CosmicLoader from "@/components/CosmicLoader";
import { LanguageProvider } from "./context/LanguageContext";

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

  // Create simpler app structure with loading state
  return (
    <>
      {loading ? (
        // Don't use language context in loader to prevent circular dependency
        <CosmicLoader />
      ) : (
        // Wrap main app content in language provider
        <LanguageProvider>
          <Router />
          <Toaster />
        </LanguageProvider>
      )}
    </>
  );
}

export default App;
