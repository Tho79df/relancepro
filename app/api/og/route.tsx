import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get('title') ?? 'RelancePro';
  const category = searchParams.get('category') ?? '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
          padding: '60px 70px',
          justifyContent: 'space-between',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ color: '#f59e0b', fontSize: '36px', fontWeight: 700 }}>⚡</span>
          <span style={{ color: '#ffffff', fontSize: '30px', fontWeight: 800, letterSpacing: '-0.03em' }}>
            RelancePro
          </span>
          {category && (
            <span
              style={{
                background: 'rgba(99,102,241,0.3)',
                color: '#a5b4fc',
                padding: '6px 18px',
                borderRadius: '100px',
                fontSize: '18px',
                fontWeight: 700,
                marginLeft: '12px',
                border: '1px solid rgba(99,102,241,0.4)',
              }}
            >
              {category}
            </span>
          )}
        </div>

        {/* Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              color: '#ffffff',
              fontSize: title.length > 50 ? '44px' : '54px',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              maxWidth: '1000px',
            }}
          >
            {title}
          </div>
          <div style={{ color: '#94a3b8', fontSize: '22px', fontWeight: 400 }}>
            Le logiciel de relance d&apos;impayés pour les freelances français
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#475569',
            fontSize: '18px',
          }}
        >
          <span style={{ color: '#6366f1', fontWeight: 600 }}>relancepro.fr</span>
          <span
            style={{
              background: 'rgba(16,185,129,0.15)',
              color: '#34d399',
              padding: '6px 16px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 700,
              border: '1px solid rgba(16,185,129,0.3)',
            }}
          >
            ✓ Essai gratuit 14 jours
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
