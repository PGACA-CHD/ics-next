'use client';
import { useRef, useState, useEffect } from 'react';

function useReveal(t = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVis(true);
        obs.disconnect();
      }
    }, { threshold: t });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

export default function Fade({ children, delay = 0, up = true }) {
  const [ref, vis] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? 'none' : (up ? 'translateY(22px)' : 'translateY(0)'),
        transition: `opacity .55s ease ${delay}ms, transform .55s ease ${delay}ms`
      }}
    >
      {children}
    </div>
  );
}
