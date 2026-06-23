'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className="nav"
      style={{
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <Link href="/" className="nav-logo">
        <span style={{ color: '#6366f1', fontSize: 24 }}>⚡</span>
        RelancePro
      </Link>

      <ul className="nav-links">
        <li><a href="#features" className="nav-link">Fonctionnalités</a></li>
        <li><a href="#comment-ca-marche" className="nav-link">Comment ça marche</a></li>
        <li><a href="#tarifs" className="nav-link">Tarifs</a></li>
        <li><Link href="/blog" className="nav-link">Blog</Link></li>
      </ul>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Link href="/login" className="btn btn-secondary btn-sm">Connexion</Link>
        <Link href="/signup" className="btn btn-primary btn-sm">Essai gratuit 14j</Link>
      </div>
    </nav>
  );
}
