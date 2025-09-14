
import React from 'react';
import { Navigation } from './components/Navigation';
import { DemoContent } from './components/DemoContent';
import { FloatingElements } from './components/FloatingElements';
import { LoadingAnimation } from './components/LoadingAnimation';

export default function App() {
  return (
    <div className="relative">
      <LoadingAnimation />
      <Navigation />
      <DemoContent />
      <FloatingElements />
    </div>
  );
}
