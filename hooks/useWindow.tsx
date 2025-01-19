import { is_server } from '@/functions/is_server.func';
import { useState, useEffect } from 'react';

const getWidth = () => {

  if(is_server) return 1200;

  return window.innerWidth;
};

export const useWindow = () => {

  const [currentWidth, setCurrentWidth] = useState(getWidth());

  useEffect(() => {
    function handleResize() {
      setCurrentWidth(getWidth());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { windowWidth: currentWidth };
}