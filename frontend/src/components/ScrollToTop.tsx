// frontend/src/components/ScrollToTop.tsx (Versión INTELIGENTE y final)
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    
    const timer = setTimeout(() => {
      
      if (hash === '') {
        document.body.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }

    }, 50);

    return () => clearTimeout(timer);
    
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;