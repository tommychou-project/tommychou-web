import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { getAllPosts } from "@/lib/posts";
import BlogClient from "./BlogClient";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main
      style={{
        background: "#080C14",
        minHeight: "100vh",
        color: "#f0f0f0",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}
    >
      <Navbar />

      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "120px 48px 100px" }}>
        {/* Page header */}
        <div
          style={{
            fontSize: "12px",
            color: "#E8652A",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "10px",
          }}
        >
          Blog
        </div>
        <h1
          style={{
            fontSize: "clamp(28px, 5vw, 52px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            marginBottom: "40px",
            color: "#f0f0f0",
          }}
        >
          所有文章
        </h1>

        <BlogClient posts={posts} />
      </section>

      <Footer />

      <style>{`
        input::placeholder { color: #666666 !important; }
        @media (max-width: 768px) {
          section { padding: 100px 20px 80px !important; }
        }
      `}</style>
    </main>
  );
}
