import React, { useState, useEffect } from 'react';
import { ChevronUp, MessageCircle, Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';

export function FloatingElements() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* Dark Mode Toggle */}
      <Button
        size="icon"
        variant="outline"
        onClick={toggleDarkMode}
        className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 bg-background/80 backdrop-blur-sm"
      >
        {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>

      {/* Chat Bubble */}
      <Button
        size="icon"
        className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 bg-primary hover:bg-primary/90"
      >
        <MessageCircle className="h-5 w-5" />
      </Button>

      {/* Scroll to Top */}
      {showScrollTop && (
        <Button
          size="icon"
          variant="outline"
          onClick={scrollToTop}
          className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 bg-background/80 backdrop-blur-sm animate-in slide-in-from-bottom-2"
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}