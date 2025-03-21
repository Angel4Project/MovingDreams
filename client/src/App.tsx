import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import CTABanner from "./components/CTABanner";
import AccessibilityButton from "./components/AccessibilityButton";
import CustomLoader from "./components/CustomLoader";
import { useState, useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/about" component={About} />
      <Route path="/testimonials" component={Testimonials} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading animation for 4 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        {loading ? (
          <CustomLoader />
        ) : (
          <>
            <Navbar />
            <main className="min-h-screen">
              <Router />
            </main>
            <Footer />
            <CTABanner />
            <AccessibilityButton />
          </>
        )}
        <Toaster />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
