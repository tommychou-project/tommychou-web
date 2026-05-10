"use client";
import { useState } from "react";
import Preloader from "@/app/components/Preloader";
import Navbar from "@/app/components/Navbar";
import Ch01Hero from "@/app/components/Ch01Hero";
import Ch02Journey from "@/app/components/Ch02Journey";
import Ch03About from "@/app/components/Ch03About";
import Ch04Blog from "@/app/components/Ch04Blog";
import Ch05Services from "@/app/components/Ch05Services";
import Ch06Contact from "@/app/components/Ch06Contact";
import Footer from "@/app/components/Footer";

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <>
      <Preloader onDone={() => setPreloaderDone(true)} />

      <div
        style={{
          background: "#080C14",
          color: "#f0f0f0",
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          minHeight: "100vh",
          overflowX: "hidden",
          position: "relative",
        }}
      >
        <Navbar />

        <Ch01Hero preloaderDone={preloaderDone} />
        <div style={{ height: "0.5px", background: "rgba(240,240,240,0.05)", margin: "0 48px" }} />

        <Ch02Journey />
        <div style={{ height: "0.5px", background: "rgba(240,240,240,0.05)", margin: "0 48px" }} />

        <Ch03About />
        <div style={{ height: "0.5px", background: "rgba(240,240,240,0.05)", margin: "0 48px" }} />

        <Ch04Blog />
        <div style={{ height: "0.5px", background: "rgba(240,240,240,0.05)", margin: "0 48px" }} />

        <Ch05Services />
        <div style={{ height: "0.5px", background: "rgba(240,240,240,0.05)", margin: "0 48px" }} />

        <Ch06Contact />

        <Footer />
      </div>

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #080C14; }
        ::selection { background: rgba(232,101,42,0.3); }
        @media (max-width: 768px) {
          div[style*="margin: 0 48px"] { margin: 0 24px !important; }
        }
      `}</style>
    </>
  );
}
