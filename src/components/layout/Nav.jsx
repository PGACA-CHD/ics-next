'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { T, NAV_LINKS, PHONE } from '@/lib/config';
import Logo from '@/components/shared/Logo';

/* ─── helpers ─────────────────────────────────────────────────── */

/** True when the current path matches this nav item (or any of its children). */
function isLinkActive(link, pathname) {
  if (link.children) {
    return link.children.some(
      (c) =>
        !c.divider &&
        (pathname === c.href || (c.href !== '/' && pathname.startsWith(c.href)))
    );
  }
  return pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
}

/* ─── component ───────────────────────────────────────────────── */

export default function Nav() {
  const [scrolled,          setScrolled]          = useState(false);
  const [menuOpen,          setMenuOpen]           = useState(false);
  const [openDropdown,      setOpenDropdown]       = useState(null); // desktop hover
  const [mobileExpanded,    setMobileExpanded]     = useState(null); // mobile toggle
  const pathname = usePathname();

  /* scroll listener */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close mobile menu on route change */
  useEffect(() => {
    setMenuOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

  const navBg = scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.92)';

  /* ── desktop dropdown renderer ──────────────────────────────── */
  function DropdownPanel({ items }) {
    return (
      <div
        style={{
          position:     'absolute',
          top:          'calc(100% + 6px)',
          left:         '50%',
          transform:    'translateX(-50%)',
          background:   '#fff',
          border:       `1px solid ${T.bdr}`,
          borderRadius: 12,
          padding:      '6px 0',
          minWidth:     236,
          boxShadow:    '0 8px 28px rgba(11,61,46,.10), 0 2px 8px rgba(0,0,0,.06)',
          zIndex:       500,
          whiteSpace:   'nowrap',
        }}
      >
        {items.map((child, idx) => {
          if (child.divider) {
            return (
              <div key={idx} style={{ padding: child.groupLabel ? '0 16px 2px' : '0', marginTop: 4 }}>
                <div style={{ borderTop: `1px solid ${T.bdr}` }} />
                {child.groupLabel && (
                  <div
                    style={{
                      fontSize:      10,
                      fontWeight:    700,
                      color:         T.lt,
                      letterSpacing: 0.9,
                      textTransform: 'uppercase',
                      paddingTop:    8,
                      fontFamily:    "'DM Sans', sans-serif",
                    }}
                  >
                    {child.groupLabel}
                  </div>
                )}
              </div>
            );
          }

          const childActive =
            pathname === child.href ||
            (child.href !== '/' && pathname.startsWith(child.href));

          return (
            <Link
              key={child.href}
              href={child.href}
              style={{
                display:        'block',
                padding:        '9px 18px',
                fontSize:       13.5,
                fontWeight:     childActive ? 600 : 400,
                color:          childActive ? T.f : T.mid,
                textDecoration: 'none',
                transition:     'background .12s, color .12s',
                fontFamily:     "'DM Sans', sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = T.stone;
                e.currentTarget.style.color      = T.f;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color      = childActive ? T.f : T.mid;
              }}
            >
              {child.label}
            </Link>
          );
        })}
      </div>
    );
  }

  /* ── render ─────────────────────────────────────────────────── */
  return (
    <>
      <nav
        className="site-nav"
        style={{
          position:       'fixed',
          top:            0,
          left:           0,
          right:          0,
          zIndex:         400,
          height:         70,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          padding:        '0 40px',
          background:     navBg,
          backdropFilter: 'blur(12px)',
          borderBottom:   `1px solid ${scrolled ? T.bdr : 'transparent'}`,
          transition:     'background .25s, border-color .25s',
          fontFamily:     "'DM Sans', sans-serif",
        }}
      >
        {/* ── Logo ── */}
        <Link
          href="/"
          className="nav-logo"
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
        >
          <Logo dark={true} size="sm" />
        </Link>

        {/* ── Desktop links ── */}
        <div
          className="nav-desktop-links"
          style={{ display: 'flex', alignItems: 'center', gap: 2 }}
        >
          {NAV_LINKS.map((link) => {
            const active = isLinkActive(link, pathname);

            /* dropdown item */
            if (link.children) {
              return (
                <div
                  key={link.href}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setOpenDropdown(link.href)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={link.href}
                    style={{
                      display:        'inline-flex',
                      alignItems:     'center',
                      gap:            4,
                      fontSize:       13.5,
                      fontWeight:     active ? 600 : 400,
                      color:          active ? T.f : T.mid,
                      textDecoration: 'none',
                      padding:        '6px 12px',
                      borderRadius:   6,
                      transition:     'color .18s',
                      borderBottom:   active ? `2px solid ${T.f}` : '2px solid transparent',
                      fontFamily:     "'DM Sans', sans-serif",
                    }}
                  >
                    {link.label}
                    {/* chevron */}
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      style={{
                        transition: 'transform .2s',
                        transform:  openDropdown === link.href ? 'rotate(180deg)' : 'none',
                        flexShrink: 0,
                        opacity:    0.55,
                      }}
                    >
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>

                  {openDropdown === link.href && (
                    <DropdownPanel items={link.children} />
                  )}
                </div>
              );
            }

            /* regular flat link */
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize:       13.5,
                  fontWeight:     active ? 600 : 400,
                  color:          active ? T.f : T.mid,
                  textDecoration: 'none',
                  padding:        '6px 12px',
                  borderRadius:   6,
                  transition:     'color .18s',
                  borderBottom:   active ? `2px solid ${T.f}` : '2px solid transparent',
                  fontFamily:     "'DM Sans', sans-serif",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* ── Right side: phone + CTA + hamburger ── */}
        <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a
            href={`tel:${PHONE.replace(/\s/g, '')}`}
            className="nav-phone"
            style={{
              fontSize:       13,
              fontWeight:     500,
              color:          T.mid,
              textDecoration: 'none',
              fontFamily:     "'DM Sans', sans-serif",
            }}
          >
            {PHONE}
          </a>

          <Link
            href="/contact"
            className="nav-cta-btn"
            style={{
              background:     T.s,
              color:          '#fff',
              padding:        '9px 18px',
              borderRadius:   8,
              fontSize:       13.5,
              fontWeight:     600,
              textDecoration: 'none',
              fontFamily:     "'DM Sans', sans-serif",
              whiteSpace:     'nowrap',
            }}
          >
            Free Consultation →
          </Link>

          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            type="button"
            style={{
              background: 'none',
              border:     'none',
              cursor:     'pointer',
              padding:    0,
              width:      44,
              height:     44,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width:      22,
                height:     2,
                background: T.ch,
                borderRadius: 2,
                transition: 'transform .2s ease',
                transform:  menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              }}
            />
            <div
              style={{
                width:      22,
                height:     2,
                background: T.ch,
                borderRadius: 2,
                opacity:    menuOpen ? 0 : 1,
                transition: 'opacity .2s ease',
              }}
            />
            <div
              style={{
                width:      22,
                height:     2,
                background: T.ch,
                borderRadius: 2,
                transition: 'transform .2s ease',
                transform:  menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* ── Mobile menu ───────────────────────────────────────── */}
      {menuOpen && (
        <div className="nav-mobile-menu" onClick={() => setMenuOpen(false)}>
          <div style={{ marginBottom: 8 }}>
            <Logo size="sm" />
          </div>

          {NAV_LINKS.map((link) => {
            const active = isLinkActive(link, pathname);

            /* dropdown item — show expand/collapse toggle */
            if (link.children) {
              const expanded = mobileExpanded === link.href;
              return (
                <div key={link.href}>
                  {/* parent toggle row */}
                  <div
                    style={{
                      display:         'flex',
                      alignItems:      'center',
                      justifyContent:  'space-between',
                      padding:         '12px 0',
                      borderBottom:    '1px solid rgba(255,255,255,.07)',
                      cursor:          'pointer',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setMobileExpanded((prev) =>
                        prev === link.href ? null : link.href
                      );
                    }}
                  >
                    <span
                      style={{
                        fontSize:    26,
                        fontWeight:  active ? 600 : 400,
                        color:       active ? T.sl : 'rgba(255,255,255,.88)',
                        fontFamily:  "'Cormorant Garamond', serif",
                      }}
                    >
                      {link.label}
                    </span>
                    <svg
                      width="14"
                      height="8"
                      viewBox="0 0 10 6"
                      fill="none"
                      style={{
                        transition: 'transform .2s',
                        transform:  expanded ? 'rotate(180deg)' : 'none',
                        flexShrink: 0,
                      }}
                    >
                      <path d="M1 1l4 4 4-4" stroke="rgba(255,255,255,.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* child links */}
                  {expanded && (
                    <div
                      style={{
                        paddingLeft:   16,
                        paddingBottom: 8,
                        borderBottom:  '1px solid rgba(255,255,255,.07)',
                      }}
                    >
                      {link.children.map((child, idx) => {
                        if (child.divider) {
                          return (
                            <div key={idx}>
                              {child.groupLabel && (
                                <div
                                  style={{
                                    fontSize:      10,
                                    fontWeight:    700,
                                    color:         'rgba(255,255,255,.35)',
                                    letterSpacing: 0.9,
                                    textTransform: 'uppercase',
                                    padding:       '10px 0 4px',
                                    fontFamily:    "'DM Sans', sans-serif",
                                  }}
                                >
                                  {child.groupLabel}
                                </div>
                              )}
                            </div>
                          );
                        }

                        const childActive =
                          pathname === child.href ||
                          (child.href !== '/' && pathname.startsWith(child.href));

                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            style={{
                              display:        'block',
                              fontSize:       20,
                              fontWeight:     childActive ? 600 : 400,
                              color:          childActive ? T.sl : 'rgba(255,255,255,.75)',
                              textDecoration: 'none',
                              padding:        '9px 0',
                              fontFamily:     "'Cormorant Garamond', serif",
                            }}
                            onClick={() => setMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            /* regular flat link */
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize:       26,
                  fontWeight:     active ? 600 : 400,
                  color:          active ? T.sl : 'rgba(255,255,255,.88)',
                  textDecoration: 'none',
                  padding:        '12px 0',
                  borderBottom:   '1px solid rgba(255,255,255,.07)',
                  fontFamily:     "'Cormorant Garamond', serif",
                  display:        'block',
                }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            href="/contact"
            style={{
              marginTop:      24,
              display:        'inline-flex',
              alignItems:     'center',
              background:     T.s,
              color:          '#fff',
              padding:        '13px 26px',
              borderRadius:   8,
              fontSize:       15,
              fontWeight:     600,
              textDecoration: 'none',
              fontFamily:     "'DM Sans', sans-serif",
              width:          'fit-content',
            }}
            onClick={() => setMenuOpen(false)}
          >
            Free Consultation →
          </Link>

          <div
            style={{
              marginTop:  32,
              fontSize:   12,
              color:      'rgba(255,255,255,.3)',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {PHONE} · info@indiacompanysetup.com
          </div>
        </div>
      )}

      <div style={{ height: 70 }} />
    </>
  );
}
