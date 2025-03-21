import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { useEffect, useState } from "react";
import CosmicLoader from "@/components/CosmicLoader";

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

  return (
    <>
      {loading ? (
        <CosmicLoader />
      ) : (
        <>
          <Router />
          <Toaster />
        </>
      )}
    </>
  );
}

export default App;
