import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'ShipSaaS - Complete Next.js SaaS Boilerplate'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          backgroundImage: 'radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        {/* Logo/Brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#3b82f6',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '20px',
            }}
          >
            <div
              style={{
                color: 'white',
                fontSize: '32px',
                fontWeight: 'bold',
              }}
            >
              S
            </div>
          </div>
          <div
            style={{
              color: 'white',
              fontSize: '48px',
              fontWeight: 'bold',
            }}
          >
            ShipSaaS
          </div>
        </div>

        {/* Main Title */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginBottom: '20px',
            maxWidth: '1000px',
            lineHeight: '1.1',
          }}
        >
          Complete Next.js SaaS Boilerplate
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '28px',
            color: '#a1a1aa',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: '1.3',
            marginBottom: '40px',
          }}
        >
          Build profitable SaaS products in a weekend with AI integration, auth, payments, and more
        </div>

        {/* Features */}
        <div
          style={{
            display: 'flex',
            gap: '30px',
            color: '#3b82f6',
            fontSize: '20px',
            fontWeight: '600',
          }}
        >
          <span>🤖 AI Integration</span>
          <span>🔐 Authentication</span>
          <span>💳 Stripe Payments</span>
          <span>🌍 i18n Support</span>
          <span>📊 Dashboard</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
