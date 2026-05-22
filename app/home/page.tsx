'use client';

import dynamic from 'next/dynamic';

// 動態載入 Tour 元件，避免 Next.js SSR 預渲染問題
// （因為 Tour 內用了 window 物件做視差等效果）
const Tour = dynamic(() => import('./Tour'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="text-white/40 text-xs tracking-[0.3em] uppercase">
        loading
      </div>
    </div>
  ),
});

export default function MuseumPage() {
  return <Tour />;
}
