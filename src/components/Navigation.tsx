import React, { useState, useEffect } from 'react';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setIsScrolled(scrollTop > 50);
      setScrollProgress(scrollPercent);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'services', 'portfolio', 'testimonials', 'blog', 'contact'];
      const sectionElements = sections.map(id => document.getElementById(id));
      
      let currentSection = 'home';
      sectionElements.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = sections[index];
          }
        }
      });
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Portfolio', href: '#portfolio', id: 'portfolio' },
    { name: 'Testimonials', href: '#testimonials', id: 'testimonials' },
    { name: 'Blog', href: '#blog', id: 'blog' },
    { name: 'Contact', href: '#contact', id: 'contact' }
  ];

  return (
    <>
      {/* Progress bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />
      
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-border pt-1' 
            : 'bg-transparent pt-0'
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              className={`transition-all duration-300 cursor-pointer hover:scale-105 ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}
              onClick={() => smoothScrollTo('home')}
            >
              <h2 className="text-xl font-semibold">🏹 Sagittarius</h2>
            </div>

            {/* Desktop Navigation Menu */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList className="flex space-x-1">
                {menuItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <button
                      onClick={() => smoothScrollTo(item.id)}
                      className={`group relative px-4 py-2 rounded-md transition-all duration-300 ease-in-out ${
                        activeSection === item.id
                          ? isScrolled 
                            ? 'text-primary bg-primary/10'
                            : 'text-white bg-white/20'
                          : isScrolled 
                            ? 'text-foreground hover:text-primary hover:bg-accent' 
                            : 'text-white hover:text-white hover:bg-white/20'
                      }`}
                    >
                      <span className="relative z-10">{item.name}</span>
                      
                      {/* Active indicator */}
                      {activeSection === item.id && (
                        <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-300 ${
                          isScrolled ? 'bg-primary' : 'bg-white'
                        }`} />
                      )}
                      
                      {/* Hover indicator */}
                      <div className={`absolute inset-0 rounded-md transition-all duration-300 ease-in-out scale-0 group-hover:scale-100 ${
                        activeSection === item.id ? 'scale-100' : ''
                      } ${
                        isScrolled
                          ? 'bg-primary/10'
                          : 'bg-white/10 backdrop-blur-sm'
                      }`} />
                    </button>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button 
                  className={`md:hidden p-2 rounded-md transition-all duration-300 ease-in-out ${
                    isScrolled 
                      ? 'text-foreground hover:bg-accent' 
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-semibold">Navigation</h3>
                    <button 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 hover:bg-accent rounded-md"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  {menuItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => smoothScrollTo(item.id)}
                      className={`text-left px-4 py-3 rounded-md transition-all duration-300 ease-in-out hover:bg-accent ${
                        activeSection === item.id 
                          ? 'bg-primary/10 text-primary border-l-4 border-primary' 
                          : 'text-foreground'
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                  
                  <div className="pt-6 border-t">
                    <button className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors duration-300">
                      Get Started
                    </button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop CTA Button */}
            <button 
              className={`hidden md:block px-6 py-2 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 ${
                isScrolled
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md'
                  : 'bg-white text-primary hover:bg-white/90 shadow-lg'
              }`}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}