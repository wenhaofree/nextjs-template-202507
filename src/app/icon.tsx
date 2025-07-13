import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#3b82f6',
          borderRadius: '6px',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold',
          }}
        >
          S
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
