import { getAllPosts } from "@/lib/posts";
import HomeClient from "@/app/components/HomeClient";
import { personJsonLd } from "@/lib/jsonld";

export default function Home() {
  const posts = getAllPosts();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />
      <HomeClient posts={posts} />
    </>
  );
}
