'use client'

import { useEffect } from 'react'

export default function NewsletterCTA() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://subscribe-forms.beehiiv.com/v3/loader.js'
    script.async = true
    script.setAttribute('data-beehiiv-form', '84aff35f-6e66-4902-a583-e3ea4645f7d9')
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <section style={{
      borderTop: '1px solid rgba(255,255,255,0.08)',
      padding: '64px 24px',
      textAlign: 'center',
    }}>
      <p style={{ color: '#E8652A', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>
        Newsletter
      </p>
      <h2 style={{ color: '#ffffff', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 500, marginBottom: '12px', lineHeight: 1.3 }}>
        每兩週一個可執行的策略
      </h2>
      <p style={{ color: '#888888', fontSize: '15px', maxWidth: '480px', margin: '0 auto 32px', lineHeight: 1.7 }}>
        AI 工具應用、影音策略、品牌成長心得。
      </p>
      <div data-beehiiv-form="84aff35f-6e66-4902-a583-e3ea4645f7d9" style={{ maxWidth: '480px', margin: '0 auto' }} />
    </section>
  )
}
