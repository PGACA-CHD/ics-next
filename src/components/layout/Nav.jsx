'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { T, NAV_LINKS, PHONE } from '@/lib/config';
import Logo from '@/components/shared/Logo';

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const navBg = scrolled
    ? 'rgba(255,255,255,0.97)'
    : 'rgba(255,255,255,0.92)';

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 400,
        height: 70,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px',
        background: navBg,
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${scrolled ? T.bdr : 'transparent'}`,
        transition: 'background .25s, border-color .25s',
        fontFamily: "'DM Sans', sans-serif",
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <Logo dark={true} size="md" />
        </Link>

        {/* Desktop nav links */}
        <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <Link key={href} href={href} style={{
                fontSize: 13.5, fontWeight: active ? 600 : 400, color: active ? T.f : T.mid,
                textDecoration: 'none', padding: '6px 12px', borderRadius: 6,
                transition: 'color .18s',
                borderBottom: active ? `2px solid ${T.f}` : '2px solid transparent',
                fontFamily: "'DM Sans', sans-serif",
              }}>{label}</Link>
            );
          })}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a href={`tel:${PHONE.replace(/\s/g, '')}`}
            className="nav-phone"
            style={{ fontSize: 13, fontWeight: 500, color: T.mid, textDecoration: 'none', fontFamily: "'DM Sans', sans-serif" }}>
            {PHONE}
          </a>
          <Link href="/contact"
            style={{ background: T.s, color: '#fff', padding: '9px 18px', borderRadius: 8, fontSize: 13.5, fontWeight: 600, textDecoration: 'none', fontFamily: "'DM Sans', sans-serif", whiteSpace: 'nowrap' }}>
            Free Consultation →
          </Link>

          {/* Hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <div style={{ width: 22, height: 2, background: T.ch, marginBottom: 5, borderRadius: 2, transition: 'transform .2s', transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
            <div style={{ width: 22, height: 2, background: T.ch, marginBottom: 5, borderRadius: 2, opacity: menuOpen ? 0 : 1, transition: 'opacity .2s' }} />
            <div style={{ width: 22, height: 2, background: T.ch, borderRadius: 2, transition: 'transform .2s', transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 390,
          background: 'rgba(17,17,11,0.97)',
          display: 'flex', flexDirection: 'column',
          paddingTop: 90, paddingLeft: 32,
        }}
          onClick={() => setMenuOpen(false)}>
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={href} href={href}
              style={{ fontSize: 28, fontWeight: 500, color: '#fff', textDecoration: 'none', padding: '14px 0', fontFamily: "'Cormorant Garamond', serif" }}
              onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
          <Link href="/contact"
            style={{ marginTop: 24, display: 'inline-flex', background: T.s, color: '#fff', padding: '12px 24px', borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: 'none', fontFamily: "'DM Sans', sans-serif", width: 'fit-content' }}
            onClick={() => setMenuOpen(false)}>
            Free Consultation →
          </Link>
        </div>
      )}

      {/* Spacer */}
      <div style={{ height: 70 }} />
    </>
  );
}
