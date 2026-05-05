const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDir = path.join(__dirname, '../content/posts');
const outputFile = path.join(__dirname, '../lib/posts-data.json');

const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

const posts = {};
files.forEach(file => {
  const slug = file.replace(/\.md$/, '');
  const raw = fs.readFileSync(path.join(postsDir, file), 'utf-8');
  const { data, content } = matter(raw);
  posts[slug] = {
    title: data.title ?? '',
    date: data.date ?? '',
    tag: data.tag ?? '',
    readTime: data.readTime ?? '',
    excerpt: data.excerpt ?? '',
    content,
  };
});

const sorted = Object.fromEntries(
  Object.entries(posts).sort((a, b) => a[1].date < b[1].date ? 1 : -1)
);

fs.writeFileSync(outputFile, JSON.stringify(sorted, null, 2));
console.log(`✅ 已轉換 ${files.length} 篇文章`);
