// src/components/Hero.jsx
import React from 'react';
import Header from './Header';
import HeroContent from './HeroContent';
import HeroBackground from './HeroBackground';

export default function Hero() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <Header />
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <HeroBackground />
        <HeroContent />
      </div>
    </div>
  );
}
