"use client";
import { useEffect } from "react";

export default function Cursor() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const cursor = document.getElementById("cursor");
    if (!cursor) return;

    let mouseX = 0, mouseY = 0;
    let curX = 0, curY = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      curX += (mouseX - curX) * 0.18;
      curY += (mouseY - curY) * 0.18;
      cursor.style.left = curX + "px";
      cursor.style.top  = curY + "px";
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const targets = "a, button, [role='button'], input, textarea, select, label";

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest(targets)) cursor.classList.add("is-hover");
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest(targets)) cursor.classList.remove("is-hover");
    };
    const onDown  = () => cursor.classList.add("is-click");
    const onUp    = () => cursor.classList.remove("is-click");
    const onLeave = () => { cursor.style.opacity = "0"; };
    const onEnter = () => { cursor.style.opacity = "1"; };

    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mouseover",  onOver);
    document.addEventListener("mouseout",   onOut);
    document.addEventListener("mousedown",  onDown);
    document.addEventListener("mouseup",    onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseout",   onOut);
      document.removeEventListener("mousedown",  onDown);
      document.removeEventListener("mouseup",    onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return <div id="cursor" aria-hidden="true" />;
}
