'use client';

import { useEffect } from 'react';

export default function ScrollDetector() {
  useEffect(() => {
    const handleScroll = () => {
      document.body.classList.toggle('scrolled', window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始检查

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
} 