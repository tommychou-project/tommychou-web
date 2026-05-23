'use client';

import { useState, useEffect, useRef } from 'react';
import { scenes, objectStories, type Hotspot } from './scenes-data';

export default function Tour() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeObject, setActiveObject] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const hintTimerRef = useRef<NodeJS.Timeout | null>(null);

  const scene = scenes[currentIndex];

  // 進站 3 秒後隱藏提示
  useEffect(() => {
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    setShowHint(true);
    hintTimerRef.current = setTimeout(() => setShowHint(false), 4000);
    return () => {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    };
  }, [currentIndex]);

  // 預載下一張圖（讓過場順暢）
  useEffect(() => {
    const next = scenes[currentIndex + 1];
    if (next) {
      const img = new Image();
      img.src = next.image;
    }
  }, [currentIndex]);

  // ESC 鍵關閉物件面板
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveObject(null);
      if (e.key === 'ArrowRight' && !activeObject) goNext();
      if (e.key === 'ArrowLeft' && !activeObject) goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentIndex, activeObject]);

  const goTo = (index: number) => {
    if (index < 0 || index >= scenes.length || isTransitioning) return;
    setIsTransitioning(true);
    setActiveObject(null);
    // 等過場動畫完成再換場景
    setTimeout(() => {
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 1200);
  };

  const goNext = () => goTo(currentIndex + 1);
  const goPrev = () => goTo(currentIndex - 1);

  const handleHotspotClick = (hotspot: Hotspot) => {
    if (hotspot.action === 'navigate' && hotspot.target) {
      const targetIndex = scenes.findIndex((s) => s.id === hotspot.target);
      if (targetIndex !== -1) goTo(targetIndex);
    } else if (hotspot.action === 'object') {
      setActiveObject(hotspot.id);
    } else if (hotspot.action === 'cta' && hotspot.href) {
      window.location.href = hotspot.href;
    }
  };

  const story = activeObject ? objectStories[activeObject] : null;

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* 場景圖 + Ken Burns 動畫 */}
      <div
        className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
        style={{ opacity: isTransitioning ? 0 : 1 }}
        key={scene.id}
      >
        <div
          className="absolute inset-0 ken-burns"
          style={{
            backgroundImage: `url(${scene.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            // CSS 變數驅動 Ken Burns 起點與終點
            ['--kb-from-scale' as any]: scene.kenBurns.from.scale,
            ['--kb-from-x' as any]: `${scene.kenBurns.from.x}%`,
            ['--kb-from-y' as any]: `${scene.kenBurns.from.y}%`,
            ['--kb-to-scale' as any]: scene.kenBurns.to.scale,
            ['--kb-to-x' as any]: `${scene.kenBurns.to.x}%`,
            ['--kb-to-y' as any]: `${scene.kenBurns.to.y}%`,
            ['--kb-duration' as any]: `${scene.kenBurns.duration}s`,
          }}
        />

        {/* 上下兩道淡淡的暗角，讓 UI 文字浮起來 */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

        {/* 熱點 */}
        {scene.hotspots.map((hotspot) => (
          <button
            key={hotspot.id}
            onClick={() => handleHotspotClick(hotspot)}
            className={`absolute -translate-x-1/2 -translate-y-1/2 group ${
              hotspot.action === 'navigate' || hotspot.action === 'cta'
                ? 'hotspot-nav'
                : 'hotspot-obj'
            }`}
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
            aria-label={hotspot.label}
          >
            <span className="hotspot-dot" />
            <span className="hotspot-pulse" />
            <span className="hotspot-label">{hotspot.label}</span>
          </button>
        ))}
      </div>

      {/* 左上：場景編號 + 標題 */}
      <div className="absolute top-6 left-6 z-10 text-white pointer-events-none select-none">
        <div className="text-[10px] tracking-[0.25em] uppercase opacity-50">
          Scene {String(scene.index).padStart(2, '0')} / {String(scenes.length).padStart(2, '0')}
        </div>
        <div className="text-sm font-light tracking-wide mt-1 opacity-80">
          {scene.title}
        </div>
      </div>

      {/* 右上：返回主站 */}
      <a
        href="/"
        className="absolute top-6 right-6 z-10 text-white/50 hover:text-white/90 transition-colors text-[10px] tracking-[0.25em] uppercase"
      >
        ← back to site
      </a>

      {/* 底部：場景導覽小點 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-3 items-center">
        {scenes.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            className={`transition-all ${
              i === currentIndex
                ? 'w-6 h-[2px] bg-white'
                : 'w-2 h-2 rounded-full bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Scene ${i + 1}`}
          />
        ))}
      </div>

      {/* 左右導覽箭頭（隱藏，只在 hover 時出現） */}
      {currentIndex > 0 && (
        <button
          onClick={goPrev}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-10 text-white/30 hover:text-white/90 transition-colors text-2xl"
          aria-label="Previous scene"
        >
          ←
        </button>
      )}
      {currentIndex < scenes.length - 1 && (
        <button
          onClick={goNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10 text-white/30 hover:text-white/90 transition-colors text-2xl"
          aria-label="Next scene"
        >
          →
        </button>
      )}

      {/* 第一場景的進站提示 */}
      {currentIndex === 0 && showHint && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 text-white/70 text-xs tracking-[0.2em] uppercase animate-fade-in-out pointer-events-none">
          welcome — find the pulsing dots
        </div>
      )}

      {/* 物件故事面板 */}
      {story && (
        <div
          className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm flex items-center justify-end p-6 md:p-12 animate-fade-in"
          onClick={() => setActiveObject(null)}
        >
          <div
            className="bg-stone-50 max-w-md w-full p-8 md:p-12 rounded-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-[10px] tracking-[0.3em] uppercase text-orange-700 mb-3">
              Exhibit
            </div>
            <h3 className="text-2xl font-light text-stone-900 mb-6">
              {story.title}
            </h3>
            <p className="text-stone-700 leading-relaxed text-[15px]">
              {story.body}
            </p>
            <button
              onClick={() => setActiveObject(null)}
              className="mt-8 text-[11px] tracking-[0.25em] uppercase text-stone-500 hover:text-stone-900 transition-colors"
            >
              ← back to the room
            </button>
          </div>
        </div>
      )}

      {/* CSS 動畫定義 */}
      <style jsx global>{`
        .ken-burns {
          animation: kenBurns var(--kb-duration) ease-in-out infinite alternate;
          transform-origin: center center;
        }
        @keyframes kenBurns {
          from {
            transform: scale(var(--kb-from-scale))
              translate(var(--kb-from-x), var(--kb-from-y));
          }
          to {
            transform: scale(var(--kb-to-scale))
              translate(var(--kb-to-x), var(--kb-to-y));
          }
        }
        .hotspot-obj,
        .hotspot-nav {
          width: 28px;
          height: 28px;
          padding: 0;
          background: transparent;
          border: none;
          cursor: pointer;
          position: absolute;
        }
        .hotspot-dot {
          position: absolute;
          inset: 8px;
          border-radius: 50%;
          background: rgba(232, 101, 42, 0.9);
          transition: transform 0.3s ease, background 0.3s ease;
        }
        .hotspot-nav .hotspot-dot {
          background: rgba(255, 255, 255, 0.9);
        }
        .hotspot-pulse {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1.5px solid rgba(232, 101, 42, 0.7);
          animation: ringPulse 2.4s ease-out infinite;
        }
        .hotspot-nav .hotspot-pulse {
          border-color: rgba(255, 255, 255, 0.7);
        }
        @keyframes ringPulse {
          0% {
            transform: scale(0.8);
            opacity: 0.9;
          }
          100% {
            transform: scale(2.6);
            opacity: 0;
          }
        }
        .hotspot-obj:hover .hotspot-dot,
        .hotspot-nav:hover .hotspot-dot {
          transform: scale(1.4);
        }
        .hotspot-label {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(8px);
          white-space: nowrap;
          background: rgba(20, 20, 20, 0.85);
          color: rgba(245, 242, 236, 1);
          font-size: 11px;
          letter-spacing: 0.05em;
          padding: 4px 10px;
          border-radius: 2px;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          margin-top: 8px;
          backdrop-filter: blur(8px);
        }
        .hotspot-obj:hover .hotspot-label,
        .hotspot-nav:hover .hotspot-label {
          opacity: 1;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease forwards;
        }
        @keyframes fade-in-out {
          0%,
          100% {
            opacity: 0;
          }
          20%,
          80% {
            opacity: 1;
          }
        }
        .animate-fade-in-out {
          animation: fade-in-out 4s ease forwards;
        }
      `}</style>
    </div>
  );
}
