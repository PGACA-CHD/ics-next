'use client';
import { useState } from 'react';
import Fade from '@/components/common/Fade';

const advantages = [
  { title: 'Strategic Location', desc: 'Benefit from proximity to key markets...' },
  { title: 'Tax Efficiency', desc: 'Leverage favorable tax treaties...' },
  { title: 'Robust Legal Framework', desc: 'Strong IP protection and corporate law...' },
  // add more items as needed
];

export default function AdvantageSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const rowHeight = 80; // px, adjust if needed
  const cardStyle = {
    transform: `translateY(${activeIdx * rowHeight}px)`,
    transition: 'transform 0.5s ease',
    position: 'relative',
  };

  return (
    <section className="advantage-section" style={{ display: 'flex', gap: '2rem', background: '#0d1117', padding: '2rem', borderRadius: '16px', backdropFilter: 'blur(12px)' }}>
      {/* Left list */}
      <ul className="advantage-list" style={{ listStyle: 'none', margin: 0, padding: 0, flex: '0 0 250px' }}>
        {advantages.map((item, i) => (
          <li
            key={i}
            onClick={() => setActiveIdx(i)}
            style={{
              cursor: 'pointer',
              padding: '1rem',
              background: i === activeIdx ? 'rgba(255,255,255,0.1)' : 'transparent',
              borderRadius: '8px',
              marginBottom: '0.5rem',
            }}
          >
            <Fade delay={i * 100} up={false}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#fff' }}>{item.title}</h3>
            </Fade>
          </li>
        ))}
      </ul>

      {/* Right content card */}
      <div className="advantage-card-wrapper" style={{ flex: 1, overflow: 'hidden', height: `${rowHeight * advantages.length}px` }}>
        <Fade delay={200}>
          <div className="advantage-card" style={cardStyle}>
            {advantages.map((item, i) => (
              <div key={i} style={{ height: `${rowHeight}px`, padding: '1rem' }}>
                <h4 style={{ margin: 0, color: '#0B3D2E' }}>{item.title}</h4>
                <p style={{ margin: '0.5rem 0 0', color: '#555' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </Fade>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .advantage-section { flex-direction: column; }
          .advantage-list { display: flex; overflow-x: auto; }
          .advantage-card-wrapper { height: auto; }
          .advantage-card { position: static !important; transform: none !important; }
        }
      `}</style>
    </section>
  );
}
