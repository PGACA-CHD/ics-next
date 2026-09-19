'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { T, NAV_LINKS, PHONE, CALENDLY_URL } from '@/lib/config';
import Logo from '@/components/shared/Logo';

const HV = 'Helvetica, Arial, sans-serif';
const GOLD = '#c8870a';

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.524 5.847L.057 23.494a.5.5 0 0 0 .614.619l5.757-1.505A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.013-1.374l-.36-.214-3.724.974.994-3.63-.234-.373A9.818 9.818 0 1 1 12 21.818z"/>
    </svg>
  );
}

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
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // desktop hover
  const [mobileExpanded, setMobileExpanded] = useState(null); // mobile toggle
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
          position: 'absolute',
          top: 'calc(100% + 6px)',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#fff',
          border: `1px solid ${T.bdr}`,
          borderRadius: 12,
          padding: '6px 0',
          minWidth: 236,
          boxShadow: '0 8px 28px rgba(11,61,46,.10), 0 2px 8px rgba(0,0,0,.06)',
          zIndex: 500,
          whiteSpace: 'nowrap',
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
                      fontSize: 10,
                      fontWeight: 700,
                      color: T.lt,
                      letterSpacing: 0.9,
                      textTransform: 'uppercase',
                      paddingTop: 8,
                      fontFamily: HV,
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
                display: 'block',
                padding: '9px 18px',
                fontSize: 13.5,
                fontWeight: childActive ? 600 : 400,
                color: childActive ? '#111' : '#111',
                textDecoration: 'none',
                transition: 'background .12s, color .12s',
                fontFamily: HV,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = T.stone;
                e.currentTarget.style.color = T.f;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = childActive ? T.f : T.mid;
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
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 400,
          height: 70,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 40px',
          background: navBg,
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${scrolled ? T.bdr : 'transparent'}`,
          transition: 'background .25s, border-color .25s',
          fontFamily: HV,
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
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: 15,
                      fontWeight: 400,
                      color: active ? GOLD : '#111',
                      textDecoration: 'none',
                      padding: '6px 12px',
                      borderRadius: 6,
                      transition: 'color .18s',
                      borderBottom: active ? `2px solid ${GOLD}` : '2px solid transparent',
                      fontFamily: HV,
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
                        transform: openDropdown === link.href ? 'rotate(180deg)' : 'none',
                        flexShrink: 0,
                        opacity: 0.55,
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
                  fontSize: 15,
                  fontWeight: 400,
                  color: active ? GOLD : '#111',
                  textDecoration: 'none',
                  padding: '6px 12px',
                  borderRadius: 6,
                  transition: 'color .18s',
                  borderBottom: active ? `2px solid ${GOLD}` : '2px solid transparent',
                  fontFamily: HV,
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
            href={`https://wa.me/919915731447?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20company%20setup%20in%20India.`}
            className="nav-phone"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: GOLD,
              textDecoration: 'none',
              fontFamily: HV,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(200,135,10,0.08)',
              border: '1px solid rgba(200,135,10,0.25)',
              borderRadius: 6,
              padding: '5px 10px',
            }}
          >
            <WhatsAppIcon />
            {PHONE}
          </a>

          <a
            href="https://calendly.com/indiacompanysetup"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta-btn"
            style={{
              background: T.f,
              color: '#fff',
              padding: '9px 18px',
              borderRadius: 8,
              fontSize: 13.5,
              fontWeight: 600,
              textDecoration: 'none',
              fontFamily: HV,
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            Free Consultation
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>

          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            type="button"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              width: 44,
              height: 44,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 22,
                height: 2,
                background: T.ch,
                borderRadius: 2,
                transition: 'transform .2s ease',
                transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              }}
            />
            <div
              style={{
                width: 22,
                height: 2,
                background: T.ch,
                borderRadius: 2,
                opacity: menuOpen ? 0 : 1,
                transition: 'opacity .2s ease',
              }}
            />
            <div
              style={{
                width: 22,
                height: 2,
                background: T.ch,
                borderRadius: 2,
                transition: 'transform .2s ease',
                transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
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
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 0',
                      borderBottom: '1px solid rgba(255,255,255,.07)',
                      cursor: 'pointer',
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
                        fontSize: 26,
                        fontWeight: active ? 600 : 400,
                        color: active ? T.sl : 'rgba(255,255,255,.88)',
                        fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif",
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
                        transform: expanded ? 'rotate(180deg)' : 'none',
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
                        paddingLeft: 16,
                        paddingBottom: 8,
                        borderBottom: '1px solid rgba(255,255,255,.07)',
                      }}
                    >
                      {link.children.map((child, idx) => {
                        if (child.divider) {
                          return (
                            <div key={idx}>
                              {child.groupLabel && (
                                <div
                                  style={{
                                    fontSize: 10,
                                    fontWeight: 700,
                                    color: 'rgba(255,255,255,.35)',
                                    letterSpacing: 0.9,
                                    textTransform: 'uppercase',
                                    padding: '10px 0 4px',
                                    fontFamily: "var(--font-cardo),'Cardo',Georgia,serif",
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
                              display: 'block',
                              fontSize: 20,
                              fontWeight: childActive ? 600 : 400,
                              color: childActive ? T.sl : 'rgba(255,255,255,.75)',
                              textDecoration: 'none',
                              padding: '9px 0',
                              fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif",
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
                  fontSize: 26,
                  fontWeight: active ? 600 : 400,
                  color: active ? T.sl : 'rgba(255,255,255,.88)',
                  textDecoration: 'none',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(255,255,255,.07)',
                  fontFamily: "var(--font-cormorant),'Cormorant Garamond',serif",
                  display: 'block',
                }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}

          <a
            href="https://calendly.com/indiacompanysetup"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginTop: 24,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: T.f,
              color: '#fff',
              padding: '13px 26px',
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 600,
              textDecoration: 'none',
              fontFamily: HV,
              width: 'fit-content',
            }}
            onClick={() => setMenuOpen(false)}
          >
            Free Consultation
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>

          <div
            style={{
              marginTop: 32,
              fontSize: 12,
              color: 'rgba(255,255,255,.3)',
              fontFamily: "var(--font-cardo),'Cardo',Georgia,serif",
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
