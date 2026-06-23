'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/dashboard', label: 'Tableau de bord', icon: '📊' },
    { href: '/dashboard/factures', label: 'Mes factures', icon: '📄' },
    { href: '/dashboard/relances', label: 'Relances', icon: '📨' },
    { href: '/dashboard/parametres', label: 'Paramètres', icon: '⚙️' },
  ];

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div style={{ marginBottom: 32 }}>
        <Link href="/" style={{ textDecoration: 'none', fontSize: 20, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: '#6366f1', fontSize: 22 }}>⚡</span>
          RelancePro
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8, padding: '0 12px' }}>Navigation</p>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`sidebar-link ${pathname === link.href ? 'active' : ''}`}
          >
            <span style={{ fontSize: 18 }}>{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Bottom section */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
        {/* User plan badge */}
        <div style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 10, padding: '12px 14px', marginBottom: 12 }}>
          <div style={{ fontSize: 12, color: '#818cf8', fontWeight: 700, marginBottom: 2 }}>Plan Pro</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Essai gratuit · 12 jours restants</div>
        </div>

        <button
          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', width: '100%', background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 14, cursor: 'pointer', borderRadius: 10 }}
          onClick={() => window.location.href = '/login'}
        >
          <span>🚪</span> Déconnexion
        </button>
      </div>
    </aside>
  );
}
